from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from auths.models import User
from core.models import *
import json
import asyncio
from .serializers import *

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.identifier = self.scope["url_route"]["kwargs"]["identifier"]
        user = None
        if len(str(self.identifier)) > 3:
            if str(self.identifier)[:3] == "res":
                user = await self.get_restaurant_from_identifier()
        else: user = await self.get_user_from_identifier()
        if user is None:
            await self.close()
            return
        print(user.username)
        self.username = user.username
        await self.channel_layer.group_add(
            self.username,
            self.channel_name
        )
        await self.accept()

    @database_sync_to_async
    def get_user_from_identifier(self):
        try:
            user = User.objects.get(pk=self.identifier)
            return user if isinstance(user, User) else None
        except (User.DoesNotExist, ValueError):
            return None
        
    @database_sync_to_async
    def get_restaurant_from_identifier(self):
        try:
            user = Restaurant.objects.get(rid=self.identifier)
            return user if isinstance(user, Restaurant) else None
        except (Restaurant.DoesNotExist, ValueError):
            return None
        
    @database_sync_to_async
    def get_restaurant_from_name(self, username):
        try:
            user = Restaurant.objects.get(username=username)
            return user if isinstance(user, Restaurant) else None
        except (Restaurant.DoesNotExist, ValueError):
            return None
        
    @database_sync_to_async
    def get_user_from_name(self, username):
        try:
            user = User.objects.get(username=username)
            return user if isinstance(user, User) else None
        except (User.DoesNotExist, ValueError):
            return None
    
    @database_sync_to_async
    def create_message(self, user, friend, mesage, sender):
        try:
            ChatMessage.objects.create(
                msg_user=user,
                msg_restaurant=friend,
                body=mesage,
                sender=sender
            )
            chatmessages = ChatMessage.objects.filter(
                msg_user=user,
                msg_restaurant=friend
            ).order_by('date')
            serialize = MessageSerializer(chatmessages, many=True)
            return serialize.data if chatmessages else None
        except (ChatMessage.DoesNotExist, ValueError):
            return None
        
    @database_sync_to_async
    def get_list_message(self, user, friend):
        try:
            chatmessages = ChatMessage.objects.filter(
                msg_user=user,
                msg_restaurant=friend
            ).order_by('date')
            serialize = MessageSerializer(chatmessages, many=True)
            return serialize.data if chatmessages else None
        except (ChatMessage.DoesNotExist, ValueError):
            return None
        
    async def disconnect(self, close_code):
        # Roi chat
        await self.channel_layer.group_discard(
            self.username, self.channel_name
        )

    async def receive(self, text_data):
        data = json.loads(text_data)
        data_source = data.get('source')
        print('receive', json.dumps(data, indent=2))
        if data_source == 'message-list':
            await self.receive_message_list(data)
        if data_source == 'message-user':
            await self.send_message_user(data)
        if data_source == 'message-list-restaurant':
            await self.receive_message_list_restaurant(data)
        if data_source == 'message-restaurant':
            await self.send_message_restaurant(data)

    async def receive_message_list(self, data):
        username = data.get('friend')
        user = await self.get_user_from_identifier()
        friend = await self.get_restaurant_from_name(username)
        chatmessage = await self.get_list_message(user, friend)
        if chatmessage is not None:
            await self.send_group(self.username, 'message-list', chatmessage)
            await self.send_group(username, 'message-list', chatmessage)

    async def send_message_user(self, data):
        username = data.get('friend')
        message = data.get('message')
        user = await self.get_user_from_identifier()
        friend = await self.get_restaurant_from_name(username)
        chatmessage = await self.create_message(user, friend, message, 'user')

        if chatmessage is not None:
            await self.send_group(self.username, 'message-list', chatmessage)
            await self.send_group(username, 'message-list', chatmessage)


    async def receive_message_list_restaurant(self, data):
        username = data.get('friend')
        user = await self.get_restaurant_from_identifier()
        friend = await self.get_user_from_name(username)
        chatmessage = await self.get_list_message(friend, user)
        if chatmessage is not None:
            await self.send_group(self.username, 'message-list', chatmessage)
            await self.send_group(username, 'message-list', chatmessage)

    async def send_message_restaurant(self, data):
        username = data.get('friend')
        message = data.get('message')
        user = await self.get_restaurant_from_identifier()
        friend = await self.get_user_from_name(username)
        chatmessage = await self.create_message(friend, user, message, 'restaurant')

        if chatmessage is not None:
            await self.send_group(self.username, 'message-list', chatmessage)
            await self.send_group(username, 'message-list', chatmessage)


    async def send_group(self, group, source, data):
        response = {
            'type': 'broadcast_group',
            'source': source,
            'data': data
        }
        await self.channel_layer.group_add(
            group, self.channel_name
        )
        await self.channel_layer.group_send(
            group, response
        )

    async def broadcast_group(self, event):
        message_data = event['data']
        asyncio.create_task(self.send(text_data=json.dumps(message_data)))