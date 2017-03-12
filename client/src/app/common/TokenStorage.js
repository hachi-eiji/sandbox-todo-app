"use strict";
var TokenStorage = (function () {
    function TokenStorage() {
        // TODO: クラス変数で持つのがよい
        this.TOKEN_KEY = 'token';
        if (('sessionStorage' in window) && (window.sessionStorage !== null)) {
        }
        else {
            console.warn('can not user session storage');
        }
    }
    TokenStorage.prototype.get = function () {
        return sessionStorage.getItem(this.TOKEN_KEY);
    };
    TokenStorage.prototype.save = function (token) {
        sessionStorage.setItem(this.TOKEN_KEY, token);
    };
    TokenStorage.prototype.remove = function () {
        sessionStorage.removeItem(this.TOKEN_KEY);
    };
    return TokenStorage;
}());
exports.TokenStorage = TokenStorage;
