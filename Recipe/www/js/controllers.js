angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('RecipesCtrl', function($scope, $state, $rootScope) {
$scope.item={};
  $scope.recipes = [{
    name: "PILAU",
    image: "pilau.jpg",
    price: "kshs.700",
    description: "A classic favorite among Swahilis",
    cooking_steps:"1.Boil the meat in salted water until tender.\n2.Crush the garlic and cardamom together with 2 tbsp water using a mortar and pestle.\n3.Saute the onion until it is golden brown.\n4.Add the rice, meat, garlic and cardamom mixture, peppercorns, cloves, cinnamon, ginger, and cumin seed powder.\n5.Cook covered over medium heat until all are nicely brown, about 10 minutes. \n6.Add the tomatoes.\n7.Add the 6 cups water to the rice mixture, bring to a boil and then cook over very low heat, (while covered) for another 15-20 minutes until all water is absorbed and the rice is cooked through.\n8.Serve with kachumbari"
  }, {
    name:"BEEF",
    image: "beef.jpg",
    price: "kshs.300",
    description: "Homemade Beef Jerky",
    cooking_steps:"step 1:Whisk Worcestershire sauce, soy sauce, paprika, honey, black pepper, red pepper flakes, garlic powder, and onion powder together in a bowl. Add beef to bowl and turn to coat beef completely. Cover the bowl with plastic wrap and marinate in the refrigerator, 3 hours to overnight.\nstep 2:Preheat oven to 175 degrees F (80 degrees C). Line a baking sheet with aluminum foil and place a wire rack over the foil.\n step:3 Transfer beef to paper towels to dry. Discard marinade. Arrange beef slices in a single layer on the prepared wire rack on the baking sheet.\nstep 4:Bake beef in the preheated oven until dry and leathery, 3 to 4 hours. Cut with scissors into bite-size pieces."
  },{
    name: "CHICKEN",
    image: "chicken.jpg",
    price: "kshs.500",
    description: "Cook our healthy chicken Madras curry and ditch the takeaway menu. This simple family dinner is full of fragrant spices and tender pieces of chicken",
    cooking_steps:"1. Blitz the onion, garlic, ginger and chilli together in a food processor until it becomes a coarse paste. Heat the oil in a large saucepan and add the paste, fry for 5 mins, until softened. If it starts to stick to the pan at all, add a splash of water.\n2. Tip in the spices and stir well, cook for a couple of minutes to toast them a bit, then add the chicken. Stir and make sure everything is covered in the spice mix. Cook until the chicken begins to turn pale, adding a small splash of water if it sticks to the base of the pan at all. \n3. Pour in the chopped tomatoes, along with a big pinch of salt, cover and cook on a low heat for 30 mins, until the chicken is tender.\n4. Stir through the coriander and serve with rice, naan and a big dollop of mango chutney"
  },
   {
    name: "MATOKE",
    image: "matoke.jpg",
    price: "kshs.600",
    description: "amazing african meal",
    cooking_steps:" Stir plantains, lemon juice, and 3 cups boiling water in a bowl;\n when water is cool, drain plantains and set aside.\n Melt butter in a 4-qt.\n saucepan over medium-high heat. \nCook garlic, bell pepper, and onion until soft, 8–10 minutes.\nAdd curry, coriander, and cumin; cook until fragrant, 1–2 minutes.\n Add reserved plantains, the stock, cilantro, tomato, salt, and pepper; boil.\n Reduce heat to medium; cook, slightly covered, until plantains are very tender, about 20 minutes.\n Uncover and lightly mash; keep warm"
  },
  {
    name: "CHAPATI",
    image: "chapati.jpg",
    price: "kshs.100",
    description: "Make these soft Kenyan chapatis",
    cooking_steps:"Step 1. In a bowl, measure three cups of flour.\nStep 2. Take another bowl and mix salt, sugar, 2 tbps of oil and 1 cup of water. Stir until the salt and sugar dissolves.\nStep 3. Pour the liquid mixture above (step 2) in the flour bowl and mix well. Keep adding the remaining water until the dough becomes soft.\nStep 4. This is how to make soft chapati dough: Knead the dough for five minutes and add flour if needed.\nStep 5. Another step on how to make soft chapati dough: Transfer the dough on a flat surface and continue kneading and adding flour when needed for 10 minutes. Add more flour to make it more thick but not too hard.\nStep 6. Return the ready chapati dough in a bowl, add some oil and knead to mix it up until it soft and not sticky. Cover the dough and leave it for 40 minutes."
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
})

.controller('RecipeCtrl', function($scope, $stateParams) {
    $scope.name = localStorage.getItem("name");
    $scope.image = localStorage.getItem("image");
    $scope.description = localStorage.getItem("description");
    $scope.price = localStorage.getItem("price");
    $scope.cooking_steps = localStorage.getItem("cooking_steps");;
})

.controller('LoginCtrl', function($scope, $stateParams, $state){
  $scope.login = function(){ 
    $state.go('app.Recipes')
    
  }
    $scope.signUp = function(){
     $state.go('signUp');
     console.log("signUp page");
   }
})
.controller('signUpCtrl', function($scope, $stateParams,$state) {
  $scope.Register=function(){

  }
  $scope.Exit=function(){
    $state.go('login');
  }
 
})

