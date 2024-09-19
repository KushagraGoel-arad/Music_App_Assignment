"use client";
import { gql, useQuery } from '@apollo/client';

const NEW_RELEASES_QUERY = gql`
  query GetNewReleases {
    newReleaseSongs {
      id
      name
      image
    }
  }
`;

const NewReleases = () => {
  const { loading, error, data } = useQuery(NEW_RELEASES_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const releases = data.newReleaseSongs;
  console.log('New releases data:', releases);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">New Releases</h2>
      <div className="grid grid-cols-4 gap-4">
        {releases.map((release) => (
          <div key={release.id} className="text-center">
            <img src={release.image} alt={release.name} className="w-full h-48 object-cover rounded-lg" />
            <p className="mt-2">{release.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewReleases;
