import Lottie from "lottie-react";
import loading from "../assets/lottie-loading.json";
export const Loading = () => {
    return (
        <div className="flex justify-center items-center h-screen ">
            <Lottie animationData={loading}
                loop={true}
                style={{ width: 250, height: 250 }}
            />
        </div>
    );
};