type Strapi = typeof strapi;

const incrementBlogPostViewsExtension = ({ nexus }) => {
  const sendItemByEmailMutation = nexus.extendType({
    type: 'Mutation',

    definition(t) {
      t.field('incrementBlogPostViews', {
        type: nexus.nonNull('BlogpostEntity'),
        args: { itemID: nexus.nonNull('ID') },
        async resolve(parent, args, context) {
          const { itemID } = args;

          const founded = await strapi.entityService.findOne('api::blogpost.blogpost', itemID);

          return await strapi.entityService.update('api::blogpost.blogpost', itemID, {
            data: { views_count: (+founded.views_count || 0) + 1 },
          });
        },
      });
    },
  });
  return {
    types: [sendItemByEmailMutation],
    resolversConfig: {
      'Mutation.incrementBlogPostViews': {
        auth: false,
      },
    },
  };
};

module.exports = {
  register({ strapi }: { strapi: Strapi }) {
    const extensionService = strapi.plugin('graphql').service('extension');

    extensionService.use(incrementBlogPostViewsExtension);
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {},
};
