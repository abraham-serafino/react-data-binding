# react-data-binding

What do Aurelia, VueJS, and Angular have in common? All three are modern frameworks that support two-way data binding.
Of course, ReactJS famously omits this feature, and I believe the standard excuse runs along the lines of,
"Flux is better."

Write enough change handlers, and you will eventually realize that what you are doing amounts to implementing your own
version of two-way data binding. Why re-invent the wheel this way, when `onChange` and `value` -- the two attributes we
use to bind state to our forms -- can be abstracted into a couple of simple methods? **react-data-binding**
demonstrates how to do this.

In [Part I,](https://github.com/abraham-serafino/react-data-binding/tree/Part-I)we
will implement rudimentary two-way data binding between component state and JSX.

In [Part II,](https://github.com/abraham-serafino/react-data-binding/tree/Part-II)we
add support for nested objects within state by incorporating lodash.

Finally, in [Part III,](https://github.com/abraham-serafino/react-data-binding/tree/Part-III)we
round out the library with support for arrays _of_ nested objects.

Feel free to contact me with questions at [abraham.serafino@mail.com](mailto:abraham.serafino@mail.com).


https://objectpartners.com/2017/04/24/two-way-data-binding-in-reactjs-part-i

https://objectpartners.com/2017/04/26/two-way-data-binding-in-reactjs-part-ii

https://objectpartners.com/2017/04/28/two-way-data-binding-in-reactjs-part-iii
