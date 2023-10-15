import logo from '../../assets/images/logo1.png'
function Login() {
  return ( 
    <div class="login">
        <div class="login-box">
            <div class="login-logo">
                <img src={logo} alt="Restaurant Reservation"/>
            </div>

            <div class="card">
                <div class="card-body">
                <p class="login-box-msg">Welcome</p>
                <form action="" method="post">
                    <input type="hidden"/>
                    
                    
                    <div class="input-group mb-3">
                        <input type="text" name="username" class="form-control" placeholder="Email" required=""/>
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-user"></span>
                            </div>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <input type="password" name="password" class="form-control" placeholder="Password" required=""/>
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-lock"></span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <button type="submit" class="btn btn-primary btn-block">
                                Log in
                            </button>
                        </div>
                    </div>
                </form>
                </div>
            </div>
        </div>
    </div>
   );
}

export default Login;