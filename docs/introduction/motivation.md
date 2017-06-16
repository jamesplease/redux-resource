# Motivation

Many applications work with state that is persisted to a server. Because
communicating with remote servers requires sending messages over a network,
reading and writing this state does not happen instantly. The requests take
time, and they may sometimes fail.

It's a developer's job to provide feedback to users about network
requests. When using Redux, this requires writing reducers that change the state
based on the status of these requests. For projects with many resources, you can
run into problems when you write these reducers by hand.

You might store request data in a different way for different resources. This
inconsistency will propagate to your view layer. Code bases that are
not consistent are more difficult to maintain.

Additionally, tracking all of this data for every request requires writing a lot
of reducer code. You may omit writing some of that code to save on time. This
contributes to consistency, and also gives you, as the developer, less
data to use to provide feedback to your users.

resourceful-redux is intended to solve these problems. It provides a system of
organizing information about request state in a consistent way. It also comes
with reducers that keep track of as much information as possible about every
request made to remote servers, so that you don't have to.

Use resourceful-redux to have more time to build great interfaces, rather than
writing boilerplate reducer code.
