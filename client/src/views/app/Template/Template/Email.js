import React from 'react';

const Email = ({ children, openAsEmail, setOpenAsEmail }) => {
  if (!openAsEmail) return <div>{children}</div>;

  return <div>{children}</div>;
};

export default Email;
