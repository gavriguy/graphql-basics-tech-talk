const R = require('ramda');
const { shows } = require('../data');

const mapIndexed = R.addIndex(R.map);

function getAllShows({ id }) {
  const filteredShows = id ? R.filter(R.propEq('id', id))(shows) : shows;
  return R.map(({ id, title, about, seasons }) => ({
    id,
    title,
    about,
    seasons: () =>
      R.map(season => ({
        number: season.number,
        year: season.year,
        episodes: () =>
          mapIndexed((_episode, index) =>
            renderEpisode({ index, episodes: season.episodes, seasonNumber: season.number }),
          )(season.episodes),
      }))(seasons),
  }))(filteredShows);
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

function getEpisodesByShowIdAndSeasonNumber({ showId, seasonNumber }) {
  const episodes = R.compose(
    R.path(['episodes']),
    R.find(R.propEq('number', seasonNumber)),
    R.path(['seasons']),
    R.find(R.propEq('id', showId)),
  )(shows);
  return mapIndexed((_episode, index) => renderEpisode({ index, episodes, seasonNumber }))(
    episodes,
  );
}

exports.getAllShows = getAllShows;
exports.getEpisodesByShowIdAndSeasonNumber = getEpisodesByShowIdAndSeasonNumber;
