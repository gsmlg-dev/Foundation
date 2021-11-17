<div align="center">
<h1>eslint-config-gsmlg</h1>

<p>ESLint rules for all of my personal projects. Feel free to use these conventions :-)</p>
</div>

---

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
- [Usage](#usage)
  - [Other configs](#other-configs)
  - [Things to know](#things-to-know)
- [Issues](#issues)
  - [🐛 Bugs](#-bugs)
  - [💡 Feature Requests](#-feature-requests)
- [LICENSE](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

This module is distributed via [npm][npm] which is bundled with [node][node] and
should be installed as one of your project's `devDependencies`:

```
npm install --save-dev eslint-config-gsmlg
```

This library has a required `peerDependencies` listing for [`eslint`][eslint]

## Usage

Then add the extends to your `.eslintrc.js`:

```javascript
module.exports = {
  extends: 'gsmlg',
  rules: {
    // your overrides
  },
}
```

### Other configs

This config also exposes a few other configs that I use often and pull in as
needed.

You can use them standalone:

```javascript
module.exports = {
  extends: 'gsmlg/<config-name>',
}
```

Or in combination with the base config (recommended)

```javascript
module.exports = {
  extends: ['gsmlg', 'gsmlg/<config-name>'],
}
```

**Note**: Due to [this bug](https://github.com/eslint/eslint/issues/3458) you
need to have the associated plugins installed to make things work. I recommend
adding them as dependencies to your project if you're going to use the config
for it.

- `jest`: [jest](http://facebook.github.io/jest/) testing framework
- `jsx-a11y`:
  [eslint-plugin-jsx-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y)
  for rules regarding accessibility with JSX (_eslint-plugin-jsx-a11y_)
- `react`: [React](https://www.npmjs.com/package/react) JS library
  (_eslint-plugin-react_)
- `@typescript-eslint`:
  [@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser)
  and
  [@typescript-eslint/eslint-plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin).

### Things to know

- The default config uses `@babel/eslint-parser` to support stage features that
  ESLint doesn't support and it opts to use the `@babel/eslint-plugin` rules
  over the ESLint rules to support rules for these features as well.
- All plugins needed for rules used by these configs are dependencies of this
  module so you don't have to install anything on your own.
- The default config actually is composed of several configurations and you can
  use those individually. These are the configs it's using:
  `possible-errors.js`, `best-practices.js`, `stylistic.js`, `es6/index.js`, and
  `import/index.js`. You can use each of these configs yourself if you want to
  leave my own personal style out of it. Also, the `es6` and `import` configs
  each have a `possible-errors.js`, `best-practices.js`, and `stylistic.js`
  which they are composed of as well.

#### Example of highly customized config

```javascript
module.exports = {
  extends: [
    'gsmlg/possible-errors',
    'gsmlg/best-practices',
    'gsmlg/es6/possible-errors',
    'gsmlg/import',
    'gsmlg/jest',
  ],
  rules: {
    /* custom rules */
  },
}
```

## Issues

_Looking to contribute? Look for the [Good First Issue][good-first-issue]
label._

### 🐛 Bugs

Please file an issue for bugs, missing documentation, or unexpected behavior.

[**See Bugs**][bugs]

### 💡 Feature Requests

Please file an issue to suggest new features. Vote on feature requests by adding
a 👍. This helps maintainers prioritize what to work on.

[**See Feature Requests**][requests]

## LICENSE

MIT


## Inspiration

This is forked from [kcd-scripts](https://github.com/kentcdodds/eslint-config-kentcdodds).
