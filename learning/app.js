const LETTERS = [
  { h: "ㄱ", r: ["g", "k"] }, { h: "ㄲ", r: ["kk"] }, { h: "ㄴ", r: ["n"] },
  { h: "ㄷ", r: ["d", "t"] }, { h: "ㄸ", r: ["tt"] }, { h: "ㄹ", r: ["r", "l"] },
  { h: "ㅁ", r: ["m"] }, { h: "ㅂ", r: ["b", "p"] }, { h: "ㅃ", r: ["pp"] },
  { h: "ㅅ", r: ["s"] }, { h: "ㅆ", r: ["ss"] }, { h: "ㅇ", r: ["ng", "silent"] },
  { h: "ㅈ", r: ["j"] }, { h: "ㅉ", r: ["jj"] }, { h: "ㅊ", r: ["ch"] },
  { h: "ㅋ", r: ["k"] }, { h: "ㅌ", r: ["t"] }, { h: "ㅍ", r: ["p"] }, { h: "ㅎ", r: ["h"] },
  { h: "ㅏ", r: ["a"] }, { h: "ㅐ", r: ["ae"] }, { h: "ㅑ", r: ["ya"] },
  { h: "ㅒ", r: ["yae"] }, { h: "ㅓ", r: ["eo"] }, { h: "ㅔ", r: ["e"] },
  { h: "ㅕ", r: ["yeo"] }, { h: "ㅖ", r: ["ye"] }, { h: "ㅗ", r: ["o"] },
  { h: "ㅘ", r: ["wa"] }, { h: "ㅙ", r: ["wae"] }, { h: "ㅚ", r: ["oe", "we"] },
  { h: "ㅛ", r: ["yo"] }, { h: "ㅜ", r: ["u", "woo"] }, { h: "ㅝ", r: ["wo"] },
  { h: "ㅞ", r: ["we"] }, { h: "ㅟ", r: ["wi"] }, { h: "ㅠ", r: ["yu"] },
  { h: "ㅡ", r: ["eu"] }, { h: "ㅢ", r: ["ui", "eui"] }, { h: "ㅣ", r: ["i", "ee"] }
];

const CONFIG = {
  easy: { fall: 14500, spawn: 450, maxActive: 1 },
  mid: { fall: 11500, spawn: 2600, maxActive: 2 },
  hard: { fall: 8800, spawn: 1700, maxActive: 5 }
};
const LEARNING_GROUPS = {
  simpleVowels: { label: "单元音", chars: [..."ㅏㅑㅓㅕㅗㅛㅜㅠㅡㅣ"] },
  compoundVowels: { label: "双元音", chars: [..."ㅐㅒㅔㅖㅘㅙㅚㅝㅞㅟㅢ"] },
  lenis: { label: "松音", chars: [..."ㄱㄷㅂㅅㅈ"] },
  tense: { label: "紧音", chars: [..."ㄲㄸㅃㅆㅉ"] },
  aspirated: { label: "送气音", chars: [..."ㅋㅌㅍㅊ"] },
  sonorants: { label: "鼻音·流音", chars: [..."ㄴㅁㅇㄹ"] },
  glottal: { label: "喉音", chars: ["ㅎ"] }
};
const COLORS = ["#ffffff", "#ffc928", "#73d7c0", "#ff8b7a"];

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const startScreen = $(".start-screen");
const playScreen = $(".play-screen");
const field = $(".rain-field");
const input = $("#answer-input");
const answerForm = $(".answer-dock");
const inputWrap = $(".input-wrap");
const feedback = $(".feedback");
const keyboard = $(".game-keyboard");

let game = null;
let audioContext = null;
let pronunciationPlayer = new Audio();
let keyboardLanguage = "en";
let keyboardShifted = false;

const ENGLISH_KEYS = [
  [..."qwertyuiop"],
  [..."asdfghjkl"],
  [{ action: "shift", label: "⇧" }, ..."zxcvbnm", { action: "backspace", label: "⌫" }],
  [{ action: "switch", label: "한/영" }, { action: "space", label: "空格" }, { action: "enter", label: "确认" }]
];
const KOREAN_NORMAL = [
  [..."ㅂㅈㄷㄱㅅㅛㅕㅑㅐㅔ"],
  [..."ㅁㄴㅇㄹㅎㅗㅓㅏㅣ"],
  [{ action: "shift", label: "⇧" }, ..."ㅋㅌㅊㅍㅠㅜㅡ", { action: "backspace", label: "⌫" }],
  [{ action: "switch", label: "한/영" }, { action: "space", label: "空格" }, { action: "enter", label: "确认" }]
];
const KOREAN_SHIFTED = [
  [..."ㅃㅉㄸㄲㅆㅛㅕㅑㅒㅖ"],
  [..."ㅁㄴㅇㄹㅎㅗㅓㅏㅣ"],
  [{ action: "shift", label: "⇧" }, ..."ㅋㅌㅊㅍㅠㅜㅡ", { action: "backspace", label: "⌫" }],
  [{ action: "switch", label: "한/영" }, { action: "space", label: "空格" }, { action: "enter", label: "确认" }]
];
const VOWEL_COMBINATIONS = {
  "ㅗㅏ": "ㅘ", "ㅗㅐ": "ㅙ", "ㅗㅣ": "ㅚ",
  "ㅜㅓ": "ㅝ", "ㅜㅔ": "ㅞ", "ㅜㅣ": "ㅟ", "ㅡㅣ": "ㅢ"
};
const PRONUNCIATIONS = {
  "ㄱ": ["기역", "https://krdicmedia.korean.go.kr/multimedia/multimedia_files/convert/20120227/34552/SND000023255.mp3"],
  "ㄲ": ["쌍기역", "https://krdicmedia.korean.go.kr/multimedia/multimedia_files/convert/20120617/101286/SND000089989.mp3"],
  "ㄴ": ["니은", "https://krdicmedia.korean.go.kr/multimedia/multimedia_files/convert/20120522/85537/SND000074240.mp3"],
  "ㄷ": ["디귿", "https://krdicmedia.korean.go.kr/multimedia/multimedia_files/convert/20120220/30052/SND000018755.mp3"],
  "ㄸ": ["쌍디귿", "https://krdicmedia.korean.go.kr/multimedia/multimedia_files/convert/20120617/101242/SND000089945.mp3"],
  "ㄹ": ["리을", "https://krdicmedia.korean.go.kr/multimedia/multimedia_files/convert/20120531/90652/SND000079355.mp3"],
  "ㅁ": ["미음", "https://krdicmedia.korean.go.kr/multimedia/multimedia_files/convert/20120509/77724/SND000066427.mp3"],
  "ㅂ": ["비읍", "https://krdicmedia.korean.go.kr/multimedia/multimedia_files/convert/20120120/11739/SND000005792.mp3"],
  "ㅃ": ["쌍비읍", "https://krdicmedia.korean.go.kr/multimedia/multimedia_files/convert/20120617/101226/SND000089929.mp3"],
  "ㅅ": ["시옷", "https://krdicmedia.korean.go.kr/multimedia/multimedia_files/convert/20120615/100171/SND000088874.mp3"],
  "ㅆ": ["쌍시옷", "https://krdicmedia.korean.go.kr/multimedia/multimedia_files/convert/20120617/101372/SND000090075.mp3"],
  "ㅇ": ["이응", "https://krdicmedia.korean.go.kr/multimedia/multimedia_files/convert/20120321/48015/SND000036718.mp3"],
  "ㅈ": ["지읒", "https://krdicmedia.korean.go.kr/multimedia/multimedia_files/convert/20120504/74782/SND000063485.mp3"],
  "ㅉ": ["쌍지읒", "https://krdicmedia.korean.go.kr/multimedia/multimedia_files/convert/20120617/101313/SND000090016.mp3"],
  "ㅊ": ["치읓", "https://krdicmedia.korean.go.kr/multimedia/multimedia_files/convert/20120206/21845/SND000010849.mp3"],
  "ㅋ": ["키읔", "https://krdicmedia.korean.go.kr/multimedia/multimedia_files/convert/20120507/76252/SND000064955.mp3"],
  "ㅌ": ["티읕", "https://krdicmedia.korean.go.kr/multimedia/multimedia_files/convert/20120624/105327/SND000094030.mp3"],
  "ㅍ": ["피읖", "https://krdicmedia.korean.go.kr/multimedia/multimedia_files/convert/20120530/90473/SND000079176.mp3"],
  "ㅎ": ["히읗", "https://krdicmedia.korean.go.kr/multimedia/multimedia_files/convert/20120319/46994/SND000035697.mp3"],
  "ㅏ": ["아", "https://krdicmedia.korean.go.kr/multimedia/multimedia_files/convert/20160913/20000/18000/325054/SND000334408.mp3"],
  "ㅐ": ["애", "https://krdicmedia.korean.go.kr/multimedia/multimedia_files/convert/20160913/20000/18000/325055/SND000334409.mp3"],
  "ㅑ": ["야", "https://krdicmedia.korean.go.kr/multimedia/multimedia_files/convert/20160913/20000/13000/325056/SND000334410.mp3"],
  "ㅒ": ["얘", "https://krdicmedia.korean.go.kr/multimedia/multimedia_files/convert/20160913/20000/18000/325060/SND000334414.mp3"],
  "ㅓ": ["어", "https://krdicmedia.korean.go.kr/multimedia/multimedia_files/convert/20160913/20000/13000/325061/SND000334415.mp3"],
  "ㅔ": ["에", "https://krdicmedia.korean.go.kr/multimedia/multimedia_files/convert/20160913/20000/18000/325062/SND000334416.mp3"],
  "ㅕ": ["여", "https://krdicmedia.korean.go.kr/multimedia/multimedia_files/convert/20160913/20000/13000/325079/SND000334433.mp3"],
  "ㅖ": ["예", "https://krdicmedia.korean.go.kr/multimedia/multimedia_files/convert/20160913/20000/18000/325063/SND000334417.mp3"],
  "ㅗ": ["오", "https://krdicmedia.korean.go.kr/multimedia/multimedia_files/convert/20160913/20000/18000/325081/SND000334435.mp3"],
  "ㅘ": ["와", "https://krdicmedia.korean.go.kr/multimedia/multimedia_files/convert/20160913/20000/13000/325064/SND000334418.mp3"],
  "ㅙ": ["왜", "https://krdicmedia.korean.go.kr/multimedia/multimedia_files/convert/20160913/20000/18000/325066/SND000334420.mp3"],
  "ㅚ": ["외", "https://krdicmedia.korean.go.kr/multimedia/multimedia_files/convert/20160913/20000/13000/325067/SND000334421.mp3"],
  "ㅛ": ["요", "https://krdicmedia.korean.go.kr/multimedia/multimedia_files/convert/20160913/20000/18000/325082/SND000334436.mp3"],
  "ㅜ": ["우", "https://krdicmedia.korean.go.kr/multimedia/multimedia_files/convert/20120327/51678/SND000040381.mp3"],
  "ㅝ": ["워", "https://krdicmedia.korean.go.kr/multimedia/multimedia_files/convert/20160913/20000/13000/325073/SND000334427.mp3"],
  "ㅞ": ["웨", "https://krdicmedia.korean.go.kr/multimedia/multimedia_files/convert/20160913/20000/18000/325071/SND000334425.mp3"],
  "ㅟ": ["위", "https://krdicmedia.korean.go.kr/multimedia/multimedia_files/convert/20160913/20000/13000/325072/SND000334426.mp3"],
  "ㅠ": ["유", "https://krdicmedia.korean.go.kr/multimedia/multimedia_files/convert/20160913/20000/18000/325083/SND000334437.mp3"],
  "ㅡ": ["으", "https://krdicmedia.korean.go.kr/multimedia/multimedia_files/convert/20160913/20000/18000/325084/SND000334438.mp3"],
  "ㅢ": ["의", "https://krdicmedia.korean.go.kr/multimedia/multimedia_files/convert/20160913/20000/13000/325078/SND000334432.mp3"],
  "ㅣ": ["이", "https://krdicmedia.korean.go.kr/multimedia/multimedia_files/convert/20120324/50081/SND000038784.mp3"]
};

function selected(name) { return $(`input[name="${name}"]:checked`).value; }
function normalize(value) { return value.trim().toLowerCase().replace(/[\s'’-]+/g, ""); }
function padScore(value) { return String(value).padStart(4, "0"); }

function shuffle(items) {
  for (let index = items.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [items[index], items[swapIndex]] = [items[swapIndex], items[index]];
  }
  return items;
}

function basicRomanize(word) {
  const initials = ["g","kk","n","d","tt","r","m","b","pp","s","ss","","j","jj","ch","k","t","p","h"];
  const vowels = ["a","ae","ya","yae","eo","e","yeo","ye","o","wa","wae","oe","yo","u","wo","we","wi","yu","eu","ui","i"];
  const finals = ["","k","k","ks","n","nj","nh","t","l","lk","lm","lb","ls","lt","lp","lh","m","p","ps","t","t","ng","t","t","k","t","p","t"];
  return [...word].map(character => {
    const code = character.charCodeAt(0) - 0xac00;
    if (code < 0 || code > 11171) return character;
    return initials[Math.floor(code / 588)] + vowels[Math.floor((code % 588) / 28)] + finals[code % 28];
  }).join("");
}

function romanizeWord(word) {
  try {
    if (globalThis.koroman?.romanize) return globalThis.koroman.romanize(word);
  } catch (_) { /* Fall back to local syllable romanization. */ }
  return basicRomanize(word);
}

function speakWord(word) {
  if ($(".sound-toggle").classList.contains("muted") || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "ko-KR";
  utterance.rate = .82;
  const koreanVoice = window.speechSynthesis.getVoices().find(voice => voice.lang.toLowerCase().startsWith("ko"));
  if (koreanVoice) utterance.voice = koreanVoice;
  window.speechSynthesis.speak(utterance);
}

function renderKeyboard() {
  const rows = keyboardLanguage === "en"
    ? ENGLISH_KEYS
    : (keyboardShifted ? KOREAN_SHIFTED : KOREAN_NORMAL);
  keyboard.replaceChildren();
  keyboard.setAttribute("aria-label", keyboardLanguage === "en" ? "英文屏幕键盘" : "韩文屏幕键盘");

  for (const rowKeys of rows) {
    const row = document.createElement("div");
    row.className = "keyboard-row";
    for (const item of rowKeys) {
      const key = document.createElement("button");
      key.type = "button";
      key.className = "key";
      if (typeof item === "string") {
        const shown = keyboardLanguage === "en" && keyboardShifted ? item.toUpperCase() : item;
        key.textContent = shown;
        key.dataset.key = shown;
        key.setAttribute("aria-label", `输入 ${shown}`);
      } else {
        key.textContent = item.label;
        key.dataset.action = item.action;
        key.classList.add("key-special", `key-${item.action}`);
        if (item.action === "space") key.classList.add("key-space");
        if (item.action === "enter") key.classList.add("key-enter");
        if (item.action === "shift" && keyboardShifted) key.classList.add("active");
      }
      row.appendChild(key);
    }
    keyboard.appendChild(row);
  }
}

function hasExactAnswer(value) {
  if (!game) return false;
  return game.drops.some(drop => !drop.dead && (
    drop.direction === "hangul"
      ? drop.letter.r.includes(normalize(value))
      : drop.letter.h === value.trim()
  ));
}

function hasLongerAnswer(value) {
  if (!game) return false;
  const normalized = normalize(value);
  return game.drops.some(drop => {
    if (drop.dead) return false;
    if (drop.direction === "hangul") {
      return drop.letter.r.some(answer => answer.startsWith(normalized) && answer !== normalized);
    }
    return Object.entries(VOWEL_COMBINATIONS).some(([keys, result]) => (
      result === drop.letter.h && keys.startsWith(value) && keys !== value
    ));
  });
}

function appendAnswer(character) {
  if (!game || game.paused || game.over) return;
  if (game.direction === "words" && game.wordResolved) return;
  const chars = [...input.value];
  if (keyboardLanguage === "ko" && chars.length) {
    const combined = VOWEL_COMBINATIONS[chars.at(-1) + character];
    if (combined) {
      chars[chars.length - 1] = combined;
      input.value = chars.join("");
    } else {
      input.value += character;
    }
  } else {
    input.value += character;
  }
  if (keyboardShifted) {
    keyboardShifted = false;
    renderKeyboard();
  }
  if (game.direction === "words") {
    if (normalize(input.value) === normalize(romanizeWord(game.currentWord))) {
      tryWordAnswer(input.value);
      input.value = "";
    }
  } else if (hasExactAnswer(input.value) && !hasLongerAnswer(input.value)) {
    tryAnswer(input.value);
    input.value = "";
  }
}

function handleKeyboardAction(action) {
  if (!game || game.paused || game.over) return;
  if (game.direction === "words" && game.wordResolved) {
    if (action === "enter") nextWord();
    return;
  }
  if (action === "switch") {
    keyboardLanguage = keyboardLanguage === "en" ? "ko" : "en";
    keyboardShifted = false;
    renderKeyboard();
    return;
  }
  if (action === "shift") {
    keyboardShifted = !keyboardShifted;
    renderKeyboard();
    return;
  }
  if (action === "backspace") {
    input.value = [...input.value].slice(0, -1).join("");
    return;
  }
  if (action === "space") {
    input.value += " ";
    return;
  }
  if (action === "enter") answerForm.requestSubmit();
}

function beep(kind) {
  if ($(".sound-toggle").classList.contains("muted")) return;
  try {
    audioContext ??= new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.connect(gain); gain.connect(audioContext.destination);
    const now = audioContext.currentTime;
    osc.type = kind === "good" ? "sine" : "triangle";
    osc.frequency.setValueAtTime(kind === "good" ? 520 : 165, now);
    if (kind === "good") osc.frequency.exponentialRampToValueAtTime(820, now + .09);
    gain.gain.setValueAtTime(.055, now);
    gain.gain.exponentialRampToValueAtTime(.001, now + .13);
    osc.start(now); osc.stop(now + .14);
  } catch (_) { /* Audio is optional. */ }
}

function playPronunciation(letter) {
  if ($(".sound-toggle").classList.contains("muted")) return;
  const pronunciation = PRONUNCIATIONS[letter.h];
  if (!pronunciation) return;
  pronunciationPlayer.pause();
  pronunciationPlayer.src = pronunciation[1];
  pronunciationPlayer.currentTime = 0;
  pronunciationPlayer.play().catch(() => {
    // Mobile browsers may require the learner to tap the replay button once.
  });
}

function showFeedback(text, wrong = false) {
  feedback.textContent = text;
  feedback.className = `feedback ${wrong ? "wrong " : ""}show`;
  void feedback.offsetWidth;
  feedback.classList.add("show");
}

function updateHud() {
  $(".score-value").textContent = padScore(game.score);
  $(".streak-value").textContent = game.streak;
  $(".mistake-value").textContent = game.errors.length;
  $(".mistakes").setAttribute("aria-label", `错误 ${game.errors.length} 次，共可错误 10 次`);
}

function recordError(drop, kind, given = "") {
  game.errors.push({ letter: drop?.letter || null, kind, given: given.trim() });
}

function buildDrop(letter) {
  const direction = game.direction === "mixed" || game.direction === "learning"
    ? (Math.random() < .5 ? "hangul" : "roman")
    : game.direction;
  const node = document.createElement("div");
  node.className = `falling-card ${direction === "roman" ? "roman" : ""}`;
  node.textContent = direction === "hangul" ? letter.h : letter.r[0];
  node.style.background = COLORS[Math.floor(Math.random() * COLORS.length)];
  if (node.style.background === "rgb(255, 255, 255)") node.style.color = "#171712";
  field.appendChild(node);

  const maxX = Math.max(8, field.clientWidth - 68);
  const x = 8 + Math.random() * (maxX - 8);
  const duration = CONFIG[game.speed].fall * (.88 + Math.random() * .24);
  const drop = { node, letter, direction, x, y: -70, born: performance.now(), pauseAtBirth: game.pauseOffset, duration, dead: false };
  node.style.transform = `translate(${x}px, -70px) rotate(${(Math.random() * 8 - 4).toFixed(1)}deg)`;
  game.drops.push(drop);
  return drop;
}

function spawn() {
  if (!game || game.paused || game.over) return;
  const settings = CONFIG[game.speed];
  const activeLetters = game.letters;
  let letter = activeLetters[Math.floor(Math.random() * activeLetters.length)];
  const visible = new Set(game.drops.filter(d => !d.dead).map(d => `${d.direction}:${d.direction === "hangul" ? d.letter.r[0] : d.letter.h}`));
  const nextDirection = game.direction === "mixed" || game.direction === "learning" ? "hangul" : game.direction;
  for (let i = 0; i < 8 && visible.has(`${nextDirection}:${nextDirection === "hangul" ? letter.r[0] : letter.h}`); i++) {
    letter = activeLetters[Math.floor(Math.random() * activeLetters.length)];
  }
  if (game.drops.filter(drop => !drop.dead).length < settings.maxActive) buildDrop(letter);
  game.spawnTimer = window.setTimeout(spawn, settings.spawn * (.82 + Math.random() * .36));
}

function animate(now) {
  if (!game || game.over) return;
  if (!game.paused) {
    const fieldBottom = field.clientHeight - 94;
    for (const drop of game.drops) {
      if (drop.dead) continue;
      const elapsed = now - drop.born - (game.pauseOffset - drop.pauseAtBirth);
      drop.y = -70 + (field.clientHeight + 84) * Math.max(0, elapsed / drop.duration);
      const rotation = Math.sin(elapsed / 700) * 3;
      const position = `translate(${drop.x}px, ${drop.y}px)`;
      drop.node.style.setProperty("--position", position);
      drop.node.style.transform = `${position} rotate(${rotation}deg)`;
      if (drop.y >= fieldBottom) {
        missDrop(drop);
        if (game.paused || game.over) break;
      }
    }
    game.drops = game.drops.filter(drop => !drop.dead || drop.node.isConnected);
    markUrgent();
  }
  game.raf = requestAnimationFrame(animate);
}

function markUrgent() {
  const alive = game.drops.filter(d => !d.dead).sort((a, b) => b.y - a.y);
  game.drops.forEach(d => d.node.classList.remove("target"));
  alive[0]?.node.classList.add("target");
}

function removeDrop(drop) {
  drop.dead = true;
  drop.node.classList.add("pop");
  window.setTimeout(() => drop.node.remove(), 240);
}

function missDrop(drop) {
  drop.dead = true;
  drop.node.remove();
  game.streak = 0;
  recordError(drop, "miss");

  if (game.direction === "learning" || game.speed === "easy") {
    game.endAfterLesson = game.direction !== "learning" && game.errors.length >= 10;
    updateHud();
    openLesson(drop);
    return;
  }

  showFeedback(`没关系 · ${drop.letter.h} = ${drop.letter.r[0]}`, true);
  beep("bad");
  updateHud();
  if (navigator.vibrate) navigator.vibrate(60);
  if (game.errors.length >= 10) endGame();
}

function nextWord() {
  if (!game || game.over) return;
  if (!game.wordQueue.length) game.wordQueue = shuffle([...KOREAN_VOCABULARY]);
  game.currentWord = game.wordQueue.pop();
  game.wordSeen += 1;
  game.wordResolved = false;
  input.value = "";
  $(".word-prompt").textContent = game.currentWord;
  $(".word-progress").textContent = `${((game.wordSeen - 1) % KOREAN_VOCABULARY.length) + 1} / ${KOREAN_VOCABULARY.length}`;
  $(".word-reveal").hidden = true;
  $(".word-result-label").className = "word-result-label";
  input.focus({ preventScroll: true });
}

function tryWordAnswer(raw) {
  if (!game || game.wordResolved || !normalize(raw)) return;
  const expected = romanizeWord(game.currentWord);
  const correct = normalize(raw) === normalize(expected);
  game.attempts += 1;
  game.wordResolved = true;
  if (correct) {
    game.correct += 1;
    game.cleared += 1;
    game.streak += 1;
    game.best = Math.max(game.best, game.streak);
    game.score += 100 + Math.min(game.streak - 1, 10) * 15;
    $(".word-result-label").textContent = "读对了";
    $(".word-result-label").classList.add("correct");
    beep("good");
  } else {
    game.streak = 0;
    game.errors.push({ word: game.currentWord, expected, given: raw.trim(), kind: "wrong" });
    $(".word-result-label").textContent = "正确读法";
    $(".word-result-label").classList.add("wrong");
    beep("bad");
  }
  $(".word-romanization").textContent = expected;
  $(".word-reveal").hidden = false;
  updateHud();
}

function tryAnswer(raw) {
  if (!game || game.paused || game.over) return;
  if (game.direction === "words") {
    tryWordAnswer(raw);
    return;
  }
  const answer = normalize(raw);
  if (!answer) return;
  game.attempts += 1;
  const matches = game.drops.filter(drop => {
    if (drop.dead) return false;
    return drop.direction === "hangul"
      ? drop.letter.r.some(r => normalize(r) === answer)
      : drop.letter.h === raw.trim();
  }).sort((a, b) => b.y - a.y);

  if (matches.length) {
    const drop = matches[0];
    removeDrop(drop);
    game.cleared += 1;
    game.streak += 1;
    game.best = Math.max(game.best, game.streak);
    game.correct += 1;
    game.score += 100 + Math.min(game.streak - 1, 10) * 15;
    showFeedback(game.streak >= 3 ? `好稳！${game.streak}×` : "接住了！");
    beep("good");
  } else {
    const target = game.drops.filter(drop => !drop.dead).sort((a, b) => b.y - a.y)[0];
    recordError(target, "wrong", raw);
    game.streak = 0;
    inputWrap.classList.remove("shake");
    void inputWrap.offsetWidth;
    inputWrap.classList.add("shake");
    showFeedback("差一点，再试试", true);
    if (game.speed === "easy" && target) {
      game.endAfterLesson = game.direction !== "learning" && game.errors.length >= 10;
      openLesson(target);
    } else {
      beep("bad");
    }
  }
  updateHud();
  if (!game.paused && game.direction !== "learning" && game.errors.length >= 10) endGame();
}

function startGame() {
  $$(".falling-card").forEach(n => n.remove());
  game = {
    direction: selected("direction"), speed: selected("speed"), score: 0, streak: 0,
    best: 0, cleared: 0, attempts: 0, correct: 0, errors: [], drops: [], paused: false,
    over: false, spawnTimer: null, raf: null, pauseStarted: 0, pauseOffset: 0,
    letters: LETTERS, learningGroup: null, endAfterLesson: false, currentCorrection: null,
    wordQueue: [], currentWord: "", wordSeen: 0, wordResolved: false
  };
  if (game.direction === "learning") {
    game.learningGroup = LEARNING_GROUPS[selected("learning-group")];
    game.letters = LETTERS.filter(letter => game.learningGroup.chars.includes(letter.h));
  }
  startScreen.classList.remove("active");
  $(".game-card").classList.add("playing");
  playScreen.classList.add("active");
  playScreen.classList.toggle("learning", game.direction === "learning");
  playScreen.classList.toggle("words", game.direction === "words");
  keyboardLanguage = game.direction === "roman" ? "ko" : "en";
  keyboardShifted = false;
  renderKeyboard();
  $(".answer-hint").textContent = game.direction === "hangul" ? "输入罗马音" : game.direction === "roman" ? "使用韩文键盘" : game.direction === "learning" ? game.learningGroup.label : game.direction === "words" ? "修订罗马字" : "双向练习";
  input.placeholder = game.direction === "hangul" ? "输入 a、eo、g…" : game.direction === "roman" ? "输入 ㅏ、ㅓ、ㄱ…" : game.direction === "words" ? "输入这个词的罗马音…" : "输入读音或韩文字母…";
  $(".dock-note").textContent = game.direction === "learning"
    ? `${game.learningGroup.label}：${game.letters.map(letter => letter.h).join(" · ")}`
    : game.direction === "words" ? "写完后按确认 · 答对也会自动提交" : "答对就会接住它 · 按 Enter 也可以";
  $(".word-mode-panel").hidden = game.direction !== "words";
  updateHud();
  input.value = "";
  if (game.direction === "words") {
    game.wordQueue = shuffle([...KOREAN_VOCABULARY]);
    nextWord();
    return;
  }
  window.setTimeout(() => {
    if (!game || game.over) return;
    buildDrop(game.letters[Math.floor(Math.random() * game.letters.length)]);
    game.spawnTimer = window.setTimeout(spawn, CONFIG[game.speed].spawn);
  }, 300);
  game.raf = requestAnimationFrame(animate);
  input.focus({ preventScroll: true });
}

function pauseGame() {
  if (!game || game.over) return;
  game.paused = true;
  game.pauseStarted = performance.now();
  clearTimeout(game.spawnTimer);
  $(".pause-overlay").classList.add("open");
  $(".pause-overlay").setAttribute("aria-hidden", "false");
}

function resumeGame() {
  if (!game) return;
  game.pauseOffset += performance.now() - game.pauseStarted;
  game.paused = false;
  $(".pause-overlay").classList.remove("open");
  $(".pause-overlay").setAttribute("aria-hidden", "true");
  game.spawnTimer = window.setTimeout(spawn, 450);
  input.focus({ preventScroll: true });
}

function openLesson(drop) {
  game.paused = true;
  game.pauseStarted = performance.now();
  clearTimeout(game.spawnTimer);
  const seen = drop.direction === "hangul" ? drop.letter.h : drop.letter.r[0];
  const expected = drop.direction === "hangul" ? drop.letter.r[0] : drop.letter.h;
  const pronunciation = PRONUNCIATIONS[drop.letter.h];
  game.currentCorrection = drop;
  $(".lesson-seen").textContent = seen;
  $(".lesson-expected").textContent = expected;
  $(".lesson-copy").textContent = `看到 ${seen} 时，输入 ${expected}`;
  $(".pronunciation-name").textContent = pronunciation?.[0] || drop.letter.h;
  $(".pronunciation-source").href = `https://krdict.korean.go.kr/kor/dicMarinerSearch/search?mainSearchWord=${encodeURIComponent(drop.letter.h)}`;
  $(".lesson-overlay").classList.add("open");
  $(".lesson-overlay").setAttribute("aria-hidden", "false");
  playPronunciation(drop.letter);
  if (navigator.vibrate) navigator.vibrate(45);
}

function continueLesson() {
  if (!game || game.over) return;
  game.pauseOffset += performance.now() - game.pauseStarted;
  game.paused = false;
  $(".lesson-overlay").classList.remove("open");
  $(".lesson-overlay").setAttribute("aria-hidden", "true");
  if (game.endAfterLesson) {
    game.endAfterLesson = false;
    endGame();
    return;
  }
  game.spawnTimer = window.setTimeout(spawn, 700);
  input.focus({ preventScroll: true });
}

function cleanupGame() {
  if (!game) return;
  clearTimeout(game.spawnTimer);
  cancelAnimationFrame(game.raf);
  game.over = true;
  $$(".falling-card").forEach(n => n.remove());
}

function endGame() {
  if (!game || game.over) return;
  cleanupGame();
  $(".result-modal > .eyebrow").textContent = game.direction === "learning" ? "今天的韩雨 · 先接到这里" : game.direction === "words" ? "高频千词 · 今日进度" : "韩雨过后 · 又会一点";
  $(".result-modal > h2").textContent = game.direction === "learning" ? `${game.learningGroup.label}，正在记住` : game.direction === "words" ? `今天练了 ${game.attempts} 个词` : "雨停了，进步留下了";
  $(".recap h3").textContent = game.direction === "words" ? "这次读错的词" : "这次错过的字母";
  $(".result-score strong").textContent = padScore(game.score);
  $(".result-cleared").textContent = game.cleared;
  $(".result-best").textContent = `${game.best}×`;
  $(".result-accuracy").textContent = `${game.attempts ? Math.round(game.correct / game.attempts * 100) : 0}%`;
  renderRecap();
  $(".result-overlay").classList.add("open");
  $(".result-overlay").setAttribute("aria-hidden", "false");
}

function renderRecap() {
  const list = $(".recap-list");
  list.replaceChildren();
  if (game.direction === "words") {
    const wordErrors = game.errors.filter(error => error.word);
    if (!wordErrors.length) {
      const empty = document.createElement("p");
      empty.className = "recap-empty";
      empty.textContent = "全部读对了，很稳！";
      list.appendChild(empty);
      return;
    }
    for (const error of wordErrors) {
      const row = document.createElement("div");
      row.className = "recap-item word-recap-item";
      const word = document.createElement("strong");
      word.textContent = error.word;
      const expected = document.createElement("span");
      expected.textContent = error.expected;
      const given = document.createElement("small");
      given.textContent = `输入：${error.given || "—"}`;
      row.append(word, expected, given);
      list.appendChild(row);
    }
    return;
  }
  const grouped = new Map();
  for (const error of game.errors) {
    if (!error.letter) continue;
    const key = error.letter.h;
    if (!grouped.has(key)) grouped.set(key, { letter: error.letter, wrong: 0, miss: 0 });
    grouped.get(key)[error.kind] += 1;
  }
  if (!grouped.size) {
    const empty = document.createElement("p");
    empty.className = "recap-empty";
    empty.textContent = "全部接住了，很稳！";
    list.appendChild(empty);
    return;
  }
  for (const { letter, wrong, miss } of grouped.values()) {
    const row = document.createElement("div");
    row.className = "recap-item";
    const hangul = document.createElement("strong");
    hangul.textContent = letter.h;
    const roman = document.createElement("span");
    roman.textContent = letter.r[0];
    const note = document.createElement("small");
    note.textContent = [wrong ? `答错 ${wrong}` : "", miss ? `漏掉 ${miss}` : ""].filter(Boolean).join(" · ");
    row.append(hangul, roman, note);
    list.appendChild(row);
  }
}

function goHome() {
  cleanupGame();
  $(".pause-overlay").classList.remove("open");
  $(".result-overlay").classList.remove("open");
  $(".lesson-overlay").classList.remove("open");
  $$(".overlay").forEach(o => o.setAttribute("aria-hidden", "true"));
  playScreen.classList.remove("active");
  $(".game-card").classList.remove("playing");
  startScreen.classList.add("active");
}

function syncLearningSetup() {
  const mode = selected("direction");
  const learning = mode === "learning";
  const words = mode === "words";
  $(".learning-groups").hidden = !learning;
  $(".difficulty-fieldset").hidden = words;
  startScreen.classList.toggle("learning-setup", learning);
  startScreen.classList.toggle("word-setup", words);
}

$(".start-button").addEventListener("click", startGame);
$(".pause-button").addEventListener("click", pauseGame);
$(".resume-button").addEventListener("click", resumeGame);
$(".quit-button").addEventListener("click", goHome);
$(".again-button").addEventListener("click", () => {
  $(".result-overlay").classList.remove("open");
  $(".result-overlay").setAttribute("aria-hidden", "true");
  startGame();
});
$(".home-button").addEventListener("click", goHome);
$(".finish-learning-button").addEventListener("click", endGame);
$(".lesson-continue-button").addEventListener("click", continueLesson);
$(".pronunciation-button").addEventListener("click", () => {
  if (game?.currentCorrection) playPronunciation(game.currentCorrection.letter);
});
$(".word-audio-button").addEventListener("click", () => { if (game?.currentWord) speakWord(game.currentWord); });
$(".next-word-button").addEventListener("click", nextWord);
$$('input[name="direction"]').forEach(option => option.addEventListener("change", syncLearningSetup));
$(".sound-toggle").addEventListener("click", event => {
  const button = event.currentTarget;
  button.classList.toggle("muted");
  const muted = button.classList.contains("muted");
  button.setAttribute("aria-pressed", String(!muted));
  button.setAttribute("aria-label", muted ? "打开声音" : "关闭声音");
  if (muted) {
    pronunciationPlayer.pause();
    window.speechSynthesis?.cancel();
  }
});
answerForm.addEventListener("submit", event => { event.preventDefault(); tryAnswer(input.value); input.value = ""; });
input.addEventListener("input", () => {
  if (!game || game.paused) return;
  const current = input.value;
  if (hasExactAnswer(current) && !hasLongerAnswer(current)) { tryAnswer(current); input.value = ""; }
});
keyboard.addEventListener("click", event => {
  const key = event.target.closest(".key");
  if (!key) return;
  if (key.dataset.key) appendAnswer(key.dataset.key);
  else if (key.dataset.action) handleKeyboardAction(key.dataset.action);
});
document.addEventListener("keydown", event => {
  if (!game || game.paused || game.over || !playScreen.classList.contains("active")) return;
  if (/^[a-zA-Zㄱ-ㅎㅏ-ㅣ]$/.test(event.key)) {
    event.preventDefault();
    appendAnswer(event.key);
  } else if (event.key === "Backspace") {
    event.preventDefault();
    input.value = [...input.value].slice(0, -1).join("");
  } else if (event.key === "Enter") {
    event.preventDefault();
    if (game.direction === "words" && game.wordResolved) nextWord();
    else answerForm.requestSubmit();
  }
});
document.addEventListener("visibilitychange", () => { if (document.hidden && game && !game.paused && !game.over) pauseGame(); });

renderKeyboard();
syncLearningSetup();
