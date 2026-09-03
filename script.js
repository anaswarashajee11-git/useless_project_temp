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
            text-align:center;
        ">
            <div>
                <h1>⚠️ Three.js failed to load</h1>
                <p>Please refresh the page.</p>
            </div>
        </div>
    `;

    throw new Error("Three.js not loaded");
}


// ======================================================
// BASIC SETUP
// ======================================================

const sceneContainer =
    document.getElementById("scene");

const scene =
    new THREE.Scene();

scene.background =
    new THREE.Color(0x020207);

scene.fog =
    new THREE.FogExp2(
        0x08070d,
        0.008
    );


// ======================================================
// CAMERA
// ======================================================

const camera =
    new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        500
    );

camera.position.set(
    0,
    7,
    70
);


// ======================================================
// RENDERER
// ======================================================

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
    Math.min(window.devicePixelRatio, 2)
);

renderer.shadowMap.enabled = true;

renderer.shadowMap.type =
    THREE.PCFSoftShadowMap;

sceneContainer.appendChild(renderer.domElement);


// ======================================================
// LIGHTING
// ======================================================

const ambientLight =
    new THREE.AmbientLight(
        0x55505e,
        0.75
    );

scene.add(ambientLight);


const moonLight =
    new THREE.DirectionalLight(
        0x9a9ac7,
        1.4
    );

moonLight.position.set(
    -30,
    60,
    20
);

moonLight.castShadow = true;

scene.add(moonLight);


// ======================================================
// MOON
// ======================================================

const moon =
    new THREE.Mesh(
        new THREE.SphereGeometry(
            7,
            32,
            32
        ),

        new THREE.MeshBasicMaterial({
            color: 0xe6e0d0
        })
    );

moon.position.set(
    -32,
    48,
    5
);

scene.add(moon);


// Moon glow
const moonGlow =
    new THREE.Mesh(
        new THREE.SphereGeometry(
            10,
            32,
            32
        ),

        new THREE.MeshBasicMaterial({
            color: 0x77779d,
            transparent: true,
            opacity: 0.12
        })
    );

moonGlow.position.copy(
    moon.position
);

scene.add(moonGlow);


// ======================================================
// STARS
// ======================================================

const starGeometry =
    new THREE.BufferGeometry();

const starPositions = [];

for (let i = 0; i < 1200; i++) {

    const x =
        (Math.random() - 0.5) * 300;

    const y =
        25 + Math.random() * 110;

    const z =
        (Math.random() - 0.5) * 260;

    starPositions.push(
        x,
        y,
        z
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
        color: 0xd8d2c3,
        size: 0.35,
        transparent: true,
        opacity: 0.8
    });

const stars =
    new THREE.Points(
        starGeometry,
        starMaterial
    );

scene.add(stars);


// ======================================================
// GROUND
// ======================================================

const groundMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x101015,
        roughness: 1
    });

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

ground.position.y = 0;

ground.receiveShadow = true;

scene.add(ground);


// ======================================================
// PURPLE STONE PATH
// ======================================================

const pathMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x292139,
        roughness: 0.95
    });

const path =
    new THREE.Mesh(
        new THREE.PlaneGeometry(
            9,
            120
        ),
        pathMaterial
    );

path.rotation.x =
    -Math.PI / 2;

path.position.set(
    0,
    0.025,
    30
);

scene.add(path);


// ======================================================
// PATH STONES
// ======================================================

for (let i = 0; i < 25; i++) {

    const stone =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                7.5,
                0.12,
                3
            ),

            new THREE.MeshStandardMaterial({
                color: 0x3a304b,
                roughness: 1
            })
        );

    stone.position.set(
        (Math.random() - 0.5) * 0.7,
        0.09,
        80 - i * 4
    );

    stone.rotation.y =
        (Math.random() - 0.5) * 0.08;

    scene.add(stone);
}


// ======================================================
// ENTRANCE
// ======================================================

const entrance =
    new THREE.Group();

entrance.position.set(
    0,
    0,
    28
);

scene.add(entrance);


// ======================================================
// MATERIALS
// ======================================================

const wallMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x25222b,
        roughness: 0.85
    });

const darkMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x0c0b10,
        roughness: 0.7
    });

const roofMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x09080d,
        roughness: 0.9
    });

const goldMaterial =
    new THREE.MeshStandardMaterial({
        color: 0xc5a04b,
        metalness: 0.85,
        roughness: 0.25
    });


// ======================================================
// TOWERS
// ======================================================

function createTower(x) {

    const tower =
        new THREE.Group();

    tower.position.set(
        x,
        6,
        0
    );


    // Tower body
    const body =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                7,
                12,
                7
            ),
            wallMaterial
        );

    body.castShadow = true;

    body.receiveShadow = true;

    tower.add(body);


    // Tower roof
    const roof =
        new THREE.Mesh(
            new THREE.ConeGeometry(
                5.2,
                7,
                4
            ),
            roofMaterial
        );

    roof.position.y = 9.5;

    roof.rotation.y =
        Math.PI / 4;

    roof.castShadow = true;

    tower.add(roof);


    // Tower window
    const windowMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x171329,
            emissive: 0x241b4a,
            emissiveIntensity: 0.8
        });

    const window =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                1.4,
                2.4,
                0.2
            ),
            windowMaterial
        );

    window.position.set(
        0,
        2,
        -3.55
    );

    tower.add(window);


    // Gold vertical trim
    const trim =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.18,
                11,
                0.18
            ),
            goldMaterial
        );

    trim.position.set(
        -2.8,
        0,
        -3.55
    );

    tower.add(trim);


    entrance.add(tower);
}

createTower(-9);
createTower(9);


// ======================================================
// MAIN WALL
// ======================================================

const wall =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            12,
            10,
            1.5
        ),
        wallMaterial
    );

wall.position.set(
    0,
    5,
    0
);

wall.castShadow = true;

entrance.add(wall);


// ======================================================
// ARCH
// ======================================================

const arch =
    new THREE.Mesh(
        new THREE.TorusGeometry(
            4.8,
            0.65,
            12,
            32,
            Math.PI
        ),
        goldMaterial
    );

arch.rotation.z =
    Math.PI;

arch.position.set(
    0,
    7.2,
    -0.9
);

entrance.add(arch);


// ======================================================
// GATE
// NORMAL BUNGALOW DOUBLE GATE
// HINGES ON OUTER SIDES
// ======================================================

const gateMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x121016,
        metalness: 0.75,
        roughness: 0.35
    });


// ------------------------------------------
// LEFT GATE HINGE
// ------------------------------------------

const leftGate =
    new THREE.Group();

leftGate.position.set(
    -5.7,
    4.2,
    -1.0
);

entrance.add(leftGate);


// Left door
const leftDoor =
    new THREE.Group();

leftGate.add(leftDoor);


// Main left panel
const leftPanel =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            5.7,
            5.8,
            0.3
        ),
        gateMaterial
    );

leftPanel.position.x = 2.85;

leftDoor.add(leftPanel);


// Left vertical bars
for (let i = 0; i < 8; i++) {

    const bar =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.14,
                5.8,
                0.35
            ),
            goldMaterial
        );

    bar.position.set(
        0.4 + i * 0.7,
        0,
        -0.22
    );

    leftDoor.add(bar);
}


// Left horizontal bars
for (let y = -2; y <= 2; y += 1.3) {

    const bar =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                5.7,
                0.13,
                0.4
            ),
            goldMaterial
        );

    bar.position.set(
        2.85,
        y,
        -0.25
    );

    leftDoor.add(bar);
}


// ------------------------------------------
// RIGHT GATE HINGE
// ------------------------------------------

const rightGate =
    new THREE.Group();

rightGate.position.set(
    5.7,
    4.2,
    -1.0
);

entrance.add(rightGate);


// Right door
const rightDoor =
    new THREE.Group();

rightGate.add(rightDoor);


// Main right panel
const rightPanel =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            5.7,
            5.8,
            0.3
        ),
        gateMaterial
    );

rightPanel.position.x = -2.85;

rightDoor.add(rightPanel);


// Right vertical bars
for (let i = 0; i < 8; i++) {

    const bar =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.14,
                5.8,
                0.35
            ),
            goldMaterial
        );

    bar.position.set(
        -0.4 - i * 0.7,
        0,
        -0.22
    );

    rightDoor.add(bar);
}


// Right horizontal bars
for (let y = -2; y <= 2; y += 1.3) {

    const bar =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                5.7,
                0.13,
                0.4
            ),
            goldMaterial
        );

    bar.position.set(
        -2.85,
        y,
        -0.25
    );

    rightDoor.add(bar);
}


// ======================================================
// GATE CENTER DECORATION
// ======================================================

const centerPost =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            0.18,
            5.8,
            0.5
        ),
        goldMaterial
    );

centerPost.position.set(
    0,
    4.2,
    -1.3
);

entrance.add(centerPost);


// ======================================================
// TORCHES
// ======================================================

function createTorch(x) {

    const torch =
        new THREE.Group();

    torch.position.set(
        x,
        5.5,
        -2
    );


    const holder =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.12,
                0.12,
                1.3,
                8
            ),
            goldMaterial
        );

    torch.add(holder);


    const flame =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.3,
                12,
                12
            ),
            new THREE.MeshBasicMaterial({
                color: 0xff8b32
            })
        );

    flame.position.y =
        0.8;

    torch.add(flame);


    const light =
        new THREE.PointLight(
            0xff7a24,
            2,
            12
        );

    light.position.y =
        0.8;

    torch.add(light);


    entrance.add(torch);

    return light;
}

const torchLight1 =
    createTorch(-6.5);

const torchLight2 =
    createTorch(6.5);


// ======================================================
// SIGN
// ======================================================

function createTextTexture(
    text
) {

    const canvas =
        document.createElement("canvas");

    canvas.width = 1024;
    canvas.height = 256;

    const ctx =
        canvas.getContext("2d");

    ctx.fillStyle =
        "#09080c";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.strokeStyle =
        "#c5a04b";

    ctx.lineWidth = 8;

    ctx.strokeRect(
        10,
        10,
        canvas.width - 20,
        canvas.height - 20
    );

    ctx.fillStyle =
        "#d5b763";

    ctx.font =
        "bold 72px Georgia";

    ctx.textAlign =
        "center";

    ctx.textBaseline =
        "middle";

    ctx.fillText(
        text,
        canvas.width / 2,
        canvas.height / 2
    );

    return new THREE.CanvasTexture(
        canvas
    );
}


const sign =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            9,
            2.2,
            0.25
        ),

        new THREE.MeshStandardMaterial({
            map:
                createTextTexture(
                    "CTRL + Z CEMETERY"
                )
        })
    );

sign.position.set(
    0,
    12.5,
    -3.6
);

entrance.add(sign);


// ======================================================
// TOMBSTONES
// ======================================================

const oldTombs = [];

const tombNames = [

    "final_FINAL_v7.pdf",

    "assignment_old.docx",

    "broken_code.py",

    "project_REAL_final.zip",

    "presentation_last.pptx",

    "notes_old.txt",

    "website_backup.html",

    "image_copy_17.png",

    "resume_old.pdf",

    "homework_final.docx",

    "database_backup.sql",

    "untitled_project.zip",

    "old_design.fig",

    "forgotten_script.js",

    "final_final_REAL.pdf"

];


function createTomb(
    name,
    data,
    isNew = false
) {

    const group =
        new THREE.Group();


    // --------------------------------------
    // Tomb shape
    // --------------------------------------

    const shape =
        new THREE.Shape();

    shape.moveTo(
        -1.5,
        -1.7
    );

    shape.lineTo(
        -1.5,
        1
    );

    shape.quadraticCurveTo(
        -1.5,
        2.3,
        0,
        2.3
    );

    shape.quadraticCurveTo(
        1.5,
        2.3,
        1.5,
        1
    );

    shape.lineTo(
        1.5,
        -1.7
    );

    shape.lineTo(
        -1.5,
        -1.7
    );


    const geometry =
        new THREE.ExtrudeGeometry(
            shape,
            {
                depth: 0.45,
                bevelEnabled: true,
                bevelThickness: 0.12,
                bevelSize: 0.12,
                bevelSegments: 2
            }
        );


    const material =
        new THREE.MeshStandardMaterial({
            color:
                isNew
                    ? 0x3d3444
                    : 0x29262d,

            roughness: 0.9
        });


    const stone =
        new THREE.Mesh(
            geometry,
            material
        );

    stone.rotation.y =
        Math.PI;

    stone.castShadow = true;

    stone.receiveShadow = true;

    group.add(stone);


    // --------------------------------------
    // Cross
    // --------------------------------------

    const crossMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x17141b,
            metalness: 0.3,
            roughness: 0.8
        });


    const crossVertical =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.3,
                2.2,
                0.3
            ),
            crossMaterial
        );

    crossVertical.position.set(
        0,
        2.2,
        -0.35
    );

    group.add(crossVertical);


    const crossHorizontal =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                1.2,
                0.3,
                0.3
            ),
            crossMaterial
        );

    crossHorizontal.position.set(
        0,
        2.4,
        -0.35
    );

    group.add(crossHorizontal);


    // --------------------------------------
    // Data
    // --------------------------------------

    group.userData = {

        id:
            data?.id ||
            "tomb_" +
            Date.now() +
            "_" +
            Math.random(),

        name:
            name,

        size:
            data?.size ||
            "Unknown",

        type:
            data?.type ||
            "Digital file",

        date:
            data?.date ||
            "Before the cemetery was created",

        cause:
            data?.cause ||
            "Forgotten and never opened again."

    };


    // --------------------------------------
    // Position
    // --------------------------------------

    let x;
    let z;


    do {

        x =
            (Math.random() - 0.5) * 75;

        z =
            5 + Math.random() * 75;

    } while (
        Math.abs(x) < 8 &&
        z < 40
    );


    group.position.set(
        x,
        0,
        z
    );


    group.rotation.y =
        (Math.random() - 0.5) * 0.5;


    // New tomb animation
    if (isNew) {

        group.scale.set(
            0.01,
            0.01,
            0.01
        );

        group.userData.isGrowing =
            true;
    }


    scene.add(group);

    oldTombs.push(group);

    return group;
}


// ======================================================
// OLD TOMBS
// ======================================================

for (let i = 0; i < 25; i++) {

    createTomb(
        tombNames[
            i % tombNames.length
        ],
        {
            date:
                "Buried long ago",

            cause:
                [
                    "Replaced by a newer version.",
                    "Never opened again.",
                    "Deleted after deadline.",
                    "Lost in the Downloads folder.",
                    "Killed by Ctrl + Z.",
                    "Forgotten forever.",
                    "Corrupted beyond repair."
                ][
                    Math.floor(
                        Math.random() * 7
                    )
                ]
        }
    );
}


// ======================================================
// FILE BURIAL
// ======================================================

const fileInput =
    document.getElementById(
        "fileInput"
    );

const graveCount =
    document.getElementById(
        "graveCount"
    );


let buriedFiles = 25;


graveCount.textContent =
    buriedFiles;


fileInput.addEventListener(
    "change",
    function () {

        const files =
            Array.from(
                fileInput.files
            );

        files.forEach(
            file => {

                const causes = [

                    "Never opened again.",

                    "Replaced by a newer version.",

                    "Forgotten in Downloads.",

                    "Deadline claimed another victim.",

                    "Deleted by mistake.",

                    "Too many revisions.",

                    "Final_final_FINAL was not final.",

                    "Corrupted beyond repair."

                ];


                const tomb =
                    createTomb(

                        file.name,

                        {

                            id:
                                "file_" +
                                Date.now(),

                            size:
                                formatSize(
                                    file.size
                                ),

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
                                ]

                        },

                        true

                    );


                buriedFiles++;

                graveCount.textContent =
                    buriedFiles;
            }
        );


        fileInput.value = "";
    }
);


// ======================================================
// FORMAT FILE SIZE
// ======================================================

function formatSize(bytes) {

    if (bytes < 1024)
        return bytes + " B";

    if (bytes < 1024 * 1024)
        return (
            (bytes / 1024).toFixed(1) +
            " KB"
        );

    if (
        bytes <
        1024 * 1024 * 1024
    )
        return (
            (bytes /
                (1024 * 1024)
            ).toFixed(1) +
            " MB"
        );

    return (
        (
            bytes /
            (1024 * 1024 * 1024)
        ).toFixed(1) +
        " GB"
    );
}


// ======================================================
// CAMERA CONTROLS
// ======================================================

let isDragging = false;

let previousMouseX = 0;
let previousMouseY = 0;

let yaw = 0;
let pitch = 0;


renderer.domElement.addEventListener(
    "pointerdown",
    function (event) {

        isDragging = true;

        previousMouseX =
            event.clientX;

        previousMouseY =
            event.clientY;

        renderer.domElement.setPointerCapture(
            event.pointerId
        );
    }
);


renderer.domElement.addEventListener(
    "pointermove",
    function (event) {

        if (!isDragging)
            return;


        const dx =
            event.clientX -
            previousMouseX;

        const dy =
            event.clientY -
            previousMouseY;


        previousMouseX =
            event.clientX;

        previousMouseY =
            event.clientY;


        yaw -=
            dx * 0.003;

        pitch -=
            dy * 0.002;


        pitch =
            Math.max(
                -0.5,
                Math.min(
                    0.6,
                    pitch
                )
            );
    }
);


renderer.domElement.addEventListener(
    "pointerup",
    function () {

        isDragging = false;
    }
);


// ======================================================
// SCROLL MOVEMENT
// ======================================================

renderer.domElement.addEventListener(
    "wheel",
    function (event) {

        const forward =
            new THREE.Vector3(
                Math.sin(yaw),
                0,
                Math.cos(yaw)
            );


        camera.position.addScaledVector(
            forward,
            event.deltaY * 0.035
        );


        camera.position.z =
            Math.max(
                -20,
                Math.min(
                    110,
                    camera.position.z
                )
            );

        camera.position.x =
            Math.max(
                -65,
                Math.min(
                    65,
                    camera.position.x
                )
            );
    },
    {
        passive: true
    }
);


// ======================================================
// GATE OPENING
// ======================================================

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


    let target = 0;


    // Completely closed
    if (distance > 38) {

        target = 0;

    }

    // Gradually opens
    else if (distance > 12) {

        target =
            1 -
            (
                (distance - 12) /
                26
            );

    }

    // Fully open
    else {

        target = 1;
    }


    // Smooth gate movement
    gateProgress +=
        (
            target -
            gateProgress
        ) * 0.035;


    // Smooth easing
    const eased =
        gateProgress *
        gateProgress *
        (
            3 -
            2 * gateProgress
        );


    // --------------------------------------
    // LEFT DOOR
    // Hinged on LEFT pillar
    // Opens outward LEFT
    // --------------------------------------

    leftGate.rotation.y =
        -eased *
        Math.PI *
        0.72;


    // --------------------------------------
    // RIGHT DOOR
    // Hinged on RIGHT pillar
    // Opens outward RIGHT
    // --------------------------------------

    rightGate.rotation.y =
        eased *
        Math.PI *
        0.72;


    // Hide welcome when approaching
    const welcome =
        document.getElementById(
            "welcome"
        );

    if (distance < 35) {

        welcome.style.opacity = "0";

    } else {

        welcome.style.opacity = "1";
    }
}


// ======================================================
// TOMBSTONE CLICK
// ======================================================

const raycaster =
    new THREE.Raycaster();

const mouse =
    new THREE.Vector2();


let selectedTomb = null;


renderer.domElement.addEventListener(
    "click",
    function (event) {

        mouse.x =
            (event.clientX /
                window.innerWidth) *
                2 -
            1;

        mouse.y =
            -(event.clientY /
                window.innerHeight) *
                2 +
            1;


        raycaster.setFromCamera(
            mouse,
            camera
        );


        const intersects =
            raycaster.intersectObjects(
                oldTombs,
                true
            );


        if (
            intersects.length === 0
        ) {
            return;
        }


        let object =
            intersects[0].object;


        while (
            object &&
            !oldTombs.includes(object)
        ) {

            object =
                object.parent;
        }


        if (
            !object
        ) {
            return;
        }


        openMemorial(
            object
        );
    }
);


// ======================================================
// MEMORIAL PANEL
// ======================================================

function openMemorial(
    tomb
) {

    selectedTomb =
        tomb;


    const data =
        tomb.userData;


    const panel =
        document.getElementById(
            "memorialPanel"
        );


    const content =
        document.getElementById(
            "memorialContent"
        );


    content.innerHTML = `

        <h2>🪦 DIGITAL MEMORIAL</h2>

        <h3>
            ${escapeHTML(
                data.name
            )}
        </h3>

        <p>
            <strong>☠ Cause of death</strong><br>
            ${escapeHTML(
                data.cause
            )}
        </p>

        <p>
            <strong>📅 Date of death</strong><br>
            ${escapeHTML(
                data.date
            )}
        </p>

        <p>
            <strong>📦 File size</strong><br>
            ${escapeHTML(
                data.size
            )}
        </p>

        <p>
            <strong>📄 File type</strong><br>
            ${escapeHTML(
                data.type
            )}
        </p>

        <p>
            May this file rest
            peacefully in CTRL + Z Cemetery.
        </p>

    `;


    panel.classList.add(
        "open"
    );
}


// ======================================================
// CLOSE MEMORIAL
// ======================================================

document
    .getElementById(
        "closeMemorial"
    )
    .addEventListener(
        "click",
        function () {

            document
                .getElementById(
                    "memorialPanel"
                )
                .classList.remove(
                    "open"
                );
        }
    );


// ======================================================
// VISITOR PANEL
// ======================================================

const visitorPanel =
    document.getElementById(
        "visitorPanel"
    );


document
    .getElementById(
        "openVisitorPanel"
    )
    .addEventListener(
        "click",
        function () {

            if (!selectedTomb)
                return;


            document
                .getElementById(
                    "selectedTombName"
                )
                .textContent =
                selectedTomb.userData.name;


            loadVisitorData();

            visitorPanel.classList.add(
                "open"
            );
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


// ======================================================
// VISITOR BUTTON
// ======================================================

document
    .getElementById(
        "visitorButton"
    )
    .addEventListener(
        "click",
        function () {

            if (!selectedTomb) {

                alert(
                    "Tap a tomb first to visit its memorial."
                );

                return;
            }


            loadVisitorData();

            visitorPanel.classList.add(
                "open"
            );
        }
    );


// ======================================================
// ROSES
// ======================================================

document
    .getElementById(
        "roseButton"
    )
    .addEventListener(
        "click",
        function () {

            if (!selectedTomb)
                return;


            const key =
                "roses_" +
                selectedTomb.userData.id;


            let count =
                Number(
                    localStorage.getItem(
                        key
                    )
                ) || 0;


            count++;


            localStorage.setItem(
                key,
                count
            );


            document
                .getElementById(
                    "roseCount"
                )
                .textContent =
                count;
        }
    );


// ======================================================
// COMMENTS
// ======================================================

document
    .getElementById(
        "commentButton"
    )
    .addEventListener(
        "click",
        function () {

            if (!selectedTomb)
                return;


            const input =
                document.getElementById(
                    "commentInput"
                );


            const text =
                input.value.trim();


            if (!text)
                return;


            const key =
                "comments_" +
                selectedTomb.userData.id;


            let comments =
                JSON.parse(
                    localStorage.getItem(
                        key
                    ) || "[]"
                );


            comments.push({
                text:
                    text,

                date:
                    new Date()
                    .toLocaleString()
            });


            localStorage.setItem(
                key,
                JSON.stringify(
                    comments
                )
            );


            input.value = "";

            loadVisitorData();
        }
    );


// ======================================================
// LOAD VISITOR DATA
// ======================================================

function loadVisitorData() {

    if (!selectedTomb)
        return;


    const id =
        selectedTomb.userData.id;


    const roseKey =
        "roses_" + id;


    const commentKey =
        "comments_" + id;


    const roses =
        Number(
            localStorage.getItem(
                roseKey
            )
        ) || 0;


    document
        .getElementById(
            "roseCount"
        )
        .textContent =
        roses;


    const comments =
        JSON.parse(
            localStorage.getItem(
                commentKey
            ) || "[]"
        );


    const commentsBox =
        document.getElementById(
            "comments"
        );


    commentsBox.innerHTML = "";


    if (
        comments.length === 0
    ) {

        commentsBox.innerHTML =
            `<div class="comment">
                No messages yet.
            </div>`;

        return;
    }


    comments.forEach(
        comment => {

            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "comment";


            div.innerHTML =
                `
                    ${escapeHTML(
                        comment.text
                    )}
                    <br>
                    <small>
                        ${escapeHTML(
                            comment.date
                        )}
                    </small>
                `;


            commentsBox.appendChild(
                div
            );
        }
    );
}


// ======================================================
// ESCAPE HTML
// ======================================================

function escapeHTML(
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


// ======================================================
// FIRE FLIES
// ======================================================

const fireflies = [];


for (let i = 0; i < 120; i++) {

    const fly =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.08,
                8,
                8
            ),

            new THREE.MeshBasicMaterial({
                color: 0xcab65d
            })
        );


    fly.position.set(

        (Math.random() - 0.5) * 100,

        1 +
            Math.random() * 10,

        Math.random() * 100
    );


    fly.userData = {

        speed:
            0.002 +
            Math.random() * 0.008,

        offset:
            Math.random() * 10
    };


    scene.add(fly);

    fireflies.push(
        fly
    );
}


// ======================================================
// ANIMATION
// ======================================================

const clock =
    new THREE.Clock();


function animate() {

    requestAnimationFrame(
        animate
    );


    const time =
        clock.getElapsedTime();


    // Gate
    updateGate();


    // New tomb growth
    oldTombs.forEach(
        tomb => {

            if (
                tomb.userData.isGrowing
            ) {

                tomb.scale.lerp(
                    new THREE.Vector3(
                        1,
                        1,
                        1
                    ),
                    0.08
                );


                if (
                    tomb.scale.x >
                    0.99
                ) {

                    tomb.scale.set(
                        1,
                        1,
                        1
                    );

                    tomb.userData
                        .isGrowing =
                        false;
                }
            }
        }
    );


    // Fireflies
    fireflies.forEach(
        fly => {

            fly.position.y +=
                Math.sin(
                    time *
                    fly.userData.speed *
                    100 +
                    fly.userData.offset
                ) * 0.002;

            fly.position.x +=
                Math.sin(
                    time * 0.2 +
                    fly.userData.offset
                ) * 0.003;
        }
    );


    // Torch flicker
    torchLight1.intensity =
        1.8 +
        Math.sin(
            time * 8
        ) * 0.35;


    torchLight2.intensity =
        1.8 +
        Math.sin(
            time * 9
        ) * 0.35;


    // Camera rotation
    const lookDirection =
        new THREE.Vector3(
            Math.sin(yaw),
            Math.sin(pitch),
            Math.cos(yaw)
        );


    const target =
        camera.position
            .clone()
            .add(
                lookDirection
            );


    camera.lookAt(
        target
    );


    renderer.render(
        scene,
        camera
    );
}


animate();


// ======================================================
// RESIZE
// ======================================================

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
