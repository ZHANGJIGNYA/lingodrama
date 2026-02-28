"use client";

import React from "react";
import { motion } from "framer-motion";
import type { DramaMessage, WordState, Vocabulary } from "@/lib/types";
import VocabWord from "./VocabWord";

interface MessageBubbleProps {
  message: DramaMessage;
  isUser: boolean;
  wordStates: Record<string, WordState>;
  vocabularyList: Vocabulary[];
  onWordClick: (word: string, vocab: Vocabulary) => void;
  onWordReveal: (messageId: string, vocabIndex: number) => void;
}

export default function MessageBubble({
  message,
  isUser,
  wordStates,
  vocabularyList,
  onWordClick,
  onWordReveal,
}: MessageBubbleProps) {
  const isRightSide = message.sender === "Alex" || message.sender === "You";

  const renderText = () => {
    if (message.isImage) {
      return (
        <div className="bg-white p-4 rounded-lg border border-gray-700">
          <div className="text-gray-300 text-sm">{message.text}</div>
        </div>
      );
    }

    let text = message.text;
    const parts: (string | React.ReactElement)[] = [];
    let lastIndex = 0;

    const sortedVocabs = [...message.vocabs].sort(
      (a, b) => b.word.length - a.word.length,
    );
    const occurrences: Array<{
      start: number;
      end: number;
      vocab: (typeof sortedVocabs)[0];
      index: number;
    }> = [];

    sortedVocabs.forEach((vocab, vocabIndex) => {
      let searchPattern: string;
      if (vocab.type === "partial_mask") {
        // 🟢 模糊匹配逻辑：
        // 只要原文里有以单词前两个字母开头，后面跟着至少两个下划线的词，就抓住它
        const prefix = vocab.word.slice(0, 2);
        const regex = new RegExp(`${prefix}_+`, "g");
        const match = regex.exec(text);

        if (match) {
          searchPattern = match[0]; // 抓住实际在文本里出现的那个“pat___”
        } else {
          searchPattern = vocab.word; // 没找到就退回到普通匹配
        }
      } else if (vocab.type === "blank_fill") {
        searchPattern = "[?]";
      } else if (vocab.type === "highlight" || vocab.type === "context") {
        searchPattern = text.includes(`*${vocab.word}*`)
          ? `*${vocab.word}*`
          : vocab.word;
      } else {
        searchPattern = vocab.word;
      }

      const index = text.indexOf(searchPattern);
      if (index !== -1) {
        occurrences.push({
          start: index,
          end: index + searchPattern.length,
          vocab,
          index: vocabIndex,
        });
      }
    });

    occurrences.sort((a, b) => a.start - b.start);

    occurrences.forEach((occurrence) => {
      if (lastIndex < occurrence.start) {
        parts.push(text.slice(lastIndex, occurrence.start));
      }

      // 🔴 修复 2：使用 as any 强行绕过 TS 的类型检查，提取 definition
      const vocabDef = (occurrence.vocab as any).definition;

      // 🔴 修复 3：补全单词卡片 (TranslationCard) 需要的所有必填字段
      const actualVocab =
        vocabularyList.find(
          (v) => v.word.toLowerCase() === occurrence.vocab.word.toLowerCase(),
        ) ||
        ({
          id: `temp-${occurrence.vocab.word}`,
          word: occurrence.vocab.word,
          phonetic: `/${occurrence.vocab.word}/`, // 补全音标
          part_of_speech: "vocab", // 补全词性
          definition: vocabDef, // 英文释义
          translation: vocabDef, // 翻译字段（单词卡通常读这个）
          example_sentence: "Tap to see context.",
          mastery_level: 0,
        } as any);

      const key = `${message.id}-${occurrence.index}`;
      const wordState = wordStates[key];

      parts.push(
        <VocabWord
          key={key}
          word={occurrence.vocab.word}
          type={occurrence.vocab.type}
          revealed={wordState?.revealed}
          onClick={() => {
            if (actualVocab) {
              onWordClick(occurrence.vocab.word, actualVocab);
              onWordReveal(message.id, occurrence.index);
            }
          }}
        />,
      );

      lastIndex = occurrence.end;
    });

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts.map((part) => {
      if (typeof part === "string") {
        return part.replace(/\*/g, "");
      }
      return part;
    });
  };

  return (
    <div
      className={`flex gap-3 mb-4 ${isRightSide ? "justify-end" : "justify-start"}`}
    >
      {/* 🔴 左侧头像 (只显示 Mom) */}
      {!isRightSide && (
        <div className="flex-shrink-0 w-10 h-10 rounded-md bg-gray-200 flex items-center justify-center overflow-hidden border border-gray-300">
          {message.avatar?.includes("/") ||
          message.avatar?.startsWith("http") ? (
            <img
              src={message.avatar}
              alt={message.sender}
              className="w-full h-full object-cover"
              loading="eager"
              decoding="sync"
            />
          ) : (
            <span className="text-sm font-semibold text-gray-500">
              {message.avatar || message.sender.charAt(0)}
            </span>
          )}
        </div>
      )}

      {/* 🔴 聊天气泡本体 */}
      <div
        className={`max-w-[75%] flex flex-col ${isRightSide ? "items-end" : "items-start"}`}
      >
        <div className="text-xs text-gray-400 mb-1 px-1">{message.sender}</div>
        <div
          className={`px-4 py-2.5 text-[15px] leading-relaxed shadow-sm border ${
            isRightSide
              ? "bg-[#95ec69] text-gray-900 rounded-2xl rounded-tr-sm border-[#85d35f]" // 右侧微信绿，始终不变
              : "bg-white dark:bg-[#2c2c2e] text-gray-900 dark:text-gray-100 rounded-2xl rounded-tl-sm border-gray-200 dark:border-transparent" // 左侧随模式切换
          }`}
        >
          {renderText()}
        </div>
      </div>

      {/* 🔴 我方的吃瓜头像 */}
      {/* {isUser && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#05c160] flex items-center justify-center overflow-hidden border border-[#05c160]">
          {message.avatar?.includes("/") ||
          message.avatar?.startsWith("http") ? (
            <img
              src={message.avatar}
              alt={message.sender}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-sm font-semibold text-white">
              {message.avatar || message.sender.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
      )} */}

      {/* 🔴 右侧头像 (显示 Alex 和 You) */}
      {isRightSide && (
        <div className="flex-shrink-0 w-10 h-10 rounded-md bg-gray-200 flex items-center justify-center overflow-hidden border border-gray-300">
          {message.avatar?.includes("/") ||
          message.avatar?.startsWith("http") ? (
            <img
              src={message.avatar}
              alt={message.sender}
              className="w-full h-full object-cover"
              loading="eager"
              decoding="sync"
            />
          ) : (
            <span className="text-sm font-semibold text-gray-500">
              {message.avatar || message.sender.charAt(0)}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
