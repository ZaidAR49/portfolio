import Lottie from "lottie-react";
import notFoundErrorAnimation from "../assets/lottie-notFound-error.json";
import serverErrorAnimation from "../assets/lottie-server-error.json";
import authErrorAnimation from "../assets/lottie-authentication-error.json";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const errorObject = {
    404: {
        speed: 1,
        animation: notFoundErrorAnimation,
        code: 404,
        title: "Page Not Found",
        description: "The page you are looking for doesn't exist or has been moved."
    },
    500: {
        speed: 1,
        animation: serverErrorAnimation,
        code: 500,
        title: "Server Error",
        description: "Something went wrong on our end. Please try again later."
    },
    401: {
        speed: 0.3,
        animation: authErrorAnimation,
        code: 401,
        title: "Authentication Error",
        description: "You are not authorized to access this page. Please log in to continue."
    },
    1000: {
        speed: 1,
        animation: serverErrorAnimation,
        code: 1000,
        title: "Server Error",
        description: "unknown error,please try again later."
    }
}

const Error = () => {
    const navigate = useNavigate();
    const lottieRef = useRef<any>(null);
    const location = useLocation();
    const errorType: keyof typeof errorObject = location.state || 404;
    useEffect(() => {
        lottieRef.current?.setSpeed(errorObject[errorType].speed);
    }, []);
    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4">
            <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-8 lg:gap-16 max-w-6xl mx-auto w-full">
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
                    <h1 className="text-6xl lg:text-8xl font-bold text-gray-200 dark:text-gray-500 select-none">
                        {errorObject[errorType].code}
                    </h1>
                    <div className="-mt-8 lg:-mt-12">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                            {errorObject[errorType].title}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-md">
                            {errorObject[errorType].description}
                        </p>
                    </div>
                    <div className="pt-2">
                        <button onClick={() => navigate("/")} className="flex-1 px-4 py-3 rounded-xl font-bold text-white bg-[var(--accent)] hover:bg-[var(--accent-hover)] transition-all shadow-lg hover:shadow-[0_0_15px_var(--accent)] active:scale-95">
                            Go to Home
                        </button>
                    </div>
                </div>

                <div className="flex justify-center items-center">
                    <div className="w-64 h-64 lg:w-96 lg:h-96">
                        <Lottie
                            lottieRef={lottieRef}
                            animationData={errorObject[errorType].animation}
                            loop={true}
                            style={{ width: '100%', height: '100%' }}
                            onLoadedImages={() => {
                                lottieRef.current?.setSpeed(errorObject[errorType].speed);
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Error;