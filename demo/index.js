import React from 'react';
import { render } from 'react-dom';

import { GenericData } from '../src';

const myObject = {
  a: 42,
  b: 'Foo',
  c: [1, 1, 2, 3, 5, 8],
  d: { shortText: 'value', longText: `Some
big
text
` },
};

const myString = 'foo';
const myMultilineString = `foo
bar
buz
`;

const App = () => (
  <div>
    <h1>object</h1>
    <GenericData data={myObject}/>
    <h1>string</h1>
    <GenericData data={myString}/>
    <h1>multi line string</h1>
    <GenericData data={myMultilineString}/>
    <h1>array</h1>
    <GenericData data={[1, 2, 3]}/>
    <h1>integers</h1>
    <GenericData data={11235813}/>
    <h1>decimal</h1>
    <GenericData data={1142.3456}/>
    <h1>boolean</h1>
    <GenericData data={true}/>
  </div>
);

render(<App />, document.getElementById('root'));
