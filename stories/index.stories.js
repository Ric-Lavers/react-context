import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';

import ThemeConfig from './ThemeConfig.stories'


import { Button, Welcome } from '@storybook/react/demo';
import Battery from '../src/components/navbar/Battery.stories'

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);

storiesOf('react-motion demo', module)
  .add('motion', () => <ThemeConfig/>)

storiesOf('Battery', module).addDecorator(withKnobs)
  .add('chrome Browser battery', 
    withInfo({
      styles: {
        header: {
          h1: {
            color: 'violet'
          }
        }
      },
      text: `String or React Element with docs about my component 
      ~~~js
      <Button>example</Button>
      ~~~`,
      propDefinitions: [{
        property: "level", // The name of the prop
        propType: String, // The prop type. TODO: info about what this object is...
        required: true, // True if the prop is required
        description: "just a test", // The description of the prop
        defaultValue: "cat" // The default value of the prop
      }],
  
    })( 
      () => {
        const options = {
          range: true,
          min:0.01,
          max:1,
          step:0.01
        }

        let batteryLevel = number('charge', 0.5, options, 'charge')

        return <Battery level={batteryLevel} />
      }
    )
  )



/* MAKE KNOBS WORK!!! */
const stories = storiesOf('Storybook Knobs', module);

// Add the `withKnobs` decorator to add knobs support to your stories.
// You can also configure `withKnobs` as a global decorator.
stories.addDecorator(withKnobs);

// Knobs for React props
stories.add('with a button', () => (
  <button disabled={boolean('Disabled', false)} >
    {text('Label', 'Hello Button')}
  </button>
));

// Knobs as dynamic variables.
stories.add('as dynamic variables', () => {
  const name = text('Name', 'Arunoda Susiripala');
  const age = number('Age', 89);

  const content = `I am ${name} and I'm ${age} years old.`;
  return (<div>{content}</div>);
});