# postcss-media-query-filter [![Build Status][ci-img]][ci]

[PostCSS] plugin which allows to remove undesirable media-queries from output depending on provided min/max width

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/mshekera/postcss-media-query-filter.svg
[ci]:      https://travis-ci.org/mshekera/postcss-media-query-filter

Let's assume next options were provided to plugin:

```js
{
  minWidth: 500,
  maxWidth: 1000,
}
```

#### Input:
```css
@media all and (min-width: 100px) {
  .cn1 {
    color: red;
  }
}

@media all and (min-width: 200px) and (max-width: 600px) {
    .cn2 {
        color: blue;
    }
}

@media all and (max-width: 400px) {
    .cn3 {
        color: green;
    }
}

@media all and (min-width: 1200px) {
    .cn4 {
        color: white;
    }
}
```

#### Output:
```css
.cn1 {
    color: red;
}

@media all and (min-width: 200px) and (max-width: 600px) {
    .cn2 {
        color: blue;
    }
}
```

## Usage

```js
postcss([ require('postcss-media-query-filter')(options) ])
```

Options:
* minWidth - Number (defaults to -Infinity) - styles for lower width will be treated as not needed
* maxWidth - Number (defaults to Infinity) - styles for higher width will be treated as not needed
* type - String (defaults to screen) - media query type which will be used by [css-mediaquery](https://www.npmjs.com/package/css-mediaquery) for matching (all, screen, print etc)

See [PostCSS] docs for examples for your environment.
