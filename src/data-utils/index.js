const R = require('ramda');
const { getShows, getSeasons, getEpisodes } = require('../data');

const mapIndexed = R.addIndex(R.map);

async function getAllShows() {
  const shows = await getShows();
  return R.map(({ id, title, about }) => ({
    id,
    title,
    about,
    seasons: async () => {
      const seasons = await getSeasons({ showId: id });
      return R.map(async ({ number, year }) => {
        return {
          number,
          year,
          episodes: async () => {
            const episodes = await getEpisodes({ showId: id, seasonNumber: number });
            return mapIndexed((_episode, index) =>
              renderEpisode({ index, episodes, seasonNumber: number }),
            )(episodes);
          },
        };
      })(seasons);
    },
  }))(shows);
}

function renderEpisode({ index, episodes, seasonNumber }) {
  const episode = episodes[index];
  if (!episode) return;
  return {
    title: episode.title,
    about: episode.about,
    number: index + 1,
    seasonNumber: seasonNumber,
    nextEpisode: () => renderEpisode({ index: index + 1, episodes, seasonNumber }),
  };
}

exports.getAllShows = getAllShows;
