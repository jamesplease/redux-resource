# Motivation

A common requirement when working with Redux is managing state that is persisted
to a server. Because communicating with remote servers requires sending messages
over a network, reading and writing this state does not happen instantly. The
requests take time, and they may sometimes fail.

This has an impact on the user interfaces that we build. One tenet of good user
interface design is to always provide feedback to the users of the application.
When it comes to network requests, users need to know which requests are in
flight, which have failed, and which have succeeded.

When using Redux, this means writing reducers that manage this state as requests
are made. For some projects, manually writing the reducers may work well. For
larger projects, you might run into problems if you continue writing these
reducers by hand.

For one, the data representing these requests may be stored in different ways
for different parts of the store. This inconsistency in your data will
propagate to the view layer. Code bases that are not consistent are more
difficult to maintain and to work with. Ensuring that information about requests
is stored consistently will increase developer productivity.

Additionally, tracking all of this data for every request requires writing a lot
of reducer code. You may omit writing some of that code to save on time, which
has two consequences: it makes that piece of state inconsistent with others, and
it also gives you less information to work with when building your interface.
The user experience of the application may suffer as a result.

resourceful-redux is intended to solve these problems. It provides a system of
organizing information about data in a consistent way. It also comes with
reducers that keep track of as much information as possible about every request
made to remote servers, so that you don't have to.

Use resourceful-redux to have more time to build great interfaces, rather than
writing boilerplate reducer code.
