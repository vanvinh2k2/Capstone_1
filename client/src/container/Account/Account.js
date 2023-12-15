import Dashboard from "./Dashboard/Dashboard";
import MyAccount from "./MyAccount/MyAccount";
import { useState } from "react";
import { logout } from '../../action/auth'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGOUT } from "../../action/types";

function Account() {
    const [activeTab, setActiveTab] = useState('tab-0');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    async function handelLogout(){
        const action = await logout(localStorage.getItem('refresh'));
        dispatch(action);
        if(action.type === LOGOUT) navigate("/login");
    }

    return ( 
        <section className="account">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3>My Account</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-4">
                        <div className="account-menu">
                            <ul className="tab-header">
                                <li className={`${activeTab === 'tab-0' ? 'active' : ''}`} onClick={() => handleTabClick('tab-0')}><a><i className="fas fa-user-circle"></i>Profile</a></li>
                                <li className={`${activeTab === 'tab-1' ? 'active' : ''}`} onClick={() => handleTabClick('tab-1')}><a><i className="fas fa-tachometer-alt-average"></i>Dashboard</a></li>
                                <li onClick={handelLogout}><i className="fas fa-sign-out"></i>Logout</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-9 col-md-9 col-sm-8">
                        <div className="account-content">
                            <div className={`tab ${activeTab === 'tab-0' ? 'active' : ''}`}>
                                <MyAccount/>
                            </div>
                            <div className={`tab ${activeTab === 'tab-1' ? 'active' : ''}`}>
                                <Dashboard/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
     );
}

export default Account;