// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('RecipeApp', ['ionic', 'controllers', 'services', 'toastr'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs).
    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
    // useful especially with forms, though we would prefer giving the user a little more room
    // to interact with the app.
    if (window.cordova && window.Keyboard) {
      window.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if (window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })

    .state('app.Recipes', {
      url: '/Recipes',
      views: {
        'menuContent': {
          templateUrl: 'templates/Recipes.html',
          controller: 'RecipesCtrl'
        }
      }
    })
    .state('app.Recipe', {
      url: '/Recipe',
      views: {
        'menuContent': {
          templateUrl: 'templates/Recipe.html',
          controller: 'RecipeCtrl'
        }
      }
    })
    .state('login', {
      url: '/login',
     templateUrl: 'templates/login.html',
     controller: 'LoginCtrl'
    })
    .state('otp', {
    url: '/otp',
    cache: false,
    templateUrl: 'templates/otp.html',
    controller: 'otpCtrl'
  })

    .state('signUp', {
      url: '/signUp', 
     templateUrl: 'templates/signUp.html',
     controller: 'signUpCtrl'
    })


  .state('app.single', {
    url: '/Recipes/:RecipeId',
    views: {
      'menuContent': {
        templateUrl: 'templates/Recipe.html',
        controller: 'RecipeCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
