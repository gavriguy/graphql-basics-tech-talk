const R = require('ramda');
const { shows } = require('../data');

function getAllShows() {
  return R.map(({ id, title, about }) => ({ id, title, about }))(shows);
}

const mapIndexed = R.addIndex(R.map);

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
