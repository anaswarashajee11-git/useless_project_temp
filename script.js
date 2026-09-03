// ===================== STORAGE =====================
const STORAGE_KEY = "ctrlz_cemetery_graves";

function getGraves() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveGraves(graves) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(graves));
}

// ===================== GATE TRANSITION (game-style door opening) =====================
const gateScreen = document.getElementById("gate-screen");
const cemeteryScreen = document.getElementById("cemetery-screen");
const enterBtn = document.getElementById("enterBtn");
const gateContent = document.getElementById("gateContent");
const doorLeft = document.getElementById("doorLeft");
const doorRight = document.getElementById("doorRight");

let entering = false;

enterBtn.addEventListener("click", () => {
  if (entering) return;
  entering = true;
  enterBtn.disabled = true;

  // Step 1: fade out the title/button box
  gateContent.classList.add("fading");

  // Step 2: swing the doors open
  setTimeout(() => {
    doorLeft.classList.add("open");
    doorRight.classList.add("open");
  }, 350);

  // Step 3: once doors have fully opened, reveal the cemetery behind them
  setTimeout(() => {
    cemeteryScreen.classList.remove("hidden");
    renderGraves();
  }, 900);

  // Step 4: remove the gate screen entirely
  setTimeout(() => {
    gateScreen.classList.add("hidden");
  }, 1800);
});

// ===================== RENDER TOMBSTONES =====================
const groundsEl = document.getElementById("grounds");
const emptyMsg = document.getElementById("emptyMsg");

function renderGraves() {
  const graves = getGraves();
  groundsEl.innerHTML = "";

  if (graves.length === 0) {
    emptyMsg.classList.remove("hidden");
    return;
  }
  emptyMsg.classList.add("hidden");

  graves.forEach((grave) => {
    const card = document.createElement("div");
    card.className = "tombstone";
    card.dataset.id = grave.id;

    card.innerHTML = `
      ${grave.image ? `<img class="tombstone-thumb" src="${grave.image}" alt="${escapeHtml(grave.name)}">` : ""}
      <div class="tombstone-name">${escapeHtml(grave.name)}</div>
      <div class="tombstone-dates">☠ Rest since ${grave.died || "?"}</div>
      <div class="tombstone-cause">"${escapeHtml(grave.cause)}"</div>
      <div class="tombstone-grass"></div>
    `;

    card.addEventListener("click", () => openViewModal(grave.id));
    groundsEl.appendChild(card);
  });
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str || "";
  return div.innerHTML;
}

// ===================== UPLOAD / BURY MODAL =====================
const uploadModal = document.getElementById("uploadModal");
const addGraveBtn = document.getElementById("addGraveBtn");
const closeModal = document.getElementById("closeModal");
const graveForm = document.getElementById("graveForm");
const pImage = document.getElementById("pImage");
const imgPreview = document.getElementById("imgPreview");

let pendingImageData = null;

addGraveBtn.addEventListener("click", () => {
  graveForm.reset();
  imgPreview.classList.add("hidden");
  pendingImageData = null;
  uploadModal.classList.remove("hidden");
});

closeModal.addEventListener("click", () => uploadModal.classList.add("hidden"));
uploadModal.addEventListener("click", (e) => {
  if (e.target === uploadModal) uploadModal.classList.add("hidden");
});

pImage.addEventListener("change", () => {
  const file = pImage.files[0];
  if (!file) {
    pendingImageData = null;
    imgPreview.classList.add("hidden");
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    pendingImageData = e.target.result; // base64 data URL
    imgPreview.src = pendingImageData;
    imgPreview.classList.remove("hidden");
  };
  reader.readAsDataURL(file);
});

graveForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newGrave = {
    id: Date.now().toString(),
    name: document.getElementById("pName").value.trim(),
    cause: document.getElementById("pCause").value.trim(),
    died: document.getElementById("pDied").value,
    epitaph: document.getElementById("pEpitaph").value.trim(),
    image: pendingImageData,
  };

  const graves = getGraves();
  graves.unshift(newGrave);
  saveGraves(graves);

  uploadModal.classList.add("hidden");
  renderGraves();
});

// ===================== VIEW / DELETE MODAL =====================
const viewModal = document.getElementById("viewModal");
const viewContent = document.getElementById("viewContent");
const closeViewModal = document.getElementById("closeViewModal");
const deleteGraveBtn = document.getElementById("deleteGraveBtn");

let currentViewId = null;

function openViewModal(id) {
  const graves = getGraves();
  const grave = graves.find((g) => g.id === id);
  if (!grave) return;

  currentViewId = id;

  viewContent.innerHTML = `
    ${grave.image ? `<img src="${grave.image}" alt="${escapeHtml(grave.name)}">` : ""}
    <h2>${escapeHtml(grave.name)}</h2>
    <div class="dates">☠ Rest since ${grave.died || "?"}</div>
    <div class="cause">Cause of death: "${escapeHtml(grave.cause)}"</div>
    ${grave.epitaph ? `<div class="epitaph">"${escapeHtml(grave.epitaph)}"</div>` : ""}
  `;

  viewModal.classList.remove("hidden");
}

closeViewModal.addEventListener("click", () => viewModal.classList.add("hidden"));
viewModal.addEventListener("click", (e) => {
  if (e.target === viewModal) viewModal.classList.add("hidden");
});

deleteGraveBtn.addEventListener("click", () => {
  if (!currentViewId) return;
  if (!confirm("Exhume and permanently delete this grave?")) return;

  let graves = getGraves();
  graves = graves.filter((g) => g.id !== currentViewId);
  saveGraves(graves);

  viewModal.classList.add("hidden");
  renderGraves();
});
