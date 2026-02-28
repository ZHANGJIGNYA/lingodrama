import type { DramaSeries, DramaMessage } from "./types";

// Episode 1: "The Holiday Attack" - Reddit 真实改编 (B2/C1 高阶)
const episode1Messages: DramaMessage[] = [
  {
    id: "msg-1",
    sender: "Mom",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5Y1_URfPt6Fu409KYoMbKgIMYIWgQ9pbIig&s",
    text: "Alex, it’s a relief you and Sarah are finally getting married in June.",
    vocabs: [],
    isImage: false,
    ui_effect: "fade_in",
  } as any,
  {
    id: "msg-2",
    sender: "Mom",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5Y1_URfPt6Fu409KYoMbKgIMYIWgQ9pbIig&s",
    text: "The church gossip about you two living in sin is unbearable.",
    vocabs: [
      {
        word: "unbearable",
        type: "highlight",
        definition: "too hard to accept",
        level: "B2",
      } as any,
    ],
    isImage: false,
  },
  {
    id: "msg-3",
    sender: "Alex",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop?w=150&h=150&fit=crop",
    text: "Mom, we’ve been over this a hundred times.",
    vocabs: [],
    isImage: false,
  },
  {
    id: "msg-4",
    sender: "Alex",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop?w=150&h=150&fit=crop",
    text: "Stop being so condescending.",
    vocabs: [
      {
        word: "condescending",
        type: "partial_mask",
        definition: "talking down to others",
        level: "C1",
      } as any,
    ],
    isImage: false,
  },
  {
    id: "msg-5",
    sender: "Mom",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5Y1_URfPt6Fu409KYoMbKgIMYIWgQ9pbIig&s",
    text: "I am your mother, and I care about your morality!",
    vocabs: [
      {
        word: "morality",
        type: "highlight",
        definition: "rules for right behavior",
        level: "B2",
      } as any,
    ],
    isImage: false,
    ui_effect: "typing_delay",
  } as any,
  {
    id: "msg-6",
    sender: "Mom",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5Y1_URfPt6Fu409KYoMbKgIMYIWgQ9pbIig&s",
    text: "Look at your oldest brother David.",
    vocabs: [],
    isImage: false,
  },
  {
    id: "msg-7",
    sender: "Mom",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5Y1_URfPt6Fu409KYoMbKgIMYIWgQ9pbIig&s",
    text: "He waited until marriage.",
    vocabs: [],
    isImage: false,
  },
  {
    id: "msg-8",
    sender: "You",
    avatar:
      "https://scontent-kul3-1.xx.fbcdn.net/v/t39.30808-6/518418182_1079697024305855_5480935682166301494_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=13d280&_nc_ohc=cnR9uBfurrcQ7kNvwHS7BJb&_nc_oc=Adkb1-1gmUSge2eSIaDIN9RhdliAnxK9ARqLnUAU-UW5IekQ5z1mANjQr2x4bqNf3y0&_nc_zt=23&_nc_ht=scontent-kul3-1.xx&_nc_gid=jJuYTn4cNL4TOCECy0eIng&_nc_ss=8&oh=00_AfuPANg2oI38CoaIF661D27zgWdKfLzqX34LD_e_q0Agww&oe=69A8863F",
    text: "🍿 Oh boy, here we go again...",
    vocabs: [],
    isImage: false,
  },
  {
    id: "msg-9",
    sender: "Alex",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop?w=150&h=150&fit=crop",
    text: "Sarah was literally crying in the car...",
    vocabs: [],
    isImage: false,
    ui_effect: "screen_shake",
  } as any,
  {
    id: "msg-10",
    sender: "Alex",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop?w=150&h=150&fit=crop",
    text: "all because of your comments at dinner.",
    vocabs: [],
    isImage: false,
  },
  {
    id: "msg-11",
    sender: "Alex",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop?w=150&h=150&fit=crop",
    text: "You really have the audacity to use David to judge me?",
    vocabs: [
      {
        word: "audacity",
        type: "highlight",
        definition: "bold and rude behavior",
        level: "C1",
      } as any,
    ],
    isImage: false,
    ui_effect: "zoom_in",
  } as any,
  {
    id: "msg-12",
    sender: "Alex",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop?w=150&h=150&fit=crop",
    text: "Because Grandma told me a very interesting story...",
    vocabs: [],
    isImage: false,
  },
];

// Episode 2: "The Medical Trap"
const episode2Messages: DramaMessage[] = [
  {
    id: "msg-1",
    sender: "Mom",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5Y1_URfPt6Fu409KYoMbKgIMYIWgQ9pbIig&s",
    text: "What on earth are you talking about?",
    vocabs: [],
    isImage: false,
    ui_effect: "typing_delay",
  } as any,
  {
    id: "msg-2",
    sender: "Mom",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5Y1_URfPt6Fu409KYoMbKgIMYIWgQ9pbIig&s",
    text: "Leave your grandmother out of this.",
    vocabs: [],
    isImage: false,
  },
  {
    id: "msg-3",
    sender: "Alex",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop?w=150&h=150&fit=crop",
    text: "I was reading a medical journal today.",
    vocabs: [],
    isImage: false,
  },
  {
    id: "msg-4",
    sender: "Alex",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop?w=150&h=150&fit=crop",
    text: "Did you know a baby born almost 4 months premature...",
    vocabs: [
      {
        word: "premature",
        type: "highlight",
        definition: "born way too early",
        level: "B2",
      } as any,
    ],
    isImage: false,
  },
  {
    id: "msg-5",
    sender: "Alex",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop?w=150&h=150&fit=crop",
    text: "usually weighs only about 700 grams?",
    vocabs: [],
    isImage: false,
  },
  {
    id: "msg-6",
    sender: "Alex",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop?w=150&h=150&fit=crop",
    text: "It's incredibly fragile.",
    vocabs: [
      {
        word: "fragile",
        type: "highlight",
        definition: "weak and easily broken",
        level: "B2",
      } as any,
    ],
    isImage: false,
  },
  {
    id: "msg-7",
    sender: "Mom",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5Y1_URfPt6Fu409KYoMbKgIMYIWgQ9pbIig&s",
    text: "Stop changing the subject!",
    vocabs: [],
    isImage: false,
    ui_effect: "screen_shake",
  } as any,
  {
    id: "msg-8",
    sender: "Alex",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop?w=150&h=150&fit=crop",
    text: "You always said David was born 4 months early.",
    vocabs: [],
    isImage: false,
  },
  {
    id: "msg-9",
    sender: "Alex",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop?w=150&h=150&fit=crop",
    text: "You bragged about his miraculous survival at church.",
    vocabs: [
      {
        word: "miraculous",
        type: "highlight",
        definition: "amazing and almost impossible",
        level: "B2",
      } as any,
    ],
    isImage: false,
  },
  {
    id: "msg-10",
    sender: "Mom",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5Y1_URfPt6Fu409KYoMbKgIMYIWgQ9pbIig&s",
    text: "Yes! It was a terrifying time. God saved him.",
    vocabs: [],
    isImage: false,
  },
  {
    id: "msg-11",
    sender: "Alex",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop?w=150&h=150&fit=crop",
    text: "Right. A 4-month premature miracle...",
    vocabs: [],
    isImage: false,
    ui_effect: "zoom_in",
  } as any,
  {
    id: "msg-12",
    sender: "Alex",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop?w=150&h=150&fit=crop",
    text: "who somehow weighed over 4 kilos...",
    vocabs: [],
    isImage: false,
  },
  {
    id: "msg-13",
    sender: "Alex",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop?w=150&h=150&fit=crop",
    text: "and was 58 centimeters long at birth.",
    vocabs: [],
    isImage: false,
  },
  {
    id: "msg-14",
    sender: "You",
    avatar:
      "https://scontent-kul3-1.xx.fbcdn.net/v/t39.30808-6/518418182_1079697024305855_5480935682166301494_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=13d280&_nc_ohc=cnR9uBfurrcQ7kNvwHS7BJb&_nc_oc=Adkb1-1gmUSge2eSIaDIN9RhdliAnxK9ARqLnUAU-UW5IekQ5z1mANjQr2x4bqNf3y0&_nc_zt=23&_nc_ht=scontent-kul3-1.xx&_nc_gid=jJuYTn4cNL4TOCECy0eIng&_nc_ss=8&oh=00_AfuPANg2oI38CoaIF661D27zgWdKfLzqX34LD_e_q0Agww&oe=69A8863F",
    text: "Wait a minute... 🧐",
    vocabs: [],
    isImage: false,
    ui_effect: "fade_in",
  } as any,
  {
    id: "msg-15",
    sender: "You",
    avatar:
      "https://scontent-kul3-1.xx.fbcdn.net/v/t39.30808-6/518418182_1079697024305855_5480935682166301494_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=13d280&_nc_ohc=cnR9uBfurrcQ7kNvwHS7BJb&_nc_oc=Adkb1-1gmUSge2eSIaDIN9RhdliAnxK9ARqLnUAU-UW5IekQ5z1mANjQr2x4bqNf3y0&_nc_zt=23&_nc_ht=scontent-kul3-1.xx&_nc_gid=jJuYTn4cNL4TOCECy0eIng&_nc_ss=8&oh=00_AfuPANg2oI38CoaIF661D27zgWdKfLzqX34LD_e_q0Agww&oe=69A8863F",
    text: "A 4-kilo preemie? That's biologically impossible. 🤯",
    vocabs: [
      {
        word: "biologically",
        type: "highlight",
        definition: "by laws of nature",
        level: "B2",
      } as any,
    ],
    isImage: false,
  },
];

// Episode 3: "The Truth Exposed"
const episode3Messages: DramaMessage[] = [
  {
    id: "msg-1",
    sender: "Mom",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5Y1_URfPt6Fu409KYoMbKgIMYIWgQ9pbIig&s",
    text: "...",
    vocabs: [],
    isImage: false,
    ui_effect: "typing_delay",
  } as any,
  {
    id: "msg-2",
    sender: "Mom",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5Y1_URfPt6Fu409KYoMbKgIMYIWgQ9pbIig&s",
    text: "ALEXANDER.",
    vocabs: [],
    isImage: false,
    ui_effect: "screen_shake",
  } as any,
  {
    id: "msg-3",
    sender: "Mom",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5Y1_URfPt6Fu409KYoMbKgIMYIWgQ9pbIig&s",
    text: "This is a private family matter!",
    vocabs: [],
    isImage: false,
  },
  {
    id: "msg-4",
    sender: "Mom",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5Y1_URfPt6Fu409KYoMbKgIMYIWgQ9pbIig&s",
    text: "Stop typing immediately!",
    vocabs: [],
    isImage: false,
  },
  {
    id: "msg-5",
    sender: "Alex",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop?w=150&h=150&fit=crop",
    text: "The math is simple, Mom.",
    vocabs: [],
    isImage: false,
  },
  {
    id: "msg-6",
    sender: "Alex",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop?w=150&h=150&fit=crop",
    text: "You were already in your second trimester when you and Dad got married.",
    vocabs: [
      {
        word: "trimester",
        type: "highlight",
        definition: "three months of pregnancy",
        level: "C1",
      } as any,
    ],
    isImage: false,
    ui_effect: "screen_shake",
  } as any,
  {
    id: "msg-7",
    sender: "Alex",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop?w=150&h=150&fit=crop",
    text: "You got pregnant out of wedlock...",
    vocabs: [
      {
        word: "wedlock",
        type: "highlight",
        definition: "being legally married",
        level: "C1",
      } as any,
    ],
    isImage: false,
  },
  {
    id: "msg-8",
    sender: "Alex",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop?w=150&h=150&fit=crop",
    text: "hid it from the church, and claimed David was premature.",
    vocabs: [],
    isImage: false,
  },
  {
    id: "msg-9",
    sender: "You",
    avatar:
      "https://scontent-kul3-1.xx.fbcdn.net/v/t39.30808-6/518418182_1079697024305855_5480935682166301494_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=13d280&_nc_ohc=cnR9uBfurrcQ7kNvwHS7BJb&_nc_oc=Adkb1-1gmUSge2eSIaDIN9RhdliAnxK9ARqLnUAU-UW5IekQ5z1mANjQr2x4bqNf3y0&_nc_zt=23&_nc_ht=scontent-kul3-1.xx&_nc_gid=jJuYTn4cNL4TOCECy0eIng&_nc_ss=8&oh=00_AfuPANg2oI38CoaIF661D27zgWdKfLzqX34LD_e_q0Agww&oe=69A8863F",
    text: "Wait... so you were already 5 months pregnant ON your wedding day?! 😱",
    vocabs: [],
    isImage: false,
    ui_effect: "zoom_in",
  } as any,
  {
    id: "msg-10",
    sender: "You",
    avatar:
      "https://scontent-kul3-1.xx.fbcdn.net/v/t39.30808-6/518418182_1079697024305855_5480935682166301494_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=13d280&_nc_ohc=cnR9uBfurrcQ7kNvwHS7BJb&_nc_oc=Adkb1-1gmUSge2eSIaDIN9RhdliAnxK9ARqLnUAU-UW5IekQ5z1mANjQr2x4bqNf3y0&_nc_zt=23&_nc_ht=scontent-kul3-1.xx&_nc_gid=jJuYTn4cNL4TOCECy0eIng&_nc_ss=8&oh=00_AfuPANg2oI38CoaIF661D27zgWdKfLzqX34LD_e_q0Agww&oe=69A8863F",
    text: "The tea is SCALDING today! ☕🔥",
    vocabs: [],
    isImage: false,
  },
  {
    id: "msg-11",
    sender: "Mom",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5Y1_URfPt6Fu409KYoMbKgIMYIWgQ9pbIig&s",
    text: "DELETE THIS RIGHT NOW!",
    vocabs: [],
    isImage: false,
    ui_effect: "screen_shake",
  } as any,
  {
    id: "msg-12",
    sender: "Mom",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5Y1_URfPt6Fu409KYoMbKgIMYIWgQ9pbIig&s",
    text: "This information is highly confidential!",
    vocabs: [
      {
        word: "confidential",
        type: "highlight",
        definition: "top secret and private",
        level: "B2",
      } as any,
    ],
    isImage: false,
  },
  {
    id: "msg-13",
    sender: "Mom",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5Y1_URfPt6Fu409KYoMbKgIMYIWgQ9pbIig&s",
    text: "You will ruin our reputation!",
    vocabs: [
      {
        word: "reputation",
        type: "highlight",
        definition: "how others see you",
        level: "B2",
      } as any,
    ],
    isImage: false,
  },
  {
    id: "msg-14",
    sender: "Alex",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop?w=150&h=150&fit=crop",
    text: "Your hypocrisy is absolutely astounding.",
    vocabs: [
      {
        word: "hypocrisy",
        type: "highlight",
        definition: "acting fake and two-faced",
        level: "B2",
      } as any,
      {
        word: "astounding",
        type: "highlight",
        definition: "extremely shocking to believe",
        level: "C1",
      } as any,
    ],
    isImage: false,
  },
  {
    id: "msg-15",
    sender: "Alex",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop?w=150&h=150&fit=crop",
    text: "Here is my ultimatum:",
    vocabs: [
      {
        word: "ultimatum",
        type: "highlight",
        definition: "a strict final warning",
        level: "C1",
      } as any,
    ],
    isImage: false,
  },
  {
    id: "msg-16",
    sender: "Alex",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop?w=150&h=150&fit=crop",
    text: "If you ever mention my living arrangements again...",
    vocabs: [],
    isImage: false,
  },
  {
    id: "msg-17",
    sender: "Alex",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop?w=150&h=150&fit=crop",
    text: "I will personally show David's birth records to your church group.",
    vocabs: [],
    isImage: false,
    ui_effect: "zoom_in",
  } as any,
  {
    id: "msg-18",
    sender: "You",
    avatar:
      "https://scontent-kul3-1.xx.fbcdn.net/v/t39.30808-6/518418182_1079697024305855_5480935682166301494_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=13d280&_nc_ohc=cnR9uBfurrcQ7kNvwHS7BJb&_nc_oc=Adkb1-1gmUSge2eSIaDIN9RhdliAnxK9ARqLnUAU-UW5IekQ5z1mANjQr2x4bqNf3y0&_nc_zt=23&_nc_ht=scontent-kul3-1.xx&_nc_gid=jJuYTn4cNL4TOCECy0eIng&_nc_ss=8&oh=00_AfuPANg2oI38CoaIF661D27zgWdKfLzqX34LD_e_q0Agww&oe=69A8863F",
    text: "I'm just gonna mute this chat... and maybe lock my door. 🤐",
    vocabs: [],
    isImage: false,
    ui_effect: "fade_in",
  } as any,
];

// 其他不需要动的剧本（这里为你保留了 Male 和 Neutral 避免报错，直接占位即可）
const maleEpisode1Messages: DramaMessage[] = [];

export const mockDramaSeries: Record<string, DramaSeries> = {
  // 🔥 我们直接覆盖 female 选项，这样你打开页面默认点的第一个剧本就是最新的 Reddit 瓜！
  female: {
    id: "female",
    title: 'The "Premature" Miracle',
    subtitle: "Family secrets. Hypocrisy. A legendary takedown.",
    totalEpisodes: 3,
    genre: "Family Drama",
    emoji: "🔥",
    gradient: "from-orange-900 via-red-900 to-rose-900",
    episodes: [
      {
        id: 1,
        title: "The Holiday Attack",
        hook: "Mom starts her usual Christmas lecturing, but Alex isn't backing down this time.",
        duration: "10 min",
        unlocked: true,
        masteryRequired: 0,
        vocabIds: [],
        messages: episode1Messages,
      },
      {
        id: 2,
        title: "The Medical Trap",
        hook: "Alex sets a trap using his medical knowledge. Mom walks right into it.",
        duration: "10 min",
        unlocked: false,
        cliffhanger:
          "Wait a minute... A 4-kilo preemie? That's biologically impossible.",
        masteryRequired: 60,
        vocabIds: [],
        messages: episode2Messages,
      },
      {
        id: 3,
        title: "The Truth Exposed",
        hook: "The math exposes the lie. The matriarch falls.",
        duration: "12 min",
        unlocked: false,
        masteryRequired: 80,
        vocabIds: [],
        messages: episode3Messages,
      },
    ],
  },
  male: {
    id: "male",
    title: "The Hidden Heir",
    subtitle: "From delivery boy to billion-dollar CEO",
    totalEpisodes: 3,
    genre: "CEO Revenge",
    emoji: "👑",
    gradient: "from-blue-900 via-indigo-900 to-purple-900",
    episodes: [
      {
        id: 1,
        title: "The Humiliation",
        hook: "...",
        duration: "10 min",
        unlocked: true,
        masteryRequired: 0,
        vocabIds: [],
        messages: maleEpisode1Messages,
      },
      {
        id: 2,
        title: "The Return",
        hook: "...",
        duration: "10 min",
        unlocked: false,
        masteryRequired: 60,
        vocabIds: [],
        messages: maleEpisode1Messages,
      },
      {
        id: 3,
        title: "The Reckoning",
        hook: "...",
        duration: "12 min",
        unlocked: false,
        masteryRequired: 80,
        vocabIds: [],
        messages: maleEpisode1Messages,
      },
    ],
  },
  neutral: {
    id: "neutral",
    title: "The Last Message",
    subtitle: "One text. Seven suspects. One killer.",
    totalEpisodes: 3,
    genre: "Thriller Mystery",
    emoji: "🔪",
    gradient: "from-gray-900 via-slate-800 to-zinc-900",
    episodes: [
      {
        id: 1,
        title: "The Body",
        hook: "...",
        duration: "10 min",
        unlocked: true,
        masteryRequired: 0,
        vocabIds: [],
        messages: maleEpisode1Messages,
      },
      {
        id: 2,
        title: "The Suspects",
        hook: "...",
        duration: "10 min",
        unlocked: false,
        masteryRequired: 60,
        vocabIds: [],
        messages: maleEpisode1Messages,
      },
      {
        id: 3,
        title: "The Truth",
        hook: "...",
        duration: "12 min",
        unlocked: false,
        masteryRequired: 80,
        vocabIds: [],
        messages: maleEpisode1Messages,
      },
    ],
  },
};

// 保持你原有的 Helper 函数不动
export function getDramaSeriesWithVocabs(
  seriesType: "female" | "male" | "neutral",
  vocabIds: string[],
): DramaSeries {
  const series = JSON.parse(
    JSON.stringify(mockDramaSeries[seriesType]),
  ) as DramaSeries;
  const vocabsPerEpisode = Math.ceil(vocabIds.length / series.episodes.length);

  series.episodes.forEach((episode, index) => {
    const startIdx = index * vocabsPerEpisode;
    const endIdx = Math.min(startIdx + vocabsPerEpisode, vocabIds.length);
    episode.vocabIds = vocabIds.slice(startIdx, endIdx);
  });

  return series;
}
