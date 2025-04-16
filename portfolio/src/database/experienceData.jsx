import {
  SiJavascript,
  SiTailwindcss,
  SiExpress,
  SiReact,
  SiGit,
  SiGithub,
  SiNodedotjs,
} from "react-icons/si";
import { FaHtml5, FaCss3Alt, FaBootstrap } from "react-icons/fa";
import { DiJava } from "react-icons/di";
import MongoDBIcon from "../assets/mongodbimg.png";
import CppIcon from "../assets/cplusplusimg.png";

export const experienceList = [
  {
    icon: <FaHtml5 />,
    title: "html",
    custom: "text-orange-500",
  },
  {
    icon: <FaCss3Alt />,
    title: "css",
    custom: "text-cyan-500",
  },
  {
    icon: <SiJavascript />,
    title: "javascript",
    custom: "text-amber-400",
  },

  {
    icon: <SiExpress />,
    title: "express",
    custom: "text-gray-600",
  },
  {
    icon: <SiReact />,
    title: "react",
    custom: "text-cyan-500",
  },
  {
    icon: <SiNodedotjs />,
    title: "nodejs",
    custom: "text-green-600",
  },
  {
    icon: <FaBootstrap />,
    title: "bootstrap",
    custom: "text-primary",
  },
  {
    icon: <SiTailwindcss />,
    title: "tailwindcss",
    custom: "text-emerald-500",
  },
  {
    icon: <SiGit />,
    title: "git",
    custom: "text-red-500",
  },
  {
    icon: <SiGithub />,
    title: "github",
    custom: "text-zinc-500",
  },
  {
    icon: <DiJava />,
    title: "java",
    custom: "text-red-600",
  },
  {
    icon: (
      <img
        src={MongoDBIcon}
        alt="MongoDB"
        className="w-20 h-20 object-contain"
      />
    ),
    title: "mongodb",
    custom: "text-green-500",
  },
  {
    icon: <img src={CppIcon} alt="C++" className="w-20 h-20 object-contain" />,
    title: "c++",
    custom: "text-blue-500",
  },
];
