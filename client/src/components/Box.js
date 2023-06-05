import React, { useEffect } from "react";
import * as THREE from "three";
import styles from "./Box.module.scss";
import GUI from "lil-gui";

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

    /*  function makeXYZGUI(gui, vector3, name, onChangeFn) {
      const folder = gui.addFolder(name);
      folder.add(vector3, "x", -10, 10).onChange(onChangeFn);
      folder.add(vector3, "y", 0, 10).onChange(onChangeFn);
      folder.add(vector3, "z", -10, 10).onChange(onChangeFn);
      folder.open();
    } */

    class ColorGUIHelper {
      constructor(object, prop) {
        this.object = object;
        this.prop = prop;
      }
      get value() {
        return `#${this.object[this.prop].getHexString()}`;
      }
      set value(hexString) {
        this.object[this.prop].set(hexString);
      }
    }

    const canvas = document.querySelector("#c");
    if (canvas.getContext) {
      // rendu
      const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
      renderer.shadowMap.enabled = true;
      // camera
      const fov = 20;
      const aspect = 2; // the canvas default
      const near = 1;
      const far = 10000;

      const color = 0xffffff;
      const intensity = 1;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(0, 0, 0);

      const colorMoonLight = 0xffffff;
      const moonlight = new THREE.DirectionalLight(colorMoonLight, intensity);
      moonlight.position.set(0, 0, 0);

      // scene
      const scene = new THREE.Scene();
      scene.add(light);
      scene.add(moonlight);

      const helper = new THREE.DirectionalLightHelper(light);
      scene.add(helper);

      function updateLight() {
        light.target.updateMatrixWorld();
        helper.update();
      }
      updateLight();

      /* gui.addColor(new ColorGUIHelper(light, "color"), "value").name("color");
      gui.add(light, "intensity", 0, 2, 0.01);
      makeXYZGUI(gui, light.position, "position", updateLight);
      makeXYZGUI(gui, light.target.position, "target", updateLight); */

      // SUN ********************************************
      // un tableau d'objets dont la rotation à mettre à jour

      const loader = new THREE.TextureLoader();

      const sunMaterial = new THREE.MeshBasicMaterial({
        map: loader.load("textures/map_sun.jpg"),
      });

      const bgTexture = loader.load("textures/stars.jpg");
      scene.background = bgTexture;

      const objects = [];

      // utilise une seule sphère pour tout
      const sunradius = 1;
      const sunwidthSegments = 64;
      const sunheightSegments = 64;
      const sunsphereGeometry = new THREE.SphereGeometry(
        sunradius,
        sunwidthSegments,
        sunheightSegments
      );

      const solarSystem = new THREE.Object3D();
      scene.add(solarSystem);
      objects.push(solarSystem);

      const sunMesh = new THREE.Mesh(sunsphereGeometry, sunMaterial);
      sunMesh.scale.set(5, 5, 5); // agrandit le soleil
      solarSystem.add(sunMesh);
      objects.push(sunMesh);

      const earthOrbit = new THREE.Object3D();
      earthOrbit.position.x = 10;
      solarSystem.add(earthOrbit);
      objects.push(earthOrbit);

      scene.add(light.target);
      light.target = earthOrbit;

      const earthMaterial = new THREE.MeshStandardMaterial({
        map: loader.load("textures/earth.jpg"),
        lightMap: light,
      });

      const earthMesh = new THREE.Mesh(sunsphereGeometry, earthMaterial);
      earthMesh.scale.set(1, 1, 1);
      earthOrbit.add(earthMesh);
      objects.push(earthMesh);

      const moonOrbit = new THREE.Object3D();
      moonOrbit.position.x = 2;
      earthOrbit.add(moonOrbit);
      moonlight.target = moonOrbit;

      const moonMaterial = new THREE.MeshStandardMaterial({
        map: loader.load("textures/moon.jpg"),
        lightMap: moonlight,
      });

      const moonMesh = new THREE.Mesh(sunsphereGeometry, moonMaterial);
      moonMesh.scale.set(0.5, 0.5, 0.5);
      moonMesh.receiveShadow = true;
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

      gui.addColor(new ColorGUIHelper(light, "color"), "value").name("color");
      gui.add(light, "intensity", 0, 2, 0.01);
      gui.add(light.target.position, "x", -10, 10);
      gui.add(light.target.position, "z", -10, 10);
      gui.add(light.target.position, "y", 0, 10);

      const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      //camera.position.z = 2;

      // For sun
      camera.position.set(0, 60, 0);
      camera.up.set(0, 1, 0);
      camera.lookAt(0, 0, 0);

      // Animation
      function render(time, ndx) {
        time *= 0.0002; // convertit le temps en secondes
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
