"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
mp.events.add('contentEmit', (player, action, data) => {
    console.log(player);
});
exports.default = (action, data) => {
    mp.events.call('serverEmit', action, data);
};
//# sourceMappingURL=api.js.map