
import { useRef, useState, useEffect } from 'react';

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

const NowPlaying = ({ currentSong, songQueue = [], setSongQueue }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(songQueue.findIndex(song => song.song_url === currentSong.song_url));

  useEffect(() => {
    if (audioRef.current && currentSong) {
      audioRef.current.src = currentSong.song_url;
      audioRef.current.load();
      audioRef.current.play().catch(error => {
        console.error('Playback error:', error);
      });
      setIsPlaying(true);
      setCurrentIndex(songQueue.findIndex(song => song.song_url === currentSong.song_url));
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [currentSong, songQueue]);

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (audioRef.current) {
        const current = audioRef.current.currentTime;
        const totalDuration = audioRef.current.duration;
        setCurrentTime(current);
        setDuration(totalDuration);
        setProgress(totalDuration > 0 ? (current / totalDuration) * 100 : 0);
      }
    };

    const audioElement = audioRef.current;
    audioElement?.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      audioElement?.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [currentSong]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error('Playback error:', error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e) => {
    if (audioRef.current) {
      const newTime = (e.target.value / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setProgress(e.target.value);
    }
  };

  const toggleShuffle = () => {
    setIsShuffle(prev => !prev);
  };

  const toggleRepeat = () => {
    setIsRepeat(prev => !prev);
  };

  const playNext = () => {
    if (songQueue.length > 0) {
      let nextIndex = currentIndex + 1;

      if (isShuffle) {
        nextIndex = Math.floor(Math.random() * songQueue.length);
      }

      if (nextIndex >= songQueue.length) {
        if (isRepeat) {
          nextIndex = 0;
        } else {
          return;
        }
      }

      setCurrentIndex(nextIndex);
      setSongQueue(songQueue[nextIndex]);
    }
  };

  const playPrevious = () => {
    if (songQueue.length > 0) {
      let prevIndex = currentIndex - 1;

      if (prevIndex < 0) {
        if (isRepeat) {
          prevIndex = songQueue.length - 1;
        } else {
          return;
        }
      }

      setCurrentIndex(prevIndex);
      setSongQueue(songQueue[prevIndex]);
    }
  };

  if (!currentSong || !currentSong.name) {
    return <p>No song selected</p>;
  }

  return (
    <div className="footer-controls fixed bottom-0 left-0 right-0 bg-black text-white p-4 flex justify-between items-center">
      <div className="controls flex items-center space-x-4 flex-shrink-0 mr-8">
        <button onClick={toggleShuffle} className="focus:outline-none">
          <img
            src={`/icons/icon/media/${isShuffle ? 'shuffle_active' : 'shuffle'}.png`}
            alt="Shuffle"
            className="w-6 h-6"
          />
        </button>
        <button onClick={playPrevious} className="focus:outline-none">
          <img
            src="/icons/icon/media/skip_previous.png"
            alt="Previous"
            className="w-6 h-6"
          />
        </button>
        <button onClick={togglePlayPause} className="focus:outline-none">
          <img
            src={isPlaying ? "/icons/icon/media/pause_circle_filled.png" : "/icons/icon/media/play_circle_filled.png"}
            alt={isPlaying ? "Pause" : "Play"}
            className="w-8 h-8"
          />
        </button>
        <button onClick={playNext} className="focus:outline-none">
          <img
            src="/icons/icon/media/skip_next.png"
            alt="Next"
            className="w-6 h-6"
          />
        </button>
        <button onClick={toggleRepeat} className="focus:outline-none">
          <img
            src={`/icons/icon/media/${isRepeat ? 'repeat_active' : 'repeat'}.png`}
            alt="Repeat"
            className="w-6 h-6"
          />
        </button>
      </div>

      <div className="now-playing flex items-center space-x-4 w-1/2 ml-10">
        <div className="song-image">
          <img src={currentSong.image} alt={currentSong.name} className="w-12 h-12 object-cover rounded-md" />
        </div>

        <div className="progress-bar-section w-full">
          <div className="text-white text-sm text-center flex items-center justify-between">
            <span>{formatTime(currentTime)}</span>
            <p className="mx-4 text-center">
              <strong>{currentSong.name}</strong> &middot; {currentSong.artist}
            </p>
            <span>{formatTime(duration)}</span>
          </div>

          <div className="progress-bar mt-1 flex items-center">
            <input
              type="range"
              value={progress}
              onChange={handleSeek}
              className="w-full h-1 rounded-full"
              style={{
                background: `linear-gradient(to right, red ${progress}%, gray 0%)`
              }}
            />
          </div>
        </div>
      </div>

      <audio ref={audioRef} />
    </div>
  );
};

export default NowPlaying;
