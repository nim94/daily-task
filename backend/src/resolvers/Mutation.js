const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { forwardTo } = require('prisma-binding');

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
    const token = jwt.sign({name,mail}, process.env.APP_SECRET, { expiresIn: '365d' });
    const signup = await ctx.db.mutation.createUser({
      data: {
        name,
        mail,
        psw,
        token
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
      await bcrypt.compare(psw, thisUser.psw, (err) => {
          if(err) return 'Error while decrypting password:' + err;
      });
      if( thisUser.token ){
        if( !jwt.verify( thisUser.token, process.env.APP_SECRET ).name == thisUser.name ||
            !jwt.verify( thisUser.token, process.env.APP_SECRET ).mail == thisUser.mail 
          ) {
            throw new Error('Invalid token');
        }
      }
      else {
        thisUser.token = jwt.sign({name,mail}, process.env.APP_SECRET, { expiresIn:  '365d' });
        await ctx.db.mutation.updateUser({ token: thisUser.token }, { where: { id: thisUser.id } });
      }
      thisUser.token = jwt.sign( { token: thisUser.token, id: thisUser.id }, process.env.APP_SECRET, { expiresIn: '1d' } );
      return thisUser;   
    } 
  },

  async createTask() {
    await forwardTo('db')
  },

  async deleteUser(){
    await forwardTo('db')
  },

};

module.exports = Mutations;
