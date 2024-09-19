"use client";
import { useEffect, useState, useRef } from 'react';
import { ApolloProvider, gql } from '@apollo/client';
import FeaturedSong from './components/FeaturedSong';
import NewReleases from './components/NewReleases';
import RecentlyPlayed from './components/RecentlyPlayed';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import FooterControls from './components/FooterControls';
import Favorites from './components/Favorites';
import client from './apollo-client';
import Image from "next/image";
const MusicApp = () => {
  const [songs, setSongs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [refetchRecentSongs, setRefetchRecentSongs] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [currentSong, setCurrentSong] = useState(null);
  const audioRef = useRef(null);
  const mainContentRef = useRef(null);

  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeTab]);

  useEffect(() => {
    const query = gql`
      query {
        allSongs {
          name
          artist
          album
          release
          image
          song_url
        }
      }
    `;

    client
      .query({ query })
      .then((result) => {
        const songsList = result.data.allSongs;
        setSongs(songsList);
        if (songsList.length > 0) {
          setCurrentIndex(0);
          setCurrentSong(songsList[0]);
        }
      })
      .catch((error) => console.error('Error fetching songs:', error));
  }, []);

  useEffect(() => {
    if (currentIndex !== null && songs[currentIndex]) {
      setRefetchRecentSongs(true);
      setCurrentSong(songs[currentIndex]);
    }
  }, [currentIndex, songs]);

  const handleSongSelect = (song) => {
    setCurrentSong(song);
  
    const index = songs.findIndex(s => s.name === song.name && s.artist === song.artist);
  
    if (index !== -1) {
      setCurrentIndex(index); 
    }
  
    if (audioRef.current) {
      audioRef.current.src = song.song_url;
      audioRef.current.play();
    }
  };
  

  return (
    <ApolloProvider client={client}>
      <div className="music-app h-screen flex bg-gray-900 text-white">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <div
          className="flex flex-col w-4/6 p-6 space-y-6 overflow-y-auto main-content"
          ref={mainContentRef}
          style={{ height: 'calc(100vh - 80px)' }}
        >
          {activeTab === 'home' && (
            <>
              <div className="w-full">
                <div className="mb-6">
                  <FeaturedSong currentSong={currentSong} setCurrentSong={handleSongSelect} />
                </div>

                <div className="new-releases w-full">
                  <NewReleases />
                </div>

                <div className="recently-played w-full">
                  <RecentlyPlayed
                    refetchRecentSongs={refetchRecentSongs}
                    onRefetchComplete={() => setRefetchRecentSongs(false)}
                  />
                </div>
              </div>

              <div className="w-1/6 fixed top-0 right-0 h-full p-4">
                <Favorites />
              </div>
            </>
          )}

          {activeTab === 'library' && (
            <div className="songs-list">
              <h2 className="text-2xl font-bold mt-6">All Songs</h2>
              <div className="grid grid-cols-4 gap-4">
                {songs.map((song, index) => (
                  <div
                    key={song.name}
                    className="song-item p-2 bg-gray-800 text-white rounded-lg cursor-pointer"
                    onClick={() => {
                      setCurrentIndex(index);
                      setTimeout(() => {
                        if (audioRef.current) {
                          audioRef.current.play();
                        }
                      }, 100);
                    }}
                  >
                    <Image
                      src={song.image}
                      alt={song.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="song-details mt-2">
                      <div className="font-bold">{song.name}</div>
                      <div>{song.artist} - {song.album} ({song.release})</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <FooterControls
            currentIndex={currentIndex}
            songs={songs}
            setCurrentSong={handleSongSelect}
          />
        </div>

        {activeTab === 'favorites' && (
          <div className="w-1/6 fixed top-0 right-0 h-full p-4">
            <Favorites />
          </div>
        )}
      </div>
    </ApolloProvider>
  );
};

export default MusicApp;
