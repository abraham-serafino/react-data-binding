function bindModel(context) {
  return function(key) {
    const originalValue = context.state[key];

    return {
      value: originalValue,
      checked: originalValue,

      onChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        context.setState({ [key]: value });

        if (typeof context.handleChange === 'function') {
          context.handleChange(key, value, originalValue);
        }
      }
    };
  }
}

export default bindModel;
