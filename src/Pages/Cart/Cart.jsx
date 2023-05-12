import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import ShareBanner from "../Shared/ShareBanner";

const Cart = () => {
    const [carts, setCart] = useState([]);
    const { user } = useContext(AuthContext);
    useEffect(() => {
        fetch(`https://cars-doctor-server-chi.vercel.app/cart/?email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setCart(data);
            })
    }, [])

    const handleDeleteCart = (id) => {
        console.log(id);
        fetch(`https://cars-doctor-server-chi.vercel.app/cartDelete/${id}`,{
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.deletedCount > 0){
                    alert("Successfully Deleted")
                    const remainingData = carts.filter(cart => cart._id !== id);
                    setCart(remainingData);
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
                            carts && carts.map(cart =>
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
                                        <button className="btn btn-info btn-xs mr-4">Confirm</button>
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