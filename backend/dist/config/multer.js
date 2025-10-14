"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MulterOptions = void 0;
const multer_1 = require("multer");
exports.MulterOptions = {
    storage: (0, multer_1.diskStorage)({}),
    limits: { fileSize: 1024 * 1024 * 100 },
};
//# sourceMappingURL=multer.js.map