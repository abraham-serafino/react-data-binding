function bindModel(context) {
  return function(model) {
    return {
      value: context.state[model],
      checked: context.state[model],

      onChange(event) {
        const originalValue = context.state[model];
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        context.setState({ [model]: value });

        if (typeof context.handleChange === 'function') {
          context.handleChange(model, value, originalValue);
        }
      }
    };
  }
}

export default bindModel;
