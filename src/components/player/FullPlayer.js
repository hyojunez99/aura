import "./FullPlayer.scss";
import {
  VscDebugStart,
  VscDebugPause,
  VscDebugContinue,
  VscDebugReverseContinue,
  VscChevronDown,
  VscThumbsup,
  VscThumbsupFilled,
  VscNewFolder,
  VscShare,
} from "react-icons/vsc";
import { useState, useEffect } from "react";

const FullPlayer = ({
  track,
  isPlaying,
  setIsPlaying,
  musicList,
  currentIndex,
  setCurrentIndex,
  setCurrentTrack,
  setIsFullPlayer,
  audioRef,
  likedTracks,
  setLikedTracks,
  setHistoryTracks,
  savedTracks,
  setSavedTracks,
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // 🔥 좋아요 여부
  const isLiked = likedTracks.some((item) => item.id === track.id);

  const handleLike = () => {
    if (isLiked) {
      setLikedTracks(likedTracks.filter((item) => item.id !== track.id));
    } else {
      setLikedTracks([...likedTracks, track]);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const update = () => setCurrentTime(audio.currentTime);
    const meta = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", update);
    audio.addEventListener("loadedmetadata", meta);

    return () => {
      audio.removeEventListener("timeupdate", update);
      audio.removeEventListener("loadedmetadata", meta);
    };
  }, []);

  const handlePrev = () => {
    const newIndex = (currentIndex - 1 + musicList.length) % musicList.length;

    setCurrentIndex(newIndex);
    setCurrentTrack(musicList[newIndex]);
    setIsPlaying(true);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % musicList.length;

    setCurrentIndex(newIndex);
    setCurrentTrack(musicList[newIndex]);
    setIsPlaying(true);
  };

  const formatTime = (t) => {
    if (!t) return "0:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

  useEffect(() => {
    setHistoryTracks((prev) => {
      if (!track) return prev;

      const exists = prev.find((t) => t.id === track.id);
      if (exists) return prev;

      return [track, ...prev];
    });
  }, [track]);

  const isSaved = savedTracks.some((item) => item.id === track.id);

  const handleSave = () => {
    if (isSaved) {
      setSavedTracks(savedTracks.filter((t) => t.id !== track.id));
    } else {
      setSavedTracks([...savedTracks, track]);
    }
  };

  useEffect(() => {
    setHistoryTracks((prev) => {
      if (!track) return prev;

      const filtered = prev.filter((t) => t.id !== track.id);

      return [track, ...filtered].slice(0, 20);
    });
  }, [track]);

  return (
    <div className="full-player">
      <button className="down-btn" onClick={() => setIsFullPlayer(false)}>
        <VscChevronDown />
      </button>

      <div className="content">
        <img
          src={require(`../../assets/images/${track.cover}`)}
          alt={track.title}
        />

        <div className="sing-info">
          <h2>{track.title}</h2>
          <p>{track.artist}</p>
        </div>

        <div className="function">
          <button className="function-btn" onClick={handleLike}>
            {isLiked ? <VscThumbsupFilled /> : <VscThumbsup />}
            <span>like</span>
          </button>

          <button
            className={`function-btn ${isSaved ? "active" : ""}`}
            onClick={handleSave}
          >
            <VscNewFolder />
            <span>save</span>
          </button>

          <button className="function-btn">
            <VscShare />
            <span>share</span>
          </button>
        </div>
      </div>

      <div className="progress-wrap">
        <span>{formatTime(currentTime)}</span>

        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={(e) => {
            audioRef.current.currentTime = e.target.value;
            setCurrentTime(e.target.value);
          }}
        />

        <span>{formatTime(duration)}</span>
      </div>

      <div className="control">
        <button className="icon-btn" onClick={handlePrev}>
          <VscDebugReverseContinue />
        </button>

        <button className="icon-btn" onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? <VscDebugPause /> : <VscDebugStart />}
        </button>

        <button className="icon-btn" onClick={handleNext}>
          <VscDebugContinue />
        </button>
      </div>
    </div>
  );
};

export default FullPlayer;
