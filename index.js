var postcss = require('postcss');
var mediaQuery = require('css-mediaquery');

var defaultOptions = {
    type: 'all',
    minWidth: -Infinity,
    maxWidth: Infinity
};

module.exports = postcss.plugin('postcss-media-query-filter', function (options) {
    var minBoundaryOptions = {
        type: options.type || defaultOptions.type,
        width: options.minWidth || defaultOptions.minWidth,
        modifier: 'min'
    };

    var maxBoundaryOptions = {
        type: options. type || defaultOptions.type,
        width: options.maxWidth || defaultOptions.maxWidth,
        modifier: 'max'
    };

    return function (root) {
        root.walkAtRules('media', function (rule) {
            var isMinMatching = mediaQuery.match(rule.params, minBoundaryOptions);
            var isMaxMatching = mediaQuery.match(rule.params, maxBoundaryOptions);

            if (isMinMatching && isMaxMatching) {
                // MQ matches both boundaries - should unwrap it to save some bytes
                rule.replaceWith(rule.nodes);
            } else if (!isMinMatching && !isMaxMatching) {
                // MQ does not match both boundaries - means,
                // it is outside of expected viewport and should be removed
                rule.remove();
            }
            // Otherwise - MQ matches only one boundary,
            // and should be left it as is
        });
    };
});
