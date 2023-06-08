import React, { useEffect } from "react";
import * as THREE from "three";
import styles from "./Box.module.scss";
import GUI from "lil-gui";

export function Box() {
  useEffect(() => {
    //const gui = new GUI();
    // Active/désactive les axes et la grille
    // lil-gui nécessite une propriété qui renvoie un booléen
    // pour décider de faire une case à cocher donc on fait un setter
    // et getter pour `visible` que nous pouvons dire à lil-gui
    // regarder.

    /* class AxisGridHelper {
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
    } */

    /*  function makeXYZGUI(gui, vector3, name, onChangeFn) {
      const folder = gui.addFolder(name);
      folder.add(vector3, "x", -10, 10).onChange(onChangeFn);
      folder.add(vector3, "y", 0, 10).onChange(onChangeFn);
      folder.add(vector3, "z", -10, 10).onChange(onChangeFn);
      folder.open();
    } */

    /* class ColorGUIHelper {
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
    } */

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
      const intensity = 0.5;
      const light = new THREE.DirectionalLight(color, intensity);
      light.castShadow = true;
      light.shadow.autoUpdate = true;
      light.position.set(0, 0, 0);

      const colorMoonLight = 0xffffff;
      const moonlight = new THREE.DirectionalLight(colorMoonLight, intensity);
      moonlight.position.set(0, 0, 0);

      const colorMercuryLight = 0xffffff;
      const mercurylight = new THREE.DirectionalLight(
        colorMercuryLight,
        intensity
      );
      mercurylight.position.set(0, 0, 0);

      const colorVenusLight = 0xffffff;
      const venuslight = new THREE.DirectionalLight(colorVenusLight, intensity);
      venuslight.position.set(0, 0, 0);

      // scene
      const scene = new THREE.Scene();
      scene.add(light);
      scene.add(moonlight);
      scene.add(mercurylight);
      scene.add(venuslight);

      /* const helper = new THREE.DirectionalLightHelper(light);
      scene.add(helper);

      function updateLight() {
        light.target.updateMatrixWorld();
        helper.update();
      }
      updateLight(); */

      /* gui.addColor(new ColorGUIHelper(light, "color"), "value").name("color");
      gui.add(light, "intensity", 0, 2, 0.01);
      makeXYZGUI(gui, light.position, "position", updateLight);
      makeXYZGUI(gui, light.target.position, "target", updateLight); */

      // SUN ********************************************
      // un tableau d'objets dont la rotation à mettre à jour

      const loader = new THREE.TextureLoader();

      const bgTexture = loader.load("textures/stars.jpg");
      scene.background = bgTexture;
      const objects = [];

      // utilise une seule sphère pour tout
      const sunradius = 2.8;
      const sunwidthSegments = 64;
      const sunheightSegments = 64;
      const sunsphereGeometry = new THREE.SphereGeometry(
        sunradius,
        sunwidthSegments,
        sunheightSegments
      );

      const earthRadius = 1;
      const earthWidthSegments = 64;
      const earthHeightSegments = 64;
      const earthSphereGeometry = new THREE.SphereGeometry(
        earthRadius,
        earthWidthSegments,
        earthHeightSegments
      );

      const moonRadius = 0.4;
      const moonWidthSegments = 64;
      const moonHeightSegments = 64;
      const moonSphereGeometry = new THREE.SphereGeometry(
        moonRadius,
        moonWidthSegments,
        moonHeightSegments
      );

      const mercuryRadius = 0.4;
      const mmercuryWidthSegments = 64;
      const mercuryHeightSegments = 64;
      const mercurySphereGeometry = new THREE.SphereGeometry(
        mercuryRadius,
        mmercuryWidthSegments,
        mercuryHeightSegments
      );

      const venusRadius = 0.95;
      const venusWidthSegments = 64;
      const venusHeightSegments = 64;
      const venusSphereGeometry = new THREE.SphereGeometry(
        venusRadius,
        venusWidthSegments,
        venusHeightSegments
      );

      const solarSystem = new THREE.Object3D();
      solarSystem.position.x = 0;
      scene.add(solarSystem);
      objects.push(solarSystem);

      const mercuryOrbit = new THREE.Object3D();
      mercuryOrbit.position.x = 5;
      solarSystem.add(mercuryOrbit);
      objects.push(mercuryOrbit);

      const venusOrbit = new THREE.Object3D();
      venusOrbit.position.x = 10;
      solarSystem.add(venusOrbit);
      objects.push(venusOrbit);

      const earthOrbit = new THREE.Object3D();
      earthOrbit.position.x = 35;
      solarSystem.add(earthOrbit);
      objects.push(earthOrbit);

      const moonOrbit = new THREE.Object3D();
      moonOrbit.position.x = 5;
      earthOrbit.add(moonOrbit);
      moonlight.target = moonOrbit;

      scene.add(light.target);
      light.target = earthOrbit;

      scene.add(mercurylight.target);
      mercurylight.target = mercuryOrbit;

      scene.add(venuslight.target);
      venuslight.target = venusOrbit;

      const sunMaterial = new THREE.MeshBasicMaterial({
        map: loader.load("textures/map_sun.jpg"),
      });
      //const sunMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });

      const mercuryMaterial = new THREE.MeshStandardMaterial({
        map: loader.load("textures/mercury.jpg"),
        transparent: false,
      });

      const venusMaterial = new THREE.MeshStandardMaterial({
        map: loader.load("textures/venus.jpg"),
        transparent: false,
      });

      const earthMaterial = new THREE.MeshStandardMaterial({
        map: loader.load("textures/earth.jpg"),
        transparent: false,
      });

      const moonMaterial = new THREE.MeshStandardMaterial({
        map: loader.load("textures/moon.jpg"),
        //lightMap: moonlight,
      });

      const sunMesh = new THREE.Mesh(sunsphereGeometry, sunMaterial);
      sunMesh.scale.set(1, 1, 1); // agrandit le soleil
      sunMesh.position.x = 0;
      solarSystem.add(sunMesh);
      objects.push(sunMesh);

      // halo *****************
      // Create a halo
      /* const haloGeometry = new THREE.CircleGeometry(1.2, 64);
      const haloMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0.0 },
          color: { value: new THREE.Color("#ffffff") },
        },
        vertexShader: `
        uniform float time;
        varying vec3 vNormal;

        void main() {
          vNormal = normal;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
        fragmentShader: `
        uniform float time;
        uniform vec3 color;
        varying vec3 vNormal;

        void main() {
          float intensity = 1.0 - dot(normalize(vNormal), vec3(0.0, 0.0, 1.0));
          gl_FragColor = vec4(color * intensity, 1.0);
        }
      `,
        transparent: true,
        depthTest: false,
      });

      const halo = new THREE.Mesh(haloGeometry, haloMaterial);
      sunMesh.add(halo); */

      // fin halo ***********

      const mercuryMesh = new THREE.Mesh(
        mercurySphereGeometry,
        mercuryMaterial
      );
      mercuryMesh.scale.set(1, 1, 1);
      mercuryMesh.castShadow = true;
      mercuryMesh.receiveShadow = true;

      const venusMesh = new THREE.Mesh(venusSphereGeometry, venusMaterial);
      venusMesh.scale.set(1, 1, 1);
      venusMesh.castShadow = true;
      venusMesh.receiveShadow = true;

      const earthMesh = new THREE.Mesh(earthSphereGeometry, earthMaterial);
      earthMesh.scale.set(1, 1, 1);
      earthMesh.castShadow = true;
      earthMesh.receiveShadow = true;

      const moonMesh = new THREE.Mesh(moonSphereGeometry, moonMaterial);
      moonMesh.scale.set(1, 1, 1);
      moonMesh.castShadow = true;
      earthMesh.receiveShadow = true;

      mercuryOrbit.add(mercuryMesh);
      objects.push(mercuryMesh);

      venusOrbit.add(venusMesh);
      objects.push(venusMesh);

      earthOrbit.add(earthMesh);
      objects.push(earthMesh);

      moonOrbit.add(moonMesh);
      objects.push(moonMesh);

      /* function makeAxisGrid(node, label, units) {
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
 */
      const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      //camera.position.z = 2;

      // For sun
      camera.position.set(0, 100, 0);
      camera.up.set(0, 1, 0);
      camera.lookAt(0, 0, 0);

      // Animation
      function render(time, ndx) {
        time *= 0.0002; // convertit le temps en secondes
        if (camera.position.y > 50) {
          camera.position.y -= time * 0.01;
        }

        if (resizeRendererToDisplaySize(renderer)) {
          const canvas = renderer.domElement;
          camera.aspect = canvas.clientWidth / canvas.clientHeight;
          camera.updateProjectionMatrix();
        }

        //if (camera.position.y >= 50) {
        objects.forEach((obj) => {
          obj.rotation.z = time;
        });

        // Update the halo's time uniform for animation
        //haloMaterial.uniforms.time.value += 0.01;
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
