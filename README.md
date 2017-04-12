# react-data-binding

## Part I - Simple Data Binding

Consider the following component:

```jsx harmony
class Reservation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.getChangeHandler = this.getChangeHandler.bind(this);
  }

  getChangeHandler(key) {
    return function(event) {
      if (event.target.getAttribute('type') === 'checkbox') {
        this.setState({ key: event.target.checked });
      } else {
        this.setState({ key: event.target.value });
      }
    }
  }

  render() {
    const { isGoing, numberOfGuests } = this.state;

    return (
        <div>
          <form>
            <label>
              <input type="checkbox" value={isGoing} onChange={this.getChangeHandler('isGoing')} />
              Attending
            </label>
            <br />
            <label>
              Number of guests:
              <input type="number" value={numberOfGuests}
                      onChange={this.getChangeHandler('numberOfGuests')} />
            </label>
          </form>
          <label>{this.summary()}.</label>
        </div>
    );
  }
}
```

In order to create this component, we had to write a (relatively) generic change handler, then
repeat the work of attaching this change handler to each element that should trigger state change,
along with a `value` (or `checked`) attribute, and an argument representing the "key" of the state
property to be updated on change.

Our goal in Part I is to write a function that will eliminate all that work. It should have the
following method signature:

```js
function model(key = '') {
  // ...
  return {/* ... */};
}
```

We can use the return value to take advantage of the fact that JSX allows us to specify dynamic
attributes, like this:

```jsx harmony
<input type="checkbox" {...{
  value: isGoing,
  onChange: this.getChangeHandler('isGoing')
}} />
```

Each property on the object after the span [`...`] represents an attribute that should be added to
the JSX tag; so, the above is equivalent to:

```jsx harmony
<input type="checkbox" value={isGoing} onChange={this.getChangeHandler('isGoing')} />
```

What we need is a method that returns:

```js
{
  value: this.state[key],
  onChange: this.getChangeHandler(key)
}
```

... for any property on the state object. To make this method reusable across components, we will
return it as a function from a second method that accepts a component as its context:
 
```js
function bindModel(context) {
  return function(key) {
    return {
      value: context.state[key],
      checked: context.state[key],
      onChange: context.getChangeHandler(key)
    };
  }
}
```

But why add an identical copy of `getChangeHandler()`, to every component? Why not simply include it
in our model binding instead?

```js
function bindModel(context) {
  return function(key) {
    return {
      value: context.state[key],
      checked: context.state[key],

      onChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        context.setState({ key: value });
      }
    };
  }
}
```

Now we can get a reference to this method in our `render()` function:

```jsx harmony
render() {
  const model = bindModel(this);
}
```

... and call it to return a `value`/`checked` attribute and change handler for every element we want
"bound" to our state:

```jsx harmony
<input type="checkbox" {...model('isGoing')}
// ...
<input type="text" {...model('numberOfGuests')}
```

Finally, change events may have additional side-effects, such as hiding or displaying buttons. In order to
support this, our binder should call an optional, additional change handler after updating the
component's state:

```js
function bindModel(context) {
  return function(key) {
    return {
      value: context.state[key],
      checked: context.state[key],

      onChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        context.setState({ key: value });
  
        if (typeof context.handleChange === 'function') {
          context.handleChange(key, value);
        }
      }
    };
  }
}
```

And there you have it! A reusable method that can bind state properties to JSX elements. To see
this in action, browse this source at
https://github.com/abraham-serafino/react-data-binding/tree/Part-I.

In Part I, we learned how to automatically modify simple state properties whenever a form field
changes; however, what if state contains nested objects? For example, the method we used here will
not work for a state object that looks like:

```js
this.state = {
  isGoing: true,
  guest1: { name: 'Alice' },
  guest2: { name: 'Bob' }
};
```

In [Part II,](https://github.com/abraham-serafino/react-data-binding/tree/Part-II)we will
investigate how to solve this problem with `lodash`.
