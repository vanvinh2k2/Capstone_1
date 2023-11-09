import img from '../../assets/images/res.png'

function ChatMessage() {
    return ( 
        <div className="container">
            <div className="chatmessage">
                <div className="form-chat">
                <div className="col-12">
                    {/* <h3 className="center">Chat Message</h3> */}
                    <div className="py-1 px-2 border-bottom d-none d-lg-block">
                    <div className="d-flex align-items-center py-1">
                        <div className="position-relative">
                            <img src={img} className="rounded-circle" width={40} height={40}/>
                        </div>
                        <div className="flex-grow-1 ml-3 ml-1">
                            <h6 className='m-0'>no name</h6>
                            <div className="text-muted small">
                                <em>Online</em>
                            </div>
                        </div>
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                    </div>
                    <div className="position-relative">
                        <div className="chat-messages p-1">
                            <div className="chat-message-right mw-65">
                                <div className="flex-shrink-1 py-2 px-3 mr-3">ko co chi het ko co chi het ko co chi het ko co chi het ko co chi het</div>
                            </div>
                            <div className="d-flex chat-message-left mw-65">
                                <img src={img}
                                    className="rounded-circle mr-1 avatar"
                                    width={40}
                                    height={40}/>
                                {/* <div className="text-muted small text-nowrap mt-2">
                                    2:34 am
                                </div> */}
                                <div className="flex-shrink-1 bg-#ccc py-2 px-3 ml-3">ok</div>
                            </div> 
                        </div>
                    </div>
                    <div className="flex-grow-0 py-2 px-2 border-top">
                    <div className="input-group">
                        <input type="text" className="form-control" 
                        />
                        <button className="btn btn-primary"
                        >Send</button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
     );
}

export default ChatMessage;