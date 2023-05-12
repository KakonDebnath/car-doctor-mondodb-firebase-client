import { useContext} from "react";
import ServiceCard from "./ServiceCard";
import { AuthContext } from "../../../provider/AuthProvider";

const Services = () => {
    const {services} = useContext(AuthContext);

    return (
        <div className="my-28" id="services">
            <div className='text-center px-60 space-y-3'>
                <p className="text-[#FF3811] text-xl font-bold">Service</p>
                <h2 className="text-5xl font-bold">Our Service Area</h2>
                <p className='pb-12'>the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>
            </div>
            <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        services && services.map(service => <ServiceCard
                            key={service?._id}
                            service={service}
                        />)
                    }
                </div>
                <button className="text-red-500 border border-red-500 hover:text-white py-3 px-6 rounded-lg hover:bg-red-500 hover:shadow-xl transition-all mt-12 relative left-1/2 -translate-x-1/2">More Services</button>
            </div>
        </div>
    );
};

export default Services;