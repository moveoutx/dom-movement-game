Object.defineProperty(global, 'HTMLMediaElement', {
    writable: true,
    value: {
        prototype: {
            pause: jest.fn(),
            play: jest.fn(),
            load: jest.fn(),
        },
    },
});