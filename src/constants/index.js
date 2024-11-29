import {
  FaReact,
  FaNode,
  FaGitAlt,
  FaSwift,
  FaMobile,
  FaServer,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiMongodb,
  SiPython,
  SiTailwindcss,
  SiJavascript,
  SiTypescript,
  SiFirebase,
} from "react-icons/si";
import { BsStack } from "react-icons/bs";
import {
  pathao,
  binary,
  wind,
  matrix,
  glostars,
  datasoft,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

export const services = [
  {
    title: "iOS Developer",
    icon: FaMobile,
  },
  {
    title: "React Developer",
    icon: FaReact,
  },
  {
    title: "Backend Developer",
    icon: FaServer,
  },
  {
    title: "Full Stack Developer",
    icon: BsStack,
  },
];

export const technologies = [
  {
    name: "Swift",
    icon: FaSwift,
  },
  {
    name: "React",
    icon: FaReact,
  },
  {
    name: "Node.js",
    icon: FaNode,
  },
  {
    name: "MongoDB",
    icon: SiMongodb,
  },
  {
    name: "Next.js",
    icon: SiNextdotjs,
  },
  {
    name: "JavaScript",
    icon: SiJavascript,
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
  },
  {
    name: "Firebase",
    icon: SiFirebase,
  },
  {
    name: "Python",
    icon: SiPython,
  },
  {
    name: "Git",
    icon: FaGitAlt,
  },
  {
    name: "Tailwind CSS",
    icon: SiTailwindcss,
  },
];

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

export const projects = [
  {
    name: "iOS Social Media App",
    description:
      "A feature-rich social media application built with Swift and Firebase, incorporating real-time messaging, photo sharing, and user authentication.",
    tags: [
      {
        name: "swift",
        color: "blue-text-gradient",
      },
      {
        name: "firebase",
        color: "green-text-gradient",
      },
      {
        name: "social",
        color: "pink-text-gradient",
      },
    ],
  },
  {
    name: "E-Commerce Platform",
    description:
      "Full-stack e-commerce solution using React, Node.js, and MongoDB. Features include user authentication, product management, and payment integration.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "node",
        color: "pink-text-gradient",
      },
    ],
  },
  {
    name: "Portfolio Website",
    description:
      "Modern portfolio website built with React, Tailwind CSS, and Framer Motion. Features smooth animations and responsive design.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "tailwind",
        color: "green-text-gradient",
      },
      {
        name: "framer",
        color: "pink-text-gradient",
      },
    ],
  },
];
