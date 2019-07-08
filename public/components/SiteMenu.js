import React, { Fragment } from 'react';

export const SiteMenu = (props) => {
  return (
    <Fragment>
      <ul style={{ listStyle: 'none'}}>
        <li style={{ marginBottom: '2%' }}>Skills</li>
        <li style={{ marginBottom: '2%' }}>Professional Experience</li>
        <li style={{ marginBottom: '2%' }}>Hobbies</li>
        <li style={{ marginBottom: '2%' }}>About</li>
      </ul>
    </Fragment>
  );
}
