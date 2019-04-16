
const Queries = {

async Task(root, { name, begin, end, userId }, ctx) {
    const task = await ctx.db.query.tasks({ where: { name, userId } });
    return task;
  }
}

module.exports = Queries;