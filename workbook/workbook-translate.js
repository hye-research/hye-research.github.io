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
    "To nudge these workbooks forward, contact me.": "如果你想推动这些工作本继续完善，可以 contact me。",
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
    "Exploring Boundaries": "了解我的边界",
    "Notice limits, access needs, honest yeses, and relationship care.": "梳理哪些事情会让你太勉强，哪些支持会让你更容易参与，以及怎样在关系里更诚实地说“可以”和“不可以”。",
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

  const supplementalTranslations = {
    "Your sensory notes save in this browser on this device. They are not uploaded.": "你的感官笔记只会保存在这台设备的浏览器里，不会上传。",
    "Your learning style notes save in this browser on this device. They are not uploaded.": "你的学习方式笔记只会保存在这台设备的浏览器里，不会上传。",
    "Your getting-started toolkit saves in this browser on this device. It is not uploaded.": "你的开始行动工具包只会保存在这台设备的浏览器里，不会上传。",
    "Your SPQ answers save in this browser on this device. They are not uploaded.": "你的 SPQ 答案只会保存在这台设备的浏览器里，不会上传。",
    "Your test answers save in this browser on this device. They are not uploaded.": "你的测试答案只会保存在这台设备的浏览器里，不会上传。",

    "This is me": "这很像我",
    "Maybe me": "有点像我",
    "Not me": "不像我",
    "Vote": "选择",
    "Choose...": "选择……",
    "Nothing selected yet": "还没有选择",
    "Nothing marked maybe yet": "还没有标记“也许”",
    "No values marked yet": "还没有标记价值观",
    "No body cues saved yet.": "还没有保存身体线索。",
    "Values marked": "已标记的价值观",
    "This is my value": "这是我的价值观",
    "Maybe": "也许",
    "Visual": "视觉",
    "Auditory": "听觉",
    "Reading / writing": "阅读 / 写作",
    "Kinesthetic": "身体动作",
    "Tactile": "触觉",
    "Vestibular": "前庭觉",
    "Proprioceptive": "本体觉",
    "Interoceptive": "内感受",
    "Taste": "味觉",
    "Smell": "嗅觉",
    "Taste & smell": "味觉与嗅觉",
    "Understand sensory": "了解感官",
    "Body cues": "身体线索",
    "Support needs": "支持需求",
    "Sensory supports": "感官支持",
    "Done for now": "这轮先到这里",
    "Notes": "笔记",
    "Select a version": "选择版本",
    "Short version, 35 questions": "短版，35 题",
    "Full version, 92 questions": "完整版，92 题",
    "Start assessment": "开始问卷",
    "Reset SPQ": "重置 SPQ",
    "Save SPQ JPG": "保存 SPQ JPG",
    "SPQ Assessment": "SPQ 问卷",
    "Sensory Perception Quotient": "感官知觉问卷",
    "Privacy note": "隐私说明",
    "Sensory map sections": "感官地图分区",
    "Save sensory map JPG": "保存感官地图 JPG",
    "Reset sensory map": "重置感官地图",
    "Save sensory profile JPG": "保存感官档案 JPG",
    "Screens, fluorescent lights, busy rooms, tiny details, sudden movement.": "屏幕、荧光灯、很忙的房间、细小细节、突然移动。",
    "Alarms, overlapping voices, humming appliances, music, silence.": "警报声、重叠的人声、嗡嗡响的电器、音乐、安静。",
    "Tags, seams, hair, hugs, sticky hands, heat, cold, light touch.": "标签、接缝、头发、拥抱、黏黏的手、热、冷、轻触。",
    "Car rides, escalators, swings, leaning back, quick turns, dizziness.": "坐车、扶梯、秋千、向后靠、快速转弯、头晕。",
    "Pushing, carrying, stretching, pressure, bumping into things.": "推、拿重物、伸展、压力感、撞到东西。",
    "Forgetting to eat, noticing pain late, sudden overwhelm, body check-ins.": "忘记吃饭、很晚才注意到疼痛、突然超载、身体确认。",
    "Perfume, cooking smells, toothpaste, food texture, aftertaste.": "香水、做饭的味道、牙膏、食物口感、余味。",
    "Softer lighting": "更柔和的光线",
    "A less busy desk": "更少杂物的桌面",
    "Screen brightness that feels easier": "感觉更舒服的屏幕亮度",
    "One clear focus area": "一个清楚的专注区域",
    "Quieter background sound": "更安静的背景声",
    "A short quiet break": "短暂安静休息",
    "Clear warning before loud sounds": "大声响之前先提醒",
    "Captions when helpful": "有帮助时打开字幕",
    "Clothes that feel comfortable": "感觉舒服的衣服",
    "Fewer irritating textures": "减少让人烦躁的材质",
    "A preferred blanket or layer": "喜欢的毯子或一层衣物",
    "A backup outfit for long days": "长日子里的备用衣服",
    "Slower transitions": "更慢的切换",
    "A stable seat": "稳定的座位",
    "Gentle movement breaks": "温和的活动休息",
    "Warning before sudden movement": "突然移动前先提醒",
    "A short walk": "短暂散步",
    "Stretching in a comfortable way": "用舒服的方式伸展",
    "Holding something grounding": "拿着能让人落地的东西",
    "Tasks that use the body gently": "温和使用身体的任务",
    "Body signals may arrive late, quietly, or all at once.": "身体信号可能来得晚、很小声，或一下子全来。",
    "Water and snack reminders": "喝水和吃点东西的提醒",
    "Noticing pain or fatigue earlier": "更早注意到疼痛或疲劳",
    "A personal energy scale": "个人能量刻度",
    "Lower-scent spaces": "气味更低的空间",
    "Reliable foods": "稳定可靠的食物",
    "Texture choices that feel okay": "感觉还可以的口感选择",
    "Fresh air when smells build up": "气味累积时换新鲜空气",
    "What feels familiar? What do you want to observe this week?": "什么感觉熟悉？这周你想观察什么？",
    "How does visual input affect your energy, focus, comfort, or choices?": "视觉输入会怎样影响你的能量、专注、舒适度或选择？",
    "How does auditory input affect your energy, focus, comfort, or choices?": "听觉输入会怎样影响你的能量、专注、舒适度或选择？",
    "How does tactile input affect your energy, focus, comfort, or choices?": "触觉输入会怎样影响你的能量、专注、舒适度或选择？",
    "How does vestibular input affect your energy, focus, comfort, or choices?": "前庭觉输入会怎样影响你的能量、专注、舒适度或选择？",
    "How does proprioceptive input affect your energy, focus, comfort, or choices?": "本体觉输入会怎样影响你的能量、专注、舒适度或选择？",
    "How does interoceptive input affect your energy, focus, comfort, or choices?": "内感受输入会怎样影响你的能量、专注、舒适度或选择？",
    "How does taste & smell input affect your energy, focus, comfort, or choices?": "味觉和嗅觉输入会怎样影响你的能量、专注、舒适度或选择？",
    "What do I want to try? What helps, what does not, and when?": "我想尝试什么？什么有帮助，什么没有，什么时候有用？",

    "Sequential": "按顺序",
    "Big-picture / conceptual": "先看大图 / 概念",
    "Detail-oriented": "重视细节",
    "Pattern-based": "看模式",
    "Associative": "联想式",
    "Reflective": "需要反思时间",
    "Fast-paced": "快节奏",
    "Interest-led": "兴趣驱动",
    "Novelty-seeking": "需要新鲜感",
    "Challenge-based": "挑战驱动",
    "Autonomy-supported": "需要自主感",
    "Interactive": "互动式",
    "Movement-supported": "动作支持",
    "Clear structure": "清楚结构",
    "Examples": "例子",
    "Repetition": "重复",
    "Chunking": "分小块",
    "Memory scaffolding": "记忆脚手架",
    "Time to prepare": "准备时间",
    "Independent": "独立",
    "One-to-one": "一对一",
    "Small group": "小组",
    "Group-based": "群体式",
    "Parallel": "并行陪伴",
    "Open subtypes": "展开细分类型",
    "Open learning style test": "打开学习方式测试",
    "Reset learning map": "重置学习地图",
    "Reset learning votes": "重置学习选择",
    "Save learning votes JPG": "保存学习选择 JPG",
    "Reflect & test": "反思与测试",
    "Understand styles": "了解学习方式",
    "Take-away & notes": "可以带走的发现和笔记",
    "What made me think?": "什么让我开始思考？",
    "What surprised me?": "什么让我意外？",
    "What do I want to test in real life?": "我想在现实里测试什么？",

    "Basic needs": "基础需求",
    "Body state and health": "身体状态和健康",
    "Pain and movement": "疼痛和活动",
    "Emotion or sensory load": "情绪或感官负荷",
    "Rest and substances": "休息和摄入物",
    "I might be hungry": "我可能饿了",
    "I might be thirsty": "我可能渴了",
    "I may need the bathroom": "我可能需要去洗手间",
    "I am too hot or too cold": "我太热或太冷了",
    "I feel sleepy, heavy, or mentally tired": "我觉得困、身体沉，或脑子累",
    "My jaw, neck, or shoulders feel tight": "我的下巴、脖子或肩膀很紧",
    "Something hurts": "有哪里疼",
    "I may need to change position, stretch, or walk": "我可能需要换姿势、伸展或走一走",
    "I feel overwhelmed or close to shutting down": "我感觉太多了，快要关机了",
    "Noise, light, texture, or crowding feels like too much": "噪音、光、材质或人群感觉太多了",
    "My mood feels off, even if I cannot name why": "我心情不太对，即使说不出原因",
    "Illness, allergies, or hormones may be affecting me": "生病、过敏或激素可能在影响我",
    "Medication may be affecting me": "药物可能在影响我",
    "Caffeine or sugar might be affecting me": "咖啡因或糖可能在影响我",
    "Alcohol might be affecting me": "酒精可能在影响我",
    "Simple body check-ins": "简单身体确认",
    "Body first": "身体先行",
    "Micro-needs matter": "小需求也重要",
    "Context shapes the body": "环境会影响身体",
    "Signal volume changes": "信号音量会变化",
    "Neutral counts": "没有明显感觉也算数",
    "Permission to respond": "允许自己回应",

    "Capacity boundary": "容量边界",
    "Communication boundary": "沟通边界",
    "Aftercare": "事后照顾",
    "Boundary script": "边界话术",
    "The body no": "身体里的“不”",
    "Access needs are boundaries": "支持需求也是边界",
    "A yes can have shape": "“可以”也可以有条件",
    "Resentment is a clue": "怨气是线索",
    "Boundaries can include repair": "边界也可以包含修复",
    "Private boundaries count": "私下练习的边界也算数",
    "What communication conditions help you stay clear, honest, and less overloaded?": "什么沟通条件能帮你更清楚、更诚实，也更不超载？",
    "Where do you often say yes before checking whether you have enough capacity?": "你常常在哪里还没确认容量，就先答应了？",
    "After a boundary is set, what support might help your body believe it was allowed?": "设下边界之后，什么支持能让身体相信：这样是被允许的？",
    "What is a sentence you could try that is specific, kind enough, and not over-explained?": "你可以试一句怎样的话：具体、足够温和，又不过度解释？",

    "First move library": "第一步工具库",
    "Prompts for building the toolkit": "建立工具包的问题",
    "A place for start-up tools": "放开始行动工具的地方",
    "Loose getting-started toolkit notes": "零散的开始行动笔记",
    "Tools for crossing the start line": "跨过开始线的工具",
    "Lower the threshold": "把门槛降下来",
    "Friction removal": "移除阻力",
    "Body first": "身体先行",
    "External spark": "外部火花",
    "Done for now": "这轮先到这里",
    "The permission version": "允许不完美的版本",
    "What kind of stuck is this?": "这是什么类型的卡住？",
    "When I get stuck again": "下次我又卡住时",
    "What gets in the way before the task even begins, and what could remove one piece of friction?": "任务还没开始前，什么已经挡住了你？可以先移除哪一小块阻力？",
    "What short ritual tells your brain and body that this is the beginning, not the whole task?": "什么短短的仪式能告诉大脑和身体：这只是开始，不是整个任务？",
    "When you cannot start, what is the shape of the stuckness?": "当你没法开始时，卡住的形状是什么？",
    "If you freeze halfway through starting, what is the rescue plan that does not require shame?": "如果开始到一半僵住了，有什么不需要羞耻感的救援方案？",

    "The hard no": "强烈的“不”",
    "Tiny loyalty": "小小的忠诚",
    "Worth the cost": "值得付出成本",
    "Ordinary good": "普通但很好的日子",
    "Values I notice in others": "我在别人身上注意到的价值观",
    "When you feel a strong no, what might that no be trying to protect?": "当你感觉到强烈的“不”，这个“不”可能在保护什么？",
    "What small thing do you keep doing because it feels right, even if nobody notices?": "有什么小事你一直在做，只因为它感觉是对的，即使没人注意？",
    "Which values still feel worth choosing, even when they take extra energy, time, courage, or consequences?": "哪些价值观即使需要额外能量、时间、勇气或承担后果，仍然值得选择？",
    "Think of a day that was not perfect but felt more like yours. What values were present?": "想一个不完美但更像你的日子。那天有什么价值观在场？",
    "What values do you admire in other people that you might also want more of in your own life?": "你欣赏别人身上的哪些价值观，也想在自己的生活里多一点？",
    "Add a body cue": "添加身体线索",
    "Save reflection JPG": "保存反思 JPG",
    "Reset reflection": "重置反思",
    "Save test JPG": "保存测试 JPG",
    "Reset test": "重置测试",
    "Self-understanding test": "自我理解测试",
    "Index of Learning Styles": "学习方式索引",
    "Felder-Soloman Learning Style Assessment": "Felder-Soloman 学习方式评估",
    "For each question, select the answer that best describes your preference. There are 44 questions total covering four dimensions of learning styles.": "每一题请选择最符合你偏好的答案。总共有 44 题，覆盖学习方式的四个维度。",
    "Take this test to understand yourself better": "用这个测试更了解自己",
    "This questionnaire measures sensory perception differences in adults. Select the version you would like to complete.": "这份问卷用于了解成年人的感官知觉差异。请选择你想完成的版本。",
    "SPQ-35": "SPQ-35",
    "SPQ-92": "SPQ-92",
    "Open-mindedness": "开放心态",
    "Thoroughness": "周全细致",

    "After learning": "学习之后",
    "After reading different learning styles, what felt unexpected, new, or more complicated than you thought?": "读完不同学习方式之后，什么让你觉得意外、新鲜，或比你原本以为的更复杂？",
    "Choose one small learning support or format you want to try before deciding whether it fits you.": "选一个小的学习支持或形式，先试试看，再判断它适不适合你。",
    "Choose the social setting intentionally: independent, one-to-one, or group-based.": "有意识地选择社交环境：独立、一对一，还是群体式。",
    "Ask for information in more than one format when possible.": "可以的话，请别人用不止一种形式提供信息。",
    "Ask for preview time, a concept map, or step-by-step order when the default pace does not fit.": "当默认节奏不适合你时，可以请求预览时间、概念图，或一步一步的顺序。",
    "Connect new material to something meaningful before expecting sustained focus.": "期待自己持续专注之前，先把新材料和某个有意义的东西连接起来。",
    "Keep reusable scaffolds such as checklists, models, worked examples, and practice rounds.": "保留可重复使用的脚手架，比如清单、模型、做好的例子和练习轮次。",
    "Make group learning clearer with roles, turn-taking, and a way to ask questions safely.": "用角色分工、轮流发言和安全提问方式，让群体学习更清楚。",
    "Name the pace and structure that help: reflective, fast-paced, sequential, or big-picture.": "说出对你有帮助的节奏和结构：需要反思时间、快节奏、按顺序，还是先看大图。",
    "Notice whether visual, auditory, reading / writing, or hands-on input helps most for this task.": "留意这个任务里，视觉、听觉、阅读 / 写作，还是动手输入最有帮助。",
    "Open the full learning style test in a new tab, then come back here to write down anything useful.": "在新标签页打开完整学习方式测试，然后回到这里写下有用的发现。",
    "Which card made you pause, question an old label, or remember a real-life learning moment?": "哪张卡让你停了一下、质疑旧标签，或想起真实的学习时刻？",
    "I understand something better after I": "我在这样做之后更容易理解",
    "think it through": "想清楚",
    "try it out": "试一试",
    "Visual, Auditory, Reading / writing, Kinesthetic, Tactile, Taste, Smell": "视觉、听觉、阅读 / 写作、身体动作、触觉、味觉、嗅觉",
    "Independent, One-to-one, Small group, Group-based, Parallel": "独立、一对一、小组、群体式、并行陪伴",
    "Reflective, Fast-paced, Sequential, Big-picture, Detail-oriented, Pattern-based": "需要反思时间、快节奏、按顺序、先看大图、重视细节、看模式",
    "Interactive, Interest-led, Movement-supported, Novelty, Challenge, Autonomy": "互动、兴趣驱动、动作支持、新鲜感、挑战、自主感",
    "Clear structure, Examples, Repetition, Time to prepare, Chunking, Feedback": "清楚结构、例子、重复、准备时间、分小块、反馈",
    "Learning happens mostly through private processing, self-direction, and reduced social interruption.": "学习主要通过私下处理、自主推进和较少社交打断来发生。",
    "Learning is shaped by direct exchange with one trusted person, mentor, teacher, or peer.": "学习会受到和一个可信任的人、导师、老师或同伴直接交流的影响。",
    "A few familiar people create room for discussion without the intensity of a large audience.": "几个熟悉的人能给讨论留出空间，又不会像大群体那样强烈。",
    "Shared examples, multiple perspectives, social energy, and collaboration are part of the learning process.": "共享例子、多种视角、社交能量和合作，都是学习过程的一部分。",
    "Another person nearby may affect focus even when people are working on separate tasks.": "即使各做各的，旁边有人也可能影响专注。",
    "Performance, confidence, or language access changes depending on who is watching or listening.": "表现、自信或语言可及性，会随着谁在看、谁在听而变化。",
    "Response from another person, the task, or the environment helps calibrate what is understood.": "来自别人、任务或环境的回应，会帮助校准自己理解到了什么。",
    "Benefits when several channels work together, such as seeing, hearing, touching, moving, and naming at the same time.": "当多个通道一起工作时会更有帮助，比如同时看、听、触摸、移动和命名。",
    "Making, designing, storytelling, humor, metaphor, or personal expression helps the material matter.": "制作、设计、讲故事、幽默、比喻或个人表达，会让材料更有意义。",
    "Creative / expressive": "创造 / 表达型",
    "Audience-sensitive": "受观众影响",
    "Multisensory": "多感官",

    "A self-story I inherited": "我继承来的自我故事",
    "Where beliefs live": "信念住在哪里",
    "Community signals": "社群信号",
    "Trying on language": "试穿语言",
    "What is a story about you that you did not fully choose? What parts still help, and what parts feel too small?": "有什么关于你的故事并不是你完全选择的？哪些部分仍然有帮助，哪些部分已经太小了？",
    "When you say a belief about yourself, what happens in your body: softening, bracing, blankness, heat, curiosity?": "当你说出一个关于自己的信念时，身体发生了什么：变软、绷住、空白、发热、好奇？",
    "What tells you that a space, group, or relationship has room for your real needs?": "什么会告诉你，一个空间、群体或关系里有你的真实需求的位置？",
    "Which words, labels, or descriptions are you curious about trying on without committing forever?": "哪些词、标签或描述，是你想先试试看但不必永远承诺的？",

    "Make it smaller than small": "比小还要更小",
    "Starter ritual": "开始仪式",
    "For common tasks, what is the smallest first move that usually helps you cross from not-started to started?": "对于常见任务，通常哪个最小的第一步能帮你从“还没开始”跨到“已经开始”？",

    "Exploring different sensory channels": "探索不同的感官通道",
    "This is not a test or diagnosis. It is a way to notice which inputs cost energy, which ones help, and which ones depend on context.": "这不是测试，也不是诊断。它只是帮你看见：哪些输入会消耗能量，哪些会帮到你，哪些要看情况。",
    "Input can include language, images, movement, touch, taste, smell, and combinations of several channels.": "输入可以是语言、图像、动作、触感、味道、气味，也可以是几种通道混在一起。",
    "This input often costs energy or feels too much.": "这种输入经常很耗能，或者感觉太多了。",
    "This input often helps you feel regulated or present.": "这种输入经常能帮你更稳定、更在场。",
    "Context, timing, or control changes the experience.": "情境、时间点，或者你有没有掌控感，都会改变体验。",
    "How does your sensory profile impact you? Pick what is most true right now, then add a short comment under each sensory channel.": "你的感官模式会怎样影响你？先选现在最像你的状态，再在每个感官通道下面写一句备注。",
    "Notes while learning about my sensory systems": "了解自己感官系统时的笔记",
    "These are starting points, not rules. The useful question is: does this make the environment easier to be in?": "这些只是起点，不是规则。真正有用的问题是：这样会不会让这个环境更容易待下去？",
    "Take the Sensory Perception Quotient": "做感官知觉问卷",
    "Open the SPQ assessment in a workbook-styled page, then come back here to connect the result with your own sensory profile notes.": "在工作本风格页面里打开 SPQ 问卷，做完后回到这里，把结果和你的感官笔记连接起来。",
    "Open sensory perception test": "打开感官知觉测试",
    "Sensory supports": "感官支持",
    "Things to notice and try": "可以留意和尝试的东西",
    "Light, color, patterns, movement, and visual clutter.": "光线、颜色、图案、移动，以及视觉上的杂乱。",
    "Sound volume, tone, rhythm, background noise, and surprise sounds.": "音量、音调、节奏、背景噪音，以及突然出现的声音。",
    "Touch, texture, pressure, temperature, clothing, and skin sensations.": "触碰、材质、压力、温度、衣服，以及皮肤上的感觉。",
    "Balance, spinning, swinging, speed, and head position.": "平衡、旋转、摇晃、速度，以及头部位置。",
    "Body position, pressure, weight, force, and muscle feedback.": "身体位置、压力、重量、用力程度，以及肌肉反馈。",
    "Inside-body signals like hunger, thirst, pain, heartbeat, and fatigue.": "身体内部信号，比如饿、渴、疼痛、心跳和疲劳。",
    "Flavors, food textures, smells, nausea, and scent memories.": "味道、食物口感、气味、恶心感，以及和气味相关的记忆。",
    "Bright or flickering light can drain energy before it feels obvious.": "太亮或闪烁的光，可能在你意识到之前就已经消耗能量。",
    "Layered sound can make simple tasks feel much harder.": "叠在一起的声音，会让简单任务突然变难。",
    "Small tactile irritations can become big when tired or stressed.": "累或压力大时，小小的触感不舒服也可能变得很大。",
    "Balance input can be calming for some people and nauseating for others.": "平衡类刺激对有些人很安定，对另一些人可能会想吐。",
    "Body feedback can help when thoughts feel scattered or floaty.": "当思绪很散、很飘时，身体反馈可能会帮你落地。",
    "Some body signals whisper until they suddenly shout. Late noticing is a pattern to work with, not a character flaw.": "有些身体信号一开始很小声，直到突然变得很大。晚一点才注意到是一种模式，不是性格缺陷。",
    "Smell and taste can strongly affect focus, nausea, and mood.": "气味和味道可能会强烈影响专注、恶心感和心情。",

    "This map looks at several dimensions of learning. It is not a fixed label; it is a way to notice what makes learning clearer, more available, and easier to use.": "这张地图会看学习的几个维度。它不是固定标签，而是帮你看见什么会让学习更清楚、更容易进入、更能用起来。",
    "Before taking a test, pause with your own experience. The goal is not to find one perfect label; it is to notice what feels familiar, what feels new, and what you may want to try.": "做测试之前，先把自己的真实经验放进来。目标不是找到一个完美标签，而是看见什么熟悉、什么新鲜、什么值得试试。",
    "Input format": "输入形式",
    "Processing style": "处理方式",
    "Engagement needs": "进入状态的条件",
    "Support needs": "需要的支持",
    "Social setting": "社交环境",
    "Input format describes the route information takes into attention and memory.": "输入形式指的是信息通过什么路径进入注意力和记忆。",
    "The format information arrives in can change how easy it is to understand and remember.": "信息呈现的形式，会影响理解和记住它的难易程度。",
    "Processing style describes how information is organized, paced, connected, and turned into understanding.": "处理方式指的是信息怎样被整理、推进、连接，并变成理解。",
    "This dimension is about the route thinking takes, not whether someone is quick, slow, good, or bad at learning.": "这个维度说的是思考走哪条路，不是在评价一个人学得快慢好坏。",
    "Engagement needs describe what makes attention, motivation, and participation easier to access.": "进入状态的条件，指的是哪些东西能让注意力、动力和参与感更容易出现。",
    "This dimension is about what pulls the learner into the material and what makes the learning feel alive enough to stay with.": "这个维度关心什么会把你带进材料里，让学习变得足够有生命力，能继续下去。",
    "Support needs describe the scaffolds that reduce confusion, uncertainty, memory load, or pressure.": "支持需求指的是哪些脚手架能减少困惑、不确定、记忆负担或压力。",
    "This dimension names the kind of scaffolding a learner may need; it is not a measure of ability.": "这个维度是在命名可能需要的支持，不是在衡量能力。",
    "Social setting describes how the presence, role, and number of other people shape learning.": "社交环境指的是他人在不在、扮演什么角色、有多少人，会怎样影响学习。",
    "This dimension includes privacy, audience, feedback, collaboration, and whether other people add energy or demand.": "这个维度包括隐私、观众、反馈、合作，以及别人是在增加能量还是增加负担。",
    "Learns more easily through images, diagrams, color, layout, icons, maps, and spatial organization.": "通过图像、图表、颜色、布局、图标、地图和空间结构，会更容易学习。",
    "Benefits from spoken explanation, discussion, rhythm, listening, or saying ideas out loud.": "口头解释、讨论、节奏、听，以及把想法说出来，会更有帮助。",
    "Uses written words, notes, lists, captions, labels, and rewriting to organize understanding.": "用文字、笔记、列表、字幕、标签和重写来整理理解。",
    "Learns through body movement, acting things out, practicing actions, gestures, or physically doing the process.": "通过身体移动、演出来、练动作、手势，或者亲自做一遍来学习。",
    "Uses touch, texture, pressure, manipulatives, materials, or physical objects to make ideas more concrete.": "用触感、材质、压力、可操作材料或实物，让想法更具体。",
    "May connect learning to flavor, food-based examples, oral sensory experience, or taste-related memory cues.": "可能会把学习和味道、食物例子、口腔感受，或与味觉相关的记忆线索连接起来。",
    "May notice scent strongly; familiar or low-scent environments can affect focus, memory, comfort, or access.": "可能对气味很敏感；熟悉或低气味的环境会影响专注、记忆、舒适度和可参与性。",
    "Information makes sense through ordered steps, clear progression, and cause-and-effect links.": "通过有顺序的步骤、清楚的推进和因果关系，信息会更容易变得有意义。",
    "The overall purpose, theme, or concept needs to be visible before details feel meaningful.": "需要先看见整体目的、主题或概念，细节才会有意义。",
    "Small facts, precision, exceptions, and exact wording are important parts of understanding.": "小事实、准确性、例外和精确措辞，都是理解的重要部分。",
    "Learning happens through noticing similarities, systems, categories, rules, or repeated structures.": "通过看见相似性、系统、类别、规则或重复结构来学习。",
    "Ideas connect through memory, emotion, examples, side links, and non-linear relationships.": "想法会通过记忆、情绪、例子、旁支连接和非线性关系连起来。",
    "Understanding develops through pauses, internal thinking, drafts, and time to form a response.": "理解会在暂停、内部思考、草稿和形成回应的时间里发展。",
    "Thinking feels more available when there is momentum, challenge, and quick movement between ideas.": "有推进感、挑战和想法之间快速移动时，思考会更容易出现。",
    "Motivation is strongest when the topic connects to curiosity, fascination, or a deep interest.": "当主题连接到好奇、着迷或深层兴趣时，动力通常最强。",
    "Newness, variety, surprise, or changing formats can make attention easier to sustain.": "新鲜感、变化、惊喜或形式切换，会让注意力更容易维持。",
    "A clear puzzle, goal, problem, or level of difficulty can create focus and momentum.": "清楚的谜题、目标、问题或难度，会带来专注和推进感。",
    "Engagement is shaped by having meaningful choice, control over approach, or ownership of the task.": "有真实选择、能控制做法，或者对任务有一点拥有感，会影响参与感。",
    "Attention is supported by participation, questions, feedback, experiments, and active exchange.": "参与、提问、反馈、实验和主动交流，会支持注意力。",
    "Engagement is connected to body movement, gestures, fidgets, standing, walking, or physical action.": "身体移动、手势、小动作、站立、走动或实际动作，会影响进入状态。",
    "Understanding depends on explicit steps, expectations, boundaries, and what counts as complete.": "理解需要清楚的步骤、期待、边界，以及怎样才算完成。",
    "Models, samples, demonstrations, or comparison cases make abstract expectations more concrete.": "模型、样例、示范或对比例子，会让抽象期待更具体。",
    "Repeated exposure, reminders, and revisiting information are part of how learning settles.": "反复接触、提醒和重新看信息，是学习稳定下来的方式之一。",
    "Information is easier to hold when it is divided into smaller parts, stages, or checkpoints.": "把信息分成小块、阶段或检查点，会更容易拿得住。",
    "External cues, labels, lists, prompts, or reminders reduce the load on working memory.": "外部线索、标签、列表、提示和提醒，可以减少工作记忆负担。",
    "Preview, planning, and reduced surprise affect readiness to participate or produce work.": "预览、计划和减少突发，会影响你是否准备好参与或产出。",

    "Values are not homework answers. They often show up as irritation, relief, admiration, loyalty, resistance, or the tiny things you keep returning to.": "价值观不是作业答案。它们常常藏在烦躁、松一口气、欣赏、忠诚、抗拒，或者你一直回到的小事里。",
    "Use these as starting points. The goal is not to rank your life perfectly; it is to notice what keeps asking for your attention.": "把这些当作起点就好。目标不是把人生排出完美顺序，而是看见什么一直在要你的注意。",
    "This page can hold fragments: words that feel important, contradictions, things you are not ready to decide, and values that only appear in certain contexts.": "这一页可以放碎片：感觉重要的词、矛盾、还没准备好决定的事，以及只在某些情境里出现的价值观。",
    "Click a value once for This is my value, click again for Maybe, click a third time to clear it. You can choose as many or as few as you want.": "点一次表示“这是我的价值观”，再点一次表示“也许”，第三次清除。你可以选很多，也可以只选一点点。",
    "When something feels wrong, it may be pointing toward a value that is being crowded, rushed, or ignored.": "当某件事感觉不对，可能是有个价值观被挤压、催促或忽略了。",
    "Notice: what kind of situation makes you quietly tense?": "留意：什么样的情境会让你暗暗紧绷？",
    "A moment of relief can show what your nervous system, attention, or sense of self has been needing.": "松一口气的瞬间，可能会告诉你神经系统、注意力或自我感一直需要什么。",
    "Notice: what makes your shoulders drop a little?": "留意：什么会让你的肩膀稍微放下来一点？",
    "The things you defend, save, repair, or make room for often reveal values before you can name them.": "你会保护、保存、修复或腾出空间的东西，常常比语言更早透露你的价值观。",
    "Notice: what do you keep making space for?": "留意：你一直在给什么腾位置？",
    "People, places, tools, and communities you admire may carry qualities you want near your own life.": "你欣赏的人、地点、工具和社群，可能带着你也想靠近的品质。",
    "Notice: what do you admire without needing to become it?": "留意：你欣赏什么，即使你不一定要变成那样？",
    "A value is allowed to be real even when living it costs energy. The cost is information, not failure.": "一个价值观即使很耗能，也仍然可以是真的。成本是信息，不是失败。",
    "Notice: which values need support, pacing, or boundaries?": "留意：哪些价值观需要支持、节奏或边界？",
    "Some values stay steady. Others become more important in certain seasons, relationships, bodies, or environments.": "有些价值观很稳定；有些会在特定阶段、关系、身体状态或环境里变得更重要。",
    "Notice: what matters more right now than it used to?": "留意：现在什么比以前更重要了？",

    "Identity does not need to become one polished sentence. It can be a map of roles, histories, communities, needs, boundaries, and beliefs in motion.": "身份不需要被打磨成一句漂亮的话。它可以是一张地图，里面有角色、历史、社群、需求、边界和正在变化的信念。",
    "These prompts are invitations, not a demand for certainty. Let contradictions sit on the page without forcing them to resolve.": "这些问题是邀请，不是在要求你确定。让矛盾先待在页面上，不急着解决。",
    "Use this space for words you are trying on, stories you are questioning, and beliefs that feel supportive, outdated, or still forming.": "这里可以放你正在试穿的词、正在质疑的故事，以及感觉支持你、过时了或还在形成的信念。",
    "You may feel different in different rooms. That can be information about safety, language, sensory load, and expectation.": "你在不同空间里可能会很不一样。这可能是在告诉你安全感、语言、感官负荷和期待发生了什么。",
    "Notice: what parts of you get more room with certain people?": "留意：和哪些人在一起时，你的哪些部分有更多空间？",
    "Some self-beliefs began as survival strategies, feedback, labels, or repeated misunderstandings.": "有些自我信念，一开始可能是生存策略、别人反馈、标签，或反复误解留下来的。",
    "Notice: which belief sounds older than you feel now?": "留意：哪个信念听起来比现在的你更旧？",
    "Belonging may not mean fitting everywhere. It may mean finding places where fewer parts of you need to disappear.": "归属不一定是在哪里都合群。它也可以是找到一些地方，让你不需要消失那么多部分。",
    "Notice: where do you feel more like yourself?": "留意：在哪里你更像自己？",
    "A mask may have helped you get through. Exploring it does not require shame or a sudden reveal.": "伪装可能曾经帮你撑过去。探索它不需要羞耻，也不需要突然全部揭开。",
    "Notice: what does the mask protect, hide, or make possible?": "留意：这个伪装保护了什么、藏起了什么、又让什么成为可能？",
    "Identity often includes both-and: proud and tired, capable and supported, private and connected, certain and unsure.": "身份常常是“同时都是真的”：骄傲也疲惫，有能力也需要支持，私密也想连接，确定也不确定。",
    "Notice: which two truths need to sit side by side?": "留意：哪两个真相需要并排存在？",
    "The words you use for yourself can be precise, temporary, playful, clinical, cultural, private, or shared.": "你用来描述自己的词，可以是精确的、临时的、好玩的、临床的、文化里的、私人的，或可以分享的。",
    "Notice: which words feel spacious, and which feel too tight?": "留意：哪些词让你感觉有空间？哪些词太紧了？",

    "Body check-ins are not about doing them perfectly. They are a way to notice signals that may arrive quietly, late, loudly, or all at once.": "身体确认不是为了做得完美。它只是帮你留意那些可能很小声、很晚、很大声，或一下子全来的信号。",
    "Save body cues you notice over time: sensations, patterns, needs, triggers, or small things that helped.": "把你慢慢注意到的身体线索保存下来：感觉、模式、需求、触发点，或者有帮助的小事。",
    "Your body can affect your thoughts, focus, and mood. Hunger, tension, noise, pain, or rest can change what your brain has available.": "身体会影响思考、专注和心情。饥饿、紧绷、噪音、疼痛或休息，都会改变大脑现在能调用的东西。",
    "A body signal does not have to be extreme before it deserves a response.": "身体信号不需要严重到极限，才值得被回应。",
    "Notice: what would you do if the signal already counted?": "留意：如果这个信号已经算数，你会怎么做？",
    "A check-in does not need to find a problem. Neutral, okay, blank, or hard to tell are all valid readings.": "确认身体不一定要找出问题。中性、还行、空白、说不清，都算有效读数。",
    "Notice: what does okay feel like, if anything?": "留意：如果有的话，“还行”在身体里是什么感觉？",
    "Light, sound, hunger, temperature, pressure, people, transitions, and uncertainty can all change body messages.": "光、声音、饥饿、温度、压力、人、切换和不确定性，都会改变身体发出的信息。",
    "Notice: what changed around you before the body changed?": "留意：身体变化之前，周围发生了什么变化？",
    "Small needs are easier to miss: water, posture, texture, bathroom, fresh air, movement, quiet, or a pause.": "小需求很容易被错过：水、姿势、材质、洗手间、新鲜空气、活动、安静，或者暂停一下。",
    "Notice: what small adjustment would make this moment 5 percent easier?": "留意：哪个小调整能让这一刻轻松 5%？",
    "When you feel off but cannot tell why, scan a few body basics before trying to explain everything.": "当你感觉不对但说不出原因时，先扫一遍身体基础项，不急着解释一切。",
    "Notice: what might your body be telling your brain right now?": "留意：你的身体现在可能在告诉大脑什么？",

    "A feeling name can be a temporary label, not a final diagnosis of the moment.": "情绪名字可以只是临时标签，不是对这一刻的最终诊断。",
    "Notice: does the label make more room or make the feeling tighter?": "留意：这个标签让空间变大了，还是让感受更紧了？",
    "Relief and grief, anger and care, excitement and dread can sit in the same room.": "松一口气和难过、愤怒和在乎、兴奋和害怕，可以同时在同一个房间里。",
    "Notice: which two feelings are both asking to be believed?": "留意：哪两种感受都在请求你相信它们？",
    "Emotion can arrive as heat, pressure, restlessness, tears, blankness, or a sudden need to leave.": "情绪可能以热、压力、坐立不安、眼泪、空白，或突然想离开的形式出现。",
    "Notice: where did the feeling show up before it had words?": "留意：这个感受有名字之前，先在身体哪里出现？",
    "Some emotions arrive after the event, once there is enough safety or quiet to feel them.": "有些情绪会在事情之后才来，因为那时终于有足够安全或安静的空间去感受它。",
    "Notice: what are you feeling later that you could not feel then?": "留意：你后来感受到的，是什么当时感受不了的东西？",
    "A feeling may point toward a need, boundary, loss, value, or fear. It does not have to choose your action alone.": "一个感受可能指向需求、边界、失去、价值观或恐惧。但它不需要独自决定你的行动。",
    "Notice: what might this feeling be protecting or requesting?": "留意：这个感受可能在保护什么，或请求什么？",
    "Processing can be a glass of water, a note, a pause, a message draft, a walk, or letting the feeling be witnessed.": "处理情绪可以是一杯水、一条笔记、暂停一下、一封没发出的消息草稿、散步，或只是让这个感受被看见。",
    "Notice: what would help the feeling move one inch?": "留意：什么能让这个感受往前移动一小点？",

    "Boundaries are not only hard lines. They can be pacing, clarity, sensory needs, communication preferences, recovery time, and consent.": "边界不只是硬线。它也可以是节奏、清晰度、感官需求、沟通偏好、恢复时间和同意。",
    "These prompts help you notice where a boundary may already exist in your body, behavior, energy, or resentment before it has language.": "这些问题帮你看见：边界在有语言之前，可能已经在身体、行为、能量或怨气里出现了。",
    "Use this space for boundary drafts, scripts, patterns, and the places where you are still learning what feels possible.": "这里可以放边界草稿、话术、模式，以及你还在学习“什么是可能的”的地方。",
    "A boundary may show up as tension, delay, avoidance, shutdown, irritation, or a wish to disappear.": "边界可能表现为紧绷、拖延、回避、关机、烦躁，或想消失。",
    "Notice: what does your early no feel like?": "留意：早期的“不”在身体里是什么感觉？",
    "Needing clarity, quiet, time, direct language, or fewer transitions can be a boundary, not a preference to apologize for.": "需要清晰、安静、时间、直接语言或更少切换，可以是边界，不是需要道歉的偏好。",
    "Notice: what condition makes participation more possible?": "留意：什么条件会让参与更可能？",
    "Yes might mean yes for one hour, yes with notice, yes by text, yes if I can leave, or yes after I rest.": "“可以”也许是可以一小时、提前说就可以、用文字可以、能离开就可以，或者休息之后可以。",
    "Notice: what shape would make your yes more honest?": "留意：什么样的条件会让你的“可以”更诚实？",
    "Resentment can point to an overextended yes, an unclear agreement, or a need that has been ignored too long.": "怨气可能指向一个撑过头的“可以”、一个不清楚的约定，或一个被忽略太久的需求。",
    "Notice: where are you repeatedly giving past capacity?": "留意：你在哪些地方反复给出超过容量的东西？",
    "A boundary can protect a relationship by making expectations more visible and less dependent on guessing.": "边界可以保护关系，因为它让期待更看得见，也更少依赖猜。",
    "Notice: what would be easier if it were named earlier?": "留意：如果早点说清楚，什么会变容易？",
    "Not every boundary needs an announcement. Some are choices about pacing, exposure, information, and recovery.": "不是每个边界都需要正式宣布。有些只是关于节奏、暴露程度、信息和恢复的选择。",
    "Notice: what boundary could be practiced quietly first?": "留意：哪个边界可以先私下练习？",

    "Starting is not always about motivation. Sometimes it needs less friction, a smaller first move, body support, clearer edges, or permission to begin badly.": "开始并不总是动力问题。有时它需要更少阻力、更小的第一步、身体支持、更清楚的边界，或者允许自己先开始得很烂。",
    "Use these prompts to collect tools that actually help you start. Tiny, specific, repeatable tools are more useful than perfect plans.": "用这些问题收集真正能帮你开始的工具。很小、很具体、能重复的工具，比完美计划更有用。",
    "This space can hold scripts, rituals, first steps, friction points, body supports, and reminders that help you move from stuck to started.": "这里可以放话术、仪式、第一步、卡住点、身体支持和提醒，帮你从卡住走到开始。",
    "The first step may need to be almost silly: open the file, put shoes near the door, write the title, touch the laundry basket.": "第一步可能需要小到有点好笑：打开文件、把鞋放门口、写标题、碰一下洗衣篮。",
    "Tool idea: what is the first visible action under two minutes?": "工具想法：两分钟内能做的第一个看得见的动作是什么？",
    "Starting can get easier when the setup is already waiting: tabs open, materials visible, water nearby, timer ready, instructions found.": "如果准备工作已经在那里等你，开始会容易一些：网页打开、材料看得见、水在旁边、计时器准备好、说明找到了。",
    "Tool idea: what can be prepared before the hard moment?": "工具想法：困难时刻到来前，可以先准备什么？",
    "Sometimes the brain cannot start until the body has enough signal: movement, pressure, food, sound, quiet, temperature, or posture.": "有时大脑没法开始，是因为身体信号还不够：活动、压力感、食物、声音、安静、温度或姿势。",
    "Tool idea: what body input helps you enter the task?": "工具想法：哪种身体输入能帮你进入任务？",
    "A start can come from outside: body doubling, a message, a countdown, a playlist, a calendar block, or a visible cue.": "开始也可以来自外部：有人一起做、发一条消息、倒计时、播放列表、日历块，或一个看得见的提示。",
    "Tool idea: what external signal makes beginning more possible?": "工具想法：什么外部信号会让开始更可能？",
    "Starting is easier when stopping is defined. A task can have a tiny finish line: one paragraph, ten dishes, one email draft.": "知道什么时候停，会让开始更容易。任务可以有一个很小的终点：一段文字、十个碗、一封邮件草稿。",
    "Tool idea: what counts as enough for this round?": "工具想法：这一轮做到什么就算够？",
    "A rough, partial, ugly, private, or ten-minute version can be a real start. Quality can come later.": "粗糙的、部分的、不好看的、私人的，或十分钟版本，也是真正的开始。质量可以之后再来。",
    "Tool idea: what version is allowed to be imperfect?": "工具想法：哪个版本可以允许不完美？",

    "A specific appreciation can feel more believable than a huge statement. For example: I explain things clearly, I notice when a room feels off, I make people laugh, or I keep trying.": "具体的欣赏，常常比很大的宣言更可信。比如：我解释事情很清楚；我能注意到房间气氛不对；我会让人笑；我还在继续试。",
    "Notice: what is one specific thing you like about how you are?": "留意：你喜欢自己哪一个很具体的地方？",
    "Some parts of you formed to get through hard conditions. They may deserve respect, care, and a better place to exist.": "你有些部分，是为了撑过艰难环境才长出来的。它们也许值得尊重、照顾，以及一个更好的存在位置。",
    "Notice: what helped you survive, adapt, or keep going?": "留意：是什么帮你撑过来、适应下来，或继续往前？",
    "The things you return to can show what matters to you. Maybe you keep choosing art, fairness, learning, comfort, honesty, beauty, people, or quiet.": "你反复回到的东西，可能会显示什么对你重要。也许你一直在选择艺术、公平、学习、舒适、诚实、美、人，或安静。",
    "Notice: what do you keep choosing, and what do you like about that part of you?": "留意：你一直在选择什么？你喜欢这个部分的什么？",
    "Maybe there is a specific habit, preference, joke, routine, or way of doing things that feels very you. It does not have to make sense to everyone.": "也许有某个习惯、偏好、笑话、日常流程或做事方式，很像你。它不需要让所有人都理解。",
    "Notice: what is one very you thing you actually like?": "留意：有什么很像你、而且你其实喜欢的东西？",
    "When someone matters to you, what do you do? Maybe you bring food, help solve a problem, stay with them, or say the honest thing kindly.": "当一个人对你重要时，你会怎么做？也许你会带吃的、帮忙解决问题、陪着对方，或把真话温柔地说出来。",
    "Notice: what is one specific thing you have done for someone?": "留意：你为某个人做过的一件具体的事是什么？",
    "You can like parts of yourself that are not about achievement: your laugh, softness, dramatic reactions, daydreaming, or tiny joys.": "你也可以喜欢那些和成就无关的部分：你的笑、柔软、夸张反应、白日梦，或很小的快乐。",
    "Notice: what part of you do you like, even if it is not useful or impressive?": "留意：你喜欢自己的哪一部分，即使它不实用，也不厉害？",
    "Collect recent moments when you felt proud of yourself, glad you were you, or quietly impressed by what you did.": "收集最近那些让你为自己骄傲、庆幸自己是自己，或悄悄觉得自己做得不错的时刻。",
    "Write down something from the past that still makes you feel warm, moved, strong, brave, kind, or glad you were you.": "写下一件过去的事：它到现在还让你觉得温暖、被打动、有力量、勇敢、善良，或庆幸你是你。",
    "Maybe it was years ago. What happened? What did you do? What did it take from you? Why does it still feel impressive now?": "也许那是很多年前的事。发生了什么？你做了什么？它当时需要你付出什么？为什么现在想起来仍然觉得不错？",
    "A recent moment, tiny or big...": "最近的一个时刻，小的大的都可以……",
    "What did this show about you?": "这件事显示了你的什么？"
  };

  const reverseTranslations = new Map();
  Object.entries(translations).forEach(([english, chinese]) => reverseTranslations.set(chinese, english));
  Object.entries(supplementalTranslations).forEach(([english, chinese]) => reverseTranslations.set(chinese, english));
  phraseTranslations.forEach(([english, chinese]) => reverseTranslations.set(chinese, english));

  function normalize(text) {
    return text.replace(/\s+/g, " ").trim();
  }

  function englishSource(text) {
    const normalized = normalize(text);
    return reverseTranslations.get(normalized) || normalized || text;
  }

  function translateText(text) {
    const normalized = normalize(text);
    if (!normalized) return text;
    if (translations[normalized]) return text.replace(normalized, translations[normalized]);
    if (supplementalTranslations[normalized]) return text.replace(normalized, supplementalTranslations[normalized]);

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
    const source = englishSource(value);
    if (!node[key] || /[\u3400-\u9fff]/.test(node[key])) node[key] = source;
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
      const original = englishSource(element.getAttribute(key));
      element.setAttribute(key, original);
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
