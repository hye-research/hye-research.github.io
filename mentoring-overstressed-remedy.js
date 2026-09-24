(() => {
  const draftKey = "overstressed_remedy_draft_v4";
  const savedKey = "overstressed_remedies_v1";
  const textIds = [
    "pastStress", "pastSigns", "pastHelp", "worstFear", "worryEvidence",
    "worryOther", "worryResponse", "worryKindness", "nextKindStep",
    "customRemedyTitle", "customRemedyDetail", "blobNow", "blobReason"
  ];
  const inputs = textIds.map((id) => document.getElementById(id));
  const responseInputs = [...document.querySelectorAll("input[name='worryResponseType']")];
  const remedyContainer = document.getElementById("remedyChoices");
  const stressLevel = document.getElementById("stressLevel");
  const stressLevelValue = document.getElementById("stressLevelValue");
  const result = document.getElementById("stressRemedyResult");
  const resultContent = document.getElementById("stressRemedyContent");
  const builderStatus = document.getElementById("builderStatus");
  const saveStatus = document.getElementById("saveStressStatus");
  let remedyInputs = [];
  let currentCard = null;
  let breathRemaining = 60;
  let breathInterval = null;

  const clean = (value) => String(value || "").trim();

  function refreshRemedyInputs() {
    remedyInputs = [...remedyContainer.querySelectorAll("input[type='checkbox']")];
  }

  function readDraft() {
    refreshRemedyInputs();
    return {
      texts: Object.fromEntries(inputs.map((input) => [input.id, input.value])),
      remedies: remedyInputs.filter((input) => input.checked).map((input) => input.value),
      customOptions: remedyInputs
        .filter((input) => input.dataset.custom === "true")
        .map((input) => ({ title: input.value, detail: input.dataset.detail || "" })),
      responseType: responseInputs.find((input) => input.checked)?.value || "",
      stressLevel: stressLevel.value
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

  function addRemedyOption(value, { detail = "", checked = true, save = true } = {}) {
    const remedy = clean(value);
    if (!remedy) return null;
    refreshRemedyInputs();
    const existing = remedyInputs.find((input) => input.value.toLowerCase() === remedy.toLowerCase());
    if (existing) {
      existing.checked = checked || existing.checked;
      if (detail) {
        existing.dataset.detail = detail;
        existing.closest("label")?.querySelector("small")?.replaceChildren(detail);
      }
      if (save) saveDraft();
      return existing;
    }

    const label = document.createElement("label");
    label.className = "custom-remedy-option";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.value = remedy;
    input.checked = checked;
    input.dataset.custom = "true";
    input.dataset.detail = clean(detail);
    const strong = document.createElement("strong");
    strong.textContent = `My remedy: ${remedy}`;
    const small = document.createElement("small");
    small.textContent = clean(detail) || "A remedy I added.";
    label.append(input, strong, small);
    remedyContainer.appendChild(label);
    refreshRemedyInputs();
    if (save) saveDraft();
    return input;
  }

  function restoreDraft() {
    try {
      const draft = JSON.parse(localStorage.getItem(draftKey) || "null");
      if (!draft) return;
      (draft.customOptions || []).forEach((option) => {
        const title = typeof option === "string" ? option : option.title;
        const detail = typeof option === "string" ? "" : option.detail;
        addRemedyOption(title, { detail, checked: false, save: false });
      });
      inputs.forEach((input) => { input.value = draft.texts?.[input.id] || ""; });
      refreshRemedyInputs();
      remedyInputs.forEach((input) => { input.checked = draft.remedies?.includes(input.value) || false; });
      responseInputs.forEach((input) => { input.checked = input.value === draft.responseType; });
      stressLevel.value = draft.stressLevel || "3";
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
    status.textContent = `${message} This will appear in 07 · Your personal remedy if you build a card.`;
  }

  function savePastReflection() {
    const helped = clean(document.getElementById("pastHelp").value);
    if (!helped) {
      document.getElementById("pastSaveStatus").textContent = "Write what helped first.";
      return;
    }
    addRemedyOption(helped, { detail: "Something that helped before." });
    showSaved("pastSaveStatus", "Saved. What helped is now a new option in Help the body.");
  }

  function saveWorryReflection() {
    const hasReflection = ["worstFear", "worryEvidence", "worryOther", "worryResponse", "worryKindness"]
      .some((id) => clean(document.getElementById(id).value));
    if (!hasReflection) {
      document.getElementById("worrySaveStatus").textContent = "Write one thought first.";
      return;
    }
    showSaved("worrySaveStatus", "Saved in this browser.");
  }

  function saveResponseReflection() {
    const response = responseInputs.find((input) => input.checked)?.value;
    const nextStep = clean(document.getElementById("nextKindStep").value);
    if (!response && !nextStep) {
      document.getElementById("responseSaveStatus").textContent = "Choose a response or write a next step first.";
      return;
    }
    showSaved("responseSaveStatus", "Saved in this browser.");
  }

  function saveTreeReflection() {
    const now = Number(document.getElementById("blobNow").value);
    const reason = clean(document.getElementById("blobReason").value);
    if (!Number.isInteger(now) || now < 1 || now > 21) {
      document.getElementById("treeSaveStatus").textContent = "Enter your current number from 1 to 21.";
      return;
    }
    if (!reason) {
      document.getElementById("treeSaveStatus").textContent = "Write what made you choose this number.";
      return;
    }
    const intensity = Number(stressLevel.value);
    showSaved("treeSaveStatus", `Saved: number ${now}, stress noticed ${intensity} / 5.`);
  }

  function addTypedRemedy() {
    const titleField = document.getElementById("customRemedyTitle");
    const detailField = document.getElementById("customRemedyDetail");
    const title = clean(titleField.value);
    const detail = clean(detailField.value);
    if (!title) {
      document.getElementById("bodySaveStatus").textContent = "Give your remedy a short name first.";
      return;
    }
    if (!detail) {
      document.getElementById("bodySaveStatus").textContent = "Add a short explanation of why it helps.";
      return;
    }
    addRemedyOption(title, { detail });
    titleField.value = "";
    detailField.value = "";
    saveDraft();
    document.getElementById("bodySaveStatus").textContent = "Added as a new selected option.";
  }

  function saveBodyChoices() {
    refreshRemedyInputs();
    if (!remedyInputs.some((input) => input.checked)) {
      document.getElementById("bodySaveStatus").textContent = "Select at least one remedy first.";
      return;
    }
    showSaved("bodySaveStatus", "Selected remedies saved in this browser.");
  }

  function selectedRemedies() {
    refreshRemedyInputs();
    return remedyInputs.filter((input) => input.checked).map((input) => {
      const detail = clean(input.dataset.detail);
      return detail ? `${input.value}: ${detail}` : input.value;
    });
  }

  function buildCard() {
    const remedies = selectedRemedies();
    const whatHelped = clean(document.getElementById("pastHelp").value);
    if (!remedies.length && !whatHelped) {
      builderStatus.textContent = "Choose a remedy or save what helped last time first.";
      document.getElementById("body").scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    currentCard = {
      createdAt: new Date().toISOString(),
      stressLevel: Number(stressLevel.value),
      pastSituation: clean(document.getElementById("pastStress").value),
      pastSigns: clean(document.getElementById("pastSigns").value),
      whatHelped,
      fear: clean(document.getElementById("worstFear").value),
      worryEvidence: clean(document.getElementById("worryEvidence").value),
      widerView: clean(document.getElementById("worryOther").value),
      firstResponse: clean(document.getElementById("worryResponse").value),
      friendWords: clean(document.getElementById("worryKindness").value),
      responseType: responseInputs.find((input) => input.checked)?.value || "Notice",
      nextStep: clean(document.getElementById("nextKindStep").value),
      remedies,
      blobNow: clean(document.getElementById("blobNow").value),
      blobReason: clean(document.getElementById("blobReason").value)
    };
    renderCurrentCard();
    result.hidden = false;
    builderStatus.textContent = "Your remedy card is ready.";
    result.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function makeRow(label, value) {
    if (!value) return "";
    return `<div class="remedy-card-row"><strong>${escapeHtml(label)}</strong><p>${escapeHtml(value)}</p></div>`;
  }

  function renderCurrentCard() {
    if (!currentCard) return;
    const remedies = (currentCard.remedies || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("");
    resultContent.innerHTML = `
      <div class="stress-score">Stress noticed right now <strong>${Number(currentCard.stressLevel) || 3} / 5</strong></div>
      ${makeRow("My Blob number now", currentCard.blobNow)}
      ${makeRow("Why I chose it", currentCard.blobReason)}
      ${makeRow("What helped before", currentCard.whatHelped)}
      ${makeRow("The worry I can see", currentCard.fear)}
      ${makeRow("A wider view", currentCard.widerView)}
      ${makeRow(currentCard.responseType || "My response", currentCard.nextStep)}
      ${remedies ? `<div class="remedy-card-row"><strong>Care for the body</strong><ul>${remedies}</ul></div>` : ""}
    `;
  }

  function escapeHtml(value) {
    const node = document.createElement("div");
    node.textContent = value;
    return node.innerHTML;
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
      saveStatus.textContent = "Saved below on this browser.";
      renderSaved();
      document.getElementById("saved-remedies").scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (_) {
      saveStatus.textContent = "This browser could not save the card.";
    }
  }

  function renderSaved() {
    const list = document.getElementById("savedStressList");
    const empty = document.getElementById("savedStressEmpty");
    const clear = document.getElementById("clearStressRemedies");
    const saved = loadSaved();
    list.innerHTML = "";
    empty.hidden = saved.length > 0;
    clear.hidden = saved.length === 0;
    saved.forEach((card) => {
      const article = document.createElement("article");
      article.className = "saved-reflection-card stress-saved-card";
      const date = new Date(card.createdAt);
      const summary = card.nextStep || card.remedies?.[0] || card.whatHelped || "A gentle pause";
      article.innerHTML = `
        <div class="saved-reflection-header">
          <time datetime="${escapeHtml(card.createdAt)}">${date.toLocaleString([], { dateStyle: "medium", timeStyle: "short" })}</time>
          <button type="button" data-delete="${escapeHtml(card.id)}">Delete</button>
        </div>
        <p class="saved-reflection-energy">Stress ${Number(card.stressLevel) || 3} / 5 · Blob ${escapeHtml(card.blobNow || "not recorded")} · ${escapeHtml(card.responseType || "Notice")}</p>
        <p class="saved-reflection-plan">${escapeHtml(summary)}</p>
        ${card.blobReason ? `<p class="saved-reflection-note"><strong>Why this Blob:</strong> ${escapeHtml(card.blobReason)}</p>` : ""}
        ${card.fear ? `<p class="saved-reflection-note"><strong>Worry:</strong> ${escapeHtml(card.fear)}</p>` : ""}
      `;
      list.appendChild(article);
    });
  }

  function deleteSaved(id) {
    const remaining = loadSaved().filter((card) => card.id !== id);
    localStorage.setItem(savedKey, JSON.stringify(remaining));
    renderSaved();
  }

  function updateBreathTimer() {
    const time = document.getElementById("breathTime");
    const prompt = document.getElementById("breathPrompt");
    const minutes = Math.floor(breathRemaining / 60);
    const seconds = breathRemaining % 60;
    time.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    if (breathRemaining === 0) {
      clearInterval(breathInterval);
      breathInterval = null;
      prompt.textContent = "Pause complete. Notice what changed.";
      document.getElementById("breathStart").textContent = "Again";
      document.getElementById("breathTimer").classList.remove("breathing");
    }
  }

  function toggleBreathTimer() {
    const button = document.getElementById("breathStart");
    const timer = document.getElementById("breathTimer");
    if (breathInterval) {
      clearInterval(breathInterval);
      breathInterval = null;
      button.textContent = "Continue";
      timer.classList.remove("breathing");
      return;
    }
    if (breathRemaining === 0) breathRemaining = 60;
    document.getElementById("breathPrompt").textContent = "Let the breath move gently";
    button.textContent = "Pause";
    timer.classList.add("breathing");
    updateBreathTimer();
    breathInterval = setInterval(() => {
      breathRemaining -= 1;
      updateBreathTimer();
    }, 1000);
  }

  function invalidateBuiltCard() {
    currentCard = null;
    result.hidden = true;
    resultContent.innerHTML = "";
    saveStatus.textContent = "";
    builderStatus.textContent = "A section was reset. Build a new card when you are ready.";
  }

  function finishSectionReset(statusId) {
    invalidateBuiltCard();
    saveDraft();
    document.getElementById(statusId).textContent = "Reset. This section will stay out of your next card unless you fill it in again.";
  }

  function clearTextFields(ids) {
    ids.forEach((id) => { document.getElementById(id).value = ""; });
  }

  function resetTreeReflection() {
    clearTextFields(["blobNow", "blobReason"]);
    stressLevel.value = "3";
    stressLevelValue.textContent = "3 / 5";
    finishSectionReset("treeSaveStatus");
  }

  function resetPastReflection() {
    const helped = clean(document.getElementById("pastHelp").value);
    refreshRemedyInputs();
    remedyInputs
      .filter((input) => input.dataset.custom === "true" && input.value === helped)
      .forEach((input) => input.closest("label")?.remove());
    clearTextFields(["pastStress", "pastSigns", "pastHelp"]);
    refreshRemedyInputs();
    finishSectionReset("pastSaveStatus");
  }

  function resetWorryReflection() {
    clearTextFields(["worstFear", "worryEvidence", "worryOther", "worryResponse", "worryKindness"]);
    finishSectionReset("worrySaveStatus");
  }

  function resetResponseReflection() {
    responseInputs.forEach((input) => { input.checked = false; });
    clearTextFields(["nextKindStep"]);
    finishSectionReset("responseSaveStatus");
  }

  function resetBodyChoices() {
    remedyContainer.querySelectorAll(".custom-remedy-option").forEach((option) => option.remove());
    refreshRemedyInputs();
    remedyInputs.forEach((input) => { input.checked = false; });
    clearTextFields(["customRemedyTitle", "customRemedyDetail"]);

    clearInterval(breathInterval);
    breathInterval = null;
    breathRemaining = 60;

    document.getElementById("breathTime").textContent = "01:00";
    document.getElementById("breathPrompt").textContent = "Breathe in your own rhythm";
    document.getElementById("breathStart").textContent = "Start";
    document.getElementById("breathTimer").classList.remove("breathing");
    finishSectionReset("bodySaveStatus");
  }

  refreshRemedyInputs();
  restoreDraft();
  stressLevelValue.textContent = `${stressLevel.value} / 5`;

  inputs.forEach((input) => input.addEventListener("input", saveDraft));
  responseInputs.forEach((input) => input.addEventListener("change", saveDraft));
  stressLevel.addEventListener("input", () => {
    stressLevelValue.textContent = `${stressLevel.value} / 5`;
    saveDraft();
  });
  remedyContainer.addEventListener("change", saveDraft);
  document.getElementById("savePastReflection").addEventListener("click", savePastReflection);
  document.getElementById("saveWorryReflection").addEventListener("click", saveWorryReflection);
  document.getElementById("saveResponseReflection").addEventListener("click", saveResponseReflection);
  document.getElementById("saveTreeReflection").addEventListener("click", saveTreeReflection);
  document.getElementById("addCustomRemedy").addEventListener("click", addTypedRemedy);
  document.getElementById("saveBodyChoices").addEventListener("click", saveBodyChoices);
  document.getElementById("buildStressRemedy").addEventListener("click", buildCard);
  document.getElementById("resetTreeReflection").addEventListener("click", resetTreeReflection);
  document.getElementById("resetPastReflection").addEventListener("click", resetPastReflection);
  document.getElementById("resetWorryReflection").addEventListener("click", resetWorryReflection);
  document.getElementById("resetResponseReflection").addEventListener("click", resetResponseReflection);
  document.getElementById("resetBodyChoices").addEventListener("click", resetBodyChoices);
  document.getElementById("saveStressRemedy").addEventListener("click", saveCurrentCard);
  document.getElementById("printStressRemedy").addEventListener("click", () => window.print());
  document.getElementById("breathStart").addEventListener("click", toggleBreathTimer);
  document.getElementById("savedStressList").addEventListener("click", (event) => {
    const button = event.target.closest("[data-delete]");
    if (button) deleteSaved(button.dataset.delete);
  });
  document.getElementById("clearStressRemedies").addEventListener("click", () => {
    if (!window.confirm("Clear all saved stress remedies from this browser?")) return;
    localStorage.removeItem(savedKey);
    renderSaved();
  });
  renderSaved();
})();

