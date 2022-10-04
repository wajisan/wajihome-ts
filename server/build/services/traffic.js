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
exports.getTraffic = void 0;
const axios_1 = __importDefault(require("axios"));
const beautiful_dom_1 = __importDefault(require("beautiful-dom"));
function getTraffic() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const uri = (_a = process.env.API_TRAFFIC) !== null && _a !== void 0 ? _a : '';
        try {
            return axios_1.default.get(uri).then((res) => {
                const dom = new beautiful_dom_1.default(res.data);
                const arr = dom.querySelectorAll('#fermeture_nocturne tbody tr')
                    .filter(a => a.innerText.includes("A4") || a.innerText.includes("A86") || a.innerText.includes("A6"))
                    .map(a => a.innerText.replace(/\t/g, ''));
                return arr;
            });
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
                console.error('Axios error message: ', error.message);
                return error.message;
            }
            else {
                console.error('unexpected error: ', error);
                return 'An unexpected error occurred';
            }
        }
    });
}
exports.getTraffic = getTraffic;
;
