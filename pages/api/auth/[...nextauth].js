import bcrypt from "bcryptjs";
import nextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials';
import db from "@/utils/db";
import User from "@/models/user";

export default nextAuth({
  session : {
    strategy:'jwt',
  },
  callbacks:{
    async jwt ({user, token}){
      if(user?.id) token._id= user._id;
      if (user?.isAdmin) token.isAdmin = user.isAdmin; 
        return token;
    },
    async session({session, token}){
      if(token?._id) session.user._id= token._id;
      if(token?.isAdmin) session.user.isAdmin = token.isAdmin;
      return session
    }
  },
  providers: [
    CredentialsProvider({
      async authorize (credentials){
        await db.connect();
       const user = await User.findOne({
        email: credentials.email,
       });
    
        await db.disconnect();
        if(user && bcrypt.compareSync(credentials.password, user.password)){
          return{
            _id: user._id,
            name: user.name,
            email: user.email,
            image: 'f',
            isAdmin: user.isAdmin,

          };
        }
          throw new Error('Invalid Email && Password');
      },
    }),
  ],
});