'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Save, User, Book, Film, Globe, RefreshCw } from 'lucide-react'
import type { UserSettings } from '@/lib/types'
import { useAppStore } from '@/lib/store'

export default function SettingsPage() {
  const { userSettings, setUserSettings } = useAppStore()
  const [settings, setSettings] = useState<UserSettings>(userSettings!)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // 保存到 Zustand store
    setUserSettings(settings)
    // TODO: 保存到 Supabase
    setTimeout(() => {
      setIsSaving(false)
      alert('设置已保存！')
    }, 1000)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-screen-sm pb-24">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
          ⚙️ 设置
        </h1>
        <p className="text-muted-foreground">
          个性化你的学习体验
        </p>
      </motion.header>

      <div className="space-y-6">
        {/* 英语水平 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-lg p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Book className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">英语水平</h2>
          </div>

          <p className="text-sm text-muted-foreground mb-4">
            根据 CEFR 标准调整剧情难度和单词释义
          </p>

          <div className="grid grid-cols-5 gap-2">
            {(['A1', 'A2', 'B1', 'B2', 'C1'] as const).map((level) => (
              <button
                key={level}
                onClick={() => setSettings({ ...settings, english_level: level })}
                className={`py-3 px-2 rounded-lg border-2 transition-all ${
                  settings.english_level === level
                    ? 'bg-primary border-primary text-primary-foreground'
                    : 'bg-background border-border text-foreground hover:border-primary/50'
                }`}
              >
                <div className="text-2xl font-bold mb-1">{level}</div>
                <div className="text-xs">
                  {level === 'A1' && '初级'}
                  {level === 'A2' && '初中级'}
                  {level === 'B1' && '中级'}
                  {level === 'B2' && '中高级'}
                  {level === 'C1' && '高级'}
                </div>
              </button>
            ))}
          </div>

          {/* 释义偏好 */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-foreground mb-3">
              单词释义偏好
            </label>
            <div className="space-y-2">
              <button
                onClick={() => setSettings({ ...settings, definition_preference: 'simple_english' })}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                  settings.definition_preference === 'simple_english'
                    ? 'bg-primary/10 border-primary text-foreground'
                    : 'bg-background border-border text-muted-foreground hover:border-primary/50'
                }`}
              >
                <div className="font-medium">简短英语句子</div>
                <div className="text-xs mt-1">使用简单的英语解释难词</div>
              </button>

              <button
                onClick={() => setSettings({ ...settings, definition_preference: 'native_language' })}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                  settings.definition_preference === 'native_language'
                    ? 'bg-primary/10 border-primary text-foreground'
                    : 'bg-background border-border text-muted-foreground hover:border-primary/50'
                }`}
              >
                <div className="font-medium">母语翻译</div>
                <div className="text-xs mt-1">直接用母语翻译</div>
              </button>
            </div>
          </div>

          {/* 母语选择 */}
          {settings.definition_preference === 'native_language' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4"
            >
              <label className="block text-sm font-medium text-foreground mb-3">
                <Globe className="w-4 h-4 inline mr-2" />
                母语
              </label>
              <select
                value={settings.native_language}
                onChange={(e) => setSettings({ ...settings, native_language: e.target.value as any })}
                className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="zh-CN">简体中文</option>
                <option value="zh-TW">繁體中文</option>
                <option value="ja">日本語</option>
                <option value="ko">한국어</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
            </motion.div>
          )}
        </motion.section>

        {/* 剧情偏好 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-lg p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Film className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">剧情偏好</h2>
          </div>

          <p className="text-sm text-muted-foreground mb-4">
            选择你喜欢的剧情类型
          </p>

          <div className="grid grid-cols-2 gap-3">
            {[
              { value: 'romance', label: '💘 霸总/恋爱', desc: '心动感、甜蜜互动' },
              { value: 'workplace', label: '💼 职场/喜剧', desc: '社死现场、搞笑日常' },
              { value: 'mystery', label: '🔍 悬疑/推理', desc: '紧张刺激、解谜' },
              { value: 'slice_of_life', label: '🌿 生活/治愈', desc: '日常美好、慢节奏' },
            ].map((genre) => (
              <button
                key={genre.value}
                onClick={() => setSettings({ ...settings, genre_preference: genre.value as any })}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  settings.genre_preference === genre.value
                    ? 'bg-primary/10 border-primary'
                    : 'bg-background border-border hover:border-primary/50'
                }`}
              >
                <div className="font-medium text-foreground mb-1">{genre.label}</div>
                <div className="text-xs text-muted-foreground">{genre.desc}</div>
              </button>
            ))}

            <button
              onClick={() => setSettings({ ...settings, genre_preference: 'mixed' })}
              className={`col-span-2 p-4 rounded-lg border-2 text-left transition-all ${
                settings.genre_preference === 'mixed'
                  ? 'bg-primary/10 border-primary'
                  : 'bg-background border-border hover:border-primary/50'
              }`}
            >
              <div className="font-medium text-foreground mb-1">🎲 混合模式</div>
              <div className="text-xs text-muted-foreground">随机切换不同题材</div>
            </button>
          </div>
        </motion.section>

        {/* 性别设置 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-lg p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <User className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">性别设置</h2>
          </div>

          <p className="text-sm text-muted-foreground mb-4">
            影响剧情中的角色视角和称呼
          </p>

          <div className="grid grid-cols-3 gap-3">
            {[
              { value: 'male', label: '👨 男性', desc: '男性视角' },
              { value: 'female', label: '👩 女性', desc: '女性视角' },
              { value: 'unspecified', label: '🚫 不说明', desc: '中性视角' },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setSettings({ ...settings, gender: option.value as any })}
                className={`p-4 rounded-lg border-2 text-center transition-all ${
                  settings.gender === option.value
                    ? 'bg-primary/10 border-primary'
                    : 'bg-background border-border hover:border-primary/50'
                }`}
              >
                <div className="text-2xl mb-2">{option.label.split(' ')[0]}</div>
                <div className="text-sm font-medium text-foreground">{option.label.split(' ')[1]}</div>
                <div className="text-xs text-muted-foreground mt-1">{option.desc}</div>
              </button>
            ))}
          </div>
        </motion.section>

        {/* 复习设置 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card border border-border rounded-lg p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <RefreshCw className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">复习设置</h2>
          </div>

          <p className="text-sm text-muted-foreground mb-4">
            每次复习的单词数量
          </p>

          <div className="grid grid-cols-3 gap-3">
            {[
              { value: 3, label: '3个词', desc: '短而精' },
              { value: 5, label: '5个词', desc: '平衡型' },
              { value: 8, label: '8个词', desc: '集中复习' },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setSettings({ ...settings, words_per_review: option.value as any })}
                className={`p-4 rounded-lg border-2 text-center transition-all ${
                  settings.words_per_review === option.value
                    ? 'bg-primary/10 border-primary'
                    : 'bg-background border-border hover:border-primary/50'
                }`}
              >
                <div className="text-2xl font-bold text-foreground mb-1">{option.value}</div>
                <div className="text-sm font-medium text-foreground">{option.label}</div>
                <div className="text-xs text-muted-foreground mt-1">{option.desc}</div>
              </button>
            ))}
          </div>

          <div className="mt-4 p-3 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground">
              💡 提示：单词越少故事越精炼，单词越多一次复习更多内容
            </p>
          </div>
        </motion.section>
      </div>

      {/* 保存按钮 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-20 left-0 right-0 px-4 z-10"
      >
        <div className="max-w-screen-sm mx-auto">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full bg-primary text-primary-foreground py-4 px-6 rounded-lg font-bold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSaving ? (
              <>
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                保存中...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                保存设置
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  )
}
