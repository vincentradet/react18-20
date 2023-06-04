import React, { useRef, useEffect } from "react";
import styles from "./Ants.module.scss";
export function Ants() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas.getContext) {
      const ctx = canvas.getContext("2d");
      //Ants
      var offset = 0;
      function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.setLineDash([4, 2]);
        ctx.lineDashOffset = -offset;
        ctx.strokeRect(10, 10, 100, 100);
      }

      function march() {
        offset++;
        if (offset > 16) {
          offset = 0;
        }
        draw();
        setTimeout(march, 20);
      }

      march();
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
