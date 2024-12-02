import { 
  FaReact, 
  FaNode, 
  FaGitAlt, 
  FaSwift, 
  FaMobile, 
  FaServer, 
  FaGlobe, 
  FaDocker, 
  FaFigma,
  FaDatabase,
  FaVrCardboard,
  FaMap,
  FaHtml5,
  FaCss3,
  FaJava,
  FaGit,
  FaAws,
  FaLinux,
  FaVial,
  FaGithub,
  FaGitlab,
  FaBitbucket,
  FaSlack,
  FaDesktop,
  FaJira,
  FaTrello,
  FaCloud,
  FaMobileAlt, 
  FaVideo, 
  FaCube, 
  FaCode
} from "react-icons/fa";

import {
  SiNextdotjs,
  SiExpress,
  SiRedux,
  SiTailwindcss,
  SiJavascript,
  SiTypescript,
  SiPython,
  SiMongodb,
  SiFirebase,
  SiCplusplus,
  SiC,
  SiCsharp,
  SiMysql,
  SiPostgresql,
  SiRedis,
  SiGithubactions,
  SiSketch,
  SiAdobexd,
  SiZeplin,
  SiJest,
  SiCypress,
  SiPostman,
  SiVisualstudiocode,
  SiXcode,
  SiSourcetree,
  SiSwift,
  SiCoredata,
  SiSqlite,
  SiWebsocket,
  SiArkit,
  SiUikit,
  SiCocoaPods,
  SiIntellijidea,
  SiEclipse,
  SiPycharm,
  SiQt,
  SiNetbeans,
  SiSwagger,
  SiWorkplace,
  SiMicroservices
} from "react-icons/si";

import { BsStack } from "react-icons/bs";
import { TbBrandNextjs } from "react-icons/tb";
import {
  pathao,
  wind,
  glostars,
  iphone,
  binary,
  matrix,
  mobile,
  backend,
  creator,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  carrent,
  jobit,
  tripguide,
  threejs,
  datasoft,
} from "../assets";

export const navLinks = [
  { id: "about", title: "About" },
  { id: "work", title: "Work" },
  { id: "contact", title: "Contact" },
];

export const services = [
  { title: "iOS Developer", icon: FaMobile },
  { title: "React Developer", icon: FaReact },
  { title: "Backend Developer", icon: FaServer },
  { title: "Full Stack Developer", icon: BsStack },
];

export const technologies = {
  programming: {
    title: "Programming Languages",
    description: "Core programming languages I'm proficient in, showcasing my strong foundation in software development",
    skills: [
      { name: "Swift", icon: SiSwift, proficiency: "Expert" },
      { name: "Python", icon: SiPython, proficiency: "Advanced" },
      { name: "JavaScript", icon: SiJavascript, proficiency: "Intermediate" },
      { name: "TypeScript", icon: SiTypescript, proficiency: "Intermediate" },
      { name: "Java", icon: FaJava, proficiency: "Advanced" },
      { name: "C++", icon: SiCplusplus, proficiency: "Advanced" },
      { name: "C", icon: SiC, proficiency: "Advanced" },
      { name: "C#", icon: SiCsharp, proficiency: "Intermediate" }
    ]
  },

  frontend: {
    title: "Frontend Development",
    description: "Modern web technologies and frameworks for building responsive, interactive user interfaces",
    skills: [
      { name: "React", icon: FaReact, proficiency: "Advanced" },
      { name: "Next.js", icon: SiNextdotjs, proficiency: "Advanced" },
      { name: "Tailwind", icon: SiTailwindcss, proficiency: "Intermediate" },
      { name: "VS Code", icon: SiVisualstudiocode, proficiency: "Advanced" }
    ]
  },

  backend: {
    title: "Backend Development",
    description: "Server-side technologies and frameworks for building scalable, robust applications",
    skills: [
      { name: "Node.js", icon: FaNode, proficiency: "Advanced" },
      { name: "Express", icon: SiExpress, proficiency: "Advanced" },
      { name: "REST API", icon: FaServer, proficiency: "Advanced" },
    ]
  },

  mobile: {
    title: "iOS Development",
    description: "Comprehensive iOS development stack and frameworks",
    skills: [
      { name: "Swift", icon: SiSwift, proficiency: "Expert" },
      { name: "UIKit", icon: FaMobileAlt, proficiency: "Expert" },
      { name: "Core Data", icon: FaDatabase, proficiency: "Expert" },
      { name: "AVFoundation", icon: FaVideo, proficiency: "Intermediate" },
      { name: "ARKit", icon: FaVrCardboard, proficiency: "Advanced" },
      { name: "CocoaPods", icon: FaCube, proficiency: "Expert" },
      { name: "Xcode", icon: SiXcode, proficiency: "Expert" }
    ]
  },

  database: {
    title: "Database & Storage",
    description: "Database management systems and cloud storage solutions",
    skills: [
      { name: "Core Data", icon: FaDatabase, proficiency: "Expert" },
      { name: "Firebase", icon: SiFirebase, proficiency: "Expert" },
      { name: "MySQL", icon: SiMysql, proficiency: "Advanced" },
      { name: "SQLite", icon: SiSqlite, proficiency: "Advanced" }
    ]
  },

  devops: {
    title: "DevOps & Cloud",
    description: "Tools and platforms for continuous integration, deployment, and cloud infrastructure",
    skills: [
      { name: "Git", icon: FaGit, proficiency: "Expert" },
      { name: "Docker", icon: FaDocker, proficiency: "Advanced" },
      { name: "CI/CD", icon: SiGithubactions, proficiency: "Advanced" },
      { name: "Linux", icon: FaLinux, proficiency: "Intermediate" },
      { name: "Cloud Services", icon: FaCloud, proficiency: "Intermediate" }
    ]
  },

  tools: {
    title: "Development Tools",
    description: "IDEs and development tools for efficient coding",
    skills: [
      { name: "Xcode", icon: SiXcode, proficiency: "Expert" },
      { name: "VS Code", icon: SiVisualstudiocode, proficiency: "Expert" },
      { name: "IntelliJ", icon: SiIntellijidea, proficiency: "Advanced" },
      { name: "PyCharm", icon: SiPycharm, proficiency: "Advanced" },
      { name: "Qt Creator", icon: SiQt, proficiency: "Advanced" },
      { name: "NetBeans", icon: FaCode, proficiency: "Advanced" }
    ]
  },

  testing: {
    title: "Testing & API Tools",
    description: "Testing frameworks and API development tools",
    skills: [
      { name: "Jest", icon: SiJest, proficiency: "Advanced" },
      { name: "Postman", icon: SiPostman, proficiency: "Expert" },
      { name: "Swagger", icon: SiSwagger, proficiency: "Advanced" }
    ]
  },

  collaboration: {
    title: "Version Control & Collaboration",
    description: "Tools and platforms for code versioning and team collaboration",
    skills: [
      { name: "GitHub", icon: FaGithub, proficiency: "Expert" },
      { name: "GitLab", icon: FaGitlab, proficiency: "Expert" },
      { name: "Bitbucket", icon: FaBitbucket, proficiency: "Expert" },
      { name: "SourceTree", icon: SiSourcetree, proficiency: "Expert" },
      { name: "Jira", icon: FaJira, proficiency: "Advanced" },
      { name: "Trello", icon: FaTrello, proficiency: "Advanced" },
      { name: "Slack", icon: FaSlack, proficiency: "Expert" },
      { name: "Workplace", icon: SiWorkplace, proficiency: "Advanced" }
    ]
  }
};

export const experiences = [
  {
    title: "Software Engineer III (iOS)",
    company_name: "Pathao Ltd.",
    icon: pathao,
    iconBg: "#383E56",
    date: "June 2018 - December 2023",
    link: "https://www.linkedin.com/company/pathao/",
    points: [
      "Developed core features for Pathao's payment, food, and ride-sharing applications in Swift, enhancing user experience and operational efficiency.",
      "Optimised development workflows by implementing Agile methodologies and Git version control, facilitating smoother collaboration and reducing overall development time.",
      "Integrated third-party analytics and localization tools, expanding the app's accessibility to global markets and providing a more personalised user experience.",
      "Led R&D efforts for basic knowledge of ARKit and implemented best practices in UI localization, preparing the app for future expansions and ensuring robust accessibility standards.",
    ],
  },
  {
    title: "iOS Developer",
    company_name: "Binary Ventures Limited",
    icon: binary,
    iconBg: "#E6DEDD",
    date: "July 2017 - June 2018",
    link: "https://www.linkedin.com/company/binary-ventures-limited/",
    points: [
      "Built and maintained the iOS system for Druto, a ride-sharing app, with a strong focus on user-friendly design, leading to positive feedback and improved app usability.",
      "Utilised Agile development practices, advanced UI design patterns, and location-based service frameworks to deliver feature-rich functionality, supporting real-time services for the app's user base.",
    ],
  },
  {
    title: "iOS Engineer (Contractual)",
    company_name: "Wind",
    icon: wind,
    iconBg: "#383E56",
    date: "October 2022 - January 2023",
    link: "https://apps.apple.com/us/app/wind-app-borderless-transfers/id6446427666",
    points: [
      "Implemented robust security measures to safeguard user wallet information.",
      "Employed OWASP Top 10 standards and Git for secure coding practices.",
    ],
  },
  {
    title: "iOS Engineer",
    company_name: "Matrix Solution",
    icon: matrix,
    iconBg: "#E6DEDD",
    date: "February 2020 - January 2022",
    link: "https://www.linkedin.com/company/matrix-solution/mycompany/",
    points: [
      "Enhanced multimedia capabilities through innovative Live Photo functionalities.",
      "Leveraged AVFoundation and profiling tools for performance optimization.",
      "Ensured smooth user experience via code profiling and refactoring techniques.",
      "Applied optimization methods for seamless app performance.",
    ],
  },
  {
    title: "iOS App Developer",
    company_name: "Glostars",
    icon: glostars,
    iconBg: "#383E56",
    date: "August 2018 - April 2019",
    link: "https://appadvice.com/app/glostars/1583087526",
    points: [
      "Developed and maintained iOS version of Glostars app, facilitating seamless photo sharing.",
      "Utilized AVFoundation, API integration, and profiling tools for enhanced performance.",
    ],
  },
  {
    title: "iOS Developer (Trainee)",
    company_name: "Datasoft Systems Bangladesh Limited",
    icon: datasoft,
    iconBg: "#E6DEDD",
    date: "April 2017 - August 2017",
    link: "http://datasoft-bd.com/",
    points: [
      "Contributed to new feature development and issue debugging for flagship iOS app.",
      "Leveraged SDLC, UI design patterns, and API integration for seamless app functionality.",
    ],
  },
];

export const projects = {
  "iOS Development": [
    {
      name: "Pathao App",
      description: "A comprehensive super app offering ride-sharing, food delivery, and payment services. Led development of core features, implemented MapKit integration, and optimized app performance resulting in 4.5+ App Store rating.",
      tags: [
        { name: "swift", color: "blue-text-gradient" },
        { name: "uikit", color: "green-text-gradient" },
        { name: "mapkit", color: "pink-text-gradient" },
      ],
      icon: pathao,
      isPersonalProject: false,
      app_store_link: "https://apps.apple.com/us/app/pathao/id1449455214",
    },
    {
      name: "Wind App",
      description: "Secure borderless transfer application with robust wallet management. Implemented OWASP security standards, biometric authentication, and encrypted data storage for sensitive financial transactions.",
      tags: [
        { name: "swift", color: "blue-text-gradient" },
        { name: "security", color: "green-text-gradient" },
        { name: "crypto", color: "pink-text-gradient" },
      ],
      icon: wind,
      isPersonalProject: false,
      app_store_link: "https://apps.apple.com/us/app/wind-app-borderless-transfers/id6446427666",
    },
    {
      name: "Glostars",
      description: "Social photo sharing platform with advanced camera features. Implemented custom camera interface, photo filters, and real-time image processing using Core Image and AVFoundation.",
      tags: [
        { name: "swift", color: "blue-text-gradient" },
        { name: "avfoundation", color: "green-text-gradient" },
        { name: "coreimage", color: "pink-text-gradient" },
      ],
      icon: glostars,
      isPersonalProject: false,
      app_store_link: "https://appadvice.com/app/glostars/1583087526",
    },
    {
      name: "Color Palette Generator",
      description: "An innovative iOS app that generates beautiful color palettes from images. Features include palette extraction, color harmony analysis, and export capabilities.",
      tags: [
        { name: "swift", color: "blue-text-gradient" },
        { name: "uikit", color: "green-text-gradient" },
        { name: "coreimage", color: "pink-text-gradient" },
      ],
      isPersonalProject: true,
      source_code_link: "https://github.com/shaikat1993/Color-Pallete",
    },
    {
      name: "Weather App MVVM",
      description: "Modern weather application built with MVVM architecture. Features include location-based weather updates, detailed forecasts, and clean UI with custom animations.",
      tags: [
        { name: "swift", color: "blue-text-gradient" },
        { name: "mvvm", color: "green-text-gradient" },
        { name: "weather-api", color: "pink-text-gradient" },
      ],
      isPersonalProject: true,
      source_code_link: "https://github.com/shaikat1993/WeatherApp_MVVM",
    },
    {
      name: "LeetCode Solutions",
      description: "A comprehensive collection of LeetCode problem solutions implemented in Swift, showcasing algorithmic problem-solving skills and Swift language mastery.",
      tags: [
        { name: "swift", color: "blue-text-gradient" },
        { name: "algorithms", color: "green-text-gradient" },
        { name: "data-structures", color: "pink-text-gradient" },
      ],
      isPersonalProject: true,
      source_code_link: "https://github.com/shaikat1993/LeetCode",
    }
  ],
  "Web Development": [
    {
      name: "Modern Portfolio",
      description: "Professional portfolio website showcasing my work experience and projects. Built with React, Tailwind CSS, and Framer Motion for smooth animations.",
      tags: [
        { name: "react", color: "blue-text-gradient" },
        { name: "tailwind", color: "green-text-gradient" },
        { name: "framer", color: "pink-text-gradient" },
      ],
      icon: FaReact,
      isPersonalProject: true,
      source_code_link: "https://github.com/shaikat1993/Sadidur-portfolio",
      live_link: "https://shaikat1993.github.io/Sadidur-portfolio"
    },
    {
      name: "Node.js Exercise API",
      description: "A RESTful API built with Node.js and Express, featuring user authentication, data validation, and MongoDB integration. Implements best practices for secure API development.",
      tags: [
        { name: "nodejs", color: "blue-text-gradient" },
        { name: "express", color: "green-text-gradient" },
        { name: "mongodb", color: "pink-text-gradient" },
      ],
      icon: FaNode,
      isPersonalProject: true,
      source_code_link: "https://github.com/shaikat1993/node-exercise"
    },
    {
      name: "Sadid Blog",
      description: "A modern blogging platform built with React and Firebase. Features include user authentication, real-time updates, rich text editing, and responsive design for optimal viewing across devices.",
      tags: [
        { name: "react", color: "blue-text-gradient" },
        { name: "firebase", color: "green-text-gradient" },
        { name: "responsive", color: "pink-text-gradient" },
      ],
      icon: FaReact,
      isPersonalProject: true,
      source_code_link: "https://github.com/shaikat1993/react-projects/tree/main/sadid-blog"
    },
    {
      name: "Todo Board",
      description: "A Kanban-style todo application built with React and Redux. Features drag-and-drop functionality, task management across different boards, and local storage persistence for seamless user experience.",
      tags: [
        { name: "react", color: "blue-text-gradient" },
        { name: "redux", color: "green-text-gradient" },
        { name: "dnd", color: "pink-text-gradient" },
      ],
      icon: FaReact,
      isPersonalProject: true,
      source_code_link: "https://github.com/shaikat1993/react-projects/tree/main/todo-board"
    },
    {
      name: "Financial Dashboard",
      description: "A comprehensive financial dashboard built with Next.js 14, featuring modern data visualization, real-time updates, and responsive design. Implements server-side rendering and API routes for optimal performance.",
      tags: [
        { name: "nextjs", color: "blue-text-gradient" },
        { name: "typescript", color: "green-text-gradient" },
        { name: "tailwind", color: "pink-text-gradient" },
      ],
      icon: TbBrandNextjs,
      isPersonalProject: true,
      source_code_link: "https://github.com/shaikat1993/nextjs_tutorials/tree/main/financial_dashboard"
    },
    {
      name: "Issue Desk",
      description: "A modern issue tracking system built with Next.js and PostgreSQL. Features include real-time issue management, user authentication, status tracking, and a clean, intuitive interface for efficient project management.",
      tags: [
        { name: "nextjs", color: "blue-text-gradient" },
        { name: "postgresql", color: "green-text-gradient" },
        { name: "prisma", color: "pink-text-gradient" },
      ],
      icon: TbBrandNextjs,
      isPersonalProject: true,
      source_code_link: "https://github.com/shaikat1993/nextjs_tutorials/tree/main/issue_desk"
    }
  ]
};
