 "use client";
import { gql, useQuery } from '@apollo/client';
import { useEffect } from 'react';

const RECENTLY_PLAYED_QUERY = gql`
  query GetRecentSongs {
    recentSongs {
      id
      name
      artist
      album
      release
    }
  }
`;

const RecentlyPlayed = ({ refetchRecentSongs, onRefetchComplete }) => {
  const { loading, error, data, refetch } = useQuery(RECENTLY_PLAYED_QUERY, {
    notifyOnNetworkStatusChange: true, 
  });

  useEffect(() => {
    if (refetchRecentSongs) {
      refetch()
        .then(({ data: updatedData }) => {
          console.log('Recently Played refetched:', updatedData?.recentSongs); 
          if (typeof onRefetchComplete === 'function') {
            onRefetchComplete();  
          }
        })
        .catch((error) => console.error('Error refetching recently played:', error));
    }
  }, [refetchRecentSongs, refetch, onRefetchComplete]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const recentlyPlayed = data?.recentSongs || [];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Recently Played</h2>
      <table className="table-auto w-full text-left">
        <thead>
          <tr className="text-gray-500">
            <th>#</th>
            <th>Title</th>
            <th>Artist</th>
            <th>Album</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {recentlyPlayed.length > 0 ? (
            recentlyPlayed.map((song, index) => (
              <tr key={song.id}>
                <td>{index + 1}</td>
                <td>{song.name}</td>
                <td>{song.artist}</td>
                <td>{song.album}</td>
                <td>{song.release}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No recently played songs</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RecentlyPlayed;
