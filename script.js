console.log("CTRL + Z CEMETERY STARTING");


/* =====================================================
   CHECK THREE.JS
===================================================== */

if (typeof THREE === "undefined") {

    document.body.innerHTML = `
        <div style="
            width:100vw;
            height:100vh;
            background:#050505;
            color:white;
            display:flex;
            align-items:center;
            justify-content:center;
            font-family:Arial;
            text-align:center;
        ">

            <div>

                <h1>
                    Three.js did not load
                </h1>

                <p>
                    Refresh the page and try again.
                </p>

            </div>

        </div>
    `;

    throw new Error(
        "THREE.js is not loaded"
    );
}


/* =====================================================
   ELEMENTS
===================================================== */

const sceneContainer =
    document.getElementById("scene");

const fileInput =
    document.getElementById("fileInput");

const graveCount =
    document.getElementById("graveCount");

const welcome =
    document.getElementById("welcome");

const memorialPanel =
    document.getElementById("memorialPanel");

const memorialContent =
    document.getElementById("memorialContent");

const visitorPanel =
    document.getElementById("visitorPanel");

const selectedTombName =
    document.getElementById("selectedTombName");

const roseCount =
    document.getElementById("roseCount");

const commentInput =
    document.getElementById("commentInput");

const comments =
    document.getElementById("comments");


/* =====================================================
   SCENE
===================================================== */

const scene =
    new THREE.Scene();

scene.background =
    new THREE.Color(
        0x020205
    );

scene.fog =
    new THREE.FogExp2(
        0x06060b,
        0.008
    );


/* =====================================================
   CAMERA
===================================================== */

const camera =
    new THREE.PerspectiveCamera(
        55,
        window.innerWidth /
        window.innerHeight,
        0.1,
        500
    );

camera.position.set(
    0,
    8,
    75
);


/* =====================================================
   RENDERER
===================================================== */

const renderer =
    new THREE.WebGLRenderer({
        antialias: true
    });

renderer.setPixelRatio(
    Math.min(
        window.devicePixelRatio,
        2
    )
);

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.outputEncoding =
    THREE.sRGBEncoding;

sceneContainer.appendChild(
    renderer.domElement
);


/* =====================================================
   LIGHTS
===================================================== */

const ambient =
    new THREE.AmbientLight(
        0x77778d,
        0.8
    );

scene.add(ambient);


const moonLight =
    new THREE.DirectionalLight(
        0xaaaacb,
        1.7
    );

moonLight.position.set(
    -30,
    40,
    -40
);

scene.add(moonLight);


/* =====================================================
   MOON
===================================================== */

const moon =
    new THREE.Mesh(

        new THREE.SphereGeometry(
            6,
            32,
            32
        ),

        new THREE.MeshBasicMaterial({
            color: 0xdeddd3
        })

    );

moon.position.set(
    -30,
    34,
    -60
);

scene.add(moon);


/* =====================================================
   MOON GLOW
===================================================== */

const glow =
    new THREE.Mesh(

        new THREE.SphereGeometry(
            8,
            32,
            32
        ),

        new THREE.MeshBasicMaterial({

            color: 0x8888a8,

            transparent: true,

            opacity: 0.08,

            depthWrite: false

        })

    );

glow.position.copy(
    moon.position
);

scene.add(glow);


/* =====================================================
   STARS
===================================================== */

const starGeometry =
    new THREE.BufferGeometry();

const positions = [];

for (
    let i = 0;
    i < 1000;
    i++
) {

    positions.push(

        (Math.random() - .5) *
        240,

        15 +
        Math.random() *
        90,

        (Math.random() - .5) *
        240

    );
}

starGeometry.setAttribute(

    "position",

    new THREE.Float32BufferAttribute(
        positions,
        3
    )

);

const starMaterial =
    new THREE.PointsMaterial({

        color: 0xd8d1bd,

        size: .35

    });

const stars =
    new THREE.Points(

        starGeometry,

        starMaterial

    );

scene.add(stars);


/* =====================================================
   GROUND
===================================================== */

const ground =
    new THREE.Mesh(

        new THREE.PlaneGeometry(
            220,
            220
        ),

        new THREE.MeshStandardMaterial({

            color: 0x101116,

            roughness: 1

        })

    );

ground.rotation.x =
    -Math.PI / 2;

scene.add(ground);


/* =====================================================
   PURPLE PATH
===================================================== */

const path =
    new THREE.Mesh(

        new THREE.PlaneGeometry(
            11,
            110
        ),

        new THREE.MeshStandardMaterial({

            color: 0x282032,

            roughness: 1

        })

    );

path.rotation.x =
    -Math.PI / 2;

path.position.set(
    0,
    .02,
    30
);

scene.add(path);


/* =====================================================
   PATH STONES
===================================================== */

for (
    let i = 0;
    i < 18;
    i++
) {

    const stone =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                8,
                .12,
                4
            ),

            new THREE.MeshStandardMaterial({

                color: 0x393342

            })

        );

    stone.position.set(

        (Math.random() - .5),

        .08,

        75 -
        i * 5

    );

    scene.add(stone);
}


/* =====================================================
   ENTRANCE
===================================================== */

const entrance =
    new THREE.Group();

entrance.position.set(
    0,
    0,
    28
);

scene.add(entrance);


/* =====================================================
   TOWER
===================================================== */

function createTower(x) {

    const tower =
        new THREE.Group();


    /* tower body */

    const body =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                7,
                19,
                7
            ),

            new THREE.MeshStandardMaterial({

                color: 0x191a21,

                roughness: .9

            })

        );

    body.position.y =
        9.5;

    tower.add(body);


    /* roof */

    const roof =
        new THREE.Mesh(

            new THREE.ConeGeometry(
                5.8,
                8,
                6
            ),

            new THREE.MeshStandardMaterial({

                color: 0x0e0d13,

                roughness: .7

            })

        );

    roof.position.y =
        23;

    roof.rotation.y =
        Math.PI / 6;

    tower.add(roof);


    /* roof gold ring */

    const ring =
        new THREE.Mesh(

            new THREE.CylinderGeometry(
                6,
                6,
                .25,
                6
            ),

            new THREE.MeshStandardMaterial({

                color: 0xa57d3d,

                metalness: .8,

                roughness: .3

            })

        );

    ring.position.y =
        19;

    tower.add(ring);


    /* tower spike */

    const spike =
        new THREE.Mesh(

            new THREE.ConeGeometry(
                .4,
                3,
                5
            ),

            new THREE.MeshStandardMaterial({

                color: 0x09090d

            })

        );

    spike.position.y =
        28;

    tower.add(spike);


    /* windows */

    for (
        let i = -1;
        i <= 1;
        i++
    ) {

        const window =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    .75,
                    2.7,
                    .15
                ),

                new THREE.MeshBasicMaterial({

                    color: 0x8d6936

                })

            );

        window.position.set(

            i * 1.7,

            12,

            -3.53

        );

        tower.add(window);
    }


    tower.position.x =
        x;

    entrance.add(tower);
}


createTower(-10);
createTower(10);


/* =====================================================
   CENTRAL WALL
===================================================== */

const wall =
    new THREE.Mesh(

        new THREE.BoxGeometry(
            13,
            19,
            4
        ),

        new THREE.MeshStandardMaterial({

            color: 0x17181f,

            roughness: .9

        })

    );

wall.position.y =
    9.5;

entrance.add(wall);


/* =====================================================
   ARCH TOP
===================================================== */

const arch =
    new THREE.Mesh(

        new THREE.CylinderGeometry(
            6.5,
            6.5,
            4,
            32,
            false,
            0,
            Math.PI
        ),

        new THREE.MeshStandardMaterial({

            color: 0x17181f

        })

    );

arch.rotation.z =
    Math.PI / 2;

arch.rotation.y =
    Math.PI / 2;

arch.position.y =
    19;

entrance.add(arch);


/* =====================================================
   SIGN
===================================================== */

function makeTextTexture(
    text
) {

    const canvas =
        document.createElement(
            "canvas"
        );

    canvas.width = 1024;
    canvas.height = 256;

    const ctx =
        canvas.getContext(
            "2d"
        );

    ctx.clearRect(
        0,
        0,
        1024,
        256
    );

    ctx.textAlign =
        "center";

    ctx.textBaseline =
        "middle";

    ctx.font =
        "bold 80px Georgia";

    ctx.fillStyle =
        "#d0ad66";

    ctx.shadowColor =
        "#000000";

    ctx.shadowBlur =
        15;

    ctx.fillText(
        text,
        512,
        128
    );

    return new THREE.CanvasTexture(
        canvas
    );
}


const sign =
    new THREE.Mesh(

        new THREE.PlaneGeometry(
            11,
            2.4
        ),

        new THREE.MeshBasicMaterial({

            map:
                makeTextTexture(
                    "CTRL + Z CEMETERY"
                ),

            transparent: true

        })

    );

sign.position.set(
    0,
    15.8,
    -2.1
);

entrance.add(sign);


/* =====================================================
   GATE
===================================================== */

const leftGate =
    new THREE.Group();

const rightGate =
    new THREE.Group();


/*
    IMPORTANT:

    These are two separate doors.

    LEFT DOOR rotates LEFT.
    RIGHT DOOR rotates RIGHT.

    Therefore the gate opens
    from the middle.
*/


leftGate.position.set(
    -.1,
    0,
    -2.7
);

rightGate.position.set(
    .1,
    0,
    -2.7
);


function makeGateDoor(
    group,
    side
) {

    /* vertical bars */

    for (
        let i = 0;
        i < 8;
        i++
    ) {

        const distance =
            .35 +
            i * .65;


        const x =
            side < 0
                ? -distance
                : distance;


        const bar =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    .16,
                    10,
                    .18
                ),

                new THREE.MeshStandardMaterial({

                    color: 0x15131a,

                    metalness: .9,

                    roughness: .3

                })

            );

        bar.position.set(
            x,
            5,
            0
        );

        group.add(bar);


        /* spikes */

        const spike =
            new THREE.Mesh(

                new THREE.ConeGeometry(
                    .23,
                    1.1,
                    5
                ),

                new THREE.MeshStandardMaterial({

                    color: 0xa17b3e,

                    metalness: .8

                })

            );

        spike.position.set(
            x,
            10.5,
            0
        );

        group.add(spike);
    }


    /* horizontal bars */

    for (
        const y of [
            2.5,
            5,
            7.5
        ]
    ) {

        const horizontal =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    5.2,
                    .18,
                    .25
                ),

                new THREE.MeshStandardMaterial({

                    color: 0x24202a,

                    metalness: .8

                })

            );

        horizontal.position.set(

            side < 0
                ? -2
                : 2,

            y,

            0

        );

        group.add(
            horizontal
        );
    }
}


makeGateDoor(
    leftGate,
    -1
);

makeGateDoor(
    rightGate,
    1
);


entrance.add(
    leftGate
);

entrance.add(
    rightGate
);


/* =====================================================
   GOLD GATE HANDLES
===================================================== */

function makeHandle(x) {

    const handle =
        new THREE.Mesh(

            new THREE.TorusGeometry(
                .5,
                .12,
                12,
                24
            ),

            new THREE.MeshStandardMaterial({

                color: 0xc89d54,

                metalness: .9,

                roughness: .25

            })

        );

    handle.rotation.y =
        Math.PI / 2;

    handle.position.set(
        x,
        5.4,
        -3
    );

    entrance.add(handle);
}

makeHandle(-.65);
makeHandle(.65);


/* =====================================================
   TORCHES
===================================================== */

const torches = [];


function makeTorch(x) {

    const stick =
        new THREE.Mesh(

            new THREE.CylinderGeometry(
                .18,
                .25,
                2.4,
                8
            ),

            new THREE.MeshStandardMaterial({

                color: 0x171217

            })

        );

    stick.position.set(
        x,
        7,
        -3
    );

    entrance.add(stick);


    const flame =
        new THREE.Mesh(

            new THREE.ConeGeometry(
                .42,
                1.3,
                8
            ),

            new THREE.MeshBasicMaterial({

                color: 0xff9a32

            })

        );

    flame.position.set(
        x,
        8.8,
        -3
    );

    entrance.add(flame);


    const light =
        new THREE.PointLight(
            0xff8b32,
            2,
            20
        );

    light.position.set(
        x,
        8.5,
        -3
    );

    entrance.add(light);


    torches.push({

        flame,
        light

    });
}


makeTorch(-7);
makeTorch(7);


/* =====================================================
   TOMBSTONES
===================================================== */

const tombs = [];


const oldFiles = [

    "final_FINAL_v7.pdf",
    "assignment_old.docx",
    "broken_code.py",
    "presentation_final.pptx",
    "project_backup.zip",
    "old_resume.pdf",
    "website_old.html",
    "database_backup.sql",
    "notes_final.txt",
    "image_old.png",
    "final_project_REAL.pdf",
    "forgotten_script.js",
    "prototype_v1.zip",
    "unused_design.fig",
    "README_old.md",
    "test_file.py",
    "old_database.db",
    "presentation_backup.pptx",
    "final_final.docx",
    "old_project.zip",
    "unused_code.js"
];


const causes = [

    "Never opened again.",
    "Replaced by a newer version.",
    "Lost in the Downloads folder.",
    "Victim of Ctrl + Z.",
    "Deleted after saying 'I'll need this later.'",
    "Killed by a newer FINAL_FINAL file.",
    "Forgotten after the final submission.",
    "Buried beneath years of backups.",
    "Abandoned after one successful compile.",
    "No longer compatible with reality."

];


function tombShape() {

    const shape =
        new THREE.Shape();

    shape.moveTo(
        -1.5,
        0
    );

    shape.lineTo(
        -1.5,
        2
    );

    shape.absarc(
        0,
        2,
        1.5,
        Math.PI,
        0,
        false
    );

    shape.lineTo(
        1.5,
        0
    );

    shape.lineTo(
        -1.5,
        0
    );

    return shape;
}


function createTomb(
    data,
    x,
    z,
    rotation
) {

    const group =
        new THREE.Group();


    /* stone */

    const stone =
        new THREE.Mesh(

            new THREE.ExtrudeGeometry(

                tombShape(),

                {

                    depth: 1.2,

                    bevelEnabled: true,

                    bevelSegments: 2,

                    bevelSize: .12,

                    bevelThickness: .1

                }

            ),

            new THREE.MeshStandardMaterial({

                color:
                    data.isNew
                        ? 0x77707b
                        : 0x4b4b52,

                roughness: .9

            })

        );

    stone.rotation.y =
        Math.PI;

    stone.position.z =
        -.6;

    group.add(stone);


    /* cross */

    const vertical =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                .22,
                2.1,
                .18
            ),

            new THREE.MeshStandardMaterial({

                color: 0x29272d

            })

        );

    vertical.position.set(
        0,
        2.3,
        -.7
    );

    group.add(vertical);


    const horizontal =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                1.1,
                .22,
                .18
            ),

            new THREE.MeshStandardMaterial({

                color: 0x29272d

            })

        );

    horizontal.position.set(
        0,
        2.55,
        -.7
    );

    group.add(horizontal);


    /* name */

    const label =
        new THREE.Mesh(

            new THREE.PlaneGeometry(
                2.7,
                .65
            ),

            new THREE.MeshBasicMaterial({

                map:
                    makeTextTexture(
                        shorten(
                            data.name,
                            18
                        )
                    ),

                transparent: true

            })

        );

    label.position.set(
        0,
        1,
        -.7
    );

    label.rotation.y =
        Math.PI;

    label.scale.set(
        .35,
        .35,
        .35
    );

    group.add(label);


    group.userData =
        data;

    group.userData.isTomb =
        true;


    group.position.set(
        x,
        0,
        z
    );

    group.rotation.y =
        rotation;


    scene.add(group);

    tombs.push(group);

    return group;
}


/* =====================================================
   OLD RANDOM TOMBS
===================================================== */

for (
    let i = 0;
    i < oldFiles.length;
    i++
) {

    let x;
    let z;


    do {

        x =
            (Math.random() - .5) *
            100;

        z =
            Math.random() *
            100 -
            10;

    } while (

        Math.abs(x) < 10 &&
        z > 10

    );


    createTomb(

        {

            name:
                oldFiles[i],

            size:
                1000 +
                Math.random() *
                9000000,

            type:
                "Archived file",

            date:
                randomDate(),

            cause:
                causes[
                    Math.floor(
                        Math.random() *
                        causes.length
                    )
                ],

            isNew: false

        },

        x,

        z,

        Math.random() *
        Math.PI *
        2

    );
}


graveCount.textContent =
    tombs.length;


/* =====================================================
   BURY NEW FILE
===================================================== */

fileInput.addEventListener(
    "change",
    function () {

        const files =
            Array.from(
                fileInput.files
            );


        files.forEach(
            buryFile
        );


        fileInput.value =
            "";

    }
);


function buryFile(file) {

    const data = {

        name:
            file.name,

        size:
            file.size,

        type:
            file.type ||
            "Unknown file",

        date:
            new Date()
                .toLocaleString(),

        cause:
            causes[
                Math.floor(
                    Math.random() *
                    causes.length
                )
            ],

        isNew: true

    };


    let x;
    let z;


    do {

        x =
            (Math.random() - .5) *
            90;

        z =
            Math.random() *
            90 -
            5;

    } while (

        Math.abs(x) < 9 &&
        z > 10

    );


    const tomb =
        createTomb(

            data,

            x,

            z,

            Math.random() *
            Math.PI *
            2

        );


    tomb.scale.set(
        .01,
        .01,
        .01
    );


    tomb.userData.spawnTime =
        performance.now();


    graveCount.textContent =
        tombs.length;


    alert(
        "⚰ FILE BURIED\n\n" +
        file.name +
        "\n\nA new tomb has appeared."
    );
}


/* =====================================================
   NEW TOMB ANIMATION
===================================================== */

function animateTombs() {

    const now =
        performance.now();


    tombs.forEach(
        tomb => {

            if (
                tomb.userData.spawnTime
            ) {

                const progress =
                    Math.min(

                        (
                            now -
                            tomb.userData.spawnTime
                        ) / 800,

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


                if (
                    progress >= 1
                ) {

                    delete tomb.userData.spawnTime;

                }

            }

        }
    );
}


/* =====================================================
   CAMERA
===================================================== */

let yaw = 0;

let pitch = -0.08;

let cameraDistance = 52;

const cameraTarget =
    new THREE.Vector3(
        0,
        6,
        28
    );


let dragging = false;

let lastX = 0;

let lastY = 0;


/* =====================================================
   MOUSE DRAG
===================================================== */

renderer.domElement.addEventListener(
    "pointerdown",
    function (event) {

        dragging = true;

        lastX =
            event.clientX;

        lastY =
            event.clientY;

        renderer.domElement.setPointerCapture(
            event.pointerId
        );
    }
);


renderer.domElement.addEventListener(
    "pointermove",
    function (event) {

        if (
            !dragging
        ) return;


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
            dx * .004;

        pitch -=
            dy * .003;


        pitch =
            Math.max(
                -.8,
                Math.min(
                    .7,
                    pitch
                )
            );
    }
);


renderer.domElement.addEventListener(
    "pointerup",
    function () {

        dragging = false;

    }
);


/* =====================================================
   ZOOM
===================================================== */

renderer.domElement.addEventListener(
    "wheel",
    function (event) {

        event.preventDefault();


        cameraDistance +=
            event.deltaY * .04;


        cameraDistance =
            Math.max(
                6,
                Math.min(
                    110,
                    cameraDistance
                )
            );

    },
    {
        passive: false
    }
);


/* =====================================================
   CAMERA UPDATE
===================================================== */

function updateCamera() {

    const horizontal =
        Math.cos(pitch) *
        cameraDistance;


    camera.position.x =
        cameraTarget.x +
        Math.sin(yaw) *
        horizontal;


    camera.position.y =
        cameraTarget.y +
        Math.sin(pitch) *
        cameraDistance;


    camera.position.z =
        cameraTarget.z +
        Math.cos(yaw) *
        horizontal;


    camera.lookAt(
        cameraTarget
    );
}


/* =====================================================
   GATE
===================================================== */

let gateProgress = 0;


function updateGate() {

    const dx =
        camera.position.x -
        entrance.position.x;


    const dz =
        camera.position.z -
        entrance.position.z;


    const distance =
        Math.sqrt(
            dx * dx +
            dz * dz
        );


    /*
       MORE THAN 42
       = CLOSED

       42 -> 12
       = OPENING

       LESS THAN 12
       = FULLY OPEN
    */


    let desired = 0;


    if (
        distance < 42
    ) {

        desired =
            1 -
            (
                Math.max(
                    0,
                    distance - 12
                ) / 30
            );

    }


    desired =
        Math.max(
            0,
            Math.min(
                1,
                desired
            )
        );


    /* smooth movement */

    gateProgress +=
        (
            desired -
            gateProgress
        ) * .035;


    const smooth =
        gateProgress *
        gateProgress *
        (
            3 -
            2 *
            gateProgress
        );


    /*
       OPEN FROM CENTER
    */

    leftGate.rotation.y =
        -smooth *
        Math.PI *
        .75;


    rightGate.rotation.y =
        smooth *
        Math.PI *
        .75;


    /* hide title */

    if (
        distance < 38
    ) {

        welcome.classList.add(
            "hidden"
        );

    } else {

        welcome.classList.remove(
            "hidden"
        );

    }
}


/* =====================================================
   TOMB CLICK
===================================================== */

const raycaster =
    new THREE.Raycaster();

const mouse =
    new THREE.Vector2();


renderer.domElement.addEventListener(
    "click",
    function (event) {

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


        const hits =
            raycaster.intersectObjects(
                tombs,
                true
            );


        if (
            hits.length === 0
        ) return;


        let selected =
            hits[0].object;


        while (

            selected &&
            !selected.userData.isTomb

        ) {

            selected =
                selected.parent;

        }


        if (
            !selected
        ) return;


        openMemorial(
            selected
        );
    }
);


/* =====================================================
   MEMORIAL
===================================================== */

let selectedTomb =
    null;


function openMemorial(
    tomb
) {

    selectedTomb =
        tomb;


    const data =
        tomb.userData;


    memorialContent.innerHTML = `

        <div class="memorial-heading">
            DIGITAL MEMORIAL
        </div>

        <div class="memorial-name">
            ${safe(data.name)}
        </div>

        <div class="memorial-row">

            <strong>
                DATE OF DEATH
            </strong>

            ${safe(data.date)}

        </div>

        <div class="memorial-row">

            <strong>
                FILE SIZE
            </strong>

            ${formatSize(data.size)}

        </div>

        <div class="memorial-row">

            <strong>
                FILE TYPE
            </strong>

            ${safe(data.type)}

        </div>

        <div class="memorial-row">

            <strong>
                CAUSE OF DEATH
            </strong>

            <div class="cause">
                "${safe(data.cause)}"
            </div>

        </div>
    `;


    memorialPanel.classList.add(
        "open"
    );
}


/* =====================================================
   CLOSE MEMORIAL
===================================================== */

document
    .getElementById(
        "closeMemorial"
    )
    .addEventListener(
        "click",
        function () {

            memorialPanel.classList.remove(
                "open"
            );

        }
    );


/* =====================================================
   OPEN VISITOR
===================================================== */

document
    .getElementById(
        "openVisitorPanel"
    )
    .addEventListener(
        "click",
        function () {

            if (
                !selectedTomb
            ) return;


            memorialPanel.classList.remove(
                "open"
            );


            openVisitor(
                selectedTomb
            );

        }
    );


document
    .getElementById(
        "visitorButton"
    )
    .addEventListener(
        "click",
        function () {

            if (
                selectedTomb
            ) {

                openVisitor(
                    selectedTomb
                );

            } else {

                alert(
                    "Click a tomb first."
                );

            }

        }
    );


document
    .getElementById(
        "closeVisitorPanel"
    )
    .addEventListener(
        "click",
        function () {

            visitorPanel.classList.remove(
                "open"
            );

        }
    );


function openVisitor(
    tomb
) {

    selectedTomb =
        tomb;


    selectedTombName.textContent =
        tomb.userData.name;


    updateVisitor();


    visitorPanel.classList.add(
        "open"
    );
}


/* =====================================================
   ROSE
===================================================== */

document
    .getElementById(
        "roseButton"
    )
    .addEventListener(
        "click",
        function () {

            if (
                !selectedTomb
            ) return;


            const key =
                getKey(
                    selectedTomb
                );


            const data =
                getData(
                    key
                );


            data.roses++;


            saveData(
                key,
                data
            );


            updateVisitor();

        }
    );


/* =====================================================
   COMMENT
===================================================== */

document
    .getElementById(
        "commentButton"
    )
    .addEventListener(
        "click",
        function () {

            if (
                !selectedTomb
            ) return;


            const text =
                commentInput.value.trim();


            if (
                !text
            ) return;


            const key =
                getKey(
                    selectedTomb
                );


            const data =
                getData(
                    key
                );


            data.comments.push(
                text
            );


            saveData(
                key,
                data
            );


            commentInput.value =
                "";


            updateVisitor();

        }
    );


/* =====================================================
   VISITOR DATA
===================================================== */

function getKey(
    tomb
) {

    return (
        "ctrlz_" +
        encodeURIComponent(
            tomb.userData.name
        )
    );
}


function getData(
    key
) {

    try {

        const saved =
            localStorage.getItem(
                key
            );


        if (
            saved
        ) {

            return JSON.parse(
                saved
            );

        }

    } catch (error) {

        console.log(
            error
        );

    }


    return {

        roses: 0,

        comments: []

    };
}


function saveData(
    key,
    data
) {

    try {

        localStorage.setItem(
            key,
            JSON.stringify(
                data
            )
        );

    } catch (error) {

        console.log(
            error
        );

    }
}


function updateVisitor() {

    if (
        !selectedTomb
    ) return;


    const data =
        getData(
            getKey(
                selectedTomb
            )
        );


    roseCount.textContent =
        "🌹 " +
        data.roses;


    comments.innerHTML =
        "";


    data.comments.forEach(
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

            comments.appendChild(
                div
            );

        }
    );
}


/* =====================================================
   FIRE FLIES
===================================================== */

const fireflies = [];


for (
    let i = 0;
    i < 120;
    i++
) {

    const firefly =
        new THREE.Mesh(

            new THREE.SphereGeometry(
                .07,
                8,
                8
            ),

            new THREE.MeshBasicMaterial({

                color: 0xd8b36a

            })

        );


    firefly.position.set(

        (Math.random() - .5) *
        130,

        1 +
        Math.random() *
        12,

        Math.random() *
        100 -
        20

    );


    firefly.userData.offset =
        Math.random() *
        Math.PI *
        2;


    fireflies.push(
        firefly
    );

    scene.add(
        firefly
    );
}


/* =====================================================
   ANIMATION
===================================================== */

const clock =
    new THREE.Clock();


function animate() {

    requestAnimationFrame(
        animate
    );


    const time =
        clock.getElapsedTime();


    updateCamera();

    updateGate();

    animateTombs();


    /* fireflies */

    fireflies.forEach(
        function (
            firefly,
            index
        ) {

            firefly.position.y +=

                Math.sin(
                    time * 1.2 +
                    firefly.userData.offset
                ) * .002;

        }
    );


    /* torch animation */

    torches.forEach(
        function (
            torch,
            index
        ) {

            const flicker =
                Math.sin(
                    time * 12 +
                    index
                ) * .2;


            torch.light.intensity =
                1.8 +
                flicker;


            torch.flame.scale.y =
                1 +
                flicker * .2;

        }
    );


    stars.rotation.y =
        time * .001;


    renderer.render(
        scene,
        camera
    );
}


animate();


/* =====================================================
   RESIZE
===================================================== */

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


/* =====================================================
   HELPERS
===================================================== */

function formatSize(
    bytes
) {

    if (
        bytes < 1024
    ) {

        return bytes +
            " B";

    }


    if (
        bytes < 1024 * 1024
    ) {

        return (
            bytes /
            1024
        ).toFixed(1) +
        " KB";

    }


    return (
        bytes /
        (1024 * 1024)
    ).toFixed(1) +
    " MB";
}


function shorten(
    text,
    max
) {

    if (
        text.length <= max
    ) {

        return text;

    }


    return (
        text.substring(
            0,
            max - 3
        ) +
        "..."
    );
}


function randomDate() {

    const date =
        new Date();


    date.setDate(

        date.getDate() -
        Math.floor(
            Math.random() *
            1000
        )

    );


    return date.toLocaleDateString();
}


function safe(
    value
) {

    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );
}


console.log(
    "CTRL + Z CEMETERY READY"
);// Tombstone click interaction
const tombstones = document.querySelectorAll('.tombstone');
tombstones.forEach(stone => {
  stone.addEventListener('click', () => {
    const info = stone.querySelector('.info');
    info.style.display = info.style.display === 'block' ? 'none' : 'block';
  });
});

// Generate random stars
const starsContainer = document.querySelector('.stars');
for (let i = 0; i < 100; i++) {
  const star = document.createElement('div');
  star.classList.add('star');
  star.style.top = Math.random() * window.innerHeight + 'px';
  star.style.left = Math.random() * window.innerWidth + 'px';
  starsContainer.appendChild(star);
}
