const R = require('ramda');

const shows = [
  {
    id: '1',
    title: 'Homeland',
    about: `A bipolar CIA operative becomes convinced a prisoner of war has been turned by al-Qaeda and is planning to carry out a terrorist attack on American soil.`,
    seasons: [
      {
        number: 1,
        year: '2011',
        episodes: [
          {
            title: 'Pilot',
            about: `Eight years after being listed as missing in action and presumed dead in Iraq, Marine Corps Sgt. Nicholas Brody is found alive in an Al Qaeda prison. He returns home to a hero's welcome and begins reconnecting with his family. His wife Jessica welcomes him back while his daughter Dana has only a slim memory of him. Son Chris doesn't remember him at all. He's not aware that his wife had begun a serious relationship with his best friend. Meanwhile, CIA agent Carrie Mathison has been back in Washington for 10 months after a tour of duty in Iraq that ended when she bribed...`,
          },
          {
            title: 'Grace',
            about: `Virgil and Carrie's illegal surveillance of the Brody home is covered for a month by a dodgy court order Saul Berenson gets from 'vulnerable' judge Jeffrey Turner. Unfortunately Carrie's surveillance crew failed to install cameras in the garage, where Nicholas piously performs Muslim prayers. Inside, he's rather aloof with his family and suffers torture nightmares during which he hurtfully grabs his wife. Young son Chris bravely handles witnessing the sergeant decking a provocative reporter with a single throat punch. The theory his hand twitches are a code is ...`,
          },
          {
            title: 'Clean Skin',
            about: `Nicholas Brody quickly proves himself a welcome father for already doting son Chris and even brat Dana, who for his sake swallows her objections to a "hero's perfect family" TV show, despite her mother's adultery. Prince Farid Bin Abbud nearly catches Lynne Reed copying his cellphone, which yields no information about financial transactions the CIA hopes to trace, and gives her a precious diamond necklace. Since the CIA refused to provide a protection team and Carrie and Virgil fail to trace her in time, her murderer can easily escape with the necklace. As Saul ...`,
          },
        ],
      },
    ],
  },
];

function getAllShows() {
  return R.map(({ id, title, about }) => ({ id, title, about }))(shows);
}

const mapIndexed = R.addIndex(R.map);

function createEpisode({ index, episodes, seasonNumber }) {
  const episode = episodes[index];
  if (!episode) return;
  return {
    title: episode.title,
    about: episode.about,
    number: index + 1,
    seasonNumber: seasonNumber,
    nextEpisode: () => createEpisode({ index: index + 1, episodes, seasonNumber }),
  };
}

function getEpisodesByShowIdAndSeasonNumber({ showId, seasonNumber }) {
  const episodes = R.compose(
    R.path(['episodes']),
    R.find(R.propEq({ number: seasonNumber })),
    R.path(['seasons']),
    R.find(R.propEq({ id: showId })),
  )(shows);
  return mapIndexed((_episode, index) => createEpisode({ index, episodes, seasonNumber }))(
    episodes,
  );
}

exports.getAllShows = getAllShows;
exports.getEpisodesByShowIdAndSeasonNumber = getEpisodesByShowIdAndSeasonNumber;
