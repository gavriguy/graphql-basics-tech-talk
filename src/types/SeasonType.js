const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } = require('graphql');
const { EpisodeType } = require('./EpisodeType');

const SeasonType = new GraphQLObjectType({
  name: 'Season',
  description: 'Describes the schema of a season show.',
  fields: {
    number: {
      type: GraphQLInt,
      description: 'The season number',
    },
    year: {
      type: GraphQLString,
      description: 'The year the season was created',
    },
    episodes: {
      type: new GraphQLList(EpisodeType),
      description: 'The season episodes',
    },
  },
});

exports.SeasonType = SeasonType;
