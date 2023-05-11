import checkoutImg from "../../assets/images/checkout/checkout.png"
const ShareBanner = ({children}) => {
    return (
        <div className="flex box-border relative w-full">
            <img src={checkoutImg} className="w-full rounded-xl" />
            <div className="absolute left-24 top-1/2 -translate-y-1/2 text-white w-2/6 space-y-7 z-10">
                <h1 className="text-5xl font-bold">{children}</h1>
            </div>
            <div className="absolute z-10 bottom-0 left-1/2 -translate-x-1/2 bg-[#FF3811] px-6 py-3 rounded-t-3xl">
                <p className="text-white"> Home/{children}</p>
            </div>
            <div className="absolute bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)] h-full w-full rounded-xl">
            </div>
        </div>
    );
};

export default ShareBanner;