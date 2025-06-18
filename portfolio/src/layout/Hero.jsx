import { useEffect, useRef } from "react";
import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.module.js";
import { createNoise4D } from "https://cdn.jsdelivr.net/npm/simplex-noise@4.0.1/+esm";
import { motion } from "framer-motion";
import { HiOutlineDocumentText } from "react-icons/hi";

const textVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.8,
      ease: "easeOut",
    },
  }),
};

const Hero = () => {
  const canvasRef = useRef(null);
  const confRef = useRef({
    fov: 75,
    cameraZ: 75,
    xyCoef: 50,
    zCoef: 15,
    lightIntensity: 0.9,
    ambientColor: 0x000000,
    light1Color: 0x0e09dc,
    light2Color: 0x1cd1e1,
    light3Color: 0x18c02c,
    light4Color: 0xee3bcf,
  });

  useEffect(() => {
    let renderer, scene, camera;
    let width, height, wWidth, wHeight;
    const TMath = THREE.MathUtils;
    const noise4D = createNoise4D();
    const mouse = new THREE.Vector2();
    const mousePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const mousePosition = new THREE.Vector3();
    const raycaster = new THREE.Raycaster();
    let light1, light2, light3, light4;
    let plane;

    function updateSize() {
      width = window.innerWidth;
      height = window.innerHeight;
      if (renderer && camera) {
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        const wsize = getRendererSize();
        wWidth = wsize[0];
        wHeight = wsize[1];
      }
    }

    function getRendererSize() {
      const cam = new THREE.PerspectiveCamera(camera.fov, camera.aspect);
      const vFOV = (cam.fov * Math.PI) / 180;
      const height = 2 * Math.tan(vFOV / 2) * Math.abs(confRef.current.cameraZ);
      const width = height * cam.aspect;
      return [width, height];
    }

    function initScene() {
      scene = new THREE.Scene();

      const r = 30;
      const y = 10;
      const lightDistance = 500;

      light1 = new THREE.PointLight(
        confRef.current.light1Color,
        confRef.current.lightIntensity,
        lightDistance
      );
      light1.position.set(0, y, r);
      scene.add(light1);

      light2 = new THREE.PointLight(
        confRef.current.light2Color,
        confRef.current.lightIntensity,
        lightDistance
      );
      light2.position.set(0, -y, -r);
      scene.add(light2);

      light3 = new THREE.PointLight(
        confRef.current.light3Color,
        confRef.current.lightIntensity,
        lightDistance
      );
      light3.position.set(r, y, 0);
      scene.add(light3);

      light4 = new THREE.PointLight(
        confRef.current.light4Color,
        confRef.current.lightIntensity,
        lightDistance
      );
      light4.position.set(-r, y, 0);
      scene.add(light4);

      const mat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
      });

      const geo = new THREE.PlaneGeometry(
        wWidth,
        wHeight,
        wWidth / 2,
        wHeight / 2
      );
      plane = new THREE.Mesh(geo, mat);
      scene.add(plane);

      plane.rotation.x = -Math.PI / 2 - 0.05;
      plane.position.y = -25;
      camera.position.z = 50;
    }

    function animate() {
      requestAnimationFrame(animate);
      animatePlane();
      animateLights();
      renderer.render(scene, camera);
    }

    function animatePlane() {
      const gArray = plane.geometry.attributes.position.array;
      const time = Date.now() * 0.0002;
      for (let i = 0; i < gArray.length; i += 3) {
        gArray[i + 2] =
          noise4D(
            gArray[i] / confRef.current.xyCoef,
            gArray[i + 1] / confRef.current.xyCoef,
            time,
            mouse.x + mouse.y
          ) * confRef.current.zCoef;
      }
      plane.geometry.attributes.position.needsUpdate = true;
    }

    function animateLights() {
      const time = Date.now() * 0.001;
      const d = 50;
      light1.position.x = Math.sin(time * 0.1) * d;
      light1.position.z = Math.cos(time * 0.2) * d;
      light2.position.x = Math.cos(time * 0.3) * d;
      light2.position.z = Math.sin(time * 0.4) * d;
      light3.position.x = Math.sin(time * 0.5) * d;
      light3.position.z = Math.sin(time * 0.6) * d;
      light4.position.x = Math.sin(time * 0.7) * d;
      light4.position.z = Math.cos(time * 0.8) * d;
    }

    function init() {
      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
        alpha: true,
      });
      camera = new THREE.PerspectiveCamera(confRef.current.fov);
      camera.position.z = confRef.current.cameraZ;
      updateSize();
      window.addEventListener("resize", updateSize);

      document.addEventListener("mousemove", (e) => {
        const v = new THREE.Vector3();
        camera.getWorldDirection(v);
        v.normalize();
        mousePlane.normal = v;
        mouse.x = (e.clientX / width) * 2 - 1;
        mouse.y = -(e.clientY / height) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        raycaster.ray.intersectPlane(mousePlane, mousePosition);
      });

      initScene();
      animate();
    }

    init();

    return () => {
      window.removeEventListener("resize", updateSize);
      renderer.dispose();
    };
  }, []);

  return (
    <section className="relative w-full h-screen bg-[#252237] overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0"
      />
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-32 text-center flex flex-col items-center gap-8">
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-tight 
                     bg-gradient-to-r from-[#7044e6] via-[#1fe5f7] to-[#ee3bcf] 
                     bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient"
          initial="hidden"
          animate="visible"
          custom={0.2}
          variants={textVariants}
        >
          Full-Stack Web Developer
        </motion.h1>
        <motion.p
          className="text-white text-lg sm:text-xl md:text-2xl mt-6 leading-relaxed font-light"
          initial="hidden"
          animate="visible"
          custom={0.6}
          variants={textVariants}
        >
          Hello! I’m <span className="font-medium text-[#8e68f3]">Vinag</span>,
          a passionate software developer crafting engaging, modern, and
          high-performance web experiences.
        </motion.p>
        <motion.button
          className="bg-gradient-to-r from-[#7044e6] to-[#ee3bcf] uppercase text-xl px-6 py-3 rounded-full glow-hover relative group overflow-hidden transition-[width] focus:outline-none focus:ring-0 text-white"
          initial="hidden"
          animate="visible"
          custom={1.0}
          variants={textVariants}
        >
          <a
            href="/docs/Vinag_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group-hover:mr-6 transition-[margin]"
          >
            Get CV
          </a>
          <HiOutlineDocumentText className="text-white text-2xl absolute -right-7 top-1/2 -translate-y-1/2 group-hover:right-2 transition-[right]" />
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;
