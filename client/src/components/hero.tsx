import { useNavigate } from "react-router-dom";
export const Hero = () => {
  const navigate = useNavigate();
  return (
    <>
  
    <div className="hero min-h-screen -mt-20">
      <div className="hero-content text-start flex-row justify-between gap-96 ">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold uppercase w-80 whitespace-nowrap">Hi, I'm Zaid Radaideh</h1>
          <p className="py-6">
             I’m a passionate <strong>Software Engineer</strong> focused on creating beautiful, high-performance web applications 
          </p>
          <div className="btn bg-[#06b6d4]" onClick={()=>{navigate("/contact")}}>Cuntact me</div>
        </div>
        <div>
            <img className="border-4 border-spacing-64 border-gray-400 w-96 h-96 rounded " src="me.jpg" alt="me" />
        </div>
      </div>
    
    </div>
      <div className="w-full h-px bg-white opacity-30"></div>
      <div className="h-80"></div>
    </>
  );
};