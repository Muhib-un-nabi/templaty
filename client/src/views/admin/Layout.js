import React, { useState } from 'react';
import classnames from 'classnames';

import Header from './Header';
import Footer from './Footer';

import './admin.css';

const Layout = ({ children }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <div
      className={classnames('landing-page', {
        'show-mobile-menu': showMobileMenu
      })}>
      <Header />
      <div className="main-container">
        <div className="content-container">
          <div
            style={{ minHeight: '70vh', padding: '6rem 3rem' }}
            className="section home">
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
