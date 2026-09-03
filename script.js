/* =========================================================
   CTRL + Z — DIGITAL CEMETERY
   COMPLETE script.js
========================================================= */

if (typeof THREE === "undefined") {
    throw new Error("Three.js failed to load.");
}


/* =========================================================
   BASIC SETUP
========================================================= */

const container = document.getElementById("scene");

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x07100d);

scene.fog = new THREE.Fog(
    0x07100d,
    65,
    155
);


/* =========================================================
   CAMERA
========================================================= */

const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    400
);

camera.position.set(
    0,
    6,
    70
);


/* =========================================================
   RENDERER
========================================================= */

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

renderer.setClearColor(
    0x07100d,
    1
);

container.appendChild(
    renderer.domElement
);


/* =========================================================
   LIGHTING
========================================================= */

const ambient = new THREE.AmbientLight(
    0x809078,
    1.5
);

scene.add(ambient);


const moonLight = new THREE.DirectionalLight(
    0xaaaadd,
    1.0
);

moonLight.position.set(
    20,
    50,
    10
);

scene.add(moonLight);


/* =========================================================
   GREEN ATMOSPHERIC LIGHT
========================================================= */

const greenLight = new THREE.PointLight(
    0x526b3f,
    3,
    130
);

greenLight.position.set(
    30,
    15,
    0
);

scene.add(greenLight);


/* =========================================================
   PURPLE ATMOSPHERIC LIGHT
========================================================= */

const purpleLight = new THREE.PointLight(
    0x665080,
    2.5,
    130
);

purpleLight.position.set(
    -30,
    15,
    -20
);

scene.add(purpleLight);


/* =========================================================
   MOON
========================================================= */

const moon = new THREE.Mesh(
    new THREE.SphereGeometry(
        4.5,
        32,
        32
    ),
    new THREE.MeshBasicMaterial({
        color: 0xd9dcd3
    })
);

moon.position.set(
    35,
    42,
    -35
);

scene.add(moon);


/* =========================================================
   MOON GLOW
========================================================= */

const moonGlow = new THREE.PointLight(
    0xcfd6dc,
    1.2,
    45
);

moonGlow.position.copy(
    moon.position
);

scene.add(moonGlow);


/* =========================================================
   STARS
========================================================= */

const starPositions = [];

for (let i = 0; i < 1000; i++) {

    starPositions.push(
        (Math.random() - 0.5) * 260,
        18 + Math.random() * 110,
        (Math.random() - 0.5) * 260
    );
}

const starGeometry =
    new THREE.BufferGeometry();

starGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(
        starPositions,
        3
    )
);

const starMaterial =
    new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.5,
        transparent: true,
        opacity: 0.85
    });

const stars =
    new THREE.Points(
        starGeometry,
        starMaterial
    );

scene.add(stars);


/* =========================================================
   GROUND
========================================================= */

const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(
        180,
        180
    ),
    new THREE.MeshStandardMaterial({
        color: 0x18221d,
        roughness: 1
    })
);

ground.rotation.x =
    -Math.PI / 2;

ground.position.y =
    0;

ground.receiveShadow =
    true;

scene.add(ground);


/* =========================================================
   STONE PATH
========================================================= */

const path = new THREE.Mesh(
    new THREE.PlaneGeometry(
        7,
        100
    ),
    new THREE.MeshStandardMaterial({
        color: 0x454945,
        roughness: 1
    })
);

path.rotation.x =
    -Math.PI / 2;

path.position.set(
    0,
    0.03,
    -15
);

scene.add(path);


/* =========================================================
   SMALL PATH STONES
========================================================= */

for (let i = 0; i < 35; i++) {

    const stone = new THREE.Mesh(
        new THREE.BoxGeometry(
            1.4 + Math.random() * 0.8,
            0.12,
            0.8 + Math.random() * 0.4
        ),
        new THREE.MeshStandardMaterial({
            color: 0x555853,
            roughness: 1
        })
    );

    stone.position.set(
        (Math.random() - 0.5) * 5,
        0.11,
        24 - i * 2.4
    );

    scene.add(stone);
}


/* =========================================================
   CEMETERY ENTRANCE
========================================================= */

const entrance =
    new THREE.Group();

entrance.position.z =
    28;

scene.add(entrance);


/* =========================================================
   TOWER MATERIAL
========================================================= */

const towerMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x252d2a,
        roughness: 0.9,
        metalness: 0.15
    });


/* =========================================================
   GOLD MATERIAL
========================================================= */

const goldMaterial =
    new THREE.MeshStandardMaterial({
        color: 0xc5a44e,
        metalness: 0.8,
        roughness: 0.35,
        emissive: 0x33250a,
        emissiveIntensity: 0.25
    });


/* =========================================================
   TOWERS
========================================================= */

function makeTower(x) {

    const tower =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                6,
                12,
                6
            ),
            towerMaterial
        );

    tower.position.set(
        x,
        6,
        0
    );

    entrance.add(tower);


    const roof =
        new THREE.Mesh(
            new THREE.ConeGeometry(
                4.5,
                4,
                4
            ),
            new THREE.MeshStandardMaterial({
                color: 0x101613,
                roughness: 1
            })
        );

    roof.position.set(
        x,
        14,
        0
    );

    roof.rotation.y =
        Math.PI / 4;

    entrance.add(roof);


    /* Gold trim */

    const trim =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                6.2,
                0.22,
                6.2
            ),
            goldMaterial
        );

    trim.position.set(
        x,
        11.5,
        0
    );

    entrance.add(trim);
}

makeTower(-9);
makeTower(9);


/* =========================================================
   DOUBLE GATE
========================================================= */

const gateMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x252c2a,
        metalness: 0.7,
        roughness: 0.5
    });


/*
   LEFT OUTER HINGE
*/

const leftGate =
    new THREE.Group();

leftGate.position.set(
    -5.8,
    5,
    -3.8
);

entrance.add(leftGate);


/*
   RIGHT OUTER HINGE
*/

const rightGate =
    new THREE.Group();

rightGate.position.set(
    5.8,
    5,
    -3.8
);

entrance.add(rightGate);


/* =========================================================
   CREATE NORMAL BUNGALOW STYLE GATE
========================================================= */

function makeGate(
    parent,
    direction
) {

    const panel =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                5.8,
                7.5,
                0.35
            ),
            gateMaterial
        );

    panel.position.x =
        direction * 2.9;

    parent.add(panel);


    /* Vertical bars */

    for (let i = -2; i <= 2; i++) {

        const bar =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    0.14,
                    7.7,
                    0.48
                ),
                goldMaterial
            );

        bar.position.set(
            direction * 2.9 + i * 1.1,
            0,
            -0.25
        );

        parent.add(bar);
    }


    /* Horizontal bars */

    for (
        let y = -3;
        y <= 3;
        y += 1.5
    ) {

        const bar =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    5.8,
                    0.14,
                    0.48
                ),
                goldMaterial
            );

        bar.position.set(
            direction * 2.9,
            y,
            -0.25
        );

        parent.add(bar);
    }


    /* Top spikes */

    for (let i = -2; i <= 2; i++) {

        const spike =
            new THREE.Mesh(
                new THREE.ConeGeometry(
                    0.12,
                    0.55,
                    6
                ),
                goldMaterial
            );

        spike.position.set(
            direction * 2.9 + i * 1.1,
            4.05,
            -0.25
        );

        parent.add(spike);
    }
}

makeGate(
    leftGate,
    1
);

makeGate(
    rightGate,
    -1
);


/* =========================================================
   CENTER GATE POST
========================================================= */

const centerPost =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            0.4,
            8,
            0.5
        ),
        goldMaterial
    );

centerPost.position.set(
    0,
    5,
    -3.8
);

entrance.add(centerPost);


/* =========================================================
   GATE TOP DECORATION
========================================================= */

const gateTop =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            12,
            0.4,
            0.5
        ),
        goldMaterial
    );

gateTop.position.set(
    0,
    9,
    -3.8
);

entrance.add(gateTop);


/* =========================================================
   CEMETERY SIGN
========================================================= */

const signCanvas =
    document.createElement("canvas");

signCanvas.width =
    1000;

signCanvas.height =
    300;

const ctx =
    signCanvas.getContext("2d");

ctx.fillStyle =
    "#111715";

ctx.fillRect(
    0,
    0,
    1000,
    300
);

ctx.strokeStyle =
    "#caaa58";

ctx.lineWidth =
    8;

ctx.strokeRect(
    10,
    10,
    980,
    280
);

ctx.textAlign =
    "center";

ctx.fillStyle =
    "#e1c674";

ctx.font =
    "bold 70px Georgia";

ctx.fillText(
    "CTRL + Z",
    500,
    100
);

ctx.font =
    "bold 55px Georgia";

ctx.fillText(
    "CEMETERY",
    500,
    165
);

ctx.fillStyle =
    "#aaa48f";

ctx.font =
    "22px Georgia";

ctx.fillText(
    "WHERE FORGOTTEN FILES COME TO REST",
    500,
    225
);

const signTexture =
    new THREE.CanvasTexture(
        signCanvas
    );

const sign =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            10,
            3,
            0.4
        ),
        new THREE.MeshStandardMaterial({
            map: signTexture,
            emissive: 0x3d3014,
            emissiveIntensity: 0.5
        })
    );

sign.position.set(
    0,
    14,
    -4
);

entrance.add(sign);


/* =========================================================
   FRONT / OUTSIDE GATE LIGHTS
========================================================= */

const entranceLights = [];

function makeEntranceLight(
    x,
    z
) {

    const bulb =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.35,
                16,
                16
            ),
            new THREE.MeshBasicMaterial({
                color: 0xffc34c
            })
        );

    bulb.position.set(
        x,
        3.5,
        z
    );

    entrance.add(bulb);


    const light =
        new THREE.PointLight(
            0xffb52f,
            4,
            24
        );

    light.position.copy(
        bulb.position
    );

    entrance.add(light);

    entranceLights.push(
        light
    );
}


/*
   These lights are in FRONT
   of the gate.
*/

makeEntranceLight(
    -12,
    2
);

makeEntranceLight(
    12,
    2
);

makeEntranceLight(
    -7,
    3
);

makeEntranceLight(
    7,
    3
);


/* =========================================================
   FLOWING YELLOW SPIRIT LIGHTS
========================================================= */

const spiritLights = [];

for (let i = 0; i < 20; i++) {

    const light =
        new THREE.PointLight(
            0xffd84a,
            1.8,
            12
        );

    /*
       ALL OF THESE ARE
       INSIDE THE CEMETERY.
    */

    light.position.set(
        (Math.random() - 0.5) * 38,
        1.2 + Math.random() * 5,
        -4 - Math.random() * 65
    );

    scene.add(light);

    spiritLights.push({
        light: light,

        baseX: light.position.x,
        baseY: light.position.y,
        baseZ: light.position.z,

        speed:
            0.35 +
            Math.random() * 0.7,

        phase:
            Math.random() *
            Math.PI *
            2
    });
}


function updateSpiritLights() {

    const time =
        performance.now() *
        0.001;

    spiritLights.forEach(
        function(item) {

            item.light.position.x =
                item.baseX +
                Math.sin(
                    time *
                    item.speed +
                    item.phase
                ) * 2.5;

            item.light.position.y =
                item.baseY +
                Math.sin(
                    time *
                    1.4 +
                    item.phase
                ) * 0.8;

            item.light.position.z =
                item.baseZ +
                Math.cos(
                    time *
                    item.speed *
                    0.7 +
                    item.phase
                ) * 1.5;

            item.light.intensity =
                1.4 +
                Math.sin(
                    time *
                    2 +
                    item.phase
                ) * 0.5;
        }
    );
}


/* =========================================================
   TOMBS
========================================================= */

const tombs = [];

let graveCount = 28;


/* =========================================================
   TOMBSTONE POSITION
   ALWAYS BEHIND GATE
========================================================= */

function getTombPosition() {

    let x;
    let z;

    do {

        x =
            (Math.random() - 0.5) *
            42;

        /*
           Gate is at Z 28.

           Tombs are kept deep inside
           the cemetery.
        */

        z =
            20 -
            Math.random() *
            70;

    } while (
        Math.abs(x) < 5 &&
        z > -20
    );

    return {
        x: x,
        z: z
    };
}


/* =========================================================
   CREATE TOMBSTONE
========================================================= */

function createTomb(
    fileName,
    isNew
) {

    const tomb =
        new THREE.Group();

    const position =
        getTombPosition();


    /*
       New tomb starts underground.
    */

    tomb.position.set(
        position.x,
        isNew ? -2.5 : 0,
        position.z
    );


    const width =
        1.8 +
        Math.random() * 0.7;

    const height =
        2.5 +
        Math.random() * 0.8;


    /* =====================================================
       MAIN STONE
    ===================================================== */

    const stoneMaterial =
        new THREE.MeshStandardMaterial({
            color:
                isNew
                    ? 0x46514c
                    : 0x303936,

            roughness: 0.85,

            metalness: 0.05,

            emissive: 0x111916,

            emissiveIntensity: 0.35
        });


    const stone =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                width,
                height,
                0.55
            ),
            stoneMaterial
        );

    stone.position.y =
        height / 2;

    tomb.add(stone);


    /* =====================================================
       ROUND TOP
    ===================================================== */

    const top =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                width / 2,
                18,
                10
            ),
            stoneMaterial
        );

    top.scale.z =
        0.65;

    top.position.y =
        height;

    tomb.add(top);


    /* =====================================================
       CROSS
    ===================================================== */

    const crossMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x777f79,
            roughness: 0.8,
            metalness: 0.2
        });


    const vertical =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.2,
                1.3,
                0.18
            ),
            crossMaterial
        );

    vertical.position.set(
        0,
        height + 0.65,
        -0.15
    );

    tomb.add(vertical);


    const horizontal =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.8,
                0.2,
                0.18
            ),
            crossMaterial
        );

    horizontal.position.set(
        0,
        height + 0.95,
        -0.15
    );

    tomb.add(horizontal);


    /* =====================================================
       SUBTLE TOMBSTONE GLOW
    ===================================================== */

    const glow =
        new THREE.PointLight(
            0x9b6bb0,
            isNew ? 1.7 : 0.35,
            7
        );

    glow.position.y =
        height * 0.7;

    tomb.add(glow);


    /* =====================================================
       TOMBSTONE DATA
    ===================================================== */

    tomb.userData.isTomb =
        true;

    tomb.userData.fileName =
        fileName;

    tomb.userData.roses =
        0;

    tomb.userData.comments =
        [];

    tomb.userData.emerging =
        !!isNew;

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


    /* New tomb starts tiny */

    if (isNew) {

        tomb.scale.set(
            0.05,
            0.05,
            0.05
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

function makeTree(
    x,
    z
) {

    const trunk =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.35,
                0.5,
                5,
                8
            ),
            new THREE.MeshStandardMaterial({
                color: 0x202522,
                roughness: 1
            })
        );

    trunk.position.set(
        x,
        2.5,
        z
    );

    scene.add(
        trunk
    );


    for (
        let i = 0;
        i < 4;
        i++
    ) {

        const branch =
            new THREE.Mesh(
                new THREE.CylinderGeometry(
                    0.1,
                    0.22,
                    3,
                    7
                ),
                trunk.material
            );

        branch.position.set(
            x,
            4.2,
            z
        );

        branch.rotation.z =
            (
                Math.random() -
                0.5
            ) * 1.5;

        branch.rotation.x =
            (
                Math.random() -
                0.5
            ) * 0.5;

        scene.add(
            branch
        );
    }
}


makeTree(
    -22,
    5
);

makeTree(
    23,
    0
);

makeTree(
    -23,
    -25
);

makeTree(
    24,
    -35
);

makeTree(
    -18,
    -48
);


/* =========================================================
   CAMERA LOOK
========================================================= */

let yaw = 0;

let pitch = -0.05;

let dragging = false;

let lastX = 0;

let lastY = 0;


renderer.domElement.addEventListener(
    "pointerdown",
    function(e) {

        dragging = true;

        lastX =
            e.clientX;

        lastY =
            e.clientY;
    }
);


window.addEventListener(
    "pointerup",
    function() {

        dragging = false;
    }
);


renderer.domElement.addEventListener(
    "pointermove",
    function(e) {

        if (!dragging)
            return;


        const dx =
            e.clientX -
            lastX;

        const dy =
            e.clientY -
            lastY;


        lastX =
            e.clientX;

        lastY =
            e.clientY;


        yaw -=
            dx * 0.003;


        pitch -=
            dy * 0.002;


        pitch =
            Math.max(
                -0.7,
                Math.min(
                    0.5,
                    pitch
                )
            );
    }
);


/* =========================================================
   SCROLL MOVEMENT — SMOOTH & LIMITED
========================================================= */

let targetCameraZ = camera.position.z;

renderer.domElement.addEventListener(
    "wheel",
    function (e) {

        e.preventDefault();

        /*
           Smaller movement so scrolling
           does NOT feel like zooming.
        */

        const moveAmount =
            e.deltaY > 0
                ? 3
                : -3;

        targetCameraZ += moveAmount;


        /*
           LIMIT HOW FAR THE CAMERA CAN MOVE.

           This prevents the camera from
           flying through the cemetery or
           getting ridiculously close.
        */

        targetCameraZ =
            Math.max(
                -45,
                Math.min(
                    72,
                    targetCameraZ
                )
            );

    },
    {
        passive: false
    }
);


/* =========================================================
   SMOOTH CAMERA MOVEMENT
========================================================= */

function updateScrollMovement() {

    camera.position.z +=
        (
            targetCameraZ -
            camera.position.z
        ) * 0.08;


    /*
       Keep camera height stable.
    */

    camera.position.y +=
        (
            6 -
            camera.position.y
        ) * 0.08;


    /*
       Hide welcome screen once
       the player approaches.
    */

    const welcome =
        document.getElementById(
            "welcome"
        );


    if (welcome) {

        const distance =
            camera.position.z;


        welcome.style.opacity =
            distance < 64
                ? "0"
                : "1";
    }
}
/* =========================================================
   CAMERA UPDATE
========================================================= */

function updateCamera() {

    const target =
        new THREE.Vector3(

            camera.position.x +
            Math.sin(yaw) *
            20,

            camera.position.y +
            Math.sin(pitch) *
            20,

            camera.position.z -
            Math.cos(yaw) *
            20
        );


    camera.lookAt(
        target
    );
}


/* =========================================================
   AUTOMATIC GATE OPENING
========================================================= */

let gateAmount = 0;


function updateGate() {

    const distance =
        Math.abs(
            camera.position.z -
            28
        );


    let target = 0;


    if (distance < 34) {

        target =
            1 -
            Math.min(
                distance / 34,
                1
            );
    }


    gateAmount +=
        (
            target -
            gateAmount
        ) * 0.08;


    const smooth =
        gateAmount *
        gateAmount *
        (
            3 -
            2 * gateAmount
        );


    /*
       Normal bungalow-style
       outward opening.
    */

    leftGate.rotation.y =
        -smooth *
        Math.PI *
        0.55;


    rightGate.rotation.y =
        smooth *
        Math.PI *
        0.55;
}


/* =========================================================
   NEW TOMBS RISING
========================================================= */

function updateNewTombs() {

    const now =
        performance.now();


    tombs.forEach(
        function(tomb) {

            if (
                !tomb.userData.emerging
            )
                return;


            const progress =
                Math.min(
                    (
                        now -
                        tomb.userData.startTime
                    ) / 1600,
                    1
                );


            const smooth =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );


            tomb.scale.set(
                smooth,
                smooth,
                smooth
            );


            tomb.position.y =
                -2.5 +
                smooth * 2.5;


            if (
                tomb.userData.glow
            ) {

                tomb.userData.glow.intensity =
                    1.7 -
                    progress * 1.35;
            }


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
            }
        }
    );
}


/* =========================================================
   LIGHT FLICKER
========================================================= */

function flickerLights() {

    const time =
        performance.now() *
        0.005;


    entranceLights.forEach(
        function(
            light,
            index
        ) {

            light.intensity =
                3.5 +
                Math.sin(
                    time +
                    index
                ) * 0.4;
        }
    );
}


/* =========================================================
   TOMBSTONE CLICK
========================================================= */

const raycaster =
    new THREE.Raycaster();

const mouse =
    new THREE.Vector2();


renderer.domElement.addEventListener(
    "click",
    function(e) {

        /*
           Ignore click if user was
           dragging the camera.
        */

        mouse.x =
            (
                e.clientX /
                window.innerWidth
            ) * 2 - 1;


        mouse.y =
            -(
                e.clientY /
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


        /*
           Walk up the parent tree
           until the actual tomb group.
        */

        while (
            tomb &&
            !tomb.userData.isTomb
        ) {

            tomb =
                tomb.parent;
        }


        if (tomb) {

            openMemorial(
                tomb
            );
        }
    }
);


/* =========================================================
   MEMORIAL PANEL
========================================================= */

let selectedTomb =
    null;


function openMemorial(
    tomb
) {

    selectedTomb =
        tomb;


    const panel =
        document.getElementById(
            "memorialPanel"
        );


    const title =
        document.getElementById(
            "memorialTitle"
        );


    const text =
        panel.querySelector(
            ".memorial-text"
        );


    const roseCount =
        document.getElementById(
            "roseCount"
        );


    const commentsList =
        document.getElementById(
            "commentsList"
        );


    /*
       FILE NAME
    */

    if (title) {

        title.textContent =
            tomb.userData.fileName;
    }


    /*
       DESCRIPTION
    */

    if (text) {

        text.innerHTML = `
            This forgotten digital artifact
            has found its final resting place
            within the CTRL + Z Digital Cemetery.
            <br><br>
            <strong>File:</strong>
            ${escapeHTML(
                tomb.userData.fileName
            )}
        `;
    }


    /*
       ROSES
    */

    if (roseCount) {

        roseCount.textContent =
            tomb.userData.roses +
            " roses";
    }


    /*
       COMMENTS
    */

    if (commentsList) {

        renderComments(
            tomb
        );
    }


    /*
       IMPORTANT:
       FORCE THE PANEL TO BE VISIBLE.
    */

    panel.style.zIndex =
        "9999";

    panel.style.pointerEvents =
        "auto";

    panel.style.visibility =
        "visible";

    panel.style.opacity =
        "1";

    panel.classList.add(
        "show"
    );

    panel.classList.add(
        "open"
    );
}


/* =========================================================
   CLOSE MEMORIAL
========================================================= */

const closeMemorial =
    document.getElementById(
        "closeMemorial"
    );


if (closeMemorial) {

    closeMemorial.onclick =
        function() {

            const panel =
                document.getElementById(
                    "memorialPanel"
                );


            panel.classList.remove(
                "show"
            );

            panel.classList.remove(
                "open"
            );
        };
}


/* =========================================================
   BURY A NEW FILE
========================================================= */

const fileInput =
    document.getElementById(
        "fileInput"
    );


if (fileInput) {

    fileInput.addEventListener(
        "change",
        function() {

            const files =
                Array.from(
                    this.files
                );


            files.forEach(
                function(
                    file,
                    index
                ) {

                    setTimeout(
                        function() {

                            buryFile(
                                file
                            );

                        },
                        index * 700
                    );
                }
            );


            this.value =
                "";
        }
    );
}


/* =========================================================
   BURY FILE
========================================================= */

function buryFile(
    file
) {

    graveCount++;


    const count =
        document.getElementById(
            "buriedCount"
        );


    if (count) {

        count.textContent =
            graveCount;
    }


    /*
       Create new tomb INSIDE
       the cemetery.
    */

    createTomb(
        file.name,
        true
    );


    /*
       Lightning
    */

    lightning();


    /*
       Popup
    */

    showBurialPopup(
        file.name
    );
}


/* =========================================================
   LIGHTNING EFFECT
========================================================= */

function lightning() {

    const flash =
        document.getElementById(
            "lightningFlash"
        );


    if (!flash)
        return;


    flash.classList.remove(
        "flash"
    );


    /*
       Force browser to restart
       the CSS animation.
    */

    void flash.offsetWidth;


    flash.classList.add(
        "flash"
    );


    /*
       Temporary bright flash
       in the 3D scene.
    */

    ambient.intensity =
        4;


    moonLight.intensity =
        2.5;


    setTimeout(
        function() {

            ambient.intensity =
                1.5;

            moonLight.intensity =
                1;

        },
        250
    );


    setTimeout(
        function() {

            ambient.intensity =
                3;

        },
        400
    );


    setTimeout(
        function() {

            ambient.intensity =
                1.5;

        },
        650
    );
}


/* =========================================================
   BURIAL POPUP
========================================================= */

function showBurialPopup(
    fileName
) {

    const popup =
        document.getElementById(
            "burialPopup"
        );


    const popupFileName =
        document.getElementById(
            "popupFileName"
        );


    if (!popup)
        return;


    if (popupFileName) {

        popupFileName.textContent =
            fileName;
    }


    popup.classList.remove(
        "show"
    );


    void popup.offsetWidth;


    popup.classList.add(
        "show"
    );


    setTimeout(
        function() {

            popup.classList.remove(
                "show"
            );

        },
        3300
    );
}


/* =========================================================
   ROSE BUTTON
========================================================= */

const roseButton =
    document.getElementById(
        "roseButton"
    );


if (roseButton) {

    roseButton.addEventListener(
        "click",
        function() {

            if (!selectedTomb)
                return;


            selectedTomb.userData.roses++;


            const roseCount =
                document.getElementById(
                    "roseCount"
                );


            if (roseCount) {

                roseCount.textContent =
                    selectedTomb.userData.roses +
                    " roses";
            }
        }
    );
}


/* =========================================================
   COMMENT BUTTON
========================================================= */

const commentButton =
    document.getElementById(
        "commentButton"
    );


if (commentButton) {

    commentButton.addEventListener(
        "click",
        function() {

            if (!selectedTomb)
                return;


            const input =
                document.getElementById(
                    "commentInput"
                );


            if (!input)
                return;


            const message =
                input.value.trim();


            if (!message)
                return;


            selectedTomb.userData.comments.push(
                message
            );


            input.value =
                "";


            renderComments(
                selectedTomb
            );
        }
    );
}


/* =========================================================
   RENDER COMMENTS
========================================================= */

function renderComments(
    tomb
) {

    const commentsList =
        document.getElementById(
            "commentsList"
        );


    if (!commentsList)
        return;


    commentsList.innerHTML =
        "";


    if (
        tomb.userData.comments.length ===
        0
    ) {

        commentsList.innerHTML = `
            <div class="comment">
                No messages yet.
                Be the first to leave one.
            </div>
        `;

        return;
    }


    tomb.userData.comments.forEach(
        function(comment) {

            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "comment";


            div.textContent =
                "🌹 " +
                comment;


            commentsList.appendChild(
                div
            );
        }
    );
}


/* =========================================================
   VISITOR PANEL
========================================================= */

const visitorButton =
    document.getElementById(
        "visitorButton"
    );


const visitorPanel =
    document.getElementById(
        "visitorPanel"
    );


if (visitorButton) {

    visitorButton.addEventListener(
        "click",
        function() {

            if (!visitorPanel)
                return;


            visitorPanel.style.zIndex =
                "9999";

            visitorPanel.style.pointerEvents =
                "auto";

            visitorPanel.style.visibility =
                "visible";

            visitorPanel.style.opacity =
                "1";


            visitorPanel.classList.add(
                "show"
            );

            visitorPanel.classList.add(
                "open"
            );
        }
    );
}


/* =========================================================
   CLOSE VISITOR PANEL
========================================================= */

const closeVisitors =
    document.getElementById(
        "closeVisitors"
    );


if (closeVisitors) {

    closeVisitors.addEventListener(
        "click",
        function() {

            if (!visitorPanel)
                return;


            visitorPanel.classList.remove(
                "show"
            );

            visitorPanel.classList.remove(
                "open"
            );
        }
    );
}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(
    text
) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        text;


    return div.innerHTML;
}


/* =========================================================
   KEYBOARD ESCAPE
========================================================= */

document.addEventListener(
    "keydown",
    function(e) {

        if (
            e.key !== "Escape"
        )
            return;


        const memorial =
            document.getElementById(
                "memorialPanel"
            );


        const visitors =
            document.getElementById(
                "visitorPanel"
            );


        if (memorial) {

            memorial.classList.remove(
                "show"
            );

            memorial.classList.remove(
                "open"
            );
        }


        if (visitors) {

            visitors.classList.remove(
                "show"
            );

            visitors.classList.remove(
                "open"
            );
        }
    }
);


/* =========================================================
   RESIZE
========================================================= */

window.addEventListener(
    "resize",
    function() {

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
   ANIMATION LOOP
========================================================= */

function animate() {

    requestAnimationFrame(
        animate
    );

    updateScrollMovement();

    updateCamera();

    updateGate();

    updateNewTombs();

    flickerLights();

    updateSpiritLights();


    /*
       Slow star movement.
    */

    stars.rotation.y +=
        0.00008;


    /*
       Very subtle atmosphere
       movement.
    */

    greenLight.intensity =
        2.8 +
        Math.sin(
            performance.now() *
            0.0007
        ) * 0.25;


    purpleLight.intensity =
        2.3 +
        Math.sin(
            performance.now() *
            0.0005 +
            2
        ) * 0.2;


    renderer.render(
        scene,
        camera
    );
}


/* =========================================================
   START
========================================================= */

animate();
