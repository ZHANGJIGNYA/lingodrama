"use client";

import React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Flame,
  Inbox,
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
} from "lucide-react";
import { cn } from "@/lib/utils";


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

// Extended vocabulary data
const vocabularyItems = [
  {
    id: 1,
    word: "Treacherous",
    pos: "Adjective",
    posShort: "Adj",
    phonetic: "/ˈtretʃərəs/",
    definition: "Guilty of betrayal or deception",
    fullDefinition: "Guilty of or involving betrayal or deception; hazardous because of presenting hidden or unpredictable dangers.",
    scene: "/images/scene-betrayal.jpg",
    episode: "Ep. 3 - The Betrayal",
    source: "The CEO's Secret",
    cefr: "B2",
    examples: [
      "The treacherous road conditions made driving dangerous.",
      "She discovered his treacherous plot against the company.",
    ],
    synonyms: ["disloyal", "unfaithful", "deceitful", "perfidious"],
    antonyms: ["loyal", "faithful", "trustworthy"],
    timesReviewed: 5,
    lastReviewed: "2 days ago",
    mastery: 75,
  },
  {
    id: 2,
    word: "Ruthless",
    pos: "Adjective",
    posShort: "Adj",
    phonetic: "/ˈruːθləs/",
    definition: "Having no pity or compassion",
    fullDefinition: "Having or showing no pity or compassion for others; cruel and determined to succeed.",
    scene: "/images/scene-power.jpg",
    episode: "Ep. 1 - The Takeover",
    source: "The CEO's Secret",
    cefr: "B2",
    examples: [
      "He was ruthless in his pursuit of power.",
      "The ruthless CEO fired half the staff.",
    ],
    synonyms: ["merciless", "cruel", "heartless", "brutal"],
    antonyms: ["merciful", "compassionate", "kind"],
    timesReviewed: 8,
    lastReviewed: "1 day ago",
    mastery: 90,
  },
  {
    id: 3,
    word: "Inevitable",
    pos: "Adjective",
    posShort: "Adj",
    phonetic: "/ɪnˈevɪtəbl/",
    definition: "Certain to happen; unavoidable",
    fullDefinition: "Certain to happen; unavoidable. So frequently experienced or seen that it is completely predictable.",
    scene: "/images/scene-confrontation.jpg",
    episode: "Ep. 5 - The Confrontation",
    source: "The CEO's Secret",
    cefr: "B1",
    examples: [
      "Their confrontation was inevitable.",
      "Change is inevitable in any growing company.",
    ],
    synonyms: ["unavoidable", "inescapable", "certain", "sure"],
    antonyms: ["avoidable", "uncertain", "preventable"],
    timesReviewed: 3,
    lastReviewed: "5 days ago",
    mastery: 60,
  },
  {
    id: 4,
    word: "Leverage",
    pos: "Noun",
    posShort: "N",
    phonetic: "/ˈlevərɪdʒ/",
    definition: "Power to influence or act",
    fullDefinition: "The power to influence a person or situation to achieve a particular outcome; advantage gained from a position of strength.",
    scene: "/images/scene-power.jpg",
    episode: "Ep. 2 - Power Play",
    source: "The CEO's Secret",
    cefr: "C1",
    examples: [
      "She used her connections as leverage in the negotiation.",
      "Having inside information gave him leverage.",
    ],
    synonyms: ["influence", "power", "advantage", "clout"],
    antonyms: ["weakness", "disadvantage"],
    timesReviewed: 2,
    lastReviewed: "1 week ago",
    mastery: 45,
  },
  {
    id: 5,
    word: "Clandestine",
    pos: "Adjective",
    posShort: "Adj",
    phonetic: "/klænˈdestɪn/",
    definition: "Kept secret or hidden",
    fullDefinition: "Kept secret or done secretively, especially because illicit or improper.",
    scene: "/images/scene-betrayal.jpg",
    episode: "Ep. 4 - Hidden Agenda",
    source: "The CEO's Secret",
    cefr: "C1",
    examples: [
      "They held clandestine meetings after midnight.",
      "The clandestine affair was finally exposed.",
    ],
    synonyms: ["secret", "covert", "furtive", "surreptitious"],
    antonyms: ["open", "public", "overt"],
    timesReviewed: 1,
    lastReviewed: "Today",
    mastery: 30,
  },
];

export default function LingoDramaPage() {
  const [activeTab, setActiveTab] = useState("mission");
  const [redactedRevealed, setRedactedRevealed] = useState(false);
  const [showStreakModal, setShowStreakModal] = useState(false);

  // Mock streak data
  const currentStreak = 12;

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
                <span className="text-sm font-bold text-luxury-gold">{currentStreak}</span>
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
                <MissionDashboard />
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
                <EvidenceVault />
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
function MissionDashboard() {
  // Simulated data - in real app this would come from backend
  const wordsToReview = 0; // No words to review - shows empty state
  const hasActiveScript = wordsToReview > 0;
  
  return (
    <div className="space-y-4">
      {/* Quick Capture Bar */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-electric-purple/20 to-transparent rounded-xl blur-xl" />
        <div className="relative flex items-center gap-3 px-4 py-3 bg-secondary/80 border border-border rounded-xl backdrop-blur-sm">
          <Lock className="w-4 h-4 text-electric-purple" />
          <input
            type="text"
            placeholder="Type new word to encrypt..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <Search className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>

      {/* Bento Grid */}
      <div className="space-y-3">
        {/* Hero Card - Active Script OR Empty State */}
        {hasActiveScript ? (
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="relative overflow-hidden rounded-2xl cursor-pointer group"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src="/images/ceo-drama.jpg"
                alt="The CEO's Secret drama scene"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
            </div>

            {/* Content */}
            <div className="relative p-5 min-h-[200px] flex flex-col justify-end">
              <div className="mb-1 flex items-center gap-2">
                <span className="text-xs font-medium text-danger-red uppercase tracking-wider">
                  {wordsToReview} Words Due
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-danger-red animate-pulse" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-white mb-2 text-balance">
                {"The CEO's Secret"}
              </h2>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-white/70 mb-2">
                  <span>Words Learned</span>
                  <span className="text-luxury-gold font-medium">8/12</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "66%" }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="h-full bg-gradient-to-r from-luxury-gold to-luxury-gold/70 rounded-full"
                  />
                </div>
              </div>

              {/* CTA Button */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-danger-red text-white font-semibold rounded-xl shadow-lg shadow-danger-red/30 transition-all duration-200 group-hover:shadow-danger-red/50"
              >
                <Play className="w-4 h-4 fill-current" />
                Continue Script
              </motion.button>
            </div>
          </motion.div>
        ) : (
          /* Empty State - No Words to Review */
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-2xl bg-card border border-border p-6"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-luxury-gold/10 flex items-center justify-center mb-4">
                <Flame className="w-8 h-8 text-luxury-gold" />
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                All Caught Up!
              </h3>
              <p className="text-sm text-muted-foreground mb-4 max-w-[240px]">
                No words due for review. Start a new drama to discover more vocabulary.
              </p>
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 py-2.5 px-5 bg-electric-purple text-white text-sm font-semibold rounded-xl shadow-lg shadow-electric-purple/30"
              >
                <BookOpen className="w-4 h-4" />
                Browse Dramas
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-3">
          {/* Inbox Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative overflow-hidden rounded-xl p-4 bg-card border border-border cursor-pointer group"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-electric-purple/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-electric-purple/10 flex items-center justify-center mb-3 group-hover:bg-electric-purple/20 transition-colors">
                <Inbox className="w-5 h-5 text-electric-purple" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-0.5">12</div>
              <div className="text-sm text-muted-foreground">New Clues</div>
            </div>
            <div className="absolute bottom-2 right-2">
              <ChevronRight className="w-4 h-4 text-electric-purple/50" />
            </div>
          </motion.div>

          {/* Streak Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative overflow-hidden rounded-xl p-4 bg-card border border-border cursor-pointer group"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-luxury-gold/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-luxury-gold/10 flex items-center justify-center mb-3 group-hover:bg-luxury-gold/20 transition-colors">
                <Flame className="w-5 h-5 text-luxury-gold" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-foreground">12</span>
                <span className="text-sm text-muted-foreground">Days</span>
              </div>
              <div className="text-sm text-muted-foreground">Streak</div>
            </div>
            <div className="absolute bottom-2 right-2">
              <ChevronRight className="w-4 h-4 text-luxury-gold/50" />
            </div>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <div className="p-4 bg-card border border-border rounded-xl">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">
            Recent Episodes
          </h3>
          <div className="space-y-2">
            {["Ep. 5 - The Confrontation", "Ep. 4 - Hidden Agenda"].map(
              (ep, i) => (
                <div
                  key={ep}
                  className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
                >
                  <span className="text-sm text-foreground">{ep}</span>
                  <span
                    className={cn(
                      "text-xs font-medium px-2 py-0.5 rounded-full",
                      i === 0
                        ? "bg-danger-red/10 text-danger-red"
                        : "bg-luxury-gold/10 text-luxury-gold"
                    )}
                  >
                    {i === 0 ? "3 left" : "Complete"}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Streak Modal Component
function StreakModalComponent({ streak, onClose }: { streak: number; onClose: () => void }) {
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
        collected: hasActivity ? Math.floor(Math.random() * 7) + 1 : Math.floor(Math.random() * 3),
        reviewed: hasActivity ? Math.floor(Math.random() * 12) + 2 : Math.floor(Math.random() * 5),
        tested: hasActivity ? Math.floor(Math.random() * 8) + 1 : Math.floor(Math.random() * 3),
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
  const getIntensity = (day: { collected: number; reviewed: number; tested: number }) => {
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
    { collected: 0, reviewed: 0, tested: 0 }
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
                  <span className="text-3xl font-bold text-luxury-gold">{streak}</span>
                  <span className="text-sm text-muted-foreground">day streak</span>
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
                        intensityColors[getIntensity(day)]
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
                <span className="text-lg font-bold text-foreground">{todayStats.collected}</span>
                <p className="text-[10px] text-muted-foreground">collected</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 rounded-full bg-luxury-gold/20 flex items-center justify-center mx-auto mb-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-luxury-gold" />
                </div>
                <span className="text-lg font-bold text-foreground">{todayStats.reviewed}</span>
                <p className="text-[10px] text-muted-foreground">reviewed</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 rounded-full bg-danger-red/20 flex items-center justify-center mx-auto mb-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-danger-red" />
                </div>
                <span className="text-lg font-bold text-foreground">{todayStats.tested}</span>
                <p className="text-[10px] text-muted-foreground">tested</p>
              </div>
            </div>
          </div>

          {/* Total Stats */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border">
            <div className="text-center">
              <span className="text-xl font-bold text-electric-purple">{totals.collected}</span>
              <p className="text-[10px] text-muted-foreground">Total Collected</p>
            </div>
            <div className="text-center">
              <span className="text-xl font-bold text-luxury-gold">{totals.reviewed}</span>
              <p className="text-[10px] text-muted-foreground">Total Reviewed</p>
            </div>
            <div className="text-center">
              <span className="text-xl font-bold text-danger-red">{totals.tested}</span>
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
                      : "bg-black text-transparent hover:bg-black/80 cursor-pointer"
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
                i <= 3 ? "bg-danger-red" : "bg-secondary"
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
  word: (typeof vocabularyItems)[0];
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
function EvidenceVault() {
  const [selectedWord, setSelectedWord] = useState<
    (typeof vocabularyItems)[0] | null
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
            {vocabularyItems.length} words collected
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
        {vocabularyItems.map((item, index) => (
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

// Section 4: Profile Settings
function ProfileSettingsComponent() {
  const [interfaceLanguage, setInterfaceLanguage] = useState<"en" | "zh">("en");
  const [cefrLevel, setCefrLevel] = useState<string>("B1");
  const [definitionStyle, setDefinitionStyle] = useState<"english" | "native">("english");
  const [perspective, setPerspective] = useState<"male" | "female" | "neutral">("neutral");
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
                : "text-muted-foreground hover:text-foreground"
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
                : "text-muted-foreground hover:text-foreground"
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
                  : "bg-secondary text-muted-foreground border-border hover:border-electric-purple/50 hover:text-foreground"
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
                  : "text-muted-foreground hover:text-foreground"
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
                  : "text-muted-foreground hover:text-foreground"
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
            {(["male", "female", "neutral"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setPerspective(option)}
                className={cn(
                  "flex-1 py-2.5 px-3 rounded-md text-sm font-medium capitalize transition-all duration-200",
                  perspective === option
                    ? "bg-card text-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {option}
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
