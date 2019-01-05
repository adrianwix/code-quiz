import path from 'path';

const alias = {
  containers: path.resolve(__dirname, './src/components/containers'),
  presentational: path.resolve(__dirname, './src/components/presentational'),
  store: path.resolve(__dirname, './src/store'),
  actions: path.resolve(__dirname, './src/store/actions'),
  reducers: path.resolve(__dirname, './src/store/reducers'),
  styles: path.resolve(__dirname, './src/styles'),
  public: path.resolve(__dirname, './public'),
};

export default pluginOptions => ({
  webpack: config => {
    config.resolve.alias = alias;
    return config;
  },
});
