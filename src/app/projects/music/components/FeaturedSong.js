import { useQuery, gql } from '@apollo/client';
import Header from './Header';
import Image from "next/image";
const FEATURED_SONG_QUERY = gql`
  query {
    newReleaseSongs {
      name
      artist
      album
      release
      image
      song_url
    }
  }
`;

const FeaturedSong = ({ currentSong, setCurrentSong }) => {
  const { loading, error, data } = useQuery(FEATURED_SONG_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error(error);
    return <p>Error: {error.message}</p>;
  }


  const song = currentSong || data?.newReleaseSongs?.[0];

  return (
    <div className="relative h-72 bg-black text-white rounded-lg overflow-hidden z-40">
      {song && (
        <>
          
          <Image
            src={song.image}
            alt={song.name}
            className="absolute inset-0 h-full w-full object-cover opacity-60"
          />

          
          <div className="absolute top-6 right-6 z-30">
            <p className="text-xl uppercase text-gray-300 tracking-widest">Featured Songs</p>
          </div>

         
          <Header onSongSelect={setCurrentSong} /> 

         
          <div className="absolute bottom-6 right-6 z-10">
            <h2 className="text-4xl font-bold">{song.artist}</h2>
            <p className="text-2xl">{song.name}</p>

            
            <button
              className="mt-4 px-6 py-2 bg-red-500 text-white font-bold text-lg rounded-lg hover:bg-red-600 transition duration-300 ease-in-out shadow-lg"
              onClick={() => setCurrentSong(song)}
            >
              Play
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default FeaturedSong;
