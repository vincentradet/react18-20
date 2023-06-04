import React, { useRef, useEffect } from "react";
import styles from "./Canvas.module.scss";
export function Canvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas.getContext) {
      const ctx = canvas.getContext("2d");
      for (var i = 0; i < 25; i++) {
        for (var j = 0; j < 25; j++) {
          ctx.fillStyle =
            "rgb(" +
            Math.floor(255 - 15 * i) +
            "," +
            Math.floor(255 - 15 * j) +
            ",0)";
          ctx.fillRect(j * 25, i * 25, 25, 25);
        }
      }
      // règle la valeur de transparence
      ctx.fillStyle = "#FFF";
      ctx.globalAlpha = 0.1;

      // Dessine des cercles semi-transparents
      for (var b = 0; b < 20; b++) {
        ctx.beginPath();
        ctx.arc(200, 200, 10 + 10 * b, 0, Math.PI * 2, true);
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
