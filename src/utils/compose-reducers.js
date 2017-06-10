export default function composeReducers(reducers) {
  return (state, action) => reducers.reduce((prevState, reducer) =>
    reducer(prevState, action), state);
}
