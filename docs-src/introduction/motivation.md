# Motivation


A common requirement when working with Redux is managing the state of data that
is persisted to a server. Because working with remote data requires communicating
over a network, reading and writing this data can take time, and also fail.

One key tenant to good user interface design is giving feedback to the users of
the application. Showing the user the status of their actions requires tracking
data about each of these requests: which are in flight, which have failed,
and which have succeeded?

Redux provides great tools to write your own reducers to handle this. For some
teams and projects, manually writing the reducer may work really well.

For lager projects, you might run into problems if you continue writing these
reducers by hand.

You may store the information about requests in a different way for different
pieces of data. This inconsistency in the data will be reflected in the views
that you write to display this data: they will be inconsistent, too. Inconsistent
code bases are more difficult to maintain and work with. Ensuring that all of
this information is represented similarly increases developer productivity.

In addition, tracking all of this data for every request requires writing a lot
of code. You may omit writing some of that code to save on time, which results
in having less data to use to provide feedback to the users of your
applications.

resourceful-redux is intended to solve these problems. It provides a system of
organizing information about data in a consistent way. It also comes with a
reducer that keeps track of as much information as possible about every request
made to remote servers.

Use resourceful-redux to free up your time to build great interfaces, rather
than writing boilerplate reducer code.
