import {
  VscDebugStart,
  VscDebugPause,
  VscDebugContinue,
  VscDebugReverseContinue,
  VscChevronUp,
} from "react-icons/vsc";
import { useEffect, useState } from "react";
import "./MiniPlayer.scss";

const MiniPlayer = ({
  track,
  isPlaying,
  setIsPlaying,
  musicList,
  currentIndex,
  setCurrentIndex,
  setCurrentTrack,
  setIsFullPlayer,
  audioRef,
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [isPlaying, track]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = 0;
    setCurrentTime(0);
  }, [track]);

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

  return (
    <div className="mini-player" onClick={() => setIsFullPlayer(true)}>
      <div className="sing-info">
        <div className="left">
          <img
            src={require(`../../assets/images/${track.cover}`)}
            alt={track.title}
          />

          <div className="info">
            <p className="title">{track.title}</p>
            <p className="artist">{track.artist}</p>
          </div>
        </div>
        <div className="right">
          <button className="up-btn">
            <VscChevronUp />
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

      <div className="control" onClick={(e) => e.stopPropagation()}>
        <button className="icon-btn " onClick={handlePrev}>
          <VscDebugReverseContinue />
        </button>

        <button className="icon-btn" onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? <VscDebugPause /> : <VscDebugStart />}
        </button>

        <button className="icon-btn" onClick={handleNext}>
          <VscDebugContinue />
        </button>
      </div>

      <audio ref={audioRef} src={track.audio} />
    </div>
  );
};

export default MiniPlayer;
