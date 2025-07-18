import { motion } from "framer-motion";
import { Link } from "../components/Link";
import { useState } from "react";

export function Nav() {
  return (
    <div className="wrapper p-4">
      <Mobile />
      <Desktop />
    </div>
  );
}

function Mobile() {
  const [renderMenu, setRenderMenu] = useState(false);
  return (
    <>
      <div className="flex justify-between items-center xl:hidden">
        <motion.h1
          className="text-3xl font-bold gradient-text bg-gradient-to-r from-left to-right"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5 }}
        >
          Home
        </motion.h1>
        <i
          className="fa-solid fa-bars text-2xl hover:text-orquidea"
          onClick={() => setRenderMenu(!renderMenu)}
        ></i>
      </div>
      {renderMenu && (
        <ul className="space-y-2 text-2xl xl:hidden">
          <Link content="home" href="/" />
          <Link content="about me" href="#about" />
          <Link content="skills" href="#services" />
          <Link content="technologies" href="#experience" />
          <Link content="portfolio" href="#portfolio" />
          <Link content="contact" href="#contact" />
        </ul>
      )}
    </>
  );
}

function Desktop() {
  return (
    <div className="hidden justify-between items-center xl:flex">
      <motion.h1
        className="text-3xl font-bold gradient-text bg-gradient-to-r from-left to-right"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.5 }}
      >
        vinag sv
      </motion.h1>

      <ul className="flex gap-6 text-2xl">
        <Link content="home" href="/" motionDelay={0.5} />
        <Link content="about me" href="#about" motionDelay={0.6} />
        <Link content="skills" href="#services" motionDelay={0.7} />
        <Link content="technologies" href="#experience" motionDelay={0.8} />
        <Link content="portfolio" href="#portfolio" motionDelay={0.9} />
        <Link content="contact" href="#contact" motionDelay={1} />
      </ul>
    </div>
  );
}
