import React from "react";
import FooterLeft from './FooterLeft/FooterLeft'
import FooterRight from './FooterRight/FooterRight'
import FooterCenter from './FooterCenter/FooterCenter'

function Footer() {
    return ( 
        <div className="footer">
            <div className="container">
                <div className="row">
                    <FooterLeft/>
                    <FooterCenter/>
                    <FooterRight/>
                </div>
            </div>
        </div>
     );
}

export default Footer;