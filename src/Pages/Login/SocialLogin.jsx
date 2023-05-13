import { useContext } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";


const SocialLogin = () => {
    const { user, signInWithGoogle } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";
    const handleSignInWithGoogle = () => {
        if (!user) {
            signInWithGoogle()
                .then(result => {
                    navigate(from, {replace: true});
                    })
                .catch(err => {
                    console.log(err);
                })
        } else {
            alert("You'r allready logged in This : " + user?.email)
        }
    }

    return (
        <>
            <div className="divider text-lg font-medium capitalize">or sign in with</div>
            <div className='flex justify-center gap-5 mt-3'>
                <Link onClick={handleSignInWithGoogle} className='p-3 rounded-full text-xl hover:bg-slate-300'><FaGoogle></FaGoogle></Link>
                <Link className='p-3 rounded-full text-xl hover:bg-slate-300'><FaGithub></FaGithub></Link>
            </div>
        </>
    );
};

export default SocialLogin;