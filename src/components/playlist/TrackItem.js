import "./TrackItem.scss";
import { VscPlay } from "react-icons/vsc";

const TrackItem = ({
  track,
  index,
  setCurrentTrack,
  setCurrentIndex,
  setIsPlaying,
}) => {
  return (
    <div
      className="track-item"
      onClick={() => {
        setCurrentTrack(track);
        setCurrentIndex(index);
        setIsPlaying(true);
      }}
    >
      <div className="track-left">
        <img
          src={require(`../../assets/images/${track.cover}`)}
          alt={track.title}
        />

        <div className="track-info">
          <p className="title">{track.title}</p>
          <p className="artist">{track.artist}</p>
        </div>
      </div>

      <button
        className="icon-btn"
        onClick={(e) => {
          e.stopPropagation();
          setCurrentTrack(track);
          setCurrentIndex(index);
          setIsPlaying(true);
        }}
      >
        <VscPlay />
      </button>
    </div>
  );
};

export default TrackItem;
