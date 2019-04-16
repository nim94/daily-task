const bcrypt = require('bcrypt');

const Mutations = {
  
  async Signup(root, { name, mail, psw }, ctx = context, info) {
    const user = await ctx.db.query.users({ where: { name } });
    if( user ) throw new Error('user already exists');
    else {
      await bcrypt.hash(psw, 10, (err, hash) => {
        if(err) return 'Error while crypting password: ' + err;
        psw = hash;
      }); 
      const signup = await ctx.db.mutation.createUser({
        data: {
          name,
          mail,
          psw
        }
      }, info);
      return signup ;
    }
  },

  async Login(root, { name, mail, psw }, ctx = context, info) {
    const user = await ctx.db.query.users({ where: { name } } || { where: { mail } });
    if( !user ) throw new Error('not existing user');
    else { 
        await bcrypt.compare(psw, user.psw, (err) => {
            if(err) return 'Error while decrypting password:' + err;
        });
        return { user };   
    }
}
  
  /* async createThing(parent, args, ctx, info) {
    const thing = await ctx.db.mutation.createThing({
      data: {
        ...args
      }
    }, info);

    return thing;
  } */
};

module.exports = Mutations;
