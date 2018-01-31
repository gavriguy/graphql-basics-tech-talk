const R = require('ramda');
const { getShows, getSeasons, getEpisodes, getEpisodeByIndex } = require('../api');

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
            return mapIndexed(
              async (_episode, index) =>
                await renderEpisode({ showId: id, seasonNumber: number, index }),
            )(episodes);
          },
        };
      })(seasons);
    },
  }))(shows);
}

async function renderEpisode({ showId, seasonNumber, index }) {
  const episode = await getEpisodeByIndex({ showId, seasonNumber, index });
  if (!episode) return;
  return {
    title: episode.title,
    about: episode.about,
    number: index + 1,
    seasonNumber: seasonNumber,
    nextEpisode: () => renderEpisode({ showId, seasonNumber, index: index + 1 }),
  };
}

exports.getAllShows = getAllShows;
