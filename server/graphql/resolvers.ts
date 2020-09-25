import jwt from 'jsonwebtoken';
import { Password } from '../utils/hashPassword';

const createToken = (user: any, secret: any, expiresIn: any) => {
  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn });
};

export const resolvers = {
  Query: {
    hello: () => 'hello world',
    getAllRecipes: async (_: any, __: any, { Recipe }: any) =>
      await Recipe.find(),
  },
  Mutation: {
    addRecipe: async (_: any, { data }: any, { Recipe }: any) =>
      await new Recipe({ ...data }).save(),
    signUp: async (_: any, { data }: any, { User }: any) => {
      const { username, password } = data;
      const user = await User.findOne({ username });
      if (user) {
        throw new Error('User already exists');
      }
      const hashedPassword = await Password.toHash(password);

      const newUser = await new User({
        ...data,
        password: hashedPassword,
      }).save();
      return { token: createToken(newUser, process.env.JWT_SECRET, '1h') };
    },
  },
};
