import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Shared/Navbar";
import loginImg from "../../assets/images/login/login.svg"
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import SocialLogin from "./SocialLogin";


const Login = () => {
    const { logInUser } = useContext(AuthContext)
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        logInUser(email, password)
            .then((result) => {
                navigate(from, { replace: true });
            })
            .catch((err) => {
                console.log(err);
            })
    }


    return (
        <>
            <Navbar />
            <div className="hero min-h-screen place-items-stretch">
                <div className="hero-content flex-col lg:flex-row ">
                    <div className="w-1/2">
                        <img src={loginImg} alt="" />
                    </div>
                    <div className="card flex-shrink-0 w-1/2 bg-base-100 border-2 p-16">
                        <h1 className="text-5xl font-bold text-center">Login</h1>
                        <form onSubmit={handleLogin}>
                            <div className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="text" name="email" placeholder="email" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" name="password" placeholder="password" className="input input-bordered" />
                                    <label className="label">
                                        <Link className="label-text-alt link link-hover">Forgot password?</Link>
                                    </label>
                                </div>
                                <div className="form-control mt-6">
                                    <button type="submit" className="btn btn-primary bg-[#FF3811] hover:bg-[#fe6749]">Sign in</button>
                                </div>
                            </div>
                        </form>
                        <div>
                            <SocialLogin></SocialLogin>
                            <p className="text-center">Have an account? <Link to="/register">
                                <span className="text-[#FF3811]">Sign Up</span></Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;