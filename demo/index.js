import React from 'react';
import { render } from 'react-dom';
import { GenericData, Table, checkArrayTable, checkObjectTable } from '../src';

const myObject = {
  a: 42,
  b: 'Foo',
  c: [1, 1, 2, 3, 5, 8],
  d: {
    shortText: 'value',
    longText: `Some
big
text
` },
  arrayTable: [
    {a: 1, b: 2, c: 3},
    {b: 4, c: 6},
    {a: 3, c: 9},
    {a: 4, b: 8},
    {a: 1, b: 2, c: 3},
    {b: 4, c: 6},
    {a: 3, c: 9},
    {a: 4, b: 8},
    {a: 1, b: 2, c: 3},
    {b: 4, c: 6},
    {a: 3, c: 9},
    {a: 4, b: 8},
  ],
  objectTable: {
    id1: {itemId: 1, soldQtty: 2, orderId: 3},
    id2: {soldQtty: 4, orderId: 6},
    id3: {itemId: 3, orderId: 9},
    id4: {itemId: 4, soldQtty: 8},
  }
};

const myString = 'foo';
const myMultilineString = `foo
bar
buz
`;

let tableData = checkObjectTable(myObject.objectTable);

const App = () => (
  <div>
    <Table data={tableData}/>
    <h1>object</h1>
    <p>raw data</p>
    <GenericData data={JSON.stringify(myObject, null, 2)}/>
    <p>output</p>
    <GenericData data={myObject}/>
    <h1>string</h1>
    <p><GenericData data={myString}/></p>
    <h1>multi line string</h1>
    <GenericData data={myMultilineString}/>
    <h1>array</h1>
    <GenericData data={[1, 2, 3]}/>
    <h1>tables</h1>
    <p>raw data</p>
    <GenericData data={JSON.stringify(myObject.arrayTable, null, 2)}/>
    <p>output</p>
    <GenericData data={myObject.arrayTable}/>
    <p>raw data</p>
    <GenericData data={JSON.stringify(myObject.objectTable, null, 2)}/>
    <p>output</p>
    <GenericData data={myObject.objectTable}/>
    <h1>integers</h1>
    <p><GenericData data={12345}/></p>
    <h1>decimal</h1>
    <p><GenericData data={12345.1}/></p>
    <p><GenericData data={11235.813}/></p>
    <h1>boolean</h1>
    <p><GenericData data={true}/></p>
    <p><GenericData data={false}/></p>
  </div>
);

render(<App />, document.getElementById('root'));
