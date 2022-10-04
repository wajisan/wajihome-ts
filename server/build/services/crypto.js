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
exports.getCrypto = void 0;
const axios_1 = __importDefault(require("axios"));
const beautiful_dom_1 = __importDefault(require("beautiful-dom"));
function getCrypto() {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const api = (_a = process.env.API_CRYPTO) !== null && _a !== void 0 ? _a : '';
        const stakeAddress = (_b = process.env.TOKEN_CRYPTO) !== null && _b !== void 0 ? _b : '';
        const uri = api + stakeAddress;
        try {
            const { data, status } = yield axios_1.default.get(uri /*,
            {
                headers: {
                    //Accept: 'application/json',
                },
            },*/);
            //console.log("CRYPTO", data);
            const dom = new beautiful_dom_1.default(data);
            //console.log(data);
            const crypto_info = dom.getElementsByClassName('font-mono')
                .filter(obj => {
                return obj.innerText !== null
                    //&& /\d/.test(obj.innerText) 
                    //&& !obj.innerText.includes('...')
                    && obj.outerHTML.includes('items-baseline');
            })
                .map(a => a.innerText);
            //console.log("CRYPTO",crypto_info);
            return crypto_info;
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
exports.getCrypto = getCrypto;
;
