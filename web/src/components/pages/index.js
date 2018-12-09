import React from 'react';
import { withSiteData, Link } from 'react-static';

export default withSiteData(() => (
  <div>
    <h1 style={{ textAlign: 'center' }}>Welcome to</h1>
    <Link to="/javascript">JavaScript</Link>
  </div>
));
