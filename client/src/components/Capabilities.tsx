import { userInfo } from "../data/about-data";

// Remove local arrays and marquee animation. Only use userInfo arrays and breathing animation.
export const Capabilities = () => {
  return (
    <>
      <div className="flex flex-col gap-10 my-16 sm:my-24 lg:mt-32 p-4 sm:p-10 lg:p-32">
        <div className="header-primary text-3xl sm:text-4xl lg:text-6xl mb-4"> my Capabilities</div>
        <div className=" p-6 sm:p-8 max-w-5xl shadow-lg">
          <p className="text-gray-300 text-base sm:text-lg lg:text-xl whitespace-pre-line">{userInfo.descCapabilities}</p>
        </div>
        <div className="mt-8">
          <div className="header-secondary text-xl sm:text-2xl mb-6">Tech Stack</div>
          <div className="flex flex-wrap gap-6 justify-start mt-16">
            {userInfo.techIcons.map((tech, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center bg-gray-900 border border-gray-800 rounded-lg p-4 min-w-[100px] sm:min-w-[120px] transition-transform hover:scale-110 hover:border-cyan-400 shadow-md mx-2 animate-breathing"
              >
                <div className="text-3xl sm:text-4xl mb-2">{tech.icon}</div>
                <div className="text-xs sm:text-sm text-gray-200 font-semibold">{tech.name}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Render Tools & Others section if userInfo.toolsAndOthers exists */}
        {userInfo.toolsAndOthers && userInfo.toolsAndOthers.length > 0 && (
          <div className="mt-12">
            <div className="header-secondary text-xl sm:text-2xl mb-6">Tools & Others</div>
            <div className="flex flex-wrap gap-6 justify-start mt-16">
              {userInfo.toolsAndOthers.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center bg-gray-900 border border-gray-800 rounded-lg p-4 min-w-[100px] sm:min-w-[120px] transition-transform hover:scale-110 hover:border-cyan-400 shadow-md mx-2 animate-breathing"
                >
                  <div className="text-3xl sm:text-4xl mb-2">{item.icon}</div>
                  <div className="text-xs sm:text-sm text-gray-200 font-semibold">{item.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="w-full h-px bg-white opacity-30 mt-12"></div>
      </div>
      <div className="flex flex-col p-4 sm:p-6 lg:p-10 mt-10 gap-10 mb-12"></div>
    </>
  );
};