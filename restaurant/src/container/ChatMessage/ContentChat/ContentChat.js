
import {useState, useEffect, useMemo, memo, useRef} from 'react';
import notmessageimg from '../../../assets/images/no_message.png';
import { w3cwebsocket } from 'websocket';

function ContentChat(props) {
    let token = localStorage.getItem("token");
    const client = useMemo(() => new w3cwebsocket(`ws://127.0.0.1:8000/chat/?token=${token}`), [token]);
    const [message, setMessage] = useState('');
    const [listMessage, setListMessage] = useState([]);
    const [isConnect, setIsConnect] = useState(false);
    const scrollContainerRef = useRef(0);

    useEffect(() => {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }, [listMessage]);

    useEffect(() => {
      if(props.friend !== null){
        client.onopen = () => {
          console.log('WebSocket Client Connected');
          if(client.OPEN) setIsConnect(true);
        };
        client.onmessage = (event) => {
          setListMessage(JSON.parse(event.data));
        };
        client.onerror = (e) => {
          console.log(e);
        };
        client.onclose = () => {
          console.log('WebSocket Client Closed');
        };
      }  
    }, [client, props.friend]);

    useEffect(()=>{
        if(isConnect === true && props.friend && Object.keys(props.friend).length > 0){
          client.send(JSON.stringify({
            source: 'message-list',
            friend: props.friend.username
          }));
        }
      }, [isConnect, props.friend])

    function sendMessage() {
        if (message.trim() === '') return;
        client.send(JSON.stringify({ 
          source: 'message',
          friend: props.friend.username,
          message: message
        }));
        setMessage('')
      };

    function handelSend(){
      sendMessage();
    }

    return ( 
      <div className="col-12 col-lg-7 col-xl-8" style={{borderLeft: '1px solid #ccc'}}>
        <div className="py-2 px-4 border-bottom">
          <div className="d-flex align-items-center py-1">
            <div className="position-relative">
              <img src={`${props.friend?props.friend.image: ""}`} className="rounded-circle avatar" width={40} height={40}/>
            </div>
            <div className="flex-grow-1 pl-3">
              <h6 className='m-0'>{props.friend?props.friend.username: ""}</h6>
              <div className="text-muted small">
                <em>{props.friend?props.friend.email: ""}</em>
              </div>
            </div>
          </div>
        </div>
        <div className="position-relative">
          <div className="chat-messages p-4" ref={scrollContainerRef}>
            {listMessage&&listMessage.length>0?listMessage.map((item, index)=>{
              if(item.msg_sender.username === localStorage.getItem("username")){
                return(
                  <div className="chat-message-right pb-1 mw-65 mt-1">
                    <div className="flex-shrink-1 py-2 px-3 mr-3 message2">{item.body}</div>
                  </div>
                )
              }else if(item.msg_receiver.username === localStorage.getItem("username") && listMessage[index+1] && listMessage[index+1].msg_receiver.username === item.msg_receiver.username){
                return(
                  <div className="chat-message-left pb-1 mw-65 mt-1 ml-40">
                    <div className="flex-shrink-1 bg-#ccc py-2 px-3 ml-3 message">{item.body}</div>
                  </div>
                )
              }
              else{
                return(
                  <div className="chat-message-left pb-1 mw-65 mt-1 align-items-end">
                      <img
                        src={`http://127.0.0.1:8000${item.msg_sender.image}`} className="rounded-circle mr-1" width={40} height={40}/>
                    <div className="flex-shrink-1 bg-#ccc py-2 px-3 ml-3 message">{item.body}</div>
                  </div>
                )
              }
            }):<div className='d-flex flex-column align-items-center'>
              <img src={notmessageimg} className='center mt-5 opacity-50'/>
              <h3 className='text-secondary mt-3'>No message</h3>
            </div>}
          </div>
        </div>
        <div className="flex-grow-0 py-3 px-4 border-top">
          <div className="input-group">
            <input type="text" className="form-control" placeholder={message === "" ? "Type your message" : ""}
            value={message}
            onChange={(e) => setMessage(e.target.value)}/>
              <button className="btn btn-primary" onClick={handelSend}>Send</button>
            </div>
          </div>
      </div>
     );
}

export default memo(ContentChat);