import { FaGithub, FaLinkedin } from "react-icons/fa";

export const ButtonsSocial = ({len}:{len:number}) => {
  const social = [
    { link: "https://github.com/ZaidAR49", icon: <FaGithub />, name: "GitHub" },
    {
      link: "https://www.linkedin.com/in/zaid-radaideh-5b1a11332",
      icon: <FaLinkedin />,
    },
  ];

  return (
    <div className="carousel carousel-center rounded-box opacity-60  max-w-screen-md gap-4 sm:gap-6 lg:gap-7">
      {social.slice(0,len).map((item, index) => (
        <a
          key={index}
          className="carousel-item text-2xl sm:text-3xl lg:text-4xl"
          href={item.link}
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
};
