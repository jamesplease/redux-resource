# User Feedback

It's important to provide a user with feedback of the status of network
requests. When applications don't provide good request feedback, users will
lose confidence in the app. You may have experienced this first hand if you've
ever clicked a button within an application, and then thought to yourself,
"Did that work?"

You don't want to create those negative experiences, and when you use Redux Resource,
you have all of the information you need to create good ones instead.

In this recipe, we will cover some tips for providing good feedback to your
user around requests. Think of these tips as guidelines, rather than rules set in
stone. Different applications require different user experiences.

### Pending Requests

You should visually communicate to the user anytime that a request is in flight. This
lets them know that the application is processing the operation.

The [`getState`](/docs/api-reference/get-state.md) method returns an object with
a `pending` property, which will be `true` whenever the associated request is in
flight. You can use this to show a spinner, for instance. If you're using React,
this might look like:

```jsx
render() {
  const { state } = this.props;
  const readStatus = getStatus(state, 'books.meta[24].readStatus');

  return (
    <div>
      {readStatus.pending && (<Spinner/>)}
    </div>
  );
}
```

A spinner is a common pattern for indicating that an operation is underway, but
it doesn't work in every situation. For instance, you might know that the
request will take awhile, such as large file uploads. In those situations, it
might make sense to use a different element, such a a progress bar, to represent
the progress of the request.

Regardless of how you communicate the loading state, loading indicators should
be unobtrusive. Some applications will overlay the whole interface, or a large
section of the interface, with a spinner
whenever an action occurs. This prevents the user from taking any other
action with the page while also hindering their ability to read content on the
page. This is a bad user experience.

In many situations, a better approach is to display a loading indicator near to
the affected elements on the page. For instance, if the user is deleting a
resource from a list of resources, then perhaps it makes sense for a spinner to
be displayed next to the delete button that they clicked. This prevents
the spinner from interfering with other, unrelated elements on the page.

#### Disabling Interface Elements

Sometimes, it makes sense to disable elements of an interface when a CRUD
request is in flight. Always take a minimalist approach when it comes
to disabling interface elements: disable as little as possible.

Typically, if a user clicks a button to initiate a request, then you will
want to disable that button so that they don't submit multiple requests at
the same time.

Some example buttons that you should consider disabling are:

- a delete button. It doesn't make sense for two delete requests to be in
  flight at the same time.

- a payment button

- a "save" button to save their changes to a resource

Sometimes, developers go too far when they disable interface elements. For
instance, some applications cover the entire page, or a large portion of the
page, with a loading indicator. This prevents the user from interacting
with a large portion of the page, which is a poor user experience.

If you're using React, an example code snippet of disabling a button is:

```jsx
render() {
  const { state } = this.props;
  const deleteStatus = getStatus(state, 'books.meta[24].deleteStatus');

  return (
    <div>
      <button disabled={deleteStatus.pending}>
        Delete Book
      </button>
    </div>
  );
}
```

### Failed Requests

When a request fails, there should be a human-readable message that states that
the request was unsuccessful. Unless your users are developers, error codes
probably won't be helpful to users. A message that simply says "There was an
error with your request." can provide a better user experience than one that
says "Error code 2603," even though it _technically_ contains less information.

I don't mean to convey that error codes aren't useful. They can be! Especially
in logs and diagnostics. But always ask yourself if it makes sense to display
them to the user.

If you're able to convert an error code into a more specific, human-readable
message (like "You must provide an email address."), then that's even better.

In addition to an explanatory message, it sometimes makes sense to provide the
user with a link to attempt the operation again as part of the message. In
React, a typical error message might look like the following:

```jsx
render() {
  const { state } = this.props;
  const readStatus = getStatus(state, 'books.meta[24].readStatus');

  return (
    <div>
      {readStatus.failed && (
        <div>
          <span>
            There was an error fetching the book.
          </span>
          <button onClick={this.fetchBook}/>
            Retry.
          <button>
        </div>  
      )}
    </div>
  );
}
```

An even better UI would distinguish between different error types. Why was
there an error? Did the network request fail because the user lost their
internet connection? Did they get logged out? Did some form data fail
server-side validation?

You can store information about the error on the response object to provide
an even better user experience.

#### Unauthorized Responses

Some applications expire a user's session after a period of time. When that
occurs, the user won't be able to perform any CRUD operations until they log
back in.

There is [a recipe](/docs/recipes/unauthorized-responses.md) that provides you
with a Boolean that is `true` whenever this happens. Once you have that value,
you can let the user know that they've been logged out.

One way to do this would be to open a modal letting them know what happened,
and what they need to do. You can even make the modal have one button,
"Log in again." If you choose to use this method, be considerate of the fact
that a user may have been inputting data into a form. If you interrupt their
workflow like this, it's wise to save their work into local storage, and let
them know that when they log in, the information that they've entered won't be
lost.

If you're using React, the code to do this may look like the following:

```jsx
render() {
  const { unauthorized } = this.props;

  return (
    <div>
      {unauthorized && (<LoggedOutModal/>)}
    </div>
  );
}
```

### Successful Requests

Users typically know when a read request succeeds because the data
that was fetched is displayed in the interface. For other requests, such as
updating a resource or deleting a resource, you should consider providing
some other indicator.

Some examples of indicators include:

- A toast or notification that appears, stating that the operation succeeded.

- Text appearing on the interface, stating that the request succeeded. This approach
  is frequently seen on account and settings pages when changes are made.

- If a spinner is used for the loading state, it could be transformed into
  a green checkmark, indicating success.

This list is not meant to be exhaustive; there are many other ways to indicate success.

Success indicators follow a similar pattern to the other indicators if you're
using React. For instance:

```jsx
render() {
  const { state } = this.props;
  const updateState = getStatus(state, 'books.meta[24].updateStatus');

  return (
    <div>
      {updateState.succeeded && ('Your settings have been updated')}
    </div>
  );
}
```
