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
var CruiseService = (function () {
    function CruiseService(http, authService) {
        var _this = this;
        this.http = http;
        this.authService = authService;
        this.cruiseChanged = new EventEmitter();
        this.isAuthenticated = false;
        this.cruises = [];
        this.authService.isAuthenticated().subscribe(function (authStatus) { return _this.isAuthenticated = authStatus; });
    }
    CruiseService.prototype.getCruises = function () {
        return this.cruises;
    };
    CruiseService.prototype.getCruise = function (id) {
        return this.cruises[id];
    };
    CruiseService.prototype.deleteCruise = function (cruise) {
        this.cruises.splice(this.cruises.indexOf(cruise), 1);
        this.storeData();
    };
    CruiseService.prototype.addCruise = function (cruise) {
        this.cruises.push(cruise);
        this.http.put('https://projects-6a8af.firebaseio.com/vacations/cruise/' + this.cruises.indexOf(cruise).toString() + '.json', JSON.stringify(cruise)).toPromise();
    };
    CruiseService.prototype.editCruise = function (oldCruise, newCruise) {
        this.http.patch('https://projects-6a8af.firebaseio.com/vacations/cruise/' + this.cruises.indexOf(oldCruise) + '/.json', JSON.stringify(newCruise)).toPromise();
        this.cruises[this.cruises.indexOf(oldCruise)] = newCruise;
    };
    CruiseService.prototype.storeData = function () {
        var body = JSON.stringify(this.cruises);
        var headers = new Headers({
            'Content-Type': 'application/json'
        });
        return this.http.put('https://projects-6a8af.firebaseio.com/vacations/cruise.json', body, { headers: headers }).toPromise();
    };
    CruiseService.prototype.fetchData = function () {
        var _this = this;
        return this.http.get('https://projects-6a8af.firebaseio.com/vacations/cruise.json')
            .map(function (response) { return response.json(); })
            .subscribe(function (data) {
            if (!!data) {
                _this.cruises = data;
            }
            _this.cruiseChanged.emit(_this.cruises);
        });
    };
    CruiseService.prototype.isAuth = function () {
        return this.isAuthenticated;
    };
    return CruiseService;
}());
CruiseService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http, AuthService])
], CruiseService);
export { CruiseService };
//# sourceMappingURL=../../../../src/app/cruise/cruise.service.js.map