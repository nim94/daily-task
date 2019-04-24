
const Queries = {

  async getTaskList(root, { name, begin, end }, ctx) {
    const date = begin.getTime() <= begin.getTime() && end.getTime() >= end.getTime();
    if( date )
      return await ctx.db.query.tasks({ where: { name } });
  },

  async getUser(root, { name }, ctx) {
    return await ctx.db.query.user({ where: { name } });
  }

}

module.exports = Queries;