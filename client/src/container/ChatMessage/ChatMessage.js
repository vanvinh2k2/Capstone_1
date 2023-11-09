import {useState, useEffect, useMemo, memo, useRef} from 'react';
import { w3cwebsocket } from 'websocket';
import notmessageimg from '../../assets/images/no_message.png';

function ChatMessage(props) {
    const [isClose, setIsClose] = useState(true);
    let token = localStorage.getItem("token");
    const client = useMemo(() => new w3cwebsocket(`ws://127.0.0.1:8000/chat/?token=${token}`), [token]);
    const [message, setMessage] = useState('');
    const [listMessage, setListMessage] = useState([]);
    const [isConnect, setIsConnect] = useState(false);
    const scrollContainerRef = useRef();

    useEffect(() => {
      // Thiết lập cuộn tới cuối cùng khi nội dung thay đổi
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }, [listMessage]);

    useEffect(() => {
          client.onopen = () => {
            console.log('WebSocket Client Connected');
            if(client.OPEN) setIsConnect(true);
          };
          client.onmessage = (event) => {
            setListMessage(JSON.parse(event.data));
            console.log(JSON.parse(event.data));
          };
          client.onerror = (e) => {
            console.log(e);
          };
          client.onclose = () => {
            console.log('WebSocket Client Closed');
          };
        }, [client]);

        useEffect(()=>{
            if(isConnect === true){
              client.send(JSON.stringify({
                source: 'message-list',
                friend: props.username
              }));
            }
          }, [isConnect])

    function handelClose(){
        setIsClose(false);
    }

    function sendMessage() {
          if (message.trim() === '') return;
          client.send(JSON.stringify({ 
            source: 'message',
            friend: props.username,
            message: message
          }));
          setMessage('')
        };
  
      function handelSend(){
        sendMessage();
      }
    
    return (
        isClose?(
            <div className="container">
            <div className="chatmessage shadow">
                <div className="form-chat">
                <div className="col-12">
                    <div className="py-1 px-2 border-bottom shadow-b">
                    <div className="d-flex align-items-center py-1">
                        <div className="position-relative">
                            <img src={props.image} className="rounded-circle" width={40} height={40}/>
                        </div>
                        <div className="flex-grow-1 ml-3 ml-1">
                            <h6 className='m-0'>{props.username}</h6>
                            <div className="text-muted small">
                                <em>Online</em>
                            </div>
                        </div>
                        <i class="fa-solid fa-xmark" onClick={handelClose}></i>
                    </div>
                    </div>
                    <div className="position-relative shadow-b">
                        <div className="chat-messages px-1 py-2" ref={scrollContainerRef}>
                            {listMessage&&listMessage.length>0?listMessage.map((item, index)=>{
                                if(item.msg_sender.username === localStorage.getItem("username")){
                                    return(
                                        <div className="chat-message-right mw-65 mt-2">
                                            <div className="flex-shrink-1 py-2 px-3 mr-3">{item.body}</div>
                                        </div>
                                    )
                                }else{
                                    return(
                                        <div className="d-flex chat-message-left mw-65 mt-2">
                                            <img src={props.image}
                                                className="rounded-circle mr-1 avatar"
                                                width={40}
                                                height={40}/>
                                            <div className="flex-shrink-1 py-2 px-3 ml-3 message">{item.body}</div>
                                        </div> 
                                    )
                                }
                            }):<div className='d-flex flex-column align-items-center'>
                            <img src={notmessageimg} className='center mt-5 opacity-50 img-null'/>
                            <h6 className='text-secondary mt-3'>No message</h6>
                            </div>}
                        </div>
                    </div>
                    <div className="flex-grow-0 py-2 px-2 border-top">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder={message === "" ? "Type your message" : ""}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}/>
                        <button className="btn btn-primary" onClick={handelSend}>Send</button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        ):null
     );
}

export default ChatMessage;