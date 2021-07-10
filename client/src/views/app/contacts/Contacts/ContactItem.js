import React from 'react';

const ContactItem = ({ list, email }) => {
  const renderValue = (value, type) => {
    switch (type.id) {
      case 1:
        return <b>{value}</b>;
      case 2:
        return (
          <b>
            {value.map((ele) => (
              <span key={ele.id}> {ele.label} ,</span>
            ))}
          </b>
        );
      case 3:
        return <b>{value.label}</b>;
      default:
        return null;
    }
  };

  return (
    <div className="card-body pt-0">
      <ul>
        <li>
          Email : <b>{email}</b>
        </li>
        {list.map(({ name, value, type }, i) => (
          <li key={`${name}-${i}=${value}`}>
            <>{name.toUpperCase()}</> : <>{renderValue(value, type)}</>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ContactItem;
