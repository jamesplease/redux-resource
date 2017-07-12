# Resourceful Redux

A simple but powerful system for managing 'resources': data that is persisted to
remote servers.

[![Gitter](https://badges.gitter.im/jmeas/resourceful-redux.svg)](https://gitter.im/jmeas/resourceful-redux?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![Travis build status](http://img.shields.io/travis/jmeas/resourceful-redux.svg?style=flat)](https://travis-ci.org/jmeas/resourceful-redux)
[![npm version](https://img.shields.io/npm/v/resourceful-redux.svg)](https://www.npmjs.com/package/resourceful-redux)

### Installation

To install the latest stable version:

```
npm install --save resourceful-redux
```

### Size

Resourceful Redux is around 13kb minified, which is typically much smaller than
the boilerplate code that it replaces.

### Documentation

View the documentation at
**[resourceful-redux.js.org ⇗](https://resourceful-redux.js.org/)**.

### Repository Structure

This repository is a [Lerna](https://github.com/lerna/lerna) project. That means
it's a single repository that allows us to control the publishing of a number
of packages:

- `resourceful-redux`: The main library
- `resourceful-action-creators`: Resourceful Action Creators
- `resourceful-prop-types`: Resourceful Prop Types
