
import {useState, useEffect, useMemo, memo} from 'react';
import notmessageimg from '../../../assets/images/no_message.png';
import { w3cwebsocket } from 'websocket';

function ContentChat(props) {
  // console.log("okko");
    let token = localStorage.getItem("token");
    // let token1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY5OTk1ODU4MiwiaWF0IjoxNjk5MzUzNzgyLCJqdGkiOiIwYTA0N2MxNTY4M2U0MzE4OGVmODUwNmQ3MWY4OGY2NyIsInVzZXJfaWQiOjF9.CiS-o2IAtERRMLasLYJerO9qDEAr0XTX3llx3uQZIZI';
    const client = useMemo(() => new w3cwebsocket(`ws://127.0.0.1:8000/chat/?token=${token}`), [token]);
    const [message, setMessage] = useState('');
    const [listMessage, setListMessage] = useState([]);
    const [isConnect, setIsConnect] = useState(false);
    const [friend, setFriend] = useState({});
    // const [connectUser, setConnectUser] = useState('');
    // const [users, setUsers] = useState([]);
    // const [user, setUser] = useState();
    // const [clear, setClear] = useState(false);

    useEffect(()=>{
      setFriend(props.friend);
    }, [props.friend])

    useEffect(() => {
      console.log("hoi lai")
        client.onopen = () => {
          console.log('WebSocket Client Connected');
          if(client.OPEN) setIsConnect(true);
        };
        client.onmessage = (event) => {
          // console.log("hoi lai mm")
          setListMessage(JSON.parse(event.data));
          console.log(JSON.parse(event.data));
          // setUsers([...data])
        };
        client.onerror = (e) => {
          console.log(e);
        };
        client.onclose = () => {
          console.log('WebSocket Client Closed');
        };
      }, [client]);

      // useEffect(()=>{
      //   setDisplayUser([...users]);
      //   if(users && users.length>0){
      //     setConnectUser(users[0].username);
      //     setFriend(users[0]);
      //   }
      // }, [users])

      // console.log(friend);

    useEffect(()=>{
        if(isConnect === true && friend){
          console.log(friend, "olp");
          client.send(JSON.stringify({
            source: 'message-list',
            friend: friend.username
          }));
        }
      }, [isConnect, friend])

    // console.log(listMessage)

    function sendMessage() {
      console.log("lpop")
        if (message.trim() === '') return;
        client.send(JSON.stringify({ 
          source: 'message',
          friend: props.friend.username,
          message: message
        }));
        setMessage('')
        // console.log(message)
      };

    function handelSend(){
      sendMessage();
    }

    // console.log(props.friend);

    return ( 
      <div className="col-12 col-lg-7 col-xl-8" style={{borderLeft: '1px solid #ccc'}}>
        <div className="py-2 px-4 border-bottom d-none d-lg-block">
          <div className="d-flex align-items-center py-1">
            <div className="position-relative">
              <img src={`${props.friend?props.friend.image: ""}`} className="rounded-circle avatar" width={40} height={40}/>
            </div>
            <div className="flex-grow-1 pl-3">
              <h6 className='m-0'>{props.friend?props.friend.username: ""}</h6>
              <div className="text-muted small">
                <em>Online</em>
              </div>
            </div>
          </div>
        </div>
        <div className="position-relative">
          <div className="chat-messages p-4">
            {listMessage?listMessage.map((item, index)=>{
              if(item.msg_sender.username === localStorage.getItem("username")){
                return(
                  <div className="chat-message-right pb-4 mw-70">
                    <div>
                      {/* <img
                        src="https://bootdey.com/img/Content/avatar/avatar1.png"
                        className="rounded-circle avatar"
                        alt="Chris Wood"
                        width={40}
                        height={40}
                      /> */}
                      {/* <div className="text-muted small text-nowrap mt-2">
                        2:33 am
                      </div> */}
                    </div>
                    <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">{item.body}</div>
                  </div>
                )
              }else{
                return(
                  <div className="chat-message-left pb-4 mw-70">
                    <div>
                      <img
                        src={`http://127.0.0.1:8000${item.msg_sender.image}`}
                        className="rounded-circle mr-1"
                        alt="Sharon Lessman"
                        width={40}
                        height={40}
                      />
                      {/* <div className="text-muted small text-nowrap mt-2">
                        2:34 am
                      </div> */}
                    </div>
                    <div className="flex-shrink-1 bg-#ccc py-2 px-3 ml-3">{item.body}</div>
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