"use client";
import { gql, useQuery } from '@apollo/client';
import Image from 'next/image'; 


const FAVORITE_SONGS_QUERY = gql`
  query GetFavoriteSongs {
    favoriteSongs {
      id
      name
      artist
      album
      release
      song_url
      image
    }
  }
`;

const Favorites = () => {
  const { loading, error, data } = useQuery(FAVORITE_SONGS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const favorites = data.favoriteSongs;
  console.log('Favourite:', favorites)

  return (
    <div className="favorites">
      <h2 className="text-white font-bold text-xl mb-4">Your Favorites</h2>
      <ul className="space-y-4">
        {favorites.map((song, index) => (
          <li 
            key={song.id} 
            className="flex items-center justify-between p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
         
            <div className="flex items-center space-x-3">
            
              <span className="text-gray-400 w-6">{index + 1}</span>

             
              <Image 
                src={song.image} 
                alt={song.name} 
                width={40} 
                height={40} 
                className="rounded-lg"
              />

             
              <div>
                <p className="font-semibold text-white">{song.name}</p>
                <p className="text-gray-400 text-sm">{song.artist}</p>
              </div>
            </div>

            <span className="text-gray-400">{song.release}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;

