const { GraphQLObjectType, GraphQLID, GraphQLString } = require('graphql');

const showType = new GraphQLObjectType({
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
  },
});

exports.showType = showType;
