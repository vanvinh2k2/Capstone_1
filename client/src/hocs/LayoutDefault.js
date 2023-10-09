import React from "react";
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'

function LayoutDefault({children}) {
    return ( 
        <>
            <Header/>
            <div className="content"> {children}</div>
            <Footer/>
        </>
     );
}

export default LayoutDefault;