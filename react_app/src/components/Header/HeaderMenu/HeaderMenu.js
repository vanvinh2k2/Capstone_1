import logo from '../../../assets/images/logo1.png'

function HeaderMenu() {
    
    return ( 
        <>
            <div className="humberger__menu__overlay"></div>
    <div className="humberger__menu__wrapper">
        <div className="humberger__menu__logo">
             <a href="#"><img src={logo} alt=""/></a>
            <span>Shop Online</span>
        </div>
        <div className="humberger__menu__cart">
            <ul>
                <li><a href=""><i className="fa fa-heart"></i> <span>1</span></a></li>
                <li><a href=""><i className="fa fa-shopping-cart"></i> <span>1</span></a></li>
                <li><a href=""><i className="fa fa-user"></i></a>1</li> 
            </ul>
        </div>
        <nav className="humberger__menu__nav mobile-menu">
            <ul>
                <li className="active"><a href="./index.html">Home</a></li>
                <li><a href="">Vendor</a></li>
                <li><a href="#">Pages</a>
                    <ul className="header__menu__dropdown">
                        <li><a href="">Shoping Cart</a></li>
                        <li><a href="">Check Out</a></li>
                        <li><a href="./blog-details.html">Blog Details</a></li>
                    </ul>
                </li>
                <li><a href="">Contact Us</a></li>
            </ul>
        </nav>
        <div id="mobile-menu-wrap"></div>
    </div>
        </>
     );
}

export default HeaderMenu;