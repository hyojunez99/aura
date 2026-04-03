import "./Search.scss";
import { useState } from "react";
import musicList from "../assets/data/MusicData.json";
import TrackItem from "../components/playlist/TrackItem";
import useResponsiveCount from "../hook/useResponsiveCount";

const Search = ({ setCurrentTrack, setIsPlaying, setCurrentIndex }) => {
  const [keyword, setKeyword] = useState("");

  const filteredList = musicList.filter(
    (track) =>
      track.title.toLowerCase().includes(keyword.toLowerCase()) ||
      track.artist.toLowerCase().includes(keyword.toLowerCase()),
  );

  const count = useResponsiveCount();

  return (
    <section id="search">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search songs or artists"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      <div className="search-result">
        {keyword === "" ? (
          <>
            <h3>Browse All</h3>

            <div className="grid">
              {musicList.slice(0, count).map((track, index) => (
                <div
                  key={track.id}
                  className="card"
                  onClick={() => {
                    setCurrentTrack(track);
                    setCurrentIndex(index);
                    setIsPlaying(true);
                  }}
                >
                  <img
                    src={require(`../assets/images/${track.cover}`)}
                    alt={track.title}
                  />
                  <p>{track.title}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <h3>Results</h3>

            {filteredList.length === 0 ? (
              <p className="empty">No results found</p>
            ) : (
              filteredList.map((track, index) => (
                <TrackItem
                  key={track.id}
                  track={track}
                  index={index}
                  setCurrentTrack={setCurrentTrack}
                  setCurrentIndex={setCurrentIndex}
                  setIsPlaying={setIsPlaying}
                />
              ))
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Search;
