#!/usr/bin/env node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var rp = require('request-promise');
//import * as fs from 'fs';
var fs = require('fs');
var cheerio1 = require('cheerio');
var program = require('commander');
program
    .option('-l, --list <list>', 'URL for list data')
    .option('-d, --download URL <data>', 'give url for download')
    .option('-s, --selector <selector>', 'It will execute that number only.')
    .option('-h, --help ', "get helps and sample command.")
    .parse(process.argv);
console.log(program);
// downloadg
if (program.help) {
    console.log(" \n    \n    !!!! With this program we support some basic ops like: !!!!\n\n    a) Download image with just a line:\n    nodescrapy -d https://m.dailyhunt.in/news/india/bangla-newspapers -s \".thumb2 li img\"\n\n    a) Enlist data from a website:\n    nodescrapy -l https://m.dailyhunt.in/news/india/bangla-newspapers -s \".thumb2 li img@src\"\n\n    ");
}
if (program.download) {
    if (!program.selector) {
        console.log("Please pass the selector to download data");
    }
    console.log('download started');
    download(program.download, program.selector);
}
else if (program.list) {
    if (!program.selector) {
        console.log("Please pass the selector to list data");
    }
    console.log('download started');
    findAllDataEntry(program.list, program.selector);
}
function downloadImg(url, filename) {
    return __awaiter(this, void 0, void 0, function () {
        var res, buffer, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    console.log("[INFO] Downlading " + url + " ...");
                    return [4 /*yield*/, rp.get({ url: url, encoding: null })];
                case 1:
                    res = _a.sent();
                    buffer = Buffer.from(res, 'utf8');
                    fs.writeFileSync(filename, buffer);
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    console.log(e_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function findAllDataEntry(url, selector) {
    return __awaiter(this, void 0, void 0, function () {
        var $, sa_1, data, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    console.log("[INFO] Fetching " + url + " ...");
                    return [4 /*yield*/, rp.get({ url: url, transform: function (body) {
                                return cheerio1.load(body);
                            } })];
                case 1:
                    $ = _a.sent();
                    sa_1 = selector.split("@");
                    data = $(sa_1[0]).toArray().forEach(function (x) {
                        if (x.attribs) {
                            console.log(x.attribs[sa_1[1]]);
                        }
                        else {
                            console.log('.');
                        }
                    });
                    return [3 /*break*/, 3];
                case 2:
                    e_2 = _a.sent();
                    console.log(e_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function findAllImage(url, selector) {
    return __awaiter(this, void 0, void 0, function () {
        var $, data, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    console.log("[INFO] Downlading " + url + " ...");
                    return [4 /*yield*/, rp.get({ url: url, transform: function (body) {
                                return cheerio1.load(body);
                            } })];
                case 1:
                    $ = _a.sent();
                    data = $(selector).toArray().map(function (x) {
                        if (x.attribs) {
                            return { url: x.attribs.src, filename: x.attribs.title.toLowerCase().replace(/ /g, '_') + '.png' };
                        }
                        else {
                            return null;
                        }
                    });
                    return [2 /*return*/, data];
                case 2:
                    e_3 = _a.sent();
                    console.log(e_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/, []];
            }
        });
    });
}
//download('https://www.google.com/images/srpr/logo3w.png', 'google.png')
function download(url, selector) {
    return __awaiter(this, void 0, void 0, function () {
        var dir, list;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dir = './tmp';
                    if (!fs.existsSync(dir)) {
                        fs.mkdirSync(dir);
                    }
                    return [4 /*yield*/, findAllImage(url, selector)]; //"",)
                case 1:
                    list = _a.sent() //"",)
                    ;
                    list.forEach(function (element) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            downloadImg(element.url, "./tmp/" + element.filename);
                            return [2 /*return*/];
                        });
                    }); });
                    return [2 /*return*/];
            }
        });
    });
}
//download()
//# sourceMappingURL=main.js.map