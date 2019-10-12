var check = require('./utils/htmlVersionCode').checkVersion;

test('test check version for html5',() => {
    expect(check('<!doctype html>')).toBe('HTML5');
});