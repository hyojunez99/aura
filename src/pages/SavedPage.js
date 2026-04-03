import "./ListPage.scss";
import { VscArrowLeft } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

const SavedPage = ({
  savedTracks = [],
  setCurrentTrack,
  setIsPlaying,
  setCurrentIndex,
}) => {
  const navigate = useNavigate();

  return (

    <section className="list-page">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <VscArrowLeft />
        </button>
        <h2>Saved Songs</h2>
      </div>
      
      <div className="list-wrap">
        {savedTracks.length === 0 ? (
          <p className="empty">No saved songs</p>
        ) : (
          savedTracks.map((track, index) => (
            <div
              key={track.id}
              className="list-item"
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
          ))
        )}
      </div>
    </section>
  );
};

export default SavedPage;
