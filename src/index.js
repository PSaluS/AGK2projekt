import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import './style.scss';

const root = document.getElementById("root");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    45,
    root.offsetWidth * 0.993 /
    root.offsetHeight * 0.99,
    0.1,
    100
);
let visibleDist = 10;

  function playerCreate() {
  const playerGeometry = new THREE.CylinderGeometry( 0.5, 0.5, 5, 64 );
  const playerMaterial = new THREE.MeshBasicMaterial( {color: 0x0000ff} );
  const player = new THREE.Mesh( playerGeometry, playerMaterial );
  scene.add(player);
  player.position.x = 0;
  player.position.z = 0;
  player.position.y = 2.5;

  return player;
  }

  function virtualVameraCreate() {

    const vCameraGeometry = new THREE.ConeGeometry( visibleDist/2, visibleDist, 4 );
    const vCameraMaterial = new THREE.MeshBasicMaterial( {color: 0xff0000, wireframe: true} );
    const vCamera = new THREE.Mesh( vCameraGeometry, vCameraMaterial );
    scene.add(vCamera);
    vCamera.position.y = 4;
    vCamera.position.z = -visibleDist/2;
    vCamera.rotation.x = Math.PI / 2;
    vCamera.rotation.y = Math.PI / 4;

    return vCamera;

  }
  const player = playerCreate();
  const vCamera =virtualVameraCreate();
const renderer = new THREE.WebGLRenderer();
function light() {
    var AmbientLight = new THREE.AmbientLight(0xffffff, 0.4);
    var DirectionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
    DirectionalLight.position.set(0,50,0);
    scene.add(DirectionalLight);
    scene.add(AmbientLight);
  };

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  };

function rooms() {
    const roomsFloorC = new THREE.MeshBasicMaterial({ color: 0xaaaaaa });
    const roomsWallC = new THREE.MeshBasicMaterial({ color: 0x666666 });
    const portalsC = new THREE.MeshBasicMaterial({color: 0x00ff00});
    const portalsGeometry = new THREE.BoxGeometry(3,5,1);
    const room1FloorG = new THREE.PlaneGeometry(20, 20);

    const portal1 = new THREE.Mesh(portalsGeometry, portalsC);
    const portal2 = new THREE.Mesh(portalsGeometry, portalsC);
    const portal3 = new THREE.Mesh(portalsGeometry, portalsC);
    const portal4 = new THREE.Mesh(portalsGeometry, portalsC);
    
    //portal 1
    scene.add(portal1);
    portal1.position.z = -10;
    portal1.position.y = 2.5;

    //portal2
    scene.add(portal2);
    portal2.position.z = -30;
    portal2.position.x = 10;
    portal2.position.y = 2.5;

    //portal3
    scene.add(portal3);
    portal3.position.z = -30;
    portal3.position.x = -10;
    portal3.position.y = 2.5;

    //portal4
    scene.add(portal4);
    portal4.position.z = -50;
    portal4.position.x = -10;
    portal4.position.y = 2.5;

    //room1
    if(true) {
      const room1Floor = new THREE.Mesh(room1FloorG,roomsFloorC);
      scene.add(room1Floor);
      room1Floor.rotation.x=-Math.PI / 2;

      const room1wallG1 = new THREE.BoxGeometry(1,5,21);
      const room1wallG2 = new THREE.BoxGeometry(1,5,9);

      const room1Wall1 = new THREE.Mesh(room1wallG1, roomsWallC);
      const room1Wall2 = new THREE.Mesh(room1wallG1, roomsWallC);
      const room1Wall3 = new THREE.Mesh(room1wallG1, roomsWallC);
      const room1Wall4 = new THREE.Mesh(room1wallG2, roomsWallC);
      const room1Wall5 = new THREE.Mesh(room1wallG2, roomsWallC);

      scene.add(room1Wall1);
      scene.add(room1Wall2);
      scene.add(room1Wall3);
      scene.add(room1Wall4);
      scene.add(room1Wall5);

      room1Wall1.position.x = 10;
      room1Wall2.position.x = -10;
      room1Wall3.position.z = 10;
      room1Wall3.rotation.y = Math.PI / 2
      room1Wall4.position.z = -10;
      room1Wall4.position.x = 6;
      room1Wall4.rotation.y = Math.PI / 2
      room1Wall5.position.z = -10;
      room1Wall5.position.x = -6;
      room1Wall5.rotation.y = Math.PI / 2

      room1Wall1.position.y = 2.5;
      room1Wall2.position.y = 2.5;
      room1Wall3.position.y = 2.5;
      room1Wall4.position.y = 2.5;
      room1Wall5.position.y = 2.5;

    }
    //room2
    if(true) {
      const room2FloorG = new THREE.PlaneGeometry(40, 20);
      const room2Floor = new THREE.Mesh(room2FloorG,roomsFloorC);
      scene.add(room2Floor);
      room2Floor.rotation.x=-Math.PI / 2;
      room2Floor.position.z=-20;

      const room2wallG1 = new THREE.BoxGeometry(1,5,19);
      const room2wallG2 = new THREE.BoxGeometry(1,5,20);
      const room2wallG3 = new THREE.BoxGeometry(1,5,9);
      const room2wallG4 = new THREE.BoxGeometry(1,5,17);

      const room2Wall1 = new THREE.Mesh(room2wallG1, roomsWallC);
      const room2Wall2 = new THREE.Mesh(room2wallG1, roomsWallC);

      const room2Wall3 = new THREE.Mesh(room2wallG2, roomsWallC);
      const room2Wall4 = new THREE.Mesh(room2wallG2, roomsWallC);

      const room2Wall5 = new THREE.Mesh(room2wallG3, roomsWallC);
      const room2Wall6 = new THREE.Mesh(room2wallG3, roomsWallC);

      const room2Wall7 = new THREE.Mesh(room2wallG4, roomsWallC);

      scene.add(room2Wall1);
      scene.add(room2Wall2);

      scene.add(room2Wall3);
      scene.add(room2Wall4);

      scene.add(room2Wall5);
      scene.add(room2Wall6);

      scene.add(room2Wall7);

      room2Wall1.rotation.y = Math.PI / 2;
      room2Wall1.position.z = -10;
      room2Wall1.position.x = -11;
      room2Wall1.position.y = 2.5;

      room2Wall2.rotation.y = Math.PI / 2;
      room2Wall2.position.z = -10;
      room2Wall2.position.x = 11;
      room2Wall2.position.y = 2.5;


      room2Wall3.position.z = -20;
      room2Wall3.position.x = -20;
      room2Wall3.position.y = 2.5;

      room2Wall4.position.z = -20;
      room2Wall4.position.x = 20;
      room2Wall4.position.y = 2.5;


      room2Wall5.rotation.y = Math.PI / 2;
      room2Wall5.position.z = -30;
      room2Wall5.position.x = -16;
      room2Wall5.position.y = 2.5;

      room2Wall6.rotation.y = Math.PI / 2;
      room2Wall6.position.z = -30;
      room2Wall6.position.x = 16;
      room2Wall6.position.y = 2.5;


      room2Wall7.rotation.y = Math.PI / 2;
      room2Wall7.position.z = -30;
      room2Wall7.position.y = 2.5;

    }
    //room3
    if(true) {
      const room3Floor = new THREE.Mesh(room1FloorG,roomsFloorC);
      scene.add(room3Floor);
      room3Floor.rotation.x=-Math.PI / 2;
      room3Floor.position.z = -40;
      room3Floor.position.x = 10;

    }

    //room4
    if(true) {
      const room4Floor = new THREE.Mesh(room1FloorG,roomsFloorC);
      scene.add(room4Floor);
      room4Floor.rotation.x=-Math.PI / 2;
      room4Floor.position.z = -40;
      room4Floor.position.x = -10;
    }

    //room5
    if(true) {
      const room5Floor = new THREE.Mesh(room1FloorG,roomsFloorC);
      scene.add(room5Floor);
      room5Floor.rotation.x=-Math.PI / 2;
      room5Floor.position.z = -60;
      room5Floor.position.x = -10;
    }
    }

    function keyPutDown (event) {
        const keyCode = event.which;
        const arrDash = 0.1;
        const arrRot =  (Math.PI / 2) * 0.05;
        switch (keyCode) {
          case(68):
          player.position.x += arrDash;
          camera.position.x += arrDash;
          vCamera.position.x += arrDash;
          break;
          case(65):
          player.position.x += (-arrDash);
          camera.position.x += (-arrDash);
          vCamera.position.x += (-arrDash);
          break;
          case(87):
          player.position.z += (-arrDash);
          camera.position.z += (-arrDash);
          vCamera.position.z += (-arrDash);
          break;
          case(83):
          player.position.z += arrDash;
          camera.position.z += arrDash;
          vCamera.position.z += arrDash;
          break;
          // case(81):
          // player.rotation.y += arrRot;
          // //vCamera.rotation.z += arrRot;
          // break;
          // case(69):
          // player.rotation.y += (-arrRot);
          // //vCamera.rotation.z += (-arrRot);
          // break;
        }
        }

function init() {
    camera.position.set(0, 50, 0);
    camera.lookAt(0,0,0);
    scene.add(camera);
    renderer.setSize(
        root.offsetWidth * 0.993,
        root.offsetHeight * 0.99
      );
      renderer.setClearColor(0x000000, 1);
      root.appendChild(renderer.domElement);
      let controls = new OrbitControls( camera, renderer.domElement );
      light();
      rooms();
      render();
      console.log('init complete');
}
root.onload = init();
document.addEventListener("keydown", keyPutDown);