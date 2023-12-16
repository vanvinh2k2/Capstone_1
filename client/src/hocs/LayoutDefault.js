import React from "react";
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header';
import { checkAccessToken, refreshToken } from '../action/auth';
// import { TOKEN_VALID } from '../action/types';
import { useDispatch } from 'react-redux';
import { useEffect } from "react";

function LayoutDefault({children}) {
    const refreshToken1 = localStorage.getItem("refresh");
    // const accessToken = localStorage.getItem("access");
    const dispatch = useDispatch();

    // const isAccessTokenValid = async (accessToken) =>{
    //     // Kiểm tra thời hạn của Access Token
    //     const action = await checkAccessToken(accessToken)
    //     if(action.type === TOKEN_VALID) return true;
    //     return false;
    // }

    // if(refreshToken1!==null){
    //     isAccessTokenValid(refreshToken1).then((res) => {
    //         if (res) {
    //             console.log("ok con refresh")
    //           isAccessTokenValid(accessToken)
    //           .then((res2) => {
    //             if(res2){
    //                 console.log("ok con access")
    //             }
    //             else {
    //                 console.log("ok het access");
    //                 refreshToken(refreshToken1).then((res3)=>{
    //                     dispatch(res3)
    //                 })
    //                 .catch((error) => {
    //                     console.error(error);
    //                   });
    //             }
    //           })
    //           .catch((error) => {
    //             console.error(error);
    //           });
    //         } else {
    //             console.log("ok het refresh")
    //         }
    //       })
    //       .catch((error) => {
    //         console.error(error);
    //       });
    // }

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
    return ( 
        <>
            <Header/>
            <div className="content"> {children}</div>
            <Footer/>
        </>
     );
}

export default LayoutDefault;