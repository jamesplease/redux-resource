# Contributing

> :wave: Hey there! Thanks for your interest in helping out. If you happen to
run into any issues following this guide, please
[open an issue](https://github.com/jmeas/redux-resource/issues/new?title=Contributing+help),
and we'll do our best to help out.

To begin contributing, you'll first need to
[clone this repository](https://help.github.com/articles/cloning-a-repository/),
then navigate into the repository's directory.

```sh
git clone git@github.com:jmeas/redux-resource.git

cd redux-resource
```

Next, install the dependencies using [npm](https://www.npmjs.com/).

```js
npm install && npm run bootstrap
```

### Contributing to the Code

This repository contains the main Redux Resource library (`redux-resource`
on npm), as well as extras 
(["Ecosystem Extras"](https://redux-resource.js.org/docs/extras/)) that can be useful when
using Redux Resource. Each package has its own directory within the
`packages` directory of this repository.

Find the library you're interested in updating, and make changes as you see fit.
As you work, and/or when you're done, run `npm test` to lint your changes, and
to run the unit tests.

Once you're done, go ahead and open a Pull Request.

> :information_desk_person: Don't sweat it if you can't get the tests to pass,
or if you can't finish the changes you'd like to make. If you still open up a
Pull Request, we'll make sure it gets figured out.

##### Useful npm Scripts

These scripts are useful when working on the source code.

- `npm test`: Lint the source and run the unit tests (for all packages)
- `npm run build`: Build all of the libraries
- `npm bootstrap`: Links the libraries together. This is usually run a single
  time after an `npm install`
- `npm run clean`: The inverse of `npm bootstrap`; this wipes the `node_modules` from
  all of the packages.

### Contributing to the Website

The source code for the site lives in the `docs` directory.

Run `npm run docs:watch` to start up the local version of the site at
`http://localhost:4000`. As you make changes to the source, your local version
of the website will automatically update and refresh your browser.

Once you're done, commit your changes and open a Pull Request. Also, thanks!

##### Useful npm Scripts

These scripts are useful when working on the website.

- `npm run docs:watch`: Starts up a local version of the website.
- `npm run docs:clean`: Wipes your locally-built version of the site. This can be useful
  if you run into any weird errors.
- `npm run docs:publish`: Publishes the site. Only collaborators on the GitHub project
  will be able to run this one.

### Adding Yourself as a Contributor

If you make a contribution to this project, you should go ahead and add yourself
to the list of contributors on the
[README](https://github.com/jmeas/redux-resource#contributors) and the
[website](https://redux-resource.js.org/#contributors).

To add yourself, run this command from the terminal:

```
npm run contributors:add -- {GITHUB_USERNAME} {CONTRIBUTIONS}
```

Where `{GITHUB_USERNAME}` is your GitHub account name, and `{CONTRIBUTIONS}` is a
comma-separated list of values from
[this guide here](https://github.com/jfmengels/all-contributors-cli#addupdate-contributors).

For instance, if you've contributing docs and code and your username is `sallycodes`,
you might do:

```
npm run contributors:add -- sallycodes doc,code
```

This command will update the necessary files and make a commit for you. From there, you can
open a Pull Request and I'll get it merged in. Oh, and hey – thanks again!