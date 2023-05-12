import { useParams } from "react-router-dom";
import ShareBanner from "../Shared/ShareBanner";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";

const Checkout = () => {
    const { user } = useContext(AuthContext)
    const { id } = useParams();
    const [service, setService] = useState({});
    useEffect(() => {
        fetch(`https://cars-doctor-server-chi.vercel.app/services/${id}`)
            .then(res => res.json())
            .then(data => setService(data))
    }, [])

    const handleBooking = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const bookingDate = form.date.value;
        const phone = form.phone.value;
        const email = form.email.value || user?.email ;
        const message = form.message.value ;
        const orderInfo = {
            name, bookingDate, phone, email, message, service
        }
        console.log(orderInfo);
        fetch('https://cars-doctor-server-chi.vercel.app/booking', {
            method: "POST",
            headers:{
                "content-type": "application/json"
            },
            body: JSON.stringify(orderInfo)
        })
        .then(res=>res.json())
        .then(data => {
            console.log(data)
        })

    }

    return (
        <>
            <ShareBanner>Checkout</ShareBanner>
            <div className="my-32">
                <h2>Book Service: {service.title}</h2>
                <div className="card w-full bg-gray-100 border-2 p-5 md:p-24">
                    <form onSubmit={handleBooking}>
                        <div className="md:grid flex flex-col md:grid-cols-2 gap-4">
                            <div className="">
                                <input type="text" name="name" placeholder="Your First Name" className="input input-bordered w-full" />
                            </div>
                            <div className="">
                                <input type="date" name="date" placeholder="Booking Date" className="input input-bordered w-full" />
                            </div>
                            <div className="">
                                <input type="text" name="phone" placeholder="Your Phone" className="input input-bordered w-full" />
                            </div>
                            <div className="">
                                <input type="text" name="email" placeholder="Your Email" className="input input-bordered w-full" defaultValue={user?.email} />
                            </div>
                            <div className="col-span-2">
                                <textarea name="message" placeholder="Your message" className="input input-bordered w-full h-40 pt-5" />
                            </div>
                            <div className=" col-span-2">
                                <button type="submit" className="btn btn-primary w-full bg-[#FF3811] hover:bg-[#fe6749]">Order Confirm</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Checkout;