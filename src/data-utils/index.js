const R = require('ramda');
const DataLoader = require('dataloader');
const {
  batchGetShows,
  batchGetSeasons,
  batchGetEpisodes,
  batchGetEpisodeByIndex,
} = require('../api');

const getShowsLoader = new DataLoader(batchGetShows);
const getsSeasonsLoader = new DataLoader(batchGetSeasons);
const getEpisodesLoader = new DataLoader(batchGetEpisodes);
const getEpisodeByIndexLoader = new DataLoader(batchGetEpisodeByIndex);

const mapIndexed = R.addIndex(R.map);

async function getAllShows() {
  const shows = await getShowsLoader.load(true);
  return R.map(({ id, title, about }) => ({
    id,
    title,
    about,
    seasons: async () => {
      const seasons = await getsSeasonsLoader.load(id);
      return R.map(async ({ number, year }) => {
        return {
          number,
          year,
          episodes: async () => {
            const episodes = await getEpisodesLoader.load(`${id}/${number}`);
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
  const episode = await getEpisodeByIndexLoader.load(`${showId}/${seasonNumber}/${index}`);
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
