function info() {
  return 'Hackernews Clone';
};

async function feed(parent, args, context, info) {
  const where = args.filter ? {
    OR: [
      { description: { contains: args.filter } },
      { url: { contains: args.filter } },
    ]
  } : {};
  
  const links = await context.prisma.link.findMany({
    where,
    skip: args.skip,
    take: args.take,
    orderBy: args.orderBy
  });
  
  return links
}

function link(parent, args, context) {
  return context.prisma.link.findOne({
    where: { id: args.id }
  });
};

module.exports = {
    info,
    feed,
    link
};