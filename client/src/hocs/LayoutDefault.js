import React from "react";
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import { refreshToken } from '../action/auth';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from "react";

function LayoutDefault({children}) {
    const refreshToken1 = localStorage.getItem("refresh");
    const dispatch = useDispatch();
    const [q, setQ] = useState("");

    useEffect(()=>{
        let interval = setInterval(()=>{
        if(refreshToken1!==null){
          refreshToken(refreshToken1).then((res3)=>{
          dispatch(res3)
        })
        .catch((error) => {
            console.error(error);
          });}
        }, 15000)
        return ()=>clearInterval(interval);
      
    }, [])

    const childrenWithProps = React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, { q, setQ });
      }
      return child;
    });
    
    return ( 
        <>
            <Header q={q} setQ={setQ}/>
            <div className="content"> {childrenWithProps}</div>
            <Footer/>
        </>
     );
}

export default LayoutDefault;