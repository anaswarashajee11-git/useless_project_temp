/* =========================================================
   CTRL + Z DIGITAL CEMETERY
   Three.js Scene
========================================================= */


/* =========================================================
   BASIC CHECK
========================================================= */

if (typeof THREE === "undefined") {

    document.body.innerHTML = `
        <div style="
            color:white;
            background:#050505;
            height:100vh;
            display:flex;
            align-items:center;
            justify-content:center;
            font-family:Arial;
        ">
            Three.js could not load.
        </div>
    `;

    throw new Error("Three.js failed to load");
}


/* =========================================================
   DOM
========================================================= */

const sceneContainer =
    document.getElementById("scene");

const fileInput =
    document.getElementById("fileInput");

const buriedCountElement =
    document.getElementById("buriedCount");

const welcome =
    document.getElementById("welcome");

const lightningFlash =
    document.getElementById("lightningFlash");

const burialPopup =
    document.getElementById("burialPopup");

const popupFileName =
    document.getElementById("popupFileName");

const memorialPanel =
    document.getElementById("memorialPanel");

const memorialTitle =
    document.getElementById("memorialTitle");

const roseButton =
    document.getElementById("roseButton");

const roseCount =
    document.getElementById("roseCount");

const commentInput =
    document.getElementById("commentInput");

const commentButton =
    document.getElementById("commentButton");

const commentsList =
    document.getElementById("commentsList");

const closeMemorial =
    document.getElementById("closeMemorial");

const visitorButton =
    document.getElementById("visitorButton");

const visitorPanel =
    document.getElementById("visitorPanel");

const closeVisitors =
    document.getElementById("closeVisitors");

const visitorCount =
    document.getElementById("visitorCount");


/* =========================================================
   GLOBAL DATA
========================================================= */

let buriedFiles = 28;

const tombs = [];

let selectedTomb = null;

let visitors = 1;


/* =========================================================
   THREE.JS SCENE
========================================================= */

const scene =
    new THREE.Scene();

scene.background =
    new THREE.Color(0x020506);


/* =========================================================
   FOG
========================================================= */

scene.fog =
    new THREE.FogExp2(
        0x07100f,
        0.018
    );


/* =========================================================
   CAMERA
========================================================= */

const camera =
    new THREE.PerspectiveCamera(
        58,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );


/*
    IMPORTANT:

    Starting camera is far enough away.

    The camera can move between
    Z = 92 and Z = 43.

    This prevents the extreme
    zoom-in problem from before.
*/

camera.position.set(
    0,
    7.5,
    78
);


/* =========================================================
   RENDERER
========================================================= */

const renderer =
    new THREE.WebGLRenderer({
        antialias: true,
        alpha: false
    });

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.setPixelRatio(
    Math.min(
        window.devicePixelRatio,
        2
    )
);

renderer.shadowMap.enabled = true;

renderer.shadowMap.type =
    THREE.PCFSoftShadowMap;

sceneContainer.appendChild(
    renderer.domElement
);


/* =========================================================
   LIGHTS
========================================================= */

const ambientLight =
    new THREE.AmbientLight(
        0x9aa99b,
        1.35
    );

scene.add(
    ambientLight
);


const moonLight =
    new THREE.DirectionalLight(
        0xaab8cc,
        1.15
    );

moonLight.position.set(
    -25,
    35,
    25
);

moonLight.castShadow = true;

scene.add(
    moonLight
);


const greenLight =
    new THREE.PointLight(
        0x587c68,
        1.4,
        90
    );

greenLight.position.set(
    0,
    10,
    5
);

scene.add(
    greenLight
);


const purpleLight =
    new THREE.PointLight(
        0x563d69,
        0.8,
        80
    );

purpleLight.position.set(
    0,
    5,
    -25
);

scene.add(
    purpleLight
);


/* =========================================================
   MATERIALS
========================================================= */

const groundMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x10191b,
        roughness: 1
    });


const stoneMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x37383a,
        roughness: 0.95
    });


const darkStoneMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x1b2021,
        roughness: 0.95
    });


const towerMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x171d22,
        roughness: 0.82,
        metalness: 0.1
    });


const roofMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x080b11,
        roughness: 0.8
    });


const goldMaterial =
    new THREE.MeshStandardMaterial({
        color: 0xb38a3d,
        roughness: 0.35,
        metalness: 0.65,
        emissive: 0x241b0a,
        emissiveIntensity: 0.25
    });


const gateMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x111416,
        roughness: 0.45,
        metalness: 0.75
    });


const tombMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x34383a,
        roughness: 0.8,
        metalness: 0.05
    });


const tombEdgeMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x63615b,
        roughness: 0.7,
        emissive: 0x161410,
        emissiveIntensity: 0.2
    });


/* =========================================================
   GROUND
========================================================= */

const ground =
    new THREE.Mesh(
        new THREE.PlaneGeometry(
            180,
            180
        ),
        groundMaterial
    );

ground.rotation.x =
    -Math.PI / 2;

ground.position.y =
    -0.15;

ground.receiveShadow = true;

scene.add(
    ground
);


/* =========================================================
   STONE PATH
========================================================= */

const path =
    new THREE.Mesh(
        new THREE.PlaneGeometry(
            8,
            120
        ),
        stoneMaterial
    );

path.rotation.x =
    -Math.PI / 2;

path.position.set(
    0,
    -0.02,
    -20
);

path.receiveShadow = true;

scene.add(
    path
);


/* =========================================================
   PATH STONES
========================================================= */

for (
    let i = 0;
    i < 55;
    i++
) {

    const width =
        7.2 +
        Math.random() * 0.5;

    const stone =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                width,
                0.08,
                1.55
            ),
            darkStoneMaterial
        );

    stone.position.set(
        (Math.random() - 0.5) * 0.35,
        0.03,
        36 - i * 2.15
    );

    stone.rotation.y =
        (Math.random() - 0.5) * 0.04;

    scene.add(
        stone
    );
}


/* =========================================================
   MOON
========================================================= */

const moon =
    new THREE.Mesh(
        new THREE.SphereGeometry(
            4.2,
            32,
            32
        ),
        new THREE.MeshBasicMaterial({
            color: 0xd7d8c5
        })
    );

moon.position.set(
    22,
    30,
    -15
);

scene.add(
    moon
);


/* =========================================================
   MOON GLOW
========================================================= */

const moonGlow =
    new THREE.PointLight(
        0xc9cbb9,
        0.7,
        35
    );

moonGlow.position.copy(
    moon.position
);

scene.add(
    moonGlow
);


/* =========================================================
   STARS
========================================================= */

const starGeometry =
    new THREE.BufferGeometry();

const starPositions = [];

for (
    let i = 0;
    i < 1000;
    i++
) {

    starPositions.push(
        (Math.random() - 0.5) * 180,
        12 + Math.random() * 70,
        -70 + Math.random() * 130
    );
}

starGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(
        starPositions,
        3
    )
);

const starMaterial =
    new THREE.PointsMaterial({
        color: 0xd8d2a2,
        size: 0.12,
        transparent: true,
        opacity: 0.75
    });

const stars =
    new THREE.Points(
        starGeometry,
        starMaterial
    );

scene.add(
    stars
);


/* =========================================================
   FIREFLIES
========================================================= */

const fireflyGeometry =
    new THREE.BufferGeometry();

const fireflyPositions = [];

for (
    let i = 0;
    i < 90;
    i++
) {

    fireflyPositions.push(
        (Math.random() - 0.5) * 70,
        1 + Math.random() * 9,
        -45 + Math.random() * 65
    );
}

fireflyGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(
        fireflyPositions,
        3
    )
);

const fireflyMaterial =
    new THREE.PointsMaterial({
        color: 0xd8cf72,
        size: 0.18,
        transparent: true,
        opacity: 0.65
    });

const fireflies =
    new THREE.Points(
        fireflyGeometry,
        fireflyMaterial
    );

scene.add(
    fireflies
);


/* =========================================================
   GATE GROUP
========================================================= */

const gateGroup =
    new THREE.Group();

gateGroup.position.set(
    0,
    4.1,
    28
);

scene.add(
    gateGroup
);


/* =========================================================
   TOWERS
========================================================= */

function createTower(x) {

    const tower =
        new THREE.Group();

    tower.position.x =
        x;

    const base =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                8,
                1.6,
                6
            ),
            darkStoneMaterial
        );

    base.position.y =
        -3.2;

    tower.add(
        base
    );


    const body =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                6.5,
                10,
                5
            ),
            towerMaterial
        );

    body.position.y =
        1.5;

    body.castShadow = true;

    tower.add(
        body
    );


    /* Decorative vertical columns */

    for (
        let i = -1;
        i <= 1;
        i++
    ) {

        const column =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    0.42,
                    8.4,
                    0.48
                ),
                darkStoneMaterial
            );

        column.position.set(
            i * 1.65,
            1.4,
            -2.55
        );

        tower.add(
            column
        );
    }


    /* Roof */

    const roof =
        new THREE.Mesh(
            new THREE.ConeGeometry(
                4.8,
                5.4,
                4
            ),
            roofMaterial
        );

    roof.position.y =
        9.2;

    roof.rotation.y =
        Math.PI / 4;

    roof.castShadow = true;

    tower.add(
        roof
    );


    /* Roof gold tip */

    const tip =
        new THREE.Mesh(
            new THREE.ConeGeometry(
                0.25,
                1.1,
                6
            ),
            goldMaterial
        );

    tip.position.y =
        12.3;

    tower.add(
        tip
    );


    /* Gold roof trim */

    const trim =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                7,
                0.12,
                5.5
            ),
            goldMaterial
        );

    trim.position.y =
        6.2;

    tower.add(
        trim
    );


    gateGroup.add(
        tower
    );
}

createTower(-9);
createTower(9);


/* =========================================================
   TOP ARCH
========================================================= */

const topBeam =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            18,
            3.5,
            2
        ),
        darkStoneMaterial
    );

topBeam.position.set(
    0,
    7.5,
    0
);

gateGroup.add(
    topBeam
);


/* Gold border on beam */

const goldBeam =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            15.5,
            0.16,
            2.1
        ),
        goldMaterial
    );

goldBeam.position.set(
    0,
    6.35,
    -0.05
);

gateGroup.add(
    goldBeam
);


/* =========================================================
   GATE SIGN
========================================================= */

const signCanvas =
    document.createElement("canvas");

signCanvas.width = 1024;
signCanvas.height = 260;

const signContext =
    signCanvas.getContext("2d");

signContext.fillStyle =
    "#11110e";

signContext.fillRect(
    0,
    0,
    1024,
    260
);

signContext.strokeStyle =
    "#b8954b";

signContext.lineWidth =
    8;

signContext.strokeRect(
    12,
    12,
    1000,
    236
);

signContext.strokeStyle =
    "#5d4a28";

signContext.lineWidth =
    2;

signContext.strokeRect(
    28,
    28,
    968,
    204
);

signContext.textAlign =
    "center";

signContext.fillStyle =
    "#d8bb70";

signContext.font =
    "bold 54px Georgia";

signContext.fillText(
    "CTRL + Z",
    512,
    105
);

signContext.fillStyle =
    "#95865f";

signContext.font =
    "30px Georgia";

signContext.fillText(
    "CEMETERY",
    512,
    160
);

signContext.fillStyle =
    "#6e654e";

signContext.font =
    "italic 20px Georgia";

signContext.fillText(
    "Where forgotten files come to rest.",
    512,
    205
);

const signTexture =
    new THREE.CanvasTexture(
        signCanvas
    );

const sign =
    new THREE.Mesh(
        new THREE.PlaneGeometry(
            10,
            2.55
        ),
        new THREE.MeshBasicMaterial({
            map: signTexture,
            transparent: true
        })
    );

sign.position.set(
    0,
    8.2,
    -1.1
);

gateGroup.add(
    sign
);


/* =========================================================
   GATE
========================================================= */

const leftGate =
    new THREE.Group();

const rightGate =
    new THREE.Group();


leftGate.position.set(
    -5.4,
    0,
    -1
);

rightGate.position.set(
    5.4,
    0,
    -1
);

gateGroup.add(
    leftGate
);

gateGroup.add(
    rightGate
);


/* =========================================================
   CREATE GATE PANEL
========================================================= */

function createGatePanel(
    parent,
    side
) {

    const panel =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                5.4,
                7.2,
                0.35
            ),
            gateMaterial
        );

    panel.position.x =
        side * 2.7;

    panel.castShadow = true;

    parent.add(
        panel
    );


    /* Vertical bars */

    for (
        let i = 0;
        i < 6;
        i++
    ) {

        const bar =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    0.14,
                    7.7,
                    0.5
                ),
                goldMaterial
            );

        bar.position.set(
            side * 2.7 +
            (-2.2 + i * 0.88),
            0,
            -0.3
        );

        parent.add(
            bar
        );
    }


    /* Horizontal bars */

    for (
        let y = -2.5;
        y <= 2.5;
        y += 1.25
    ) {

        const horizontal =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    5.8,
                    0.13,
                    0.5
                ),
                goldMaterial
            );

        horizontal.position.set(
            side * 2.7,
            y,
            -0.35
        );

        parent.add(
            horizontal
        );
    }


    /* Decorative circle */

    const ring =
        new THREE.Mesh(
            new THREE.TorusGeometry(
                0.48,
                0.09,
                12,
                32
            ),
            goldMaterial
        );

    ring.position.set(
        side * 2.7,
        0.2,
        -0.7
    );

    parent.add(
        ring
    );


    /* Center ornament */

    const smallRing =
        new THREE.Mesh(
            new THREE.TorusGeometry(
                0.2,
                0.045,
                10,
                24
            ),
            goldMaterial
        );

    smallRing.position.set(
        side * 2.7,
        0.2,
        -0.85
    );

    parent.add(
        smallRing
    );
}


createGatePanel(
    leftGate,
    1
);

createGatePanel(
    rightGate,
    -1
);


/* =========================================================
   GATE DECORATIONS
========================================================= */

/* Center pillar */

const centerPillar =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            0.5,
            7.5,
            0.65
        ),
        goldMaterial
    );

centerPillar.position.set(
    0,
    0,
    -2
);

gateGroup.add(
    centerPillar
);


/* Spikes */

for (
    let x = -7;
    x <= 7;
    x += 1.1
) {

    const spike =
        new THREE.Mesh(
            new THREE.ConeGeometry(
                0.16,
                0.9,
                6
            ),
            goldMaterial
        );

    spike.position.set(
        x,
        3.8,
        -1
    );

    gateGroup.add(
        spike
    );
}


/* =========================================================
   GATE TORCHES
========================================================= */

function createTorch(x) {

    const holder =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.12,
                0.15,
                1.7,
                8
            ),
            goldMaterial
        );

    holder.position.set(
        x,
        0.3,
        -2.5
    );

    gateGroup.add(
        holder
    );


    const flame =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.25,
                12,
                12
            ),
            new THREE.MeshBasicMaterial({
                color: 0xffa33a
            })
        );

    flame.scale.y =
        1.4;

    flame.position.set(
        x,
        1.25,
        -2.5
    );

    gateGroup.add(
        flame
    );


    const light =
        new THREE.PointLight(
            0xff9e35,
            2,
            8
        );

    light.position.set(
        x,
        1.2,
        -2.4
    );

    gateGroup.add(
        light
    );

    return {
        flame,
        light
    };
}

const torchLeft =
    createTorch(-6.8);

const torchRight =
    createTorch(6.8);


/* =========================================================
   TOMBS
========================================================= */

function createTomb(
    fileName,
    isNew = false
) {

    const tomb =
        new THREE.Group();


    /*
       IMPORTANT:

       Tombs are created behind
       the entrance.

       Positive Z = near gate
       Negative Z = deeper cemetery
    */

    const x =
        (Math.random() - 0.5) * 30;

    const z =
        -5 -
        Math.random() * 48;

    const height =
        2.8 +
        Math.random() * 1.4;


    tomb.position.set(
        x,
        0,
        z
    );


    /* Main gravestone */

    const body =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                2.1,
                height,
                0.65
            ),
            tombMaterial
        );

    body.position.y =
        height / 2;

    body.castShadow = true;

    tomb.add(
        body
    );


    /* Rounded top */

    const top =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                1.05,
                1.05,
                0.65,
                24,
                1,
                false,
                0,
                Math.PI
            ),
            tombMaterial
        );

    top.rotation.z =
        Math.PI / 2;

    top.position.set(
        0,
        height,
        0
    );

    tomb.add(
        top
    );


    /* Tomb frame */

    const frame =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                2.25,
                0.12,
                0.12
            ),
            tombEdgeMaterial
        );

    frame.position.set(
        0,
        height * 0.7,
        -0.36
    );

    tomb.add(
        frame
    );


    /* Cross */

    const crossMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x6c685e,
            roughness: 0.75
        });


    const vertical =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.22,
                1.7,
                0.18
            ),
            crossMaterial
        );

    vertical.position.set(
        0,
        height + 0.65,
        -0.4
    );

    tomb.add(
        vertical
    );


    const horizontal =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.85,
                0.22,
                0.18
            ),
            crossMaterial
        );

    horizontal.position.set(
        0,
        height + 0.95,
        -0.4
    );

    tomb.add(
        horizontal
    );


    /* Tomb glow */

    const glow =
        new THREE.PointLight(
            0x9270a0,
            isNew ? 2.8 : 0.25,
            6
        );

    glow.position.y =
        height * 0.7;

    tomb.add(
        glow
    );


    /* Data */

    tomb.userData.isTomb =
        true;

    tomb.userData.fileName =
        fileName;

    tomb.userData.roses =
        0;

    tomb.userData.comments =
        [];

    tomb.userData.emerging =
        isNew;

    tomb.userData.startTime =
        performance.now();

    tomb.userData.glow =
        glow;


    tombs.push(
        tomb
    );

    scene.add(
        tomb
    );


    /* Start underground */

    if (isNew) {

        tomb.position.y =
            -3.5;

        tomb.scale.set(
            0.15,
            0.15,
            0.15
        );
    }


    return tomb;
}


/* =========================================================
   INITIAL TOMBS
========================================================= */

for (
    let i = 0;
    i < 28;
    i++
) {

    createTomb(
        "forgotten_file_" +
        (i + 1) +
        ".dat",
        false
    );
}


/* =========================================================
   TREES
========================================================= */

function createTree(
    x,
    z,
    scale = 1
) {

    const tree =
        new THREE.Group();


    const trunk =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.25,
                0.5,
                5,
                7
            ),
            darkStoneMaterial
        );

    trunk.position.y =
        2.5;

    tree.add(
        trunk
    );


    for (
        let i = 0;
        i < 5;
        i++
    ) {

        const branch =
            new THREE.Mesh(
                new THREE.CylinderGeometry(
                    0.08,
                    0.18,
                    3,
                    6
                ),
                darkStoneMaterial
            );

        branch.position.set(
            (Math.random() - 0.5) * 2,
            4 + i * 0.5,
            (Math.random() - 0.5) * 2
        );

        branch.rotation.z =
            (Math.random() - 0.5) * 1.2;

        branch.rotation.x =
            (Math.random() - 0.5) * 0.5;

        tree.add(
            branch
        );
    }


    tree.position.set(
        x,
        0,
        z
    );

    tree.scale.setScalar(
        scale
    );

    scene.add(
        tree
    );
}


createTree(-23, 10, 1.2);
createTree(24, 2, 1.25);
createTree(-25, -18, 1.1);
createTree(26, -30, 1.3);
createTree(-23, -42, 1.2);
createTree(24, -48, 1.15);


/* =========================================================
   CAMERA CONTROLS
========================================================= */

let yaw = 0;

let pitch = -0.04;

let dragging = false;

let lastX = 0;

let lastY = 0;


/* =========================================================
   POINTER DOWN
========================================================= */

renderer.domElement.addEventListener(
    "pointerdown",
    function (event) {

        dragging = true;

        lastX =
            event.clientX;

        lastY =
            event.clientY;

        renderer.domElement.style.cursor =
            "grabbing";
    }
);


/* =========================================================
   POINTER UP
========================================================= */

window.addEventListener(
    "pointerup",
    function () {

        dragging = false;

        renderer.domElement.style.cursor =
            "default";
    }
);


/* =========================================================
   DRAG LOOK
========================================================= */

renderer.domElement.addEventListener(
    "pointermove",
    function (event) {

        if (!dragging) {
            return;
        }


        const dx =
            event.clientX -
            lastX;

        const dy =
            event.clientY -
            lastY;


        lastX =
            event.clientX;

        lastY =
            event.clientY;


        yaw -=
            dx * 0.002;


        pitch -=
            dy * 0.0015;


        pitch =
            Math.max(
                -0.35,
                Math.min(
                    0.25,
                    pitch
                )
            );
    }
);


/* =========================================================
   SCROLL MOVEMENT
========================================================= */

window.addEventListener(
    "wheel",
    function (event) {

        event.preventDefault();


        /*
            Small movement.

            The old version allowed
            the camera to move too close.

            Now we clamp it between
            43 and 90.
        */

        camera.position.z -=
            event.deltaY * 0.018;


        camera.position.z =
            Math.max(
                43,
                Math.min(
                    90,
                    camera.position.z
                )
            );


        /*
            Hide welcome message
            when approaching gate.
        */

        if (
            camera.position.z < 67
        ) {

            welcome.classList.add(
                "hidden"
            );

        } else {

            welcome.classList.remove(
                "hidden"
            );
        }

    },
    {
        passive: false
    }
);


/* =========================================================
   GATE ANIMATION
========================================================= */

let gateOpenAmount = 0;


function updateGate() {

    /*
       Open gate when camera approaches.

       At Z 70 = closed
       At Z 43 = fully open
    */

    const target =
        camera.position.z < 63
            ? 1
            : 0;


    gateOpenAmount +=
        (
            target -
            gateOpenAmount
        ) * 0.045;


    /*
       Normal bungalow-style
       double gate:

       left opens outward
       right opens outward.
    */

    leftGate.rotation.y =
        gateOpenAmount *
        Math.PI *
        0.52;


    rightGate.rotation.y =
        -gateOpenAmount *
        Math.PI *
        0.52;
}


/* =========================================================
   NEW TOMBS RISING
========================================================= */

function updateNewTombs() {

    const now =
        performance.now();


    tombs.forEach(
        function (tomb) {

            if (
                !tomb.userData.emerging
            ) {
                return;
            }


            const progress =
                Math.min(
                    (
                        now -
                        tomb.userData.startTime
                    ) / 1800,
                    1
                );


            /*
               Smooth easing
            */

            const smooth =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );


            tomb.position.y =
                -3.5 +
                3.5 * smooth;


            const scale =
                0.15 +
                0.85 * smooth;


            tomb.scale.set(
                scale,
                scale,
                scale
            );


            /* Glow decreases */

            tomb.userData.glow.intensity =
                2.8 *
                (1 - smooth) +
                0.25;


            if (
                progress >= 1
            ) {

                tomb.userData.emerging =
                    false;

                tomb.position.y =
                    0;

                tomb.scale.set(
                    1,
                    1,
                    1
                );

                tomb.userData.glow.intensity =
                    0.25;
            }
        }
    );
}


/* =========================================================
   TORCH ANIMATION
========================================================= */

function updateTorches(time) {

    const flicker =
        Math.sin(time * 0.01) *
        0.25 +
        Math.sin(time * 0.023) *
        0.15;


    torchLeft.light.intensity =
        2 +
        flicker;


    torchRight.light.intensity =
        2 -
        flicker;


    torchLeft.flame.scale.y =
        1.4 +
        flicker * 0.4;


    torchRight.flame.scale.y =
        1.4 -
        flicker * 0.4;
}


/* =========================================================
   FIRELY ANIMATION
========================================================= */

function updateFireflies(time) {

    fireflyMaterial.opacity =
        0.45 +
        (
            Math.sin(
                time * 0.002
            ) + 1
        ) * 0.18;
}


/* =========================================================
   CAMERA LOOK
========================================================= */

function updateCameraLook() {

    const lookDistance =
        30;


    const direction =
        new THREE.Vector3(
            Math.sin(yaw) *
                Math.cos(pitch),
            Math.sin(pitch),
            -Math.cos(yaw) *
                Math.cos(pitch)
        );


    const target =
        camera.position.clone()
            .add(
                direction.multiplyScalar(
                    lookDistance
                )
            );


    camera.lookAt(
        target
    );
}


/* =========================================================
   TOMBS CLICK
========================================================= */

const raycaster =
    new THREE.Raycaster();

const mouse =
    new THREE.Vector2();


renderer.domElement.addEventListener(
    "click",
    function (event) {

        /*
           Ignore click if user
           was dragging.
        */

        if (
            Math.abs(
                event.clientX -
                lastX
            ) > 5
        ) {
            return;
        }


        mouse.x =
            (
                event.clientX /
                window.innerWidth
            ) * 2 - 1;


        mouse.y =
            -(
                event.clientY /
                window.innerHeight
            ) * 2 + 1;


        raycaster.setFromCamera(
            mouse,
            camera
        );


        const intersections =
            raycaster.intersectObjects(
                tombs,
                true
            );


        if (
            intersections.length === 0
        ) {
            return;
        }


        let tomb =
            intersections[0].object;


        while (
            tomb &&
            !tomb.userData.isTomb
        ) {

            tomb =
                tomb.parent;
        }


        if (
            !tomb
        ) {
            return;
        }


        openMemorial(
            tomb
        );
    }
);


/* =========================================================
   MEMORIAL PANEL
========================================================= */

function openMemorial(
    tomb
) {

    selectedTomb =
        tomb;


    memorialTitle.textContent =
        tomb.userData.fileName;


    roseCount.textContent =
        tomb.userData.roses +
        (
            tomb.userData.roses === 1
                ? " rose"
                : " roses"
        );


    renderComments();


    memorialPanel.classList.add(
        "open"
    );
}


/* =========================================================
   CLOSE MEMORIAL
========================================================= */

closeMemorial.addEventListener(
    "click",
    function () {

        memorialPanel.classList.remove(
            "open"
        );

        selectedTomb =
            null;
    }
);


/* =========================================================
   LEAVE ROSE
========================================================= */

roseButton.addEventListener(
    "click",
    function () {

        if (
            !selectedTomb
        ) {
            return;
        }


        selectedTomb.userData.roses++;


        roseCount.textContent =
            selectedTomb.userData.roses +
            (
                selectedTomb.userData.roses === 1
                    ? " rose"
                    : " roses"
            );


        /*
           Small visual glow
        */

        selectedTomb.userData.glow.intensity =
            1.5;


        setTimeout(
            function () {

                if (
                    selectedTomb
                ) {

                    selectedTomb.userData.glow.intensity =
                        0.25;
                }

            },
            700
        );
    }
);


/* =========================================================
   COMMENTS
========================================================= */

commentButton.addEventListener(
    "click",
    function () {

        if (
            !selectedTomb
        ) {
            return;
        }


        const text =
            commentInput.value.trim();


        if (
            !text
        ) {
            return;
        }


        selectedTomb.userData.comments.push(
            text
        );


        commentInput.value =
            "";


        renderComments();
    }
);


/* =========================================================
   RENDER COMMENTS
========================================================= */

function renderComments() {

    commentsList.innerHTML =
        "";


    if (
        !selectedTomb
    ) {
        return;
    }


    selectedTomb.userData.comments.forEach(
        function (comment) {

            const div =
                document.createElement(
                    "div"
                );

            div.className =
                "comment";

            div.textContent =
                "“" +
                comment +
                "”";


            commentsList.appendChild(
                div
            );
        }
    );
}


/* =========================================================
   BURY FILE
========================================================= */

fileInput.addEventListener(
    "change",
    function () {

        const file =
            fileInput.files[0];


        if (
            !file
        ) {
            return;
        }


        /*
           Update count
        */

        buriedFiles++;


        buriedCountElement.textContent =
            buriedFiles;


        /*
           Create tomb
        */

        const newTomb =
            createTomb(
                file.name,
                true
            );


        /*
           Move new tomb to
           a visible location
           deeper inside cemetery.
        */

        newTomb.position.x =
            (Math.random() - 0.5) * 20;

        newTomb.position.z =
            -14 -
            Math.random() * 28;


        /*
           Lightning
        */

        triggerLightning();


        /*
           Popup
        */

        popupFileName.textContent =
            file.name;

        burialPopup.classList.add(
            "show"
        );


        setTimeout(
            function () {

                burialPopup.classList.remove(
                    "show"
                );

            },
            2800
        );


        /*
           Reset input so selecting
           the same file again works.
        */

        fileInput.value =
            "";
    }
);


/* =========================================================
   LIGHTNING EFFECT
========================================================= */

function triggerLightning() {

    lightningFlash.classList.remove(
        "active"
    );


    /*
       Force animation restart
    */

    void lightningFlash.offsetWidth;


    lightningFlash.classList.add(
        "active"
    );


    /*
       Briefly brighten cemetery
    */

    greenLight.intensity =
        4;

    moonLight.intensity =
        2;


    setTimeout(
        function () {

            greenLight.intensity =
                1.4;

            moonLight.intensity =
                1.15;

        },
        450
    );
}


/* =========================================================
   VISITOR PANEL
========================================================= */

visitorButton.addEventListener(
    "click",
    function () {

        visitorPanel.classList.add(
            "open"
        );


        visitors++;


        visitorCount.textContent =
            visitors;
    }
);


closeVisitors.addEventListener(
    "click",
    function () {

        visitorPanel.classList.remove(
            "open"
        );
    }
);


/* =========================================================
   RESIZE
========================================================= */

window.addEventListener(
    "resize",
    function () {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;


        camera.updateProjectionMatrix();


        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );
    }
);


/* =========================================================
   ANIMATION
========================================================= */

function animate(time) {

    requestAnimationFrame(
        animate
    );


    updateCameraLook();

    updateGate();

    updateNewTombs();

    updateTorches(time);

    updateFireflies(time);


    /*
       Slow environmental movement
    */

    stars.rotation.y =
        time * 0.000003;


    fireflies.rotation.y =
        time * 0.00005;


    renderer.render(
        scene,
        camera
    );
}


/* =========================================================
   START
========================================================= */

animate(0);
