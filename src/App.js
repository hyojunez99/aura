import { HashRouter, Route, Routes } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

import Header from "./components/layout/Header";
import BottomNav from "./components/layout/BottomNav";

import Home from "./pages/Home";
import Library from "./pages/Library";
import Search from "./pages/Search";
import Profile from "./pages/Profile";

import MiniPlayer from "./components/player/MiniPlayer";
import FullPlayer from "./components/player/FullPlayer";

import musicList from "./assets/data/MusicData.json";
import LikedPage from "./pages/LikePage";
import SavedPage from "./pages/SavedPage";

const App = () => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullPlayer, setIsFullPlayer] = useState(false);
  const audioRef = useRef(null);
  const [likedTracks, setLikedTracks] = useState(() => {
    const saved = localStorage.getItem("likedTracks");
    return saved ? JSON.parse(saved) : [];
  });

  const [savedTracks, setSavedTracks] = useState(() => {
    const saved = localStorage.getItem("savedTracks");
    return saved ? JSON.parse(saved) : [];
  });

  const [historyTracks, setHistoryTracks] = useState(() => {
    const saved = localStorage.getItem("historyTracks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("likedTracks", JSON.stringify(likedTracks));
  }, [likedTracks]);

  useEffect(() => {
    localStorage.setItem("savedTracks", JSON.stringify(savedTracks));
  }, [savedTracks]);

  useEffect(() => {
    localStorage.setItem("historyTracks", JSON.stringify(historyTracks));
  }, [historyTracks]);

  return (
    <HashRouter>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              setCurrentTrack={setCurrentTrack}
              setIsPlaying={setIsPlaying}
              setCurrentIndex={setCurrentIndex}
            />
          }
        />
        <Route
          path="/library"
          element={
            <Library
              likedTracks={likedTracks}
              savedTracks={savedTracks}
              historyTracks={historyTracks}
              setCurrentTrack={setCurrentTrack}
              setIsPlaying={setIsPlaying}
              setCurrentIndex={setCurrentIndex}
            />
          }
        />
        <Route
          path="/search"
          element={
            <Search
              setCurrentTrack={setCurrentTrack}
              setIsPlaying={setIsPlaying}
              setCurrentIndex={setCurrentIndex}
            />
          }
        />
        
        <Route
          path="/profile"
          element={
            <Profile
              likedTracks={likedTracks}
              savedTracks={savedTracks}
              historyTracks={historyTracks}
            />
          }
        />

        <Route
          path="/liked"
          element={
            <LikedPage
              likedTracks={likedTracks}
              setCurrentTrack={setCurrentTrack}
              setIsPlaying={setIsPlaying}
              setCurrentIndex={setCurrentIndex}
            />
          }
        />

        <Route
          path="/saved"
          element={
            <SavedPage
              savedTracks={savedTracks}
              setCurrentTrack={setCurrentTrack}
              setIsPlaying={setIsPlaying}
              setCurrentIndex={setCurrentIndex}
            />
          }
        />
      </Routes>

      {currentTrack && (
        <MiniPlayer
          track={currentTrack}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          musicList={musicList}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          setCurrentTrack={setCurrentTrack}
          setIsFullPlayer={setIsFullPlayer}
          audioRef={audioRef}
        />
      )}

      {isFullPlayer && (
        <FullPlayer
          track={currentTrack}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          musicList={musicList}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          setCurrentTrack={setCurrentTrack}
          setIsFullPlayer={setIsFullPlayer}
          audioRef={audioRef}
          likedTracks={likedTracks}
          setLikedTracks={setLikedTracks}
          savedTracks={savedTracks}
          setSavedTracks={setSavedTracks}
          setHistoryTracks={setHistoryTracks}
        />
      )}

      <BottomNav />
    </HashRouter>
  );
};

export default App;
