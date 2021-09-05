import './style.css'
import * as THREE from 'three';

import MicroModal from 'micromodal';

//Images
import imgSun from './img/planets/planets/2k_sun.jpg';
import imgMercury from './img/planets/planets/2k_mercury.jpg';
import imgVenus from './img/planets/planets/2k_venus_atmosphere.jpg';
import imgEarth from './img/planets/planets/2k_earth_nightmap.jpg';
import imgMars from './img/planets/planets/2k_mars.jpg';
import imgJupiter from './img/planets/planets/2k_jupiter.jpg';
import imgSaturn from './img/planets/planets/2k_saturn.jpg';
import imgUranus from './img/planets/planets/2k_uranus.jpg';
import imgNeptune from './img/planets/planets/2k_neptune.jpg';

import imgSaturnRings from './img/planets/rings/saturn_rings.png';
import imgRocksRings from './img/planets/rings/rocks_rings.png';

import imgUniverse from './img/universe.jpg';


/*===========================================

    Define variables

===========================================*/
const sunSize = 200;
const defaultScrollSpeed = 1;
const cameraShift = sunSize * 2;
let cameraShiftX = 0;
const rotationAcceleration = 400;
const earthMass = 5.9724 * Math.pow(10, 24);

const textDistanceFromTheSun = document.querySelector('#distance_from_the_sun');


/*===========================================

    Calculate Planets size and distance

===========================================*/
//Ref: https://www.exploratorium.edu/ronh/solar_system/
const _ua = 149597870.691; // ~149 600 000 km
const sunRealSize = 1392684;
const reduceFactor = sunRealSize / sunSize; // 6963.42



/*===========================================

    Declare scene

===========================================*/

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
    antialias: true
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
planets['sun']['ua'] = 0;
planets['sun']['distance'] = 0;
planets['sun']['scroll_distance'] = convertKmToScroll(planets['sun']['distance']);
planets['sun']['texture'] = imgSun;
planets['sun']['tilt'] = 0;
planets['sun']['mass'] = earthMass * 333000;
planets['sun']['gravity'] = '274 m/s<sup>2</sup> (27.94G) (Surface)';
planets['sun']['temperature'] = '5 000°C / 14 000 000°C';
planets['sun']['type'] = 'G2V';
planets['sun']['rotation'] = 0.00000277 * rotationAcceleration;
planets['sun']['revolution'] = '0 days (yes.. :D)';
planets['sun']['rings'] = null;
planets['sun']['rings_comp'] = null;

//Mercury
planets['mercury'] = [];
planets['mercury']['size'] = (sunRealSize / 286.04) / reduceFactor;
planets['mercury']['ua'] = 0.38;
planets['mercury']['distance'] = planets['mercury']['ua'] * _ua;
planets['mercury']['scroll_distance'] = convertKmToScroll(planets['mercury']['distance']);
planets['mercury']['texture'] = imgMercury;
planets['mercury']['tilt'] = 0.01;
planets['mercury']['mass'] = earthMass * 0.055;
planets['mercury']['gravity'] = '3.70 m/s<sup>2</sup> (0.378G) (Surface)';
planets['mercury']['temperature'] = '-183°C / 427°C';
planets['mercury']['type'] = 'Telluric';
planets['mercury']['rotation'] = 0.00000118 * rotationAcceleration;
planets['mercury']['revolution'] = '88 days';
planets['mercury']['rings'] = null;
planets['mercury']['rings_comp'] = null;

//Venus
planets['venus'] = [];
planets['venus']['size'] = (sunRealSize / 114.97) / reduceFactor;
planets['venus']['ua'] = 0.72;
planets['venus']['distance'] = planets['venus']['ua'] * _ua;
planets['venus']['scroll_distance'] = convertKmToScroll(planets['venus']['distance']);
planets['venus']['texture'] = imgVenus;
planets['venus']['tilt'] = 177.3;
planets['venus']['mass'] = earthMass * 0.815;
planets['venus']['gravity'] = '8.87 m/s<sup>2</sup> (0.907G) (Surface)';
planets['venus']['temperature'] = '~ 462°C';
planets['venus']['type'] = 'Telluric';
planets['venus']['rotation'] = 0.000000284 * rotationAcceleration;
planets['venus']['revolution'] = '224.7 days';
planets['venus']['rings'] = null;
planets['venus']['rings_comp'] = null;

//Earth
planets['earth'] = [];
planets['earth']['size'] = (sunRealSize / 119.23) / reduceFactor;
planets['earth']['ua'] = 1;
planets['earth']['distance'] = planets['earth']['ua'] * _ua; //OK...
planets['earth']['scroll_distance'] = convertKmToScroll(planets['earth']['distance']);
planets['earth']['texture'] = imgEarth;
planets['earth']['tilt'] = 23.26;
planets['earth']['mass'] = earthMass;
planets['earth']['gravity'] = '9.780 m/s<sup>2</sup> (0.99732G) (Surface)';
planets['earth']['temperature'] = '-25°C / 45°C';
planets['earth']['type'] = 'Telluric';
planets['earth']['rotation'] = 0.0000696 * rotationAcceleration;
planets['earth']['revolution'] = '365.256 days';
planets['earth']['rings'] = null;
planets['earth']['rings_comp'] = null;

//Mars
planets['mars'] = [];
planets['mars']['size'] = (sunRealSize / 205.90) / reduceFactor;
planets['mars']['ua'] = 1.50;
planets['mars']['distance'] = planets['mars']['ua'] * _ua;
planets['mars']['scroll_distance'] = convertKmToScroll(planets['mars']['distance']);
planets['mars']['texture'] = imgMars;
planets['mars']['tilt'] = 25.19;
planets['mars']['mass'] = earthMass * 0.107;
planets['mars']['gravity'] = '3.69 m/s<sup>2</sup> (0.377G) (Surface)';
planets['mars']['temperature'] = '-120°C / 25°C';
planets['mars']['type'] = 'Telluric';
planets['mars']['rotation'] = 0.0000676 * rotationAcceleration;
planets['mars']['revolution'] = '687 days';
planets['mars']['rings'] = null;
planets['mars']['rings_comp'] = null;

//Jupiter
planets['jupiter'] = [];
planets['jupiter']['size'] = (sunRealSize / 9.73) / reduceFactor;
planets['jupiter']['ua'] = 5.20;
planets['jupiter']['distance'] = planets['jupiter']['ua'] * _ua;
planets['jupiter']['scroll_distance'] = convertKmToScroll(planets['jupiter']['distance']);
planets['jupiter']['texture'] = imgJupiter;
planets['jupiter']['tilt'] = 3.13;
planets['jupiter']['mass'] = earthMass * 317.83;
planets['jupiter']['gravity'] = '23.12 m/s<sup>2</sup> (2.364G) (at 1 Bar)';
planets['jupiter']['temperature'] = '~ -153°C';
planets['jupiter']['type'] = 'Gas';
planets['jupiter']['rotation'] = 0.0001684 * rotationAcceleration;
planets['jupiter']['revolution'] = '12 years';
planets['jupiter']['rings'] = [imgRocksRings, 30, 30.5, 90, planets['jupiter']['tilt'], 0];
planets['jupiter']['rings_comp'] = 'Rocks and Dust';

//Saturn
planets['saturn'] = [];
planets['saturn']['size'] = (sunRealSize / 11.95) / reduceFactor;
planets['saturn']['ua'] = 9.50;
planets['saturn']['distance'] = planets['saturn']['ua'] * _ua;
planets['saturn']['scroll_distance'] = convertKmToScroll(planets['saturn']['distance']);
planets['saturn']['texture'] = imgSaturn;
planets['saturn']['tilt'] = 26.73;
planets['saturn']['mass'] = earthMass * 95.16;
planets['saturn']['gravity'] = '8.96 m/s<sup>2</sup> (0.916G) (at 1 Bar)';
planets['saturn']['temperature'] = '-189°C / -139°C';
planets['saturn']['type'] = 'Gas';
planets['saturn']['rotation'] = 0.0001558 * rotationAcceleration;
planets['saturn']['revolution'] = '30 years';
planets['saturn']['rings'] = [imgSaturnRings, 25, 33, 90, planets['saturn']['tilt'], 0];
planets['saturn']['rings_comp'] = 'Ice';

//Uranus
planets['uranus'] = [];
planets['uranus']['size'] = (sunRealSize / 29.65) / reduceFactor;
planets['uranus']['ua'] = 19.20;
planets['uranus']['distance'] = planets['uranus']['ua'] * _ua;
planets['uranus']['scroll_distance'] = convertKmToScroll(planets['uranus']['distance']);
planets['uranus']['texture'] = imgUranus;
planets['uranus']['tilt'] = 97.77;
planets['uranus']['mass'] = earthMass * 14.54;
planets['uranus']['gravity'] = '8.69 m/s<sup>2</sup> (0.889G) (at 1 Bar)';
planets['uranus']['temperature'] = '-226°C / -197°C';
planets['uranus']['type'] = 'Gas';
planets['uranus']['rotation'] = 0.0000969 * rotationAcceleration;
planets['uranus']['revolution'] = '84 years';
planets['uranus']['rings'] = [imgRocksRings, 10, 10.03, 90, planets['uranus']['tilt'], 0];
planets['uranus']['rings_comp'] = 'Rocks and Dust';

//Neptune
planets['neptune'] = [];
planets['neptune']['size'] = (sunRealSize / 30.63) / reduceFactor;
planets['neptune']['ua'] = 30.10;
planets['neptune']['distance'] = planets['neptune']['ua'] * _ua;
planets['neptune']['scroll_distance'] = convertKmToScroll(planets['neptune']['distance']);
planets['neptune']['texture'] = imgNeptune;
planets['neptune']['tilt'] = 28.32;
planets['neptune']['mass'] = earthMass * 17.15;
planets['neptune']['gravity'] = '11.00 m/s<sup>2</sup> (1.12G) (at 1 Bar)';
planets['neptune']['temperature'] = '-218°C / -200°C';
planets['neptune']['type'] = 'Gas';
planets['neptune']['rotation'] = 0.000104 * rotationAcceleration;
planets['neptune']['revolution'] = '165 years';
planets['neptune']['rings'] = null;
planets['neptune']['rings'] = [imgRocksRings, 10, 10.05, 90, planets['neptune']['tilt'], 0];
planets['neptune']['rings_comp'] = 'Rocks and Dust';



/*
* Okay, Jupiter, Uranus and Neptune got rings but they are too thin...
* */


const planetInstances = {};

Object.entries(planets).forEach(([name, data]) => {
    const size = data['size'];
    const distance = data['scroll_distance'];
    const texture = data['texture'];
    const tilt = data['tilt'];

    const sizes = [32, 512, 1024]

    const planetTexture = new THREE.TextureLoader().load(texture);
    const planet = new THREE.Mesh(
        new THREE.SphereGeometry(size, sizes[1], sizes[1]),
        new THREE.MeshStandardMaterial(
            {
                map: planetTexture,
            }
        )
    );
    planet.position.z = distance;
    planet.rotation.z = THREE.Math.degToRad(tilt);

    scene.add(planet);
    planetInstances[name] = planet;


    //Add rings
    if(data['rings']){
        const rings_texture = data['rings'][0];
        const rings_size_min = data['rings'][1];
        const rings_size_max = data['rings'][2];
        const rings_rotation_x = data['rings'][3];
        const rings_rotation_y = data['rings'][4];
        const rings_rotation_z = data['rings'][5];

        const ringsTexture = new THREE.TextureLoader().load(rings_texture);
        const rings = new THREE.Mesh(
            new THREE.RingGeometry(rings_size_min, rings_size_max, 1024),
            new THREE.MeshStandardMaterial(
                {
                    map: ringsTexture,
                    side: THREE.DoubleSide
                }
            )
        );
        rings.position.z = distance;
        rings.rotation.x = THREE.Math.degToRad(rings_rotation_x);
        rings.rotation.y = THREE.Math.degToRad(rings_rotation_y);
        rings.rotation.z = THREE.Math.degToRad(rings_rotation_z);
        scene.add(rings);
    }
});


//Add ambient light
const pointLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(pointLight);

//Add Sun light
const sunLight = new THREE.PointLight(0xffffff, 1000, 0, 2);
sunLight.position.x = 0;
sunLight.position.y = 0;
sunLight.position.z = 0;
scene.add(sunLight);

//Add Sun Front light
const sunFrontLight = new THREE.SpotLight(0xffffff, 3, 0, THREE.Math.degToRad(180));
sunFrontLight.position.x = 0;
sunFrontLight.position.y = 0;
sunFrontLight.position.z = 1000;
scene.add(sunFrontLight);


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
const spaceTexture = new THREE.TextureLoader().load(imgUniverse);
scene.background = spaceTexture;



//Define default camera
camera.position.setX(cameraShiftX);
camera.position.setZ(cameraShift);


//Place all text descriptions
const descriptionIDs = [
    'sun',
    'mercury',
    'venus',
    'earth',
    'mars',
    'jupiter',
    'saturn',
    'uranus',
    'neptune',
];
descriptionIDs.forEach((name) => {
    const distanceScroll = planets[name]['scroll_distance'] - (cameraShift / 2);
    const el = document.querySelector('#' + name + "_description");

    if(name === 'sun'){
        el.style.top = distanceScroll + (sunSize * 2.5) + 'px';
    }
    else{
        el.style.top = (distanceScroll - 100) + 'px';
    }

    //Calculate rotation and convert to date
    //10 hours 33 minutes => 36000s + 2520s => 38520s * 60 => 2311200 /60s => 360 / 2311200 => 0.0001558° /60s
    const rotation = secondsToDhms((360 / (planets[name]['rotation'] / rotationAcceleration)) / 60);

    //Set Text
    document.querySelector('#' + name + '_description .type').textContent = '' + planets[name]['type'];

    document.querySelector('#' + name + '_description .distance').textContent = '' + split(Math.round(planets[name]['distance'])) + ' km (' + planets[name]['ua'] + ' ua)';
    document.querySelector('#' + name + '_description .size').textContent = '' + split(Math.round((planets[name]['size'] * reduceFactor))) + ' km';

    document.querySelector('#' + name + '_description .rotation').textContent = '' + rotation;
    document.querySelector('#' + name + '_description .revolution').textContent = planets[name]['revolution'];

    document.querySelector('#' + name + '_description .mass').textContent = '' + planets[name]['mass'].toPrecision(4) + ' kg';
    document.querySelector('#' + name + '_description .tilt').textContent = '' + (Math.round(planets[name]['tilt'] * 100) / 100) + '°';
    document.querySelector('#' + name + '_description .gravity').innerHTML = '' + planets[name]['gravity'];
    document.querySelector('#' + name + '_description .temperature').textContent = '' + planets[name]['temperature'];

    if(planets[name]['rings']){
        document.querySelector('#' + name + '_description .rings').textContent = planets[name]['rings_comp'];
    }
    else{
        document.querySelector('#' + name + '_description .rings').textContent = 'N/A';
    }
});


//Move camera on scroll
const kmScrolled = convertKmToScroll(((document.body.getBoundingClientRect().top + (cameraShift * -1)) * reduceFactor) * -1);
adjustCameraShiftX(kmScrolled);

function moveCamera(){
    const t = document.body.getBoundingClientRect().top;
    camera.position.z = cameraShift + (t * -defaultScrollSpeed);

    const kmScrolled = convertKmToScroll(((document.body.getBoundingClientRect().top + (cameraShift * -1)) * reduceFactor) * -1);
    adjustCameraShiftX(kmScrolled);
}
document.body.onscroll = moveCamera;

//const controls = new OrbitControls(camera, renderer.domElement);

function animate(){
    requestAnimationFrame(animate);

    const kmScrolled = ((document.body.getBoundingClientRect().top + (cameraShift * -1)) * reduceFactor) * -1;

    //Set bottom text
    textDistanceFromTheSun.textContent = split(kmScrolled) + ' km (' + split(convertKmToUa(kmScrolled)) + ' ua)';

    Object.entries(planetInstances).forEach(([name, data]) => {
        data.rotateOnAxis(new THREE.Vector3(0,1,0), THREE.Math.degToRad(planets[name]['rotation']));
    });

    //controls.update();

    renderer.render(scene, camera);
}
animate();


function adjustCameraShiftX(kmScrolled){
    const planetsArray = [
        'sun',
        'mercury',
        'venus',
        'earth',
        'mars',
        'jupiter',
        'saturn',
        'uranus',
        'neptune',
    ];
    camera.position.setX(0);
    planetsArray.forEach(name => {
        const size = planets[name]['size'];
        const distanceScroll = planets[name]['scroll_distance'];
        const distanceShift = size * 10;


        if(isBetween(kmScrolled, distanceScroll - distanceShift, distanceScroll + distanceShift)){
            //Ref: https://i.imgur.com/j861zSX.png

            //Calculate AD/AB ratio
            const AB = distanceScroll - (distanceScroll - distanceShift);
            const AD = AB - (distanceScroll - kmScrolled);
            const ratio = AB / AD;

            //Calculate DE
            const BC = size * 2;
            const result = ratio * BC; //DE

            camera.position.setX(result);
        }
    });
}



/*===========================================

    Navigation Listeners

===========================================*/
const navElements = document.querySelectorAll('.navTo');
navElements.forEach((item) => {
    item.addEventListener('click', () => {
        const target = item.getAttribute('data-nav');
        const distance = planets[target]['scroll_distance'] + (planets[target]['size'] * 3) - cameraShift;

        goTo(distance);
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
function convertKmToScroll(km){
    return km / reduceFactor;
}
function convertScrollToKm(scroll){
    return scroll * reduceFactor;
}
function convertKmToUa(km){
    return km / _ua;
}
function convertUaToKm(ua){
    return ua * _ua;
}
function isBetween(num, min, max, exclusive = true){
    if(exclusive){
        return num >= min && num <= max;
    }
    else{
        return num > min && num < max;
    }
}
function secondsToDhms(seconds) {
    seconds = Number(seconds);
    const d = Math.floor(seconds / (3600*24));
    const h = Math.floor(seconds % (3600*24) / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 60);

    const dDisplay = d > 0 ? d + (d === 1 ? " day, " : " days, ") : "";
    const hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
    const mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
    const sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";

    return dDisplay + hDisplay + mDisplay + sDisplay;
}

document.querySelector('#openInfoModal').addEventListener('click', () => {
    MicroModal.show('modal-1', {});
});