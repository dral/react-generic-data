# React generic data

A component to display a generic data object

Intent:

```js
const myObject = {
  a: 42,
  b: "Foo",
  c: [1, 1, 3, 5, 8],
  d: { key: "value" },
};

const MyComponent = () => (
  <GenericData data={myObject} />
);
```
