import React from 'react';

const Footer = () => {
  return (
    <div
      className="section footer mb-0"
      // ref={refSectionFooter}
    >
      <div className="container">
        <div className="row footer-row">
          <div className="col-12 text-right">
            <a
              className="btn btn-circle btn-outline-semi-light footer-circle-button c-pointer"
              href="#scroll"
              // onClick={(event) => scrollTo(event, 'home')}
            >
              <i className="simple-icon-arrow-up" />
            </a>
          </div>
          <div className="col-12 text-center footer-content">
            <a
              className="c-pointer"
              href="#scroll"
              // onClick={(event) => scrollTo(event, 'home')}
            >
              <img
                className="footer-logo"
                alt="footer logo"
                src="/assets/logos/white-full.svg"
              />
            </a>
          </div>
        </div>
      </div>
      <div className="container copyright pt-5 pb-5">
        <div className="row">
          <div className="col-12" />
          <div className="col-12 text-center">
            <p className="mb-0">2021 © ColoredStrategies</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
