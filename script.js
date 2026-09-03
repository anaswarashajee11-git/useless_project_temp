/* =========================================================
   CTRL + Z DIGITAL CEMETERY
   COMPLETE SCRIPT
========================================================= */

if (typeof THREE === "undefined") {
    document.body.innerHTML += `
        <div style="
            position:fixed;
            inset:0;
            display:flex;
            align-items:center;
            justify-content:center;
            background:#050806;
            color:#d9bd72;
            font-family:Georgia,serif;
            font-size:22px;
            z-index:99999;
        ">
            Three.js could not load.
        </div>
    `;

    throw new Error("Three.js failed to load");
}


/* =========================================================
   DOM
========================================================= */

const container = document.getElementById("scene");


/* =========================================================
   SCENE
========================================================= */

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x050807);

scene.fog = new THREE.Fog(
    0x050807,
    55,
    150
);


/* =========================================================
   CAMERA
========================================================= */

const camera = new THREE.PerspectiveCamera(
    62,
    window.innerWidth / window.innerHeight,
    0.1,
    500
);

/*
    IMPORTANT

    Start far OUTSIDE the gate.
*/
camera.position.set(
    0,
    4.8,
    72
);


/* =========================================================
   RENDERER
========================================================= */

const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

renderer.setClearColor(
    0x050807
);

renderer.shadowMap.enabled = true;

container.appendChild(
    renderer.domElement
);


/* =========================================================
   LIGHTING
========================================================= */

const ambient = new THREE.AmbientLight(
    0x8c9b87,
    1.45
);

scene.add(ambient);


const moonLight = new THREE.DirectionalLight(
    0xb8b8d8,
    1.25
);

moonLight.position.set(
    20,
    50,
    15
);

moonLight.castShadow = true;

scene.add(moonLight);


/* Green atmosphere */

const greenLight = new THREE.PointLight(
    0x3f7656,
    3,
    140
);

greenLight.position.set(
    35,
    15,
    -10
);

scene.add(greenLight);


/* Purple atmosphere */

const purpleLight = new THREE.PointLight(
    0x68428a,
    2,
    140
);

purpleLight.position.set(
    -35,
    12,
    -25
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
        color: 0xc7ccc2
    })
);

moon.position.set(
    25,
    32,
    -45
);

scene.add(moon);


/* Moon glow */

const moonGlow = new THREE.PointLight(
    0xaaaacc,
    1.5,
    70
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

    const x =
        (Math.random() - 0.5) * 220;

    const y =
        15 + Math.random() * 100;

    const z =
        -100 + Math.random() * 160;

    starPositions.push(
        x,
        y,
        z
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
        color: 0xf4e8a8,
        size: 0.5
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
        200,
        200
    ),
    new THREE.MeshStandardMaterial({
        color: 0x17211d,
        roughness: 1
    })
);

ground.rotation.x =
    -Math.PI / 2;

ground.receiveShadow = true;

scene.add(ground);


/* =========================================================
   STONE PATH
========================================================= */

const path = new THREE.Mesh(
    new THREE.PlaneGeometry(
        8,
        130
    ),
    new THREE.MeshStandardMaterial({
        color: 0x4b4d48,
        roughness: 1
    })
);

path.rotation.x =
    -Math.PI / 2;

path.position.set(
    0,
    0.03,
    -12
);

scene.add(path);


/* =========================================================
   PATH STONES
========================================================= */

for (let z = 35; z > -70; z -= 4) {

    const stone = new THREE.Mesh(
        new THREE.BoxGeometry(
            7.7,
            0.08,
            2.8
        ),
        new THREE.MeshStandardMaterial({
            color:
                Math.random() > 0.5
                    ? 0x565751
                    : 0x444640,
            roughness: 1
        })
    );

    stone.position.set(
        0,
        0.08,
        z
    );

    scene.add(stone);
}


/* =========================================================
   ENTRANCE
========================================================= */

const entrance =
    new THREE.Group();

/*
    THE GATE IS AT Z = 24

    Everything behind it has
    Z < 24.
*/

entrance.position.z = 24;

scene.add(entrance);


/* =========================================================
   MATERIALS
========================================================= */

const towerMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x252c2b,
        roughness: 0.82
    });


const darkStone =
    new THREE.MeshStandardMaterial({
        color: 0x171d1b,
        roughness: 0.9
    });


const gateMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x181d1b,
        metalness: 0.72,
        roughness: 0.42
    });


const gold =
    new THREE.MeshStandardMaterial({
        color: 0xc7a557,
        metalness: 0.82,
        roughness: 0.28,
        emissive: 0x2b2008,
        emissiveIntensity: 0.35
    });


/* =========================================================
   TOWERS
========================================================= */

function makeTower(x) {

    const tower =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                6.5,
                13,
                6
            ),
            towerMaterial
        );

    tower.position.set(
        x,
        6.5,
        0
    );

    tower.castShadow = true;

    entrance.add(tower);


    /* Tower base */

    const base =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                7.5,
                1.5,
                7
            ),
            darkStone
        );

    base.position.set(
        x,
        0.75,
        0
    );

    entrance.add(base);


    /* Roof */

    const roof =
        new THREE.Mesh(
            new THREE.ConeGeometry(
                4.8,
                6,
                4
            ),
            new THREE.MeshStandardMaterial({
                color: 0x0d1211,
                roughness: 1
            })
        );

    roof.position.set(
        x,
        16,
        0
    );

    roof.rotation.y =
        Math.PI / 4;

    entrance.add(roof);


    /* Gold roof edge */

    const roofEdge =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                6.8,
                0.18,
                0.18
            ),
            gold
        );

    roofEdge.position.set(
        x,
        13.2,
        -2.9
    );

    entrance.add(roofEdge);


    /* Tower vertical decoration */

    for (
        let i = -1;
        i <= 1;
        i++
    ) {

        const strip =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    0.35,
                    8,
                    0.3
                ),
                darkStone
            );

        strip.position.set(
            x + i * 1.25,
            6,
            -3.05
        );

        entrance.add(strip);
    }
}


makeTower(-9);
makeTower(9);


/* =========================================================
   GATE TOP FRAME
========================================================= */

const topBeam =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            12,
            1,
            0.8
        ),
        gold
    );

topBeam.position.set(
    0,
    13,
    -2.8
);

entrance.add(topBeam);


const topDarkBeam =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            13,
            2,
            0.7
        ),
        darkStone
    );

topDarkBeam.position.set(
    0,
    11.8,
    -2.8
);

entrance.add(topDarkBeam);


/* =========================================================
   GATE HINGES

   IMPORTANT:
   These are placed at the OUTER edges.

   Left hinge  = -5.8
   Right hinge = +5.8
========================================================= */

const leftGate =
    new THREE.Group();

leftGate.position.set(
    -5.8,
    5,
    -3.3
);

entrance.add(leftGate);


const rightGate =
    new THREE.Group();

rightGate.position.set(
    5.8,
    5,
    -3.3
);

entrance.add(rightGate);


/* =========================================================
   GATE PANELS
========================================================= */

function makeGatePanel(
    parent,
    direction
) {

    /*
        Panel center is 2.9 away
        from hinge.

        This makes the outer edge
        act like the real hinge.
    */

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

    panel.castShadow = true;

    parent.add(panel);


    /* Vertical bars */

    for (
        let i = -2;
        i <= 2;
        i++
    ) {

        const bar =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    0.16,
                    7.9,
                    0.55
                ),
                gold
            );

        bar.position.set(
            direction * 2.9 +
                i * 1.05,
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
                    0.15,
                    0.55
                ),
                gold
            );

        bar.position.set(
            direction * 2.9,
            y,
            -0.25
        );

        parent.add(bar);
    }


    /* Decorative center ring */

    const ring =
        new THREE.Mesh(
            new THREE.TorusGeometry(
                0.65,
                0.1,
                12,
                32
            ),
            gold
        );

    ring.position.set(
        direction * 2.9,
        0,
        -0.55
    );

    parent.add(ring);


    /* Spikes */

    for (
        let i = -2;
        i <= 2;
        i++
    ) {

        const spike =
            new THREE.Mesh(
                new THREE.ConeGeometry(
                    0.18,
                    0.7,
                    4
                ),
                gold
            );

        spike.position.set(
            direction * 2.9 +
                i * 1.05,
            4,
            -0.25
        );

        parent.add(spike);
    }
}


makeGatePanel(
    leftGate,
    1
);

makeGatePanel(
    rightGate,
    -1
);


/* =========================================================
   NO CENTER POST
========================================================= */

/*
    IMPORTANT:
    There is intentionally NO center post.

    The two panels close against each other,
    then move completely away when opening.
*/


/* =========================================================
   GATE SIGN
========================================================= */

const signCanvas =
    document.createElement("canvas");

signCanvas.width = 1000;
signCanvas.height = 300;

const ctx =
    signCanvas.getContext("2d");


ctx.fillStyle =
    "#101412";

ctx.fillRect(
    0,
    0,
    1000,
    300
);


ctx.strokeStyle =
    "#c7a557";

ctx.lineWidth = 8;

ctx.strokeRect(
    12,
    12,
    976,
    276
);


ctx.textAlign =
    "center";

ctx.fillStyle =
    "#e2c77b";

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
    "#aaa28e";

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
            emissiveIntensity: 0.65
        })
    );


sign.position.set(
    0,
    15.5,
    -3
);

entrance.add(sign);


/* =========================================================
   FRONT LIGHTS
========================================================= */

const entranceLights = [];


function makeEntranceLight(
    x,
    z
) {

    const lamp =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.35,
                16,
                16
            ),
            new THREE.MeshBasicMaterial({
                color: 0xffc84a
            })
        );

    lamp.position.set(
        x,
        4,
        z
    );

    entrance.add(lamp);


    const light =
        new THREE.PointLight(
            0xffb52f,
            4,
            25
        );

    light.position.copy(
        lamp.position
    );

    entrance.add(light);

    entranceLights.push(
        light
    );
}


makeEntranceLight(-12, 1);
makeEntranceLight(12, 1);
makeEntranceLight(-7, 1);
makeEntranceLight(7, 1);


/* =========================================================
   TOMBS
========================================================= */

const tombs = [];

let graveCount = 28;


/*
    Tombs ONLY appear behind the gate.

    Gate = +24

    Tombs:
    +10 to -65
*/

function getTombPosition() {

    let x;
    let z;

    do {

        x =
            (Math.random() - 0.5) * 44;

        z =
            10 -
            Math.random() * 75;

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

    const pos =
        getTombPosition();


    tomb.position.set(
        pos.x,
        isNew ? -2 : 0,
        pos.z
    );


    tomb.userData = {

        isTomb: true,

        fileName:
            fileName,

        roses: 0,

        comments: [],

        emerging:
            isNew,

        startTime:
            performance.now()
    };


    /* =====================================================
       STONE
    ===================================================== */

    const width =
        1.8 +
        Math.random() * 0.7;

    const height =
        2.5 +
        Math.random() * 0.8;


    const stoneMaterial =
        new THREE.MeshStandardMaterial({

            color:
                0x303936,

            roughness:
                0.82,

            metalness:
                0.05,

            emissive:
                0x18221e,

            emissiveIntensity:
                0.4
        });


    const stone =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                width,
                height,
                0.6
            ),
            stoneMaterial
        );


    stone.position.y =
        height / 2;


    stone.castShadow = true;


    tomb.add(stone);


    /* =====================================================
       ROUNDED TOP
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
            color: 0x737b76,
            roughness: 0.7
        });


    const vertical =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.25,
                1.6,
                0.25
            ),
            crossMaterial
        );


    vertical.position.set(
        0,
        height + 0.9,
        -0.05
    );


    tomb.add(vertical);


    const horizontal =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                1.1,
                0.25,
                0.25
            ),
            crossMaterial
        );


    horizontal.position.set(
        0,
        height + 1.15,
        -0.05
    );


    tomb.add(horizontal);


    /* =====================================================
       FILE NAME PLATE
    ===================================================== */

    const plate =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                width * 0.75,
                0.35,
                0.08
            ),
            new THREE.MeshStandardMaterial({
                color: 0x171b19,
                emissive: 0x28200a,
                emissiveIntensity: 0.35
            })
        );


    plate.position.set(
        0,
        height * 0.45,
        -0.35
    );


    tomb.add(plate);


    /* =====================================================
       GLOW
    ===================================================== */

    const glow =
        new THREE.PointLight(
            0xd8b85b,
            isNew ? 4 : 1.2,
            5
        );


    glow.position.set(
        0,
        1.8,
        -0.5
    );


    tomb.add(glow);


    tomb.userData.glow =
        glow;


    scene.add(tomb);

    tombs.push(tomb);

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
                0.55,
                6,
                8
            ),
            new THREE.MeshStandardMaterial({
                color: 0x211b17,
                roughness: 1
            })
        );


    trunk.position.set(
        x,
        3,
        z
    );


    scene.add(trunk);


    const crown =
        new THREE.Mesh(
            new THREE.ConeGeometry(
                3,
                7,
                7
            ),
            new THREE.MeshStandardMaterial({
                color: 0x101a15,
                roughness: 1
            })
        );


    crown.position.set(
        x,
        8,
        z
    );


    scene.add(crown);
}


makeTree(-23, 5);
makeTree(23, 0);
makeTree(-25, -25);
makeTree(26, -38);
makeTree(-22, -48);
makeTree(22, -58);


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

        renderer.domElement.setPointerCapture(
            e.pointerId
        );
    }
);


renderer.domElement.addEventListener(
    "pointerup",
    function(e) {

        dragging = false;

        try {

            renderer.domElement.releasePointerCapture(
                e.pointerId
            );

        } catch (error) {}
    }
);


renderer.domElement.addEventListener(
    "pointermove",
    function(e) {

        if (!dragging) {
            return;
        }


        const dx =
            e.clientX - lastX;

        const dy =
            e.clientY - lastY;


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
   MOVEMENT
========================================================= */

/*
    THIS IS THE IMPORTANT FIX.

    The old version allowed browser scrolling
    to interfere with the 3D movement.

    This version captures the wheel event.
*/

renderer.domElement.addEventListener(
    "wheel",
    function(e) {

        e.preventDefault();


        /*
            Scroll DOWN
            = move FORWARD
        */

        let direction =
            e.deltaY > 0
                ? 1
                : -1;


        /*
            Faster movement.

            This makes it much easier
            to actually enter the cemetery.
        */

        let speed = 2.4;


        /*
            Slow slightly when turning.
        */

        const forwardX =
            Math.sin(yaw);


        const forwardZ =
            -Math.cos(yaw);


        camera.position.x +=
            forwardX *
            speed *
            direction;


        camera.position.z +=
            forwardZ *
            speed *
            direction;


        /*
            SIDE BOUNDARY
        */

        camera.position.x =
            Math.max(
                -55,
                Math.min(
                    55,
                    camera.position.x
                )
            );


        /*
            FRONT / BACK BOUNDARY

            IMPORTANT:

            The camera is allowed
            to go FAR past the gate.

            Gate = +24

            Camera can go to -80.
        */

        camera.position.z =
            Math.max(
                -80,
                Math.min(
                    80,
                    camera.position.z
                )
            );


        /*
            Welcome message disappears
            after approaching gate.
        */

        const welcome =
            document.getElementById(
                "welcome"
            );

        if (welcome) {

            welcome.style.opacity =
                camera.position.z < 60
                    ? "0"
                    : "1";
        }

    },
    {
        passive: false
    }
);


/* =========================================================
   CAMERA LOOK UPDATE
========================================================= */

function updateCamera() {

    const target =
        new THREE.Vector3(

            camera.position.x +
                Math.sin(yaw) * 25,

            camera.position.y +
                Math.sin(pitch) * 25,

            camera.position.z -
                Math.cos(yaw) * 25
        );


    camera.lookAt(
        target
    );
}


/* =========================================================
   GATE ANIMATION
========================================================= */

let gateAmount = 0;


function updateGate() {

    /*
        Gate is at Z = 24.

        Start opening when camera
        is 40 units away.
    */

    const distance =
        Math.abs(
            camera.position.z -
            24
        );


    let target = 0;


    if (distance < 42) {

        target =
            1 -
            Math.min(
                distance / 42,
                1
            );
    }


    /*
        Smooth animation.
    */

    gateAmount +=
        (
            target -
            gateAmount
        ) * 0.10;


    const smooth =
        gateAmount *
        gateAmount *
        (
            3 -
            2 *
            gateAmount
        );


    /*
        OPEN OUTWARD.

        Left door:
        rotates LEFT.

        Right door:
        rotates RIGHT.
    */

    leftGate.rotation.y =
        -smooth *
        Math.PI *
        0.62;


    rightGate.rotation.y =
        smooth *
        Math.PI *
        0.62;
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
                Smooth cubic movement.
            */

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


            /*
                Rise from below ground.
            */

            tomb.position.y =
                -2 +
                smooth * 2;


            if (
                tomb.userData.glow
            ) {

                tomb.userData.glow.intensity =
                    4 -
                    progress * 2.8;
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


                tomb.userData.glow.intensity =
                    1.2;
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
        0.004;


    entranceLights.forEach(
        function(light, index) {

            light.intensity =
                3.5 +
                Math.sin(
                    time + index
                ) * 0.5;
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
            Don't open tomb when
            the user was dragging.
        */

        if (dragging) {
            return;
        }


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


        const hits =
            raycaster.intersectObjects(
                tombs,
                true
            );


        if (
            hits.length === 0
        ) {
            return;
        }


        let tomb =
            hits[0].object;


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
   MEMORIAL
========================================================= */

let selectedTomb = null;


function openMemorial(
    tomb
) {

    selectedTomb =
        tomb;


    const content =
        document.getElementById(
            "memorialContent"
        );


    if (!content) {
        return;
    }


    content.innerHTML = `

        <h2>🪦 Digital Memorial</h2>

        <p>
            <strong>File:</strong>
            ${escapeHTML(
                tomb.userData.fileName
            )}
        </p>

        <p>
            A forgotten digital artifact
            resting peacefully inside
            CTRL + Z Cemetery.
        </p>

        <p>
            🌹 Roses:
            ${tomb.userData.roses}
        </p>
    `;


    const panel =
        document.getElementById(
            "memorialPanel"
        );


    if (panel) {

        panel.classList.add(
            "show"
        );
    }
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

            document.getElementById(
                "memorialPanel"
            ).classList.remove(
                "show"
            );
        };
}


/* =========================================================
   FILE INPUT
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
                function(file, index) {

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


            this.value = "";
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


    const counter =
        document.getElementById(
            "graveCount"
        );


    if (counter) {

        counter.textContent =
            graveCount;
    }


    /*
        NEW TOMB
        APPEARS INSIDE.
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

    popup(
        file.name
    );
}


/* =========================================================
   LIGHTNING
========================================================= */

function lightning() {

    const element =
        document.getElementById(
            "lightningFlash"
        );


    if (element) {

        element.classList.remove(
            "flash"
        );


        void element.offsetWidth;


        element.classList.add(
            "flash"
        );
    }


    /*
        Bright flash.
    */

    ambient.intensity = 4;


    moonLight.intensity = 2.5;


    setTimeout(
        function() {

            ambient.intensity =
                1.45;

            moonLight.intensity =
                1.25;

        },
        450
    );
}


/* =========================================================
   BURIAL POPUP
========================================================= */

function popup(
    name
) {

    const popupElement =
        document.getElementById(
            "burialPopup"
        );


    const nameElement =
        document.getElementById(
            "popupFileName"
        );


    if (
        !popupElement ||
        !nameElement
    ) {

        return;
    }


    nameElement.textContent =
        name;


    popupElement.classList.add(
        "show"
    );


    setTimeout(
        function() {

            popupElement.classList.remove(
                "show"
            );

        },
        3300
    );
}


/* =========================================================
   VISITOR PANEL
========================================================= */

const visitorButton =
    document.getElementById(
        "visitorButton"
    );


if (visitorButton) {

    visitorButton.onclick =
        function() {

            if (selectedTomb) {

                openVisitors(
                    selectedTomb
                );

            } else if (
                tombs.length > 0
            ) {

                openVisitors(
                    tombs[0]
                );
            }
        };
}


/* =========================================================
   OPEN VISITORS
========================================================= */

function openVisitors(
    tomb
) {

    selectedTomb =
        tomb;


    const name =
        document.getElementById(
            "selectedTombName"
        );


    if (name) {

        name.textContent =
            tomb.userData.fileName;
    }


    const roses =
        document.getElementById(
            "roseCount"
        );


    if (roses) {

        roses.textContent =
            tomb.userData.roses;
    }


    renderComments(
        tomb
    );


    const panel =
        document.getElementById(
            "visitorPanel"
        );


    if (panel) {

        panel.classList.add(
            "show"
        );
    }
}


/* =========================================================
   CLOSE VISITORS
========================================================= */

const closeVisitorPanel =
    document.getElementById(
        "closeVisitorPanel"
    );


if (closeVisitorPanel) {

    closeVisitorPanel.onclick =
        function() {

            document.getElementById(
                "visitorPanel"
            ).classList.remove(
                "show"
            );
        };
}


/* =========================================================
   OPEN VISITOR PANEL FROM MEMORIAL
========================================================= */

const openVisitorPanel =
    document.getElementById(
        "openVisitorPanel"
    );


if (openVisitorPanel) {

    openVisitorPanel.onclick =
        function() {

            if (selectedTomb) {

                openVisitors(
                    selectedTomb
                );
            }
        };
}


/* =========================================================
   ROSE
========================================================= */

const roseButton =
    document.getElementById(
        "roseButton"
    );


if (roseButton) {

    roseButton.onclick =
        function() {

            if (!selectedTomb) {
                return;
            }


            selectedTomb.userData.roses++;


            const roseCount =
                document.getElementById(
                    "roseCount"
                );


            if (roseCount) {

                roseCount.textContent =
                    selectedTomb.userData.roses;
            }
        };
}


/* =========================================================
   COMMENTS
========================================================= */

const commentButton =
    document.getElementById(
        "commentButton"
    );


if (commentButton) {

    commentButton.onclick =
        function() {

            if (!selectedTomb) {
                return;
            }


            const input =
                document.getElementById(
                    "commentInput"
                );


            if (!input) {
                return;
            }


            const message =
                input.value.trim();


            if (!message) {
                return;
            }


            selectedTomb.userData.comments.push(
                message
            );


            input.value = "";


            renderComments(
                selectedTomb
            );
        };
}


/* =========================================================
   RENDER COMMENTS
========================================================= */

function renderComments(
    tomb
) {

    const box =
        document.getElementById(
            "comments"
        );


    if (!box) {
        return;
    }


    box.innerHTML = "";


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


            box.appendChild(
                div
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
   ANIMATION
========================================================= */

function animate() {

    requestAnimationFrame(
        animate
    );


    updateCamera();

    updateGate();

    updateNewTombs();

    flickerLights();


    /*
        Slowly move stars.
    */

    stars.rotation.y +=
        0.00008;


    /*
        Very subtle atmosphere movement.
    */

    greenLight.position.x =
        35 +
        Math.sin(
            performance.now() *
            0.0003
        ) * 5;


    purpleLight.position.x =
        -35 +
        Math.cos(
            performance.now() *
            0.00025
        ) * 5;


    renderer.render(
        scene,
        camera
    );
}


/* =========================================================
   START
========================================================= */

animate();
