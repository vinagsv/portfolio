import {
  AiOutlineInstagram,
  AiFillLinkedin,
  AiFillGithub,
  AiOutlineMail,
  AiOutlineCopyrightCircle,
} from "react-icons/ai";
import { BsFillTelephoneFill } from "react-icons/bs";
export function Footer() {
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
        <div className="text-xl text-center lg:-order-1">
          <h2>
            <BsFillTelephoneFill className="inline mr-2" />
            +91 9480494529
          </h2>
          <h2>
            <AiOutlineMail className="inline mr-2" />
            vinagsv@gmail.com
          </h2>
        </div>
        <h2 className="text-xl">
          <AiOutlineCopyrightCircle className="inline mr-2" />
          2025 all rights reserved (vinag)
        </h2>
      </div>
    </footer>
  );
}
