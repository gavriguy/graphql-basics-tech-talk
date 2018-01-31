const { GraphQLObjectType, GraphQLString, GraphQLInt } = require('graphql');

const EpisodeType = new GraphQLObjectType({
  name: 'Episode',
  description: 'Describes the schema of a episode.',
  fields: () => ({
    title: {
      type: GraphQLString,
      description: 'The title of the show.',
    },
    about: {
      type: GraphQLString,
      description: 'About the show.',
    },
    number: {
      type: GraphQLInt,
      description: 'The number of the episode',
    },
    seasonNumber: {
      type: GraphQLInt,
      description: 'The number of the season the episode is in',
    },
    nextEpisode: {
      type: EpisodeType,
      description: 'The next episode in the current season',
    },
  }),
});

exports.EpisodeType = EpisodeType;
