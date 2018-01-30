var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
const R = require('ramda');

const show1 = {
  title: 'show1',
  id: '1',
  relatedShowId: '2',
};

const show2 = {
  title: 'show2',
  id: '2',
  relatedShowId: '1',
};

const shows = [show1, show2];

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`

  type Show {
    title: String,
    id: String,
    relatedShow: Show
  }

  type Query {
    allShows: [Show]
    show(id: String): Show
  }
`);

const show = async ({ id }) => {
  const myShow = R.find(R.propEq('id', id))(shows);
  const relatedShow = R.find(R.propEq('id', myShow.relatedShowId))(shows);
  return {
    title: myShow.title,
    id: myShow.id,
    relatedShow: () => show({ id: relatedShow.id }),
  };
};

var root = {
  allShows: () => {
    return R.map(myShow => show({ id: myShow.id }))(shows);
  },
  show,
};

var app = express();
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }),
);
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
