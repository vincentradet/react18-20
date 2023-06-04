import React, { useRef, useEffect } from "react";
import styles from "./GlobalAlpha.module.scss";
export function GlobalAlpha() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas.getContext) {
      const ctx = canvas.getContext("2d");
      // draw background
      ctx.fillStyle = "#FD0";
      ctx.fillRect(0, 0, 200, 200);
      ctx.fillStyle = "#6C0";
      ctx.fillRect(200, 0, 200, 200);
      ctx.fillStyle = "#09F";
      ctx.fillRect(0, 200, 200, 200);
      ctx.fillStyle = "#F30";
      ctx.fillRect(200, 200, 200, 200);
      ctx.fillStyle = "#FFF";

      // règle la valeur de transparence
      ctx.globalAlpha = 0.2;

      // Dessine des cercles semi-transparents
      for (var i = 0; i < 7; i++) {
        ctx.beginPath();
        ctx.arc(200, 200, 10 + 10 * i, 0, Math.PI * 2, true);
        ctx.fill();
      }
    }
  }, []);
  return (
    <canvas
      className={`${styles.container}`}
      width="400"
      height="400"
      ref={canvasRef}
    ></canvas>
  );
}
