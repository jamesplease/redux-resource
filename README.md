# Resourceful Redux

A simple but powerful system for managing 'resources': data that is persisted to
remote servers.

[![Gitter](https://badges.gitter.im/jmeas/resourceful-redux.svg)](https://gitter.im/jmeas/resourceful-redux?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![Travis build status](http://img.shields.io/travis/jmeas/resourceful-redux.svg?style=flat)](https://travis-ci.org/jmeas/resourceful-redux)
[![Test Coverage](https://codeclimate.com/github/jmeas/resourceful-redux/badges/coverage.svg)](https://codeclimate.com/github/jmeas/resourceful-redux)
[![Code Climate GPA](https://codeclimate.com/github/jmeas/resourceful-redux/badges/gpa.svg)](https://codeclimate.com/github/jmeas/resourceful-redux)

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

| Package | Version | Description |
| ---- | ---- | ---- |
| `resourceful-redux` | [![npm version](https://img.shields.io/npm/v/resourceful-redux.svg)](https://www.npmjs.com/package/resourceful-redux) | The main library |
| `resourceful-action-creators` | [![npm version](https://img.shields.io/npm/v/resourceful-action-creators.svg)](https://www.npmjs.com/package/resourceful-action-creators) | The Action Creators extension |
| `resourceful-prop-types` | [![npm version](https://img.shields.io/npm/v/resourceful-prop-types.svg)](https://www.npmjs.com/package/resourceful-prop-types) | The Prop Types extension |

### Contributing

Thanks for your interest in helping out! Check out the
[Contributing Guide](./CONTRIBUTING.md), which covers everything you'll need to
get up and running.
