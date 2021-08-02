import './LoginPage.css';

function LoginPage() {
    return (
        <div className="container" style={{marginTop: "120px", marginBottom: "120px"}}>
            <div className="row">
                <div className="col-lg-10 col-xl-9 mx-auto">
                    <div className="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden">
                        <div className="card-img-left d-none d-md-flex">
                        </div>
                        <div className="card-body p-4 p-sm-5">
                            <h5 className="card-title text-center mb-5 fw-light fs-5"
                                style={{paddingBottom: "53px"}}>Admin - Login</h5>
                            <form>

                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingInputUsername"
                                           placeholder="username" required autoFocus/>
                                    <label htmlFor="floatingInputUsername">Username</label>
                                </div>

                                {/*<div className="form-floating mb-3">*/}
                                {/*    <input type="email" className="form-control" id="floatingInputEmail"*/}
                                {/*           placeholder="name@example.com"/>*/}
                                {/*    <label htmlFor="floatingInputEmail">Email address</label>*/}
                                {/*</div>*/}

                                {/*<hr/>*/}

                                <div className="form-floating mb-3">
                                    <input type="password" className="form-control" id="floatingPassword" required
                                           placeholder="Password"/>
                                    <label htmlFor="floatingPassword">Password</label>
                                </div>

                                {/*<div className="form-floating mb-3">*/}
                                {/*    <input type="password" className="form-control" id="floatingPasswordConfirm"*/}
                                {/*           placeholder="Confirm Password"/>*/}
                                {/*    <label htmlFor="floatingPasswordConfirm">Confirm Password</label>*/}
                                {/*</div>*/}

                                <div className="d-grid mb-2">
                                    <button className="btn btn-lg btn-primary btn-login fw-bold text-uppercase"
                                            style={{marginTop: "30px"}}
                                            type="submit">Login
                                    </button>
                                </div>

                                {/*<a className="d-block text-center mt-2 small" href="#">Have an account? Sign In</a>*/}

                                {/*<hr className="my-4"/>*/}

                                {/*<div className="d-grid mb-2">*/}
                                {/*    <button className="btn btn-lg btn-google btn-login fw-bold text-uppercase"*/}
                                {/*            type="submit">*/}
                                {/*        <i className="fab fa-google me-2"></i> Sign up with Google*/}
                                {/*    </button>*/}
                                {/*</div>*/}

                                {/*<div className="d-grid">*/}
                                {/*    <button className="btn btn-lg btn-facebook btn-login fw-bold text-uppercase"*/}
                                {/*            type="submit">*/}
                                {/*        <i className="fab fa-facebook-f me-2"></i> Sign up with Facebook*/}
                                {/*    </button>*/}
                                {/*</div>*/}

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;