# react-data-binding

## Part II - Nested State
In [Part I,](https://github.com/abraham-serafino/react-data-binding/tree/Part-I)we learned
how to automatically bind top-level state properties to form elements in JSX, so that
updates to those elements automatically updated state and vice versa. However, the method
we used breaks down when the structure of our state object is more complex; for example:

```js
this.state = {
  isGoing: true,
  guest1: { name: 'Alice' },
  guest2: { name: 'Bob' }
};
```

Our method retrieves the value from `state[key]`, and updates the value with
`setState({ [key]: /* ... */ })`, which means we can't bind an element like this:

```jsx harmony
<input type="text" {...model('guest1.name')} />
```

... because `this.state['guest1.name']` is `undefined`.

While it might make sense to "flatten" the structure of your state object in this
specific case, you're going to need support for nested objects at some point, especially
if you want to work with REST data.

Fortunately, `lodash` can "drill down" into nested objects to find specific properties;
so adding this capability to our binder method is as simple as calling `lodash`' `get()`
and `set()` methods:

```js
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
```

Now we can use dot- (`.`-)delimited property names in our component JSX:
 
```jsx harmony
render() {
  const model = bindModel(this);
    
  return (
    <div>
      <form>
        <label>
          <input type='checkbox' {...model('isGoing')} />
          Attending&nbsp;
        </label>
    
        <p>
          <label>Guest 1:&nbsp;</label>
          <input type="text" {...model('guest1.name')} readOnly={!this.state.isGoing} />
          <br/>
        </p>
    
        <p>
          <label>Guest 2:&nbsp;</label>
          <input type="text" {...model('guest2.name')} readOnly={!this.state.isGoing} />
          <br/>
        </p>
      </form>
    
      <label>{this.summary()}</label>
    </div>
  );
}
```

To see the full example, browse this source at
https://github.com/abraham-serafino/react-data-binding/tree/Part-II

In [Part III,](https://github.com/abraham-serafino/react-data-binding/tree/Part-III)we'll
round out the features of our new library by adding support for variable-length arrays.
