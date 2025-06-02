import React from "react";
import projects from "../database/projects.json";

const MoreProjects = () => {
  return (
    <div className="bg-[#f4fbfe] min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-[#002e44] mb-16 text-center tracking-tight">
          More Projects
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project) => (
            <li
              key={project.title}
              className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg"
            >
              <h3 className="text-xl font-bold text-[#003b5c] mb-3">
                {project.title}
              </h3>
              <p className="text-gray-600 mb-5 leading-relaxed">
                {project.description}
              </p>
              <div className="flex gap-3 flex-wrap mt-auto">
                {project.sourceLink && (
                  <a
                    href={project.sourceLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 shadow-sm hover:shadow-md">
                      Source Code
                    </button>
                  </a>
                )}
                <a
                  href={project.pageLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <button className="bg-[#005f8f] text-white px-4 py-2 rounded-lg hover:bg-[#003c5c] transition duration-300 shadow-sm hover:shadow-md">
                    Visit Page
                  </button>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MoreProjects;
