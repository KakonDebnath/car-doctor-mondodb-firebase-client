// import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';

const ServiceCard = ({ service }) => {
    const { _id, img, title, price } = service;
    return (
        <div className="card w-96 bg-base-100 transition-all duration-300 hover:shadow-2xl shadow-lg">
            <figure className='px-10 pt-10'>
                <img src={img} alt="Shoes" className='rounded-xl object-fit w-[314px] h-[208px]' />
                </figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <div className="flex justify-between text-[#FF3811]">
                    <p>Price : ${price}</p>
                    {/* <span className='cursor-pointer p-2 '><FaArrowRight></FaArrowRight></span> */}
                    <Link to={`/checkout/${_id}`}>
                        <button>Book now</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;