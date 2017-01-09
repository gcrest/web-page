var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http } from "@angular/http";
import 'rxjs/Rx';
import { AuthService } from "../auth.service";
var WeddingService = (function () {
    function WeddingService(http, authService) {
        var _this = this;
        this.http = http;
        this.authService = authService;
        this.weddingChanged = new EventEmitter();
        this.isAuthenticated = false;
        this.weddings = [];
        this.authService.isAuthenticated().subscribe(function (authStatus) { return _this.isAuthenticated = authStatus; });
    }
    WeddingService.prototype.getWeddings = function () {
        return this.weddings;
    };
    WeddingService.prototype.getWedding = function (id) {
        return this.weddings[id];
    };
    WeddingService.prototype.deleteWedding = function (wedding) {
        this.weddings.splice(this.weddings.indexOf(wedding), 1);
        this.storeData();
    };
    WeddingService.prototype.addWedding = function (wedding) {
        this.weddings.push(wedding);
        this.http.put('https://projects-6a8af.firebaseio.com/events/b-a-wedding/' + this.weddings.indexOf(wedding).toString() + '.json', JSON.stringify(wedding)).toPromise();
    };
    WeddingService.prototype.editWedding = function (oldWedding, newWedding) {
        this.http.patch('https://projects-6a8af.firebaseio.com/events/b-a-wedding/' + this.weddings.indexOf(oldWedding) + '/.json', JSON.stringify(newWedding)).toPromise();
        this.weddings[this.weddings.indexOf(oldWedding)] = newWedding;
    };
    WeddingService.prototype.storeData = function () {
        var body = JSON.stringify(this.weddings);
        var headers = new Headers({
            'Content-Type': 'application/json'
        });
        return this.http.put('https://projects-6a8af.firebaseio.com/events/b-a-wedding.json', body, { headers: headers }).toPromise();
    };
    WeddingService.prototype.fetchData = function () {
        var _this = this;
        return this.http.get('https://projects-6a8af.firebaseio.com/events/b-a-wedding.json')
            .map(function (response) { return response.json(); })
            .subscribe(function (data) {
            if (!!data) {
                _this.weddings = data;
            }
            _this.weddingChanged.emit(_this.weddings);
        });
    };
    WeddingService.prototype.isAuth = function () {
        return this.isAuthenticated;
    };
    return WeddingService;
}());
WeddingService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http, AuthService])
], WeddingService);
export { WeddingService };
//# sourceMappingURL=../../../../src/app/blake-april-wedding/wedding.service.js.map