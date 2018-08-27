angular.module('controllers', [])

.controller('loginCtrl', function($scope,$http,$ionicPopup,$state,$ionicHistory) {
		$scope.user = {};  //declares the object user
		
		$scope.login = function() {
			str="http://localhost/lilRecipe/server_side/userDetails.php?e="+$scope.user.email+"&p="+$scope.user.password;
			$http.get(str)
			.success(function (response){   
			    // if login request is Accepted
				// records is the 'server response array' variable name.
				$scope.user_details = response.records;  // copy response values to user-details object.
				
				//stores the data in the session. if the user is logged in, then there is no need to show login again.
				sessionStorage.setItem('loggedin_name', $scope.user_details.u_name);
				sessionStorage.setItem('loggedin_id', $scope.user_details.u_id );
				sessionStorage.setItem('loggedin_phone', $scope.user_details.u_phone);
				sessionStorage.setItem('loggedin_address', $scope.user_details.u_address);
				sessionStorage.setItem('loggedin_pincode', $scope.user_details.u_pincode);
				
				// remove the instance of login page, when user moves to profile page.
				// if you dont use it, you can get to login page, even if you are already logged in .
				$ionicHistory.nextViewOptions({
					disableAnimate: true,
					disableBack: true
				});
				$state.go('profile', {}, {location: "replace"});
				
				})
            //if login failed
			.error(function() {   						
					var alertPopup = $ionicPopup.alert({
						title: 'Login failed!',
						template: 'Please check your credentials!'
					});
			});
		};
		
})
.controller('signupCtrl', function($scope,$http,$ionicPopup,$state,$ionicHistory) {
 
	$scope.signup=function(data){
			
			var link = 'http://localhost/lilRecipe/server_side/signup.php';
			
			//using http post as we are passing password.
			$http.post(link, {n : data.name, un : data.username, ps : data.password , ph: data.phone , add : data.address , pin : data.pincode })
			.then(function (res){	 //if a response is recieved from the server.
			
				$scope.response = res.data.result; //contains Register Result				
 
				//Shows the respective popup and removes back link
				if($scope.response.created=="1"){
						$scope.title="Account Created!";
						$scope.template="Your account has been successfully created!";
						
						//no back option
						$ionicHistory.nextViewOptions({
							disableAnimate: true,
							disableBack: true
						});
						// the user is redirected to login page after sign up
						$state.go('login', {}, {location: "replace"});
				
				}else if($scope.response.exists=="1"){
					$scope.title="Email Already exists";
					$scope.template="Please click forgot password if necessary";
				
				}else{
					$scope.title="Failed";
					$scope.template="Contact Our Technical Team";
				}
				
				var alertPopup = $ionicPopup.alert({
						title: $scope.title,
						template: $scope.template
				});
				
				
			});
			
	}
})

.controller('profileCtrl', function($scope,$rootScope,$ionicHistory,$state) {
	
		// loads value from the loggin session
		$scope.loggedin_name= sessionStorage.getItem('loggedin_name');
		$scope.loggedin_id= sessionStorage.getItem('loggedin_id');
		$scope.loggedin_phone= sessionStorage.getItem('loggedin_phone');
		$scope.loggedin_address= sessionStorage.getItem('loggedin_address');
		$scope.loggedin_pincode= sessionStorage.getItem('loggedin_pincode');
		
		//logout function
		$scope.logout=function(){
		
				//delete all the sessions 
				delete sessionStorage.loggedin_name;
				delete sessionStorage.loggedin_id;
				delete sessionStorage.loggedin_phone;
				delete sessionStorage.loggedin_address;
				delete sessionStorage.loggedin_pincode;
				
				// remove the profile page backlink after logout.
				$ionicHistory.nextViewOptions({
					disableAnimate: true,
					disableBack: true
				});
				
				// After logout you will be redirected to the login page,with no backlink
				$state.go('login', {}, {location: "replace"});
		};
})
   