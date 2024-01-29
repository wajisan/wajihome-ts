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
exports.getTransport = void 0;
const axios_1 = __importDefault(require("axios"));
const beautiful_dom_1 = __importDefault(require("beautiful-dom"));
/*type Hours = {
    arrival :
}*/
function parseTransport(jsonObj) {
    if (jsonObj.length > 0) {
        const item = jsonObj[0];
        if (item != null && item.name !== undefined && item.itemListElement !== undefined) {
            return (item.itemListElement);
        }
    }
    return null;
}
function getTransport(where) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const api = (_a = process.env.API_TRANSPORT + where) !== null && _a !== void 0 ? _a : '';
        const uri = api;
        try {
            const { data, status } = yield axios_1.default.get(uri, {
                headers: {
                //Accept: 'application/json',
                },
            });
            const dom = new beautiful_dom_1.default(data);
            const jsonObj = dom.getElementsByTagName('script')
                .filter(obj => {
                return obj.innerText !== null
                    && obj.outerHTML.includes('application/ld+json')
                    && obj.innerHTML.includes('itemListElement')
                    && !obj.innerHTML.includes('BreadcrumbList');
            })
                .map(a => JSON.parse(a.innerHTML));
            return parseTransport(jsonObj);
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
exports.getTransport = getTransport;
;
