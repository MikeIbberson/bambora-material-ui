import { NAME } from './constants';

export default () => {
  const input = document.getElementById(NAME);

  return {
    addToPayload: (obj) =>
      input
        ? Object.assign(obj, {
            cardholder: input.value,
          })
        : obj,

    clear: () => {
      if (input) input.value = '';
    },
  };
};
