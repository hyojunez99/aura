import musicList from "../assets/data/MusicData.json";
import TrackItem from "../components/playlist/TrackItem";
import "./Home.scss";

const Home = ({ setCurrentTrack, setIsPlaying, setCurrentIndex }) => {
  return (
    <section id="home">
      <h2>Recently Played</h2>

      {musicList.map((track,index) => (
        <TrackItem
          key={track.id}
          track={track}
          index={index}
          setCurrentTrack={setCurrentTrack}
          setCurrentIndex={setCurrentIndex}
          setIsPlaying={setIsPlaying}
        />
      ))}
    </section>
  );
};

export default Home;
