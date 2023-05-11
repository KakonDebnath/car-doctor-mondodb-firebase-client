import { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../assets/logo.svg"
import { AuthContext } from '../../provider/AuthProvider';
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
    const { user, logOutUser } = useContext(AuthContext);
    const handleLogout = () => {
        logOutUser()
            .then(() => {
                alert('Sign Out Successfully');
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const navItems = <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/">Blog</Link></li>
        <li><Link to="/">Contact</Link></li>
        {
            user ?
                <>
                    <li><Link onClick={handleLogout} to="/">Logout</Link></li>
                    <li><Link to={`/cart`}>My Cart</Link></li>
                    <li><p className='text-3xl'><FaUserCircle></FaUserCircle></p></li>
                </> :
                <li><Link to="/login">Login</Link></li>
        }
    </>
    return (
        <div className="navbar bg-base-100 h-40">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {navItems}
                    </ul>
                </div>
                <Link to="/">
                    <img className='object-contain' src={logo} alt="" />
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems}
                </ul>
            </div>
            <div className="navbar-end">
                <button className="btn btn-outline btn-error">Appointment</button>
            </div>
        </div>
    );
};

export default Navbar;