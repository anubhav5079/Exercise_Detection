import React from 'react';
import '../Styles/Wrapper.css';
const Wrapper = (props) => {
  return (
    <div
      className="wrapper"
      id={props.id}
      style={{
        display: 'flex',
        alignItems: 'center',
        flex: 1,
      }}
    >
      {' '}
      {props.children}
    </div>
  );
};

export default Wrapper;
