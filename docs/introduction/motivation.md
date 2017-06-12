# Motivation

A common requirement when working with Redux is managing the state of data that
is persisted to a server. User interfaces need to provide feedback to
users that are managing this data: which requests are in flight, which have
failed, and which have succeeded.

When you begin using Redux, you might first begin tracking this information
as-needed, writing a reducer for each resource as it comes up. This approach may
work well for some projects.

As your project grows, you might run into problems if you continue writing these
reducers by hand.

You may store the information in a different way for different pieces of data.
This inconsistency in the data will be reflected in the views that you write to
display this data. Inconsistent code bases are more difficult to maintain and
work with. Ensuring that all of this information is represented similarly will
increase developer productivity.

In addition, tracking all of this data for every request requires writing a lot
of code. You may omit writing some of that code to save on time, which results
in having less data to use to provide feedback to the users of your
applications.

resourceful-redux is intended to solve these problems. It provides a system of
organizing information about data in a consistent way. It also comes with a
reducer that keeps track of as much information as possible about every request
made to remote servers. Using resourceful-redux frees up your time to build
great interfaces, rather than writing boilerplate reducer code.
