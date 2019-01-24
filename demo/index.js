import React from 'react';
import { render } from 'react-dom';

import { GenericData } from '../src';

const myObject = {
  a: 42,
  b: 'Foo',
  c: [1, 1, 3, 5, 8],
  d: { key: 'value' },
};

const App = () => (
  <div>
    <GenericData data={myObject}/>
  </div>
);

render(<App />, document.getElementById('root'));
