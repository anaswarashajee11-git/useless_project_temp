/* =========================================================
   CTRL + Z DIGITAL CEMETERY
   Complete script.js
========================================================= */

if (typeof THREE === "undefined") {
    document.body.innerHTML += `
        <div style="
            position:fixed;
            inset:0;
            display:flex;
            align-items:center;
            justify-content:center;
            background:#07100d;
            color:#d7bd7b;
            font-family:Georgia,serif;
            font-size:22px;
            z-index:9999;
        ">
            Three.js could not load.<br>
            Please refresh the page.
        </div>
    `;
    throw new Error("Three.js failed to load");
}


/* =========================================================
   SCENE
========================================================= */

const container = document.getElementById("scene");

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x07100d);

scene.fog = new THREE.Fog(
    0x07100d,
    70,
    170
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
    antialias: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

renderer.setClearColor(0x07100d);

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
    1
);

moonLight.position.set(
    20,
    50,
    10
);

scene.add(moonLight);


/* =========================================================
   GREEN ATMOSPHERE
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
   PURPLE ATMOSPHERE
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
        24,
        24
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
   STARS
========================================================= */

const starPositions = [];

for (let i = 0; i < 900; i++) {

    starPositions.push(
        (Math.random() - 0.5) * 250,
        20 + Math.random() * 100,
        (Math.random() - 0.5) * 250
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
        size: 0.55
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

ground.receiveShadow = true;

scene.add(ground);


/* =========================================================
   NORMAL STONE PATH
========================================================= */

const path = new THREE.Mesh(
    new THREE.PlaneGeometry(
        7,
        90
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
   ENTRANCE
========================================================= */

const entrance =
    new THREE.Group();

entrance.position.z = 28;

scene.add(entrance);


/* =========================================================
   TOWER MATERIAL
========================================================= */

const towerMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x252d2a,
        roughness: 0.9
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
}

makeTower(-9);
makeTower(9);


/* =========================================================
   GATE
========================================================= */

const gateMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x252c2a,
        metalness: 0.65,
        roughness: 0.55
    });


const gold =
    new THREE.MeshStandardMaterial({
        color: 0xc5a44e,
        metalness: 0.8,
        roughness: 0.35
    });


/* =========================================================
   LEFT HINGE
========================================================= */

const leftGate =
    new THREE.Group();

leftGate.position.set(
    -5.8,
    5,
    -3.8
);

entrance.add(leftGate);


/* =========================================================
   RIGHT HINGE
========================================================= */

const rightGate =
    new THREE.Group();

rightGate.position.set(
    5.8,
    5,
    -3.8
);

entrance.add(rightGate);


/* =========================================================
   GATE PANEL
========================================================= */

function makeGate(parent, direction) {

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

    for (
        let i = -2;
        i <= 2;
        i++
    ) {

        const bar =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    0.12,
                    7.7,
                    0.5
                ),
                gold
            );

        bar.position.set(
            direction * 2.9 +
            i * 1.1,
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
                    0.12,
                    0.5
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
   CENTER POST
========================================================= */

const centerPost =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            0.4,
            8,
            0.5
        ),
        gold
    );

centerPost.position.set(
    0,
    5,
    -3.8
);

entrance.add(centerPost);


/* =========================================================
   SIGN
========================================================= */

const signCanvas =
    document.createElement("canvas");

signCanvas.width = 1000;
signCanvas.height = 300;

const ctx =
    signCanvas.getContext("2d");

ctx.fillStyle = "#111715";

ctx.fillRect(
    0,
    0,
    1000,
    300
);

ctx.strokeStyle = "#caaa58";

ctx.lineWidth = 8;

ctx.strokeRect(
    10,
    10,
    980,
    280
);

ctx.textAlign = "center";

ctx.fillStyle = "#e1c674";

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

ctx.fillStyle = "#aaa48f";

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
   FRONT GATE LIGHTS
========================================================= */

const entranceLights = [];


function makeLight(x, z) {

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

    entranceLights.push(light);
}


makeLight(-12, 1);
makeLight(12, 1);
makeLight(-7, 2);
makeLight(7, 2);


/* =========================================================
   FLOWING YELLOW SPIRIT LIGHTS
========================================================= */

const spiritLights = [];

for (let i = 0; i < 18; i++) {

    const light =
        new THREE.PointLight(
            0xffd84a,
            1.8,
            12
        );

    light.position.set(
        (Math.random() - 0.5) * 35,
        1.5 + Math.random() * 4,
        -5 - Math.random() * 55
    );

    scene.add(light);

    spiritLights.push({
        light: light,
        baseX: light.position.x,
        baseY: light.position.y,
        baseZ: light.position.z,
        speed: 0.4 + Math.random() * 0.7,
        phase: Math.random() * Math.PI * 2
    });
}


function updateSpiritLights() {

    const time =
        performance.now() * 0.001;

    spiritLights.forEach(function(item) {

        item.light.position.x =
            item.baseX +
            Math.sin(
                time * item.speed +
                item.phase
            ) * 2.5;

        item.light.position.y =
            item.baseY +
            Math.sin(
                time * 1.4 +
                item.phase
            ) * 0.8;

        item.light.position.z =
            item.baseZ +
            Math.cos(
                time * item.speed * 0.7 +
                item.phase
            ) * 1.5;

        item.light.intensity =
            1.4 +
            Math.sin(
                time * 2 +
                item.phase
            ) * 0.5;
    });
}


/* =========================================================
   TOMBS
========================================================= */

const tombs = [];

let graveCount = 28;


/* =========================================================
   TOMBSTONE POSITION
========================================================= */

function getTombPosition() {

    let x;
    let z;

    do {

        x =
            (Math.random() - 0.5) *
            42;

        z =
            18 -
            Math.random() *
            63;

    } while (
        Math.abs(x) < 5 &&
        z > -25
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
        isNew ? -1 : 0,
        pos.z
    );


    /* Stone */

    const width =
        1.8 +
        Math.random() * 0.7;

    const height =
        2.5 +
        Math.random() * 0.8;


    const stone =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                width,
                height,
                0.55
            ),
            new THREE.MeshStandardMaterial({
                color:
                    isNew
                        ? 0x3c4743
                        : 0x303936,
                roughness: 0.9,
                emissive: 0x111916,
                emissiveIntensity: 0.3
            })
        );

    stone.position.y =
        height / 2;

    tomb.add(stone);


    /* Rounded top */

    const top =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                width / 2,
                16,
                8
            ),
            stone.material
        );

    top.scale.z = 0.65;

    top.position.y =
        height;

    tomb.add(top);


    /* Cross */

    const crossMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x707a75,
            roughness: 0.8
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
        height + 0.7,
        -0.1
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
        height + 0.9,
        -0.1
    );

    tomb.add(horizontal);


    /* Purple subtle glow */

    const glow =
        new THREE.PointLight(
            0x8c55a8,
            isNew ? 1.5 : 0.25,
            6
        );

    glow.position.y =
        height * 0.7;

    tomb.add(glow);


    /* Tomb data */

    tomb.userData.isTomb = true;

    tomb.userData.fileName =
        fileName;

    tomb.userData.roses = 0;

    tomb.userData.comments = [];

    tomb.userData.emerging =
        !!isNew;

    tomb.userData.startTime =
        performance.now();

    tomb.userData.glow =
        glow;


    tombs.push(tomb);

    scene.add(tomb);


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
   SMALL STONES
========================================================= */

for (
    let i = 0;
    i < 25;
    i++
) {

    const x =
        (Math.random() - 0.5) *
        50;

    const z =
        15 -
        Math.random() *
        60;

    if (Math.abs(x) > 6) {

        const stone =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    0.8,
                    0.45,
                    0.55
                ),
                new THREE.MeshStandardMaterial({
                    color: 0x414744,
                    roughness: 1
                })
            );

        stone.position.set(
            x,
            0.22,
            z
        );

        scene.add(stone);
    }
}


/* =========================================================
   TREES
========================================================= */

function makeTree(x, z) {

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

    scene.add(trunk);


    for (
        let i = 0;
        i < 4;
        i++
    ) {

        const branch =
            new THREE.Mesh(
                new THREE.CylinderGeometry(
                    0.12,
                    0.25,
                    3,
                    7
                ),
                trunk.material
            );

        branch.position.set(
            x,
            4,
            z
        );

        branch.rotation.z =
            (Math.random() - 0.5) *
            1.5;

        scene.add(branch);
    }
}


makeTree(-22, 5);
makeTree(23, 0);
makeTree(-23, -25);
makeTree(24, -35);
makeTree(-18, -45);


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

        lastX = e.clientX;
        lastY = e.clientY;
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
            e.clientX - lastX;

        const dy =
            e.clientY - lastY;

        lastX = e.clientX;
        lastY = e.clientY;

        yaw -= dx * 0.003;

        pitch -= dy * 0.002;

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

renderer.domElement.addEventListener(
    "wheel",
    function(e) {

        const direction =
            e.deltaY > 0
                ? 1
                : -1;

        const speed =
            1.7 * direction;

        const forwardX =
            Math.sin(yaw);

        const forwardZ =
            -Math.cos(yaw);

        camera.position.x +=
            forwardX * speed;

        camera.position.z +=
            forwardZ * speed;


        camera.position.x =
            Math.max(
                -55,
                Math.min(
                    55,
                    camera.position.x
                )
            );

        camera.position.z =
            Math.max(
                -55,
                Math.min(
                    80,
                    camera.position.z
                )
            );


        const welcome =
            document.getElementById(
                "welcome"
            );

        if (welcome) {

            welcome.style.opacity =
                camera.position.z < 65
                    ? "0"
                    : "1";
        }
    },
    {
        passive: true
    }
);


/* =========================================================
   CAMERA UPDATE
========================================================= */

function updateCamera() {

    const target =
        new THREE.Vector3(

            camera.position.x +
            Math.sin(yaw) * 20,

            camera.position.y +
            Math.sin(pitch) * 20,

            camera.position.z -
            Math.cos(yaw) * 20

        );

    camera.lookAt(target);
}


/* =========================================================
   GATE ANIMATION
========================================================= */

let gateAmount = 0;


function updateGate() {

    const distance =
        Math.abs(
            camera.position.z -
            28
        );

    let target = 0;

    if (distance < 32) {

        target =
            1 -
            Math.min(
                distance / 32,
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
        (3 - 2 * gateAmount);


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
                -1 + smooth;


            if (
                tomb.userData.glow
            ) {

                tomb.userData.glow.intensity =
                    1.5 -
                    progress * 1.2;
            }


            if (
                progress >= 1
            ) {

                tomb.userData.emerging =
                    false;

                tomb.position.y = 0;

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
        function(light, index) {

            light.intensity =
                3.5 +
                Math.sin(
                    time + index
                ) * 0.4;
        }
    );
}


/* =========================================================
   MEMORIAL
========================================================= */

let selectedTomb = null;


function openMemorial(tomb) {

    selectedTomb = tomb;


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


    if (title) {

        title.textContent =
            tomb.userData.fileName;
    }


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


    if (roseCount) {

        roseCount.textContent =
            tomb.userData.roses +
            " roses";
    }


    if (commentsList) {

        renderComments(tomb);
    }


    /* Force panel visible */

    panel.style.zIndex = "9999";
    panel.style.pointerEvents = "auto";
    panel.style.visibility = "visible";
    panel.style.opacity = "1";

    panel.classList.add("show");
    panel.classList.add("open");
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
   CLICK TOMBS
========================================================= */

const raycaster =
    new THREE.Raycaster();

const mouse =
    new THREE.Vector2();


renderer.domElement.addEventListener(
    "click",
    function(e) {

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
        )
            return;


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

            openMemorial(tomb);
        }
    }
);


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

                            buryFile(file);

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

function buryFile(file) {

    graveCount++;


    const count =
        document.getElementById(
            "buriedCount"
        );


    if (count) {

        count.textContent =
            graveCount;
    }


    createTomb(
        file.name,
        true
    );


    lightning();

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


    if (!element)
        return;


    element.classList.remove(
        "flash"
    );


    void element.offsetWidth;


    element.classList.add(
        "flash"
    );


    ambient.intensity = 3;


    setTimeout(
        function() {

            ambient.intensity = 1.5;

        },
        450
    );
}


/* =========================================================
   BURIAL POPUP
========================================================= */

function popup(name) {

    const popup =
        document.getElementById(
            "burialPopup"
        );


    const fileName =
        document.getElementById(
            "popupFileName"
        );


    if (!popup)
        return;


    if (fileName) {

        fileName.textContent =
            name;
    }


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

    roseButton.onclick =
        function() {

            if (!selectedTomb)
                return;


            selectedTomb.userData.roses++;


            const count =
                document.getElementById(
                    "roseCount"
                );


            if (count) {

                count.textContent =
                    selectedTomb.userData.roses +
                    " roses";
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


            input.value = "";


            renderComments(
                selectedTomb
            );
        };
}


/* =========================================================
   RENDER COMMENTS
========================================================= */

function renderComments(tomb) {

    const box =
        document.getElementById(
            "commentsList"
        );


    if (!box)
        return;


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
                "🌹 " + comment;


            box.appendChild(div);
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


if (visitorButton) {

    visitorButton.onclick =
        function() {

            const panel =
                document.getElementById(
                    "visitorPanel"
                );


            if (!panel)
                return;


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
        };
}


/* =========================================================
   CLOSE VISITOR PANEL
========================================================= */

const closeVisitors =
    document.getElementById(
        "closeVisitors"
    );


if (closeVisitors) {

    closeVisitors.onclick =
        function() {

            const panel =
                document.getElementById(
                    "visitorPanel"
                );


            if (!panel)
                return;


            panel.classList.remove(
                "show"
            );

            panel.classList.remove(
                "open"
            );
        };
}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(text) {

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

    updateSpiritLights();


    stars.rotation.y +=
        0.00008;


    renderer.render(
        scene,
        camera
    );
}


animate();
