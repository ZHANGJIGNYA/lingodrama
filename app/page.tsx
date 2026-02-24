"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Flame,
  Inbox,
  AlertTriangle,
  Search,
  Play,
  Fingerprint,
  Lock,
  BookOpen,
  MessageCircle,
  FolderLock,
  ChevronRight,
  ChevronDown,
  X,
  Volume2,
  Star,
  Clock,
  TrendingUp,
  Settings,
  User,
  Plus,
  Loader2,
  Zap,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/lib/store";
import { useRouter } from "next/navigation";

// Navigation tabs
const tabs = [
  { id: "mission", label: "Mission", icon: BookOpen },
  { id: "review", label: "Review", icon: MessageCircle },
  { id: "vault", label: "Words", icon: FolderLock },
  { id: "settings", label: "Settings", icon: Settings },
];

// CEFR Distribution data
const cefrData = [
  { level: "A1", count: 12, color: "#22c55e" },
  { level: "A2", count: 18, color: "#84cc16" },
  { level: "B1", count: 24, color: "#eab308" },
  { level: "B2", count: 15, color: "#f97316" },
  { level: "C1", count: 8, color: "#ef4444" },
  { level: "C2", count: 3, color: "#dc2626" },
];

// Source Breakdown data
const sourceData = [
  { source: "The CEO's Secret", count: 28, color: "#E50914" },
  { source: "Revenge of Love", count: 19, color: "#9D00FF" },
  { source: "Manual Input", count: 15, color: "#FFD700" },
  { source: "Dark Romance", count: 12, color: "#06b6d4" },
  { source: "Other", count: 6, color: "#737373" },
];

// Display item type for vocabulary list
interface DisplayVocabItem {
  id: number;
  word: string;
  pos: string;
  posShort: string;
  phonetic: string;
  definition: string;
  fullDefinition: string;
  scene: string;
  episode: string;
  source: string;
  cefr: string;
  examples: string[];
  synonyms: string[];
  antonyms: string[];
  timesReviewed: number;
  lastReviewed: string;
  mastery: number;
}

export default function LingoDramaPage() {
  const [activeTab, setActiveTab] = useState("mission");
  const [redactedRevealed, setRedactedRevealed] = useState(false);
  const [showStreakModal, setShowStreakModal] = useState(false);

  // Get data from store
  const { vocabularyList, setVocabularyList, wordsToReview, userStats } =
    useAppStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [wordInput, setWordInput] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleAddWords = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wordInput.trim()) return;
    setIsAdding(true);
    setTimeout(() => {
      const words = wordInput
        .split(/[,，\s]+/)
        .map((w) => w.trim())
        .filter((w) => w.length > 0);
      const newVocabs = words.map((word, i) => ({
        id: `new-${Date.now()}-${i}`,
        user_id: "mock",
        word,
        definition: "Pending AI analysis...",
        part_of_speech: "unknown",
        difficulty_level: 1,
        emotional_intensity: "vibe" as const,
        tags: ["manual"],
        next_review_date: new Date().toISOString(),
        review_count: 0,
        mastery_level: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }));
      setVocabularyList([...newVocabs, ...vocabularyList]);
      setWordInput("");
      setIsAdding(false);
      setShowAddForm(false);
    }, 1000);
  };

  // Use store data for streak
  const currentStreak = userStats?.current_streak_days ?? 0;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Mobile Container */}
      <div className="mx-auto max-w-md min-h-screen flex flex-col">
        {/* Header */}
        <header className="px-4 pt-6 pb-2">
          <div className="flex items-center justify-between">
            <h1 className="font-serif text-2xl font-bold tracking-tight text-foreground">
              LingoDrama
            </h1>
            <div className="flex items-center gap-2">
              {/* Streak Badge */}
              <motion.button
                type="button"
                onClick={() => setShowStreakModal(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-luxury-gold/10 border border-luxury-gold/30 rounded-full hover:bg-luxury-gold/20 transition-colors"
              >
                <Flame className="w-4 h-4 text-luxury-gold" />
                <span className="text-sm font-bold text-luxury-gold">
                  {currentStreak}
                </span>
              </motion.button>

              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                <span className="text-xs font-medium text-muted-foreground">
                  EN
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 px-4 pb-24 overflow-y-auto">
          <AnimatePresence mode="wait">
            {activeTab === "mission" && (
              <motion.div
                key="mission"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <MissionDashboard wordsToReviewCount={wordsToReview.length} vocabularyList={vocabularyList} />
              </motion.div>
            )}
            {activeTab === "review" && (
              <motion.div
                key="review"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <ImmersiveReview
                  redactedRevealed={redactedRevealed}
                  setRedactedRevealed={setRedactedRevealed}
                />
              </motion.div>
            )}
            {activeTab === "vault" && (
              <motion.div
                key="vault"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <EvidenceVault vocabularyList={vocabularyList} />
              </motion.div>
            )}
            {activeTab === "settings" && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <ProfileSettingsComponent />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Streak Modal */}
      <AnimatePresence>
        {showStreakModal && (
          <StreakModalComponent
            streak={currentStreak}
            onClose={() => setShowStreakModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Section 1: Mission Dashboard
function MissionDashboard({
  wordsToReviewCount,
  vocabularyList,
}: {
  wordsToReviewCount: number;
  vocabularyList: import("@/lib/types").Vocabulary[];
}) {
  const { addVocabulary, removeVocabulary, pushWordsToStory, storyVocabulary, dueForQuiz, updateDueForQuiz } = useAppStore();
  const [captureInput, setCaptureInput] = useState("");
  const router = useRouter();

  // Green Room states
  const [selectedWords, setSelectedWords] = useState<Set<string>>(new Set());
  const [previewWord, setPreviewWord] = useState<import("@/lib/types").Vocabulary | null>(null);

  // Check for due words on mount
  useEffect(() => {
    updateDueForQuiz();
  }, [vocabularyList, updateDueForQuiz]);

  // Use data from props
  const wordsToReview = wordsToReviewCount;
  const hasActiveScript = storyVocabulary.length > 0;

  // Filter words collected today
  const today = new Date().toDateString();
  const todayWords = vocabularyList.filter(
    (v) => new Date(v.created_at).toDateString() === today
  );

  const handleCapture = async () => {
    if (!captureInput.trim()) return;

    // Split by comma and filter empty strings
    const words = captureInput
      .split(/[,，]/)
      .map(w => w.trim())
      .filter(w => w.length > 0);

    // Add each word with AI translation
    for (const word of words) {
      // First add with pending status
      const tempId = `cap-${Date.now()}-${Math.random()}`;
      addVocabulary({
        id: tempId,
        user_id: "mock",
        word: word,
        definition: "Translating...",
        part_of_speech: "unknown",
        difficulty_level: 1,
        emotional_intensity: "vibe",
        tags: ["manual"],
        next_review_date: new Date().toISOString(),
        review_count: 0,
        mastery_level: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      // Fetch translation in background
      try {
        const response = await fetch('/api/translate-word', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ word }),
        });

        if (response.ok) {
          const data = await response.json();
          // Update the vocabulary with translation
          const updatedVocab = vocabularyList.find(v => v.id === tempId);
          if (updatedVocab) {
            addVocabulary({
              ...updatedVocab,
              definition: data.definition || "No definition available",
              part_of_speech: data.part_of_speech || "unknown",
            });
            removeVocabulary(tempId);
          }
        }
      } catch (error) {
        console.error('Translation failed:', error);
        // Keep "Translating..." if failed
      }
    }

    setCaptureInput("");
  };

  const handleDeleteWord = (id: string) => {
    removeVocabulary(id);
    setSelectedWords((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const handleToggleSelect = (id: string) => {
    setSelectedWords((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSelectAll = () => {
    if (selectedWords.size === todayWords.length) {
      setSelectedWords(new Set());
    } else {
      setSelectedWords(new Set(todayWords.map((w) => w.id)));
    }
  };

  const handlePushToStory = () => {
    const wordsToPush = selectedWords.size > 0
      ? todayWords.filter((w) => selectedWords.has(w.id))
      : todayWords;
    if (wordsToPush.length === 0) return;
    pushWordsToStory(wordsToPush);
    setSelectedWords(new Set());
    router.push("/review");
  };

  return (
    <div className="space-y-4">
      {/* Mandatory Quiz Alert */}
      {dueForQuiz.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-danger-red/10 border border-danger-red/30 rounded-xl"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-danger-red/20 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-danger-red" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-danger-red mb-1">
                {dueForQuiz.length} Words Need Review!
              </h3>
              <p className="text-xs text-muted-foreground mb-3">
                These words are due for spaced repetition review
              </p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {dueForQuiz.slice(0, 5).map((w) => (
                  <span key={w.id} className="px-2 py-0.5 text-[10px] bg-danger-red/10 text-danger-red rounded-full">
                    {w.word}
                  </span>
                ))}
                {dueForQuiz.length > 5 && (
                  <span className="px-2 py-0.5 text-[10px] bg-secondary text-muted-foreground rounded-full">
                    +{dueForQuiz.length - 5} more
                  </span>
                )}
              </div>
              <motion.button
                type="button"
                onClick={() => router.push('/quiz')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-danger-red text-white text-sm font-bold rounded-xl shadow-lg shadow-danger-red/30"
              >
                <Zap className="w-4 h-4" />
                Start Quiz Now
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Quick Capture Bar */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-electric-purple/20 to-transparent rounded-xl blur-xl" />
        <div className="relative flex items-center gap-3 px-4 py-3 bg-secondary/80 border border-border rounded-xl backdrop-blur-sm">
          <Lock className="w-4 h-4 text-electric-purple" />
          <input
            type="text"
            value={captureInput}
            onChange={(e) => setCaptureInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCapture()}
            placeholder="Type words (separate with commas)..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <button type="button" onClick={handleCapture}>
            <Search className="w-4 h-4 text-muted-foreground hover:text-electric-purple transition-colors" />
          </button>
        </div>
      </div>

      {/* Green Room - Today's New Words */}
      {todayWords.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-xl border border-green-500/30 bg-gradient-to-br from-green-950/50 via-card to-card"
        >
          {/* Backstage curtain effect */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500/50 via-green-400 to-green-500/50" />
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-green-500/10 rounded-full blur-3xl" />

          <div className="relative p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-lg shadow-green-500/50"
                />
                <h3 className="text-sm font-bold text-green-400 tracking-wide">
                  GREEN ROOM
                </h3>
                <span className="text-[10px] text-green-500/60 uppercase">Backstage</span>
              </div>
              <button
                type="button"
                onClick={handleSelectAll}
                className="text-xs text-green-400/70 hover:text-green-400 transition-colors"
              >
                {selectedWords.size === todayWords.length ? "Deselect All" : "Select All"}
              </button>
            </div>

            {/* Words Grid with staggered animation */}
            <div className="overflow-x-auto scrollbar-hide -mx-1 px-1 pb-2">
              <div
                className="grid grid-rows-3 grid-flow-col gap-2"
                style={{ width: 'max-content' }}
              >
                {todayWords.map((word, index) => {
                  const isSelected = selectedWords.has(word.id);
                  return (
                    <motion.div
                      key={word.id}
                      initial={{ opacity: 0, x: -20, scale: 0.8 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{ delay: index * 0.05, type: "spring", stiffness: 200 }}
                      className={cn(
                        "group relative inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer transition-all duration-200",
                        isSelected
                          ? "bg-green-500/30 border-2 border-green-400 text-green-300 shadow-lg shadow-green-500/20"
                          : "bg-green-500/10 border border-green-500/30 text-green-400 hover:bg-green-500/20"
                      )}
                      onClick={() => handleToggleSelect(word.id)}
                    >
                      {/* Selection indicator */}
                      <motion.div
                        initial={false}
                        animate={{ scale: isSelected ? 1 : 0 }}
                        className="w-3.5 h-3.5 rounded-full bg-green-400 flex items-center justify-center"
                      >
                        <Check className="w-2.5 h-2.5 text-green-950" />
                      </motion.div>

                      {/* Word text */}
                      <span
                        className="font-semibold"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewWord(word);
                        }}
                      >
                        {word.word}
                      </span>

                      {/* Delete button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteWord(word.id);
                        }}
                        className="w-4 h-4 rounded-full bg-green-500/20 hover:bg-red-500/40 flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <X className="w-2.5 h-2.5 text-green-400 hover:text-red-400" />
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Selection count & Push Button */}
            <div className="flex items-center gap-3 mt-3">
              <span className="text-xs text-green-500/70">
                {selectedWords.size > 0
                  ? `${selectedWords.size} selected`
                  : `${todayWords.length} words ready`}
              </span>
              <motion.button
                type="button"
                onClick={handlePushToStory}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-green-500/20 hover:bg-green-500/30 border border-green-400/50 text-green-400 text-sm font-bold rounded-xl transition-all shadow-lg shadow-green-500/10"
              >
                <Play className="w-4 h-4 fill-current" />
                {selectedWords.size > 0 ? `Push ${selectedWords.size} to Story` : "Push All to Story"}
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Word Preview Modal */}
      <AnimatePresence>
        {previewWord && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setPreviewWord(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm bg-card border border-green-500/30 rounded-2xl overflow-hidden shadow-2xl shadow-green-500/20"
            >
              {/* Spotlight effect */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-green-500/20 rounded-full blur-3xl" />

              <div className="relative p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-xs text-green-500 font-medium uppercase tracking-wider mb-1">
                      Preview
                    </div>
                    <h2 className="font-serif text-2xl font-bold text-foreground">
                      {previewWord.word}
                    </h2>
                    <span className="text-xs text-muted-foreground">
                      {previewWord.part_of_speech}
                    </span>
                  </div>
                  <button
                    onClick={() => setPreviewWord(null)}
                    className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>

                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {previewWord.definition}
                </p>

                {previewWord.example_sentence && (
                  <div className="p-3 bg-secondary/50 rounded-lg border-l-2 border-green-500 mb-4">
                    <p className="text-xs text-foreground/80 italic">
                      "{previewWord.example_sentence}"
                    </p>
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedWords((prev) => new Set([...prev, previewWord.id]));
                      setPreviewWord(null);
                    }}
                    className="flex-1 py-2.5 bg-green-500/20 text-green-400 text-sm font-semibold rounded-xl hover:bg-green-500/30 transition-colors"
                  >
                    Select for Story
                  </button>
                  <button
                    onClick={() => setPreviewWord(null)}
                    className="px-4 py-2.5 bg-secondary text-muted-foreground text-sm font-medium rounded-xl hover:text-foreground transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bento Grid */}
      <div className="space-y-3">
        {/* Hero Card - Active Script OR Empty State */}
        {hasActiveScript ? (
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => router.push('/review')}
            className="relative overflow-hidden rounded-2xl cursor-pointer group"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src="/images/ceo-drama.jpg"
                alt="The CEO's Secret drama scene"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Cinematic gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
              {/* Film vignette effect */}
              <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />
              {/* Animated light sweep */}
              <motion.div
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: "200%", opacity: [0, 0.3, 0] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
              />
            </div>

            {/* Film grain overlay */}
            <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')]" />

            {/* Content */}
            <div className="relative p-5 min-h-[220px] flex flex-col justify-end">
              {/* Top badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-2.5 py-1 bg-danger-red/90 backdrop-blur-sm rounded-md text-[10px] font-bold text-white uppercase tracking-wider shadow-lg">
                  Now Playing
                </span>
              </div>

              <div className="mb-1 flex items-center gap-2">
                <span className="text-xs font-medium text-danger-red uppercase tracking-wider">
                  {storyVocabulary.length} Words in Story
                </span>
                <motion.span
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-danger-red"
                />
              </div>
              <h2 className="font-serif text-2xl font-bold text-white mb-2 text-balance drop-shadow-lg">
                {"The CEO's Secret"}
              </h2>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-white/70 mb-2">
                  <span>Episode Progress</span>
                  <span className="text-luxury-gold font-medium">
                    {Math.round((storyVocabulary.filter(w => w.mastery_level > 50).length / Math.max(storyVocabulary.length, 1)) * 100)}%
                  </span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.round((storyVocabulary.filter(w => w.mastery_level > 50).length / Math.max(storyVocabulary.length, 1)) * 100)}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="h-full bg-gradient-to-r from-luxury-gold to-danger-red rounded-full shadow-lg shadow-luxury-gold/30"
                  />
                </div>
              </div>

              {/* CTA Button */}
              <motion.button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push('/review');
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-danger-red text-white font-semibold rounded-xl shadow-lg shadow-danger-red/40 transition-all duration-200 group-hover:shadow-danger-red/60"
              >
                <Play className="w-4 h-4 fill-current" />
                Continue Script
              </motion.button>
            </div>
          </motion.div>
        ) : (
          /* Empty State - First Time Experience */
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-card via-card to-electric-purple/5 border border-border p-6"
          >
            {/* Ambient light */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-electric-purple/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-danger-red/10 rounded-full blur-3xl" />

            <div className="relative flex flex-col items-center text-center">
              {/* Animated stage curtain icon */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="w-16 h-16 rounded-full bg-electric-purple/15 flex items-center justify-center mb-4 ring-2 ring-electric-purple/20"
              >
                <span className="text-3xl">🎭</span>
              </motion.div>

              <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                Your Stage Awaits
              </h3>
              <p className="text-sm text-muted-foreground mb-5 max-w-[260px]">
                Add words above, then push them to a drama story. Learn vocabulary through addictive stories!
              </p>

              {/* Quick Start Word Packs */}
              <div className="w-full space-y-2 mb-5">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  Quick Start Packs
                </p>
                {[
                  { label: "Office Drama", words: ["deadline", "promotion", "negotiate", "resign", "ambitious"], icon: "💼" },
                  { label: "Romance", words: ["jealous", "passionate", "betray", "forgive", "vulnerable"], icon: "💔" },
                  { label: "Mystery", words: ["suspicious", "evidence", "witness", "alibi", "confession"], icon: "🔍" },
                ].map((pack) => (
                  <motion.button
                    key={pack.label}
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      pack.words.forEach((word, i) => {
                        setTimeout(() => {
                          addVocabulary({
                            id: `pack-${Date.now()}-${i}`,
                            user_id: "mock",
                            word,
                            definition: "Tap to learn in story...",
                            part_of_speech: "unknown",
                            difficulty_level: 2,
                            emotional_intensity: "social",
                            tags: [pack.label.toLowerCase()],
                            next_review_date: new Date().toISOString(),
                            review_count: 0,
                            mastery_level: 0,
                            created_at: new Date().toISOString(),
                            updated_at: new Date().toISOString(),
                          });
                        }, i * 100);
                      });
                    }}
                    className="w-full flex items-center gap-3 p-3 bg-secondary/50 hover:bg-secondary border border-border hover:border-electric-purple/30 rounded-xl transition-all"
                  >
                    <span className="text-xl">{pack.icon}</span>
                    <div className="flex-1 text-left">
                      <div className="text-sm font-medium text-foreground">{pack.label}</div>
                      <div className="text-[10px] text-muted-foreground truncate">
                        {pack.words.join(" · ")}
                      </div>
                    </div>
                    <Plus className="w-4 h-4 text-electric-purple" />
                  </motion.button>
                ))}
              </div>

              {/* Steps guide */}
              <div className="w-full grid grid-cols-3 gap-2 text-center">
                {[
                  { step: "1", label: "Add Words", icon: "✍️" },
                  { step: "2", label: "Push to Story", icon: "🎬" },
                  { step: "3", label: "Learn & Quiz", icon: "⚡" },
                ].map((s, i) => (
                  <motion.div
                    key={s.step}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.15 }}
                    className="p-2"
                  >
                    <div className="text-lg mb-1">{s.icon}</div>
                    <div className="text-[10px] font-semibold text-foreground">{s.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-3">
          {/* New Clues Card - Links to Vault */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/vault')}
            className="relative overflow-hidden rounded-xl p-4 bg-card border border-border cursor-pointer group"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-electric-purple/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-electric-purple/10 flex items-center justify-center mb-3 group-hover:bg-electric-purple/20 transition-colors">
                <Inbox className="w-5 h-5 text-electric-purple" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-0.5">
                {vocabularyList.length}
              </div>
              <div className="text-sm text-muted-foreground">My Words</div>
            </div>
            <div className="absolute bottom-2 right-2">
              <ChevronRight className="w-4 h-4 text-electric-purple/50" />
            </div>
          </motion.div>

          {/* Quiz Card - Links to Quiz */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/quiz')}
            className="relative overflow-hidden rounded-xl p-4 bg-card border border-border cursor-pointer group"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-luxury-gold/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-luxury-gold/10 flex items-center justify-center mb-3 group-hover:bg-luxury-gold/20 transition-colors">
                <Zap className="w-5 h-5 text-luxury-gold" />
              </div>
              <div className="text-lg font-bold text-foreground mb-0.5">
                Speed Quiz
              </div>
              <div className="text-sm text-muted-foreground">Test yourself</div>
            </div>
            <div className="absolute bottom-2 right-2">
              <ChevronRight className="w-4 h-4 text-luxury-gold/50" />
            </div>
          </motion.div>
        </div>

        {/* Recent Activity */}
        {storyVocabulary.length > 0 && (
          <div className="p-4 bg-card border border-border rounded-xl">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">
              Story Words
            </h3>
            <div className="space-y-2">
              {storyVocabulary.slice(0, 5).map((word, i) => (
                <div
                  key={word.id}
                  className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
                >
                  <span className="text-sm text-foreground">{word.word}</span>
                  <span
                    className={cn(
                      "text-xs font-medium px-2 py-0.5 rounded-full",
                      word.mastery_level > 50
                        ? "bg-luxury-gold/10 text-luxury-gold"
                        : "bg-electric-purple/10 text-electric-purple",
                    )}
                  >
                    {word.mastery_level > 50 ? "Learned" : "In Story"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Streak Modal Component
function StreakModalComponent({
  streak,
  onClose,
}: {
  streak: number;
  onClose: () => void;
}) {
  // Generate mock data for the last 12 weeks (84 days)
  const generateHeatmapData = () => {
    const data = [];
    const today = new Date();
    for (let i = 83; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      // Make last 'streak' days have activity
      const hasActivity = i < streak;
      data.push({
        date,
        collected: hasActivity
          ? Math.floor(Math.random() * 7) + 1
          : Math.floor(Math.random() * 3),
        reviewed: hasActivity
          ? Math.floor(Math.random() * 12) + 2
          : Math.floor(Math.random() * 5),
        tested: hasActivity
          ? Math.floor(Math.random() * 8) + 1
          : Math.floor(Math.random() * 3),
      });
    }
    return data;
  };

  const heatmapData = generateHeatmapData();
  const weeks = [];
  for (let i = 0; i < 12; i++) {
    weeks.push(heatmapData.slice(i * 7, (i + 1) * 7));
  }

  // Get intensity level (0-4) based on total activity
  const getIntensity = (day: {
    collected: number;
    reviewed: number;
    tested: number;
  }) => {
    const total = day.collected + day.reviewed + day.tested;
    if (total === 0) return 0;
    if (total <= 5) return 1;
    if (total <= 12) return 2;
    if (total <= 20) return 3;
    return 4;
  };

  // Intensity colors matching the theme
  const intensityColors = [
    "bg-secondary", // 0 - no activity
    "bg-electric-purple/30", // 1 - low
    "bg-electric-purple/50", // 2 - medium
    "bg-electric-purple/70", // 3 - high
    "bg-electric-purple", // 4 - very high
  ];

  const dayLabels = ["S", "M", "T", "W", "T", "F", "S"];

  // Today's stats
  const todayStats = heatmapData[heatmapData.length - 1];

  // Calculate totals
  const totals = heatmapData.reduce(
    (acc, day) => ({
      collected: acc.collected + day.collected,
      reviewed: acc.reviewed + day.reviewed,
      tested: acc.tested + day.tested,
    }),
    { collected: 0, reviewed: 0, tested: 0 },
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm bg-card border border-border rounded-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="p-5 pb-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-luxury-gold/20 flex items-center justify-center">
                <Flame className="w-6 h-6 text-luxury-gold" />
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-luxury-gold">
                    {streak}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    day streak
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">Keep it going!</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5">
          {/* Legend */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Last 12 weeks</span>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>Less</span>
              <div className="flex gap-0.5">
                {intensityColors.map((color, i) => (
                  <div key={i} className={cn("w-3 h-3 rounded-sm", color)} />
                ))}
              </div>
              <span>More</span>
            </div>
          </div>

          {/* Heatmap Grid */}
          <div className="flex gap-1.5">
            {/* Day labels */}
            <div className="flex flex-col gap-1 pr-1">
              {dayLabels.map((day, i) => (
                <div
                  key={i}
                  className="w-3 h-3 flex items-center justify-center text-[8px] text-muted-foreground"
                >
                  {i % 2 === 1 ? day : ""}
                </div>
              ))}
            </div>

            {/* Weeks */}
            <div className="flex gap-1 flex-1">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.map((day, dayIndex) => (
                    <motion.div
                      key={dayIndex}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: (weekIndex * 7 + dayIndex) * 0.003 }}
                      className={cn(
                        "w-3 h-3 rounded-sm cursor-pointer hover:ring-1 hover:ring-foreground/30 transition-all",
                        intensityColors[getIntensity(day)],
                      )}
                      title={`${day.date.toLocaleDateString()}: ${day.collected} collected, ${day.reviewed} reviewed, ${day.tested} tested`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Today's Stats */}
          <div className="p-4 bg-secondary/50 rounded-xl">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
              Today
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <div className="w-8 h-8 rounded-full bg-electric-purple/20 flex items-center justify-center mx-auto mb-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-electric-purple" />
                </div>
                <span className="text-lg font-bold text-foreground">
                  {todayStats.collected}
                </span>
                <p className="text-[10px] text-muted-foreground">collected</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 rounded-full bg-luxury-gold/20 flex items-center justify-center mx-auto mb-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-luxury-gold" />
                </div>
                <span className="text-lg font-bold text-foreground">
                  {todayStats.reviewed}
                </span>
                <p className="text-[10px] text-muted-foreground">reviewed</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 rounded-full bg-danger-red/20 flex items-center justify-center mx-auto mb-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-danger-red" />
                </div>
                <span className="text-lg font-bold text-foreground">
                  {todayStats.tested}
                </span>
                <p className="text-[10px] text-muted-foreground">tested</p>
              </div>
            </div>
          </div>

          {/* Total Stats */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border">
            <div className="text-center">
              <span className="text-xl font-bold text-electric-purple">
                {totals.collected}
              </span>
              <p className="text-[10px] text-muted-foreground">
                Total Collected
              </p>
            </div>
            <div className="text-center">
              <span className="text-xl font-bold text-luxury-gold">
                {totals.reviewed}
              </span>
              <p className="text-[10px] text-muted-foreground">
                Total Reviewed
              </p>
            </div>
            <div className="text-center">
              <span className="text-xl font-bold text-danger-red">
                {totals.tested}
              </span>
              <p className="text-[10px] text-muted-foreground">Total Tested</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Section 2: Immersive Review (Chat Interface)
function ImmersiveReview({
  redactedRevealed,
  setRedactedRevealed,
}: {
  redactedRevealed: boolean;
  setRedactedRevealed: (val: boolean) => void;
}) {
  return (
    <div className="space-y-4">
      {/* Episode Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg overflow-hidden">
          <img
            src="/images/ceo-drama.jpg"
            alt="Scene thumbnail"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h2 className="font-serif text-lg font-bold text-foreground">
            Ep. 5 - The Confrontation
          </h2>
          <p className="text-xs text-muted-foreground">
            {"The CEO's Secret • Scene 3 of 8"}
          </p>
        </div>
      </div>

      {/* Chat Container */}
      <div className="relative rounded-2xl overflow-hidden min-h-[400px]">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="/images/boardroom.jpg"
            alt="Boardroom scene"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
        </div>

        {/* Chat Messages */}
        <div className="relative p-4 space-y-4">
          {/* Character Label */}
          <div className="flex justify-center mb-6">
            <span className="text-xs text-white/50 bg-white/5 px-3 py-1 rounded-full">
              Alexander Chen, CEO
            </span>
          </div>

          {/* Message 1 - Received */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-start"
          >
            <div className="max-w-[85%] p-4 rounded-2xl rounded-tl-sm bg-white/10 backdrop-blur-md border border-white/10">
              <p className="text-sm text-white/90 leading-relaxed">
                {"You think you can walk into my boardroom and make demands?"}
              </p>
            </div>
          </motion.div>

          {/* Message 2 - Received with Redacted Word */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex justify-start"
          >
            <div className="max-w-[85%] p-4 rounded-2xl rounded-tl-sm bg-white/10 backdrop-blur-md border border-white/10">
              <p className="text-sm text-white/90 leading-relaxed">
                {"I've built this empire from nothing. Every move I make is "}
                {/* Redacted Word */}
                <motion.button
                  type="button"
                  onClick={() => setRedactedRevealed(true)}
                  disabled={redactedRevealed}
                  className={cn(
                    "inline-flex items-center gap-1 px-2 py-0.5 rounded mx-1 transition-all duration-300",
                    redactedRevealed
                      ? "bg-danger-red/20 text-danger-red border border-danger-red/30"
                      : "bg-black text-transparent hover:bg-black/80 cursor-pointer",
                  )}
                >
                  {redactedRevealed ? (
                    <span className="font-semibold">deliberate</span>
                  ) : (
                    <>
                      <Fingerprint className="w-3 h-3 text-white/70" />
                      <span className="text-white/70 text-xs">
                        Tap to reveal
                      </span>
                    </>
                  )}
                </motion.button>
                .
              </p>
            </div>
          </motion.div>

          {/* Message 3 - Received */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="flex justify-start"
          >
            <div className="max-w-[85%] p-4 rounded-2xl rounded-tl-sm bg-white/10 backdrop-blur-md border border-white/10">
              <p className="text-sm text-white/90 leading-relaxed">
                {"Choose your next words very carefully."}
              </p>
            </div>
          </motion.div>

          {/* Word Definition Card (appears after reveal) */}
          <AnimatePresence>
            {redactedRevealed && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                className="mt-6 p-4 rounded-xl bg-card/90 backdrop-blur-md border border-danger-red/30"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-foreground">
                      deliberate
                    </h4>
                    <span className="text-xs text-danger-red font-medium uppercase tracking-wider">
                      Adjective
                    </span>
                  </div>
                  <div className="px-2 py-1 bg-luxury-gold/10 rounded-lg">
                    <span className="text-xs text-luxury-gold font-semibold">
                      +10 XP
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Done consciously and intentionally; careful and unhurried.
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="flex-1 py-2 px-3 bg-secondary text-foreground text-sm font-medium rounded-lg hover:bg-secondary/80 transition-colors"
                  >
                    Review Later
                  </button>
                  <button
                    type="button"
                    className="flex-1 py-2 px-3 bg-danger-red text-white text-sm font-medium rounded-lg hover:bg-danger-red/90 transition-colors"
                  >
                    Got It
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-between px-2">
        <span className="text-xs text-muted-foreground">Scene Progress</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className={cn(
                "w-6 h-1 rounded-full transition-colors",
                i <= 3 ? "bg-danger-red" : "bg-secondary",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Collapsible Section Component
function CollapsibleSection({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="rounded-xl bg-card border border-border overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors"
      >
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {title}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// CEFR Bar Chart Component
function CEFRChart() {
  const maxCount = Math.max(...cefrData.map((d) => d.count));
  const total = cefrData.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="space-y-3">
      {cefrData.map((item) => (
        <div key={item.level} className="flex items-center gap-3">
          <span className="w-8 text-xs font-bold text-foreground">
            {item.level}
          </span>
          <div className="flex-1 h-6 bg-secondary rounded-md overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(item.count / maxCount) * 100}%` }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="h-full rounded-md flex items-center justify-end pr-2"
              style={{ backgroundColor: item.color }}
            >
              <span className="text-[10px] font-bold text-white">
                {item.count}
              </span>
            </motion.div>
          </div>
          <span className="w-10 text-right text-xs text-muted-foreground">
            {Math.round((item.count / total) * 100)}%
          </span>
        </div>
      ))}
    </div>
  );
}

// Source Breakdown Component
function SourceBreakdown() {
  const total = sourceData.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="space-y-3">
      {sourceData.map((item) => (
        <div key={item.source} className="flex items-center gap-3">
          <div
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ backgroundColor: item.color }}
          />
          <span className="flex-1 text-sm text-foreground truncate">
            {item.source}
          </span>
          <span className="text-sm font-medium text-foreground">
            {item.count}
          </span>
          <span className="w-10 text-right text-xs text-muted-foreground">
            {Math.round((item.count / total) * 100)}%
          </span>
        </div>
      ))}
    </div>
  );
}

// Word Detail Modal
function WordDetailModal({
  word,
  onClose,
}: {
  word: DisplayVocabItem;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md max-h-[85vh] bg-card rounded-t-3xl overflow-hidden"
      >
        {/* Header with Image */}
        <div className="relative h-32 overflow-hidden">
          <img
            src={word.scene || "/placeholder.svg"}
            alt={word.episode}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 bg-electric-purple/20 text-electric-purple text-[10px] font-bold uppercase rounded">
                {word.cefr}
              </span>
              <span className="px-2 py-0.5 bg-secondary text-muted-foreground text-[10px] font-medium rounded">
                {word.pos}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5 overflow-y-auto max-h-[calc(85vh-8rem)]">
          {/* Word and Phonetic */}
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="font-serif text-2xl font-bold text-foreground">
                {word.word}
              </h2>
              <button
                type="button"
                className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
              >
                <Volume2 className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground">{word.phonetic}</p>
          </div>

          {/* Definition */}
          <div>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Definition
            </h3>
            <p className="text-sm text-foreground leading-relaxed">
              {word.fullDefinition}
            </p>
          </div>

          {/* Examples */}
          <div>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Examples
            </h3>
            <div className="space-y-2">
              {word.examples.map((example, i) => (
                <div
                  key={i}
                  className="p-3 bg-secondary/50 rounded-lg border-l-2 border-electric-purple"
                >
                  <p className="text-sm text-foreground italic">
                    {'"'}
                    {example}
                    {'"'}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Synonyms & Antonyms */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Synonyms
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {word.synonyms.map((syn) => (
                  <span
                    key={syn}
                    className="px-2 py-1 bg-luxury-gold/10 text-luxury-gold text-xs rounded-md"
                  >
                    {syn}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Antonyms
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {word.antonyms.map((ant) => (
                  <span
                    key={ant}
                    className="px-2 py-1 bg-danger-red/10 text-danger-red text-xs rounded-md"
                  >
                    {ant}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Source Info */}
          <div className="p-3 bg-secondary/30 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-muted-foreground">From:</span>
              <span className="text-sm font-medium text-foreground">
                {word.source}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{word.episode}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-card border border-border rounded-xl text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <TrendingUp className="w-3 h-3 text-luxury-gold" />
                <span className="text-lg font-bold text-foreground">
                  {word.mastery}%
                </span>
              </div>
              <span className="text-[10px] text-muted-foreground uppercase">
                Mastery
              </span>
            </div>
            <div className="p-3 bg-card border border-border rounded-xl text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Star className="w-3 h-3 text-electric-purple" />
                <span className="text-lg font-bold text-foreground">
                  {word.timesReviewed}
                </span>
              </div>
              <span className="text-[10px] text-muted-foreground uppercase">
                Reviews
              </span>
            </div>
            <div className="p-3 bg-card border border-border rounded-xl text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Clock className="w-3 h-3 text-muted-foreground" />
              </div>
              <span className="text-[10px] text-muted-foreground">
                {word.lastReviewed}
              </span>
            </div>
          </div>

          {/* Action Button */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-danger-red text-white font-semibold rounded-xl shadow-lg shadow-danger-red/30"
          >
            Review Now
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Section 3: Words Collection (Vocabulary List)
function EvidenceVault({
  vocabularyList,
}: {
  vocabularyList: import("@/lib/types").Vocabulary[];
}) {
  // Transform vocabulary list to display format
  const displayItems = vocabularyList.map((v, index) => ({
    id: index + 1,
    word: v.word,
    pos: v.part_of_speech || "Unknown",
    posShort: (v.part_of_speech || "Unk").slice(0, 3),
    phonetic: "",
    definition: v.definition,
    fullDefinition: v.definition,
    scene: "/images/scene-power.jpg",
    episode: v.tags.includes("ceo-secret") ? "The CEO's Secret" : "Drama",
    source: "The CEO's Secret",
    cefr: getLevelFromDifficulty(v.difficulty_level),
    examples: v.example_sentence ? [v.example_sentence] : [],
    synonyms: [] as string[],
    antonyms: [] as string[],
    timesReviewed: v.review_count,
    lastReviewed: "Recently",
    mastery: v.mastery_level,
  }));

  const [selectedWord, setSelectedWord] = useState<
    (typeof displayItems)[0] | null
  >(null);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-xl font-bold text-foreground">
            My Words
          </h2>
          <p className="text-sm text-muted-foreground">
            {displayItems.length} words collected
          </p>
        </div>
        <button
          type="button"
          className="p-2 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
        >
          <Search className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Collapsible Stats */}
      <div className="space-y-3">
        <CollapsibleSection title="CEFR Distribution">
          <CEFRChart />
        </CollapsibleSection>

        <CollapsibleSection title="Source Breakdown">
          <SourceBreakdown />
        </CollapsibleSection>
      </div>

      {/* Vocabulary List */}
      <div className="space-y-3">
        {displayItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setSelectedWord(item)}
            className="group relative overflow-hidden rounded-xl bg-card border border-border hover:border-electric-purple/50 transition-all cursor-pointer"
          >
            <div className="flex items-stretch">
              {/* Scene Thumbnail */}
              <div className="w-20 h-24 flex-shrink-0 relative overflow-hidden">
                <img
                  src={item.scene || "/placeholder.svg"}
                  alt={item.episode}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card" />
                {/* CEFR Badge */}
                <div className="absolute top-2 left-2">
                  <span className="px-1.5 py-0.5 bg-black/60 text-white text-[10px] font-bold rounded">
                    {item.cefr}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-3 flex flex-col justify-center min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-serif text-base font-bold text-foreground truncate">
                    {item.word}
                  </h3>
                  <span className="flex-shrink-0 px-1.5 py-0.5 bg-electric-purple/10 text-electric-purple text-[10px] font-bold uppercase rounded">
                    {item.posShort}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-1.5">
                  {item.definition}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-muted-foreground/70">
                    {item.source}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                  <span className="text-[10px] text-muted-foreground/70">
                    {item.mastery}% mastery
                  </span>
                </div>
              </div>

              {/* Action */}
              <div className="flex items-center pr-3">
                <ChevronRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-electric-purple transition-colors" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Word Detail Modal */}
      <AnimatePresence>
        {selectedWord && (
          <WordDetailModal
            word={selectedWord}
            onClose={() => setSelectedWord(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Helper function to convert difficulty to CEFR level
function getLevelFromDifficulty(difficulty: number): string {
  if (difficulty <= 1) return "A1";
  if (difficulty <= 2) return "A2";
  if (difficulty <= 3) return "B1";
  if (difficulty <= 4) return "B2";
  if (difficulty <= 5) return "C1";
  return "C2";
}

// Section 4: Profile Settings
function ProfileSettingsComponent() {
  const [interfaceLanguage, setInterfaceLanguage] = useState<"en" | "zh">("en");
  const [cefrLevel, setCefrLevel] = useState<string>("B1");
  const [definitionStyle, setDefinitionStyle] = useState<"english" | "native">(
    "english",
  );
  const [perspective, setPerspective] = useState<"male" | "female" | "unspecified">(
    "unspecified",
  );
  const [wordsPerReview, setWordsPerReview] = useState(3);

  const cefrLevels = ["A1", "A2", "B1", "B2", "C1", "C2"];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-electric-purple to-danger-red flex items-center justify-center">
          <User className="w-7 h-7 text-white" />
        </div>
        <div>
          <h2 className="font-serif text-xl font-bold text-foreground">
            Profile Settings
          </h2>
          <p className="text-sm text-muted-foreground">
            Customize your learning experience
          </p>
        </div>
      </div>

      {/* Interface Language */}
      <div className="p-4 bg-card border border-border rounded-xl">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Interface Language
        </h3>
        <div className="flex gap-2 p-1 bg-secondary rounded-lg">
          <button
            type="button"
            onClick={() => setInterfaceLanguage("en")}
            className={cn(
              "flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all duration-200",
              interfaceLanguage === "en"
                ? "bg-card text-foreground shadow-md"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => setInterfaceLanguage("zh")}
            className={cn(
              "flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all duration-200",
              interfaceLanguage === "zh"
                ? "bg-card text-foreground shadow-md"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            中文
          </button>
        </div>
      </div>

      {/* CEFR Level */}
      <div className="p-4 bg-card border border-border rounded-xl">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          English Level (CEFR)
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {cefrLevels.map((level) => (
            <motion.button
              key={level}
              type="button"
              onClick={() => setCefrLevel(level)}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-200 border",
                cefrLevel === level
                  ? "bg-electric-purple text-white border-electric-purple shadow-lg shadow-electric-purple/30"
                  : "bg-secondary text-muted-foreground border-border hover:border-electric-purple/50 hover:text-foreground",
              )}
            >
              {level}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Definitions & Perspective */}
      <div className="p-4 bg-card border border-border rounded-xl space-y-4">
        {/* Definitions */}
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Definitions
          </h3>
          <div className="flex gap-2 p-1 bg-secondary rounded-lg">
            <button
              type="button"
              onClick={() => setDefinitionStyle("english")}
              className={cn(
                "flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all duration-200",
                definitionStyle === "english"
                  ? "bg-card text-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              English Sent.
            </button>
            <button
              type="button"
              onClick={() => setDefinitionStyle("native")}
              className={cn(
                "flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all duration-200",
                definitionStyle === "native"
                  ? "bg-card text-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Native Trans.
            </button>
          </div>
        </div>

        {/* Perspective */}
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Perspective
          </h3>
          <div className="flex gap-2 p-1 bg-secondary rounded-lg">
            {(["male", "female", "unspecified"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setPerspective(option)}
                className={cn(
                  "flex-1 py-2.5 px-3 rounded-md text-sm font-medium capitalize transition-all duration-200",
                  perspective === option
                    ? "bg-card text-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {option === 'unspecified' ? 'Neutral' : option}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Words Per Review */}
      <div className="p-4 bg-card border border-border rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Words Per Review
          </h3>
          <span className="text-2xl font-bold text-electric-purple">
            {wordsPerReview}
          </span>
        </div>
        <div className="relative">
          <input
            type="range"
            min="1"
            max="10"
            value={wordsPerReview}
            onChange={(e) => setWordsPerReview(Number(e.target.value))}
            className="w-full h-2 bg-secondary rounded-full appearance-none cursor-pointer accent-electric-purple
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-5
              [&::-webkit-slider-thumb]:h-5
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-white
              [&::-webkit-slider-thumb]:shadow-lg
              [&::-webkit-slider-thumb]:shadow-electric-purple/30
              [&::-webkit-slider-thumb]:border-2
              [&::-webkit-slider-thumb]:border-electric-purple
              [&::-moz-range-thumb]:w-5
              [&::-moz-range-thumb]:h-5
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-white
              [&::-moz-range-thumb]:border-2
              [&::-moz-range-thumb]:border-electric-purple"
          />
          <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
            <span>1</span>
            <span>5</span>
            <span>10</span>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3.5 bg-danger-red text-white font-semibold rounded-xl shadow-lg shadow-danger-red/30 mt-2"
      >
        Save Changes
      </motion.button>
    </div>
  );
}
