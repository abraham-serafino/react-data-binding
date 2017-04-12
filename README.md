# react-data-binding

Now that `LinkedStateMixin` has been been deprecated, we need a new, more "React-like" way to accomplish two-way
data-binding in React. Many have argued against two-way data binding; and in fact there are many examples of
AngularJS-style bindings that JSX has made obsolete (such as ng-repeat or ng-class).

However, most React programmers will eventually find themselves writing change handlers to an absurd extent; eventually,
we will have to admit to ourselves that what we are doing amounts to two-way data binding anyway.

In order to avoid re-inventing the wheel like this, we might as well abstract a couple of common methods that can
do the work for us. **react-data-binding** is an example of one way to accomplish this.
