# Resourceful Redux

A tiny but powerful system for managing 'resources': data that is persisted to
remote servers.

[![Gitter](https://badges.gitter.im/jmeas/resourceful-redux.svg)](https://gitter.im/jmeas/resourceful-redux?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![Travis build status](http://img.shields.io/travis/jmeas/resourceful-redux.svg?style=flat)](https://travis-ci.org/jmeas/resourceful-redux)
[![npm version](https://img.shields.io/npm/v/resourceful-redux.svg)](https://www.npmjs.com/package/resourceful-redux)
[![Test Coverage](https://codeclimate.com/github/jmeas/resourceful-redux/badges/coverage.svg)](https://codeclimate.com/github/jmeas/resourceful-redux)
[![Code Climate GPA](https://codeclimate.com/github/jmeas/resourceful-redux/badges/gpa.svg)](https://codeclimate.com/github/jmeas/resourceful-redux)
[![gzip size](http://img.badgesize.io/https://unpkg.com/resourceful-redux/dist/resourceful-redux.min.js?compression=gzip)](https://unpkg.com/resourceful-redux/dist/resourceful-redux.min.js)

### Installation

To install the latest stable version:

```
npm install --save resourceful-redux
```

### Size

Resourceful Redux is around 2kb gzipped, which is typically _much_ smaller than
the boilerplate code that it replaces.

### Documentation

View the documentation at
**[resourceful-redux.js.org ⇗](https://resourceful-redux.js.org/)**.

### Repository Structure

This repository is a [Lerna](https://github.com/lerna/lerna) project. That means
it's a single repository that allows us to control the publishing of a number
of packages:

| Package | Version | Size | Description |
| ---- | ---- | ---- | ---- |
| `resourceful-redux` | [![npm version](https://img.shields.io/npm/v/resourceful-redux.svg)](https://www.npmjs.com/package/resourceful-redux) | [![gzip size](http://img.badgesize.io/https://unpkg.com/resourceful-redux/dist/resourceful-redux.min.js?compression=gzip)](https://unpkg.com/resourceful-redux/dist/resourceful-redux.min.js) | The main library |
| `resourceful-action-creators` | [![npm version](https://img.shields.io/npm/v/resourceful-action-creators.svg)](https://www.npmjs.com/package/resourceful-action-creators) | [![gzip size](http://img.badgesize.io/https://unpkg.com/resourceful-action-creators/dist/resourceful-action-creators.min.js?compression=gzip)](https://unpkg.com/resourceful-action-creators/dist/resourceful-action-creators.min.js) | The Action Creators extension |
| `resourceful-prop-types` | [![npm version](https://img.shields.io/npm/v/resourceful-prop-types.svg)](https://www.npmjs.com/package/resourceful-prop-types) | [![gzip size](http://img.badgesize.io/https://unpkg.com/resourceful-prop-types/dist/resourceful-prop-types.min.js?compression=gzip)](https://unpkg.com/resourceful-prop-types/dist/resourceful-prop-types.min.js) | The Prop Types extension |

### Contributing

Thanks for your interest in helping out! Check out the
[Contributing Guide](./CONTRIBUTING.md), which covers everything you'll need to
get up and running.
