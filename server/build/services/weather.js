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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeather = void 0;
const axios_1 = __importDefault(require("axios"));
function getWeather() {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const api = (_a = process.env.API_WEATHER) !== null && _a !== void 0 ? _a : '';
        const token = (_b = process.env.TOKEN_WEATHER) !== null && _b !== void 0 ? _b : '';
        const insee = (_c = process.env.INSEE_CODE) !== null && _c !== void 0 ? _c : '';
        const uri = api + 'forecast/nextHours?token=' + token + '&insee=' + insee;
        try {
            const { data, status } = yield axios_1.default.get(uri, {
                headers: {
                    Accept: 'application/json',
                },
            });
            return data;
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
                console.error('error message: ', error.message);
                return error.message;
            }
            else {
                console.error('unexpected error: ', error);
                return 'An unexpected error occurred';
            }
        }
    });
}
exports.getWeather = getWeather;
;
