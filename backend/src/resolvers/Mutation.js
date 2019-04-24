const bcrypt = require('bcrypt');

const Mutations = {
  
  async Signup(_, { name, mail, psw }, ctx = context) {
    const user = await ctx.db.query.users();
    for( let i = 0; i < user.length; i++ )
      if( user[i].name == name )  
        throw new Error('user already exists');
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
    });
    return signup;
  },

  async Login(_, { name, mail, psw }, ctx = context) {
    let thisUser = {};
    const user = await ctx.db.query.users();
    for( let i = 0; i < user.length; i++ )
      if( (user[i].name == name) || (user[i].mail == mail) )  
        thisUser = user[i];
    if( !thisUser ) throw new Error('not existing user');
    else { 
        await bcrypt.compare(psw, user.psw, (err) => {
            if(err) return 'Error while decrypting password:' + err;
        });
        return thisUser;   
    } 
}

};

module.exports = Mutations;
