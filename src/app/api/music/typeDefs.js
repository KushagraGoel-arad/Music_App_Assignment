
const typeDefs = `#graphql

  type Song {
      id: Int!
      name: String!
      artist: String
      album: String!
        release: String!
        image: String!
        song_url: String!

  }
  
  type Query {
      allSongs: [Song!]!
        recentSongs: [Song!]!
        favoriteSongs: [Song!]!
        newReleaseSongs: [Song!]! 
  }
`;

export default typeDefs