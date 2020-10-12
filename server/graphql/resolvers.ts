import jwt from 'jsonwebtoken';
import { Cookies } from '../utils/cookies';
import { Password } from '../utils/password';
import mongoose from 'mongoose';

const createToken = (user: any, secret: any, expiresIn: any) => {
  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn });
};

export const resolvers = {
  User: {
    favorites: async (root: any, _: any, { Recipe }: any) =>
      await Recipe.find({ _id: { $in: root.favorites } }),
  },
  Recipe: {
    author: async (root: any, _: any, { user, User }: any) =>
      await User.findById({ _id: root.author }),
  },
  Query: {
    hello: (_: any, __: any, { res }: any) => 'hello world',
    getAllRecipes: async (_: any, __: any, { Recipe }: any) => {
      const teste = await Recipe.find().sort({ createdDate: 'desc' });

      return teste;
    },

    getRecipe: async (_: any, { id }: any, { Recipe }: any) =>
      await Recipe.findById(id),

    currentUser: async (_: any, __: any, { user, User }: any) => {
      if (!user) {
        return null;
      }
      const currentUser = await User.findById({ _id: user.id });
      return currentUser;
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
      await Recipe.find({ username: user.username }).sort({
        createdDate: 'desc',
      }),
  },
  Mutation: {
    addRecipe: async (_: any, { data }: any, { Recipe, user }: any) =>
      await new Recipe({ ...data, author: user.id }).save(),
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
      const userFavorites = await User.findById({ _id: user.id });

      const found = userFavorites.favorites.find(
        (recipe: string) => recipe.toString() === id
      );
      const session = await Recipe.startSession();
      session.startTransaction();
      let recipe;
      if (found) {
        try {
          recipe = await Recipe.findByIdAndUpdate(id, { $inc: { likes: -1 } });

          const newFavorites = userFavorites.favorites.filter(
            (recipe: string) => recipe.toString() !== id.toString()
          );

          userFavorites.favorites = newFavorites;

          await userFavorites.save();
          await session.commitTransaction();
        } catch (error) {
          await session.abortTransaction();
          console.log(error);
        } finally {
          await session.endSession();
          return recipe;
        }
      }
      try {
        recipe = await Recipe.findByIdAndUpdate(id, { $inc: { likes: 1 } });

        userFavorites.favorites.push(id);

        await userFavorites.save();
        await session.commitTransaction();
      } catch (error) {
        await session.abortTransaction();
        console.log(error);
      } finally {
        await session.endSession();
        return recipe;
      }
    },
  },
};
