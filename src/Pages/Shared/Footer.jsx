import React from 'react';
import logo from "../../assets/logo.svg"
import { Link } from 'react-router-dom';
import { FaGoogle, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer p-10 bg-black text-white ">
            <div>
                <img src={logo} alt="" />
                <p>ACME Industries Ltd.<br />Providing reliable tech since 1992</p>
                <div className='flex justify-evenly gap-5 mt-3'>
                    <Link className='bg-slate-700 p-2 rounded-full'><FaGoogle></FaGoogle></Link>
                    <Link className='bg-slate-700 p-2 rounded-full'><FaTwitter></FaTwitter></Link>
                    <Link className='bg-slate-700 p-2 rounded-full'><FaInstagram></FaInstagram></Link>
                    <Link className='bg-slate-700 p-2 rounded-full'><FaLinkedin></FaLinkedin></Link>
                </div>
            </div>
            <div>
                <span className="footer-title opacity-100">Services</span>
                <a className="link link-hover">Branding</a>
                <a className="link link-hover">Design</a>
                <a className="link link-hover">Marketing</a>
                <a className="link link-hover">Advertisement</a>
            </div>
            <div>
                <span className="footer-title opacity-100">Company</span>
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Jobs</a>
                <a className="link link-hover">Press kit</a>
            </div>
            <div>
                <span className="footer-title opacity-100">Legal</span>
                <a className="link link-hover">Terms of use</a>
                <a className="link link-hover">Privacy policy</a>
                <a className="link link-hover">Cookie policy</a>
            </div>
        </footer>
    );
};

export default Footer;