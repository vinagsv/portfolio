import {
  AiOutlineInstagram,
  AiFillLinkedin,
  AiFillGithub,
  AiOutlineMail,
  AiOutlineCopyrightCircle,
} from "react-icons/ai";
import { BsFillTelephoneFill } from "react-icons/bs";
import { useState } from "react";

export function Footer() {
  const [tooltip, setTooltip] = useState("");

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setTooltip(type);
    setTimeout(() => setTooltip(""), 1000);
  };

  return (
    <footer className="bg-[#0c0c0c] text-white" id="contact">
      <div className="wrapper flex flex-col items-center gap-12 px-6 py-14 text-lg lg:flex-row lg:justify-between">
        <div>
          <h1 className="text-3xl lg:text-4xl font-semibold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Thank You! Visit Again...
          </h1>
          <div className="flex gap-6 text-3xl justify-center">
            <a
              href="https://www.instagram.com/vinagsv/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiOutlineInstagram className="hover:text-cyan-400 transition duration-200 cursor-pointer" />
            </a>
            <a
              href="https://www.linkedin.com/in/vinagsv/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiFillLinkedin className="hover:text-cyan-400 transition duration-200 cursor-pointer" />
            </a>
            <a
              href="https://github.com/vinagsv"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiFillGithub className="hover:text-cyan-400 transition duration-200 cursor-pointer" />
            </a>
          </div>
        </div>

        <div className="text-center text-base relative lg:-order-1">
          <div
            className="cursor-pointer inline-block relative group"
            onClick={() => handleCopy("+91 9480494529", "phone")}
          >
            <BsFillTelephoneFill className="inline mr-2" />
            +91 9480494529
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 text-xs bg-black bg-opacity-80 text-white rounded opacity-0 group-hover:opacity-100 transition duration-200">
              {tooltip === "phone" ? "Copied!" : "Copy"}
            </span>
          </div>

          <br />

          <div
            className="cursor-pointer inline-block relative group mt-4"
            onClick={() => handleCopy("vinagsv@gmail.com", "email")}
          >
            <AiOutlineMail className="inline mr-2" />
            vinagsv@gmail.com
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 text-xs bg-black bg-opacity-80 text-white rounded opacity-0 group-hover:opacity-100 transition duration-200">
              {tooltip === "email" ? "Copied!" : "Copy"}
            </span>
          </div>
        </div>

        <h2 className="text-sm text-gray-400">
          <AiOutlineCopyrightCircle className="inline mr-1" />
          2025 all rights reserved vinag.
        </h2>
      </div>
    </footer>
  );
}
