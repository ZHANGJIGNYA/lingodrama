"use client";

import { useState, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import type { DramaSeries, DramaEpisode, SeriesType } from "@/lib/types";
import { mockDramaSeries } from "@/lib/mockDramaSeries";
import SeriesSelection from "@/components/drama/SeriesSelection";
import EpisodeList from "@/components/drama/EpisodeList";
import DramaPlayer from "@/components/drama/DramaPlayer";
import { AnimatePresence, motion } from "framer-motion";

type ViewState = "series-selection" | "episode-selection" | "player";

export default function ReviewPage() {
  const { setHideBottomNav } = useAppStore();

  const [viewState, setViewState] = useState<ViewState>("series-selection");
  const [selectedSeries, setSelectedSeries] = useState<DramaSeries | null>(
    null,
  );
  const [selectedEpisode, setSelectedEpisode] = useState<DramaEpisode | null>(
    null,
  );

  // 控制底部导航栏
  useEffect(() => {
    setHideBottomNav(viewState === "player");
  }, [viewState, setHideBottomNav]);

  useEffect(() => {
    return () => {
      setHideBottomNav(false);
    };
  }, [setHideBottomNav]);

  // 处理大类选择 (Series)
  const handleSelectSeries = (seriesType: SeriesType) => {
    const series = mockDramaSeries[seriesType];
    if (series) {
      setSelectedSeries(series);
      setViewState("episode-selection");
    }
  };

  // 处理具体集数选择 (Episode)
  const handleSelectEpisode = (episode: DramaEpisode) => {
    setSelectedEpisode(episode);
    setViewState("player");
  };

  // 返回大类选择
  const handleBackToSeries = () => {
    setSelectedSeries(null);
    setViewState("series-selection");
  };

  // 从播放器返回集数选择
  const handleBackToEpisodes = () => {
    setSelectedEpisode(null);
    setViewState("episode-selection");
  };

  // 播放完成后的跳转
  const handleEpisodeComplete = () => {
    setTimeout(() => {
      setSelectedEpisode(null);
      setViewState("episode-selection");
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background relative">
      <AnimatePresence mode="wait">
        {/* 视图 1：大类选择 */}
        {viewState === "series-selection" && (
          <motion.div
            key="series-selection"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full h-full"
          >
            <SeriesSelection onSelectSeries={handleSelectSeries} />
          </motion.div>
        )}

        {/* 视图 2：选集列表 */}
        {viewState === "episode-selection" && selectedSeries && (
          <motion.div
            key="episode-selection"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full min-h-screen"
          >
            <EpisodeList
              series={selectedSeries}
              onBack={handleBackToSeries}
              onSelectEpisode={handleSelectEpisode}
            />
          </motion.div>
        )}

        {/* 视图 3：沉浸式播放器 */}
        {viewState === "player" && selectedSeries && selectedEpisode && (
          <motion.div
            key="player"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="w-full h-screen fixed inset-0 z-50 bg-background"
          >
            <DramaPlayer
              series={selectedSeries}
              episode={selectedEpisode}
              onBack={handleBackToEpisodes}
              onComplete={handleEpisodeComplete}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
