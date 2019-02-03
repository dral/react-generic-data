import React from 'react';
import ReactTable from 'react-table';
import './react-table.css';
import decamelize from 'decamelize';
import {parse} from 'json2csv';
import copy from 'copy-to-clipboard';
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
  if (tableData) return <Table data={tableData}/>;
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
  let tableData = check.checkArrayTable(data);
  if (tableData) return <Table data={tableData}/>;
  return <ListFormat data={data}/>;
};

const cellFormatter = ({value}) => {
  return GenericData({data: value});
};

const csvOptions = {
  flatten:true,
  flattenSeparator: '|',
  delimiter: ';',
  eol: '\n',
  excelStrings: false,
  header:true,
};

const ExportCSV = ({
  data,
  onCopy = () => {},
  onFail = () => {},
}) => {

  const csvCopy = () => {
    try {
      const csv = parse(data.rows, csvOptions);
      copy(csv);
      onCopy(csv);
    } catch (error) {
      onFail(error);
    }
  };

  return (
    <div>
      <button onClick={() => csvCopy(data.rows)}>copy CSV to clipboard</button>
    </div>
  );
};

const Table = ({data}) => {
  let columns= data.columns.map(key => ({accessor: key, Header: decamelize(key, ' '), Cell: cellFormatter}));
  let defaultPageSize = 10;
  let pageSize = Math.min(defaultPageSize, data.rows.length);
  let showPagination = data.rows.length > defaultPageSize;
  return (
    <div>
      <ExportCSV data={data}/>
      <ReactTable
        columns={columns}
        data={data.rows}
        defaultPageSize={pageSize}
        filterable={true}
        showPagination={showPagination}
        className="-striped -highlight"
      />
      <br/>
    </div>
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
