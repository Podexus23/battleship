const start = require('../code/default');

it('async test is working', () => {
  start().then((res) => expect(res).toBe('async is working'));
});
