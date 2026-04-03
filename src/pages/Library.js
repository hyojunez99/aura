import "./Library.scss";
import { useNavigate } from "react-router-dom";
import useResponsiveCount from "../hook/useResponsiveCount";

const Library = ({
  likedTracks,
  savedTracks,
  historyTracks,
  setCurrentTrack,
  setIsPlaying,
  setCurrentIndex,
}) => {
  const navigate = useNavigate();
  const count = useResponsiveCount();

  return (
    <section id="library">
      <div className="library-section">
        <div className="section-header">
          <h3>Liked</h3>
          <button onClick={() => navigate("/liked")}>
            <span>더보기</span>
          </button>
        </div>

        <div className="grid">
          {likedTracks.slice(0, count).map((track, index) => (
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
              <span>{track.artist}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="library-section">
        <div className="section-header">
          <h3>Saved</h3>
          <button onClick={() => navigate("/saved")}>
            <span>더보기</span>
          </button>
        </div>

        <div className="grid">
          {savedTracks.slice(0, count).map((track, index) => (
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
              <span>{track.artist}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="library-section">
        <div className="section-header">
          <h3>History</h3>
        </div>

        {historyTracks.map((track, index) => (
          <div
            key={track.id}
            className="history-item"
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
            <div>
              <p>{track.title}</p>
              <span>{track.artist}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Library;
