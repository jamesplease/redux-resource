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

This repository has the core library, as well as additional libraries that can
be useful when working with Resourceful Redux. All of the source code for
these packages is in the `packages` directory.

Find the library you're interested in updating, and make changes as you see fit.

As you work, and/or when you're done, run `npm test` to lint your changes, and
to run the unit tests.

### Contributing to the Website

For working on the site, you can run `npm run docs:watch` to start up the
local version of the site.

The source code for the site lives in the `docs` directory. As you make changes,
your local version of the website will automatically update and refresh your
browser.

### Troubleshooting

Running into problems? Sorry about that! Go ahead and
[open an issue](https://github.com/jmeas/resourceful-redux/issues/new?title=Contributing+help),
and we'll do our best to help out.
