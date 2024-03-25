/**
 * A set of functions called "actions" for `blogpost-views`
 */

export default {
  get: async (ctx) => {
    const { filters } = ctx.query;

    if (!Array.isArray(filters?.id?.$in))
      return ctx.badRequest("Can't get blogpost views", { moreDetails: 'filters is required' });

    try {
      ctx.body = {
        data: await strapi.service('api::blogpost-views.blogpost-views').getMany(filters),
      };
    } catch (err) {
      ctx.badRequest("Can't get blogpost views", { moreDetails: err });
    }
  },

  increment: async (ctx) => {
    const { id } = ctx.request.body;

    if (!id) {
      return ctx.badRequest("Can't increment blogpost views", {
        moreDetails: 'id param is required',
      });
    }

    try {
      ctx.body = { data: await strapi.service('api::blogpost-views.blogpost-views').increment(id) };
    } catch (err) {
      ctx.badRequest("Can't increment blogpost views", { moreDetails: err });
    }
  },
};
