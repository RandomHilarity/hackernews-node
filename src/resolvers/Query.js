function info() {
  return 'Hackernews Clone';
};
function feed(parent, args, context) {
  return context.prisma.link.findMany();
};
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