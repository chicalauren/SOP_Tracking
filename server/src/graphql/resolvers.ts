export const resolvers = {
  Query: {
    sops: async () => {
      return await import('../models/Sop').then(({ default: Sop }) =>
        Sop.find().lean()
      );
    },
  },
};
