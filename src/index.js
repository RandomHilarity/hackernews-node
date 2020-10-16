const { graphQLServer, GraphQLServer } = require('graphql-yoga');

const typeDefs = `
  type Query {
    info: String!
    feed: [Link!]!
  }
  type Link {
    id: ID!
    description: String!
    url: String!
  }
`

const resolvers = {
  Query: {
    info: () => `Hackernews Clone`,
    feed: () => links,
  },
  Link: {
      id: (parent) => parent.id,
      description: (parent) => parent.description,
      url: (parent) => parent.url
  }
};

// dummy data for testing
let links = [{
    id: 'link-0',
    url: 'www.hotographql.com',
    description: 'Fullstack tutorial for GraphQL'
}];

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => console.log(`Server running on http://localhost:4000`))