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
import { Http, Headers } from "@angular/http";
import { Router } from "@angular/router";
import 'rxjs/Rx';
import { AuthService } from "../auth.service";
var PhotoServiceService = (function () {
    function PhotoServiceService(http, router, authService) {
        var _this = this;
        this.http = http;
        this.router = router;
        this.authService = authService;
        this.photosChanged = new EventEmitter();
        this.photos = [];
        this.isAuthenticated = false;
        this.authService.isAuthenticated().subscribe(function (authStatus) { return _this.isAuthenticated = authStatus; });
    }
    PhotoServiceService.prototype.isAuth = function () {
        return this.isAuthenticated;
    };
    PhotoServiceService.prototype.getPhotos = function () {
        return this.photos;
    };
    PhotoServiceService.prototype.getPhoto = function (id) {
        return this.photos[id];
    };
    PhotoServiceService.prototype.deletePhoto = function (photo) {
        this.photos.splice(this.photos.indexOf(photo), 1);
        this.storeData();
    };
    PhotoServiceService.prototype.addPhoto = function (photo) {
        this.photos.push(photo);
        this.http.put('https://projects-6a8af.firebaseio.com/photos/' + this.photos.indexOf(photo).toString() + '.json', JSON.stringify(photo)).toPromise();
    };
    PhotoServiceService.prototype.editPhoto = function (oldPhoto, newPhoto) {
        this.photos[this.photos.indexOf(oldPhoto)] = newPhoto;
        this.http.patch('https://projects-6a8af.firebaseio.com/photos/' + this.photos.indexOf(oldPhoto) + '/.json', JSON.stringify(newPhoto))
            .toPromise();
    };
    PhotoServiceService.prototype.storeData = function () {
        var body = JSON.stringify(this.photos);
        var headers = new Headers({
            'Content-Type': 'application/json'
        });
        return this.http.put('https://projects-6a8af.firebaseio.com/photos.json', body, { headers: headers }).toPromise();
    };
    PhotoServiceService.prototype.fetchData = function () {
        var _this = this;
        return this.http.get('https://projects-6a8af.firebaseio.com/photos.json')
            .map(function (response) { return response.json(); })
            .subscribe(function (data) {
            if (!!data) {
                _this.photos = data;
            }
            _this.photosChanged.emit(_this.photos);
        });
    };
    return PhotoServiceService;
}());
PhotoServiceService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http, Router, AuthService])
], PhotoServiceService);
export { PhotoServiceService };
//# sourceMappingURL=../../../../src/app/photos/photo-service.service.js.map