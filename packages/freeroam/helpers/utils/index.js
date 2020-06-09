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
const DB_1 = require("../../modules/DB");
const log_1 = require("../log");
const _ = require("underscore");
exports.default = {
    round(n) {
        return Number(n.toFixed(0));
    },
    unix() {
        return new Date().getTime();
    },
    getUserFromQ(q) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DB_1.usersDb.findOne(q);
        });
    },
    createUser(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new DB_1.usersDb({
                _id: params.playerId,
                name: params.name,
                lvl: 1,
                weapons: [],
                currentExp: 0
            });
            return { success: true, result: user };
        });
    },
    updateUserDeposit(user, amount, coinName, isNoNeedSave) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('updateUserDeposit>', user.deposits[coinName], amount, coinName);
            if (!coinName) {
                return log_1.default.error('updateUserDeposit NO_coinName: ' + user.login + ': ' + coinName);
            }
            try {
                if (_.isNumber(amount) && amount !== 0) {
                    user.deposits[coinName] = this.round(user.deposits[coinName] + amount);
                    this.updateChipsUserPlayers(user, coinName);
                    if (!isNoNeedSave) {
                        yield user.save();
                    }
                    return;
                }
                log_1.default.warn('updateUserDeposit amount isNOtNUMBER: ' + coinName + ' ' + amount);
            }
            catch (e) {
                console.log(e);
                log_1.default.error('updateUserDeposit(c): ' + e);
            }
            console.log('updateUserDeposit2>', user, amount, coinName, isNoNeedSave);
        });
    },
};
//# sourceMappingURL=index.js.map