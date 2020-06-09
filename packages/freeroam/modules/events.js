"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../helpers/log");
const utils_1 = require("../helpers/utils");
const players = {};
mp.events.add('playerJoin', (player) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        player.db =
            (yield utils_1.default.getUserFromQ({ playerId: player.id }))
                || utils_1.default.createUser({ playerId: player.id, name: player.name });
        player.customData = {};
        console.log('Join ' + player.name);
        players[player.id] = player;
        player.health = 100;
        player.armour = 100;
    }
    catch (e) {
        log_1.default.error('playerJoin:' + e);
    }
}));
mp.events.add('playerQuit', (player, reason) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield player.db.save();
        delete players[player.id];
        console.log('Quit', player.name, reason);
    }
    catch (e) {
        log_1.default.error('playerQuit:' + e);
    }
}));
mp.events.add('playerDeath', (player, reason, killer) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Death', player.name, reason, killer);
    }
    catch (e) {
        log_1.default.error('playerQuit:' + e);
    }
}));
//# sourceMappingURL=events.js.map



let dynamicPed = mp.peds.new(mp.joaat('mp_m_freemode_01'), new mp.Vector3(10, 10, 10), 270, 0, 10, { dynamic: true });

console.log('>>>', dynamicPed.clearPedTasks);