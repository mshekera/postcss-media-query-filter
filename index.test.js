const postcss = require('postcss');

const plugin = require('./');

function run(input, output, options) {
    return postcss([plugin(options)]).process(input, { from: undefined })
        .then(function (result) {
            expect(result.css).toEqual(output);
            expect(result.warnings().length).toBe(0);
        });
}

it('should not crash', () => {
    return run('a{color:red;}', 'a{color:red;}', {});
});

it('should unwrap "max" rule which is higher than maxWidth', () => {
    const source = '@media all and (max-width: 400px) {a{color: red;}}';
    const expected = 'a{color: red;}';
    const options = { minWidth: 100, maxWidth: 300 };

    return run(source, expected, options);
});

it('should leave "max" matching media queries as is otherwise', () => {
    const source = '@media all and (max-width: 400px) {a{color: red;}}';
    const expected = '@media all and (max-width: 400px) {a{color: red;}}';
    const options = { minWidth: 100, maxWidth: 500 };

    return run(source, expected, options);
});


it('should unwrap "min" rule which is lower than minWidth', () => {
    const source = '@media all and (min-width: 400px) {a{color: red;}}';
    const expected = 'a{color: red;}';
    const options = { minWidth: 500, maxWidth: 900 };

    return run(source, expected, options);
});

it('should leave "min" matching media queries as is otherwise', () => {
    const source = '@media all and (min-width: 400px) {a{color: red;}}';
    const expected = '@media all and (min-width: 400px) {a{color: red;}}';
    const options = { minWidth: 300, maxWidth: 900 };

    return run(source, expected, options);
});

it('should remove NOT matching media queries from output (which are higher than maxWidth)', () => {
    const source = '@media all and (min-width: 400px) {a{color: red;}}';
    const expected = '';
    const options = { minWidth: 100, maxWidth: 300 };

    return run(source, expected, options);
});

it('should remove NOT matching media queries from output (which are lower than maxWidth)', () => {
    const source = '@media all and (max-width: 50px) {a{color: red;}}';
    const expected = '';
    const options = { minWidth: 100, maxWidth: 300 };

    return run(source, expected, options);
});
