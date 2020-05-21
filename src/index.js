import * as THREE from "three";
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

  function playerCreate() {
  const playerGeometry = new THREE.CylinderGeometry( 0.5, 0.5, 5, 64 );
  const playerMaterial = new THREE.MeshBasicMaterial( {color: 0x0000ff} );
  const player = new THREE.Mesh( playerGeometry, playerMaterial );
  scene.add(player);
  player.position.x =0;
  player.position.z =0;
  player.position.y =2.5;
  return player;
  }
  const player = playerCreate();

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
    const portalsGeometry = new THREE.BoxGeometry(2,5,1);
    
    //portal 1
    const portal1 = new THREE.Mesh(portalsGeometry, portalsC);
    scene.add(portal1);
    portal1.position.z=-10;
    
    //room1
    if(true) {
      const room1FloorG = new THREE.PlaneGeometry(20, 20);
      const room1Floor = new THREE.Mesh(room1FloorG,roomsFloorC);
      scene.add(room1Floor);
      room1Floor.rotation.x=-Math.PI / 2;

      const room1wallG1 = new THREE.BoxGeometry(1,5,20);
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
      room1Wall4.position.x = 5;
      room1Wall4.rotation.y = Math.PI / 2
      room1Wall5.position.z = -10;
      room1Wall5.position.x = -5;
      room1Wall5.rotation.y = Math.PI / 2

    }
    //room2
    if(true) {
      const room2FloorG = new THREE.PlaneGeometry(40, 20);
      const room2Floor = new THREE.Mesh(room2FloorG,roomsFloorC);
      scene.add(room2Floor);
      room2Floor.rotation.x=-Math.PI / 2;
      room2Floor.position.z=-20;
    }
    }

    function keyPutDown (event) {
        const keyCode = event.which;
        const arrDash = 0.1;
        const arrRot =  (Math.PI / 2) * 0.05;
        switch (keyCode) {
          case(68):
          player.position.x += arrDash;
          break;
          case(65):
          player.position.x += (-arrDash);
          break;
          case(87):
          player.position.z += (-arrDash);
          break;
          case(83):
          player.position.z += arrDash;
          break;
          case(81):
          player.rotation.y += arrRot;
          break;
          case(69):
          player.rotation.y += (-arrRot);
          break;
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
      light();
      rooms();
      render();
      console.log('init complete');
}
root.onload = init();
document.addEventListener("keydown", keyPutDown);