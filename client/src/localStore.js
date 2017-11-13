export const get = () => JSON.parse(window.localStorage.getItem('state')) || undefined;
export const set = (state, props) => {
  const toSave = {};
  props.forEach((p) => {
    toSave[p] = state[p];
  });
  window.localStorage.setItem('state', JSON.stringify(toSave));
};
