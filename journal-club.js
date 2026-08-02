let journalWeeks = [
  {
    id: "2026-W30",
    label: "20–26 July 2026",
    eyebrow: "Latest week",
    total: 186,
    status: "demo",
    description: "A prototype weekly issue with four representative astrophysics papers.",
    topics: { Galaxies: 42, Cosmology: 31, Radio: 18, Methods: 12 },
    papers: [
      {
        id: "demo-radio-imaging",
        title: "A new route to wide-field, high-dynamic-range radio imaging",
        authors: "A. Researcher, B. Collaborator, et al.",
        category: "astro-ph.IM",
        topics: ["Radio", "Methods"],
        question: "How can we reconstruct faint, extended emission without losing accuracy around bright sources?",
        why: "The dynamic-range limit remains one of the practical barriers between raw visibility data and reliable survey science.",
        method: "A direction-dependent imaging pipeline combining wide-field gridding, iterative calibration, and simulation-based validation.",
        data: "Representative interferometric observations plus injected-source simulations.",
        abstract: "We present a prototype wide-field radio-imaging workflow designed to improve the recovery of faint extended emission in the presence of bright compact sources. The method combines direction-dependent corrections, iterative calibration, and controlled injection tests to evaluate reconstruction fidelity across a range of angular scales.",
        result: "The proposed workflow recovers more low-surface-brightness structure in the authors’ controlled tests.",
        limitations: "The demo does not yet establish performance across different array layouts and real calibration failure modes.",
        discuss: "Which assumption is most likely to break first on a heterogeneous real survey?",
        link: "https://arxiv.org/list/astro-ph.IM/recent"
      },
      {
        id: "demo-faint-galaxies",
        title: "Tracing faint radio emission beyond the bright galaxy population",
        authors: "C. Astronomer, D. Observer, et al.",
        category: "astro-ph.GA",
        topics: ["Radio", "Galaxies"],
        question: "What can sub-threshold radio emission tell us about the average star-forming galaxy population?",
        why: "Individually detected sources represent only the bright tail and can bias our picture of galaxy evolution.",
        method: "Multi-band sample selection followed by image stacking in stellar-mass and redshift bins.",
        data: "Deep radio continuum images matched to an optical and infrared galaxy catalogue.",
        abstract: "We investigate the average radio emission of star-forming galaxies below the individual detection threshold. Using a multi-wavelength selected sample, we stack deep continuum images in bins of stellar mass and redshift and examine the evolution of the recovered luminosity distribution.",
        result: "The stacked signal suggests a smooth evolution in typical radio luminosity below the detection threshold.",
        limitations: "Stacking compresses population diversity and is sensitive to sample selection and source confusion.",
        discuss: "Does the stacking strategy preserve the population diversity we care about?",
        link: "https://arxiv.org/list/astro-ph.GA/recent"
      },
      {
        id: "demo-dark-energy",
        title: "What the next generation of surveys can really tell us about dark energy",
        authors: "E. Cosmologist, F. Scientist, et al.",
        category: "astro-ph.CO",
        topics: ["Cosmology"],
        question: "How tightly can combined future surveys constrain departures from a cosmological constant?",
        why: "Forecasts influence survey design, but their headline precision depends strongly on modelling choices.",
        method: "A joint Fisher forecast with multiple probes and progressively more realistic systematic-error models.",
        data: "Synthetic catalogues based on expected next-generation survey characteristics.",
        abstract: "We forecast constraints on phenomenological dark-energy models from combinations of next-generation cosmological probes. By progressively introducing correlated systematic uncertainties, we separate improvements driven by survey volume from those that depend on modelling assumptions and external priors.",
        result: "Combining probes improves the constraints, although modelling systematics dominate the optimistic cases.",
        limitations: "The answer depends on parameterisation, priors, and assumptions about correlated systematics.",
        discuss: "Which improvement comes from data volume, and which comes from modelling assumptions?",
        link: "https://arxiv.org/list/astro-ph.CO/recent"
      },
      {
        id: "demo-ml-uncertainty",
        title: "Reliable uncertainty estimates for machine-learning inference in astronomy",
        authors: "G. Developer, H. Statistician, et al.",
        category: "astro-ph.IM",
        topics: ["Methods"],
        question: "Can machine-learning predictions remain well calibrated when astronomical data differ from the training set?",
        why: "A precise prediction is not scientifically useful if its quoted uncertainty becomes unreliable on new observations.",
        method: "Benchmarking ensembles and post-hoc calibration under controlled distribution shifts.",
        data: "Simulated observations paired with one observational validation sample.",
        abstract: "We evaluate uncertainty-calibration strategies for machine-learning inference under distribution shifts relevant to astronomical observations. Ensemble and post-hoc methods are compared on simulated data and an observational validation set, with particular attention to overconfidence outside the training distribution.",
        result: "Calibration improves in-distribution, but several methods remain overconfident after a realistic shift.",
        limitations: "The tested shifts cannot cover the full diversity of instrumental and population changes.",
        discuss: "Would the calibration test detect failure on an unknown out-of-distribution target?",
        link: "https://arxiv.org/list/astro-ph.IM/recent"
      }
    ]
  },
  {
    id: "2026-W29",
    label: "13–19 July 2026",
    eyebrow: "Past week",
    total: 172,
    status: "archive",
    description: "Archived issue placeholder, ready for the future arXiv ingestion pipeline.",
    topics: { Galaxies: 38, Cosmology: 29, Exoplanets: 23, Stars: 21 },
    papers: []
  },
  {
    id: "2026-W28",
    label: "6–12 July 2026",
    eyebrow: "Past week",
    total: 194,
    status: "archive",
    description: "Archived issue placeholder, ready for the future arXiv ingestion pipeline.",
    topics: { Galaxies: 45, Cosmology: 34, Radio: 16, Methods: 14 },
    papers: []
  }
];

const app = document.querySelector("#journal-app");
const storageKey = "hy-journal-shortlist";
const languageKey = "hy-journal-language";
const aiStorageKey = "hy-journal-ai-explanations-v3";
const supabaseUrl = "https://zwbyvbygswhdlpruofht.supabase.co";
const supabasePublishableKey = "sb_publishable_Rqy1myWykBBkRTG9opvVhw_o-PiDe8T";
const supabaseClient = window.supabase?.createClient(supabaseUrl, supabasePublishableKey);
const state = {
  view: "gateway",
  activeWeek: journalWeeks[0].id,
  filter: "All",
  openPaper: null,
  shortlist: readShortlist(),
  language: "en",
  access: null,
  importStatus: "idle",
  aiExplanations: readJsonStorage(aiStorageKey, {}),
  aiLanguage: {},
  aiLoading: null,
  aiError: null,
  deck: null,
  deckLoading: false,
  deckError: null
};

const chinese = {
  "Journal Club": "论文讨论会",
  "Two ways in.": "两种进入方式。",
  "Browse the public archive, or sign in to use the complete research workflow.": "浏览公开归档，或者登录使用完整的研究工作流程。",
  "Visitor entrance": "访客入口",
  "Browse daily archive": "浏览每日归档",
  "Open previous daily issues and browse their papers. No account needed.": "打开往期日期并浏览其中的论文，无需账号。",
  "Continue as visitor": "以访客身份继续",
  "Member entrance": "登录入口",
  "Open your workspace": "打开个人工作台",
  "Unlock AI explanations, shortlist, notes, paper imports, figures, and PowerPoint generation.": "解锁 AI 解读、候选清单、笔记、论文导入、图片和 PowerPoint 生成功能。",
  "Sign in": "登录",
  "Private workspace": "私人工作台",
  "Sign in to Journal Club": "登录论文讨论会",
  "Owner sign-in is temporarily disabled while secure authentication is being connected.": "正在连接安全认证，管理员登录暂时停用。",
  "Owner credentials are stored only on this computer.": "管理员凭据只保存在这台电脑上。",
  "Open the local owner workspace on your Mac to sign in.": "请在你的 Mac 上打开本地管理员工作台进行登录。",
  "Enter your approved email and we will send you a secure one-time sign-in link.": "输入已获准的邮箱，我们会向你发送安全的一次性登录链接。",
  "Send magic link": "发送登录链接",
  "Magic link sent. Please check your inbox and spam folder.": "登录链接已发送。请检查你的收件箱和垃圾邮件文件夹。",
  "Sending your secure sign-in link…": "正在发送安全登录链接，请稍候…",
  "Email sent ✓": "邮件已发送 ✓",
  "Sending…": "正在发送…",
  "Email": "邮箱",
  "Password": "密码",
  "Secure owner sign-in coming soon": "安全的管理员登录即将开放",
  "← Choose another entrance": "← 选择其他入口",
  "Public library": "公开论文库",
  "Browse papers by subject or open a previous weekly issue.": "按照主题浏览论文，或者打开往期周刊。",
  "Daily archive": "每日归档",
  "Open any date to browse its papers. Topic filters are created from that date’s actual arXiv data.": "打开任意日期浏览论文；主题筛选会根据该日真实的 arXiv 数据生成。",
  "Categories": "分类",
  "Browse category": "浏览分类",
  "Sign in to unlock AI explanations, shortlist, imports, and presentation generation.": "登录后解锁 AI 解读、候选清单、论文导入和演示文稿生成。",
  "Unlock all features": "解锁全部功能",
  "Member workspace": "会员工作台",
  "Import last week’s papers": "导入上一周论文",
  "Daily database": "每日论文数据库",
  "Updates automatically": "自动更新",
  "Every date is archived in the background.": "每一天都会在后台自动归档。",
  "A scheduled background job checks arXiv every weekday at 07:00 UTC, stores the complete issue, and prepares the archive—even when nobody opens the website.": "后台定时任务每个工作日 07:00 UTC 检查 arXiv、保存完整日期并建立归档，即使没有人打开网页也会照常运行。",
  "Last scheduled sync": "上次定时同步",
  "Next scheduled sync": "下次定时同步",
  "Manual recovery": "手动补救",
  "Sync today now": "立即同步今天",
  "Use this only to repair a missed update or refresh an incomplete daily issue.": "仅在定时更新遗漏或某一天数据不完整时使用。",
  "Latest date": "最新日期",
  "Past date": "往期日期",
  "Past dates": "往期日期",
  "Open latest date": "打开最新日期",
  "Export shortlist JSON": "导出候选清单 JSON",
  "Download a portable backup for another browser.": "下载可以带到其他浏览器的备份。",
  "Fetch from arXiv, classify the papers, and prepare bilingual AI summaries.": "从 arXiv 获取论文、完成分类，并准备中英双语 AI 摘要。",
  "Import papers": "导入论文",
  "Connecting to arXiv…": "正在连接 arXiv…",
  "Prototype import complete": "原型导入完成",
  "The real import will be enabled after the database and secure backend are connected.": "连接数据库和安全后端后，将启用真实导入。",
  "Sign out": "退出登录",
  "Visitor": "访客",
  "Member": "会员",
  "Astrophysics · weekly reading": "天体物理 · 每周阅读",
  "Astrophysics · daily reading": "天体物理 · 每日阅读",
  "Find the papers worth discussing. AI-assisted explanations, your own shortlist, and presentation-ready notes in one place.": "找到真正值得讨论的论文。在一个地方完成 AI 辅助解读、个人候选清单和演示文稿准备。",
  "Overview": "总览",
  "Latest week": "最新一周",
  "Shortlist": "候选清单",
  "20–26 July 2026": "2026年7月20–26日",
  "13–19 July 2026": "2026年7月13–19日",
  "6–12 July 2026": "2026年7月6–12日",
  "new astrophysics papers": "篇新的天体物理论文",
  "new papers": "篇新论文",
  "papers": "篇论文",
  "Open latest week": "打开最新一周",
  "My reading list": "我的阅读清单",
  "shortlisted papers": "篇已收藏论文",
  "Choose papers across different weeks, add your notes, then prepare a Journal Club deck.": "从不同周次中选择论文、添加个人笔记，然后生成论文讨论会演示文稿。",
  "Open shortlist": "打开候选清单",
  "Archive": "往期归档",
  "Past weeks": "往期周刊",
  "Prototype dataset": "原型数据",
  "The workflow": "使用流程",
  "Collect": "收集",
  "New papers arrive from arXiv each week.": "每周自动从 arXiv 获取新论文。",
  "Understand": "理解",
  "AI extracts the question, method, result, and limitations.": "AI 提取科学问题、方法、结果和局限。",
  "You choose what is relevant and add personal notes.": "选择与你相关的论文并添加个人笔记。",
  "Present": "演示",
  "The app prepares slides, figures, and speaking notes.": "App 准备幻灯片、论文图片和演讲备注。",
  "← All weeks": "← 返回所有周次",
  "← Journal Club overview": "← 返回论文讨论会总览",
  "AI-assisted reading": "AI 辅助阅读",
  "papers to explore": "篇论文可供浏览",
  "All": "全部",
  "Galaxies": "星系",
  "Cosmology": "宇宙学",
  "Radio": "射电",
  "Methods": "方法",
  "Exoplanets": "系外行星",
  "Stars": "恒星",
  "Scientific question": "科学问题",
  "Abstract": "摘要",
  "Open on arXiv ↗": "在 arXiv 打开 ↗",
  "Read AI explanation": "阅读 AI 解读",
  "Hide AI explanation": "收起 AI 解读",
  "＋ Add to shortlist": "＋ 加入候选清单",
  "✓ Shortlisted": "✓ 已加入候选清单",
  "Paper explained": "论文解读",
  "Prototype summary · verify against the paper": "原型摘要 · 请对照原论文核实",
  "Why it matters": "为什么重要",
  "Method": "研究方法",
  "Data / instrument": "数据 / 仪器",
  "Original abstract": "原始摘要",
  "Main result": "主要结果",
  "Limitations": "研究局限",
  "Question for the room": "讨论问题",
  "Open arXiv source ↗": "打开 arXiv 原文 ↗",
  "Past week": "往期周刊",
  "This archived issue is ready for real arXiv data.": "这一期归档已经准备好接入真实 arXiv 数据。",
  "The production pipeline will keep every week here automatically. For now, open the latest week to explore the complete interaction.": "正式的数据流程会自动保存每一周的论文。目前可以打开最新一周，体验完整交互。",
  "The papers you want to read, discuss, and turn into a presentation.": "你想阅读、讨论并制作成演示文稿的论文。",
  "My notes": "我的笔记",
  "What do you want to mention in the meeting?": "你希望在讨论会上提到什么？",
  "Remove": "移除",
  "Read original on arXiv ↗": "在 arXiv 阅读原文 ↗",
  "Your shortlist is empty.": "你的候选清单还是空的。",
  "Open the latest week and select the papers you want to discuss.": "打开最新一周，选择你想讨论的论文。",
  "Browse latest week": "浏览最新一周",
  "Presentation builder": "演示文稿生成器",
  "Turn the list into a talk.": "把候选清单变成一次报告。",
  "Selected papers": "已选择论文",
  "Audience": "听众",
  "General astrophysics": "一般天体物理听众",
  "Expert audience": "专业听众",
  "Student-friendly": "适合学生",
  "Detail": "详细程度",
  "2 slides per paper": "每篇论文 2 页",
  "3 slides per paper": "每篇论文 3 页",
  "4 slides per paper": "每篇论文 4 页",
  "Include one key figure per paper": "每篇论文加入一张关键图片",
  "Generate presentation": "生成演示文稿",
  "In the production version, AI will read the PDFs, explain selected figures, and create an editable PowerPoint with speaker notes.": "正式版本中，AI 将阅读 PDF、解释选定的图片，并生成带演讲备注的可编辑 PowerPoint。",
  "AI + PowerPoint connection comes in phase 2": "AI 与 PowerPoint 将在第二阶段接入",
  "A prototype weekly issue with four representative astrophysics papers.": "包含四篇代表性天体物理论文的每周原型。",
  "Archived issue placeholder, ready for the future arXiv ingestion pipeline.": "往期周刊占位内容，已经为未来的 arXiv 数据流程做好准备。",

  "A new route to wide-field, high-dynamic-range radio imaging": "宽视场、高动态范围射电成像的新方法",
  "How can we reconstruct faint, extended emission without losing accuracy around bright sources?": "如何在保持亮源周围精度的同时，重建微弱的延展辐射？",
  "The dynamic-range limit remains one of the practical barriers between raw visibility data and reliable survey science.": "动态范围限制仍然是从原始可见度数据走向可靠巡天科学结果的实际障碍之一。",
  "A direction-dependent imaging pipeline combining wide-field gridding, iterative calibration, and simulation-based validation.": "一种方向依赖的成像流程，结合宽视场网格化、迭代校准和基于模拟的验证。",
  "Representative interferometric observations plus injected-source simulations.": "具有代表性的干涉阵观测数据，以及注入模拟源的测试。",
  "We present a prototype wide-field radio-imaging workflow designed to improve the recovery of faint extended emission in the presence of bright compact sources. The method combines direction-dependent corrections, iterative calibration, and controlled injection tests to evaluate reconstruction fidelity across a range of angular scales.": "我们提出一种宽视场射电成像原型流程，旨在改善亮致密源附近微弱延展辐射的恢复。该方法结合方向依赖校正、迭代校准和受控注入测试，用于评估不同角尺度上的重建可靠性。",
  "The proposed workflow recovers more low-surface-brightness structure in the authors’ controlled tests.": "在作者的受控测试中，该流程能够恢复更多低表面亮度结构。",
  "The demo does not yet establish performance across different array layouts and real calibration failure modes.": "目前的演示尚未证明该方法在不同阵列布局和真实校准失效情况下的表现。",
  "Which assumption is most likely to break first on a heterogeneous real survey?": "在复杂的真实巡天数据中，哪个假设最可能首先失效？",

  "Tracing faint radio emission beyond the bright galaxy population": "追踪明亮星系样本之外的微弱射电辐射",
  "What can sub-threshold radio emission tell us about the average star-forming galaxy population?": "低于探测阈值的射电辐射能告诉我们普通恒星形成星系的哪些信息？",
  "Individually detected sources represent only the bright tail and can bias our picture of galaxy evolution.": "单独探测到的射电源只代表明亮的一端，可能使我们对星系演化的理解产生偏差。",
  "Multi-band sample selection followed by image stacking in stellar-mass and redshift bins.": "先进行多波段样本选择，再按照恒星质量和红移区间进行图像叠加。",
  "Deep radio continuum images matched to an optical and infrared galaxy catalogue.": "深度射电连续谱图像与光学和红外星系目录的交叉匹配。",
  "We investigate the average radio emission of star-forming galaxies below the individual detection threshold. Using a multi-wavelength selected sample, we stack deep continuum images in bins of stellar mass and redshift and examine the evolution of the recovered luminosity distribution.": "我们研究低于单源探测阈值的恒星形成星系平均射电辐射。利用多波段选择样本，按照恒星质量和红移区间叠加深度连续谱图像，并研究恢复光度分布的演化。",
  "The stacked signal suggests a smooth evolution in typical radio luminosity below the detection threshold.": "叠加信号表明，探测阈值以下的典型射电光度可能随时间平滑演化。",
  "Stacking compresses population diversity and is sensitive to sample selection and source confusion.": "叠加会压缩星系群体的多样性，并且对样本选择和源混淆较为敏感。",
  "Does the stacking strategy preserve the population diversity we care about?": "这种叠加策略是否保留了我们关心的星系群体多样性？",

  "What the next generation of surveys can really tell us about dark energy": "下一代巡天究竟能告诉我们多少关于暗能量的信息",
  "How tightly can combined future surveys constrain departures from a cosmological constant?": "联合未来巡天能够多严格地限制偏离宇宙学常数的模型？",
  "Forecasts influence survey design, but their headline precision depends strongly on modelling choices.": "预测结果会影响巡天设计，但其标称精度强烈依赖于模型选择。",
  "A joint Fisher forecast with multiple probes and progressively more realistic systematic-error models.": "使用多种观测探针进行联合 Fisher 预测，并逐步加入更真实的系统误差模型。",
  "Synthetic catalogues based on expected next-generation survey characteristics.": "根据下一代巡天的预期特征生成的模拟目录。",
  "We forecast constraints on phenomenological dark-energy models from combinations of next-generation cosmological probes. By progressively introducing correlated systematic uncertainties, we separate improvements driven by survey volume from those that depend on modelling assumptions and external priors.": "我们预测下一代宇宙学探针组合对唯象暗能量模型的限制。通过逐步引入相关系统误差，将巡天体量带来的改进与依赖模型假设和外部先验的改进区分开来。",
  "Combining probes improves the constraints, although modelling systematics dominate the optimistic cases.": "联合不同探针能够改善限制，但在最乐观的情形中，模型系统误差仍占主导。",
  "The answer depends on parameterisation, priors, and assumptions about correlated systematics.": "结论取决于参数化方式、先验以及对相关系统误差的假设。",
  "Which improvement comes from data volume, and which comes from modelling assumptions?": "哪些提升来自数据量，哪些提升其实来自模型假设？",

  "Reliable uncertainty estimates for machine-learning inference in astronomy": "天文机器学习推断中的可靠不确定性估计",
  "Can machine-learning predictions remain well calibrated when astronomical data differ from the training set?": "当天文数据与训练集不同时，机器学习预测还能保持良好的校准吗？",
  "A precise prediction is not scientifically useful if its quoted uncertainty becomes unreliable on new observations.": "如果模型给出的不确定性在新观测上不再可靠，那么再精确的预测也缺乏科学价值。",
  "Benchmarking ensembles and post-hoc calibration under controlled distribution shifts.": "在受控的数据分布偏移下，比较集成模型和事后校准方法。",
  "Simulated observations paired with one observational validation sample.": "模拟观测数据与一个真实观测验证样本。",
  "We evaluate uncertainty-calibration strategies for machine-learning inference under distribution shifts relevant to astronomical observations. Ensemble and post-hoc methods are compared on simulated data and an observational validation set, with particular attention to overconfidence outside the training distribution.": "我们评估天文观测相关分布偏移下机器学习推断的不确定性校准策略，并在模拟数据和观测验证集上比较集成与事后校准方法，重点考察训练分布之外的过度自信问题。",
  "Calibration improves in-distribution, but several methods remain overconfident after a realistic shift.": "在同分布数据上校准有所改善，但经历真实的数据偏移后，多种方法仍然过度自信。",
  "The tested shifts cannot cover the full diversity of instrumental and population changes.": "测试的数据偏移无法涵盖仪器变化和天体群体变化的全部多样性。",
  "Would the calibration test detect failure on an unknown out-of-distribution target?": "这种校准测试能否发现模型在未知分布外目标上的失效？"
};

function t(text) {
  return state.language === "zh" ? chinese[text] || text : text;
}

function readJsonStorage(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function readShortlist() {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) || [];
  } catch {
    return [];
  }
}

function saveShortlist() {
  localStorage.setItem(storageKey, JSON.stringify(state.shortlist));
}

function exportShortlist() {
  const papers = state.shortlist.map((id) => {
    const match = findPaper(id);
    return match ? { ...match.paper, archiveDate: match.week.id } : { id };
  });
  const payload = {
    exportedAt: new Date().toISOString(),
    source: "Haoyang Ye Journal Club",
    papers
  };
  const file = new Blob([`${JSON.stringify(payload, null, 2)}\n`], {
    type: "application/json"
  });
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = `journal-club-shortlist-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function applyTranslations() {
  document.documentElement.lang = state.language === "zh" ? "zh-CN" : "en";
  document.title = state.language === "zh"
    ? "论文讨论会 | Haoyang Ye"
    : "Journal Club | Haoyang Ye";
  if (state.language !== "zh") return;

  const walker = document.createTreeWalker(app, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);

  textNodes.forEach((node) => {
    const original = node.nodeValue;
    const trimmed = original.trim();
    if (!trimmed) return;

    let translated = chinese[trimmed];
    if (!translated) {
      const countMatch = trimmed.match(/^(\d+) (new astrophysics papers|new papers|papers to explore|shortlisted papers|papers)$/);
      if (countMatch) translated = `${countMatch[1]}${chinese[countMatch[2]]}`;
    }

    if (translated) {
      const leading = original.match(/^\s*/)[0];
      const trailing = original.match(/\s*$/)[0];
      node.nodeValue = `${leading}${translated}${trailing}`;
    }
  });

  app.querySelectorAll("[placeholder]").forEach((element) => {
    if (chinese[element.placeholder]) element.placeholder = chinese[element.placeholder];
  });
}

function findPaper(id) {
  for (const week of journalWeeks) {
    const paper = Array.isArray(week.papers)
      ? week.papers.find((item) => item.id === id)
      : null;
    if (paper) return { paper, week };
  }
  return null;
}

function setView(view, weekId = state.activeWeek) {
  state.view = view;
  state.activeWeek = weekId;
  state.filter = "All";
  state.openPaper = null;
  window.scrollTo({ top: 0, behavior: "smooth" });
  render();
}

async function openWeek(weekId) {
  state.activeWeek = weekId;
  const index = journalWeeks.findIndex((item) => item.id === weekId);
  const week = journalWeeks[index];
  if (week && !Array.isArray(week.papers) && week.dataUrl) {
    try {
      const response = await fetch(week.dataUrl, { cache: "no-store" });
      if (response.ok) {
        const fullWeek = await response.json();
        journalWeeks[index] = fullWeek;
      }
    } catch {
      // Keep the archive metadata visible if a weekly file is temporarily unavailable.
    }
  }
  setView("week", weekId);
}

function setAccess(access) {
  state.access = access;
  state.view = access === "member" ? "home" : "visitor";
  render();
}

function toggleShortlist(paperId) {
  state.shortlist = state.shortlist.includes(paperId)
    ? state.shortlist.filter((id) => id !== paperId)
    : [...state.shortlist, paperId];
  saveShortlist();
  render();
}

function topicChips(topics) {
  return Object.entries(topics)
    .map(([topic, count]) => `<span><strong>${count}</strong> ${topic}</span>`)
    .join("");
}

function appNav(active) {
  if (state.access !== "member") {
    return `
      <nav class="journal-app-nav visitor-app-nav" aria-label="Journal Club sections">
        <button class="${active === "visitor" || active === "archive" ? "active" : ""}" data-view="visitor">Archive</button>
        <button class="member-unlock" data-view="login">Sign in</button>
      </nav>
    `;
  }

  return `
    <nav class="journal-app-nav" aria-label="Journal Club sections">
      <button class="${active === "home" ? "active" : ""}" data-view="home">Overview</button>
      <button class="${active === "week" ? "active" : ""}" data-week="${journalWeeks[0].id}">
        Latest date
      </button>
      <button class="${active === "shortlist" ? "active" : ""}" data-view="shortlist">
        Shortlist <span>${state.shortlist.length}</span>
      </button>
      <button class="signout-button" data-signout="true">Sign out</button>
    </nav>
  `;
}

function renderGateway() {
  app.innerHTML = `
    <section class="gateway-hero section-band">
      <p class="eyebrow">Astrophysics · daily reading</p>
      <h1>Journal Club</h1>
      <h2>Two ways in.</h2>
      <p class="lead">Browse the public archive, or sign in to use the complete research workflow.</p>
    </section>
    <section class="gateway-grid content-section">
      <button class="entrance-card visitor-entrance" data-access="visitor">
        <span class="entrance-icon" aria-hidden="true">◎</span>
        <span class="eyebrow">Visitor entrance</span>
        <strong>Browse daily archive</strong>
        <span>Open previous daily issues and browse their papers. No account needed.</span>
        <span class="entrance-cta">Continue as visitor →</span>
      </button>
      <button class="entrance-card member-entrance" data-view="login">
        <span class="entrance-icon" aria-hidden="true">✦</span>
        <span class="eyebrow">Member entrance</span>
        <strong>Open your workspace</strong>
        <span>Unlock AI explanations, shortlist, notes, paper imports, figures, and PowerPoint generation.</span>
        <span class="entrance-cta">Sign in →</span>
      </button>
    </section>
  `;
}

function renderLogin() {
  app.innerHTML = `
    <section class="login-shell section-band">
      <button class="back-button" data-view="gateway">← Choose another entrance</button>
      <div class="login-card">
        <div>
          <p class="eyebrow">Private workspace</p>
          <h1>Sign in to Journal Club</h1>
          <p class="lead">
            Enter your approved email and we will send you a secure one-time sign-in link.
          </p>
        </div>
        <form class="login-form">
          <label>Email<input name="email" type="email" autocomplete="email" required></label>
          <button type="submit" class="button primary">Send magic link</button>
          <p class="login-message" role="status" aria-live="assertive" hidden></p>
        </form>
      </div>
    </section>
  `;
}

function renderVisitor() {
  app.innerHTML = `
    <section class="visitor-header section-band">
      <button class="back-button" data-view="gateway">← Choose another entrance</button>
      <div class="weekly-title-row">
        <div>
          <p class="eyebrow">Public library · Visitor</p>
          <h1>Daily archive</h1>
          <p class="lead">
            Open any date to browse its papers. Topic filters are created from that
            date’s actual arXiv data.
          </p>
        </div>
        ${appNav("visitor")}
      </div>
    </section>

    <section class="week-archive content-section" id="public-archive">
      <div class="section-heading-row">
        <div><p class="eyebrow">Archive</p><h2>Past dates</h2></div>
      </div>
      <div class="archive-grid">
        ${journalWeeks.map((week) => `
          <button class="archive-card" data-week="${week.id}">
            <span>${week.id}</span><strong>${week.label}</strong>
            <small>${week.total} papers</small>
            <span class="archive-topics">${Object.keys(week.topics).join(" · ")}</span>
          </button>
        `).join("")}
      </div>
    </section>

  `;
}

function renderHome() {
  const latest = journalWeeks[0];
  app.innerHTML = `
    <section class="journal-dashboard-hero section-band">
      <div>
        <p class="eyebrow">Astrophysics · daily reading · Member</p>
        <h1>Journal Club</h1>
        <p class="lead">
          Find the papers worth discussing. AI-assisted explanations, your own shortlist,
          and presentation-ready notes in one place.
        </p>
      </div>
      ${appNav("home")}
    </section>

    <section class="import-week content-section">
      <div class="import-week-copy">
        <span class="import-icon" aria-hidden="true">↻</span>
        <div>
          <p class="eyebrow">Daily database · Updates automatically</p>
          <h2>Every date is archived in the background.</h2>
          <p>
            A scheduled background job checks arXiv every weekday at 07:00 UTC, stores the complete issue,
            and prepares the archive—even when nobody opens the website.
          </p>
          <div class="sync-schedule">
            <span><strong>First scheduled sync</strong> Monday, 27 July · 07:00 UTC</span>
            <span><strong>Schedule</strong> Monday–Friday · 07:00 UTC</span>
          </div>
        </div>
      </div>
      <div class="import-week-action">
        <span class="eyebrow">Manual recovery</span>
        <button class="import-button" data-import="true">
          ${state.importStatus === "idle" ? "Sync today now" : state.importStatus === "loading" ? "Connecting to arXiv…" : "Prototype import complete"}
        </button>
        <small>Use this only to repair a missed update or refresh an incomplete daily issue.</small>
        ${state.importStatus === "done" ? `
          <small>The real import will be enabled after the database and secure backend are connected.</small>
        ` : ""}
      </div>
    </section>

    <section class="journal-dashboard content-section">
      <button class="week-feature" data-week="${latest.id}">
        <span class="week-feature-top">
          <span>
            <span class="eyebrow">${latest.eyebrow}</span>
            <strong>${latest.label}</strong>
          </span>
          <span class="week-arrow" aria-hidden="true">↗</span>
        </span>
        <span class="week-feature-title">${latest.total} new astrophysics papers</span>
        <span class="week-topic-summary">${topicChips(latest.topics)}</span>
        <span class="week-feature-cta">Open latest date</span>
      </button>

      <button class="shortlist-feature" data-view="shortlist">
        <span class="eyebrow">My reading list</span>
        <strong><span>${state.shortlist.length}</span> shortlisted papers</strong>
        <span>
          Choose papers across different dates, add your notes, then prepare a Journal Club deck.
        </span>
        <span class="week-feature-cta">Open shortlist</span>
      </button>
    </section>

    <section class="week-archive content-section">
      <div class="section-heading-row">
        <div>
          <p class="eyebrow">Archive</p>
          <h2>Past dates</h2>
        </div>
        <span class="prototype-label">Prototype dataset</span>
      </div>
      <div class="archive-grid">
        ${journalWeeks.slice(1).map((week) => `
          <button class="archive-card" data-week="${week.id}">
            <span>${week.id}</span>
            <strong>${week.label}</strong>
            <small>${week.total} papers</small>
            <span class="archive-topics">${Object.keys(week.topics).join(" · ")}</span>
          </button>
        `).join("")}
      </div>
    </section>

    <section class="journal-workflow content-section">
      <p class="eyebrow">The workflow</p>
      <div class="workflow-grid">
        <div><strong>01</strong><h3>Collect</h3><p>New papers arrive from arXiv every weekday.</p></div>
        <div><strong>02</strong><h3>Understand</h3><p>AI extracts the question, method, result, and limitations.</p></div>
        <div><strong>03</strong><h3>Shortlist</h3><p>You choose what is relevant and add personal notes.</p></div>
        <div><strong>04</strong><h3>Present</h3><p>The app prepares slides, figures, and speaking notes.</p></div>
      </div>
    </section>
  `;
}

function paperCard(paper) {
  if (state.access !== "member") {
    return `
      <article class="weekly-paper visitor-paper">
        <div class="weekly-paper-main">
          <div class="paper-meta">
            ${paper.topics.map((topic, index) => `
              <span class="paper-tag ${index === 0 ? "tomato-tag" : ""}">${topic}</span>
            `).join("")}
            <span>${paper.category}</span>
          </div>
          <h3>${paper.title}</h3>
          <p class="paper-authors">${paper.authors}</p>
          <p class="paper-question-preview"><strong>Abstract</strong>${paper.abstract || paper.question}</p>
          <a class="paper-primary-link" href="${paper.link}" target="_blank" rel="noreferrer">
            Open on arXiv ↗
          </a>
        </div>
      </article>
    `;
  }

  const selected = state.shortlist.includes(paper.id);
  const expanded = state.openPaper === paper.id;
  const selectedAiLanguage = state.aiLanguage[paper.id] || state.language;
  const aiCacheKey = `${paper.id}:${selectedAiLanguage}`;
  const ai = state.aiExplanations[aiCacheKey];
  const aiLoading = state.aiLoading === aiCacheKey;
  const aiError = state.aiError?.cacheKey === aiCacheKey ? state.aiError.message : "";
  return `
    <article class="weekly-paper ${expanded ? "expanded" : ""}">
      <div class="weekly-paper-main">
        <div class="paper-meta">
          ${paper.topics.map((topic, index) => `
            <span class="paper-tag ${index === 0 ? "tomato-tag" : ""}">${topic}</span>
          `).join("")}
          <span>${paper.category}</span>
        </div>
        <h3>${paper.title}</h3>
        <p class="paper-authors">${paper.authors}</p>
        ${expanded ? "" : `
          <p class="paper-question-preview"><strong>Abstract</strong>${paper.abstract || paper.question}</p>
        `}
        <div class="paper-card-actions">
          ${expanded ? "" : `
            <a class="paper-primary-link" href="${paper.link}" target="_blank" rel="noreferrer">
              Open on arXiv ↗
            </a>
          `}
          <button class="explain-button" data-paper="${paper.id}">
            ${expanded ? "Hide AI explanation" : "Read AI explanation"}
          </button>
          <button
            class="shortlist-button"
            data-shortlist="${paper.id}"
            aria-pressed="${selected}"
          >${selected ? "✓ Shortlisted" : "＋ Add to shortlist"}</button>
        </div>
      </div>
      ${expanded ? `
        <div class="paper-reading-compare">
          <section class="original-abstract-panel">
            <p class="eyebrow">Original abstract</p>
            <h4>What the authors wrote</h4>
            <p>${escapeHtml(paper.abstract || paper.question)}</p>
            <a class="arxiv-link" href="${paper.link}" target="_blank" rel="noreferrer">Open arXiv source ↗</a>
          </section>
          <section class="ai-explanation">
            <div class="ai-explanation-heading">
              <span class="ai-spark">AI</span>
              <div><strong>Paper explained</strong><small>Background knowledge + abstract-grounded paper analysis · verify against the paper</small></div>
            </div>
            <div class="ai-language-picker" role="group" aria-label="AI explanation language">
              <button
                class="${selectedAiLanguage === "en" ? "active" : ""}"
                data-generate-ai="${paper.id}"
                data-ai-language="en"
                ${aiLoading ? "disabled" : ""}
              >English</button>
              <button
                class="${selectedAiLanguage === "zh" ? "active" : ""}"
                data-generate-ai="${paper.id}"
                data-ai-language="zh"
                ${aiLoading ? "disabled" : ""}
              >中文</button>
            </div>
            ${ai ? `
              <dl class="explanation-grid">
                <div><dt>Topic background</dt><dd>${escapeHtml(ai.topic_background)}</dd></div>
                <div><dt>Jargon explained</dt><dd>${escapeHtml(ai.jargon_explained)}</dd></div>
                <div><dt>Why this is worth studying</dt><dd>${escapeHtml(ai.why_worth_studying)}</dd></div>
                <div><dt>What this paper asks</dt><dd>${escapeHtml(ai.paper_goal)}</dd></div>
                <div><dt>What the researchers did</dt><dd>${escapeHtml(ai.approach_and_data)}</dd></div>
                <div><dt>What is innovative</dt><dd>${escapeHtml(ai.innovation)}</dd></div>
                <div><dt>Key findings</dt><dd>${escapeHtml(ai.key_findings)}</dd></div>
                <div><dt>Limitations</dt><dd>${escapeHtml(ai.limitations)}</dd></div>
                <div class="discussion-cell"><dt>Question for the room</dt><dd>${escapeHtml(ai.discussion_question)}</dd></div>
              </dl>
            ` : `
              <div class="ai-generate-panel">
                <p>${aiLoading
                  ? "AI is reading the abstract and preparing your explanation…"
                  : `Choose ${selectedAiLanguage === "zh" ? "中文" : "English"} above to generate the explanation.`}</p>
                ${aiError ? `<p class="ai-error">${escapeHtml(aiError)}</p>` : ""}
              </div>
            `}
          </section>
        </div>
      ` : ""}
    </article>
  `;
}

function renderWeek() {
  const week = journalWeeks.find((item) => item.id === state.activeWeek) || journalWeeks[0];
  const papers = Array.isArray(week.papers) ? week.papers : [];
  const topics = ["All", ...new Set(papers.flatMap((paper) => paper.topics))];
  const visiblePapers = state.filter === "All"
    ? papers
    : papers.filter((paper) => paper.topics.includes(state.filter));

  app.innerHTML = `
    <section class="weekly-header section-band">
      <button class="back-button" data-view="home">← All dates</button>
      <div class="weekly-title-row">
        <div>
          <p class="eyebrow">${week.eyebrow} · ${week.id}</p>
          <h1>${week.label}</h1>
          <p class="lead">${week.description}</p>
        </div>
        ${appNav(state.access === "member" ? "week" : "archive")}
      </div>
      <div class="week-stats">
        <span><strong>${week.total}</strong> new papers</span>
        ${topicChips(week.topics)}
      </div>
    </section>

    <section class="weekly-browser content-section">
      ${papers.length ? `
        ${state.access !== "member" ? `
          <div class="week-login-banner">
            <span>Sign in to unlock AI explanations, shortlist, imports, and presentation generation.</span>
            <button data-view="login">Sign in</button>
          </div>
        ` : ""}
        <div class="weekly-controls">
          <div>
            <p class="eyebrow">AI-assisted reading</p>
            <h2>${visiblePapers.length} papers to explore</h2>
          </div>
          <div class="topic-filters" role="group" aria-label="Filter by topic">
            ${topics.map((topic) => `
              <button
                class="topic-filter ${state.filter === topic ? "active" : ""}"
                data-topic="${topic}"
              >${topic}</button>
            `).join("")}
          </div>
        </div>
        <div class="weekly-paper-list">
          ${visiblePapers.map(paperCard).join("")}
        </div>
      ` : `
        <div class="archive-empty">
          <span>${week.id}</span>
          <h2>This daily issue is waiting for its scheduled arXiv import.</h2>
          <p>
            The daily archive begins at 07:00 UTC on Monday, 27 July 2026.
          </p>
          <button class="button primary" data-view="visitor">Open daily archive</button>
        </div>
      `}
    </section>
  `;
}

function renderShortlist() {
  if (state.access !== "member") {
    state.view = "login";
    renderLogin();
    return;
  }

  const items = state.shortlist.map(findPaper).filter(Boolean);
  app.innerHTML = `
    <section class="shortlist-header section-band">
      <button class="back-button" data-view="home">← Journal Club overview</button>
      <div class="weekly-title-row">
        <div>
          <p class="eyebrow">My reading list</p>
          <h1>Shortlist</h1>
          <p class="lead">The papers you want to read, discuss, and turn into a presentation.</p>
        </div>
        ${appNav("shortlist")}
      </div>
    </section>

    <section class="shortlist-layout content-section">
      <div class="shortlist-papers">
        ${items.length ? items.map(({ paper, week }, index) => `
          <article class="shortlist-row">
            <span class="shortlist-order">${String(index + 1).padStart(2, "0")}</span>
            <div>
              <span class="eyebrow">${week.label} · ${paper.category}</span>
              <h3>${paper.title}</h3>
              <p>${paper.abstract || paper.question}</p>
              <a class="shortlist-source-link" href="${paper.link}" target="_blank" rel="noreferrer">
                Read original on arXiv ↗
              </a>
              ${shortlistAiExplanation(paper)}
              <label>
                My notes
                <textarea
                  rows="2"
                  data-note="${paper.id}"
                  placeholder="What do you want to mention in the meeting?"
                ></textarea>
              </label>
            </div>
            <button class="remove-shortlist" data-shortlist="${paper.id}" aria-label="Remove ${paper.title}">
              Remove
            </button>
          </article>
        `).join("") : `
          <div class="shortlist-empty">
            <span aria-hidden="true">☆</span>
            <h2>Your shortlist is empty.</h2>
            <p>Open the latest date and select the papers you want to discuss.</p>
            <button class="button primary" data-week="${journalWeeks[0].id}">Browse latest date</button>
          </div>
        `}
      </div>

      <aside class="deck-builder">
        <p class="eyebrow">Presentation builder</p>
        <h2>Turn the list into a talk.</h2>
        <div class="deck-setting">
          <span>Selected papers</span><strong>${items.length}</strong>
        </div>
        <label>
          Audience
          <select name="deck-audience">
            <option>General astrophysics</option>
            <option>Expert audience</option>
            <option>Student-friendly</option>
          </select>
        </label>
        <label>
          Detail
          <select name="deck-detail">
            <option value="2">2 slides per paper</option>
            <option value="3">3 slides per paper</option>
            <option value="4">4 slides per paper</option>
          </select>
        </label>
        <label>
          Presentation language
          <select name="deck-language">
            <option value="en">English</option>
            <option value="zh">中文</option>
          </select>
        </label>
        <button class="generate-deck" ${items.length && !state.deckLoading ? "" : "disabled"}>
          ${state.deckLoading ? "Generating presentation…" : "Generate presentation"}
        </button>
        ${state.deckError ? `<p class="deck-error">${escapeHtml(state.deckError)}</p>` : ""}
        <button class="export-shortlist" data-export-shortlist="true" ${items.length ? "" : "disabled"}>
          Export shortlist JSON
        </button>
        <small>Download a portable backup for another browser.</small>
        <small>Generate a web presentation, then print or save it as a PDF. Automatic paper figures come next.</small>
      </aside>
    </section>
  `;
}

function shortlistAiExplanation(paper) {
  const language = state.aiLanguage[paper.id] || "en";
  const cacheKey = `${paper.id}:${language}`;
  const ai = state.aiExplanations[cacheKey];
  const loading = state.aiLoading === cacheKey;
  const error = state.aiError?.cacheKey === cacheKey ? state.aiError.message : "";
  return `
    <section class="shortlist-ai">
      <div class="shortlist-ai-heading">
        <strong>Saved AI explanation</strong>
        <div class="ai-language-picker" role="group" aria-label="AI explanation language">
          <button
            class="${language === "en" ? "active" : ""}"
            data-generate-ai="${paper.id}"
            data-ai-language="en"
            ${loading ? "disabled" : ""}
          >English</button>
          <button
            class="${language === "zh" ? "active" : ""}"
            data-generate-ai="${paper.id}"
            data-ai-language="zh"
            ${loading ? "disabled" : ""}
          >中文</button>
        </div>
      </div>
      ${ai ? `
        <dl class="shortlist-ai-grid">
          <div><dt>Topic background</dt><dd>${escapeHtml(ai.topic_background)}</dd></div>
          <div><dt>Jargon explained</dt><dd>${escapeHtml(ai.jargon_explained)}</dd></div>
          <div><dt>Why this is worth studying</dt><dd>${escapeHtml(ai.why_worth_studying)}</dd></div>
          <div><dt>What this paper asks</dt><dd>${escapeHtml(ai.paper_goal)}</dd></div>
          <div><dt>What the researchers did</dt><dd>${escapeHtml(ai.approach_and_data)}</dd></div>
          <div><dt>What is innovative</dt><dd>${escapeHtml(ai.innovation)}</dd></div>
          <div><dt>Key findings</dt><dd>${escapeHtml(ai.key_findings)}</dd></div>
          <div><dt>Limitations</dt><dd>${escapeHtml(ai.limitations)}</dd></div>
        </dl>
      ` : `
        <p class="shortlist-ai-empty">${loading
          ? "Generating explanation…"
          : `No saved ${language === "zh" ? "Chinese" : "English"} explanation yet. Click the language button to generate it.`}</p>
        ${error ? `<p class="ai-error">${escapeHtml(error)}</p>` : ""}
      `}
    </section>
  `;
}

function renderDeck() {
  if (!state.deck) {
    state.view = "shortlist";
    renderShortlist();
    return;
  }
  const deck = state.deck;
  app.innerHTML = `
    <section class="deck-toolbar section-band">
      <button class="back-button" data-view="shortlist">← Back to shortlist</button>
      <div>
        <p class="eyebrow">AI presentation preview</p>
        <h1>${escapeHtml(deck.deck_title)}</h1>
        <p>${escapeHtml(deck.deck_subtitle)}</p>
      </div>
      <div class="deck-toolbar-actions">
        <button class="button primary" data-print-deck="true">Download / Save as PDF</button>
        <button class="button" data-export-deck="true">Download outline JSON</button>
      </div>
    </section>
    <section class="deck-preview">
      ${deck.slides.map((slide, index) => `
        <article class="deck-slide deck-slide-${escapeHtml(slide.kind)}">
          <div class="deck-slide-number">${String(index + 1).padStart(2, "0")}</div>
          <p class="eyebrow">${escapeHtml(slide.eyebrow)}</p>
          <h2>${escapeHtml(slide.title)}</h2>
          <p class="deck-slide-subtitle">${escapeHtml(slide.subtitle)}</p>
          <div class="deck-slide-body">
            ${slide.figure_url ? `
              <div class="deck-figure-layout">
                <figure>
                  <img src="${escapeHtml(slide.figure_url)}" alt="${escapeHtml(slide.figure_caption)}">
                  <figcaption>${escapeHtml(slide.figure_caption)}</figcaption>
                </figure>
                <div class="deck-figure-copy">
                  <h3>How to read this figure</h3>
                  <p>${escapeHtml(slide.figure_explanation)}</p>
                  <ul>${slide.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join("")}</ul>
                </div>
              </div>
            ` : `
              <ul>${slide.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join("")}</ul>
            `}
          </div>
          ${slide.arxiv_url ? `
            <a href="${escapeHtml(slide.arxiv_url)}" target="_blank" rel="noreferrer">
              arXiv source ↗
            </a>
          ` : ""}
        </article>
      `).join("")}
    </section>
  `;
  requestAnimationFrame(() => {
    fitDeckSlides();
    app.querySelectorAll(".deck-slide img").forEach((image) => {
      image.addEventListener("load", fitDeckSlides, { once: true });
    });
  });
}

function fitDeckSlides() {
  app.querySelectorAll(".deck-slide").forEach((slide) => {
    slide.classList.remove("deck-slide-compact", "deck-slide-dense", "deck-slide-minimal");
    if (deckSlideOverflows(slide)) slide.classList.add("deck-slide-compact");
    if (deckSlideOverflows(slide)) slide.classList.add("deck-slide-dense");
    if (deckSlideOverflows(slide)) slide.classList.add("deck-slide-minimal");
  });
}

function deckSlideOverflows(slide) {
  const regions = [
    slide,
    ...slide.querySelectorAll(".deck-slide-body, .deck-figure-layout, .deck-figure-copy, figure")
  ];
  return regions.some((region) =>
    region.clientHeight > 0 && (
      region.scrollHeight > region.clientHeight + 1 ||
      region.scrollWidth > region.clientWidth + 1
    )
  );
}

window.addEventListener("beforeprint", fitDeckSlides);
window.addEventListener("afterprint", fitDeckSlides);
window.addEventListener("resize", fitDeckSlides);

function render() {
  if (state.view === "gateway") renderGateway();
  else if (state.view === "login") renderLogin();
  else if (state.view === "visitor") renderVisitor();
  else if (state.view === "week") renderWeek();
  else if (state.view === "shortlist") renderShortlist();
  else if (state.view === "deck") renderDeck();
  else if (state.access === "member") renderHome();
  else renderGateway();
  applyTranslations();
}

app.addEventListener("click", (event) => {
  const weekButton = event.target.closest("[data-week]");
  const viewButton = event.target.closest("[data-view]");
  const topicButton = event.target.closest("[data-topic]");
  const paperButton = event.target.closest("[data-paper]");
  const shortlistButton = event.target.closest("[data-shortlist]");
  const languageButton = event.target.closest("[data-language]");
  const accessButton = event.target.closest("[data-access]");
  const signoutButton = event.target.closest("[data-signout]");
  const importButton = event.target.closest("[data-import]");
  const exportButton = event.target.closest("[data-export-shortlist]");
  const generateButton = event.target.closest(".generate-deck");
  const generateAiButton = event.target.closest("[data-generate-ai]");
  const printDeckButton = event.target.closest("[data-print-deck]");
  const exportDeckButton = event.target.closest("[data-export-deck]");

  if (printDeckButton) {
    window.print();
  } else if (exportDeckButton && state.deck) {
    downloadJson(state.deck, `journal-club-deck-${new Date().toISOString().slice(0, 10)}.json`);
  } else if (generateAiButton && !generateAiButton.disabled) {
    generateAiExplanation(
      generateAiButton.dataset.generateAi,
      generateAiButton.dataset.aiLanguage
    );
  } else if (exportButton && !exportButton.disabled) {
    exportShortlist();
  } else if (signoutButton) {
    supabaseClient?.auth.signOut().finally(() => {
      state.access = null;
      state.view = "gateway";
      render();
    });
  } else if (accessButton) {
    setAccess(accessButton.dataset.access);
  } else if (importButton) {
    state.importStatus = "loading";
    render();
    window.setTimeout(() => {
      state.importStatus = "done";
      render();
    }, 900);
  } else if (languageButton) {
    state.language = languageButton.dataset.language;
    localStorage.setItem(languageKey, state.language);
    render();
  } else if (weekButton) openWeek(weekButton.dataset.week);
  else if (viewButton) setView(viewButton.dataset.view);
  else if (topicButton) {
    state.filter = topicButton.dataset.topic;
    render();
  } else if (paperButton) {
    state.openPaper = state.openPaper === paperButton.dataset.paper ? null : paperButton.dataset.paper;
    render();
  } else if (shortlistButton) {
    toggleShortlist(shortlistButton.dataset.shortlist);
  } else if (generateButton && !generateButton.disabled) {
    generatePresentation();
  }
});

function downloadJson(payload, filename) {
  const url = URL.createObjectURL(new Blob([`${JSON.stringify(payload, null, 2)}\n`], {
    type: "application/json"
  }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

async function generatePresentation() {
  const items = state.shortlist.map(findPaper).filter(Boolean).slice(0, 8);
  if (!items.length || !supabaseClient) return;
  const audience = app.querySelector("[name='deck-audience']")?.value || "General astrophysics";
  const slidesPerPaper = Number(app.querySelector("[name='deck-detail']")?.value || 2);
  const language = app.querySelector("[name='deck-language']")?.value || "en";
  const notes = new Map(
    [...app.querySelectorAll("[data-note]")].map((element) => [
      element.dataset.note,
      element.value.trim()
    ])
  );

  state.deckLoading = true;
  state.deckError = null;
  render();
  const { data, error } = await supabaseClient.functions.invoke("generate-deck", {
    body: {
      audience,
      slides_per_paper: slidesPerPaper,
      language,
      papers: items.map(({ paper }) => ({
        id: paper.id,
        title: paper.title,
        authors: paper.authors,
        category: paper.category,
        abstract: paper.abstract,
        arxiv_url: paper.link,
        personal_note: notes.get(paper.id) || ""
      }))
    }
  });
  state.deckLoading = false;
  if (error || !data?.deck) {
    let message = data?.error || error?.message || "The presentation could not be generated.";
    if (error?.context) {
      try {
        const details = await error.context.json();
        message = details.error || message;
      } catch {
        // Keep the original invocation error.
      }
    }
    state.deckError = message;
    render();
    return;
  }
  state.deck = data.deck;
  state.view = "deck";
  render();
}

async function generateAiExplanation(paperId, language) {
  const match = findPaper(paperId);
  if (!match || !supabaseClient) return;
  const cacheKey = `${paperId}:${language}`;
  state.aiLanguage[paperId] = language;
  if (state.aiExplanations[cacheKey]) {
    state.aiError = null;
    render();
    return;
  }
  state.aiLoading = cacheKey;
  state.aiError = null;
  render();

  const { data, error } = await supabaseClient.functions.invoke("explain-paper", {
    body: {
      title: match.paper.title,
      abstract: match.paper.abstract,
      category: match.paper.category,
      language
    }
  });

  state.aiLoading = null;
  if (error || !data?.explanation) {
    let message = data?.error || error?.message || "The AI explanation could not be generated.";
    if (error?.context) {
      try {
        const details = await error.context.json();
        message = details.error || message;
      } catch {
        // Keep the original invocation error.
      }
    }
    state.aiError = { cacheKey, message };
  } else {
    state.aiExplanations[cacheKey] = data.explanation;
    localStorage.setItem(aiStorageKey, JSON.stringify(state.aiExplanations));
  }
  render();
}

app.addEventListener("submit", (event) => {
  if (!event.target.matches(".login-form")) return;
  event.preventDefault();
  const form = event.target;
  const message = form.querySelector(".login-message");
  const submitButton = form.querySelector("button[type='submit']");
  submitButton.disabled = true;
  submitButton.textContent = t("Sending…");
  message.hidden = false;
  message.style.display = "block";
  message.textContent = t("Sending your secure sign-in link…");
  message.className = "login-message pending";

  if (!supabaseClient) {
    message.textContent = "The secure sign-in service could not load. Please refresh and try again.";
    message.className = "login-message error";
    submitButton.disabled = false;
    submitButton.textContent = t("Send magic link");
    return;
  }

  supabaseClient.auth.signInWithOtp({
    email: form.elements.email.value.trim(),
    options: {
      shouldCreateUser: false,
      emailRedirectTo: new URL("journal-club.html", window.location.href).href
    }
  }).then(({ error }) => {
    if (error) throw error;
    form.reset();
    message.textContent = t("Magic link sent. Please check your inbox and spam folder.");
    message.className = "login-message success";
    submitButton.textContent = t("Email sent ✓");
  }).catch((error) => {
    message.textContent = `${state.language === "zh" ? "发送失败：" : "Could not send the link: "}${error.message}`;
    message.className = "login-message error";
  }).finally(() => {
    submitButton.disabled = false;
    if (!message.classList.contains("success")) {
      submitButton.textContent = t("Send magic link");
    }
  });
});

async function loadJournalData() {
  try {
    const response = await fetch("data/journal-dates.json", { cache: "no-store" });
    if (!response.ok) return;
    const payload = await response.json();
    if (Array.isArray(payload.dates) && payload.dates.length) {
      journalWeeks = payload.dates;
      state.activeWeek = journalWeeks[0].id;
    }
  } catch {
    // Local file previews cannot fetch JSON. Keep the built-in prototype dataset.
  }
}

async function initialiseJournalClub() {
  await loadJournalData();
  if (supabaseClient) {
    const { data } = await supabaseClient.auth.getSession();
    if (data.session) {
      state.access = "member";
      state.view = "home";
    }
    supabaseClient.auth.onAuthStateChange((_event, session) => {
      const wasMember = state.access === "member";
      state.access = session ? "member" : null;
      if (session && !wasMember) state.view = "home";
      render();
    });
  }
  render();
}

initialiseJournalClub();
