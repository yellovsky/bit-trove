/**
 * blogpost-views service
 */

export default () => ({
  increment: async (blogpostID) => {
    const founded = await strapi.entityService.findOne('api::blogpost.blogpost', blogpostID);
    const updated = await strapi.entityService.update('api::blogpost.blogpost', blogpostID, {
      data: { views_count: (+founded.views_count || 0) + 1 },
    });

    return { id: blogpostID, attributes: { views_count: updated.views_count } };
  },

  getMany: (filters) =>
    strapi.entityService
      .findMany('api::blogpost.blogpost', { fields: ['views_count'], filters })
      .then((founded) =>
        founded.map(({ id, views_count }) => ({ id, attributes: { views_count: +views_count } }))
      ),
});
