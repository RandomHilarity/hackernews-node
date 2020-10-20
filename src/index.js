const { graphQLServer, GraphQLServer } = require('graphql-yoga');

// dummy data for testing
let links = [{
    id: 'link-0',
    url: 'www.hotographql.com',
    description: 'Fullstack tutorial for GraphQL'
}];

let idCount = links.length;

const resolvers = {
  Query: {
    info: () => `Hackernews Clone`,
    feed: () => links,
    link: (parent, args) => links.find(link => link.id === args.id)
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      }
      links.push(link);
      return link;
    },
    updateLink: (parent, args) => {
      let link = links.find(link => link.id === args.id)
      if(!link) { throw new Error('no link with id: ' + args.id)}

      links.find((x, i) => {
          if (x.id === args.id) {
              links[i] = {...links[i], ...args}
              link = links[i]
          }
      });

      return link;       
    },
    deleteLink: (parent, args) => {    
      let link = links.find(link => link.id === args.id)
      if(!link) { throw new Error('no link with id: ' + args.id)}

      links.find((x, i) => {
        if (x.id === args.id) { links.splice(i, 1) }
      })
      return link;
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
});

server.start(() => console.log(`Server running on http://localhost:4000`))