import React from 'react';
import { extractStyles } from 'evergreen-ui';
import path from 'path';
import buildRoutes from './buildRoutes';
import frontmatter from './frontmatter';

const alias = {
  containers: path.resolve(__dirname, './src/components/containers'),
  presentational: path.resolve(__dirname, './src/components/presentational'),
  store: path.resolve(__dirname, './src/store'),
  actions: path.resolve(__dirname, './src/store/actions'),
  reducers: path.resolve(__dirname, './src/store/reducers'),
  styles: path.resolve(__dirname, './src/styles'),
  public: path.resolve(__dirname, './public'),
};

export default {
  renderToHtml: (render, Comp, meta) => {
    const { css, hydrationScript } = extractStyles();
    // The styles are collected from each page component
    const html = render(<Comp />);
    // The collected page styles are stored in `meta`
    meta.styleTags = css;
    meta.hydrationScript = hydrationScript;
    // Return the html string for the page
    return html;
  },
  Document: ({ Html, Head, Body, children, renderMeta }) => (
    // `renderMeta.styleTags` contains the styles we need to inject
    // into the head of each page.
    <Html>
      <Head>
        <title>Code Quiz</title>
        <style id="evergreen-css" dangerouslySetInnerHTML={{ __html: renderMeta.styleTags }} />
        {renderMeta.hydrationScript}
      </Head>
      <Body>{children}</Body>
    </Html>
  ),
  getSiteData: () => ({
    title: 'Code Quiz',
  }),
  getRoutes: () => {
    const routes = buildRoutes();

    console.log('Routes:');
    console.log(routes);

    return [
      ...routes,
      {
        path: '/',
        component: 'src/components/pages/Home',
      },
      frontmatter,
    ];
  },
  webpack: config => {
    config.resolve.alias = alias;
    return config;
  },
};
