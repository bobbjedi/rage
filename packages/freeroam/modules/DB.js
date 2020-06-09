"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modelNedb_1 = require("../helpers/modelNedb");
exports.usersDb = modelNedb_1.default({
    filename: 'db/users',
    compact: 10
});
const Db = {
    usersDb: exports.usersDb
};
exports.default = Db;
//# sourceMappingURL=DB.js.map