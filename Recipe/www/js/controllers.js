angular.module('controllers', [])

.controller('AppCtrl', function($rootScope, $scope, DataService, $filter, $window, $ionicModal,$ionicHistory, toastr, $timeout, $ionicPopup, $ionicLoading, $state, $ionicHistory, $http) {
  $scope.data={};
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};
})

.controller('RecipesCtrl', function($scope, $state, $rootScope) {
  $scope.item={};
  $scope.recipes = [
  {
    name: "PILAU",
    image: "pilau.jpg",
    price: "kshs.700",
    description: "A classic favorite among Swahilis",
    cooking_steps: [{0:"Boil the meat in salted water until tender."},{ 1:"2.Crush the garlic and cardamom together with 2 tbsp water using a mortar and pestle.3.Saute the onion until it is golden brown.4.Add the rice, meat, garlic and cardamom mixture, peppercorns, cloves, cinnamon, ginger, and cumin seed powder.5.Cook covered over medium heat until all are nicely brown, about 10 minutes. 6.Add the tomatoes.7.Add the 6 cups water to the rice mixture, bring to a boil and then cook over very low heat, (while covered) for another 15-20 minutes until all water is absorbed and the rice is cooked through.8.Serve with kachumbari"}]
  }, {
    name:"BEEF",
    image: "beef.jpg",
    price: "kshs.300",
    description: "Homemade Beef Jerky",
    cooking_steps:"step 1:Whisk Worcestershire sauce, soy sauce, paprika, honey, black pepper, red pepper flakes, garlic powder, and onion powder together in a bowl. Add beef to bowl and turn to coat beef completely. Cover the bowl with plastic wrap and marinate in the refrigerator, 3 hours to overnight.step 2:Preheat oven to 175 degrees F (80 degrees C). Line a baking sheet with aluminum foil and place a wire rack over the foil. step:3 Transfer beef to paper towels to dry. Discard marinade. Arrange beef slices in a single layer on the prepared wire rack on the baking sheet.step 4:Bake beef in the preheated oven until dry and leathery, 3 to 4 hours. Cut with scissors into bite-size pieces."
  },{
    name: "CHICKEN",
    image: "chicken.jpg",
    price: "kshs.500",
    description: "Cook our healthy chicken Madras curry and ditch the takeaway menu. This simple family dinner is full of fragrant spices and tender pieces of chicken",
    cooking_steps:"1. Blitz the onion, garlic, ginger and chilli together in a food processor until it becomes a coarse paste. Heat the oil in a large saucepan and add the paste, fry for 5 mins, until softened. If it starts to stick to the pan at all, add a splash of water.2. Tip in the spices and stir well, cook for a couple of minutes to toast them a bit, then add the chicken. Stir and make sure everything is covered in the spice mix. Cook until the chicken begins to turn pale, adding a small splash of water if it sticks to the base of the pan at all. 3. Pour in the chopped tomatoes, along with a big pinch of salt, cover and cook on a low heat for 30 mins, until the chicken is tender.4. Stir through the coriander and serve with rice, naan and a big dollop of mango chutney"
  },
  {
    name: "MATOKE",
    image: "matoke.jpg",
    price: "kshs.600",
    description: "amazing african meal",
    cooking_steps:" Stir plantains, lemon juice, and 3 cups boiling water in a bowl; when water is cool, drain plantains and set aside. Melt butter in a 4-qt. saucepan over medium-high heat. Cook garlic, bell pepper, and onion until soft, 8–10 minutes.Add curry, coriander, and cumin; cook until fragrant, 1–2 minutes. Add reserved plantains, the stock, cilantro, tomato, salt, and pepper; boil. Reduce heat to medium; cook, slightly covered, until plantains are very tender, about 20 minutes. Uncover and lightly mash; keep warm"
  },
  {
    name: "CHAPATI",
    image: "chapati.jpg",
    price: "kshs.100",
    description: " Make these soft Kenyan chapatis",
    cooking_steps:"Step 1. In a bowl, measure three cups of flour.Step 2. Take another bowl and mix salt, sugar, 2 tbps of oil and 1 cup of water. Stir until the salt and sugar dissolves.Step 3. Pour the liquid mixture above (step 2) in the flour bowl and mix well. Keep adding the remaining water until the dough becomes soft.Step 4. This is how to make soft chapati dough: Knead the dough for five minutes and add flour if needed.Step 5. Another step on how to make soft chapati dough: Transfer the dough on a flat surface and continue kneading and adding flour when needed for 10 minutes. Add more flour to make it more thick but not too hard.Step 6. Return the ready chapati dough in a bowl, add some oil and knead to mix it up until it soft and not sticky. Cover the dough and leave it for 40 minutes."
  },
  {
   name: "Pan-Fried Fish Balls",
   image: "fishBalls.jpg",
   price: "kshs.100",
   description: "little sweet round fish cakes",
   cooking_steps:"Step 1. In a bowl, measure three cups of flour"
 },
 {
   name: "INJERA",
   image: "injera.jpg",
   price: "kshs.500",
   description: "Injera is a Flat round fermented sourdough bread- bread like no other, with a unique, slightly spongy texture. ",
   cooking_steps:"Step 1. In a bowl, measure three cups of flour"
 }
 ];

 $scope.showProductInfo=function(item){
  $state.go('app.Recipe')
  localStorage.setItem('name', item.name);
  localStorage.setItem('image', item.image);
  localStorage.setItem('price', item.price);
  localStorage.setItem('description', item.description);
  localStorage.setItem('cooking_steps', item.cooking_steps);
};
$scope.fullname = localStorage.getItem("fullname")
})

.controller('RecipeCtrl', function($scope, $stateParams) {
  $scope.name = localStorage.getItem("name");
  $scope.image = localStorage.getItem("image");
  $scope.description = localStorage.getItem("description");
  $scope.price = localStorage.getItem("price");
  $scope.cooking_steps = localStorage.getItem("cooking_steps");;
})


.controller('LoginCtrl', function($scope, $stateParams, $state, DataService, toastr,$ionicLoading, $rootScope){
  $scope.data = {};
   $scope.signUp = function(){
     $state.go('signUp');
     console.log("signUp page");
   }
  $scope.login = function(LoginForm){ 
    if(!LoginForm.$valid){
     alert("Invalid email or password")
     return;
   }
   $ionicLoading.show();
   var formdata = new FormData();
   formdata.append("grant_type", 'password');
   formdata.append("username", $scope.data.username);
   formdata.append("password", $scope.data.password);
   localStorage.setItem('username', $scope.data.username);
   DataService.login(formdata).then(function (response) {
    console.log("Logging in......", response);
    console.log("token type:", response.data.token_type);
    console.log("formdata", formdata);
    // $rootScope.fullname=response.data.fullName;
    localStorage.setItem("fullname", response.data.fullName)
  console.log($scope.fullname)
    $ionicLoading.hide();
    $state.go('otp');
  },
  function (error) {
    $ionicLoading.hide();
    if (error.data === null) {
      alert('Please check your internet connection')
    }else if (error.status === 410) {
      alert('please change your password before you proceed')
      $scope.changepassword.show();
    }else {
      console.log("error", error.data.message)
      alert(error.data.message)
    }
  })
}
})

.controller('otpCtrl', function ($ionicSideMenuDelegate, $ionicViewService, $window, $scope, $rootScope, DataService, $filter, $window, toastr, $ionicLoading, $state) {
   $scope.data = {};
  $ionicSideMenuDelegate.canDragContent(false);  
  $scope.sendOTP = function () {
  /*  $ionicLoading.show();
    DataService.sendOTP($scope.data.otp).then(function (response) {
      console.log("OTP......", response.data.data);
      $rootScope.Details = response.data.data.userDetails;
      console.log($rootScope.Details);
      $ionicLoading.hide();
      $window.localStorage['loggedInUser'] = angular.toJson(response.data.data.userDetails);
      localStorage.setItem('permissions', angular.toJson(response.data.data.permissions))
      $rootScope.userType = response.data.data.userDetails.userType;
      localStorage.setItem('usertype', $rootScope.userType)
      console.log($scope.userType);
      if($rootScope.userType === "Customer"){
        $scope.data.otp = "";

        localStorage.setItem('loggedIn', "true");
        $rootScope.show = 1;
        $rootScope.teller = false;
        localStorage.setItem('teller', $rootScope.teller);
        $rootScope.customer = true;
        localStorage.setItem('customer', $rootScope.customer);

        $ionicViewService.nextViewOptions({
          disableAnimate: true,
          disableBack: true
        });
        $state.go('app.Recipes');
        location.reload(true);

      } else {
       localStorage.setItem('loggedIn', "false");
       toastr.error("You are not authorized to access this application")
     }
   }, function (error) {
    console.log("Login error......", error.data);
    $ionicLoading.hide();
    if (error.data === null) {
      toastr.warning('Please check your internet connection')
    } else {
      toastr.error(error.data.message)
    }

  });
  };
    $scope.resendOTP = function(){
    $ionicLoading.show();
    DataService.resendOTP($scope.data.otp).then(function (response) {
    $ionicLoading.hide();
    toastr.success("Successfully sent OTP")
    }, function (error) {
    console.log("Login error......", error.data);
    $ionicLoading.hide();
    if (error.data === null) {
      toastr.warning('Please check your internet connection')
    } else {
      toastr.error(error.data.message)
    }*/
     $state.go('app.Recipes');
        
  
  };

  $scope.closeOtp = function() {
    $scope.data.otp = "";
    $state.go('login')
  };
})


.controller('signUpCtrl', function($scope, $stateParams,$state) {
  $scope.Register=function(){

  }
  $scope.Exit=function(){
    $state.go('login');
  }
})