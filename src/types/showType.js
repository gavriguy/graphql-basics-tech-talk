const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = require('graphql');
const { SeasonType } = require('./SeasonType');

const ShowType = new GraphQLObjectType({
  name: 'Show',
  description: 'Describes the schema of a show.',
  fields: {
    id: {
      type: GraphQLID,
      description: 'The ID of the show',
    },
    title: {
      type: GraphQLString,
      description: 'The title of the show.',
    },
    about: {
      type: GraphQLString,
      description: 'About the show.',
    },
    seasons: {
      type: new GraphQLList(SeasonType),
      description: 'The seasons of the show.'
    },
  },
});

exports.ShowType = ShowType;
