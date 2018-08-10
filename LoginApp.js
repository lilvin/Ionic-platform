// 'use strict';
// Ionic Starter App


// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
// var app = angular
angular.module('GABMobile', ['ionic', 'controllers', 'services', 'toastr', 'ionic-timepicker', 'ionic-datepicker', 'ion-datetime-picker'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.run(function($rootScope){
    $rootScope.dateValue = new Date();
    $rootScope.timeValue = new Date();
    // $rootScope.datetimeValue = new Date();
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('bottom');

  $stateProvider

  //   .state('app', {
  //   url: '/app',
  //   abstract: true,
  //   templateUrl: 'templates/menu.html',
  //   controller: 'AppCtrl'
  // })
  // .state('tab', {
  //   url: '/tab',
  //   abstract: true,
  //   templateUrl: 'templates/tabs.html'
  // })
  .state('landingpage', {
    url: '/landingpage',
    cache: false,
    templateUrl: 'templates/landingpage.html',
    controller: 'LandingCtrl'

  })
  .state('login', {
    url: '/login',
    cache: false,
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })
  .state('otp', {
    url: '/otp',
    cache: false,
    templateUrl: 'templates/otp.html',
    controller: 'otpCtrl'
  })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
