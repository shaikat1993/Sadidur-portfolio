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
    title: "Senior iOS Developer",
    company_name: "Previous Company",
    icon: FaMobile,
    iconBg: "#383E56",
    date: "March 2017 - Present",
    points: [
      "Developing and maintaining iOS applications using Swift and modern iOS frameworks",
      "Implementing responsive design and ensuring cross-device compatibility",
      "Participating in code reviews and providing constructive feedback to other developers",
      "Leading team of developers and mentoring junior developers",
    ],
  },
];
