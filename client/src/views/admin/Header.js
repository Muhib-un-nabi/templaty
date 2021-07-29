import React from 'react';
import Headroom from 'react-headroom';

import { Link } from 'react-router-dom';

// import { Nav, NavItem, TabContent, TabPane } from 'reactstrap';

const NAV = [
  { title: 'dashboard' },
  { title: 'pakages' },
  { title: 'coupons' }
];

const Header = () => {
  return (
    <Headroom className="landing-page-nav">
      <nav>
        <div className="container d-flex align-items-center justify-content-between">
          <Link
            className="navbar-logo pull-left c-pointer"
            href="#scroll"
            // onClick={(event) => scrollTo(event, 'home')}
          >
            <span className="white" />
            <span className="dark" />
          </Link>
          <ul className="navbar-nav d-none d-lg-flex flex-row">
            {NAV.map((ele) => (
              <li key={ele.title} className="nav-item">
                <Link
                  className="c-pointer"
                  to={ele.title}
                  // onClick={(event) => scrollTo(event, ele.title)}
                >
                  {ele.title.toUpperCase()}
                </Link>
              </li>
            ))}
            <li className="nav-item pl-4">
              <a
                className="btn btn-outline-semi-light btn-sm pr-4 pl-4"
                target="_blank"
                rel="noopener noreferrer"
                // href={buyUrl}
              >
                BUY
              </a>
            </li>
          </ul>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <span
            className="mobile-menu-button"
            // onClick={(event) => {
            //   setShowMobileMenu(!showMobileMenu);
            //   event.stopPropagation();
            // }}
          >
            <i className="simple-icon-menu" />
          </span>
        </div>
      </nav>
    </Headroom>
  );
};

export default Header;
