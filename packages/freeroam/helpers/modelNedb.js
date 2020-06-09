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
const nedb = require("nedb");
exports.default = (dbParams) => {
    var _a;
    const { filename, compact } = dbParams;
    const db = new syncNeDb({
        filename,
        autoload: true
    });
    if (compact) {
        db.persistence.setAutocompactionInterval(compact * 1000 * 60);
    }
    return _a = class NedbModel {
            constructor(data = {}, isSave = false) {
                this._id = false;
                Object.assign(this, data);
                if (isSave) {
                    this.save();
                }
            }
            static find(q) {
                return __awaiter(this, void 0, void 0, function* () {
                    const res = yield db.syncFind(q);
                    if (res) {
                        return res.map((d) => new this(d));
                    }
                });
            }
            static findOne(q) {
                return __awaiter(this, void 0, void 0, function* () {
                    const res = yield db.syncFindOne(q);
                    if (res) {
                        return new this(res);
                    }
                    else {
                        return null;
                    }
                });
            }
            update(obj, isSave = false) {
                return __awaiter(this, void 0, void 0, function* () {
                    Object.assign(this, obj);
                    if (isSave) {
                        yield this.save();
                    }
                });
            }
            save() {
                return __awaiter(this, void 0, void 0, function* () {
                    if (!this._id) {
                        const doc = yield db.syncInsert(this._data());
                        doc && (this._id = doc._id);
                    }
                    else {
                        yield db.syncUpdate({ _id: this._id }, { $set: this._data() }, { upsert: true });
                    }
                });
            }
            _data() {
                const data = {};
                for (let field in this) {
                    if (!['db', '_id'].includes(field)) {
                        data[field] = this[field];
                    }
                }
                return data;
            }
        },
        _a.db = db,
        _a;
};
class syncNeDb extends nedb {
    syncInsert(q) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                this.insert(q, (err, res) => {
                    if (err) {
                        resolve(false);
                    }
                    else {
                        resolve(res);
                    }
                });
            });
        });
    }
    syncFind(q) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                this.find(q, (err, res) => {
                    if (err) {
                        resolve(false);
                    }
                    else {
                        resolve(res);
                    }
                });
            });
        });
    }
    syncFindOne(q) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                this.findOne(q, (err, res) => {
                    if (err) {
                        resolve(false);
                    }
                    else {
                        resolve(res);
                    }
                });
            });
        });
    }
    syncUpdate(a, b, c = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                this.update(a, b, c, (err, res) => {
                    if (err) {
                        resolve(false);
                    }
                    else {
                        resolve(res);
                    }
                });
            });
        });
    }
}
;
//# sourceMappingURL=modelNedb.js.map