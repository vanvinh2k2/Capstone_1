import React from "react";
import HeaderBottom from "./HeaderBottom/HeaderBottom";
import HeaderTop from "./HeaderTop/HeaderTop";
import HeaderMenu from "./HeaderMenu/HeaderMenu";
import { useEffect } from "react";

function Header({q, setQ}) {
    
    useEffect(() => {
        const stick = document.querySelector(".humberger__open");
        const stick2 = document.querySelector(".humberger__menu__overlay");
        const menu = document.querySelector(".humberger__menu__wrapper")

        if (stick) {
            stick.addEventListener('click', function () {
                
                menu.classList.add("show__humburger__menu__wrapper");
                document.querySelector(".humberger__menu__overlay").classList.add("active");
                document.querySelector("body").classList.add("over_hid");
                menu.style.opacity = 1;
                menu.style.left = 0;
            });
        }
        if (stick2) {
            stick2.addEventListener('click', function () {
                menu.classList.remove("show__humburger__menu__wrapper");
                document.querySelector(".humberger__menu__overlay").classList.remove("active");
                document.querySelector("body").classList.remove("over_hid");
                menu.style.opacity = 0;
                menu.style.left = null;
            });
        }
    }, []);

    return ( 
        <>
            <HeaderMenu/>
            <header className="header">
                <div className="header__top">
                    <HeaderTop q={q} setQ={setQ}/>
                </div>
                <div className="header__bottom">
                    <HeaderBottom/>
                </div>
            </header>
        </>
     );
}

export default Header;