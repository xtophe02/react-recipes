export const resolvers = {
  Query: {
    hello: () => 'hello world',
    getAllRecipes: async (_: any, __: any, { Recipe }: any) =>
      await Recipe.find(),
  },
  Mutation: {
    addRecipe: async (_: any, { data }: any, { Recipe }: any) =>
      await new Recipe({ ...data }).save(),
  },
};
