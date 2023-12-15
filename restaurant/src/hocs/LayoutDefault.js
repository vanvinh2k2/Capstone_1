import Sidebar from "../components/Sidebar/Sidebar";
import React, { useState } from 'react';
function LayoutDefault({children}) {
    const [isHidden, setIsHidden] = useState(false);
    const handleClick = () => {
      setIsHidden(!isHidden);
    };
    
    return ( 
        <div>
            <Sidebar isHidden={isHidden}/>
            <section id="content">
                <nav className='nav-header'>
                    <i className="fas fa-list" onClick={handleClick}></i>
                    <a href="/restaurant/account"><i className="fa-solid fa-user"></i></a>
                </nav>
                {children}
            </section>
        </div>
     );
}

export default LayoutDefault;