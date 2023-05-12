import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Shared/Navbar";
import loginImg from "../../assets/images/login/login.svg"
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { FaGithub, FaGoogle } from "react-icons/fa";


const SignUp = () => {
    const {createUser} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value; 
        const email = form.email.value; 
        const password = form.password.value;
        console.log(name, email, password);
        createUser(email, password)
        .then((result) => {
            // Signed in 
            const user = result.user;
            console.log(user);
            navigate("/");
            // ...
          })
          .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
            // ..
          });
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
                        <h1 className="text-5xl font-bold text-center">Sign Up</h1>
                        <form onSubmit={handleRegister}>
                            <div className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="text" name="name" placeholder="Name" className="input input-bordered" />
                                </div>
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
                                </div>
                                <div className="form-control mt-6">
                                    <button type="submit" className="btn btn-primary bg-[#FF3811] hover:bg-[#fe6749]">Register Now</button>
                                </div>
                            </div>
                        </form>
                        <div>
                            <p className="text-lg font-medium text-center">or sign in with</p>
                            <div className='flex justify-center gap-5 mt-3'>
                                <Link className='p-3 rounded-full text-xl hover:bg-slate-300'><FaGoogle></FaGoogle></Link>
                                <Link className='p-3 rounded-full text-xl hover:bg-slate-300'><FaGithub></FaGithub></Link>
                            </div>
                            <p className="text-center">Have an account? <Link to="/login">
                            <span className="text-[#FF3811]">Log In</span></Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;