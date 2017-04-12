# react-data-binding

What do Aurelia, VueJS, and Angular have in common? All three are modern frameworks that support two-way data binding.
Of course, ReactJS famously omits this feature, and I believe the standard excuse goes something along the lines of,
"Flux is better."

Except it isn't. React developers usually find themselves repeating the work of writing change handlers, a hold-over
from jQuery.

Write enough change handlers, and you will eventually realize that what you are doing amounts to implementing your own
version of two-way data binding. Why re-invent the wheel this way, when `onChange` and `value` -- the two attributes we
use to bind state to our forms -- can be abstracted into a couple of simple methods? **react-data-binding**
demonstrates how to do this.
