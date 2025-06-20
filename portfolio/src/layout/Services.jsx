import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export function Services() {
  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const spikesGroupRef = useRef(null);
  const squaresRef = useRef([]);
  const toastRef = useRef(null);
  const toastCanvasRef = useRef(null);
  const toastTextureRef = useRef(null);
  const toastVisibleRef = useRef(false);
  const currentSquareRef = useRef(null);
  const currentSkillIndexRef = useRef(null); // track last rendered skill index

  const skills = [
    "React Development",
    "HTML Structure",
    "CSS Styling",
    "Tailwind CSS",
    "Responsive Design",
    "MERN Stack",
    "Project Structuring",
    "Error Debugging",
    "Version Control",
    "UI Improvements",
    "Project Planning",
    "Continuous Learning",
    "Time Management",
    "Task Prioritization",
    "Logical Thinking",
    "Result Oriented",
    "Attention to Detail",
  ];

  useEffect(() => {
    if (sceneRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = mountRef.current.clientWidth || window.innerWidth;
    const height = mountRef.current.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5 * 2.5;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    const spikesGroup = new THREE.Group();
    spikesGroupRef.current = spikesGroup;

    const spikeMaterial = new THREE.ShaderMaterial({
      uniforms: {
        baseColor: { value: new THREE.Color("#4A00E0") },
        tipColor: { value: new THREE.Color("#8E2DE2") },
      },
      vertexShader: `
        varying float vY;
        void main() {
          vY = position.y;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 baseColor;
        uniform vec3 tipColor;
        varying float vY;
        void main() {
          float t = vY / ${(2 * 2.5 * 1.6) / 2.0};
          vec3 color = mix(baseColor, tipColor, t);
          gl_FragColor = vec4(color, 1.0);
        }
      `,
      side: THREE.DoubleSide,
    });

    const squareMaterial = new THREE.MeshBasicMaterial({ color: "#FFD700" });

    const spikeCount = 80;
    const spikeLength = 2 * 2.5 * 1.6;
    const spikeGeometry = new THREE.CylinderGeometry(
      0.005 * 2.5,
      0.005 * 2.5,
      spikeLength,
      8
    );
    spikeGeometry.translate(0, spikeLength / 2, 0);

    const squareGeometry = new THREE.BoxGeometry(
      0.05 * 2.5,
      0.025 * 2.5,
      0.05 * 2.5
    );

    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < spikeCount; i++) {
      const y = 1 - (i / (spikeCount - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      const dir = new THREE.Vector3(x, y, z).normalize();

      const spike = new THREE.Mesh(spikeGeometry, spikeMaterial);
      const axis = new THREE.Vector3(0, 1, 0);
      const quaternion = new THREE.Quaternion().setFromUnitVectors(axis, dir);
      spike.quaternion.copy(quaternion);
      spike.position.set(0, 0, 0);

      const square = new THREE.Mesh(squareGeometry, squareMaterial.clone());
      square.quaternion.copy(quaternion);
      square.position.copy(dir.clone().multiplyScalar(spikeLength));
      square.userData.skillIndex = i % skills.length;
      squaresRef.current.push(square);

      spikesGroup.add(spike, square);
    }

    scene.add(spikesGroup);

    // Skills label
    const labelCanvas = document.createElement("canvas");
    labelCanvas.width = 800;
    labelCanvas.height = 200;
    const labelCtx = labelCanvas.getContext("2d");
    labelCtx.fillStyle = "white";
    labelCtx.font = "bold 150px 'Inter', Arial";
    labelCtx.textAlign = "center";
    labelCtx.textBaseline = "middle";
    labelCtx.fillText("SKILLS", labelCanvas.width / 2, labelCanvas.height / 2);
    const labelTexture = new THREE.CanvasTexture(labelCanvas);
    const labelMaterial = new THREE.SpriteMaterial({
      map: labelTexture,
      transparent: true,
    });
    const labelSprite = new THREE.Sprite(labelMaterial);
    labelSprite.scale.set(6, 1.5, 1);
    labelSprite.position.set(0, 0, 0);
    spikesGroup.add(labelSprite);

    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(25, 25, 25);
    scene.add(pointLight);

    // Toast setup
    const toastCanvas = document.createElement("canvas");
    toastCanvas.width = 384;
    toastCanvas.height = 96;
    toastCanvasRef.current = toastCanvas;
    const toastTexture = new THREE.CanvasTexture(toastCanvas);
    toastTextureRef.current = toastTexture;
    toastTexture.minFilter = THREE.LinearFilter;
    const toastMaterial = new THREE.SpriteMaterial({ map: toastTexture });
    const toastSprite = new THREE.Sprite(toastMaterial);
    toastSprite.scale.set(2, 0.48, 1);
    toastSprite.visible = false;
    toastRef.current = toastSprite;
    scene.add(toastSprite);

    const updateToastCanvas = (skillIndex) => {
      if (currentSkillIndexRef.current === skillIndex) return;
      currentSkillIndexRef.current = skillIndex;
      const ctx = toastCanvas.getContext("2d");
      ctx.clearRect(0, 0, toastCanvas.width, toastCanvas.height);
      ctx.fillStyle = "rgba(20, 20, 20, 0.85)";
      ctx.beginPath();
      const r = 10,
        w = toastCanvas.width,
        h = toastCanvas.height;
      ctx.moveTo(r, 0);
      ctx.lineTo(w - r, 0);
      ctx.quadraticCurveTo(w, 0, w, r);
      ctx.lineTo(w, h - r);
      ctx.quadraticCurveTo(w, h, w - r, h);
      ctx.lineTo(r, h);
      ctx.quadraticCurveTo(0, h, 0, h - r);
      ctx.lineTo(0, r);
      ctx.quadraticCurveTo(0, 0, r, 0);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "white";
      ctx.font = "bold 28px 'Inter', Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(skills[skillIndex], w / 2, h / 2);
      toastTexture.needsUpdate = true;
    };

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseMove = (event) => {
      const rect = mountRef.current.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      squaresRef.current.forEach((sq) => sq.material.color.set("#FFD700"));

      let closestSquare = null;
      let minDistance = 0.8;
      squaresRef.current.forEach((square) => {
        const squarePos = new THREE.Vector3();
        square.getWorldPosition(squarePos);
        const rayOrigin = raycaster.ray.origin;
        const rayDir = raycaster.ray.direction;
        const t = rayDir.dot(squarePos.clone().sub(rayOrigin));
        const closestPoint =
          t > 0
            ? rayOrigin.clone().add(rayDir.clone().multiplyScalar(t))
            : rayOrigin.clone();
        const distance = closestPoint.distanceTo(squarePos);
        if (distance < minDistance) {
          minDistance = distance;
          closestSquare = square;
        }
      });

      if (closestSquare) {
        closestSquare.material.color.set("#00FFFF");
        if (currentSquareRef.current !== closestSquare) {
          currentSquareRef.current = closestSquare;
          updateToastCanvas(closestSquare.userData.skillIndex);
          toastSprite.visible = true;
        }

        const squarePos = new THREE.Vector3();
        closestSquare.getWorldPosition(squarePos);
        const offset = squarePos
          .clone()
          .normalize()
          .multiplyScalar(spikeLength + 0.6);
        toastSprite.position.copy(offset);
        toastSprite.quaternion.copy(spikesGroup.quaternion).invert();
      } else {
        toastSprite.visible = false;
        currentSquareRef.current = null;
        currentSkillIndexRef.current = null;
      }
    };

    mountRef.current.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      if (!rendererRef.current || !sceneRef.current) return;
      requestAnimationFrame(animate);
      spikesGroup.rotation.y += 0.002;
      spikesGroup.rotation.x += 0.001;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const width = mountRef.current.clientWidth || window.innerWidth;
      const height = mountRef.current.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (mountRef.current) {
        mountRef.current.removeEventListener("mousemove", onMouseMove);
        while (mountRef.current.firstChild) {
          mountRef.current.removeChild(mountRef.current.firstChild);
        }
      }
      if (rendererRef.current) rendererRef.current.dispose();
      sceneRef.current = null;
      cameraRef.current = null;
      rendererRef.current = null;
      spikesGroupRef.current = null;
      squaresRef.current = [];
      toastRef.current = null;
      toastCanvasRef.current = null;
      toastTextureRef.current = null;
      toastVisibleRef.current = false;
      currentSquareRef.current = null;
      currentSkillIndexRef.current = null;
    };
  }, []);

  return (
    <div
      id="services"
      ref={mountRef}
      className="w-full h-[80vh] bg-gray-900 font-inter overflow-hidden"
    />
  );
}
