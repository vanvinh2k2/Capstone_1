import logo from '../../../assets/images/logo1.png';
import user from '../../../assets/images/default.png';

function HeaderMenu() {
    
    return ( 
        <>
            <div className="humberger__menu__overlay"></div>
            <div className="humberger__menu__wrapper">
                <div className="humberger__menu__logo my-2">
                    <a href="/"><img src={logo} alt="" height={80} width={80}/></a>
                    <span className='fw-bold mx-2'>Shop Online</span>
                </div>
                <hr className='my-0'></hr>
                <div className="humberger__menu__cart">
                    <ul className='list-unstyled d-flex align-items-center py-2'>
                        {localStorage.getItem("access") != null ? <>
                            <li><a href="/account"><img className="rounded rounded-circle" src={`${localStorage.getItem("avatar")}`} height={50} width={50}></img></a></li>
                            <li className='mx-3 fw-bold'><span>{localStorage.getItem("username")}</span></li> 
                        </>
                        : <>
                            <li><a href="/login"><img className="rounded rounded-circle" src={user} height={50} width={50}></img></a></li>
                            <li className='mx-3 fw-bold'><span>Login</span></li>
                        </>} 
                    </ul>
                </div>
                <hr className='my-0'></hr>
                <nav className="humberger__menu__nav mobile-menu my-3">
                    <ul className='list-unstyled my-2 mx-2'>
                        <li className="active py-3 hover hover">
                            <i class="fa-solid fa-house"></i>
                            <a href="/" className='mx-3'>Home</a>
                        </li>
                        <hr className='my-0 gray'></hr>
                        <li className="active py-3 hover">
                            <i class="fa-solid fa-bowl-food"></i>
                            <a href="/dish" className='mx-3'>Dishes</a>
                        </li>
                        <hr className='my-0 gray'></hr>
                        <li className="active py-3 hover">
                            <i class="fa-solid fa-clock-rotate-left"></i>
                            <a href="/history-order" className='mx-3'>History Order</a>
                        </li>
                        <hr className='my-0 gray'></hr>
                        <li className="active py-3 hover">
                            <i className="fa fa-heart"></i>
                            <a href="/love-restaurant" className='mx-3'>Restaurant Like</a>
                        </li>
                        <hr className='my-0 gray'></hr>
                        <li className="active py-3 hover">
                            <i class="fa-solid fa-magnifying-glass"></i>
                            <a href="/search-ai" className='mx-3'>Search AI</a>
                        </li>
                        <hr className='my-0 gray'></hr>
                        <li className="active py-3 hover">
                            <i class="fa-solid fa-address-card"></i>
                            <a href="/contact" className='mx-3'>Contact Us</a>
                        </li>
                    </ul>
                </nav>
                <div id="mobile-menu-wrap"></div>
            </div>
        </>
     );
}

export default HeaderMenu;