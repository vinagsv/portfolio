import { ServiceCard } from "../components/ServiceCard";
import { FaDesktop } from "react-icons/fa";
import { IoSettingsSharp, IoRocket } from "react-icons/io5";

export function Services() {
  return (
    <div className="bg-dark text-light" id="services">
      <div className="wrapper p-4 py-12">
        <h1 className="text-4xl text-center xl:py-6">SKILLS</h1>
        <div className="flex flex-col flex-wrap gap-12 py-6 xl:flex-row xl:justify-center">
          <ServiceCard
            icon={<FaDesktop />}
            title="Web Development"
            description="Expertise in building responsive and efficient web applications using modern technologies like React, Node.js, and Tailwind CSS."
          />
          <ServiceCard
            icon={<IoRocket />}
            title="Data Structures & Algorithms"
            description="Strong foundation in solving algorithmic problems using efficient data structures, essential for system design and technical interviews."
            motionDelay={0.2}
          />
          <ServiceCard
            icon={<IoSettingsSharp />}
            title="Soft Skills"
            description="Proficient in communication, teamwork, and time management, contributing to effective collaboration and professional growth."
            motionDelay={0.4}
          />
        </div>
      </div>
    </div>
  );
}
