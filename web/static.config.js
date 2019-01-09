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
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
          integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
          crossorigin="anonymous"
        />
      </Head>
      <Body>
        {children}
        <script
          src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
          integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
          crossorigin="anonymous"
        />
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"
          integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
          crossorigin="anonymous"
        />
        <script
          src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"
          integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy"
          crossorigin="anonymous"
        />
      </Body>
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
