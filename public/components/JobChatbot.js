import React, { useEffect, useState, Component, Fragment } from 'react';
import ChatBot from 'react-simple-chatbot';
import { EmailerMixer } from './EmailerMixer';
import '../objectWatch';

export const JobChatbot = (props) => {
  const [searchedResult, setSearchedResult] = useState('');
  const [chatbotMode, setChatbotMode] = useState('active');
  const [open, setOpen] = useState(false);
  const [resetChatButtonColor, setResetChatButtonColor] = useState(false);
  const [uniqueKey, setUniqueKey] = useState('1234_A123');

  useEffect(() => {
    console.log('CHECK CHECK::: ', window.speechSynthesis);
    if (open === false) {
      window.speechSynthesis.cancel();
    }
  }, [window.speechSynthesis])

  const logChanges = (changes, old, newval) => {
    console.log('changes to window.speechsynthesis are: ', changes, old, newval);
  }

  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutationRecord) {
      console.log('changed: ', mutationRecord);
    });
  });

  useEffect(() => {
    emptySpeechQueue();
    document.getElementsByClassName('rsc-float-button')[0].style.backgroundColor = '#25282d';
    document.getElementsByClassName('rsc-header')[0].style.backgroundColor = '#25282d';
    setResetChatButtonColor(true);

    document.getElementsByClassName('rsc-os-option-element')
    .forEach(optionBubble => {
      optionBubble.style.backgroundColor = '#4ac077';
    });

    window.watch(speechSynthesis, logChanges);

    document.getElementsByClassName('rsc-container')[0]
    .addEventListener('DOMSubtreeModified', changeColors);

    document.getElementsByClassName('rsc-header-close-button')[0]
    .addEventListener('click', addExit);

    return () => {
      document.getElementsByClassName('rsc-container')[0]
      .removeEventListener('DOMSubtreeModified', changeColors);

      document.getElementsByClassName('rsc-header-close-button')[0]
      .removeEventListener('click', addExit);
    };

  }, [resetChatButtonColor]);

  const addExit = () => {
    setOpen(false);
    setUniqueKey(getRandomKey());
    setResetChatButtonColor(false);
    emptySpeechQueue();
  }

  const changeColors = () => {
    document.getElementsByClassName('rsc-ts-bubble')
    .forEach(botChatBubble => {
      if ([...botChatBubble.parentElement.classList].includes('rsc-ts-bot')) {
        botChatBubble.style.backgroundColor = '#25282d';
      } else {
        botChatBubble.style.backgroundColor = '#4ac077';
        botChatBubble.style.color = 'white';
      }
    });

    document.getElementsByClassName('rsc-os-option-element')
    .forEach(optionBubble => {
      optionBubble.style.backgroundColor = '#4ac077';
    })
  }

  const handleEnd = ({ steps, values }) => {
    addExit();
  }

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  }

  const getRandomKey = () => {
    const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
    let key = '';
    for (let i = 0; i < 6; i++) {
      key += alpha[getRandomInt(alpha.length + 1)];
    }

    if (uniqueKey === key) {
      alpha.splice(alpha.indexOf(unqiueKey[0]), 1)
      key[0] = alpha[getRandomInt(alpha.length + 1)];
    }

    return key;
  }

  const toggleFloat = ({ opened }) => {
    setOpen(true);
    emptySpeechQueue();
  }

  const emptySpeechQueue = () => {
    window.speechSynthesis.cancel();
    window.speechSynthesis.cancel();
  }

  const renderChatbot = () => {
    if (chatbotMode === 'clear') {
      return <div />;
    }

    if (chatbotMode === 'active') {
      return (
        <Fragment>
          <ChatBot
            key={uniqueKey}
            toggleFloating={toggleFloat}
            floating={true}
            opened={open}
            floatingIcon={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp0WIz8le0wzps7i_srnB_Wm432ern4uzTpqQt18PHSXQnkekcOg"}
            userAvatar={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAilBMVEX///8zMzMtLS1fX18nJyeVlZUwMDAqKiobGxsYGBgiIiIdHR0gICAlJSUVFRUpKSnPz8/p6ekRERFBQUH39/dpaWnZ2dk3Nzd4eHi5ubnf399JSUmIiIjw8PBRUVGpqanIyMi9vb2QkJBZWVl9fX1NTU2vr6+dnZ1kZGRwcHCioqLl5eUICAiKior4j/KXAAAGuUlEQVR4nO2de3eiPBCHJWC4hJsI4qUqXqrWtt//672wbLsGUC4SJr5nnv/2bHdPfmfCzGQmk45GCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgSGsm/mK7n0cX9RLN99uFP4FeUJ+E/lm1DMNyPJ1k6J6T/tFRz34IvbQ+WJ8ulqERpQxxDOdyenWRO/XLqlL3q9L6uuygF9md8EzYI3l/RTJ6fk1DhmPXobX6MqhjjqFX24Gt5zSSl+OQE/SCW5LEdjP7/drRnvrQi25BOHfb6fuj0T1Cr7sxs1hrrS/DmS6hl96MbdDegH/NGLzE1/hhdNSXYcq/U8NNGxdaxlKhFdQQTvWnBCqK9g6t4SHruD6HqUNfSZzhhNPnBaYSJbbi6tktmuMdoIXcQ/V6EZgGxg9oKdW82T0JVBTjDC2mikXQm0BFCRJoOWUmrEeBCvXW0IJKrPpwo//QpYv81/4+whxzAS2Jp989mkE9uQL/Rz+R8BbtDVrULb7bu8DUn35Cy7rh0K+bydElivtCTJgaUZ4jvxATymTEmSlEYBoxZGnfzPt3pDnaHlpaTvhMYeYhlEJryzlZohQqRgIt7g+qGD+ToUtRelsL26TpNtWh1WUs+s65bzFkaGYI86QZmgxtN71rDb8JZAMtLz03icnYfgig9Y1GO5GfYfohzqAFjs7dOmlNseC7UZG4aJghQeK2EuloUlcTQQsMqViFdAWtcN17CaqgMIZWKDhYKAp4yW0mMCv9gwFd/Bau0IU+5wtXaEKXo5aiajTSKPwUrhC6Lizcl4J/h6LjocKgfWko8vybQaDj4WgqOGubQgsUVdH/gcD3go99XTGpxoPvIm7F1YMzJDgB+2KdqQTlxLDPazRlAnBXKviQTyWoJo72IktRUlSEfZGnCwk+w/RDFGhDOTozpcYF0bpT+K/k6K6Ndny8ING4O0deoiQd0kJvRnvmbigfXanS2xqfg/emT+2sBZchObJcpJ1w5/ynrhfwuxS8zvYLf2/vGQ/PmVCf97fEJ5kFPS2M75jLdHUv4ozodi6PccdpiUw4Gi05I3ZuTW95E0LXoDjeOHdqd8smJ1z+58B3Dm8JNS4mup2cDXcZnlIJzk237Li6Ke3Sfr9w+0C+iYuIq9dQ1trbzLlIocnkZnIKzWDKWm7UiBMI3xitgA+KCg3aDEyEG/4MJtEF6Bu2hSaN27wQONP5M4Ur2TjJD8XhNWfV0BLjwvg+k6F2UUlUmHImbpOY5k8LJVdLPi/zi1qsaDikbr99RsX3FyzwKzSPOBQlUjZ9pHFyNIvNK+sy2Go7oZaK/NT2rnfOeYn6Vep6MGmGLO4xLxcXqWNHi1IO5n/HRrlvZcJ3YmoZV/W9iR1svnfL3Jbh2t9GJvPKxXLqXoFX34idWdlSJJ5tOvH0fRoTxpzKH9EtGQrADZhs7t6qpRn3/tJQpanL1HKu+MLq0O0t9LLb8HkwW76iFESvY8CcXcyaa6TGKoFecAdOtMFrbRnEiF/1Vbrdxq0ICQXzaa6aQC/0CZbfuvFAJNUMZSxRVbQbae7iWl5pv1Ki2cF0Dz9O0QvLxfdBZ4ZlOZqne5pj2QYj6n738tbjmfiL03V/nB/319Ni9mqhAWmMZFXgKsIteeKJxxN7lzwyhnvHotS9dKsFJitGCYslTk/DcZAXMcjXR3uNyXueylK7trYDxe2brLp5SVr949PqX6pOmZRvmforPtMmxvReeabE7I1ZfE8giKRqHqaEx/KTntRh6qJe5Ow8Ncu3cHVTrs8xodVXv4gVbMbJfZXL05yaWnXeyjYSpTzHB4/qUo2xeH5N+Cwm/PQX44NmWA8mwYkLfz84Z7Kqe7KU6o5tuCzeHNQouqibFQlMZlU+1M5hylHev1NaqxJK/zyrT5qPnWqxBA7nKvQWNLHAj1dzwZNdNABO4yKxswgZrXrJvXN47lnkhhIBI2Opl/Z/k3gZRiDcRp2L/wZ/JYK4m7PoGedbIKaBd2KngQpQMnjpSvj8bwF98PGgnh/Vrafjjc7OfA/nZX5wB83f/K/BBQ78xKDg8eZqnAH36Xn4PZox3PMK64H96A/DzXULHt++jzlQkfFz0Fh/CxnoN1+AmTA1YjKEwLXo91oeQAb53R7joc5MVZhDhP3a2xUi8QYYm01EP0jzGFu8QsHvJNYqFH4WDsU+5lkLEX5HGniTptmp6Fb/G1wwzGGJYIUxpCfN8ASPJa7BMrYfRL92krgEmi+xCk8HFZqNlGNtCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgw/AfpiZuPPyksZcAAAAASUVORK5CYII="}
            botAvatar={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp0WIz8le0wzps7i_srnB_Wm432ern4uzTpqQt18PHSXQnkekcOg"}
            speechSynthesis={{
              enable: true,
              lang: 'en',
              voice: window.speechSynthesis && window.speechSynthesis.getVoices() && window.speechSynthesis.getVoices().filter(el => el.name === 'Maged')[0],
            }}
            steps={[
              {
                id: '1',
                message: `Hi I'm Alexander's Assistant, Cybel.`,
                trigger: '2',
              },
              {
                id: '2',
                message: 'What would you like to do?',
                trigger: '3'
              },
              {
                id: '3',
                options: [
                  {
                    value: 1,
                    label: 'Learn about Alexander',
                    trigger: '4'
                  },
                  {
                    value: 2,
                    label: 'Send him a Message',
                    trigger: '5',
                  },
                  {
                    value: 3,
                    label: 'Nothing, Goodbye!',
                    trigger: handleEnd,
                  }
                ]
              },
              {
                id: '4',
                message: `
                  What would you like to know about Alexander (his/him)?
                `,
                trigger: '6',
              },
              {
                id: '5',
                component: <EmailerMixer />,
                trigger: '2',
              },
              {
                id: '6',
                options: [
                  {
                    value: 1,
                    label: 'Professional Experience',
                    trigger: '7',
                  },
                  {
                    value: 2,
                    label: 'Technical Skills',
                    trigger: '17',
                  },
                  {
                    value: 3,
                    label: 'Hobbies',
                    trigger: '18',
                  },
                  {
                    value: 4,
                    label: '<= Previous Menu',
                    trigger: '2',
                  },
                  {
                    value: 5,
                    label: 'Nothing, Goodbye!',
                    trigger: handleEnd,
                  }
                ],
              },
              {
                id: '7',
                message: `Alexander is a Software Engineer from Los Angeles, CA and is currently a Freelance Toptal Developer. He is also an Alumn of Coding Dojo, General Assembly, and Hack Reactor. He first begun working as a Software Engineer in 2016 with small contract gigs amongst his own network of clients. He decided he wanted to work within a team and from 2018 he had joined his first team at The Action Network.`,
                trigger: '8'
              },
              {
                id: '8',
                message: `Which one of Alexander's past/current roles would you like to learn about?`,
                trigger: '9',
              },
              {
                id: '9',
                options: [
                  {
                    value: 1,
                    label: 'The Action Network',
                    trigger: '10'
                  },
                  {
                    value: 2,
                    label: 'Florida Blue',
                    trigger: '11',
                  },
                  {
                    value: 3,
                    label: 'Planna, Inc.',
                    trigger: '12',
                  },
                  {
                    value: 4,
                    label: 'Listing Loop',
                    trigger: '13',
                  },
                  {
                    value: 5,
                    label: 'U Group',
                    trigger: '14',
                  },
                  {
                    value: 6,
                    label: 'Join Digital',
                    trigger: '15',
                  },
                  {
                    value: 7,
                    label: 'Toptal',
                    trigger: '16',
                  },
                  {
                    value: 8,
                    label: '<= Previous Menu',
                    trigger: '4',
                  },
                  {
                    value: 9,
                    label: 'Nothing, Goodbye!',
                    trigger: handleEnd,
                  }
                ]
              },
              {
                id: '10',
                message: 'Sample',
                trigger: '8',
              },
              {
                id: '11',
                message: 'Sample',
                trigger: '8',
              },
              {
                id: '12',
                message: 'Sample',
                trigger: '8',
              },
              {
                id: '13',
                message: 'Sample',
                trigger: '8',
              },
              {
                id: '14',
                message: 'Sample',
                trigger: '8',
              },
              {
                id: '15',
                message: 'Sample',
                trigger: '8',
              },
              {
                id: '16',
                message: 'Sample',
                trigger: '8',
              },
              {
                id: '17',
                message: `
                  Go,
                  Buffalo,
                  Beego,
                  Ruby,
                  Rails,
                  JavaScript,
                  Node,
                  Express,
                  React,
                  Redux,
                  Redux-Sagas,
                  GraphQL,
                  D3,
                  CSS,
                  HTML,
                  Angular (2+),
                  AngularJS (1.x),
                  React-Native,
                  PostgreSQL,
                  MySQL,
                  MongoDB,
                  Web3,
                  Solidity,
                  Ethereum,
                  EOS,
                  Bitcoin,
                  Truffle,
                  Crypto Transaction Signing
                  Heroku,
                  ES6/ES2016+/ES2017+/ES2018+,
                  Babel,
                  Webpack,
                  Rollup,
                  RSpec,
                  Guard,
                  Capybara,
                  Selenium,
                  FactoryBot,
                  AWS EC2,
                  AWS EBS,
                  AWS S3,
                  AWS RDS,
                  Firebase,
                  Firebase Firestore,
                  Firebase Cloud Functions,
                  Microservices,
                  Flow,
                  TypeScript
                  Next.js,
                  Hapi.js,
                  Jest,
                  Enzyme,
                  Mocha,
                  Chai,
                  Docker
                `,
                trigger: '4'
              },
              {
                id: '18',
                message: `
                  Fitness,
                  Lacrosse (Defensive Long Pole / Long Stick Middie),
                  Basketball,
                  Video Games,
                  Art (Abstract and Impressionistic in Mostly Acrylic, Sometimes Oil),
                  Guitar (Acoustic),
                  Binge Watching Hulu and Netflix
                `,
                trigger: '4',
              },
            ]}
          />
        </Fragment>
      );
    }
  }

  return (
    <Fragment>
      {renderChatbot()}
    </Fragment>
  );
}
