import type { InteractiveScript } from '@/lib/types'

// Mock Interactive Scenario - Romance Genre
export const romanceInteractiveScript: InteractiveScript = {
  id: 'mock-romance-interactive',
  user_id: 'mock',
  vocabulary_ids: ['mock-1', 'mock-2', 'mock-3'],
  genre: 'romance',
  scenarios: [
    {
      id: 'scenario-1',
      vocabulary_id: 'mock-1',
      target_word: 'ambiguous',
      player_role: 'new employee',
      context: 'The CEO Vincent just sent you a message: "Meet me tonight at 8. There\'s something important I need to discuss." His tone is ambiguous. Your colleague warns you he might fire people after hours. What do you do?',
      context_aids: [
        {
          word: 'colleague',
          explanation: '同事 (coworker)',
        },
      ],
      choices: [
        {
          id: 'choice-1a',
          text: 'Go to the meeting prepared to defend your work',
          is_correct: true,
        },
        {
          id: 'choice-1b',
          text: 'Ignore the message and avoid him',
          is_correct: false,
        },
        {
          id: 'choice-1c',
          text: 'Assume it\'s a date and dress up romantically',
          is_correct: false,
        },
      ],
      correct_choice_id: 'choice-1a',
      success_feedback: '✅ 正确！"ambiguous" 意思是"模棱两可的、不明确的"。当信息不明确时，最好做好准备去了解真相，而不是盲目猜测或逃避。结果：Vincent只是想讨论你的升职！',
      failure_feedback: '❌ "ambiguous" 的意思是"模棱两可的、不明确的"。当信息不明确时，不应该做出极端假设。你应该准备好了解真实情况。结果：你错过了升职机会或造成了误会。',
    },
    {
      id: 'scenario-2',
      vocabulary_id: 'mock-2',
      target_word: 'deliberate',
      player_role: 'project lead',
      context: 'You need to make a deliberate decision about the new project timeline. The board meeting is in 1 hour and they expect your answer. What do you do?',
      choices: [
        {
          id: 'choice-2a',
          text: 'Quickly guess a timeline and announce it',
          is_correct: false,
        },
        {
          id: 'choice-2b',
          text: 'Take time to carefully analyze all factors before deciding',
          is_correct: true,
        },
        {
          id: 'choice-2c',
          text: 'Ask someone else to decide for you',
          is_correct: false,
        },
      ],
      correct_choice_id: 'choice-2b',
      success_feedback: '✅ 完美！"deliberate" 意思是"深思熟虑的、谨慎的"。重要决定需要仔细分析，即使时间紧迫。你的认真态度赢得了董事会的信任！',
      failure_feedback: '❌ "deliberate" 的意思是"深思熟虑的、谨慎的"。重要决定不应该草率或推卸责任。你应该认真分析后再做决定。结果：项目因为错误的时间线而延期。',
    },
    {
      id: 'scenario-3',
      vocabulary_id: 'mock-3',
      target_word: 'resilient',
      player_role: 'team member',
      context: 'Your biggest project just failed. The client is angry and your team is devastated. Vincent looks at you and says: "We need someone resilient to lead the recovery plan." What do you do?',
      context_aids: [
        {
          word: 'devastated',
          explanation: '极度沮丧的 (very upset)',
        },
      ],
      choices: [
        {
          id: 'choice-3a',
          text: 'Step up, accept the challenge, and start planning immediately',
          is_correct: true,
        },
        {
          id: 'choice-3b',
          text: 'Say you need time to recover emotionally first',
          is_correct: false,
        },
        {
          id: 'choice-3c',
          text: 'Suggest giving up on this client',
          is_correct: false,
        },
      ],
      correct_choice_id: 'choice-3a',
      success_feedback: '✅ 太棒了！"resilient" 意思是"有韧性的、能迅速恢复的"。你展现了在困难中快速反弹的能力。Vincent对你刮目相看，你们的关系更进一步了！',
      failure_feedback: '❌ "resilient" 的意思是"有韧性的、能迅速恢复的"。在困难面前，需要展现出快速恢复和继续前进的能力。结果：你失去了证明自己的机会。',
    },
  ],
  created_at: new Date().toISOString(),
}

// Mock Interactive Scenario - Workplace Genre
export const workplaceInteractiveScript: InteractiveScript = {
  id: 'mock-workplace-interactive',
  user_id: 'mock',
  vocabulary_ids: ['mock-1', 'mock-2', 'mock-3'],
  genre: 'workplace',
  scenarios: [
    {
      id: 'scenario-1',
      vocabulary_id: 'mock-1',
      target_word: 'meticulous',
      player_role: 'auditor',
      context: 'You\'re reviewing the company\'s financial records before the big audit. Your boss says: "Be meticulous - one mistake could cost us millions." How do you proceed?',
      context_aids: [
        {
          word: 'audit',
          explanation: '审计 (official inspection)',
        },
      ],
      choices: [
        {
          id: 'choice-1a',
          text: 'Review everything quickly to finish early',
          is_correct: false,
        },
        {
          id: 'choice-1b',
          text: 'Check every detail carefully, even if it takes longer',
          is_correct: true,
        },
        {
          id: 'choice-1c',
          text: 'Only check the major items and skip small details',
          is_correct: false,
        },
      ],
      correct_choice_id: 'choice-1b',
      success_feedback: '✅ 正确！"meticulous" 意思是"一丝不苟的、极其仔细的"。你的细致工作发现了一个重大错误，拯救了公司！',
      failure_feedback: '❌ "meticulous" 的意思是"一丝不苟的、极其仔细的"。重要工作需要注意每一个细节。结果：审计发现了你漏掉的问题。',
    },
    {
      id: 'scenario-2',
      vocabulary_id: 'mock-2',
      target_word: 'skeptical',
      player_role: 'manager',
      context: 'A vendor offers you an amazing deal that seems too good to be true. Everyone is excited, but you feel skeptical. The decision deadline is today. What do you do?',
      context_aids: [
        {
          word: 'vendor',
          explanation: '供应商 (supplier)',
        },
      ],
      choices: [
        {
          id: 'choice-2a',
          text: 'Trust your doubts and investigate before committing',
          is_correct: true,
        },
        {
          id: 'choice-2b',
          text: 'Go with the team\'s excitement and sign immediately',
          is_correct: false,
        },
        {
          id: 'choice-2c',
          text: 'Completely refuse without any investigation',
          is_correct: false,
        },
      ],
      correct_choice_id: 'choice-2a',
      success_feedback: '✅ 明智的选择！"skeptical" 意思是"怀疑的、持怀疑态度的"。你的谨慎调查发现这是个骗局，保护了公司！',
      failure_feedback: '❌ "skeptical" 的意思是"怀疑的、持怀疑态度的"。当事情看起来太好时，应该保持怀疑并调查。结果：公司损失惨重或错失良机。',
    },
    {
      id: 'scenario-3',
      vocabulary_id: 'mock-3',
      target_word: 'diplomatic',
      player_role: 'team lead',
      context: 'Two senior managers are having a heated argument in your meeting. Both are wrong but both are your bosses. You need to be diplomatic. What do you say?',
      context_aids: [
        {
          word: 'heated',
          explanation: '激烈的 (angry and intense)',
        },
      ],
      choices: [
        {
          id: 'choice-3a',
          text: 'Tell them both they\'re completely wrong',
          is_correct: false,
        },
        {
          id: 'choice-3b',
          text: 'Say nothing and let them fight',
          is_correct: false,
        },
        {
          id: 'choice-3c',
          text: 'Acknowledge both perspectives and suggest a compromise',
          is_correct: true,
        },
      ],
      correct_choice_id: 'choice-3c',
      success_feedback: '✅ 完美！"diplomatic" 意思是"圆滑的、有外交手腕的"。你巧妙地化解了冲突，两位经理都对你印象深刻！',
      failure_feedback: '❌ "diplomatic" 的意思是"圆滑的、有外交手腕的"。在敏感情况下需要巧妙处理，既不得罪人又能解决问题。结果：你惹怒了上司或失去了他们的尊重。',
    },
  ],
  created_at: new Date().toISOString(),
}

// Mock Interactive Scenario - Slice of Life Genre
export const sliceOfLifeInteractiveScript: InteractiveScript = {
  id: 'mock-life-interactive',
  user_id: 'mock',
  vocabulary_ids: ['mock-1', 'mock-2', 'mock-3'],
  genre: 'slice_of_life',
  scenarios: [
    {
      id: 'scenario-1',
      vocabulary_id: 'mock-1',
      target_word: 'spontaneous',
      player_role: 'yourself',
      context: 'It\'s Saturday morning. Your friend calls: "Let\'s be spontaneous today! I have a surprise adventure planned." You have a comfortable day planned at home. What do you do?',
      choices: [
        {
          id: 'choice-1a',
          text: 'Decline and stick to your original plan',
          is_correct: false,
        },
        {
          id: 'choice-1b',
          text: 'Say yes and embrace the unplanned adventure',
          is_correct: true,
        },
        {
          id: 'choice-1c',
          text: 'Agree but insist on planning everything first',
          is_correct: false,
        },
      ],
      correct_choice_id: 'choice-1b',
      success_feedback: '✅ 太好了！"spontaneous" 意思是"自发的、即兴的"。你享受了一次美妙的意外旅行，创造了难忘的回忆！',
      failure_feedback: '❌ "spontaneous" 的意思是"自发的、即兴的"。有时候最美好的经历来自计划之外。结果：你错过了精彩的体验。',
    },
    {
      id: 'scenario-2',
      vocabulary_id: 'mock-2',
      target_word: 'nostalgic',
      player_role: 'yourself',
      context: 'You find an old photo album from your childhood. Looking at it makes you feel nostalgic. Your family wants to throw it away to save space. What do you do?',
      context_aids: [
        {
          word: 'album',
          explanation: '相册 (photo book)',
        },
      ],
      choices: [
        {
          id: 'choice-2a',
          text: 'Keep the album because these memories are precious',
          is_correct: true,
        },
        {
          id: 'choice-2b',
          text: 'Throw it away since it\'s just old stuff',
          is_correct: false,
        },
        {
          id: 'choice-2c',
          text: 'Ignore your feelings and follow what others say',
          is_correct: false,
        },
      ],
      correct_choice_id: 'choice-2a',
      success_feedback: '✅ 很好！"nostalgic" 意思是"怀旧的、思念过去的"。你珍惜这些美好回忆，将它们数字化保存，既保留了回忆又解决了空间问题！',
      failure_feedback: '❌ "nostalgic" 的意思是"怀旧的、思念过去的"。当某些东西唤起珍贵回忆时，应该重视这种感受。结果：你后悔扔掉了无法复制的记忆。',
    },
    {
      id: 'scenario-3',
      vocabulary_id: 'mock-3',
      target_word: 'serene',
      player_role: 'yourself',
      context: 'After a stressful week, you visit a serene park by the lake. A stranger invites you to a loud party nearby. What do you choose?',
      choices: [
        {
          id: 'choice-3a',
          text: 'Go to the party for excitement',
          is_correct: false,
        },
        {
          id: 'choice-3b',
          text: 'Stay in the peaceful park to rest and recharge',
          is_correct: true,
        },
        {
          id: 'choice-3c',
          text: 'Leave and go somewhere else',
          is_correct: false,
        },
      ],
      correct_choice_id: 'choice-3b',
      success_feedback: '✅ 明智的选择！"serene" 意思是"宁静的、平和的"。你享受了平静的时光，感觉精神焕发，准备好面对新的一周！',
      failure_feedback: '❌ "serene" 的意思是"宁静的、平和的"。有时候我们需要宁静来恢复精力。结果：你更加疲惫，没有真正休息。',
    },
  ],
  created_at: new Date().toISOString(),
}

// Helper function to get mock script by genre
export function getMockInteractiveScript(genre: 'romance' | 'workplace' | 'slice_of_life'): InteractiveScript {
  switch (genre) {
    case 'romance':
      return romanceInteractiveScript
    case 'workplace':
      return workplaceInteractiveScript
    case 'slice_of_life':
      return sliceOfLifeInteractiveScript
    default:
      return romanceInteractiveScript
  }
}
