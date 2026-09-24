(() => {
  const draftKey = "future_self_visualiser_draft_v1";
  const savedKey = "future_self_visions_v1";
  const shapeNames = [
    "circle", "square", "diamond", "triangle", "star",
    "trapezoid", "heart", "rectangle", "tree", "flower"
  ];
  const presentEnergy = document.getElementById("presentEnergy");
  const presentEnergyValue = document.getElementById("presentEnergyValue");
  const presentOrb = document.getElementById("presentEnergyOrb");
  const presentInside = document.getElementById("presentEnergyInside");
  const presentColourDepth = document.getElementById("presentColourDepth");
  const presentColourDepthValue = document.getElementById("presentColourDepthValue");
  const futureSize = document.getElementById("futureSize");
  const futureSizeValue = document.getElementById("futureSizeValue");
  const futureColourDepth = document.getElementById("futureColourDepth");
  const futureColourDepthValue = document.getElementById("futureColourDepthValue");
  const futurePreview = document.getElementById("futureShapePreview");
  const futureFocusShape = document.getElementById("futureFocusShape");
  const futureCardResult = document.getElementById("futureCardResult");
  const futureCardContent = document.getElementById("futureCardContent");
  const builderStatus = document.getElementById("futureCardBuilderStatus");
  const saveStatus = document.getElementById("futureCardSaveStatus");
  const actionInput = document.getElementById("futureActionInput");
  let actions = [];
  let currentCard = null;
  let focusRemaining = 90;
  let focusInterval = null;

  const clean = (value) => String(value || "").trim();
  const selectedValue = (name) => document.querySelector(`input[name="${name}"]:checked`)?.value || "";

  function shapeLabel(value) {
    if (value === "flower") return "Tulip";
    return value ? value.charAt(0).toUpperCase() + value.slice(1) : "Shape";
  }

  function colourWithDepth(colour, depth = 100) {
    const hex = /^#[0-9a-f]{6}$/i.test(colour || "") ? colour : "#f4a82c";
    const strength = Math.max(10, Math.min(100, Number(depth) || 100)) / 100;
    const red = parseInt(hex.slice(1, 3), 16);
    const green = parseInt(hex.slice(3, 5), 16);
    const blue = parseInt(hex.slice(5, 7), 16);
    const mixed = [red, green, blue].map((channel) => Math.round(channel * strength + 255 * (1 - strength)));
    return `rgb(${mixed[0]}, ${mixed[1]}, ${mixed[2]})`;
  }

  function contrastText(colour, depth = 100) {
    const mixed = colourWithDepth(colour, depth).match(/\d+/g).map(Number);
    const luminance = (0.2126 * mixed[0] + 0.7152 * mixed[1] + 0.0722 * mixed[2]) / 255;
    return luminance > 0.58 ? "#2a2521" : "#fff9ec";
  }

  function applyShape(element, shape, colour, size, depth = 100) {
    const safeShape = shapeNames.includes(shape) ? shape : "circle";
    shapeNames.forEach((name) => element.classList.remove(`shape-${name}`));
    element.classList.add(`shape-${safeShape}`);
    element.style.setProperty("--future-colour", colourWithDepth(colour, depth));
    element.style.setProperty("--future-text", contrastText(colour, depth));
    if (size) {
      const diameter = 70 + Number(size) * 1.65;
      element.style.setProperty("--future-size", `${diameter}px`);
      element.style.setProperty("--future-width", `${safeShape === "rectangle" ? diameter * 1.28 : diameter}px`);
      element.style.setProperty("--future-height", `${safeShape === "rectangle" ? diameter * 0.7 : diameter}px`);
    }
  }

  function updatePresentVisual() {
    const value = Number(presentEnergy.value);
    const colour = selectedValue("presentColour") || "#ee5a3a";
    const depth = Number(presentColourDepth.value);
    const diameter = 54 + value * 1.62;
    presentOrb.style.width = `${diameter}px`;
    presentOrb.style.height = `${diameter}px`;
    presentOrb.style.background = colourWithDepth(colour, depth);
    presentOrb.style.color = contrastText(colour, depth);
    presentInside.textContent = value;
    presentEnergyValue.textContent = `${value} / 100`;
    presentColourDepthValue.textContent = `${depth}% colour depth`;
  }

  function updateFutureVisual() {
    const shape = selectedValue("futureShape") || "circle";
    const colour = selectedValue("futureColour") || "#f4a82c";
    const size = Number(futureSize.value);
    const depth = Number(futureColourDepth.value);
    applyShape(futurePreview, shape, colour, size, depth);
    applyShape(futureFocusShape, "circle", colour, Math.min(size, 38), depth);
    futureSizeValue.textContent = `${size} / 100`;
    futureColourDepthValue.textContent = `${depth}% colour depth`;
  }

  function readDraft() {
    return {
      presentEnergy: presentEnergy.value,
      presentColour: selectedValue("presentColour"),
      presentColourDepth: presentColourDepth.value,
      presentEnergyNote: document.getElementById("presentEnergyNote").value,
      futureShape: selectedValue("futureShape"),
      futureColour: selectedValue("futureColour"),
      futureColourDepth: futureColourDepth.value,
      futureSize: futureSize.value,
      futureDescription: document.getElementById("futureDescription").value,
      futureFeeling: document.getElementById("futureFeeling").value,
      feelingWords: [...document.querySelectorAll("#futureFeelingMenu input:checked")].map((input) => input.value),
      actions,
      futureFocusNote: document.getElementById("futureFocusNote").value
    };
  }

  function saveDraft() {
    try {
      localStorage.setItem(draftKey, JSON.stringify(readDraft()));
      return true;
    } catch (_) {
      builderStatus.textContent = "This browser could not save the draft.";
      return false;
    }
  }

  function restoreRadio(name, value) {
    const input = document.querySelector(`input[name="${name}"][value="${value}"]`);
    if (input) input.checked = true;
  }

  function restoreDraft() {
    try {
      const draft = JSON.parse(localStorage.getItem(draftKey) || "null");
      if (!draft) return;
      presentEnergy.value = draft.presentEnergy || "50";
      restoreRadio("presentColour", draft.presentColour);
      presentColourDepth.value = draft.presentColourDepth || draft.presentTransparency || "100";
      document.getElementById("presentEnergyNote").value = draft.presentEnergyNote || "";
      restoreRadio("futureShape", draft.futureShape);
      restoreRadio("futureColour", draft.futureColour);
      futureColourDepth.value = draft.futureColourDepth || draft.futureTransparency || "100";
      futureSize.value = draft.futureSize || "68";
      document.getElementById("futureDescription").value = draft.futureDescription || "";
      document.getElementById("futureFeeling").value = draft.futureFeeling || "";
      document.querySelectorAll("#futureFeelingMenu input").forEach((input) => {
        input.checked = draft.feelingWords?.includes(input.value) || false;
      });
      actions = Array.isArray(draft.actions) ? draft.actions : [];
      document.getElementById("futureFocusNote").value = draft.futureFocusNote || "";
    } catch (_) {
      localStorage.removeItem(draftKey);
    }
  }

  function showSaved(statusId, message) {
    const status = document.getElementById(statusId);
    if (!saveDraft()) {
      status.textContent = "This browser could not save this section.";
      return;
    }
    status.textContent = `${message} This can appear in 07 · Your future self card if you build a card.`;
  }

  function invalidateCard() {
    currentCard = null;
    futureCardResult.hidden = true;
    futureCardContent.innerHTML = "";
    saveStatus.textContent = "";
    builderStatus.textContent = "A section changed. Build a new card when you are ready.";
  }

  function finishReset(statusId) {
    invalidateCard();
    saveDraft();
    document.getElementById(statusId).textContent = "Reset. Fill this section again whenever it feels useful.";
  }

  function savePresentSection() {
    showSaved("presentEnergyStatus", "Current energy saved.");
  }

  function resetPresentSection() {
    presentEnergy.value = "50";
    restoreRadio("presentColour", "#ee5a3a");
    presentColourDepth.value = "100";
    document.getElementById("presentEnergyNote").value = "";
    updatePresentVisual();
    finishReset("presentEnergyStatus");
  }

  function saveShapeSection() {
    const shape = selectedValue("futureShape");
    showSaved("futureShapeStatus", `${shapeLabel(shape)} shape saved.`);
  }

  function resetShapeSection() {
    restoreRadio("futureShape", "circle");
    restoreRadio("futureColour", "#f4a82c");
    futureColourDepth.value = "100";
    futureSize.value = "68";
    updateFutureVisual();
    finishReset("futureShapeStatus");
  }

  function saveWordsSection() {
    const description = clean(document.getElementById("futureDescription").value);
    const feeling = clean(document.getElementById("futureFeeling").value);
    const words = [...document.querySelectorAll("#futureFeelingMenu input:checked")];
    if (!description && !feeling && !words.length) {
      document.getElementById("futureWordsStatus").textContent = "Add one word or sentence first.";
      return;
    }
    showSaved("futureWordsStatus", "Future words saved.");
  }

  function resetWordsSection() {
    document.getElementById("futureDescription").value = "";
    document.getElementById("futureFeeling").value = "";
    document.querySelectorAll("#futureFeelingMenu input").forEach((input) => { input.checked = false; });
    finishReset("futureWordsStatus");
  }

  function addAction() {
    const value = clean(actionInput.value);
    if (!value) {
      document.getElementById("futureActionAddStatus").textContent = "Write one future action first.";
      return;
    }
    actions.push({ id: `${Date.now()}-${Math.random().toString(16).slice(2)}`, text: value });
    actionInput.value = "";
    document.getElementById("futureActionAddStatus").textContent = "Action added.";
    renderActions();
    saveDraft();
    invalidateCard();
  }

  function renderActions() {
    const list = document.getElementById("futureActionList");
    const empty = document.getElementById("futureActionEmpty");
    list.innerHTML = "";
    empty.hidden = actions.length > 0;
    actions.forEach((action, index) => {
      const row = document.createElement("div");
      row.className = "future-action-row";
      const number = document.createElement("span");
      number.textContent = String(index + 1).padStart(2, "0");
      const text = document.createElement("strong");
      text.textContent = action.text;
      const remove = document.createElement("button");
      remove.type = "button";
      remove.dataset.removeAction = action.id;
      remove.textContent = "Remove";
      row.append(number, text, remove);
      list.appendChild(row);
    });
  }

  function saveActionsSection() {
    if (!actions.length) {
      document.getElementById("futureActionsStatus").textContent = "Add at least one future action first.";
      return;
    }
    showSaved("futureActionsStatus", `${actions.length} future action${actions.length === 1 ? "" : "s"} saved.`);
  }

  function resetActionsSection() {
    actions = [];
    actionInput.value = "";
    document.getElementById("futureActionAddStatus").textContent = "";
    renderActions();
    finishReset("futureActionsStatus");
  }

  function updateFocusTimer() {
    const minutes = Math.floor(focusRemaining / 60);
    const seconds = focusRemaining % 60;
    document.getElementById("futureFocusTime").textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    if (focusRemaining === 0) {
      clearInterval(focusInterval);
      focusInterval = null;
      document.getElementById("futureFocusPrompt").textContent = "Notice what stayed with you";
      document.getElementById("futureFocusStart").textContent = "Again";
      document.getElementById("futureFocusPanel").classList.remove("focusing");
    }
  }

  function toggleFocusTimer() {
    const button = document.getElementById("futureFocusStart");
    if (focusInterval) {
      clearInterval(focusInterval);
      focusInterval = null;
      button.textContent = "Continue";
      document.getElementById("futureFocusPanel").classList.remove("focusing");
      return;
    }
    if (focusRemaining === 0) focusRemaining = 90;
    document.getElementById("futureFocusPrompt").textContent = "Stay with the future feeling";
    button.textContent = "Pause";
    document.getElementById("futureFocusPanel").classList.add("focusing");
    updateFocusTimer();
    focusInterval = setInterval(() => {
      focusRemaining -= 1;
      updateFocusTimer();
    }, 1000);
  }

  function saveFocusSection() {
    const note = clean(document.getElementById("futureFocusNote").value);
    if (!note) {
      document.getElementById("futureFocusStatus").textContent = "Write what became noticeable first. “Nothing yet” is valid.";
      return;
    }
    showSaved("futureFocusStatus", "Future-focus reflection saved.");
  }

  function resetFocusSection() {
    clearInterval(focusInterval);
    focusInterval = null;
    focusRemaining = 90;
    document.getElementById("futureFocusTime").textContent = "01:30";
    document.getElementById("futureFocusPrompt").textContent = "Look at the future shape";
    document.getElementById("futureFocusStart").textContent = "Start";
    document.getElementById("futureFocusPanel").classList.remove("focusing");
    document.getElementById("futureFocusNote").value = "";
    finishReset("futureFocusStatus");
  }

  function escapeHtml(value) {
    const node = document.createElement("div");
    node.textContent = value;
    return node.innerHTML;
  }

  function makeRow(label, value) {
    if (!clean(value)) return "";
    return `<div class="future-card-row"><strong>${escapeHtml(label)}</strong><p>${escapeHtml(value)}</p></div>`;
  }

  function makeFutureEnergy(value, colour, shape, depth = 100) {
    const energy = Math.max(1, Math.min(100, Number(value) || 1));
    const safeShape = shapeNames.includes(shape) ? shape : "circle";
    const size = 70 + energy * 1.65;
    const width = safeShape === "rectangle" ? size * 1.28 : size;
    const height = safeShape === "rectangle" ? size * 0.7 : size;
    const colourDepth = Number(depth) || 100;
    return `<div class="future-card-energy future-energy-row"><span>Future energy</span><div class="future-energy-shape shape-${safeShape}" style="--future-colour:${escapeHtml(colourWithDepth(colour, colourDepth))};--future-text:${escapeHtml(contrastText(colour, colourDepth))};--future-size:${size}px;--future-width:${width}px;--future-height:${height}px" aria-label="${escapeHtml(shapeLabel(safeShape))}, future energy ${energy} out of 100, ${colourDepth}% colour depth"></div><strong>${energy} / 100 · ${colourDepth}% colour depth</strong></div>`;
  }

  function buildCard() {
    currentCard = {
      id: "",
      createdAt: new Date().toISOString(),
      presentEnergy: Number(presentEnergy.value),
      presentColour: selectedValue("presentColour"),
      presentColourDepth: Number(presentColourDepth.value),
      presentEnergyNote: clean(document.getElementById("presentEnergyNote").value),
      futureShape: selectedValue("futureShape") || "circle",
      futureColour: selectedValue("futureColour") || "#f4a82c",
      futureColourDepth: Number(futureColourDepth.value),
      futureSize: Number(futureSize.value),
      description: clean(document.getElementById("futureDescription").value),
      feeling: clean(document.getElementById("futureFeeling").value),
      feelingWords: [...document.querySelectorAll("#futureFeelingMenu input:checked")].map((input) => input.value),
      actions: actions.map((action) => action.text),
      focusNote: clean(document.getElementById("futureFocusNote").value)
    };
    renderCurrentCard();
    futureCardResult.hidden = false;
    builderStatus.textContent = "Your future self card is ready.";
    futureCardResult.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function renderCurrentCard() {
    if (!currentCard) return;
    const feelings = currentCard.feelingWords.length ? currentCard.feelingWords.join(", ") : "";
    const actionList = currentCard.actions.length
      ? `<div class="future-card-row"><strong>Future me</strong><ul>${currentCard.actions.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></div>`
      : "";
    futureCardContent.innerHTML = `
      ${makeRow("Who I am", currentCard.description)}
      ${makeRow("How it feels", currentCard.feeling)}
      ${makeRow("Feeling words", feelings)}
      ${makeFutureEnergy(currentCard.futureSize, currentCard.futureColour, currentCard.futureShape, currentCard.futureColourDepth)}
      ${actionList}
      ${makeRow("What became noticeable", currentCard.focusNote)}
      <div class="future-card-energy"><span>Present energy</span><i style="--energy-colour:${escapeHtml(colourWithDepth(currentCard.presentColour, currentCard.presentColourDepth))};--energy-size:${42 + currentCard.presentEnergy * 0.58}px"></i><strong>${currentCard.presentEnergy} / 100 · ${currentCard.presentColourDepth || 100}% colour depth</strong></div>
      ${makeRow("A note about today’s energy", currentCard.presentEnergyNote)}
    `;
  }

  function loadSaved() {
    try {
      const value = JSON.parse(localStorage.getItem(savedKey) || "[]");
      return Array.isArray(value) ? value : [];
    } catch (_) {
      return [];
    }
  }

  function saveCurrentCard() {
    if (!currentCard) return;
    const saved = loadSaved();
    saved.unshift({ ...currentCard, id: `${Date.now()}-${Math.random().toString(16).slice(2)}` });
    try {
      localStorage.setItem(savedKey, JSON.stringify(saved.slice(0, 30)));
      saveStatus.textContent = "Saved below in this browser.";
      renderSaved();
      document.getElementById("saved-visions").scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (_) {
      saveStatus.textContent = "This browser could not save the vision.";
    }
  }

  function renderSaved() {
    const list = document.getElementById("savedFutureList");
    const empty = document.getElementById("savedFutureEmpty");
    const clear = document.getElementById("clearFutureVisions");
    const saved = loadSaved();
    list.innerHTML = "";
    empty.hidden = saved.length > 0;
    clear.hidden = saved.length === 0;
    saved.forEach((card) => {
      const article = document.createElement("article");
      article.className = "saved-future-card";
      const copy = document.createElement("div");
      copy.className = "saved-future-copy";
      const date = new Date(card.createdAt);
      const feelings = Array.isArray(card.feelingWords) && card.feelingWords.length
        ? card.feelingWords.join(", ")
        : "";
      const actionList = Array.isArray(card.actions) && card.actions.length
        ? `<div class="future-card-row"><strong>Future me</strong><ul>${card.actions.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></div>`
        : "";
      copy.innerHTML = `
        <time datetime="${escapeHtml(card.createdAt)}">${date.toLocaleString([], { dateStyle: "medium", timeStyle: "short" })}</time>
        <h3>${escapeHtml(shapeLabel(card.futureShape))} future</h3>
        ${makeRow("Who I am", card.description)}
        ${makeRow("How it feels", card.feeling)}
        ${makeRow("Feeling words", feelings)}
        ${makeFutureEnergy(card.futureSize, card.futureColour, card.futureShape, card.futureColourDepth || card.futureTransparency)}
        ${actionList}
        ${makeRow("What became noticeable", card.focusNote)}
        <div class="future-card-energy"><span>Present energy</span><i style="--energy-colour:${escapeHtml(colourWithDepth(card.presentColour || "#ee5a3a", card.presentColourDepth || card.presentTransparency))};--energy-size:${42 + Number(card.presentEnergy || 0) * 0.36}px"></i><strong>${Number(card.presentEnergy || 0)} / 100 · ${card.presentColourDepth || card.presentTransparency || 100}% colour depth</strong></div>
        ${makeRow("A note about today’s energy", card.presentEnergyNote)}
      `;
      const remove = document.createElement("button");
      remove.type = "button";
      remove.dataset.deleteVision = card.id;
      remove.textContent = "Delete";
      article.append(copy, remove);
      list.appendChild(article);
    });
  }

  restoreDraft();
  updatePresentVisual();
  updateFutureVisual();
  renderActions();
  renderSaved();

  presentEnergy.addEventListener("input", () => { updatePresentVisual(); saveDraft(); invalidateCard(); });
  presentColourDepth.addEventListener("input", () => { updatePresentVisual(); saveDraft(); invalidateCard(); });
  document.getElementById("presentColourPicker").addEventListener("change", () => { updatePresentVisual(); saveDraft(); invalidateCard(); });
  document.getElementById("futureShapePicker").addEventListener("change", () => { updateFutureVisual(); saveDraft(); invalidateCard(); });
  document.getElementById("futureColourPicker").addEventListener("change", () => { updateFutureVisual(); saveDraft(); invalidateCard(); });
  futureSize.addEventListener("input", () => { updateFutureVisual(); saveDraft(); invalidateCard(); });
  futureColourDepth.addEventListener("input", () => { updateFutureVisual(); saveDraft(); invalidateCard(); });
  ["presentEnergyNote", "futureDescription", "futureFeeling", "futureFocusNote"].forEach((id) => {
    document.getElementById(id).addEventListener("input", () => { saveDraft(); invalidateCard(); });
  });
  document.getElementById("futureFeelingMenu").addEventListener("change", () => { saveDraft(); invalidateCard(); });
  document.getElementById("addFutureAction").addEventListener("click", addAction);
  actionInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") { event.preventDefault(); addAction(); }
  });
  document.getElementById("futureActionList").addEventListener("click", (event) => {
    const button = event.target.closest("[data-remove-action]");
    if (!button) return;
    actions = actions.filter((action) => action.id !== button.dataset.removeAction);
    renderActions();
    saveDraft();
    invalidateCard();
  });

  document.getElementById("savePresentEnergy").addEventListener("click", savePresentSection);
  document.getElementById("resetPresentEnergy").addEventListener("click", resetPresentSection);
  document.getElementById("saveFutureShape").addEventListener("click", saveShapeSection);
  document.getElementById("resetFutureShape").addEventListener("click", resetShapeSection);
  document.getElementById("saveFutureWords").addEventListener("click", saveWordsSection);
  document.getElementById("resetFutureWords").addEventListener("click", resetWordsSection);
  document.getElementById("saveFutureActions").addEventListener("click", saveActionsSection);
  document.getElementById("resetFutureActions").addEventListener("click", resetActionsSection);
  document.getElementById("futureFocusStart").addEventListener("click", toggleFocusTimer);
  document.getElementById("saveFutureFocus").addEventListener("click", saveFocusSection);
  document.getElementById("resetFutureFocus").addEventListener("click", resetFocusSection);
  document.getElementById("buildFutureCard").addEventListener("click", buildCard);
  document.getElementById("saveFutureCard").addEventListener("click", saveCurrentCard);
  document.getElementById("printFutureCard").addEventListener("click", () => window.print());
  document.getElementById("savedFutureList").addEventListener("click", (event) => {
    const button = event.target.closest("[data-delete-vision]");
    if (!button) return;
    localStorage.setItem(savedKey, JSON.stringify(loadSaved().filter((card) => card.id !== button.dataset.deleteVision)));
    renderSaved();
  });
  document.getElementById("clearFutureVisions").addEventListener("click", () => {
    if (!window.confirm("Clear all saved future self visions from this browser?")) return;
    localStorage.removeItem(savedKey);
    renderSaved();
  });
})();
