import React, { useRef, useEffect } from "react";
import styles from "./OpacityRectangle.module.scss";
export function OpacityRectangle() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas.getContext) {
      const ctx = canvas.getContext("2d");
      // Dessine le fond
      ctx.fillStyle = "rgb(255, 221, 0)";
      ctx.fillRect(0, 0, 150, 37.5);
      ctx.fillStyle = "rgb(102, 204, 0)";
      ctx.fillRect(0, 37.5, 150, 37.5);
      ctx.fillStyle = "rgb(0, 153, 255)";
      ctx.fillRect(0, 75, 150, 37.5);
      ctx.fillStyle = "rgb(255, 51, 0)";
      ctx.fillRect(0, 112.5, 150, 37.5);

      // Dessine des rectangles semi-transparents
      for (var i = 0; i < 10; i++) {
        ctx.fillStyle = "rgba(255, 255, 255, " + (i + 1) / 10 + ")";
        for (var j = 0; j < 4; j++) {
          ctx.fillRect(5 + i * 14, 5 + j * 37.5, 14, 27.5);
        }
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
