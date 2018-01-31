const { GraphQLObjectType, GraphQLString, GraphQLInt } = require('graphql');

const episodeType = new GraphQLObjectType({
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
    nextEpisode: {
      type: episodeType,
      description: 'The next episode in the current season',
    },
    number: {
      type: GraphQLInt,
      description: 'The number of the episode',
    },
    seasonNumber: {
      type: GraphQLInt,
      description: 'The number of the season the episode is in'
    }
  }),
});

exports.episodeType = episodeType;
