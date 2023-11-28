
import {useState, useEffect} from 'react';
import notfoundimg from '../../assets/images/not_found.png';
import {NavLink} from 'react-router-dom'
import ContentChat from './ContentChat/ContentChat';
import {useDispatch, useSelector} from 'react-redux'
import { friend_chat } from '../../action/auth';
import moment from 'moment';

function ChatMessage() {
    const [query, setQuery] = useState('');
    const [displayUser, setDisplayUser] = useState([]);
    const [friend, setFriend] = useState({});
    const friends = useSelector(state=>state.auth.friends);
    const dispatch = useDispatch();

    useEffect(()=>{
      async function getFriend(){
        const action  = await friend_chat(localStorage.getItem('rid'));
        dispatch(action);
    }
    getFriend();
    }, [])

    useEffect(()=>{
      setDisplayUser(friends);
      if(friends.length>0){
        setFriend(friends[0].msg_user);
      }
      
    }, [friends])

    function handleSearch(e){
      setQuery(e.target.value);
    }

    function handleConnect(e) {
      const clickedUsername = e.currentTarget.getAttribute('data-user');
      const newFriend = friends.find((item) => {
        return item.msg_user.username === clickedUsername;
        
      });
      console.log(newFriend)
      if (newFriend) {
        const friendToSet = newFriend.msg_user;
        setFriend(friendToSet);
      }
    }

    useEffect(()=>{
      if (query !== '') {
        const lowercaseQuery = query.toLowerCase();
        const filteredUsers = friends.filter(user => user.msg_user.username.toLowerCase().includes(lowercaseQuery));
        setDisplayUser(filteredUsers);
      } else {
        setDisplayUser(friends);
      }
    }, [query])
      
    return ( 
        <div>
            <nav className='nav-header'>
                <i class="fas fa-list"></i>
                <i class="fa-solid fa-user"></i>
            </nav>
            <nav className='nav-middle'>
              <div className="view-link">
                <p className='top'>Chat Messages</p>
                <p><NavLink to="/restaurant">Home</NavLink></p>
                <i class="fas fa-chevron-right"></i>
                <p>Chat Messages</p>
              </div>
            </nav>
            <main className="content">
              <div className="container p-0">
                <div className="card">
                  <div className="row g-0">
                    <div className="col-12 col-lg-5 col-xl-4 border-right">
                      <div className="px-4 d-none d-md-block">
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1">
                            <h3 className='mt-3'>Contact list</h3>
                            <input type="text" className="form-control my-3" placeholder="Search..." onChange={handleSearch}/>
                          </div>
                        </div>
                      </div>
                      <div className='px-4 d-none d-md-block'>
                        {displayUser && displayUser.length>0?displayUser.map((item, index)=>{
                          return (
                            <div className="list-group-item list-group-item-action border-0 mb-2" 
                            data-user={item.msg_user.username} onClick={handleConnect} key={index}>
                            <div className="d-flex align-items-start">
                              <img src={`${item.msg_user.image}`} className="rounded-circle avatar" width={40} height={40}/>
                              <div className='flex-grow-1'>
                                <h6 className='m-0'>{item.msg_user.username}</h6>
                                <div className='d-flex'>
                                  <p className='fs-14'>{item.body}</p>
                                  <p className='fs-10'>{moment.utc(item.date).local().startOf('seconds').fromNow()}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          )
                        }):<div className='d-flex flex-column align-items-center'>
                            <img src={notfoundimg} className='center mt-5'/>
                            <h3 className='text-secondary mt-3'>No results were found</h3>
                          </div>
                        }
                      </div>
                      <hr className="d-block d-lg-none mt-1 mb-0" />
                    </div>
                    <ContentChat friend={friend}/>
                  </div>
                </div>
              </div>
            </main>
      </div>
    )
}

export default ChatMessage;