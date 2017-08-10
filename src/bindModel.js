import get from 'lodash.get';
import set from 'lodash.set';
import merge from 'lodash.merge';

function bindModel(context) {
  return {
    model(path) {
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

          context.setState(merge(context.state, newState));

          if (typeof context.handleChange === 'function') {
            context.handleChange(path, newValue, originalValue);
          }
        }
      };
    },

    arrayItem(pathToArray, index, arrayElementSubPath) {
      const stateArray = get(context.state, pathToArray, null) || [];
      const value = arrayElementSubPath ?
                      get(stateArray[index], arrayElementSubPath, '') :
                        stateArray[index];

      return {
        value: value || '',
        checked: value || false,

        onChange(event) {
          const originalValue = value;
          const target = event.target;
          const newValue = target.type === 'checkbox' ? target.checked : target.value;

          if (arrayElementSubPath) {
            set(stateArray[index], arrayElementSubPath, newValue);
          } else {
            stateArray[index] = newValue;
          }

          const newState = {};
          set(newState, pathToArray, stateArray);

          context.setState(merge(context.state, newState));

          if (typeof context.handleChange === 'function') {
            context.handleChange(pathToArray, newValue, originalValue, index, arrayElementSubPath);
          }
        }
      };
    }
  };
}

export default bindModel;
