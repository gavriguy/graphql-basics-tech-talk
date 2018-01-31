var express = require('express');
var graphqlHTTP = require('express-graphql');
var {
  buildSchema,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
} = require('graphql');
const R = require('ramda');
const { showType, episodeType } = require('./types');
const { getAllShows, getEpisodesByShowIdAndSeasonNumber } = require('./data');

const queryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'The root query type.',
  fields: {
    shows: {
      type: new GraphQLList(showType),
      resolve: getAllShows,
    },
    episodes: {
      type: new GraphQLList(episodeType),
      args: {
        showId: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'The id of the show.',
        },
        seasonNumber: {
          type: new GraphQLNonNull(GraphQLInt),
          description: 'The number of the season',
        },
      },
      resolve: (_, args) => getEpisodesByShowIdAndSeasonNumber(args),
    },
  },
});

const schema = new GraphQLSchema({
  query: queryType,
});

var app = express();
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  }),
);
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
