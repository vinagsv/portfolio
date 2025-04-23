import { useEffect, useRef, useState } from "react";

const HexagonCursor = () => {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // treat width <= 768px as mobile

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return; // Skip setting up the canvas on mobile

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const drawHexagon = (x, y, radius, strokeColor, shadowColor) => {
      const angle = Math.PI / 3;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const px = x + radius * Math.cos(angle * i);
        const py = y + radius * Math.sin(angle * i);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.shadowColor = shadowColor;
      ctx.shadowBlur = 20;
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.shadowBlur = 0;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawHexagon(
        mouse.current.x,
        mouse.current.y,
        12,
        "#00ffff",
        "rgba(0, 255, 255, 0.6)"
      );
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 9999,
        cursor: "none",
      }}
    />
  );
};

export default HexagonCursor;
