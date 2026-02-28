"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, List, Zap, Home, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import type {
  DramaEpisode,
  DramaSeries,
  WordState,
  Vocabulary,
} from "@/lib/types";
import { useAppStore } from "@/lib/store";
import MessageBubble from "./MessageBubble";
import TranslationCard from "./TranslationCard";

interface DramaPlayerProps {
  series: DramaSeries;
  episode: DramaEpisode;
  onBack: () => void;
  onComplete: () => void;
}

export default function DramaPlayer({
  series,
  episode,
  onBack,
  onComplete,
}: DramaPlayerProps) {
  const { vocabularyList, storyVocabulary } = useAppStore();
  const router = useRouter();

  const allVocabulary = useMemo(() => {
    return [...storyVocabulary, ...vocabularyList];
  }, [storyVocabulary, vocabularyList]);

  const [currentMsgIndex, setCurrentMsgIndex] = useState(0);
  const [wordStates, setWordStates] = useState<Record<string, WordState>>({});
  const [selectedVocab, setSelectedVocab] = useState<Vocabulary | null>(null);
  const [showVocabPanel, setShowVocabPanel] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const autoCloseTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 预取变量
  const groupName = (episode as any).groupName || "Family & Friends (3)";

  // 头像预加载
  useEffect(() => {
    const uniqueAvatars = new Set(
      episode.messages
        .map((msg) => msg.avatar)
        .filter(
          (avatar) =>
            avatar && (avatar.includes("/") || avatar.startsWith("http")),
        ),
    );
    uniqueAvatars.forEach((url) => {
      if (typeof window !== "undefined") {
        const img = new window.Image();
        img.src = url as string;
      }
    });
  }, [episode]);

  // 自动滚动
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [currentMsgIndex]);

  // 初始化单词状态
  useEffect(() => {
    const states: Record<string, WordState> = {};
    episode.messages.forEach((msg) => {
      msg.vocabs.forEach((vocab, index) => {
        const key = `${msg.id}-${index}`;
        const actualVocab = allVocabulary.find(
          (v) => v.word.toLowerCase() === vocab.word.toLowerCase(),
        );
        states[key] = {
          word: vocab.word,
          type: vocab.type,
          revealed: false,
          vocabularyId: actualVocab?.id || "",
        };
      });
    });
    setWordStates(states);
  }, [episode, allVocabulary]);

  const handleContinue = () => {
    if (currentMsgIndex >= episode.messages.length - 1) {
      setShowCompletionModal(true);
      return;
    }
    setCurrentMsgIndex((prev) => prev + 1);
  };

  const handleWordClick = (word: string, vocab: Vocabulary) => {
    setSelectedVocab(vocab);
    if (autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current);
    autoCloseTimerRef.current = setTimeout(() => setSelectedVocab(null), 3000);
  };

  const handleWordReveal = (messageId: string, vocabIndex: number) => {
    const key = `${messageId}-${vocabIndex}`;
    setWordStates((prev) => ({
      ...prev,
      [key]: { ...prev[key], revealed: true },
    }));
  };

  const isComplete = currentMsgIndex >= episode.messages.length - 1;
  const visibleMessages = episode.messages.slice(0, currentMsgIndex + 1);

  const episodeVocabs = Array.from(
    new Set(episode.messages.flatMap((msg) => msg.vocabs.map((v) => v.word))),
  )
    .map((word) =>
      allVocabulary.find((v) => v.word.toLowerCase() === word.toLowerCase()),
    )
    .filter(Boolean) as Vocabulary[];

  return (
    <div className="h-full bg-[#F2F2F2] dark:bg-background flex flex-col overflow-hidden relative">
      {/* --- Header --- */}
      <div className="flex-none z-20 px-4 py-3 bg-background/95 border-b border-border">
        <div className="flex items-center justify-between max-w-md mx-auto w-full">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-1 -ml-1 hover:bg-secondary rounded-full"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <div className="flex flex-col text-left">
              <h1 className="font-bold text-[16px] leading-tight text-foreground">
                {groupName}
              </h1>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[11px] text-muted-foreground font-medium">
                  Ep {episode.id}: {episode.title}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowVocabPanel(!showVocabPanel)}
            className="p-2 hover:bg-secondary rounded-lg"
          >
            <List className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* --- Messages --- */}
      <div className="flex-1 overflow-y-auto pb-32">
        <div className="max-w-md mx-auto px-4 py-6">
          {visibleMessages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              isUser={message.sender === "You"}
              wordStates={wordStates}
              vocabularyList={allVocabulary}
              onWordClick={handleWordClick}
              onWordReveal={handleWordReveal}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* --- Bottom Button --- */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background to-transparent p-4 z-10">
        <div className="max-w-md mx-auto">
          <button
            onClick={handleContinue}
            className={`w-full py-3.5 rounded-xl font-semibold text-base flex items-center justify-center gap-2 shadow-lg transition-all ${
              isComplete
                ? "bg-luxury-gold text-black"
                : "bg-danger-red text-white"
            }`}
          >
            {isComplete ? (
              "Complete Episode"
            ) : (
              <>
                Continue <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* --- Sidebar & Cards --- */}
      <AnimatePresence>
        {showVocabPanel && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed right-0 top-0 bottom-0 w-72 bg-card/95 backdrop-blur-lg border-l border-border z-30 p-5 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-base font-bold text-foreground">
                Episode Words
              </h3>
              <button
                onClick={() => setShowVocabPanel(false)}
                className="text-muted-foreground text-sm"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2">
              {episodeVocabs.map((vocab) => (
                <div
                  key={vocab.id}
                  onClick={() => handleWordClick(vocab.word, vocab)}
                  className="p-3 bg-secondary/50 rounded-lg cursor-pointer border border-border"
                >
                  <div className="text-sm font-semibold">{vocab.word}</div>
                  <div className="text-xs text-muted-foreground">
                    {vocab.definition}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <TranslationCard
        vocab={selectedVocab}
        onClose={() => setSelectedVocab(null)}
      />

      {/* --- Completion Modal --- */}
      <AnimatePresence>
        {showCompletionModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-2xl text-center w-full max-w-sm">
              <div className="text-5xl mb-4">🎬</div>
              <h2 className="text-xl font-bold mb-2">Episode Complete!</h2>
              <button
                onClick={() => {
                  onComplete();
                  router.push("/quiz");
                }}
                className="w-full py-3.5 bg-luxury-gold text-black font-bold rounded-xl mb-3 flex items-center justify-center gap-2"
              >
                <Zap className="w-5 h-5" /> Quiz Now
              </button>
              <button
                onClick={() => onComplete()}
                className="w-full py-3 text-sm text-muted-foreground flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4" /> Skip Quiz
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
