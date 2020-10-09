import jwt from 'jsonwebtoken';
import { Cookies } from '../utils/cookies';
import { Password } from '../utils/password';

const createToken = (user: any, secret: any, expiresIn: any) => {
  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn });
};

export const resolvers = {
  Query: {
    hello: (_: any, __: any, { res }: any) => 'hello world',
    getAllRecipes: async (_: any, __: any, { Recipe }: any) =>
      await Recipe.find().sort({ createdDate: 'desc' }),
    getRecipe: async (_: any, { id }: any, { Recipe }: any) =>
      await Recipe.findById(id),

    currentUser: async (_: any, __: any, { user, User }: any) => {
      console.log(user);
      if (!user) {
        return null;
      }
      return User.findOne({ email: user.email }).populate('favorites');
    },
    searchRecipes: async (_: any, { searchTerm }: any, { Recipe }: any) => {
      if (searchTerm) {
        return Recipe.find(
          { $text: { $search: searchTerm, $caseSensitive: false } },
          { score: { $meta: 'textScore' } }
        ).sort({ score: { $meta: 'textScore' } });
      }
      return Recipe.find().sort({ likes: 'desc', createdDate: 'desc' });
    },
    getUserRecipes: async (_: any, __: any, { Recipe, user }: any) =>
      Recipe.find({ username: user.username }).sort({ createdDate: 'desc' }),
  },
  Mutation: {
    addRecipe: async (_: any, { data }: any, { Recipe, user }: any) =>
      await new Recipe({ ...data, username: user.username }).save(),
    deleteRecipe: async (_: any, { id }: any, { Recipe, user }: any) => {
      try {
        if (!user) {
          throw new Error('need to be logged in');
        }
        return Recipe.findOneAndRemove({
          _id: id,
          username: user.username,
        });
      } catch (error) {
        console.log(error);
      }
    },

    signUp: async (_: any, { data }: any, { User, res }: any) => {
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
      const userJwt = jwt.sign(
        { email: newUser.email, username: newUser.username, id: newUser.id },
        process.env.JWT_SECRET!
      );

      Cookies.setCookie(userJwt, res);

      return newUser;
    },
    signIn: async (_: any, { data }: any, { User, res }: any) => {
      const { email, password } = data;

      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('Invalid credentials email');
      }
      const matchPassword = await Password.compare(user.password, password);
      if (!matchPassword) {
        throw new Error('Invalid credentials pass');
      }
      const userJwt = jwt.sign(
        { email: user.email, username: user.username, id: user.id },
        process.env.JWT_SECRET!
      );

      Cookies.setCookie(userJwt, res);

      return user;
    },
    logout: async (_: any, __: any, { res }: any) => {
      Cookies.removeTokenCookie(res);
      return true;
    },
    likeRecipe: async (_: any, { id }: any, { Recipe, user, User }: any) => {
      if (!user) {
        throw new Error('need to be logged in');
      }
      const recipe = await Recipe.findByIdAndUpdate(id, { $inc: { likes: 1 } });
      console.log(recipe);
      const teste = await User.findByIdAndUpdate(
        { _id: user.id },
        { $addToSet: { favorites: id } }
      );
      console.log(teste);
      return recipe;
    },
  },
};
