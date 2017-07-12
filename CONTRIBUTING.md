# Contributing

> :wave: Hey there! Thanks for your interest in helping out. If you happen to
run into any issues following this guide, please
[open an issue](https://github.com/jmeas/resourceful-redux/issues/new?title=Contributing+help),
and we'll do our best to help out.

To begin contributing, you'll first need to
[clone this repository](https://help.github.com/articles/cloning-a-repository/),
then navigate into the repository's directory.

```sh
git clone git@github.com:jmeas/resourceful-redux.git

cd resourceful-redux
```

Next, install the dependencies using [npm](https://www.npmjs.com/).

```js
npm install && npm run bootstrap
```

### Contributing to the Code

This repository contains the main Resourceful Redux library (`resourceful-redux`
on npm), as well as additional libraries
(["extensions"](https://resourceful-redux.js.org/)) that can be useful when
using Resourceful Redux. Each package has its own directory within the
`packages` directory of this repository.

Find the library you're interested in updating, and make changes as you see fit.
As you work, and/or when you're done, run `npm test` to lint your changes, and
to run the unit tests.

Once you're done, go ahead and open a Pull Request.

> :information_desk_person: Don't sweat it if you can't get the tests to pass,
or if you can't finish the changes you'd like to make. If you still open up a
Pull Request, we'll make sure it gets figured out.

### Contributing to the Website

The source code for the site lives in the `docs` directory.

Run `npm run docs:watch` to start up the local version of the site at
`http://localhost:4000`. As you make changes to the source, your local version
of the website will automatically update and refresh your browser.

Once you're done, commit your changes and open a Pull Request. Also, thanks!
