import type { DramaSeries, DramaMessage } from './types'

// Episode 1: "The Discovery" - Romance Drama 完整剧本 (短剧风格)
const episode1Messages: DramaMessage[] = [
  {
    id: 'msg-1',
    sender: 'You',
    avatar: '😱',
    text: "I just caught my husband kissing another woman. At OUR anniversary dinner. In the restaurant I BOOKED.",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-2',
    sender: 'Best Friend',
    avatar: '😨',
    text: "WHAT?! Are you sure it wasn't just—",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-3',
    sender: 'You',
    avatar: '🤳',
    text: "[Photo: Your husband and a young woman in an intimate embrace at a candlelit table]",
    vocabs: [],
    isImage: true,
    imageDesc: "Your husband kissing a younger woman at an elegant restaurant table with roses and champagne"
  },
  {
    id: 'msg-4',
    sender: 'Best Friend',
    avatar: '🤬',
    text: "That *suspicious* bastard! He told you he was working late tonight!",
    vocabs: [{ word: 'suspicious', type: 'highlight' }],
    isImage: false
  },
  {
    id: 'msg-5',
    sender: 'You',
    avatar: '😤',
    text: "It gets worse. I walked up to their table. And she looked at me and SMILED.",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-6',
    sender: 'Best Friend',
    avatar: '😡',
    text: "She SMILED?! The audacity!",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-7',
    sender: 'You',
    avatar: '💢',
    text: "Then she said: 'Oh, you must be the EX-wife. James told me all about you. He said you were... *pathetic*.'",
    vocabs: [{ word: 'pathetic', type: 'highlight' }],
    isImage: false
  },
  {
    id: 'msg-8',
    sender: 'Best Friend',
    avatar: '🔥',
    text: "I'm going to KILL her. What did James say?!",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-9',
    sender: 'You',
    avatar: '😏',
    text: "He panicked. Started making excuses. Said it was 'just a business dinner.'",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-10',
    sender: 'You',
    avatar: '💅',
    text: "So I pulled up the *evidence* on my phone. Six months of hotel receipts. All charged to OUR joint account.",
    vocabs: [{ word: 'evidence', type: 'highlight' }],
    isImage: false
  },
  {
    id: 'msg-11',
    sender: 'Best Friend',
    avatar: '👏',
    text: "YESSS! What happened to his face?!",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-12',
    sender: 'You',
    avatar: '😈',
    text: "White as a ghost. But the mistress? She laughed. Said: 'So what? He's leaving you anyway. You're just a path____ housewife with nothing.'",
    vocabs: [{ word: 'pathetic', type: 'partial_mask' }],
    isImage: false
  },
  {
    id: 'msg-13',
    sender: 'Best Friend',
    avatar: '😤',
    text: "She doesn't know, does she?",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-14',
    sender: 'You',
    avatar: '😌',
    text: "No. She has NO idea that the 'path____' housewife owns 60% of James's company.",
    vocabs: [{ word: 'pathetic', type: 'partial_mask' }],
    isImage: false
  },
  {
    id: 'msg-15',
    sender: 'Best Friend',
    avatar: '🍿',
    text: "OMG. Did you tell her?!",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-16',
    sender: 'You',
    avatar: '👑',
    text: "I showed her the evid___. The shareholder certificate. Her face went from smug to TERRIFIED in 2 seconds.",
    vocabs: [{ word: 'evidence', type: 'partial_mask' }],
    isImage: false
  },
  {
    id: 'msg-17',
    sender: 'You',
    avatar: '🥂',
    text: "Then I said: 'Honey, I'm not the ex-wife. I'm the CEO. And your boyfriend? He works for ME.'",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-18',
    sender: 'Best Friend',
    avatar: '💀',
    text: "I AM SCREAMING!!! What did she do?!",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-19',
    sender: 'You',
    avatar: '😏',
    text: "She tried to apologize. Called me 'ma'am.' But it's too late for that. This [?] of betrayal ends NOW.",
    vocabs: [{ word: 'evidence', type: 'blank_fill' }],
    isImage: false
  },
  {
    id: 'msg-20',
    sender: 'Best Friend',
    avatar: '🔥',
    text: "What's the plan? Please tell me there's a plan.",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-21',
    sender: 'You',
    avatar: '😈',
    text: "Oh, there's a plan. Tomorrow morning, James will find out he's been 'promoted' to our branch office... in Alaska.",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-22',
    sender: 'You',
    avatar: '🖤',
    text: "But first... I need to find out who she REALLY is. Something about her seems sus_____. I've seen her face before.",
    vocabs: [{ word: 'suspicious', type: 'partial_mask' }],
    isImage: false
  },
  {
    id: 'msg-23',
    sender: 'Best Friend',
    avatar: '👀',
    text: "Wait... you think she's not just some random woman?",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-24',
    sender: 'You',
    avatar: '🔍',
    text: "I just ran her face through our company database. And... oh my god.",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-25',
    sender: 'Best Friend',
    avatar: '😰',
    text: "WHAT?! WHO IS SHE?!",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-26',
    sender: 'You',
    avatar: '💔',
    text: "She's not just his mistress. She's my father's secret daughter. My... half-sister. And she's here for [?].",
    vocabs: [{ word: 'revenge', type: 'blank_fill' }],
    isImage: false
  }
]

// Episode 2: "The Half-Sister" - 身份揭露后的对峙
const episode2Messages: DramaMessage[] = [
  {
    id: 'msg-1',
    sender: 'You',
    avatar: '😰',
    text: "I confronted my father last night. Asked him about his 'other daughter.'",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-2',
    sender: 'Best Friend',
    avatar: '😨',
    text: "What did he say?!",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-3',
    sender: 'You',
    avatar: '💔',
    text: "He *confessed* everything. 25 years ago, he had an affair. Her mother was his secretary.",
    vocabs: [{ word: 'confessed', type: 'highlight' }],
    isImage: false
  },
  {
    id: 'msg-4',
    sender: 'Best Friend',
    avatar: '😤',
    text: "So she's been planning this *revenge* her whole life?",
    vocabs: [{ word: 'revenge', type: 'highlight' }],
    isImage: false
  },
  {
    id: 'msg-5',
    sender: 'You',
    avatar: '😢',
    text: "Worse. Her mother died poor while we lived in luxury. She blames our family for everything.",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-6',
    sender: 'You',
    avatar: '📱',
    text: "She just texted me. Look at this.",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-7',
    sender: 'Half-Sister',
    avatar: '🐍',
    text: "Hello, SISTER. Surprised? Your husband was just the beginning. I'm going to take EVERYTHING from you.",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-8',
    sender: 'Half-Sister',
    avatar: '😈',
    text: "Your company. Your reputation. Your family. Consider it rev_____ for what your father did to mine.",
    vocabs: [{ word: 'revenge', type: 'partial_mask' }],
    isImage: false
  },
  {
    id: 'msg-9',
    sender: 'Best Friend',
    avatar: '🔥',
    text: "The AUDACITY! What are you going to do?",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-10',
    sender: 'You',
    avatar: '😏',
    text: "I conf_____ something to my lawyer this morning. I'm not as helpless as she thinks.",
    vocabs: [{ word: 'confessed', type: 'partial_mask' }],
    isImage: false
  },
  {
    id: 'msg-11',
    sender: 'You',
    avatar: '💼',
    text: "She doesn't know that I have evidence of HER crimes. She's been *embezzling* from three companies.",
    vocabs: [{ word: 'embezzling', type: 'highlight' }],
    isImage: false
  },
  {
    id: 'msg-12',
    sender: 'Best Friend',
    avatar: '👀',
    text: "How did you find out?!",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-13',
    sender: 'You',
    avatar: '🔍',
    text: "I hired a PI. She's been embe_____ money to fund her 'revenge plan.' Millions of dollars.",
    vocabs: [{ word: 'embezzling', type: 'partial_mask' }],
    isImage: false
  },
  {
    id: 'msg-14',
    sender: 'You',
    avatar: '😌',
    text: "So I invited her to lunch tomorrow. At the same restaurant where she humiliated me.",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-15',
    sender: 'Best Friend',
    avatar: '🍿',
    text: "You're going to expose her?!",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-16',
    sender: 'You',
    avatar: '👑',
    text: "Better. I [?] my plan to the board this morning. They're all coming to 'witness' our sisterly reunion.",
    vocabs: [{ word: 'confessed', type: 'blank_fill' }],
    isImage: false
  },
  {
    id: 'msg-17',
    sender: 'You',
    avatar: '😈',
    text: "She wanted [?]. She's about to get it. Just not the way she expected.",
    vocabs: [{ word: 'revenge', type: 'blank_fill' }],
    isImage: false
  },
  {
    id: 'msg-18',
    sender: 'Best Friend',
    avatar: '💀',
    text: "I need to be there. This is going to be LEGENDARY.",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-19',
    sender: 'You',
    avatar: '🖤',
    text: "Oh, you will be. But there's one more thing...",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-20',
    sender: 'You',
    avatar: '😰',
    text: "I found out she's not working alone. Someone on our board has been helping her [?] money.",
    vocabs: [{ word: 'embezzling', type: 'blank_fill' }],
    isImage: false
  },
  {
    id: 'msg-21',
    sender: 'Best Friend',
    avatar: '😱',
    text: "WHO?!",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-22',
    sender: 'You',
    avatar: '💔',
    text: "Someone I trusted completely. Someone who's been like a father to me since dad got sick...",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-23',
    sender: 'You',
    avatar: '😢',
    text: "It's Uncle Richard. And tomorrow, I'm taking them BOTH down.",
    vocabs: [],
    isImage: false
  }
]

// Episode 3: "The Takedown" - 最终复仇
const episode3Messages: DramaMessage[] = [
  {
    id: 'msg-1',
    sender: 'You',
    avatar: '👗',
    text: "I'm at the restaurant. Wearing the red dress she mocked me for last time. Let's see who's laughing now.",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-2',
    sender: 'Best Friend',
    avatar: '👀',
    text: "Is she there yet?",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-3',
    sender: 'You',
    avatar: '😏',
    text: "Just walked in. With Uncle Richard. They look so *confident*. They have no idea.",
    vocabs: [{ word: 'confident', type: 'highlight' }],
    isImage: false
  },
  {
    id: 'msg-4',
    sender: 'Half-Sister',
    avatar: '🐍',
    text: "Sister! So glad you could make it. Ready to discuss the *transfer* of your shares?",
    vocabs: [{ word: 'transfer', type: 'highlight' }],
    isImage: false
  },
  {
    id: 'msg-5',
    sender: 'You',
    avatar: '😌',
    text: "Actually, I have a different proposal. Why don't you check your bank account first?",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-6',
    sender: 'Half-Sister',
    avatar: '😨',
    text: "What... what did you do?! My accounts are FROZEN?!",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-7',
    sender: 'You',
    avatar: '💅',
    text: "Surprise. The FBI has been *investigating* your little embezzlement scheme for weeks. I gave them everything.",
    vocabs: [{ word: 'investigating', type: 'highlight' }],
    isImage: false
  },
  {
    id: 'msg-8',
    sender: 'Uncle Richard',
    avatar: '😰',
    text: "Now wait, let's not be hasty. We can work something out—",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-9',
    sender: 'You',
    avatar: '🔥',
    text: "Work something out? Like how you've been trans_____ company funds to her offshore accounts for THREE YEARS?",
    vocabs: [{ word: 'transfer', type: 'partial_mask' }],
    isImage: false
  },
  {
    id: 'msg-10',
    sender: 'Best Friend',
    avatar: '🍿',
    text: "OMG the board members just walked in! Their faces!!!",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-11',
    sender: 'You',
    avatar: '👑',
    text: "I invited them to watch. They've been inves_____ you both since I showed them the evidence last week.",
    vocabs: [{ word: 'investigating', type: 'partial_mask' }],
    isImage: false
  },
  {
    id: 'msg-12',
    sender: 'Half-Sister',
    avatar: '😡',
    text: "You think you've won?! I still have the photos! Your husband, the affairs, everything! I'll DESTROY your reputation!",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-13',
    sender: 'You',
    avatar: '😏',
    text: "Oh, you mean these photos?",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-14',
    sender: 'You',
    avatar: '📱',
    text: "[Screenshot: Divorce papers signed by James, giving up all claims to the company]",
    vocabs: [],
    isImage: true,
    imageDesc: "Official divorce documents with James's signature, dated yesterday"
  },
  {
    id: 'msg-15',
    sender: 'You',
    avatar: '💅',
    text: "James conf_____ everything to save himself. He's testifying against BOTH of you. The [?] is complete.",
    vocabs: [{ word: 'confident', type: 'partial_mask' }, { word: 'transfer', type: 'blank_fill' }],
    isImage: false
  },
  {
    id: 'msg-16',
    sender: 'Half-Sister',
    avatar: '😱',
    text: "No... no, this can't be happening...",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-17',
    sender: 'You',
    avatar: '😈',
    text: "You wanted revenge for your mother? Here's mine: You're going to prison. And I'm [?] all YOUR assets to charity.",
    vocabs: [{ word: 'transfer', type: 'blank_fill' }],
    isImage: false
  },
  {
    id: 'msg-18',
    sender: 'Best Friend',
    avatar: '💀',
    text: "THE POLICE JUST WALKED IN!!! She's literally shaking!!!",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-19',
    sender: 'You',
    avatar: '👑',
    text: "One last thing, 'sister.' You were so [?] you'd win. But you forgot one thing...",
    vocabs: [{ word: 'confident', type: 'blank_fill' }],
    isImage: false
  },
  {
    id: 'msg-20',
    sender: 'You',
    avatar: '🖤',
    text: "I'm not the pathetic housewife you thought I was. I'm the woman who just ended your entire life with a smile.",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-21',
    sender: 'You',
    avatar: '🥂',
    text: "Waiter? Champagne for the table. We're celebrating.",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-22',
    sender: 'Best Friend',
    avatar: '🔥',
    text: "QUEEN BEHAVIOR. I am literally crying. This is the best day of my life.",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-23',
    sender: 'You',
    avatar: '😌',
    text: "The [?] is over. But you know what? I think I'm going to enjoy being single.",
    vocabs: [{ word: 'investigating', type: 'blank_fill' }],
    isImage: false
  },
  {
    id: 'msg-24',
    sender: 'Unknown Number',
    avatar: '❓',
    text: "Impressive performance today. We should talk. I have information about your father's REAL secret. - M",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-25',
    sender: 'You',
    avatar: '😨',
    text: "Wait... who is this? What secret?!",
    vocabs: [],
    isImage: false
  }
]

// ============ MALE SERIES: THE HIDDEN HEIR (霸总逆袭) ============

// Male Episode 1: "The Humiliation" - 被羞辱的开场
const maleEpisode1Messages: DramaMessage[] = [
  {
    id: 'msg-1',
    sender: 'You',
    avatar: '😔',
    text: "I just got thrown out of my own grandfather's funeral. By security. In front of 300 people.",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-2',
    sender: 'Best Bro',
    avatar: '😡',
    text: "WHAT?! He was YOUR grandfather! How is that even possible?!",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-3',
    sender: 'You',
    avatar: '💔',
    text: "My uncle told everyone I was an *imposter*. That my mother was just a maid who tricked grandpa.",
    vocabs: [{ word: 'imposter', type: 'highlight' }],
    isImage: false
  },
  {
    id: 'msg-4',
    sender: 'You',
    avatar: '😤',
    text: "His daughter - my cousin Victoria - laughed in my face. Said I should go back to delivering food.",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-5',
    sender: 'Best Bro',
    avatar: '🔥',
    text: "That's *despicable*! You worked as a delivery driver to pay for your mom's surgery!",
    vocabs: [{ word: 'despicable', type: 'highlight' }],
    isImage: false
  },
  {
    id: 'msg-6',
    sender: 'You',
    avatar: '😢',
    text: "Victoria poured champagne on my uniform. Said 'This is the closest you'll ever get to luxury.'",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-7',
    sender: 'Best Bro',
    avatar: '😤',
    text: "I'm going to—",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-8',
    sender: 'You',
    avatar: '📱',
    text: "Wait. I just got a call from grandpa's lawyer. He wants to meet me. Privately.",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-9',
    sender: 'Best Bro',
    avatar: '👀',
    text: "What does he want?",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-10',
    sender: 'You',
    avatar: '😳',
    text: "He just showed me grandpa's REAL will. The one nobody knows about. I'm... I'm the sole *heir*.",
    vocabs: [{ word: 'heir', type: 'highlight' }],
    isImage: false
  },
  {
    id: 'msg-11',
    sender: 'Best Bro',
    avatar: '😱',
    text: "SOLE HEIR?! As in... EVERYTHING?!",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-12',
    sender: 'You',
    avatar: '😏',
    text: "The company. The mansions. The offshore accounts. $47 BILLION. They called me an imp_____. They have no idea.",
    vocabs: [{ word: 'imposter', type: 'partial_mask' }],
    isImage: false
  },
  {
    id: 'msg-13',
    sender: 'Best Bro',
    avatar: '🤯',
    text: "Bro... you're a BILLIONAIRE now?!",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-14',
    sender: 'You',
    avatar: '😈',
    text: "Grandpa knew they were desp_____. He pretended to favor them, but he was testing them. They failed.",
    vocabs: [{ word: 'despicable', type: 'partial_mask' }],
    isImage: false
  },
  {
    id: 'msg-15',
    sender: 'You',
    avatar: '📄',
    text: "[Photo: Legal document showing you as 100% heir to Chen Industries]",
    vocabs: [],
    isImage: true,
    imageDesc: "Official inheritance document with grandfather's signature and legal stamps"
  },
  {
    id: 'msg-16',
    sender: 'Best Bro',
    avatar: '🔥',
    text: "When are you going to tell them?!",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-17',
    sender: 'You',
    avatar: '😌',
    text: "Not yet. The lawyer said the will becomes public at the board meeting tomorrow. They'll announce the new [?].",
    vocabs: [{ word: 'heir', type: 'blank_fill' }],
    isImage: false
  },
  {
    id: 'msg-18',
    sender: 'You',
    avatar: '👔',
    text: "I'm going to walk in wearing my delivery uniform. Let them laugh one more time.",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-19',
    sender: 'Best Bro',
    avatar: '💀',
    text: "You're going to destroy them. I need to be there.",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-20',
    sender: 'You',
    avatar: '🖤',
    text: "They called me an [?]. Tomorrow, they'll call me SIR.",
    vocabs: [{ word: 'imposter', type: 'blank_fill' }],
    isImage: false
  },
  {
    id: 'msg-21',
    sender: 'You',
    avatar: '😈',
    text: "And Victoria? The one who poured champagne on me? She's about to find out her [?] behavior has consequences.",
    vocabs: [{ word: 'despicable', type: 'blank_fill' }],
    isImage: false
  },
  {
    id: 'msg-22',
    sender: 'Best Bro',
    avatar: '🍿',
    text: "I'm bringing popcorn. This is going to be LEGENDARY.",
    vocabs: [],
    isImage: false
  }
]

// Male Episode 2: "The Return" - 霸气回归
const maleEpisode2Messages: DramaMessage[] = [
  {
    id: 'msg-1',
    sender: 'You',
    avatar: '👔',
    text: "I'm outside the boardroom. Still in my delivery uniform. Security tried to stop me AGAIN.",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-2',
    sender: 'Best Bro',
    avatar: '😤',
    text: "What did you do?",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-3',
    sender: 'You',
    avatar: '😏',
    text: "I showed them my *authorization* letter from the lawyer. Their faces went WHITE.",
    vocabs: [{ word: 'authorization', type: 'highlight' }],
    isImage: false
  },
  {
    id: 'msg-4',
    sender: 'You',
    avatar: '🚪',
    text: "Walking in now. Victoria just saw me. She's laughing. 'Security! Get this *peasant* out!'",
    vocabs: [{ word: 'peasant', type: 'highlight' }],
    isImage: false
  },
  {
    id: 'msg-5',
    sender: 'Best Bro',
    avatar: '🔥',
    text: "Oh she's going to regret that SO much.",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-6',
    sender: 'You',
    avatar: '😌',
    text: "Uncle just stood up. 'How dare you show your face here! You have no *authority* in this company!'",
    vocabs: [{ word: 'authority', type: 'highlight' }],
    isImage: false
  },
  {
    id: 'msg-7',
    sender: 'You',
    avatar: '📢',
    text: "The lawyer just cleared his throat. 'Actually, Mr. Chen... he has ALL the authority. Please read the will.'",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-8',
    sender: 'Best Bro',
    avatar: '👀',
    text: "WHAT'S HAPPENING?!",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-9',
    sender: 'You',
    avatar: '😈',
    text: "Dead silence. Uncle is reading the will. His hands are shaking. Victoria just dropped her phone.",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-10',
    sender: 'You',
    avatar: '👑',
    text: "Uncle: 'This... this is impossible! This pea_____ can't inherit everything!'",
    vocabs: [{ word: 'peasant', type: 'partial_mask' }],
    isImage: false
  },
  {
    id: 'msg-11',
    sender: 'You',
    avatar: '💼',
    text: "Lawyer: 'The auth_____ is clear. As of today, he owns 100% of Chen Industries. You work for HIM now.'",
    vocabs: [{ word: 'authorization', type: 'partial_mask' }],
    isImage: false
  },
  {
    id: 'msg-12',
    sender: 'Best Bro',
    avatar: '💀',
    text: "I AM SCREAMING!!! What did Victoria do?!",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-13',
    sender: 'You',
    avatar: '😏',
    text: "She ran up to me. 'Cousin! I was just joking yesterday! You know I've always supported you!'",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-14',
    sender: 'You',
    avatar: '📱',
    text: "[Video playing on the boardroom screen: Victoria pouring champagne on you, calling you trash]",
    vocabs: [],
    isImage: true,
    imageDesc: "Security footage showing Victoria humiliating you at the funeral"
  },
  {
    id: 'msg-15',
    sender: 'You',
    avatar: '🖤',
    text: "I played the security footage for everyone. 'This is how you treat family, Victoria?'",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-16',
    sender: 'You',
    avatar: '😌',
    text: "She fell to her knees. Actually BEGGING. 'Please! I'll do anything! Don't fire me!'",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-17',
    sender: 'Best Bro',
    avatar: '🔥',
    text: "KARMA IS BEAUTIFUL. What did you say?!",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-18',
    sender: 'You',
    avatar: '👔',
    text: "I said: 'Fire you? No. You're going to work in the mailroom. Minimum wage. For the next 5 years.'",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-19',
    sender: 'You',
    avatar: '😈',
    text: "Then I looked at Uncle. 'And you? Your [?] to make decisions? Revoked. Effective immediately.'",
    vocabs: [{ word: 'authority', type: 'blank_fill' }],
    isImage: false
  },
  {
    id: 'msg-20',
    sender: 'Best Bro',
    avatar: '👏',
    text: "THE KING HAS RETURNED!!! What happens now?!",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-21',
    sender: 'You',
    avatar: '🤔',
    text: "Something's wrong. The lawyer just handed me another envelope. Marked 'PRIVATE - READ ALONE.'",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-22',
    sender: 'You',
    avatar: '😨',
    text: "It's from grandpa. He says... there's a reason he chose me. And it's not just about the money.",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-23',
    sender: 'You',
    avatar: '😰',
    text: "He says Uncle isn't really his son. And there's someone who wants me dead. Someone with [?] I don't know about.",
    vocabs: [{ word: 'authorization', type: 'blank_fill' }],
    isImage: false
  },
  {
    id: 'msg-24',
    sender: 'Best Bro',
    avatar: '😱',
    text: "Wait WHAT?! Who wants you dead?!",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-25',
    sender: 'You',
    avatar: '🖤',
    text: "I don't know yet. But grandpa left one more message: 'Trust no one. Not even the [?] you think you know.'",
    vocabs: [{ word: 'peasant', type: 'blank_fill' }],
    isImage: false
  }
]

// Mock Drama Series Data
export const mockDramaSeries: Record<string, DramaSeries> = {
  female: {
    id: 'female',
    title: 'The Perfect Marriage',
    subtitle: 'Betrayal. Revenge. A queen rises.',
    totalEpisodes: 3,
    genre: 'Romance Drama',
    emoji: '💔',
    gradient: 'from-rose-900 via-pink-900 to-red-900',
    episodes: [
      {
        id: 1,
        title: 'The Discovery',
        hook: 'I caught my husband kissing HER at OUR anniversary dinner. Then she called me pathetic.',
        duration: '10 min',
        unlocked: true,
        masteryRequired: 0,
        vocabIds: [], // Will be filled dynamically
        messages: episode1Messages
      },
      {
        id: 2,
        title: 'The Half-Sister',
        hook: "She's not just his mistress. She's my father's secret daughter. And she wants EVERYTHING.",
        duration: '10 min',
        unlocked: false,
        cliffhanger: 'Uncle Richard has been helping her all along...',
        masteryRequired: 60,
        vocabIds: [],
        messages: episode2Messages
      },
      {
        id: 3,
        title: 'The Takedown',
        hook: "She wanted revenge? I'll show her what revenge really looks like.",
        duration: '12 min',
        unlocked: false,
        masteryRequired: 80,
        vocabIds: [],
        messages: episode3Messages
      }
    ]
  },
  male: {
    id: 'male',
    title: 'The Hidden Heir',
    subtitle: 'From delivery boy to billion-dollar CEO',
    totalEpisodes: 3,
    genre: 'CEO Revenge',
    emoji: '👑',
    gradient: 'from-blue-900 via-indigo-900 to-purple-900',
    episodes: [
      {
        id: 1,
        title: 'The Humiliation',
        hook: 'They threw me out of my own grandfather\'s funeral. They don\'t know I inherited EVERYTHING.',
        duration: '10 min',
        unlocked: true,
        masteryRequired: 0,
        vocabIds: [],
        messages: maleEpisode1Messages
      },
      {
        id: 2,
        title: 'The Return',
        hook: 'I walked into their company as the new owner. Their faces were PRICELESS.',
        duration: '10 min',
        unlocked: false,
        masteryRequired: 60,
        vocabIds: [],
        messages: maleEpisode2Messages
      },
      {
        id: 3,
        title: 'The Reckoning',
        hook: 'They begged on their knees. But mercy isn\'t in my vocabulary anymore.',
        duration: '12 min',
        unlocked: false,
        masteryRequired: 80,
        vocabIds: [],
        messages: maleEpisode3Messages
      }
    ]
  },
  neutral: {
    id: 'neutral',
    title: 'The Last Message',
    subtitle: 'One text. Seven suspects. One killer.',
    totalEpisodes: 3,
    genre: 'Thriller Mystery',
    emoji: '🔪',
    gradient: 'from-gray-900 via-slate-800 to-zinc-900',
    episodes: [
      {
        id: 1,
        title: 'The Body',
        hook: 'My best friend is dead. Her last text to me: "Don\'t trust anyone at the party."',
        duration: '10 min',
        unlocked: true,
        masteryRequired: 0,
        vocabIds: [],
        messages: neutralEpisode1Messages
      },
      {
        id: 2,
        title: 'The Suspects',
        hook: 'Everyone at that party had a reason to kill her. Including me.',
        duration: '10 min',
        unlocked: false,
        masteryRequired: 60,
        vocabIds: [],
        messages: neutralEpisode2Messages
      },
      {
        id: 3,
        title: 'The Truth',
        hook: 'The killer was in front of me the whole time. I just didn\'t want to see it.',
        duration: '12 min',
        unlocked: false,
        masteryRequired: 80,
        vocabIds: [],
        messages: neutralEpisode3Messages
      }
    ]
  }
}

// Helper function to get a series with updated vocab IDs
export function getDramaSeriesWithVocabs(
  seriesType: 'female' | 'male' | 'neutral',
  vocabIds: string[]
): DramaSeries {
  const series = JSON.parse(JSON.stringify(mockDramaSeries[seriesType])) as DramaSeries

  // Distribute vocabs across episodes
  const vocabsPerEpisode = Math.ceil(vocabIds.length / series.episodes.length)

  series.episodes.forEach((episode, index) => {
    const startIdx = index * vocabsPerEpisode
    const endIdx = Math.min(startIdx + vocabsPerEpisode, vocabIds.length)
    episode.vocabIds = vocabIds.slice(startIdx, endIdx)
  })

  return series
}
