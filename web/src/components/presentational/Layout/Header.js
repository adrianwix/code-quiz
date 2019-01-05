import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Heading, majorScale, Pane, Tab, TabNavigation } from 'evergreen-ui';
import PropTypes from 'prop-types';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/javascript', label: 'Javascript' },
  { to: '/mongodb', label: 'MongoDB' },
];

const Header = props => {
  const { location } = props;

  return (
    <header>
      <Pane display={'flex'} borderBottom={'default'} elevation={1} padding={majorScale(2)}>
        <Heading size={800} marginTop={0}>
          Code Quiz
        </Heading>
        <TabNavigation marginLeft={majorScale(2)} className={{}}>
          {navLinks.map(link => (
            <Link
              key={link.to}
              style={{ textDecoration: 'none', color: 'inherit' }}
              exact
              to={link.to}
            >
              <Tab height={32} isSelected={link.to === location.pathname}>
                {link.label}
              </Tab>
            </Link>
          ))}
        </TabNavigation>
      </Pane>
    </header>
  );
};
Header.propTypes = {
  location: PropTypes.object.isRequired,
};
export default withRouter(Header);
