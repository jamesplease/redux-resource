# Contributing

If you'd like to work on the source code or documentation, follow these
instructions.

First, clone this repository, and then navigate into the repository's directory.

```sh
git clone git@github.com:jmeas/resourceful-redux.git

cd resourceful-redux
```

Next, install the dependencies using [npm](https://www.npmjs.com/).

```js
npm install && npm run bootstrap
```

### Contributing to the Code

This repository contains the core Resourceful Redux library, as well as
additional libraries ("extensions") that can be useful when using Resourceful
Redux. Each package can be found in its own directory within the `packages`
directory.

Find the library you're interested in updating, and make changes as you see fit.

As you work, and/or when you're done, run `npm test` to lint your changes, and
to run the unit tests.

If you can't get the tests to pass, or you can't finish the feature, don't sweat
it.

:ok_hand: Once you're done, go ahead and open a Pull Request!

p.s. don't sweat it if you can't get the tests to pass, or if you can't finish
the changes you'd like to make. Open up a Pull Request and we'll make sure it
gets figured out!

### Contributing to the Website

The source code for the site lives in the `docs` directory.

Run `npm run docs:watch` to start up the local version of the site at
`http://localhost:4000`. As you make changes to the source, your local version
of the website will automatically update and refresh your browser.

Once you're done, commit your changes and open a Pull Request! Also, thanks!

### Troubleshooting

:see_no_evil: Running into problems? Sorry about that! Go ahead and
[open an issue](https://github.com/jmeas/resourceful-redux/issues/new?title=Contributing+help),
and we'll do our best to help out.
