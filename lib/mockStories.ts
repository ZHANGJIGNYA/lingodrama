import type { ChatScript, StoryQuiz } from './types'

// ============================================
// 💘 恋爱/霸总题材 Mock 数据
// ============================================

export const romanceReviewScript: ChatScript = {
  id: 'romance-1',
  user_id: 'mock',
  vocabulary_ids: ['compatible', 'intense', 'vulnerable'],
  genre: 'romance',
  messages: [
    {
      id: '1',
      speaker: 'Narration',
      is_user: false,
      content: 'Company annual party. Everyone is watching. CEO Vincent walks straight toward you...',
      emotion: 'serious',
    },
    {
      id: '2',
      speaker: 'Vincent',
      is_user: false,
      content: 'Come with me. Now.',
      emotion: 'serious',
    },
    {
      id: '3',
      speaker: 'Colleague whispers',
      is_user: false,
      content: '(Are you getting fired?!)',
      emotion: 'nervous',
    },
    {
      id: '4',
      speaker: 'Narration',
      is_user: false,
      content: 'He takes you to the rooftop. The city lights are stunning. His eyes are intense...',
      emotion: 'serious',
      highlighted_words: [
        {
          word: 'intense',
          vocabulary_id: 'intense-1',
          style: 'glow',
          definition_simple_english: 'very strong or extreme',
          definition_native: '强烈的；紧张的',
        },
      ],
    },
    {
      id: '5',
      speaker: 'Vincent',
      is_user: false,
      content: 'Do you think we are... compatible?',
      emotion: 'serious',
      highlighted_words: [
        {
          word: 'compatible',
          vocabulary_id: 'compat-1',
          style: 'glow',
          definition_simple_english: 'able to exist together harmoniously',
          definition_native: '合得来的；兼容的',
        },
      ],
    },
    {
      id: '6',
      speaker: 'Your thoughts',
      is_user: false,
      content: '(WAIT WHAT?! Is this... a confession?!)',
      emotion: 'excited',
    },
    {
      id: '7',
      speaker: 'You',
      is_user: true,
      content: 'I... yes, I think we are compatible.',
      emotion: 'nervous',
      highlighted_words: [
        {
          word: 'compatible',
          vocabulary_id: 'compat-1',
          style: 'shake',
          definition_simple_english: 'able to exist together harmoniously',
          definition_native: '合得来的；兼容的',
        },
      ],
    },
    {
      id: '8',
      speaker: 'Vincent',
      is_user: false,
      content: 'Good. Because I just told the board you are my new partner. The announcement is in 5 minutes.',
      emotion: 'neutral',
    },
    {
      id: '9',
      speaker: 'Narration',
      is_user: false,
      content: '...Business partner or... life partner?! 💍',
      emotion: 'excited',
    },
  ],
  background_image_url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200',
  created_at: new Date().toISOString(),
}

export const romanceQuizStory: StoryQuiz = {
  id: 'romance-quiz-1',
  vocabulary_ids: ['compatible', 'comparable'],
  genre: 'romance',
  theme: '与顾总的第一次约会',
  messages: [
    {
      id: '1',
      type: 'narration',
      content: '你正在和暗恋已久的顾总聊天，他的每一条回复都让你心跳加速...',
    },
    {
      id: '2',
      type: 'dialogue',
      speaker: '顾魏',
      content: '今晚的裙子很适合你。',
      is_user: false,
    },
    {
      id: '3',
      type: 'dialogue',
      speaker: '顾魏',
      content: '不过...我有句话一直想问你。',
      is_user: false,
    },
    {
      id: '4',
      type: 'narration',
      content: '（心跳音效：扑通...扑通...）',
    },
    {
      id: '5',
      type: 'dialogue',
      speaker: '顾魏',
      content: '你觉得我们之间是什么关系？',
      is_user: false,
    },
    {
      id: '6',
      type: 'choice',
      content: '请选择你的回复：',
      question: {
        vocabulary_id: 'compatible',
        prompt: '你该怎么回答才不会聊死天？',
        options: [
          {
            id: 'A',
            text: 'We are COMPATIBLE (兼容的/合得来的)',
            word: 'compatible',
            is_correct: true,
          },
          {
            id: 'B',
            text: 'We are COMPARABLE (类似的/可比较的)',
            word: 'comparable',
            is_correct: false,
          },
        ],
        correct_answer: 'compatible',
      },
    },
    {
      id: '7-correct',
      type: 'feedback',
      content: '✓ Perfect! Thanks! ❤️',
      speaker: '顾魏',
      is_correct: true,
      is_user: false,
    },
    {
      id: '7-wrong',
      type: 'feedback',
      content: '✗ "类似的？你是说我们是竞争对手？算了，早点睡吧。"',
      speaker: '顾魏',
      is_correct: false,
      correct_answer: 'compatible = 合得来的',
      is_user: false,
    },
  ],
  background_image_url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200',
}

// ============================================
// 💼 职场/喜剧题材 Mock 数据
// ============================================

export const workplaceReviewScript: ChatScript = {
  id: 'workplace-1',
  user_id: 'mock',
  vocabulary_ids: ['status', 'statues', 'catastrophe'],
  genre: 'workplace',
  messages: [
    {
      id: '1',
      speaker: 'Narration',
      is_user: false,
      content: '11:58 PM. You finally finish the quarterly report...',
      emotion: 'neutral',
    },
    {
      id: '2',
      speaker: 'You',
      is_user: true,
      content: '*yawning* "Please check the attached statues..." SEND ✓',
      emotion: 'neutral',
      highlighted_words: [
        {
          word: 'statues',
          vocabulary_id: 'statues-1',
          style: 'redline',
          definition_simple_english: 'stone or metal sculptures (plural)',
          definition_native: '雕像（复数）',
        },
      ],
    },
    {
      id: '3',
      speaker: 'System',
      is_user: false,
      content: '📧 Sent to: CEO, All Directors, Board Members (47 people)',
      emotion: 'neutral',
    },
    {
      id: '4',
      speaker: 'Narration',
      is_user: false,
      content: '3 seconds later, you wake up...',
      emotion: 'serious',
    },
    {
      id: '5',
      speaker: 'You',
      is_user: true,
      content: '(re-reading) WAIT. I wrote "statues"?! Not "status"?! 😱',
      emotion: 'nervous',
      highlighted_words: [
        {
          word: 'statues',
          vocabulary_id: 'statues-1',
          style: 'redline',
          definition_simple_english: 'stone or metal sculptures',
          definition_native: '雕像（复数）',
        },
        {
          word: 'status',
          vocabulary_id: 'status-1',
          style: 'glow',
          definition_simple_english: 'the current condition or state',
          definition_native: '状态；情况',
        },
      ],
    },
    {
      id: '6',
      speaker: 'CEO (Email)',
      is_user: false,
      content: '??? Attached statues? Are we running an art museum now?',
      emotion: 'serious',
    },
    {
      id: '7',
      speaker: 'Director of HR',
      is_user: false,
      content: '*Laughing emoji* Best typo of 2024!',
      emotion: 'neutral',
    },
    {
      id: '8',
      speaker: 'Narration',
      is_user: false,
      content: 'The company chat explodes with 99+ messages... This is a catastrophe.',
      emotion: 'nervous',
      highlighted_words: [
        {
          word: 'catastrophe',
          vocabulary_id: 'catastrophe-1',
          style: 'redline',
          definition_simple_english: 'a sudden disaster or terrible event',
          definition_native: '灾难；大祸',
        },
      ],
    },
    {
      id: '9',
      speaker: 'You',
      is_user: true,
      content: '(typing) "Sorry everyone, I meant STATUS. Autocorrect betrayed me..."',
      emotion: 'nervous',
    },
    {
      id: '10',
      speaker: 'CEO',
      is_user: false,
      content: 'Relax. At least now I know you are human. See you tomorrow. 😄',
      emotion: 'neutral',
    },
  ],
  background_image_url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200',
  created_at: new Date().toISOString(),
}

export const workplaceQuizStory: StoryQuiz = {
  id: 'workplace-quiz-1',
  vocabulary_ids: ['status', 'statues'],
  genre: 'workplace',
  theme: '发错邮件的灾难现场',
  messages: [
    {
      id: '1',
      type: 'narration',
      content: '你正在给全公司发送季度报告，但你很困，手滑了...',
    },
    {
      id: '2',
      type: 'dialogue',
      speaker: '系统',
      content: '✅ 邮件已发送给：全公司 (All Staff)',
      is_user: false,
    },
    {
      id: '3',
      type: 'narration',
      content: '等等！你刚才写的是什么？！',
    },
    {
      id: '4',
      type: 'choice',
      content: '你原本想写"请查收附件状态"，但你不小心打成了...',
      question: {
        vocabulary_id: 'status',
        prompt: '你刚才发出去的词是？',
        options: [
          {
            id: 'A',
            text: 'STATUS (状态)',
            word: 'status',
            is_correct: true,
          },
          {
            id: 'B',
            text: 'STATUES (雕像)',
            word: 'statues',
            is_correct: false,
          },
        ],
        correct_answer: 'status',
      },
    },
    {
      id: '5-correct',
      type: 'feedback',
      content: '虽然有点怪，但至少不是社死。成功撤回！',
      is_correct: true,
    },
    {
      id: '5-wrong',
      type: 'feedback',
      content: 'CEO回复：??? 你在骂我们是木头人吗？\n结局：被 HR 叫去喝茶',
      is_correct: false,
      correct_answer: 'status = 状态',
    },
  ],
  background_image_url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200',
}

// ============================================
// 🌿 生活/治愈题材 Mock 数据
// ============================================

export const sliceOfLifeReviewScript: ChatScript = {
  id: 'life-1',
  user_id: 'mock',
  vocabulary_ids: ['magnificent', 'abrupt', 'serendipity'],
  genre: 'slice_of_life',
  messages: [
    {
      id: '1',
      speaker: 'Narration',
      is_user: false,
      content: 'Paris, 6:47 PM. The Eiffel Tower glows in golden hour light...',
      emotion: 'neutral',
    },
    {
      id: '2',
      speaker: 'You',
      is_user: true,
      content: '(raising phone) Perfect! "The sunset is absolutely magnificent..." POST ✓',
      emotion: 'excited',
      highlighted_words: [
        {
          word: 'magnificent',
          vocabulary_id: 'mag-1',
          style: 'glow',
          definition_simple_english: 'extremely beautiful or impressive',
          definition_native: '壮丽的；华丽的',
        },
      ],
    },
    {
      id: '3',
      speaker: 'System',
      is_user: false,
      content: '📱 Post uploading... 23%... 67%...',
      emotion: 'neutral',
    },
    {
      id: '4',
      speaker: 'Stranger',
      is_user: false,
      content: '*bumps into you* Oh pardon! So sorry!',
      emotion: 'nervous',
    },
    {
      id: '5',
      speaker: 'Narration',
      is_user: false,
      content: 'Your phone flies... lands in a puddle... SPLASH. 📱💀',
      emotion: 'serious',
    },
    {
      id: '6',
      speaker: 'You',
      is_user: true,
      content: 'NO! My photo! My phone!',
      emotion: 'nervous',
    },
    {
      id: '7',
      speaker: 'Stranger',
      is_user: false,
      content: 'Wait! I am a photographer. Let me take one for you. Professional camera!',
      emotion: 'excited',
    },
    {
      id: '8',
      speaker: 'Narration',
      is_user: false,
      content: '*10 minutes later* He emails you 50 STUNNING photos. Professional quality. Free.',
      emotion: 'excited',
    },
    {
      id: '9',
      speaker: 'You',
      is_user: true,
      content: 'This is... serendipity! ✨',
      emotion: 'excited',
      highlighted_words: [
        {
          word: 'serendipity',
          vocabulary_id: 'serendipity-1',
          style: 'glow',
          definition_simple_english: 'finding good things by accident or luck',
          definition_native: '意外之喜；偶然发现珍奇事物',
        },
      ],
    },
    {
      id: '10',
      speaker: 'System',
      is_user: false,
      content: '📸 New post with professional photos\n💖 Likes: 10,000+\n👥 Followers: +5,000',
      emotion: 'excited',
    },
  ],
  background_image_url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200',
  created_at: new Date().toISOString(),
}

export const sliceOfLifeQuizStory: StoryQuiz = {
  id: 'life-quiz-1',
  vocabulary_ids: ['magnificent', 'malignant'],
  genre: 'slice_of_life',
  theme: '巴黎旅行博主',
  messages: [
    {
      id: '1',
      type: 'narration',
      content: '你正在经营一个旅行账号，正确使用形容词才能获得点赞...',
    },
    {
      id: '2',
      type: 'narration',
      content: '（一张极美的巴黎埃菲尔铁塔夕阳图，图片是模糊的）',
    },
    {
      id: '3',
      type: 'choice',
      content: '你要发一条朋友圈配文："The sunset in Paris is absolutely..."',
      question: {
        vocabulary_id: 'magnificent',
        prompt: '选择合适的形容词，让照片清晰起来！',
        options: [
          {
            id: 'A',
            text: 'MAGNIFICENT (壮丽的)',
            word: 'magnificent',
            is_correct: true,
          },
          {
            id: 'B',
            text: 'MALIGNANT (恶性的/有害的)',
            word: 'malignant',
            is_correct: false,
          },
        ],
        correct_answer: 'magnificent',
      },
    },
    {
      id: '4-correct',
      type: 'feedback',
      content: '✨ 照片瞬间变高清，色彩绚丽！\n💖 点赞 +1000\n👥 涨粉 +1000',
      is_correct: true,
    },
    {
      id: '4-wrong',
      type: 'feedback',
      content: '📷 照片变成黑白恐怖风格\n评论："恶性的夕阳？博主是有辐射吗？"\n👎 取关 -500',
      is_correct: false,
      correct_answer: 'magnificent = 壮丽的',
    },
  ],
  background_image_url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200',
}
