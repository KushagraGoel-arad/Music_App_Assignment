const allSongs = [
  {
    id: 1,
    name: 'Flow',
    artist: 'Loksii',
    album: 'Silk and Beats',
    release: '2019',
    image: '/artist-images/loksii.png',
    song_url:"/songs/flow.mp3",
  },
  {
    id: 2,
    name: 'Better Day',
    artist: 'Penguins Music',
    album: 'Better Day',
    release: '2021',
    image: '/artist-images/penguinsmusic.png',
    song_url:"/songs/better-day.mp3",
  },
  {
    id:3,
    name: 'Groovy Ambient Funk',
    artist: 'Mood Mode',
    album: 'Mode of the Mood',
    release: '2019',
    image: '/artist-images/moodmode.png',
    song_url:"/songs/groovy-ambient-funk.mp3",
  },
  {
    id:4,
    name: 'Perfect Beauty',
    artist: 'Good B Music',
    album: 'Jazz Collection',
    release: '2018',
    image: '/artist-images/goodbmusic.png',
    song_url:"/songs/perfect-beauty.mp3",
  },
  {
    id:5,
    name: 'Solitude Dark Ambient Electronic',
    artist: 'Luca Francini',
    album: 'Heights of the New',
    release: '2020',
    image: '/artist-images/lucafrancini.png',
    song_url:"/songs/solitude-dark-ambient-electronic.mp3",
  },

]

const recentSongs = allSongs.slice(0, 1)

const favoriteSongs = allSongs.slice(1, 2)

const newReleaseSongs = allSongs.slice(0, 1)

const resolvers = {
  Query: {
    async allSongs(root, args) {
      return allSongs
    },
    async recentSongs(root, args) {
      return recentSongs
    },
    async favoriteSongs(root, args) {
      return favoriteSongs
    },
    async newReleaseSongs(root, args) {
      return newReleaseSongs
    },
  },
};

export default resolvers;
