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
    <footer className="bg-dark" id="contact">
      <div className="text-light wrapper flex flex-col items-center gap-12 p-4 py-12 text-2xl font-medium lg:flex-row lg:justify-between">
        <div>
          <h1 className="text-4xl mb-4 font-bold gradient-text bg-gradient-to-r from-left to-right">
            Thank You! Visit Again...
          </h1>
          <div className="flex flex-row justify-around flex-wrap text-4xl">
            <a href="https://www.instagram.com/vinagsv/" target="_blank">
              <AiOutlineInstagram className="hover:text-orquidea cursor-pointer" />
            </a>
            <a href="https://www.linkedin.com/in/vinagsv/" target="_blank">
              <AiFillLinkedin className="hover:text-orquidea cursor-pointer" />
            </a>
            <a href="https://github.com/vinagsv" target="_blank">
              <AiFillGithub className="hover:text-orquidea cursor-pointer" />
            </a>
          </div>
        </div>

        <div className="text-xl text-center relative lg:-order-1">
          <div
            className="cursor-pointer inline-block relative group"
            onClick={() => handleCopy("+91 9480494529", "phone")}
          >
            <BsFillTelephoneFill className="inline mr-2" />
            +91 9480494529
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 text-sm bg-gray-800 text-white rounded opacity-0 group-hover:opacity-100 transition">
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
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 text-sm bg-gray-800 text-white rounded opacity-0 group-hover:opacity-100 transition">
              {tooltip === "email" ? "Copied!" : "Copy"}
            </span>
          </div>
        </div>

        <h2 className="text-xl">
          <AiOutlineCopyrightCircle className="inline mr-2" />
          2025 all rights reserved vinag.
        </h2>
      </div>
    </footer>
  );
}
