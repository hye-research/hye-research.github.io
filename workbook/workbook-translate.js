(function () {
  const LANGUAGE_KEY = "mapping-me-language";

  const translations = {
    "Mapping Me": "Mapping Me",
    "Workbook Library": "工作本库",
    "Private by default.": "默认私密。",
    "Workbook notes save in this browser on this device. They are not uploaded.": "工作本笔记只会保存在这台设备的浏览器里，不会上传。",
    "Your answers save in this browser on this device. They are not uploaded. Export JSON if you want a backup or want to move devices.": "你的回答只会保存在这台设备的浏览器里，不会上传。如果想备份或换设备，可以导出 JSON。",
    "Your answers save in this browser on this device. They are not uploaded.": "你的回答只会保存在这台设备的浏览器里，不会上传。",
    "Your values notes save in this browser on this device. They are not uploaded.": "你的价值观笔记只会保存在这台设备的浏览器里，不会上传。",
    "Your identity notes save in this browser on this device. They are not uploaded.": "你的身份与信念笔记只会保存在这台设备的浏览器里，不会上传。",
    "Your body check-in notes save in this browser on this device. They are not uploaded.": "你的身体觉察笔记只会保存在这台设备的浏览器里，不会上传。",
    "Your emotion notes save in this browser on this device. They are not uploaded.": "你的情绪笔记只会保存在这台设备的浏览器里，不会上传。",
    "Your boundary notes save in this browser on this device. They are not uploaded.": "你的边界笔记只会保存在这台设备的浏览器里，不会上传。",
    "Your self-appreciation notes save in this browser on this device. They are not uploaded.": "你的自我欣赏笔记只会保存在这台设备的浏览器里，不会上传。",
    "To nudge these workbooks forward, contact contact@run2achieve.info.": "如果想推动这些工作本继续完善，可以联系 contact@run2achieve.info。",
    "In development": "开发中",

    "Energy Map": "能量地图",
    "Track daily energy, attention, load, and recovery patterns.": "记录每天的能量、注意力、负荷和恢复模式。",
    "Sensory Map": "感官地图",
    "Explore sensory channels, profile patterns, and support ideas.": "探索感官通道、个人模式和支持方法。",
    "Learning Style Map": "学习方式地图",
    "Notice learning formats, processing styles, and useful scaffolds.": "留意适合自己的学习形式、处理方式和支持结构。",
    "Discovering My Values": "探索我的价值观",
    "Gather small clues about what matters without forcing a final answer.": "收集关于“什么重要”的小线索，不急着给出最终答案。",
    "What I Love About Myself": "我喜欢自己的地方",
    "Gather specific, believable evidence of self-appreciation.": "收集具体、可信的自我欣赏证据。",
    "Checking-In With My Body": "和身体确认一下",
    "Notice body signals, sensory load, energy texture, and small needs.": "留意身体信号、感官负荷、能量质地和小需求。",
    "Exploring Identity & Beliefs": "探索身份与信念",
    "Explore self-stories, belonging, language, and beliefs in motion.": "探索关于自己的故事、归属感、语言和正在变化的信念。",
    "Processing My Emotions": "处理我的情绪",
    "Make space for feelings, mixed signals, body clues, and gentle next steps.": "给情绪、混杂信号、身体线索和温和的下一步留出空间。",
    "Exploring Boundaries": "探索边界",
    "Notice limits, access needs, honest yeses, and relationship care.": "留意限制、支持需求、诚实的同意，以及关系里的照顾。",
    "My Getting-Started Toolkit": "我的开始行动工具包",
    "Collect small tools that help you begin when tasks feel sticky or blocked.": "收集一些小工具，帮助你在卡住或很难开始时先动起来。",

    "Mapping My Energy": "映射我的能量",
    "Daily energy map": "每日能量地图",
    "Five questions": "五个问题",
    "Daily mapping": "每日记录",
    "Record your energy today": "记录今天的能量",
    "Click a cell to cycle blank, low, mid, and high. Each colored dot marks one area: peacefulness, energy, or productivity. Leave hours blank when they do not need tracking.": "点击格子可以在空白、低、中、高之间切换。每个彩色点代表一个维度：平静感、能量或推进感。不需要记录的时间可以留空。",
    "Peacefulness": "平静感",
    "How settled, safe, or easeful the hour feels.": "这一小时感觉有多安定、安全或轻松。",
    "Energy": "能量",
    "How available your body and mind feel.": "身体和大脑感觉有多少可用能量。",
    "Productivity": "推进感",
    "How much you were able to move things forward.": "你有多能把事情往前推进。",
    "Hour": "时间",
    "Low": "低",
    "Mid": "中",
    "High": "高",
    "Blank": "空白",
    "Comment": "备注",
    "Summary": "总结",
    "My notes": "我的笔记",
    "Cards I picked": "我选择的卡片",
    "No cards picked yet.": "还没有选择卡片。",
    "Add my own card": "添加我自己的卡片",
    "Add": "添加",
    "Previous": "上一步",
    "Next": "下一步",
    "Save JPG": "保存 JPG",
    "Save today JPG": "保存今日 JPG",
    "Reset today": "重置今天",
    "Reset section": "重置本节",
    "Reset this tab": "重置这一页",
    "Reset workbook": "重置工作本",
    "Export JSON": "导出 JSON",
    "Import JSON": "导入 JSON",
    "Loading saved workbook": "正在读取已保存的工作本",
    "Saving on this device": "正在保存到这台设备",
    "Saved on this device": "已保存到这台设备",
    "Could not save in this browser": "这个浏览器暂时无法保存",
    "Lively": "活泼",
    "Calm": "低刺激",

    "What gives me energy?": "什么给我能量？",
    "Notice people, places, routines, interests, and tiny moments that help you feel more available.": "留意哪些人、地点、日常、兴趣和小瞬间会让你更有余力。",
    "What uses up my energy?": "什么消耗我的能量？",
    "Name things that take effort. This is not about blame or weakness.": "写下那些很费力的东西。这不是在责怪谁，也不是说你不够好。",
    "How does low energy feel in my body?": "低能量在身体里是什么感觉？",
    "Describe body signals that tell you your energy is getting low.": "描述那些告诉你“能量快不够了”的身体信号。",
    "What helps me recharge?": "什么帮助我恢复？",
    "List supports, boundaries, and conditions that help energy come back.": "列出能帮你恢复能量的支持、边界和环境条件。",
    "My Energy Map summary": "我的能量地图总结",
    "Pull together what you want to remember about your energy.": "整理一下你想记住的能量模式。",
    "Quiet time": "安静时间",
    "Movement": "活动身体",
    "Special interests": "特别兴趣",
    "Being outside": "到户外",
    "Music": "音乐",
    "Predictable plans": "可预测的计划",
    "Noise": "噪音",
    "Transitions": "切换任务或场景",
    "Masking": "伪装自己",
    "Unclear instructions": "不清楚的指令",
    "Crowds": "人多的地方",
    "Too many choices": "选择太多",
    "Heavy limbs": "四肢很沉",
    "Tight chest": "胸口紧",
    "Headache": "头痛",
    "Hard to speak": "很难说话",
    "Restless": "坐立不安",
    "Sensitive to touch": "对触碰很敏感",
    "Dim lights": "调暗灯光",
    "Food or water": "吃点东西或喝水",
    "No talking": "不说话",
    "A known routine": "熟悉的流程",
    "Pressure blanket": "有重量感的毯子",
    "A short walk": "短暂散步",
    "I want others to know": "我希望别人知道",
    "My early signals": "我的早期信号",
    "My best recharge options": "最适合我的恢复方式",
    "One change to try": "可以试的一个小改变",

    "Mapping My Sensory Systems": "映射我的感官系统",
    "Sensory systems": "感官系统",
    "Learn sensory systems": "了解感官系统",
    "Sensory profile": "感官档案",
    "Supports": "支持方法",
    "Your sensory profile": "你的感官档案",
    "Awareness check": "觉察检查",
    "Often avoid": "经常回避",
    "Depends": "看情况",
    "Often seek": "经常寻求",
    "This is me": "这很像我",
    "Maybe me": "有点像我",
    "Not me": "不像我",
    "Clear": "清除",

    "Mapping My Learning Style": "映射我的学习方式",
    "Learning dimensions": "学习维度",
    "Learning style is more than input format": "学习方式不只是“看、听、读”这么简单",
    "Reflection time": "反思时间",
    "Take-away": "可以带走的发现",
    "What I can take from this": "我可以从这里带走什么",

    "Small clues about what matters": "关于“什么重要”的小线索",
    "Value bank": "价值观词库",
    "Prompts for noticing values": "帮助你觉察价值观的问题",
    "A place for unfinished values": "给还没想清楚的价值观留个位置",
    "Loose values notes": "零散的价值观笔记",
    "Basic needs & wellbeing": "基本需求与身心状态",
    "Connection & care": "连接与照顾",
    "Honesty, integrity & trust": "诚实、正直与信任",
    "Justice, access & impact": "公平、可及性与影响",
    "Autonomy & self-direction": "自主与自我选择",
    "Growth, learning & wisdom": "成长、学习与智慧",
    "Creativity, play & expression": "创造、玩耍与表达",
    "Energy, courage & adventure": "能量、勇气与探索",
    "Skill, excellence & craft": "技能、质量与手艺",
    "Order, practicality & stewardship": "秩序、实用与照料",
    "Recognition, influence & leadership": "被看见、影响力与领导",
    "Spirituality, meaning & reverence": "精神性、意义与敬意",

    "Identity as a living map": "身份是一张会变化的地图",
    "Prompts for identity and belief": "探索身份与信念的问题",
    "A place for becoming": "给正在成为的自己留个位置",
    "Loose identity and belief notes": "零散的身份与信念笔记",
    "Many rooms": "不同场合里的自己",
    "Old stories leave marks": "旧故事会留下痕迹",
    "Belonging can be specific": "归属感可以很具体",
    "Masks are information": "伪装也是一种信息",
    "Both can be true": "两个真相可以同时存在",
    "Chosen language": "自己选择的语言",

    "Body signals as messages": "把身体信号当作信息",
    "Body needs scan": "身体需求扫描",
    "Body cues I notice": "我注意到的身体线索",
    "What cue did you notice?": "你注意到了什么线索？",
    "Signal volume changes": "信号的音量会变化",
    "Neutral counts": "没有明显感觉也算数",
    "Context shapes the body": "环境会影响身体",
    "Micro-needs matter": "小需求也重要",
    "Body and brain talk": "身体和大脑会互相影响",
    "Permission to respond": "允许自己回应身体",

    "Emotions as information, not instructions": "情绪是信息，不是命令",
    "Prompts for emotional processing": "处理情绪的问题",
    "A place for emotional weather": "给情绪天气留个位置",
    "Loose emotion notes": "零散的情绪笔记",
    "Name it lightly": "轻轻地给它命名",
    "Mixed feelings count": "混杂的感受也算数",
    "The body may know first": "身体可能先知道",
    "Aftershocks are real": "事后的情绪反应也是真的",
    "Signal, not command": "是信号，不是命令",
    "Small response": "一个小回应",
    "Feeling shape": "情绪的形状",
    "Before, during, after": "之前、当时、之后",
    "Need underneath": "底下的需求",
    "Safe expression": "安全地表达",

    "Boundaries as care for access": "边界是在照顾可参与性",
    "Prompts for exploring boundaries": "探索边界的问题",
    "A place for limits and room": "给限制和空间留个位置",
    "Loose boundary notes": "零散的边界笔记",
    "The body no": "身体里的“不”",
    "Access needs are boundaries": "支持需求也是边界",
    "A yes can have shape": "“可以”也可以有条件",
    "Resentment is a clue": "怨气是一个线索",
    "Boundaries can include repair": "边界也可以包含修复",
    "Private boundaries count": "私下练习的边界也算数",

    "Things I like about myself": "我喜欢自己的地方",
    "Prompts for self-appreciation": "自我欣赏的问题",
    "Moments I still remember": "我仍然记得的时刻",
    "Recent moments I liked myself": "最近让我喜欢自己的时刻",
    "Specific is stronger": "越具体越可信",
    "Survival has skill in it": "能撑过来，本身就是能力",
    "What you keep choosing": "你一直在选择的东西",
    "Very you, in a good way": "很像你，而且是好的那种",
    "What you do for people": "你会为别人做的事",
    "Not everything needs to be useful": "不是所有东西都需要有用",

    "Things I like": "我喜欢的地方",
    "Recent moments": "最近的时刻",
    "Past moments": "过去的时刻",
    "Inspiration cards": "灵感卡片",
    "Gentle prompts": "温和的问题",
    "Open notes": "自由笔记",
    "No moments saved yet.": "还没有保存任何时刻。",
    "No older proof saved yet.": "还没有保存过去的证据。",
    "Add a moment": "添加一个时刻",
    "Add a memory": "添加一段记忆",
    "Save moments JPG": "保存时刻 JPG",
    "Loose emotion notes": "零散的情绪笔记",

    "Write in a way that works for you: words, fragments, lists, or reminders.": "用适合你的方式写：词语、片段、列表或提醒都可以。",
    "Anything worth remembering about today: context, sleep, food, sensory load, transitions, support.": "今天值得记住的事：情境、睡眠、饮食、感官负荷、切换、支持。",
    "A short reflection or pattern you noticed today.": "你今天注意到的一个简短反思或模式。",
    "What does this card make you notice?": "这张卡让你注意到了什么？",
    "What feels true, interesting, or unfinished here?": "这里有什么感觉真实、有意思，或者还没想完？",
    "A few words are enough. You do not need to make a final statement.": "写几个词就够了，不需要下最终结论。",
    "Fragments, images, questions, contradictions, small clues...": "片段、画面、问题、矛盾、小线索……",
    "What happened, and what did you do that still feels impressive?": "发生了什么？你做了什么到现在仍然让你觉得不错？"
  };

  const phraseTranslations = [
    ["A gentle workbook for noticing what matters, what drains, and what feels worth protecting.", "一个温和的工作本，用来留意什么重要、什么消耗你、什么值得被保护。"],
    ["A workbook for gently exploring self-stories, roles, belonging, and beliefs that may still be changing.", "一个温和的工作本，用来探索关于自己的故事、角色、归属感，以及仍在变化的信念。"],
    ["A workbook for gently noticing body signals, energy, sensory load, and needs without turning them into a test.", "一个温和的工作本，用来留意身体信号、能量、感官负荷和需求，不把它变成考试。"],
    ["A workbook for noticing emotions, making room for mixed feelings, and finding gentle ways to respond.", "一个用来觉察情绪、容纳复杂感受，并找到温和回应方式的工作本。"],
    ["A workbook for noticing limits, access needs, consent, recovery, and what helps relationships stay workable.", "一个用来留意限制、支持需求、同意、恢复，以及让关系更可持续的工作本。"],
    ["A workbook for noticing self-appreciation through tenderness, specificity, humor, survival, and everyday evidence.", "一个通过温柔、具体、幽默、撑过来的经历和日常证据来练习自我欣赏的工作本。"],
    ["Loving something about yourself does not have to sound grand. It can be specific, quiet, funny, practical, uncertain, or still growing.", "喜欢自己的某个部分不需要很宏大。它可以很具体、很安静、很好笑、很实用，也可以还不确定、还在长出来。"],
    ["An emotion can be real without being the whole story. This workbook is for making space around feelings before deciding what they mean.", "一个情绪可以是真的，但它不一定是全部事实。这个工作本是为了先给感受留出空间，再慢慢理解它的意思。"],
    ["Use these prompts slowly. The aim is not to fix the feeling quickly; it is to notice its shape, context, message, and possible next support.", "慢慢使用这些问题。目标不是马上解决情绪，而是看见它的形状、背景、信息，以及下一步可能需要什么支持。"],
    ["This space can hold contradictions, body clues, unfinished sentences, and feelings that do not yet have clean names.", "这个空间可以放下矛盾、身体线索、没写完的句子，以及暂时还没有清楚名字的感受。"]
  ];

  function normalize(text) {
    return text.replace(/\s+/g, " ").trim();
  }

  function translateText(text) {
    const normalized = normalize(text);
    if (!normalized) return text;
    if (translations[normalized]) return text.replace(normalized, translations[normalized]);

    const stepMatch = normalized.match(/^Step (\d+) of (\d+)$/);
    if (stepMatch) return `第 ${stepMatch[1]} 步，共 ${stepMatch[2]} 步`;

    const metricStatus = normalized.match(/^(Peacefulness|Energy|Productivity) at (\d+):00, (Blank|Low|Mid|High)$/);
    if (metricStatus) {
      return `${translations[metricStatus[1]]} ${metricStatus[2]}:00，${translations[metricStatus[3]]}`;
    }

    const metricTitle = normalized.match(/^(Peacefulness|Energy|Productivity) (\d+):00$/);
    if (metricTitle) {
      return `${translations[metricTitle[1]]} ${metricTitle[2]}:00`;
    }

    let translated = normalized;
    phraseTranslations.forEach(([from, to]) => {
      translated = translated.replace(from, to);
    });
    if (translated !== normalized) return text.replace(normalized, translated);

    return text;
  }

  function shouldSkipTextNode(node) {
    const parent = node.parentElement;
    if (!parent) return true;
    return parent.closest("script, style, textarea, input, select, option, noscript");
  }

  function storeOriginal(node, key, value) {
    if (!node[key]) node[key] = value;
  }

  function translateNode(node, lang) {
    if (shouldSkipTextNode(node)) return;
    storeOriginal(node, "__mappingMeOriginalText", node.nodeValue);
    node.nodeValue = lang === "zh" ? translateText(node.__mappingMeOriginalText) : node.__mappingMeOriginalText;
  }

  function translateAttributes(element, lang) {
    ["placeholder", "title", "aria-label"].forEach((attribute) => {
      if (!element.hasAttribute(attribute)) return;
      const key = `data-original-${attribute}`;
      if (!element.hasAttribute(key)) element.setAttribute(key, element.getAttribute(attribute));
      const original = element.getAttribute(key);
      element.setAttribute(attribute, lang === "zh" ? translateText(original) : original);
    });
  }

  function updateButtons(lang) {
    document.querySelectorAll(".language-switch").forEach((switcher) => {
      switcher.querySelectorAll("button").forEach((button) => {
        const isChinese = normalize(button.textContent || "") === "中文";
        const active = lang === "zh" ? isChinese : !isChinese;
        button.classList.toggle("active", active);
        button.setAttribute("aria-pressed", String(active));
      });
    });
  }

  function translateSpecialElements(lang) {
    document.querySelectorAll(".step-count").forEach((element) => {
      if (!element.dataset.originalStepCount) element.dataset.originalStepCount = normalize(element.textContent || "");
      element.textContent = lang === "zh" ? translateText(element.dataset.originalStepCount) : element.dataset.originalStepCount;
    });
  }

  function applyLanguage(lang) {
    document.documentElement.lang = lang === "zh" ? "zh-Hans" : "en";
    localStorage.setItem(LANGUAGE_KEY, lang);

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => translateNode(node, lang));
    document.querySelectorAll("[placeholder], [title], [aria-label]").forEach((element) => translateAttributes(element, lang));
    translateSpecialElements(lang);
    updateButtons(lang);
  }

  function bindLanguageSwitches() {
    document.addEventListener("click", (event) => {
      const button = event.target.closest(".language-switch button");
      if (!button) return;
      const label = normalize(button.textContent || "");
      applyLanguage(label === "中文" ? "zh" : "en");
    });
  }

  function observeChanges() {
    let queued = false;
    const observer = new MutationObserver(() => {
      if (queued) return;
      queued = true;
      window.setTimeout(() => {
        queued = false;
        applyLanguage(localStorage.getItem(LANGUAGE_KEY) === "zh" ? "zh" : "en");
      }, 50);
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  function init() {
    bindLanguageSwitches();
    applyLanguage(localStorage.getItem(LANGUAGE_KEY) === "zh" ? "zh" : "en");
    observeChanges();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
