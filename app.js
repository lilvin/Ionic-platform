// 'use strict';
// Ionic Starter App


// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
// var app = angular
angular.module('GABMobileApp', ['ionic', 'controllers', 'services', 'toastr', 'ionic-timepicker', 'ionic-datepicker', 'ion-datetime-picker', 'ngIdle'])

.run(function($ionicPlatform, $ionicPopup, $ionicLoading) {
  $ionicPlatform.ready(function() {

    // check internet connection
    if(window.Connection) {
      if(navigator.connection.type == Connection.NONE) {
        // $ionicPopup.confirm({
        //   title: "Internet Disconnected",
        //   content: "The internet is disconnected on your device."
        // })
        // .then(function(result) {
        //   if(!result) {
        //     ionic.Platform.exitApp();
        //   }
        // });
        var connection = $ionicPopup.show({
          title: 'Network Error',
          content: 'The internet is disconnected on your device.',
          buttons: [
            {
              text: '<b>Retry</b>',
              type: 'button-positive',
              onTap: function(e) {
                if (navigator.connection.type == Connection.NONE) {
                  $ionicLoading.show();
                  setTimeout(function () {
                    $ionicLoading.hide();
                  }, 2000)
                  e.preventDefault();
                } else {
                  // Just go wherever you want with $state.go(), or reload the current page;
                  location.reload(true)
                }
              }
            }
          ]
        });
      }
    }


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

.config(function(IdleProvider, KeepaliveProvider ) {
    IdleProvider.timeout(120); //seconds
    IdleProvider.idle(10); //in seconds
    KeepaliveProvider.interval(5); //seconds
 })

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, IdleProvider, KeepaliveProvider) {
  $ionicConfigProvider.tabs.position('bottom');

  $stateProvider
  //   .state('app', {
  //   url: '/app',
  //   abstract: true,
  //   templateUrl: 'templates/menu.html',
  //   controller: 'AppCtrl'
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
  .state('dashboard', {
    url: '/dashboard',
    cache: false,
    // views: {
    //   'dashboard': {
        templateUrl: 'templates/dashboard.html',
        controller: 'DashboardCtrl'
    //   }
    // }
  })
  .state('dashboard2', {
    url: '/dashboard2',
    cache: false,
    templateUrl: 'templates/dashboard2.html',
    controller: 'Dashboard2Ctrl'
  })
  .state('countedcash', {
    url: '/countedcash',
    cache: false,
    templateUrl: 'templates/counted-cash-entry.html',
    controller: 'ContedCashCtrl'
  })
  // .state('collectionreports', {
  //   url: '/collectionreports',
  //   cache: false,
  //   templateUrl: 'templates/collectionreports.html',
  // })
  .state('PendingRequests', {
    url: '/PendingRequests',
    cache: false,
    templateUrl: 'templates/collection-requests-report.html',
    controller: 'RequestReportCtrl'
  })
  .state('CompletedRequest', {
    url: '/CompletedRequest',
    cache: false,
    templateUrl: 'templates/collection-requests-report.html',
    controller: 'RequestReportCtrl'
  })
  .state('CancelledRequests', {
    url: '/CancelledRequests',
    cache: false,
    templateUrl: 'templates/collection-requests-report.html',
    controller: 'RequestReportCtrl'
  })
  .state('OfflineRequests', {
    url: '/OfflineRequests',
    cache: false,
    templateUrl: 'templates/collection-requests-report.html',
    controller: 'RequestReportCtrl'
  })
  .state('PendingTransactions', {
    url: '/PendingTransactions',
    cache: false,
    templateUrl: 'templates/transaction-report.html',
    controller: 'TransactionReportCtrl'
  })
  .state('SuccesfulRequest', {
    url: '/SuccesfulRequest',
    cache: false,
    templateUrl: 'templates/transaction-report.html',
    controller: 'TransactionReportCtrl'
  })
  .state('CancelledTransactions', {
    url: '/CancelledTransactions',
    cache: false,
    templateUrl: 'templates/transaction-report.html',
    controller: 'TransactionReportCtrl'
  })
  .state('OfflineTransactions', {
    url: '/OfflineTransactions',
    cache: false,
    templateUrl: 'templates/transaction-report.html',
    controller: 'TransactionReportCtrl'
  })
  .state('DetailedTransactions', {
    url: '/DetailedTransactions',
    cache: false,
    templateUrl: 'templates/transaction-report.html',
    controller: 'TransactionReportCtrl'
  })
   .state('MyRequests', {
    url: '/MyRequests',
    cache: false,
    templateUrl: 'templates/myrequests.html',
    controller: 'myrequestsCtrl'
  })

   .state('profile', {
    url: '/profile',
    cache: false,
    templateUrl: 'templates/profile.html',
    controller: 'profileCtrl'
  });


  // if none of the above states are matched, use this as the fallback
    // $urlRouterProvider.otherwise('/dashboard')
})
.run(function ($location,$rootScope, $window, Idle, $state) {
  console.log('user type app.js', localStorage.getItem("usertype"));
  console.log("LoggedIn Status", localStorage.getItem('loggedIn'))
  if (localStorage.getItem('loggedIn') === "true") {
    if (localStorage.getItem("usertype") === "Customer"){
      $rootScope.show = 1;
      $state.go('dashboard');
    } else if (localStorage.getItem("usertype") === "CIT Teller"){
      $rootScope.show = 0;
      $state.go('dashboard2'); 
    }
    Idle.watch();
  } else {
    $state.go('login');
  }

})


