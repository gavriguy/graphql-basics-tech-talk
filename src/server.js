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
const { ShowType, EpisodeType } = require('./types');
const { getAllShows, getEpisodesByShowIdAndSeasonNumber } = require('./data-utils');

const queryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'The root query type.',
  fields: {
    shows: {
      type: new GraphQLList(ShowType),
      description: 'Get a list of shows',
      resolve: (_, args) => getAllShows(args),
      args: {
        id: {
          type: GraphQLString,
          description: 'Filter shows by thier ID',
        },
      },
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
