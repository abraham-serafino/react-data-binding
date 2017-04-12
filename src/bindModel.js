import get from 'lodash.get';
import set from 'lodash.set';

function bindModel(context) {
  return function model(path) {
      const value = get(context.state, path, '');

      return {
        value,
        checked: value || false,

        onChange(event) {
          const originalValue = value;
          const target = event.target;
          const newValue = target.type === 'checkbox' ? target.checked : target.value;

          const newState = {};
          set(newState, path, newValue);

          // remember, we cannot call set() directly on the state object,
          // because mutating the state object has unexpected results
          context.setState(newState);

          if (typeof context.handleChange === 'function') {
            context.handleChange(path, newValue, originalValue);
          }
        }
      };
    };
}

export default bindModel;
