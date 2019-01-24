import React from 'react';

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

const ObjectFormat = ({
  data = {}
}) => {
  return (
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
};

const ArrayFormat = ({
  data = {}
}) => {
  return (
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

const numberFormatter = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 2 });
const NumberFormat = ({
  data = 0
}) => {
  return (
    <span>
      {numberFormatter.format(data)}
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
