'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');

var useInput = function (initialValue) {
    var _a = react.useState(initialValue), value = _a[0], setValue = _a[1];
    var handleChange = function (e) {
        setValue(e.target.value);
    };
    return { value: value, onChange: handleChange };
};

exports.useInput = useInput;
//# sourceMappingURL=index.js.map
