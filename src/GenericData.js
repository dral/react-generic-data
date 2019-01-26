import React from 'react';
import ReactDataGrid from 'react-data-grid';
import decamelize from 'decamelize';
import * as check from './checkTable';

const GenericData = ({data}) => {
  if (data === null) return <NullFormat/>;
  switch (typeof data) {
  case 'string':
    return <StringFormat data={data}/>;
  case 'object':
    if (Array.isArray(data)) {
      return <ArrayFormat data={data}/>;
    } else { // object
      return <ObjectFormat data={data}/>;
    }
  case 'boolean':
    return <BooleanFormat data={data}/>;
  case 'number':
    return <NumberFormat data={data}/>;
  case 'symbol':
  case 'function':
  case 'undefined':
    return <UndefinedFormat/>;
  default:
    return <span/>;
  }
};

const KeyValueFormat = ({
  data = {}
}) => (
  <ul>{
    Object.entries(data).map(
      ([key, value]) => (
        <li key={key}>
          <label>{key}</label>
          {': '}
          <GenericData data={value}/>
        </li>
      )
    )
  }</ul>
);

const ObjectFormat = ({
  data = {}
}) => {
  let tableData = check.checkObjectTable(data);
  if (tableData) return <div>{"table"}</div>;
  return <KeyValueFormat data={data}/>;
};

const ListFormat = ({
  data = {}
}) => (
  <ul>{
    data.map(
      (value, index) => (
        <li key={index}>
          <GenericData data={value}/>
        </li>
      )
    )
  }</ul>
);

const ArrayFormat = ({
  data = {}
}) => {
  let tableData = check.checkObjectTable(data);
  if (tableData) return <div>{"table"}</div>;
  return <ListFormat data={data}/>;
};

export const TableFormat = ({
  data = {}
}) => {
  // const columns = Object.keys(data).map(key => ({key, name: decamelize(key, ' ').toUppercase()}));
  // checkObjectTable(data)
  // const rows = [{id: 0, title: 'row1', count: 20}, {id: 1, title: 'row1', count: 40}, {id: 2, title: 'row1', count: 60}];

  return (
    <div/>
  );
};

const newLine = /\n/;

const StringFormat = ({
  data = ''
}) => {
  return newLine.test(data)? (
    <pre>
      <code>
        {data}
      </code>
    </pre>
  ) : (
    <span>
      {data}
    </span>
  );
};

const integerFormatter = new Intl.NumberFormat('fr-FR', { useGrouping: false, minimumIntegerDigits: 1, minimumFractionDigits: 0 });

const decimalFormatter = new Intl.NumberFormat('fr-FR', { useGrouping: false, minimumFractionDigits: 2, maximumFractionDigits: 2 });

const NumberFormat = ({
  data = 0
}) => {
  return (
    <span>
      {Number.isInteger(data)? integerFormatter.format(data): decimalFormatter.format(data)}
    </span>
  );
};

const BooleanFormat = ({
  data = true
}) => (
  <code>
    {data.toString()}
  </code>
);

const UndefinedFormat = () => (
  <code>undefined</code>
);

const NullFormat = () => (
  <code>null</code>
);

export default GenericData;
