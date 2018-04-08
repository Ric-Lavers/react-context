# React Storybook
Is currently the best way to display your UI library and test your components.

Storybook at this time is still some what new ( in its 3rd year ), although similar packages have existed since Brad Frosts introduction of _atomic design_.I've found with the documentation around Storybook can be a little hard to get right. 

## get started
 - `yarn add @storybook/react @storybook/addon-knobs -dev`
 - `getstorybook `
 - add a script `"storybook": "start-storybook -p 9000 -c .storybook"`
 - to make a storybook component suffix with .stories.js
now write the stories in the index.stories.js _( yeah vague af)_

## Add-ons
Add ons are really essential without them storybook is not very useful. each addon needs to be imported in the addon.js file and then the parts can be imported in index.stories.js
### Knobs
`import '@storybook/addon-knobs/register'` - for `./addon.js`
now add the knobs you want, and add the decorator like so `storiesOf('example', module).addDecorator(withKnobs)`
okay now there is a knobs feature and you can set sliders etc for dynamically changing props. 

### info
lets you show info, perhaps code and style guides
`import '@storybook/addon-info'`
`import { withInfo } from '@storybook/addon-info';`
then wrap your renderProp with 
```js
 withInfo(`
    description or documentation about my component, supports markdown

    ~~~js
    <Button>Click Here</Button>
    ~~~

  `)( ()=> <YourComponent/> )
```
There are 4 parts to the info decorator
1. title
2. `text: ` _this may change to "summary" in future releases_ add a description or code snippets here
3. Story Source - this shows what the story is using to render. 
4. Prop Types -  this shows what is listed in the components `YourComponent.defaultProps = {}`

