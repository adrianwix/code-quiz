import React from 'react';
import { extractStyles } from 'evergreen-ui';
import buildRoutes from './buildRoutes';

export default {
  beforeRenderToHtml: (render, Comp, meta) => {
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

    // console.log('Routes:', routes);

    return [
      ...routes,
      {
        path: '/',
        component: 'src/components/pages/Home',
      },
    ];
  },
};
