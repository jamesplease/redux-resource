# User Feedback

It's important to provide a user with feedback of the status of CRUD operation
requests. When applications don't provide good request feedback, users often
lose confidence in the tool. You may have experienced this first hand if you've
ever clicked a button within an application, then thought to yourself,
"Did that work?"

In this recipe, we will cover some tips for providing good feedback to your
user when requests occur. Think of these as guidelines, rather than rules set in
stone. Different applications will require different user experiences.

### Pending Requests

You should communicate to the user when a request is in flight. This lets them
know that the application is still processing the operation.

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
page, contributing to a terrible user experience.

In many situations, a better approach is to display a loading indicator nearby
the affected elements on the page. For instance, if the user is deleting a
resource from a list of resources, then perhaps it makes sense for a spinner to
be displayed next to the resource's name. This allows the user to initiate
multiple delete requests at once, while keeping track of each their statuses
independently. It also doesn't interfere with any other content on the page.

#### Disabling Interface Elements

Sometimes, it makes sense to disable aspects of an interface when a CRUD
request is in flight. Always take a minimalist approach when it comes
to disabling interface elements: disable as little as possible.

A short list of situations where it might make sense to disable an element are:

- When a user clicks a button to delete a resource. It doesn't make sense to
  have two delete requests for a resource in flight at once.

- When a user clicks a button to make a purchase.

- When a user clicks the "create" button to create a new resource.

Sometimes, developers go too far when they disable interface elements. For
instance, overing the whole page, or a large portion of the page, which a
loading indicator effectively disables those regions.

If you're using React, an example code snippet of disabling a button is:

```jsx
render() {
  const { state } = this.props;
  const readStatus = getStatus(state, 'books.meta[24].readStatus');

  return (
    <div>
      <button disabled={readStatus.pending}>
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

Users typically know immediately when a read request succeeds because the data
that was fetched is displayed in the interface. For other requests,
you should provide some other indicator.

Some examples of indicators include:

- A toast or notification that appears, stating that the operation succeeded.

- Text appearing elsewhere on the interface, stating that the request succeeded.
  This is frequently seen on account and settings pages when changes are made.

- If a spinner is used for the loading state, it could be transformed into
  a green checkmark, indicating success

There are many other ways to indicate success, as well.

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
