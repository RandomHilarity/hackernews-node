const { GraphQLServer } = require('graphql-yoga');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    info: () => `Hackernews Clone`,
    feed: async (parent, args, context) => {
      return context.prisma.link.findMany();
    },
    link: async (parent, args, context) => {
      return context.prisma.link.findOne({
        where: { id: args.id }
      });
    }
  },
  Mutation: {
    post: (parent, args, context, info) => {
      const newLink = context.prisma.link.create({
        data: {
          url: args.url,
          description: args.description
        }
      });
      return newLink;
    },
    updateLink: (parent, args, context, info) => {
      const updatedLink = context.prisma.link.update({
        data: {
          url: args.url,
          description: args.description
        },
        where: { id: Number(args.id) } 
      });
      return updatedLink;
    },    
    deleteLink: (parent, args, context, info) => {    
      const deletedLink = context.prisma.link.delete({
        where: { id: Number(args.id) }
      });
      return deletedLink;
    }   
  }
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
      prisma
  }
});

server.start(() => console.log(`Server running on http://localhost:4000`))