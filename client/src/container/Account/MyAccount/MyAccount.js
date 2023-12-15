import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { get_account, change_account } from '../../../action/account';

function MyAccount() {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [img, setImg] = useState(null);
    const [phone, setPhone] = useState("");
    const account = useSelector(state=>state.account.account);
    const dispatch = useDispatch();

    const chooseFile = (event) => {
        const fileInput = event.target;
        if (fileInput.files && fileInput.files[0]) {
            setImg(fileInput.files[0]);
            let reader = new FileReader();
            reader.onload = function (e) {
                const imgProfile = document.querySelector('.img-profile');
                imgProfile.setAttribute('src', e.target.result);
            }
            reader.readAsDataURL(fileInput.files[0]);
        }
    }

    const onsubmit = async(e) =>{
        e.preventDefault();
        const action = await change_account(
            name,
            phone,
            address,
            img,
            localStorage.getItem('iduser'),
            localStorage.getItem("access")
        );
        dispatch(action);
    }

    useEffect(()=>{
        console.log(localStorage.getItem('iduser'), 
        localStorage.getItem("access"))
        async function getAccount(){
            const action = await get_account(
                localStorage.getItem('iduser'), 
                localStorage.getItem("access")
            );
            dispatch(action);
        }
        getAccount();
    }, [])

    useEffect(() => {
        setName(account.full_name);
        setPhone(account.phone);
        setAddress(account.address);
    }, [account]);


    return ( 
        <>
           <h3>My Profile</h3>
           <hr></hr>
           <div className="row" id="profile-content">
               <div className="col-lg-4 col-md-12">
                   <img src={account.avatar} className="img-profile"/>
                   <h3>{account.username}</h3>
               </div>
               <div className="col-lg-8 col-md-12" >
                   <div className="profile-list">
                       <div className="profile-item">
                           <p>Full name:</p>
                           <input className="profile-input" value={name==null? "Not have": name} onChange={e=>setName(e.target.value)}/>
                       </div>
                       <div className="profile-item">
                           <p>Email:</p>
                           <input className="profile-input" value={account.email} disabled/>
                       </div>
                       <div className="profile-item">
                           <p>Phone:</p>
                           <input className="profile-input" value={phone==null? "Not have": phone} onChange={e=>setPhone(e.target.value)}/>
                       </div>
                       <div className="profile-item">
                           <p>Address:</p>
                           <input className="profile-input" value={address ==null? "Not have": address} onChange={e=>setAddress(e.target.value)}/>
                       </div>
                       <div className="profile-item">
                           <p>Image:</p>
                           <input type="file" id="img-choice" onChange={chooseFile}></input>
                       </div>
                       <div className="profile-item">
                           <p></p>
                           <button className="btn" onClick={onsubmit}>Save</button>
                       </div>
                   </div>
               </div>
           </div>
        </>
     );
}

export default MyAccount;