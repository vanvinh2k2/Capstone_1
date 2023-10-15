function ChatMessage() {
    return ( 
        <div>
            <nav className='nav-header'>
                <i class="fas fa-list"></i>
                <i class="fa-solid fa-user"></i>
            </nav>
            <nav className='nav-middle'>
                <p className='top'>Chat Messages</p>
                <p>Home</p>
                <i class="fas fa-chevron-right"></i>
                <p>Chat Messages</p>
            </nav>
        </div>
     );
}

export default ChatMessage;