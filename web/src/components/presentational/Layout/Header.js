import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Heading, majorScale, Pane, Tab, TabNavigation } from 'evergreen-ui';
import PropTypes from 'prop-types';

const navLinks = [{ to: '/javascript', label: 'Javascript' }, { to: '/mongodb', label: 'MongoDB' }];

const Header = props => {
  const { location } = props;
  // TODO: Highlight current link
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
        <Link className="navbar-brand" to="/">
          Code Quiz
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                id="navbarDropdownMenuLink"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Categories
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                {navLinks.map(obj => (
                  <Link className="dropdown-item" to={obj.to} key={obj.to}>
                    {obj.label}
                  </Link>
                ))}
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
Header.propTypes = {
  location: PropTypes.object.isRequired,
};
export default withRouter(Header);
