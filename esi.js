"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SearchFrame = /** @class */ (function () {
    function SearchFrame(parentElem) {
        var _this = this;
        this.parentElem = parentElem;
        this.setupElem = function () {
            _this.elem = document.createElement('iframe');
            var qs = SearchFrame.readQs(window.location.search.substr(1));
            var q = qs['q'] || '*';
            var s = qs['s'] || 'popularity';
            var p = qs['p'] || '1';
            var src = "https://search.esteem.app/search-iframe?q=" + encodeURIComponent(q) + "&s=" + s + "&p=" + p;
            _this.elem.setAttribute('src', src);
            _this.elem.setAttribute('frameborder', '0');
            _this.elem.setAttribute('scrolling', 'no');
            _this.elem.style.width = '100%';
            _this.elem.style.height = '400px';
            _this.parentElem.appendChild(_this.elem);
        };
        this.attachEvents = function () {
            window.addEventListener('message', function (e) {
                var qs = SearchFrame.readQs(window.location.search.substr(1));
                var type = e.data.type;
                switch (type) {
                    case 'height':
                        var height = e.data.height;
                        _this.elem.style.height = height + 'px';
                        break;
                    case 'sort':
                        var sort = e.data.sort;
                        qs['s'] = sort;
                        window.location.href = "?" + SearchFrame.serialize(qs);
                        break;
                    case 'query':
                        var query = e.data.query;
                        window.location.href = "?" + SearchFrame.serialize({ q: query, s: 'popularity', p: 1 });
                        break;
                    case 'page':
                        var page = e.data.page;
                        qs['p'] = page;
                        window.location.href = "?" + SearchFrame.serialize(qs);
                        break;
                }
            });
        };
        this.setupElem();
        this.attachEvents();
    }
    SearchFrame.readQs = function (rawQs) {
        if (rawQs.trim() === '')
            return {};
        var entries = rawQs.split('&');
        var b = {};
        for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
            var entry = entries_1[_i];
            var p = entry.split('=', 2);
            if (p.length === 1) {
                b[p[0]] = '';
            }
            else {
                b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, ' '));
            }
        }
        return b;
    };
    SearchFrame.serialize = function (obj) {
        var str = [];
        for (var p in obj)
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        return str.join("&");
    };
    return SearchFrame;
}());
exports.default = SearchFrame;
