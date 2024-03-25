export default {
  routes: [
    {
      method: 'GET',
      path: '/blogpost-views',
      handler: 'blogpost-views.get',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/blogpost-views',
      handler: 'blogpost-views.increment',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
