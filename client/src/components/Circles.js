import React, { useRef, useEffect } from "react";
import styles from "./Circles.module.scss";
export function Circles() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas.getContext) {
      const ctx = canvas.getContext("2d");
      for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 6; j++) {
          ctx.strokeStyle =
            "rgb(0, " +
            Math.floor(255 - 42.5 * i) +
            ", " +
            Math.floor(255 - 42.5 * j) +
            ")";
          ctx.beginPath();
          ctx.arc(12.5 + j * 25, 12.5 + i * 25, 10, 0, Math.PI * 2, true);
          ctx.stroke();
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
