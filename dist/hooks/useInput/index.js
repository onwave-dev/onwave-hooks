import { useState } from "react";
export var useInput = function (initialValue) {
    var _a = useState(initialValue), value = _a[0], setValue = _a[1];
    var handleChange = function (e) {
        setValue(e.target.value);
    };
    return { value: value, onChange: handleChange };
};
//# sourceMappingURL=index.js.map