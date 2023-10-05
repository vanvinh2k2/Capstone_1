import user from '../../../assets/images/default.png'

function MyAccount() {
    const chooseFile = (event) => {
        const fileInput = event.target;
        if (fileInput.files && fileInput.files[0]) {
          let reader = new FileReader();
          reader.onload = function (e) {
            const imgProfile = document.querySelector('.img-profile');
            imgProfile.setAttribute('src', e.target.result);
          }
          reader.readAsDataURL(fileInput.files[0]);
        }
      }
    return ( 
        <>
           <h3>My Profile</h3>
           <hr></hr>
           <div className="row" id="profile-content">
               <div className="col-lg-4 col-md-12">
                   <img src={user} className="img-profile"/>
                   <h3>Nvv</h3>
               </div>
               <div className="col-lg-8 col-md-12" >
                   <div className="profile-list">
                       <div className="profile-item">
                           <p>Full name:</p>
                           <input className="profile-input" value="Not have"/>
                       </div>
                       <div className="profile-item">
                           <p>Email:</p>
                           <input className="profile-input" value="email"/>
                       </div>
                       <div className="profile-item">
                           <p>Phone:</p>
                           <input className="profile-input" value="Not have"/>
                       </div>
                       <div className="profile-item">
                           <p>Address:</p>
                           <input className="profile-input" value="Not have"/>
                       </div>
                       <div className="profile-item">
                           <p>Image:</p>
                           <input type="file" id="img-choice" onChange={chooseFile}></input>
                       </div>
                       <div className="profile-item">
                           <p></p>
                           <button className="btn">Save</button>
                       </div>
                   </div>
               </div>
           </div>
        </>
     );
}

export default MyAccount;