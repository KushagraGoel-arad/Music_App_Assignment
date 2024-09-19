// "use client";
// import { gql, useQuery } from '@apollo/client';
// import { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';


// const ALL_SONGS_QUERY = gql`
//   query GetAllSongs {
//     allSongs {
//       id
//       name
//       artist
//       album
//       release
//       image
//       song_url
//     }
//   }
// `;

// const Header = ({ onSongSelect }) => {
//   const { loading, error, data } = useQuery(ALL_SONGS_QUERY);
//   const [searchTerm, setSearchTerm] = useState('');

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   const filteredSongs = data.allSongs.filter(song =>
//     song.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     song.album.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="header p-4 bg-gray-800 text-white">
//       <div className="absolute top-14 left-6 z-30 flex items-center bg-gray-100 rounded-full w-96 h-12 shadow-md border border-gray-200">
//         <FontAwesomeIcon icon={faSearch} className="ml-4 text-gray-400" />
//         <input
//           type="text"
//           placeholder="Search artists, songs, albums..."
//           className="ml-3 w-full bg-transparent focus:outline-none text-gray-900"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       {searchTerm && (
//         <div className="search-results mt-4 bg-gray-900 p-4 rounded-md">
//           {filteredSongs.length > 0 ? (
//             <ul>
//               {filteredSongs.map(song => (
//                 <li
//                   key={song.id}
//                   className="py-2 border-b border-gray-600 cursor-pointer hover:bg-gray-700 rounded-md"
//                   onClick={() => onSongSelect(song)} 
//                 >
//                   <strong>{song.name}</strong> by {song.artist} from album {song.album}
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-gray-400 mt-2">No results found</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Header;

  "use client";
  import { gql, useQuery } from '@apollo/client';
  import { useState } from 'react';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faSearch } from '@fortawesome/free-solid-svg-icons';


  const ALL_SONGS_QUERY = gql`
    query GetAllSongs {
      allSongs {
        id
        name
        artist
        album
        release
        image
        song_url
      }
    }
  `;

  const Header = ({ onSongSelect }) => {
    const { loading, error, data } = useQuery(ALL_SONGS_QUERY);
    const [searchTerm, setSearchTerm] = useState('');

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const filteredSongs = data.allSongs.filter(song =>
      song.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.album.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="header p-4 bg-gray-800 text-white relative">
        {/* Search bar */}
        <div className="absolute top-14 left-6 z-20 flex items-center bg-gray-100 rounded-full w-96 h-12 shadow-md border border-gray-200">
          <FontAwesomeIcon icon={faSearch} className="ml-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search artists, songs, albums..."
            className="ml-3 w-full bg-transparent focus:outline-none text-gray-900"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {searchTerm && (
          <div 
            className="search-results mt-8 bg-gray-700 p-4 rounded-md absolute left-6 w-96 max-h-64 overflow-y-auto z-30 main-content"
            style={{ top: '80px' }} 
          >
            {filteredSongs.length > 0 ? (
              <ul>
                {filteredSongs.map(song => (
                  <li
                    key={song.id}
                    className="py-2 border-b border-gray-600 cursor-pointer hover:bg-gray-700 rounded-md"
                    onClick={() => {
                      console.log('Song clicked:', song);
                      onSongSelect(song)}
                    }
                  >
                    <strong>{song.name}</strong> by {song.artist} from album {song.album}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 mt-2">No results found</p>
            )}
          </div>
        )}
      </div>
    );
  };

  export default Header;
