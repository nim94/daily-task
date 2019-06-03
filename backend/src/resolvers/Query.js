
// const { forwardTo } = require('prisma-binding');
const jwt = require('jsonwebtoken');

const Queries = {

  async getTaskList(_, { begin, end, userId }, ctx) {
    const date = begin.getTime() <= begin.getTime() && end.getTime() >= end.getTime();
    return await ctx.db.query.tasks( {where: { userId }} ).filter(date);
  },

  async getUserFromToken(_, { token }, ctx) {
    const thisToken = jwt.verify( token, process.env.APP_SECRET )
    return await ctx.db.query.user( { where: { id: thisToken.id } } )
  }

}

module.exports = Queries;