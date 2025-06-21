var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { stat, readFile as fsReadFile } from "fs/promises";
export function isFilePath(str) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const fileStat = yield stat(str);
            return fileStat.isFile();
        }
        catch (_a) {
            return false;
        }
    });
}
export function readFile(path) {
    return __awaiter(this, void 0, void 0, function* () {
        return fsReadFile(path, { encoding: "utf-8" });
    });
}
