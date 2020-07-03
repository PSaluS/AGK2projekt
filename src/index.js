import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import Stats from "stats.js";
import './style.scss';

let range = 15;
let angle = 45;
let portalVisibility = 1;
const stats = new Stats();
const root = document.getElementById("root");
const root2 = document.getElementById("root2");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    45,
    root.offsetWidth * 0.993 /
    root.offsetHeight * 0.99,
    0.1,
    100
);
const camera2 = new THREE.PerspectiveCamera(
  angle,
  1,
  0.1,
  range
);

let pp = ['room', true, false, false, false, false];

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

  function virtualCameraCreate() {
    let vCameraGeometry = new THREE.Geometry();
    let vCameraAngle = ((angle/2) * Math.PI)/180;
    let tgAngle = Math.tan(vCameraAngle);
    let del = tgAngle * range;
    const dash = 0;
    vCameraGeometry.vertices.push(
      new THREE.Vector3( 0,0,0 ),
      new THREE.Vector3( del,del, -range-dash ),
      new THREE.Vector3(  del,-del, -range-dash ),
      new THREE.Vector3( -del,-del, -range-dash ),
      new THREE.Vector3( -del,del, -range-dash ),
      new THREE.Vector3(  0,0, -range-dash ),
      new THREE.Vector3( del,0, -range-dash ),
      new THREE.Vector3(  0,-del, -range-dash ),
      new THREE.Vector3( -del,0, -range-dash ),
      new THREE.Vector3( 0,del, -range-dash ),

      new THREE.Vector3( del/2,del/2, -range-dash ),
      new THREE.Vector3(  del/2,-del/2, -range-dash ),
      new THREE.Vector3( -del/2,-del/2, -range-dash ),
      new THREE.Vector3( -del/2,del/2, -range-dash ),
      new THREE.Vector3( del/2,0, -range-dash ),
      new THREE.Vector3(  0,-del/2, -range-dash ),
      new THREE.Vector3( -del/2,0, -range-dash ),
      new THREE.Vector3( 0,del/2, -range-dash ),
    );
    vCameraGeometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
    vCameraGeometry.faces.push( new THREE.Face3( 0,2,3) );
    vCameraGeometry.faces.push( new THREE.Face3( 0, 3, 4 ) );
    vCameraGeometry.faces.push( new THREE.Face3( 0,4,1 ) );

    vCameraGeometry.faces.push( new THREE.Face3( 5, 1, 2 ) );
    vCameraGeometry.faces.push( new THREE.Face3( 5, 2, 3 ) );
    vCameraGeometry.faces.push( new THREE.Face3( 5, 3, 4 ) );
    vCameraGeometry.faces.push( new THREE.Face3( 5, 4, 1 ) );

    vCameraGeometry.faces.push( new THREE.Face3( 0, 5, 6 ) );
    vCameraGeometry.faces.push( new THREE.Face3( 0, 5, 7 ) );
    vCameraGeometry.faces.push( new THREE.Face3( 0, 5, 8 ) );
    vCameraGeometry.faces.push( new THREE.Face3( 0, 5, 9 ) );

    vCameraGeometry.faces.push( new THREE.Face3( 0, 5, 10 ) );
    vCameraGeometry.faces.push( new THREE.Face3( 0, 5, 11 ) );
    vCameraGeometry.faces.push( new THREE.Face3( 0, 5, 12 ) );
    vCameraGeometry.faces.push( new THREE.Face3( 0, 5, 13 ) );

    vCameraGeometry.faces.push( new THREE.Face3( 0, 5, 14 ) );
    vCameraGeometry.faces.push( new THREE.Face3( 0, 5, 15 ) );
    vCameraGeometry.faces.push( new THREE.Face3( 0, 5, 16 ) );
    vCameraGeometry.faces.push( new THREE.Face3( 0, 5, 17 ) );

    const vCameraMaterial = new THREE.MeshBasicMaterial( {color: 0xff0000, wireframe: true} );
    const vCamera = new THREE.Mesh( vCameraGeometry, vCameraMaterial );
    vCamera.position.y = 2.5;
    scene.add(vCamera);
    return vCamera;
  }

  const player = playerCreate();
  const vCamera = virtualCameraCreate();
  const renderer = new THREE.WebGLRenderer();

function light() {
    var AmbientLight = new THREE.AmbientLight(0xffffff, 0.4);
    var DirectionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
    DirectionalLight.position.set(0,50,0);
    scene.add(DirectionalLight);
    scene.add(AmbientLight);
  };

function render() {

  camera.aspect=root.offsetWidth/root.offsetHeight;
  camera2.aspect=root2.offsetWidth/root2.offsetWidth;
  camera.updateProjectionMatrix();
  camera2.updateProjectionMatrix();

  renderer.setViewport( 0, 0, root.offsetWidth+root2.offsetWidth, root.offsetHeight );
  renderer.clear();

  renderer.setViewport(1,1, root.offsetWidth, root.offsetHeight);
  renderer.render(scene, camera);

  renderer.setViewport(root.offsetWidth+5,1,root2.offsetWidth, root2.offsetWidth)
  renderer.render(scene, camera2);

    let relativeCameraOffset = new THREE.Vector3(0,4,0);
    let cameraOffset = relativeCameraOffset.applyMatrix4( vCamera.matrixWorld );

    camera2.position.x = cameraOffset.x;
    camera2.position.y = 2.5
    camera2.position.z = cameraOffset.z;

    camera2.lookAt(vCamera.geometry.vertices[5].clone().applyMatrix4(vCamera.matrix));
    };

function animate() {
  stats.begin();
  rooms();
  render();
  stats.end();
  requestAnimationFrame(animate);
}

function rooms() {

  while(scene.children.length > 6) {
    scene.remove(scene.children[scene.children.length-1]);
  }

    playerHere();
    const roomsFloorC = new THREE.MeshBasicMaterial({ color: 0xaaaaaa });
    const roomsWallC = new THREE.MeshBasicMaterial({ color: 0x666666 });
    let portalsC;
    if(portalVisibility == 1) portalsC = new THREE.MeshBasicMaterial({color: 0x00ff00});
    if(portalVisibility == 2) portalsC = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});
    if(portalVisibility == 3) {
      portalsC = new THREE.MeshBasicMaterial({color: 0x00ff00, opacity: 0})
      portalsC.alphaTest = 0.5
    };
    const portalsGeometry = new THREE.BoxGeometry(3,5,0.01,20,20,20);
    const room1FloorG = new THREE.PlaneGeometry(20, 20);

    const portal1 = new THREE.Mesh(portalsGeometry, portalsC);
    const portal2 = new THREE.Mesh(portalsGeometry, portalsC);
    const portal3 = new THREE.Mesh(portalsGeometry, portalsC);
    const portal4 = new THREE.Mesh(portalsGeometry, portalsC);

    //portal 1
    portal1.position.set(0,2.5,-10);
    scene.add(portal1);

    //portal2
    portal2.position.set(10,2.5,-30);
    scene.add(portal2);

    //portal3
    portal3.position.z = -30;
    portal3.position.x = -10;
    portal3.position.y = 2.5;
    scene.add(portal3);

    //portal4
    portal4.position.z = -50;
    portal4.position.x = -10;
    portal4.position.y = 2.5;
    scene.add(portal4);

    //room1
    if(check(portal1)|| pp[1]) {
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
    if(check(portal1)||check(portal2)||check(portal3)||pp[2]) {
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
    if(check(portal2) ||pp[3]) {
      const room3Floor = new THREE.Mesh(room1FloorG,roomsFloorC);
      scene.add(room3Floor);
      room3Floor.rotation.x=-Math.PI / 2;
      room3Floor.position.z = -40;
      room3Floor.position.x = 10;

      const room3wallG1 = new THREE.BoxGeometry(1,5,21);
      const room3wallG2 = new THREE.BoxGeometry(1,5,9);

      const room3Wall1 = new THREE.Mesh(room3wallG1, roomsWallC);
      const room3Wall2 = new THREE.Mesh(room3wallG1, roomsWallC);
      const room3Wall3 = new THREE.Mesh(room3wallG1, roomsWallC);
      const room3Wall4 = new THREE.Mesh(room3wallG2, roomsWallC);
      const room3Wall5 = new THREE.Mesh(room3wallG2, roomsWallC);

      room3Wall1.rotation.y = Math.PI / 2;
      room3Wall1.position.set(10,2.5,-50);

      room3Wall2.position.set(0,2.5,-40);
      room3Wall3.position.set(20,2.5,-40);

      room3Wall4.rotation.y = Math.PI / 2;
      room3Wall4.position.set(16,2.5,-30);
      room3Wall5.rotation.y = Math.PI / 2;
      room3Wall5.position.set(4,2.5,-30);

      scene.add(room3Wall1);
      scene.add(room3Wall2);
      scene.add(room3Wall3);
      scene.add(room3Wall4);
      scene.add(room3Wall5);

      //Test

      const testGeometry = new THREE.TorusKnotBufferGeometry( 3, 1, 1000, 1000 );;
      const testMaterial = new  THREE.MeshPhongMaterial({color: 0xaa0000, wireframe: true, morphTargets: true});
      const testMesh = new THREE.Mesh( testGeometry, testMaterial );
      scene.add(testMesh);
      testMesh.position.z = -40;
      testMesh.position.x = 10;
    }

    //room4
    if(check(portal3)||check(portal4) ||pp[4]) {
      const room4Floor = new THREE.Mesh(room1FloorG,roomsFloorC);
      scene.add(room4Floor);
      room4Floor.rotation.x=-Math.PI / 2;
      room4Floor.position.z = -40;
      room4Floor.position.x = -10;

      const room4wallG1 = new THREE.BoxGeometry(1,5,21);
      const room4wallG2 = new THREE.BoxGeometry(1,5,9);

      const room4Wall0 = new THREE.Mesh(room4wallG2, roomsWallC);
      const room4Wall1 = new THREE.Mesh(room4wallG2, roomsWallC);
      const room4Wall2 = new THREE.Mesh(room4wallG1, roomsWallC);
      const room4Wall3 = new THREE.Mesh(room4wallG1, roomsWallC);
      const room4Wall4 = new THREE.Mesh(room4wallG2, roomsWallC);
      const room4Wall5 = new THREE.Mesh(room4wallG2, roomsWallC);

      room4Wall0.rotation.y = Math.PI / 2;
      room4Wall0.position.set(-16,2.5,-50);

      room4Wall1.rotation.y = Math.PI / 2;
      room4Wall1.position.set(-4,2.5,-50);

      room4Wall2.position.set(0,2.5,-40);
      room4Wall3.position.set(-20,2.5,-40);

      room4Wall4.rotation.y = Math.PI / 2;
      room4Wall4.position.set(-16,2.5,-30);
      room4Wall5.rotation.y = Math.PI / 2;
      room4Wall5.position.set(-4,2.5,-30);

      scene.add(room4Wall0);
      scene.add(room4Wall1);
      scene.add(room4Wall2);
      scene.add(room4Wall3);
      scene.add(room4Wall4);
      scene.add(room4Wall5);
    }

    //room5
    if(check(portal4) ||pp[5]) {
      const room5Floor = new THREE.Mesh(room1FloorG,roomsFloorC);
      scene.add(room5Floor);
      room5Floor.rotation.x=-Math.PI / 2;
      room5Floor.position.z = -60;
      room5Floor.position.x = -10;

      const room5wallG1 = new THREE.BoxGeometry(1,5,21);
      const room5wallG2 = new THREE.BoxGeometry(1,5,9);

      const room5Wall1 = new THREE.Mesh(room5wallG1, roomsWallC);
      const room5Wall2 = new THREE.Mesh(room5wallG1, roomsWallC);
      const room5Wall3 = new THREE.Mesh(room5wallG1, roomsWallC);
      const room5Wall4 = new THREE.Mesh(room5wallG2, roomsWallC);
      const room5Wall5 = new THREE.Mesh(room5wallG2, roomsWallC);

      room5Wall1.rotation.y = Math.PI / 2;
      room5Wall1.position.set(-10,2.5,-70);

      room5Wall2.position.set(0,2.5,-60);
      room5Wall3.position.set(-20,2.5,-60);

      room5Wall4.rotation.y = Math.PI / 2;
      room5Wall4.position.set(-16,2.5,-50);
      room5Wall5.rotation.y = Math.PI / 2;
      room5Wall5.position.set(-4,2.5,-50);

      scene.add(room5Wall1);
      scene.add(room5Wall2);
      scene.add(room5Wall3);
      scene.add(room5Wall4);
      scene.add(room5Wall5);
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
          case(81):
          player.rotation.y += arrRot;
          vCamera.rotation.y += arrRot;
          break;
          case(69):
          player.rotation.y += (-arrRot);
          vCamera.rotation.y += (-arrRot);
          break;
          case(49):
          portalVisibility=1;
          break;
          case(50):
          portalVisibility=2;
          break;
          case(51):
          portalVisibility=3;
          break;
        }
        }

function check(portal) {

  let originPoint = portal.position.clone();
  for (let i = 0; i < portal.geometry.vertices.length; i++)
	{
    let localVertex = portal.geometry.vertices[i].clone();

    let ray = new THREE.Raycaster( originPoint, localVertex.clone().normalize());
    let collisionResults = ray.intersectObject(vCamera);
		if ( collisionResults.length > 0 && collisionResults[0].distance < localVertex.length() ) {
      return true;
    }
	}
  return false;
}

function playerHere(){
  let x = player.position.x;
  let z = player.position.z;

  if(x>-11&&x<11&&z<11&&z>-11)  pp[1] = true;
  else  pp[1]=false;
  if(x>-21&&x<21&&z>-31&&z<-9)  pp[2] = true;
  else  pp[2]=false;
  if(x>-1&&x<21&&z>-51&&z<-29)  pp[3] = true;
  else  pp[3]=false;
  if(x>-21&&x<1&&z>-51&&z<-29)  pp[4] = true;
  else  pp[4]=false;
  if(x>-21&&x<1&&z>-71&&z<-49)  pp[5] = true;
  else  pp[5]=false;

}

function init() {
    camera.position.set(0, 50, 0);
    camera.lookAt(0,0,0);
    scene.add(camera);
    camera2.position.set(vCamera.position);
    camera2.lookAt(0,0,-1);
    scene.add(camera2);
    renderer.setSize(
        root.offsetWidth + root2.offsetWidth - 6,
        root.offsetHeight*0.992
      );
      renderer.setClearColor(0x000000, 1);
      root.appendChild(renderer.domElement);
      let controls = new OrbitControls( camera, renderer.domElement );
      renderer.autoClear = false;
      light();
      stats.showPanel(0);
      document.body.appendChild(stats.dom);
}
root.onload = init();
root.onload = animate();
document.addEventListener("keydown", keyPutDown);