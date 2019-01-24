import React from 'react';

const GenericData = ({
  data = {}
}) => (
  <div>{JSON.stringify(data)}</div>
);

export default GenericData;
