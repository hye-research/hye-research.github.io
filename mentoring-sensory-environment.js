const experimentForm = document.querySelector('#sensoryExperimentForm');
const experimentResult = document.querySelector('#experimentResult');
const experimentPlan = document.querySelector('#experimentPlan');
const adjustmentChoices = document.querySelector('#adjustmentChoices');
const customAction = document.querySelector('#customAction');
const experimentStatus = document.querySelector('#experimentStatus');
const energyBefore = document.querySelector('#energyBefore');
const energyAfter = document.querySelector('#energyAfter');
const energyBeforeValue = document.querySelector('#energyBeforeValue');
const energyAfterValue = document.querySelector('#energyAfterValue');
const experimentNote = document.querySelector('#experimentNote');
const storageKey = 'sensory_environment_experiment_v2';
const historyKey = 'sensory_environment_reflections_v1';
const timerDisplay = document.querySelector('#timerDisplay');
const timerStatus = document.querySelector('#timerStatus');
const timerStart = document.querySelector('#timerStart');
const timerPause = document.querySelector('#timerPause');
const timerReset = document.querySelector('#timerReset');
const savedReflectionList = document.querySelector('#savedReflectionList');
const savedReflectionEmpty = document.querySelector('#savedReflectionEmpty');
const clearReflections = document.querySelector('#clearReflections');
const workbookSteps = [...experimentForm.querySelectorAll('.workbook-step')];
const workbookBack = document.querySelector('#workbookBack');
const workbookNext = document.querySelector('#workbookNext');
const workbookBuild = document.querySelector('#workbookBuild');
const workbookHint = document.querySelector('#workbookHint');
const workbookStepNumber = document.querySelector('#workbookStepNumber');
const workbookStepTitle = document.querySelector('#workbookStepTitle');
const progressDots = [...experimentForm.querySelectorAll('.workbook-progress-track i')];
const stepTitles = ['Check your energy', 'Choose your goal', 'Find the sensory costs', 'Choose small changes'];
let currentStep = 0;
let timerDuration = 25 * 60;
let timerRemaining = timerDuration;
let timerEndsAt = 0;
let timerInterval = null;

const goals = {
  read: 'read something complex',
  start: 'start a task',
  ideas: 'generate ideas',
  recover: 'recover after a demanding activity'
};

const senses = {
  sound: 'sound',
  light: 'light and visual detail',
  touch: 'touch or temperature',
  smell: 'smell, food or hunger',
  movement: 'movement and body position',
  people: 'people nearby'
};

const suggestions = {
  sound: [
    'use earplugs or noise-cancelling headphones',
    'sit farther away from conversations and equipment noise'
  ],
  light: [
    'face a plain wall and use one small lamp',
    'lower my screen brightness and reduce visual clutter'
  ],
  touch: [
    'change into a comfortable layer',
    'adjust the temperature and support my feet'
  ],
  smell: [
    'move away from strong smells',
    'prepare a familiar snack and keep water visible'
  ],
  movement: [
    'take a ten-minute walk before I begin',
    'stand, stretch or change position during the session'
  ],
  people: [
    'choose a quiet seat near the door',
    'work beside one familiar person for gentle body doubling'
  ]
};

const selectedValue = name => experimentForm.querySelector(`[name="${name}"]:checked`)?.value || '';
const selectedValues = name => [...experimentForm.querySelectorAll(`[name="${name}"]:checked`)].map(input => input.value);

function formatList(items) {
  if (items.length < 2) return items[0] || '';
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(', ')}, and ${items.at(-1)}`;
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function updateTimerDisplay() {
  timerDisplay.textContent = formatTime(timerRemaining);
}

function stopTimer() {
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = null;
  timerStart.disabled = false;
  timerPause.disabled = true;
}

function tickTimer() {
  timerRemaining = Math.max(0, Math.ceil((timerEndsAt - Date.now()) / 1000));
  updateTimerDisplay();
  if (timerRemaining === 0) {
    stopTimer();
    timerStatus.textContent = 'Time is up. Notice how you feel.';
    document.querySelector('.experiment-timer').classList.add('complete');
  }
}

function setTimer(minutes) {
  stopTimer();
  timerDuration = Math.max(1, Number(minutes) || 25) * 60;
  timerRemaining = timerDuration;
  document.querySelector('.experiment-timer').classList.remove('complete');
  timerStatus.textContent = 'Ready when you are.';
  updateTimerDisplay();
}

function getReflectionHistory() {
  try {
    const history = JSON.parse(localStorage.getItem(historyKey) || '[]');
    return Array.isArray(history) ? history : [];
  } catch {
    return [];
  }
}

function renderReflectionHistory() {
  const history = getReflectionHistory();
  savedReflectionList.replaceChildren();
  savedReflectionEmpty.hidden = history.length > 0;
  clearReflections.hidden = history.length === 0;
  history.forEach(item => {
    const card = document.createElement('article');
    const header = document.createElement('div');
    const date = document.createElement('time');
    const remove = document.createElement('button');
    const plan = document.createElement('p');
    const energy = document.createElement('p');
    const note = document.createElement('p');
    card.className = 'saved-reflection-card';
    card.dataset.id = item.id;
    header.className = 'saved-reflection-header';
    date.dateTime = item.savedAt;
    date.textContent = new Intl.DateTimeFormat('en-GB', {dateStyle: 'medium', timeStyle: 'short'}).format(new Date(item.savedAt));
    remove.type = 'button';
    remove.textContent = 'Remove';
    remove.setAttribute('aria-label', `Remove reflection saved ${date.textContent}`);
    plan.className = 'saved-reflection-plan';
    plan.textContent = item.plan;
    energy.className = 'saved-reflection-energy';
    energy.textContent = `Energy: ${item.energyBefore} / 5 before · ${item.energyAfter} / 5 after`;
    note.className = 'saved-reflection-note';
    note.textContent = item.note || 'No additional note.';
    header.append(date, remove);
    card.append(header, plan, energy, note);
    remove.addEventListener('click', () => {
      const next = getReflectionHistory().filter(entry => entry.id !== item.id);
      localStorage.setItem(historyKey, JSON.stringify(next));
      renderReflectionHistory();
    });
    savedReflectionList.append(card);
  });
}

function renderAdjustmentChoices(checkedValues = selectedValues('actionChoice')) {
  const options = selectedValues('sense').flatMap(sense => suggestions[sense] || []);
  adjustmentChoices.replaceChildren();
  options.forEach(option => {
    const label = document.createElement('label');
    const input = document.createElement('input');
    const text = document.createElement('strong');
    input.type = 'checkbox';
    input.name = 'actionChoice';
    input.value = option;
    input.checked = checkedValues.includes(option);
    text.textContent = option.charAt(0).toUpperCase() + option.slice(1);
    label.append(input, text);
    adjustmentChoices.append(label);
  });
}

function stepIsComplete(step) {
  if (step === 0) return Boolean(selectedValue('energy'));
  if (step === 1) return Boolean(selectedValue('goal'));
  if (step === 2) return selectedValues('sense').length > 0;
  return selectedValues('actionChoice').length > 0 || Boolean(customAction.value.trim());
}

function showStep(nextStep) {
  currentStep = Math.max(0, Math.min(workbookSteps.length - 1, nextStep));
  workbookSteps.forEach((step, index) => {
    const active = index === currentStep;
    step.hidden = !active;
    step.classList.toggle('active', active);
  });
  progressDots.forEach((dot, index) => dot.classList.toggle('active', index <= currentStep));
  workbookStepNumber.textContent = `Step ${currentStep + 1} of ${workbookSteps.length}`;
  workbookStepTitle.textContent = stepTitles[currentStep];
  workbookBack.hidden = currentStep === 0;
  workbookNext.hidden = currentStep === workbookSteps.length - 1;
  workbookBuild.hidden = currentStep !== workbookSteps.length - 1;
  workbookNext.disabled = !stepIsComplete(currentStep);
  workbookBuild.disabled = !stepIsComplete(currentStep);
  workbookHint.textContent = currentStep === 2
    ? 'Choose every input that feels relevant.'
    : currentStep === 3
      ? 'Choose several changes, or add your own.'
      : 'Choose the answer that feels closest today.';
}

function buildPlan(values) {
  const sensoryCosts = values.senses.map(sense => senses[sense]);
  const verb = sensoryCosts.length === 1 ? 'is' : 'are';
  const actions = values.actions.map(action => `I will ${action}`).join('. ');
  return `For my next ${values.duration}-minute session, I want to ${goals[values.goal]}. My energy is ${values.energy}. ${formatList(sensoryCosts)} ${verb} using energy. ${actions}.`;
}

function showPlan(values) {
  experimentPlan.textContent = buildPlan(values);
  experimentResult.hidden = false;
  setTimer(values.duration);
}

function currentValues() {
  const selectedActions = selectedValues('actionChoice');
  const personalAction = customAction.value.trim();
  return {
    energy: selectedValue('energy'),
    goal: selectedValue('goal'),
    senses: selectedValues('sense'),
    selectedActions,
    customAction: personalAction,
    actions: personalAction ? [...selectedActions, personalAction] : selectedActions,
    duration: experimentForm.elements.duration.value
  };
}

experimentForm.addEventListener('change', event => {
  if (event.target.name === 'sense') renderAdjustmentChoices();
  showStep(currentStep);
});

customAction.addEventListener('input', () => showStep(currentStep));
workbookNext.addEventListener('click', () => {
  if (stepIsComplete(currentStep)) {
    if (currentStep === 2) renderAdjustmentChoices();
    showStep(currentStep + 1);
  }
});
workbookBack.addEventListener('click', () => showStep(currentStep - 1));

experimentForm.addEventListener('submit', event => {
  event.preventDefault();
  const values = currentValues();
  showPlan(values);
  experimentStatus.textContent = 'Experiment ready.';
  experimentResult.scrollIntoView({behavior: 'smooth', block: 'center'});
});

function updateRange(input, output) {
  output.textContent = `${input.value} / 5`;
}

energyBefore.addEventListener('input', () => updateRange(energyBefore, energyBeforeValue));
energyAfter.addEventListener('input', () => updateRange(energyAfter, energyAfterValue));

timerStart.addEventListener('click', () => {
  if (timerRemaining === 0) timerRemaining = timerDuration;
  timerEndsAt = Date.now() + timerRemaining * 1000;
  timerInterval = setInterval(tickTimer, 250);
  timerStart.disabled = true;
  timerPause.disabled = false;
  timerStatus.textContent = 'Session in progress.';
  document.querySelector('.experiment-timer').classList.remove('complete');
});

timerPause.addEventListener('click', () => {
  tickTimer();
  stopTimer();
  if (timerRemaining > 0) timerStatus.textContent = 'Paused. Continue when ready.';
});

timerReset.addEventListener('click', () => setTimer(timerDuration / 60));

document.querySelector('#saveExperiment').addEventListener('click', () => {
  const values = currentValues();
  const savedAt = new Date().toISOString();
  const saved = {
    ...values,
    energyBefore: energyBefore.value,
    energyAfter: energyAfter.value,
    note: experimentNote.value.trim(),
    savedAt
  };
  localStorage.setItem(storageKey, JSON.stringify(saved));
  const history = getReflectionHistory();
  history.unshift({
    ...saved,
    id: globalThis.crypto?.randomUUID?.() || `${Date.now()}`,
    plan: buildPlan(values)
  });
  localStorage.setItem(historyKey, JSON.stringify(history.slice(0, 50)));
  renderReflectionHistory();
  experimentStatus.textContent = 'Saved. Your reflection is shown below.';
  document.querySelector('#saved-reflections').scrollIntoView({behavior: 'smooth', block: 'start'});
});

document.querySelector('#resetExperiment').addEventListener('click', () => {
  localStorage.removeItem(storageKey);
  experimentForm.reset();
  adjustmentChoices.replaceChildren();
  customAction.value = '';
  energyBefore.value = '3';
  energyAfter.value = '3';
  experimentNote.value = '';
  setTimer(25);
  updateRange(energyBefore, energyBeforeValue);
  updateRange(energyAfter, energyAfterValue);
  experimentResult.hidden = true;
  experimentStatus.textContent = '';
  showStep(0);
  document.querySelector('#experiments').scrollIntoView({behavior: 'smooth'});
});

clearReflections.addEventListener('click', () => {
  if (!window.confirm('Clear every saved sensory reflection from this browser?')) return;
  localStorage.removeItem(historyKey);
  renderReflectionHistory();
});

try {
  const saved = JSON.parse(localStorage.getItem(storageKey) || 'null');
  if (saved) {
    for (const name of ['energy', 'goal']) {
      const input = experimentForm.querySelector(`[name="${name}"][value="${saved[name]}"]`);
      if (input) input.checked = true;
    }
    for (const sense of saved.senses || []) {
      const input = experimentForm.querySelector(`[name="sense"][value="${sense}"]`);
      if (input) input.checked = true;
    }
    renderAdjustmentChoices(saved.selectedActions || []);
    experimentForm.elements.duration.value = saved.duration || '25';
    customAction.value = saved.customAction || '';
    energyBefore.value = saved.energyBefore || '3';
    energyAfter.value = saved.energyAfter || '3';
    experimentNote.value = saved.note || '';
    updateRange(energyBefore, energyBeforeValue);
    updateRange(energyAfter, energyAfterValue);
    showPlan(saved);
    experimentStatus.textContent = 'Restored from this browser.';
  }
} catch {
  localStorage.removeItem(storageKey);
}

showStep(0);
renderReflectionHistory();

