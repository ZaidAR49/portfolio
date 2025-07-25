import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt } from "react-icons/fa";
import {
  SiPostgresql,
  SiTailwindcss,
  SiJavascript,
  SiTypescript,
  SiSharp,
  SiPostman,
  SiCypress,
  SiFigma,
  SiGit,
  SiGithub,
} from "react-icons/si";


export const userInfo = {
  name: "Zaid Radaideh",
  role: "Software Engineer",
  email: "zaidradaideh.dev@gmail.com",
  descHero: "focused on creating beautiful, high-performance web applications.",
  titleAbout: `I am a software engineer in Jordan With a foundation in engineering and a passion for technology, 
  I build end-to-end web applications that are fast, accessible, and scalable.`,
  descAbout: (
    <>
      I’m a <strong>Jordanian web developer</strong> passionate about building
      high-quality, user-centric web applications. I specialize in creating
      efficient and scalable solutions using modern technologies like
      <strong>React</strong>, <strong>Node.js</strong>,
      <strong>PostgreSQL</strong>, and <strong>Tailwind CSS</strong>. With a
      strong foundation in
      <strong>both front-end and back-end development</strong>, I strive to
      write clean, maintainable code and continuously improve user experience
      through thoughtful design and performance optimization. I hold a degree
      from <strong>Jordan University of Science and Technology</strong> , where
      I developed my technical skills and deepened my passion for
      <strong>full-stack development</strong>
    </>
  ),

  dgree: "Jordan University of sinace and technology in software engineering",
  resuma:
    "https://drive.google.com/file/d/1j2wiv627G8YNUCjthsCPK4D5NE57Z6xd/view?usp=drive_link",
  descCapabilities: `I specialize in building real-world applications through hands-on, practical projects. My core strengths lie in full-stack development, with a focus on writing clean, maintainable, and scalable code.

I am always eager to expand my skill set and stay current with modern technologies. So far, I’ve gained solid experience with tools and frameworks.`,
      
experience :[
  {
    peroid:"sep 2021 - sep 2025",
    role: "student",
    companey:"Jordan University of sinace and technology",
desc:`As a recent computer science graduate, I gained hands-on experience through university and personal projects.
 Throughout my academic journey, we followed the complete software development life cycle from gathering requirements
  and planning, to development, testing, and deployment. These projects helped me apply real-world development practices
   in collaborative and individual settings.
`

  },
  {
    peroid: "Jun 2025 - presnt",
    role : " Quality Assurance Internship",
    companey:"Real Soft Advanced applications",
    desc: ` Gained experience in business requirements and quality assurance by working on real-world problems.
     RealSoft is a leading company in Jordan that develops government applications, which gave me valuable insight into
      how large companies operate and maintain high-quality software standards`

  }
],
      techIcons : [
    { icon: <FaReact />, name: "React" },
    { icon: <FaNodeJs />, name: "Node.js" },
    { icon: <SiPostgresql />, name: "PostgreSQL" },
    { icon: <FaHtml5 />, name: "HTML" },
    { icon: <FaCss3Alt />, name: "CSS3" },
    { icon: <SiTailwindcss />, name: "Tailwind CSS" },
    { icon: <SiJavascript />, name: "JavaScript" },
    { icon: <SiTypescript />, name: "TypeScript" },
    {icon : <SiSharp />, name: "C#"},
  ],
  toolsAndOthers:[
    {icon: <SiGit/>, name:"Git"},
    {icon: <SiGithub/>,name:"GitHub"},
    {icon:<SiCypress/>,name:"Cypress"},
    {icon:<SiPostman/>, name:"Postman"},
    {icon:<SiFigma/>,name:"Figma"}
  ]
};
