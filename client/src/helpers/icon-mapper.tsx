import React from 'react';
import {
    SiPython, SiJavascript, SiCplusplus, SiTypescript, SiPhp, SiRuby, SiGo, SiSwift, SiKotlin, SiRust, SiDart, SiScala, SiR, SiMysql, SiHtml5, SiCss3, SiReact, SiAngular, SiVuedotjs, SiNextdotjs, SiSvelte, SiJquery, SiBootstrap, SiTailwindcss, SiNodedotjs, SiDjango, SiFlask, SiSpringboot, SiDotnet, SiLaravel, SiExpress, SiRubyonrails, SiFastapi, SiGraphql, SiPostgresql, SiMongodb, SiRedis, SiOracle, SiSqlite, SiApachecassandra, SiElasticsearch, SiFirebase, SiMariadb, SiAmazonwebservices, SiGooglecloud, SiDocker, SiKubernetes, SiJenkins, SiTerraform, SiAnsible, SiGitlab, SiCircleci, SiNginx, SiApache, SiLinux, SiUbuntu, SiGnubash, SiGit, SiGithub, SiTensorflow, SiPytorch, SiScikitlearn, SiPandas, SiNumpy, SiApachespark, SiApachehadoop, SiTableau, SiFlutter, SiIonic, SiAndroid, SiIos, SiUnity, SiUnrealengine, SiFigma, SiPostman, SiJira, SiSelenium, SiCypress, SiWireshark, SiMetasploit, SiOwasp, SiSplunk, SiDatadog, SiPrometheus, SiGrafana, SiBlockchaindotcom, SiEthereum, SiSolidity, SiWebassembly, SiOpenai, SiAppium, SiNuxtdotjs, SiSwagger
} from "react-icons/si";
import { FaDatabase, FaServer, FaCode, FaJava, FaMicrosoft, FaChartLine, FaRobot } from "react-icons/fa";
import { BiLogoAws } from "react-icons/bi";

// Map specifically requested technologies
const iconMap: { [key: string]: React.ReactNode } = {
    "Python": <SiPython />,
    "JavaScript": <SiJavascript />,
    "Java": <FaJava />, // Fixed: SiJava not found, using FaJava
    "C#": <span className="font-bold text-xs">C#</span>, // Manual fallback
    "C++": <SiCplusplus />,
    "TypeScript": <SiTypescript />,
    "PHP": <SiPhp />,
    "Ruby": <SiRuby />,
    "Go": <SiGo />,
    "Swift": <SiSwift />,
    "Kotlin": <SiKotlin />,
    "Rust": <SiRust />,
    "Dart": <SiDart />,
    "Scala": <SiScala />,
    "R": <SiR />,
    "SQL": <FaDatabase />,
    "HTML5": <SiHtml5 />,
    "CSS3": <SiCss3 />,
    "React": <SiReact />,
    "Angular": <SiAngular />,
    "Vue.js": <SiVuedotjs />,
    "Next.js": <SiNextdotjs />,
    "Nuxt": <SiNuxtdotjs />,
    "Nuxt.js": <SiNuxtdotjs />,
    "Svelte": <SiSvelte />,
    "jQuery": <SiJquery />,
    "Bootstrap": <SiBootstrap />,
    "Tailwind CSS": <SiTailwindcss />,
    "Node.js": <SiNodedotjs />,
    "Django": <SiDjango />,
    "Flask": <SiFlask />,
    "Spring Boot": <SiSpringboot />,
    "ASP.NET Core": <SiDotnet />,
    "Laravel": <SiLaravel />,
    "Express.js": <SiExpress />,
    "Ruby on Rails": <SiRubyonrails />,
    "FastAPI": <SiFastapi />,
    "GraphQL": <SiGraphql />,
    "REST API": <FaServer />,
    "PostgreSQL": <SiPostgresql />,
    "MySQL": <SiMysql />,
    "MongoDB": <SiMongodb />,
    "Redis": <SiRedis />,
    "Oracle Database": <SiOracle />,
    "Microsoft SQL Server": <FaDatabase />, // Fixed: SiMicrosoftsqlserver not found
    "SQLite": <SiSqlite />,
    "Cassandra": <SiApachecassandra />,
    "Elasticsearch": <SiElasticsearch />,
    "Firebase": <SiFirebase />,
    "MariaDB": <SiMariadb />,
    "DynamoDB": <BiLogoAws />,
    "AWS": <SiAmazonwebservices />,
    "Microsoft Azure": <FaMicrosoft />, // Fixed: SiMicrosoftazure not found
    "Google Cloud Platform": <SiGooglecloud />,
    "Docker": <SiDocker />,
    "Kubernetes": <SiKubernetes />,
    "Jenkins": <SiJenkins />,
    "Terraform": <SiTerraform />,
    "Ansible": <SiAnsible />,
    "GitLab CI": <SiGitlab />,
    "CircleCI": <SiCircleci />,
    "Nginx": <SiNginx />,
    "Apache HTTP Server": <SiApache />,
    "Linux": <SiLinux />,
    "Ubuntu": <SiUbuntu />,
    "Bash/Shell": <SiGnubash />,
    "Git": <SiGit />,
    "GitHub": <SiGithub />,
    "TensorFlow": <SiTensorflow />,
    "PyTorch": <SiPytorch />,
    "Scikit-learn": <SiScikitlearn />,
    "Pandas": <SiPandas />,
    "NumPy": <SiNumpy />,
    "Apache Spark": <SiApachespark />,
    "Hadoop": <SiApachehadoop />,
    "Tableau": <SiTableau />,
    "Power BI": <FaChartLine />, // Using generic chart icon if not found
    "Flutter": <SiFlutter />,
    "React Native": <SiReact />,
    "Ionic": <SiIonic />,
    "Android": <SiAndroid />,
    "iOS": <SiIos />,
    "Unity": <SiUnity />,
    "Unreal Engine": <SiUnrealengine />,
    "Figma": <SiFigma />,
    "Postman": <SiPostman />,
    "Jira": <SiJira />,
    "Selenium": <SiSelenium />,
    "Appium": <SiAppium />,
    "Playwright": <FaRobot />, // Fallback as SiPlaywright is missing in this version
    "Cypress": <SiCypress />,
    "Wireshark": <SiWireshark />,
    "Metasploit": <SiMetasploit />,
    "OWASP ZAP": < SiOwasp />,
    "Splunk": <SiSplunk />,
    "Datadog": <SiDatadog />,
    "Prometheus": <SiPrometheus />,
    "Grafana": <SiGrafana />,
    "Blockchain": <SiBlockchaindotcom />,
    "Ethereum": <SiEthereum />,
    "Solidity": <SiSolidity />,
    "WebAssembly": <SiWebassembly />,
    "Swagger": <SiSwagger />,
    "OpenAI API": <SiOpenai />
};

export const getIconForTechnology = (name: string): React.ReactNode => {
    // Exact match
    if (iconMap[name]) {
        return iconMap[name];
    }

    // Case insensitive match
    const lowerName = name.toLowerCase();
    const entry = Object.entries(iconMap).find(([key]) => key.toLowerCase() === lowerName);
    if (entry) {
        return entry[1];
    }

    // Default icon
    return <FaCode />;
};

export const availableTechnologies = Object.keys(iconMap);
