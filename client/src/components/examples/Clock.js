import React, { useRef, useEffect } from "react";
import styles from "./Circles.module.scss";

export function Clock() {
  const canvasRef = useRef(null);

  function clock() {
    const canvas = canvasRef.current;
    if (canvas.getContext) {
      const ctx = canvas.getContext("2d");
      var now = new Date();
      ctx.save();
      ctx.clearRect(0, 0, 150, 150);
      ctx.translate(75, 75);
      ctx.scale(0.4, 0.4);
      ctx.rotate(-Math.PI / 2);
      ctx.strokeStyle = "black";
      ctx.fillStyle = "white";
      ctx.lineWidth = 8;
      ctx.lineCap = "round";

      // Marquage des heures
      ctx.save();
      for (var i = 0; i < 12; i++) {
        ctx.beginPath();
        ctx.rotate(Math.PI / 6);
        ctx.moveTo(100, 0);
        ctx.lineTo(120, 0);
        ctx.stroke();
      }
      ctx.restore();

      // Marquage des minutes
      ctx.save();
      ctx.lineWidth = 5;
      for (i = 0; i < 60; i++) {
        if (i % 5 !== 0) {
          ctx.beginPath();
          ctx.moveTo(117, 0);
          ctx.lineTo(120, 0);
          ctx.stroke();
        }
        ctx.rotate(Math.PI / 30);
      }
      ctx.restore();

      var sec = now.getSeconds();
      var min = now.getMinutes();
      var hr = now.getHours();
      hr = hr >= 12 ? hr - 12 : hr;

      ctx.fillStyle = "black";

      // Aiguille des heures
      ctx.save();
      ctx.rotate(
        hr * (Math.PI / 6) + (Math.PI / 360) * min + (Math.PI / 21600) * sec
      );
      ctx.lineWidth = 14;
      ctx.beginPath();
      ctx.moveTo(-20, 0);
      ctx.lineTo(80, 0);
      ctx.stroke();
      ctx.restore();

      // Aiguille des minutes
      ctx.save();
      ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.moveTo(-28, 0);
      ctx.lineTo(112, 0);
      ctx.stroke();
      ctx.restore();

      // Aiguille des secondes
      ctx.save();
      ctx.rotate((sec * Math.PI) / 30);
      ctx.strokeStyle = "#D40000";
      ctx.fillStyle = "#D40000";
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(-30, 0);
      ctx.lineTo(100, 0);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
      ctx.fill();
      /*  ctx.beginPath();
      ctx.arc(95, 0, 10, 0, Math.PI * 2, true);
      ctx.stroke(); */
      /* ctx.fillStyle = "rgba(0,0,0,0)";
      ctx.arc(0, 0, 3, 0, Math.PI * 2, true);
      ctx.fill(); */
      ctx.restore();

      ctx.beginPath();
      ctx.lineWidth = 7;
      ctx.strokeStyle = "#325FA2";
      ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
      ctx.stroke();

      ctx.restore();

      window.requestAnimationFrame(clock);
    }
  }

  useEffect(() => {
    window.requestAnimationFrame(clock);
  });

  return (
    <canvas
      className={`${styles.container}`}
      width="150"
      height="150"
      ref={canvasRef}
    ></canvas>
  );
}
