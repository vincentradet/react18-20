import React, { useEffect } from "react";
import * as THREE from "three";
import styles from "./Box.module.scss";
import GUI from "lil-gui";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export function Box() {
  useEffect(() => {
    const gui = new GUI();
    // Active/désactive les axes et la grille
    // lil-gui nécessite une propriété qui renvoie un booléen
    // pour décider de faire une case à cocher donc on fait un setter
    // et getter pour `visible` que nous pouvons dire à lil-gui
    // regarder.
    class AxisGridHelper {
      constructor(node, units = 10) {
        const axes = new THREE.AxesHelper();
        axes.material.depthTest = false;
        axes.renderOrder = 2; // après la grille
        node.add(axes);

        const grid = new THREE.GridHelper(units, units);
        grid.material.depthTest = false;
        grid.renderOrder = 1;
        node.add(grid);

        this.grid = grid;
        this.axes = axes;
        this.visible = false;
      }
      get visible() {
        return this._visible;
      }
      set visible(v) {
        this._visible = v;
        this.grid.visible = v;
        this.axes.visible = v;
      }
    }

    const canvas = document.querySelector("#c");
    if (canvas.getContext) {
      // rendu
      const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

      // camera
      const fov = 20;
      const aspect = 2; // the canvas default
      const near = 1;
      const far = 10000;

      // scene
      const scene = new THREE.Scene();
      {
        const color = 0xffffff;
        const intensity = 3;
        const light = new THREE.PointLight(color, intensity);
        scene.add(light);
      }

      // SUN ********************************************
      // un tableau d'objets dont la rotation à mettre à jour
      const objects = [];

      // utilise une seule sphère pour tout
      const sunradius = 1;
      const sunwidthSegments = 24;
      const sunheightSegments = 24;
      const sunsphereGeometry = new THREE.SphereGeometry(
        sunradius,
        sunwidthSegments,
        sunheightSegments
      );

      const solarSystem = new THREE.Object3D();
      scene.add(solarSystem);
      objects.push(solarSystem);

      const sunMaterial = new THREE.MeshPhongMaterial({
        emissive: 0xffff00,
        //wireframe: true,
      });
      const sunMesh = new THREE.Mesh(sunsphereGeometry, sunMaterial);
      sunMesh.scale.set(5, 5, 5); // agrandit le soleil
      solarSystem.add(sunMesh);
      objects.push(sunMesh);

      const earthOrbit = new THREE.Object3D();
      earthOrbit.position.x = 10;
      solarSystem.add(earthOrbit);
      objects.push(earthOrbit);

      const earthMaterial = new THREE.MeshPhongMaterial({
        color: 0x2233ff,
        emissive: 0x112244,
        //wireframe: true,
      });

      const earthMesh = new THREE.Mesh(sunsphereGeometry, earthMaterial);
      earthMesh.scale.set(1, 1, 1);
      earthOrbit.add(earthMesh);
      objects.push(earthMesh);

      const moonOrbit = new THREE.Object3D();
      moonOrbit.position.x = 2;
      earthOrbit.add(moonOrbit);

      const moonMaterial = new THREE.MeshPhongMaterial({
        color: 0x888888,
        emissive: 0x222222,
      });
      const moonMesh = new THREE.Mesh(sunsphereGeometry, moonMaterial);
      moonMesh.scale.set(0.5, 0.5, 0.5);
      moonOrbit.add(moonMesh);
      objects.push(moonMesh);

      function makeAxisGrid(node, label, units) {
        const helper = new AxisGridHelper(node, units);
        gui.add(helper, "visible").name(label);
      }

      makeAxisGrid(solarSystem, "solarSystem", 25);
      makeAxisGrid(sunMesh, "sunMesh");
      makeAxisGrid(earthOrbit, "earthOrbit");
      makeAxisGrid(earthMesh, "earthMesh");
      makeAxisGrid(moonOrbit, "moonOrbit");
      makeAxisGrid(moonMesh, "moonMesh");

      const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      //camera.position.z = 2;

      // For sun
      camera.position.set(0, 60, 0);
      camera.up.set(0, 1, 0);
      camera.lookAt(0, 0, 0);

      // Animation
      function render(time, ndx) {
        time *= 0.0001; // convertit le temps en secondes
        //if (camera.position.y < 150) camera.position.y += time * 0.001;
        if (resizeRendererToDisplaySize(renderer)) {
          const canvas = renderer.domElement;
          camera.aspect = canvas.clientWidth / canvas.clientHeight;
          camera.updateProjectionMatrix();
        }

        objects.forEach((obj) => {
          obj.rotation.y = time;
        });
        renderer.render(scene, camera);

        requestAnimationFrame(render);
      }
      requestAnimationFrame(render);

      function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
          renderer.setSize(width, height, false);
        }
        return needResize;
      }
    }
  }, []);
  return <canvas className={styles.container} id="c"></canvas>;
}
