# from channels.generic.websocket import WebsocketConsumer
# from asgiref.sync import async_to_sync
# from django.db.models import Q
# import json
# from .serializers import *
# from auths.models import User

# class ChatConsumer(WebsocketConsumer):
#     def connect(self):
#         # user = self.scope["user"]
#         print(user)
#         # if not user.is_authenticated:
#         #     return
#         self.username = user.username
#         #Dua user nay vao nhom chat
#         async_to_sync(self.channel_layer.group_add)(
#             self.username, self.channel_name
#         )
#         self.accept()

#     def disconnect(self, close_code):
#         # Roi chat
#         async_to_sync(self.channel_layer.group_discard)(
#             self.username, self.channel_name
#         )

#     def receive(self, text_data):
#         data = json.loads(text_data)
#         data_source = data.get('source')
#         print('receive', json.dumps(data, indent=2))
#         # if data_source == 'search':
#         #     self.receive_search(data)
#         # if data_source == 'connect':
#         #     self.receive_connect(data)
#         if data_source == 'message':
#             self.receive_message_send(data)
        
#         if data_source == 'message-list':
#             self.receive_message_list(data)

#     def receive_message_list(self, data):
#         username = data.get('friend')
#         user = self.scope["user"]

#         friend = Restaurant.objects.get(username=username)





#         # friend = User.objects.get(username=username)
#         chatmessage = ChatMessage.objects.filter(
#             Q(msg_sender=user),
#             Q(msg_receiver=friend)
#         ).order_by('date')
#         serialize = MessageSerializer(chatmessage, many=True)
#         # print(friend, user)
#         self.send_group(self.username, 'message-list', serialize.data)
#         # self.send_group(username, 'message-list', serialize.data)

#     def receive_message_send(self, data):
#         username = data.get('friend')
#         message = data.get('message')
#         user = self.scope["user"]
#         friend = User.objects.get(username=username)
#         ChatMessage.objects.create(
#             msg_sender=user,
#             msg_receiver=friend,
#             body=message
#         )
#         chatmessage = ChatMessage.objects.filter(
#             Q(msg_sender=user) | Q(msg_sender=friend),
#             Q(msg_receiver=friend) | Q(msg_receiver=user)
#         ).order_by('date')
#         serialize = MessageSerializer(chatmessage, many=True)
#         # print(friend, user)
#         self.send_group(self.username, 'message-list', serialize.data)
#         self.send_group(username, 'message-list', serialize.data)

#     def send_group(self, group, source, data):
#         response = {
#             'type': 'broadcast_group',
# 			'source': source,
# 			'data': data
#         }
#         async_to_sync(self.channel_layer.group_add)(
#             group, self.channel_name
#         )
#         #Dua user nay vao nhom chat
#         async_to_sync(self.channel_layer.group_send)(
#             group, response
#         )

#     def broadcast_group(self, event):
#         # Xử lý thông điệp loại 'broadcast_group'
#         message_data = event['data']
#         # Thực hiện xử lý dữ liệu
#         self.send(text_data=json.dumps(message_data))

from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from auths.models import User
from core.models import Restaurant
import json

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.identifier = self.scope["url_route"]["kwargs"]["identifier"]
        if len(str(self.identifier))>3:
            if str(self.identifier)[:3] == "res":
                user = await self.get_restaurant_from_identifier()
        else: 
            user = await self.get_user_from_identifier()
            if user is None or not user.is_authenticated:
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
        
    async def disconnect(self, close_code):
        # Roi chat
        await self.channel_layer.group_discard(
            self.username, self.channel_name
        )

    async def receive(self, text_data):
        data = json.loads(text_data)
        data_source = data.get('source')
        print('receive', json.dumps(data, indent=2))
        # if data_source == 'message':
        #     self.receive_message_send(data)
        # if data_source == 'message-list':
        #     self.receive_message_list(data)
