
import NowPlaying from './NowPlaying';

const FooterControls = ({ currentIndex, songs, setCurrentSong }) => {
  const currentSong = songs[currentIndex] || null;

  return (
    <div className="footer-controls fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 flex justify-between items-center">
      {currentSong ? (
        <NowPlaying
          currentSong={currentSong}
          songQueue={songs}
          setSongQueue={setCurrentSong}
        />
      ) : (
        <p>No song available</p>
      )}
    </div>
  );
};

export default FooterControls;

