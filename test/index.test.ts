import { greet } from '../src';

describe('greet', () => {
    test('a greeting message is returned', () => {
        const target = 'world'
        const message = greet(target)
        expect(message).toMatch('Hello world!');
    });
});
