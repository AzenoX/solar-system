import './style.css'
import * as THREE from 'three';


/*===========================================

    Define variables

===========================================*/
const sunSize = 200;
const defaultScrollSpeed = 1;

const textDistanceFromTheSun = document.querySelector('#distance_from_the_sun');


//Textures for multiples objects
const basicNormalTexture = new THREE.TextureLoader().load('img/basic_normal.jpg');


/*===========================================

    Calculate Planets size and distance

===========================================*/
//Ref: https://www.exploratorium.edu/ronh/solar_system/
const _ua = 149600000; // ~149 600 000 km
const sunRealSize = 1392684;
const reduceFactor = sunRealSize / sunSize; // 6963.42



/*===========================================

    Declare scene

===========================================*/

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg')
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);



/*===========================================

    Build objects

===========================================*/

const planets = {};

//Sun
planets['sun'] = [];
planets['sun']['size'] = sunSize;
planets['sun']['distance'] = 0;
planets['sun']['texture'] = 'img/8k_sun.jpg';
planets['sun']['tilt'] = 0;
planets['sun']['rotation'] = 0.00000008 * reduceFactor / 3;
planets['sun']['scroll_distance'] = 100;
planets['sun']['gotRings'] = false;

//Mercury
planets['mercury'] = [];
planets['mercury']['size'] = (sunRealSize / 286.04) / reduceFactor;
planets['mercury']['distance'] = ((38 * _ua) / 100) / reduceFactor;
planets['mercury']['texture'] = 'img/planets/8k_mercury.jpg';
planets['mercury']['tilt'] = 0.01;
planets['mercury']['rotation'] = 0.00000118 * reduceFactor / 3;
planets['mercury']['scroll_distance'] = 7777;
planets['mercury']['gotRings'] = false;

//Venus
planets['venus'] = [];
planets['venus']['size'] = (sunRealSize / 114.97) / reduceFactor;
planets['venus']['distance'] = ((72 * _ua) / 100) / reduceFactor;
planets['venus']['texture'] = 'img/planets/4k_venus_atmosphere.jpg';
planets['venus']['tilt'] = 177.3;
planets['venus']['rotation'] = 0.000000284 * reduceFactor / 3;
planets['venus']['scroll_distance'] = 15088;
planets['venus']['gotRings'] = false;

//Earth
planets['earth'] = [];
planets['earth']['size'] = (sunRealSize / 119.23) / reduceFactor;
planets['earth']['distance'] = ((100 * _ua) / 100) / reduceFactor; //OK...
planets['earth']['texture'] = 'img/planets/8k_earth_nightmap.jpg';
planets['earth']['tilt'] = 23.26;
planets['earth']['rotation'] = 0.0000696 * reduceFactor / 3;
planets['earth']['scroll_distance'] = 21100;
planets['earth']['gotRings'] = false;

//Mars
planets['mars'] = [];
planets['mars']['size'] = (sunRealSize / 205.90) / reduceFactor;
planets['mars']['distance'] = ((150 * _ua) / 100) / reduceFactor;
planets['mars']['texture'] = 'img/planets/8k_mars.jpg';
planets['mars']['tilt'] = 25.19;
planets['mars']['rotation'] = 0.0000676 * reduceFactor / 3;
planets['mars']['scroll_distance'] = 31845;
planets['mars']['gotRings'] = false;

//Jupiter
planets['jupiter'] = [];
planets['jupiter']['size'] = (sunRealSize / 9.73) / reduceFactor;
planets['jupiter']['distance'] = ((520 * _ua) / 100) / reduceFactor;
planets['jupiter']['texture'] = 'img/planets/8k_jupiter.jpg';
planets['jupiter']['tilt'] = 3.13;
planets['jupiter']['rotation'] = 0.0001684 * reduceFactor / 3;
planets['jupiter']['scroll_distance'] = 111381;
planets['jupiter']['gotRings'] = false;

//Saturn
planets['saturn'] = [];
planets['saturn']['size'] = (sunRealSize / 11.95) / reduceFactor;
planets['saturn']['distance'] = ((950 * _ua) / 100) / reduceFactor;
planets['saturn']['texture'] = 'img/planets/8k_saturn.jpg';
planets['saturn']['tilt'] = 26.73;
planets['saturn']['rotation'] = 0.0001558 * reduceFactor / 3;
planets['saturn']['scroll_distance'] = 203765;
planets['saturn']['gotRings'] = true;
planets['saturn']['rings_texture'] = 'img/planets/rings.png';

//Uranus
planets['uranus'] = [];
planets['uranus']['size'] = (sunRealSize / 29.65) / reduceFactor;
planets['uranus']['distance'] = ((1920 * _ua) / 100) / reduceFactor;
planets['uranus']['texture'] = 'img/planets/2k_uranus.jpg';
planets['uranus']['tilt'] = 97.77;
planets['uranus']['rotation'] = 0.0000969 * reduceFactor / 3;
planets['uranus']['scroll_distance'] = 412126;
planets['uranus']['gotRings'] = false;

//Neptune
planets['neptune'] = [];
planets['neptune']['size'] = (sunRealSize / 30.63) / reduceFactor;
planets['neptune']['distance'] = ((3010 * _ua) / 100) / reduceFactor;
planets['neptune']['texture'] = 'img/planets/2k_neptune.jpg';
planets['neptune']['tilt'] = 28.32;
planets['neptune']['rotation'] = 0.000104 * reduceFactor / 3;
planets['neptune']['scroll_distance'] = 646279;
planets['neptune']['gotRings'] = false;

/*
* Okay, Jupiter, Uranus and Neptune got rings but they are too thin...
* */

/*
*
* Mercury
* Needed: 7783
* Real: 8163
* Diff: 380
*
* Venus
* Needed: 15088
* Real: 15468
* Diff: 380
*
* Earth
* Needed: 21100
* Real: -21484
* Diff: 384
*
* Mars
* Needed: 31845
* Real: 32225
* Diff: 380
*
*
* Jupiter
* Needed: 111381
* Real: 111715
* Diff: 334
*
* Saturn
* Needed: 203765
* Real: 204095
* Diff: 330
*
* Uranus
* Needed: 412126
* Real: 412486
* Diff: 360
*
* Neptune
* Needed: 646279
* Real: 646659
* Diff: 380
*
*
*
* */


const planetInstances = {};

//console.log(planets);

Object.entries(planets).forEach(([name, data]) => {
    const size = data['size'];
    const distance = data['distance'];
    const texture = data['texture'];
    const tilt = data['tilt'];

    const planetTexture = new THREE.TextureLoader().load(texture);
    const planet = new THREE.Mesh(
        new THREE.SphereGeometry(size, 1024, 1024),
        new THREE.MeshStandardMaterial(
            {
                map: planetTexture,
                normalMap: basicNormalTexture
            }
        )
    );
    planet.position.z = distance;
    planet.rotation.z = THREE.Math.degToRad(tilt);
    scene.add(planet);
    planetInstances[name] = planet;


    //Add rings
    if(data['gotRings']){
        const rings_texture = data['rings_texture'];

        const ringTexture = new THREE.TextureLoader().load(rings_texture);
        const ring = new THREE.Mesh(
            new THREE.RingGeometry(25, 30, 1024),
            new THREE.MeshStandardMaterial(
                {
                    map: ringTexture,
                    side: THREE.DoubleSide
                }
            )
        );
        ring.position.z = distance;
        ring.rotation.x = THREE.Math.degToRad(100);
        ring.rotation.z = THREE.Math.degToRad(30);
        scene.add(ring);
    }

    console.log(name, split(distance * reduceFactor), distance);
});


//Add ambient light
const pointLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight);


// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);



//Generate stars
// function addStar(){
//     const geometry = new THREE.SphereGeometry(0.2, 64);
//     const material = new THREE.MeshStandardMaterial({color: 0xffffff});
//     const star = new THREE.Mesh(geometry, material);
//
//     const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(1000, 10000));
//
//     star.position.set(x, y, z);
//     scene.add(star);
// }
// Array(400).fill().forEach(addStar);


//Space background
const spaceTexture = new THREE.TextureLoader().load('img/universe.jpg');
scene.background = spaceTexture;



//Define default camera
camera.position.setX(10);
camera.position.setZ(sunSize * 2);


//Move camera on scroll
function moveCamera(){
    const t = document.body.getBoundingClientRect().top;
    //console.log(t);
    camera.position.z = (sunSize * 2) + (t * -defaultScrollSpeed);
}
document.body.onscroll = moveCamera;

//const controls = new OrbitControls(camera, renderer.domElement);

function animate(){
    requestAnimationFrame(animate);

    //Set bottom text
    textDistanceFromTheSun.textContent = split((document.body.getBoundingClientRect().top * reduceFactor) * -1);

    // sun.rotation.y += 0.001;
    // mercury.rotation.y += 0.0008;

    Object.entries(planetInstances).forEach(([name, data]) => {
        //data.rotation.y += THREE.Math.degToRad(planets[name]['rotation']);
        data.rotateOnAxis(new THREE.Vector3(0,1,0), THREE.Math.degToRad(planets[name]['rotation']));
    });

    //controls.update();

    renderer.render(scene, camera);
}
animate();



/*===========================================

    Navigation Listeners

===========================================*/
const navElements = document.querySelectorAll('.navTo');
navElements.forEach((item) => {
    item.addEventListener('click', () => {
        const target = item.getAttribute('data-nav');
        const distance = planets[target]['scroll_distance'];

        window.scrollTo({
            top: distance,
            behavior: 'smooth'
        });
    });
});



/*===========================================

    UTILITIES

===========================================*/
function split(n) {
    return Number(n).toLocaleString('en-US');
}


function goTo(scroll){
    window.scrollTo({
        top: scroll,
        behavior: 'smooth'
    });
}
