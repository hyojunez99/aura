import "./Profile.scss";
import {
  VscSettingsGear,
  VscBell,
  VscShare,
  VscSignOut,
} from "react-icons/vsc";

const Profile = ({
  likedTracks = [],
  savedTracks = [],
  historyTracks = [],
}) => {
  const totalTime = historyTracks.reduce((acc, track) => {
    return acc + (track.duration || 0);
  }, 0);

  const formatTime = (t) => {
    const h = Math.floor(t / 3600);
    const m = Math.floor((t % 3600) / 60);
    return `${h}h ${m}m`;
  };

  return (
    <section id="profile">
      <div className="profile-top">
        <img src={require("../assets/images/profile.png")} alt="profile" />
        <h2>Aura User</h2>
        <p>Feel the music 🎧</p>
      </div>

      <div className="profile-stats">
        <div className="stat">
          <p>{likedTracks.length}</p>
          <span>Liked</span>
        </div>

        <div className="stat">
          <p>{savedTracks.length}</p>
          <span>Saved</span>
        </div>

        <div className="stat">
          <p>{formatTime(totalTime)}</p>
          <span>Listening</span>
        </div>
      </div>

      <div className="profile-menu">
        <button>
          <VscSettingsGear />
          <span>Settings</span>
        </button>

        <button>
          <VscBell />
          <span>Notifications</span>
        </button>

        <button>
          <VscShare />
          <span>Share Profile</span>
        </button>

        <button className="logout">
          <VscSignOut />
          <span>Logout</span>
        </button>
      </div>
    </section>
  );
};

export default Profile;
