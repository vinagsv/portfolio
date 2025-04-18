import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";
import { HiOutlineDocumentText } from "react-icons/hi";

const motionReveal = {
  hidden: { opacity: 0, y: 150, scale: 2 },
  show: { opacity: 1, y: 0, scale: 1 },
};

export function Hero() {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 1) * 60;
      const y = (e.clientY / innerHeight - 1) * 60;
      rotateY.set(x);
      rotateX.set(-y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [rotateX, rotateY]);

  return (
    <div className="px-4 pt-6 bg-[url('/images/wave.svg')] bg-no-repeat bg-bottom">
      <div className="wrapper flex flex-col xl:flex-row xl:h-[30rem]">
        <div className="flex flex-col items-center gap-8 text-center xl:w-1/2 xl:justify-center xl:items-start xl:text-start">
          <motion.h1
            className="text-orquidea text-4xl font-bold xl:text-5xl"
            initial="hidden"
            animate="show"
            transition={{ delay: 1 }}
            variants={motionReveal}
          >
            Full-Stack Web Developer
          </motion.h1>
          <motion.p
            className="text-light text-2xl sm:w-[70%] xl:w-full"
            initial="hidden"
            animate="show"
            transition={{ delay: 1.2 }}
            variants={motionReveal}
          >
            Hello! <br />
            My name is Vinag. I am a software developer specializing in web
            development.
          </motion.p>
          <motion.button
            className="bg-orquidea uppercase text-2xl px-4 py-2 rounded-full glow-hover relative group overflow-hidden transition-[width] focus:outline-none focus:ring-0"
            initial="hidden"
            animate="show"
            transition={{ delay: 1.4 }}
            variants={motionReveal}
          >
            <a
              href="docs/Vinag_Resume.pdf"
              target="_blank"
              className="group-hover:mr-6 transition-[margin]"
            >
              get cv
            </a>
            <HiOutlineDocumentText className="text-white text-3xl absolute -right-7 top-1/2 -translate-y-1/2 group-hover:right-2 transition-[right]" />
          </motion.button>
        </div>

        {/* ROTATING HEXAGON BASED ON CURSOR */}
        <motion.div
          className="hidden xl:block h-72 bg-[url('/images/hexagon.png')] bg-contain bg-bottom bg-no-repeat xl:w-1/2 xl:h-full"
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.6, type: "spring" }}
        />
      </div>
    </div>
  );
}
