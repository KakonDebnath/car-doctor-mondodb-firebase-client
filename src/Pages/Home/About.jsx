import parsonImg from "../../assets/images/about_us/person.jpg"
import partImg from "../../assets/images/about_us/parts.jpg"

const About = () => {
    return (
        <div className="hero min-h-screen my-28" id="about" >
            <div className="hero-content flex-col lg:flex-row p-0 my-5">
                <div className="lg:w-1/2 relative">
                    <div className="w-3/4">
                        <img src={parsonImg} className=" rounded-lg shadow-2xl" />
                    </div>
                    <img src={partImg} className="w-2/4 top-44 right-10 rounded-lg shadow-2xl absolute border-8 border-white" />
                </div>
                <div className="lg:w-1/2 pr-5">
                    <p className="text-[#FF3811] text-xl font-bold">About Us</p>
                    <h2 className="text-5xl font-bold w-3/4">We are qualified & of experience in this field</h2>
                    <p className="py-6">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>
                    <p>the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>
                    <button className="btn btn-outline btn-error mt-7">Get More Info</button>
                </div>
            </div>
        </div>
    );
};

export default About;