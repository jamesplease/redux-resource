export default function composeReducers(reducers) {
  return (state, action) => reducers.reduceRight(
    (prevState, reducer) => reducer(prevState, action),
    state
  );
}
