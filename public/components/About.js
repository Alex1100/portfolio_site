import React, { Fragment } from 'react';
import picture from './assets/images/Alex_on_the_pier.png';

export const About = props => {
  return (
    <Fragment>
      <div
        style={{
          display: "block",
          position: "relative",
          margin: "0 auto"
        }}
      >
        <img
          src={picture}
          style={{
            display: 'block',
            margin: '0 auto',
            maxWidth: '25%',
            maxHeight: '50%',
            border: 'solid 1px transparent',
            borderRadius: '50%',
          }}
        />
        <hr/>
        <p
          style={{
            display: 'inline-block',
            position: 'relative',
            textAlign: 'left',
            paddingLeft: '20%',
            width: '50%',
          }}
        >
          I'm Alexander R. Aleksanyan, and I am a Software Engineer from Los Angeles, CA.
          <br/>
          My passion is to find elegant solutions to trivial and non-trivial engineering problems.
          <br/>
          I take pride in delivering product/feature requirements.
        </p>
        <div
          style={{
            display: 'inline-block',
            position: 'relative',
            textAlign: 'right',
            paddingLeft: '5%',
          }}
        >
          <a
            style={{
              display: 'block',
              marginBottom: '20%',
            }}
            href="https://www.linkedin.com/in/alex1100"
            target={'_blank'}
          >
            LinkedIn
          </a>
          <a
            style={{
              display: 'block',
              marginBottom: '20%',
            }}
            href="https://www.github.com/alex1100"
            target={'_blank'}
          >
            GitHub
          </a>
          <a
            style={{
              display: 'block',
              marginBottom: '20%',
            }}
            href="https://www.toptal.com/resume/alexander-raffe-aleksanyan"
            target={'_blank'}
          >
            Resume
          </a>
        </div>
      </div>
    </Fragment>
  );
}
