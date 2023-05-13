import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import ShareBanner from "../Shared/ShareBanner";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const [carts, setCart] = useState([]);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const url = `https://cars-doctor-server-chi.vercel.app/cart/?email=${user?.email}`;
    useEffect(() => {
        fetch(url, {
            method: 'GET',
            headers:{
                authorization : `Bearer ${localStorage.getItem('car-doctor-access-token')}`, 
            }
        })
            .then(res => res.json())
            .then(data => {
                if(data.error){
                    alert(data.message + "Please Login Again to get data")
                    navigate('/');
                }else{
                    setCart(data);
                }
            })
    }, [url, navigate])

    const handleDeleteCart = (id) => {
        console.log(id);
        fetch(`https://cars-doctor-server-chi.vercel.app/cartDelete/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    alert("Successfully Deleted")
                    const remainingData = carts.filter(cart => cart._id !== id);
                    setCart(remainingData);
                }
            })
    }

    const handleStatusChange = (id) => {
        const updateStatusData = { status: "confirm" }
        fetch(`https://cars-doctor-server-chi.vercel.app/cartStatusUpdate/${id}`, {
            method: 'PATCH',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(updateStatusData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data?.modifiedCount > 0){
                    alert("Updated successfully");
                }
            })
    }


    return (
        <div>
            <ShareBanner>Cart Details</ShareBanner>
            <h1>My Total Cart is: {carts.length}</h1>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            carts && carts?.map(cart =>
                                <tr key={cart?._id}>
                                    <th>
                                        <label>
                                            <input type="checkbox" className="checkbox" />
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src="https://i.ibb.co/wCYwp53/header-Img.png" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{cart?.name}</div>
                                                <div className="text-sm opacity-50">{cart?.email}</div>
                                                <div className="text-sm opacity-50">{cart?.phone}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {cart?.service?.title}
                                        <br />
                                        {/* <span className="badge badge-ghost badge-sm">Desktop Support Technician</span> */}
                                    </td>
                                    <td>${cart?.service?.price}</td>
                                    <th>
                                        <button onClick={() => handleStatusChange(cart?._id)} className={`btn ${cart?.status === "pending" ? 'btn-info' : 'btn-error'} btn-xs mr-4`}>{cart?.status ? cart?.status : "pending"}</button>
                                        <button
                                            onClick={() => handleDeleteCart(cart?._id)}
                                            className="btn btn-error btn-xs">Delete</button>
                                    </th>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Cart;