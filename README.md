# react-data-binding

## Part III - Variable-length Arrays
In [Part I,](https://github.com/abraham-serafino/react-data-binding/tree/Part-I)we
learned how to automatically bind top-level state properties to form elements in JSX, so
that updates to those elements automatically updated state and vice versa.

In [Part II,](https://github.com/abraham-serafino/react-data-binding/tree/Part-II)we
solved for nested objects and properties within our state object by incorporating lodash
into our data binding library.

Now, in Part III, we'll look at a somewhat harder two-way data binding problem:
variable-length arrays.

You've probably already guessed that the `guest1` and `guest2` state properties from
Part II are less than ideal; if possible, we'd like an array to which we can add guests,
and which can also be empty. Something like this:

```js
this.state = {
  isGoing: true,
  guests: []
};
```

In theory, we could then add guests to the array with a method like this one:

```js
addGuest(event) {
  event.preventDefault();

  this.setState({
    guests: this.state.guests.concat({ name: 'John Smith' })
  });
}
```

... and render the array with a function like this one:

```jsx harmony
function renderGuests() {
  let guests = [];

  for (let i = 0, iLen = this.state.guests.length; i < iLen; ++i) {
    guests.push(
      <p key={i}>
        <label>Guest {i + 1}:&nbsp;</label>
        <input type="text" {...model(`guests[${i}].name`)}
               readOnly={!this.state.isGoing} />
        <br/>
      </p>
    );
  }
  
  return guests;
}
```

So what's wrong here? `guests[0].name` will return the first guest from our `state`'s
`guests` array the first time, but our `model()` function will replace the entire array
with a single-element array containing only the updated value. In other words, imagine we
are in a browser's Javascript console when the debugger is stopped on a breakpoint, and
watch what happens:

```js
> this.state = { myArray: ['el1', 'el2']};
{ myArray: ['el1', 'el2'] }

> lodash.get(this.state, 'myArray[0]', '');
'el1' // so far, so good

> var newState = {};
{}

> lodash.set(newState, 'myArray[0]', 'new value');
{ myArray: ['new value'] }

> this.setState(newState);
undefined

> this.state
{ myArray: ['el1'] }
```

As you can see, the entirety of `myArray` was replaced with a new array containing only
a single element! Although not immediately obvious from `renderGuests`' JSX, the result
makes sense when we observe it in action.

To get around this, we need a modified version of the `model()` method that can retrieve
the array from the state object (even if it is nested several layers deep), modify the
nested property value at the specified array index, and place the entire array back into
the state object. So the method signature has to look like this:

```js
function arrayItem(pathToArray = '', index = 0, arrayElementNestedObjectProperty = '') {}
```

Then instead of `model('guests[0].name')`, we would call `arrayItem('guests', 0, 'name')`.

Now that you've seen the new method's signature, you probably won't have trouble inferring
its implementation. Again, using `lodash`:

```js
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

      context.setState(newState);

      if (typeof context.handleChange === 'function') {
        context.handleChange(pathToArray, index, newValue, originalValue, arrayElementSubPath);
      }
    }
  };
}
```

Now, you modify the `input` tag in your `renderGuests()` method to call the new array
binder:

```jsx harmony
renderGuests(arrayItem) {
  // ...

      <input type="text" {...arrayItem('guests', i, 'name')}
             readOnly={!this.state.isGoing} />

  // ...    
```

Add `arrayItem()` to `bindModel.js`:

```js
import get from 'lodash.get';
import set from 'lodash.set';

function bindModel(context) {
  return {
    model(path) {
    // ...
    },

    arrayItem(pathToArray, index, arrayElementSubPath) {
    // ...
```

... and get a reference to it in your component's `render()` method:

```jsx harmony
  render() {
    const { model, arrayItem } = bindModel(this);

    return (
        <div>
          <form>
            <label>
              <input type='checkbox' {...model('isGoing')} />
              Attending&nbsp;
            </label>

            <button onClick={this.addGuest}>&nbsp;Add guest</button>
            { this.renderGuests(arrayItem) }
          </form>

          <label>{this.summary()}</label>
        </div>
    );
  }
```

This completes our full-featured two-way data binding library for ReactJS. To see the
full source for this example, go to
https://github.com/abraham-serafino/react-data-binding/tree/Part-III

You can also contact me with questions at [abraham.serafino@mail.com](mailto:abraham.serafino@mail.com).
