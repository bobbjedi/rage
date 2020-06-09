mp.events.add('serverEmit', (action, data) => {
// switch/case
});

export default (action, data) => {
    mp.events.call('contentEmit', action, data);
};