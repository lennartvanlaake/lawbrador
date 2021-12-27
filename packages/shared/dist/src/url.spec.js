"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("./url");
const chai_1 = require("chai");
const config = {
    base: 'http://text.com',
    pathComponents: [{ value: 'static' }, { variableName: 'var1' }],
    queryComponents: {
        static: { value: 'x' },
        dynamic: { variableName: 'var2' },
        empty: { variableName: 'var3' },
    },
};
describe('Test if url building works', () => {
    it('Testing URL with path and query variables', () => {
        const output = (0, url_1.buildUrl)({ var1: '1', var2: '2 3' }, config);
        (0, chai_1.expect)(output).to.eq('http://text.com/static/1?static=x&dynamic=2%203');
    });
    it('Throws if path param is not provided ', () => {
        (0, chai_1.expect)(() => (0, url_1.buildUrl)({}, config)).to.throw;
    });
});
describe('Test if extracting variables from URL worls', () => {
    it('Testing URL with path and query variables', () => {
        const url = 'http://text.com/static/1?static=x&dynamic=2%203';
        const output = (0, url_1.extractUrlVariables)(url, config);
        (0, chai_1.expect)(output).to.eql({ var1: '1', var2: '2 3' });
    });
});
//# sourceMappingURL=url.spec.js.map