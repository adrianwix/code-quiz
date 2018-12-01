import buildRoutes from './buildRoutes';

export default {
  getSiteData: () => ({
    title: 'Code Quiz',
  }),
  getRoutes: () => {
    const routes = buildRoutes();

    console.log('Routes:');
    console.log(routes);

    return routes;
  },
};
