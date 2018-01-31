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
      {
        number: 2,
        year: '2012',
        episodes: [
          {
            title: 'The Smile',
            about: `An asset from Carrie's former life comes in from the cold. Freshman Congressman Nick Brody discovers that Abu Nazir may not be content with his nonviolent approach to affecting change in American foreign policy.`,
          },
          {
            title: 'Beirut Is Back',
            about: `Before she makes it to a safe house, Carrie interviews the wife of a Lebanese official on her own, learning that Abu Nazir will be in Beirut the next day. Estes and Saul are skeptical, fearing that the CIA is being set up; Carrie believes the informant. Back in D.C., Dana makes an unexpected friend, Jessica takes a step into political high society, Brody's Army buddies want him to get to the bottom of why the unerring Tom Walker missed when he shot at the Vice President, and Brody gets an invitation to the Pentagon. Will Nazir show up, or is it an ambush. How will ...`,
          },
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'Twin Peaks',
    about: `Picks up 25 years after the inhabitants of a quaint northwestern town are stunned when their homecoming queen is murdered.`,
    seasons: [
      {
        number: 1,
        year: '2017',
        episodes: [
          {
            title: 'Part 1',
            about: `A man observes a mysterious glass box, South Dakota police discover a hideous crime and Hawk receives a cryptic message about Special Agent Dale Cooper.`,
          },
        ],
      },
    ],
  },
];

function pause(duration = 200) {
  return new Promise(resolve => {
    setTimeout(function() {
      resolve();
    }, duration);
  });
}

async function getShows() {
  await pause();
  return R.map(({ id, title, about }) => ({ id, title, about }))(shows);
}

async function getSeasons({ showId }) {
  await pause();
  return R.compose(R.path(['seasons']), R.find(R.propEq('id', showId)))(shows);
}

async function getEpisodes({ showId, seasonNumber }) {
  await pause();
  const seasons = await getSeasons({ showId });
  return R.compose(R.path(['episodes']), R.find(R.propEq('number', seasonNumber)))(seasons);
}

async function getEpisodeByIndex({ showId, seasonNumber, index }) {
  await pause();
  const episodes = await getEpisodes({ showId, seasonNumber });
  return episodes[index];
}

exports.getShows = getShows;
exports.getSeasons = getSeasons;
exports.getEpisodes = getEpisodes;
exports.getEpisodeByIndex = getEpisodeByIndex;
