'use strict';
angular.module('services', [])

.service('DataService', ['$http', '$filter', function ($http, $filter, $localStorage) {
        // AUTHENTICATION ENDPOINTS
	this.login = function (formdata) {
        return $http.post(urlBase + 'oauth/token', formdata, 
        {
            headers: { 'Authorization': 'Basic '+basic_auth_enc, 'Content-Type': undefined }
        });
    };
 this.sendOTP = function (otp) {
        console.log("OTP:", otp);
        console.log("access_token:", localStorage.getItem('access_token'));
        return $http.post(urlBase + 'otp/verification?&userIp=192.168.8.675&userAgent=Browser/Application&otp='+otp, {}, 
        {
            headers: { 'Authorization': 'Bearer '+localStorage.getItem('access_token') }
        });
    };
      this.resendOTP = function () {
        return $http.get(urlBase + 'otp/resend', 
        {
            headers: { 'Authorization': 'Bearer '+localStorage.getItem('access_token') }
        });
    };
    }])