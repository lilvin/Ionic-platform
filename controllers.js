angular.module('controllers', [])

.controller('AppCtrl', function($rootScope, $scope, DataService, $filter, $window, $ionicModal,$ionicHistory, toastr, $timeout, $ionicPopup, $ionicLoading, $state, $ionicHistory, $http) {
  $scope.data={};
  console.log("access token:", localStorage.getItem('access_token'))
  $rootScope.userDetails = $window.localStorage.loggedInUser;
  $rootScope.show === localStorage.getItem('show')


  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };
  $scope.toggleGroup2 = function(group) {
    if ($scope.isGroupShown2(group)) {
      $scope.shownGroup2 = null;
    } else {
      $scope.shownGroup2 = group;
    }
  };
  $scope.isGroupShown2 = function(group) {
    return $scope.shownGroup2 === group;
  };


  $ionicModal.fromTemplateUrl('templates/forgotpassword.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.forgotpassword = modal;
  });

  $scope.closePasswordReset = function() {
    $scope.forgotpassword.hide();
  };
  $scope.resetPassword = function () {
    $ionicLoading.show();
    var formdata = new FormData();
    formdata.append("email", $scope.data.email);
    DataService.forgotPassword(formdata).then(function (response) {
      console.log("forgot password response......", response.data.data);
      toastr.success("Your password has been reset, kindly check your email.")
      $ionicLoading.hide();
      $scope.data.email = "";
      $scope.closePasswordReset();
    }, function (error) {
      console.log("change password error......", error.data);
      $ionicLoading.hide();
      if (error.data === null) {
        toastr.warning('Please check your internet connection')
      } else {
        toastr.error(error.data.message)
      }

    });
  };
  $scope.profile = function(){
    $state.go('profile')
  };
  $scope.logout = function(){
    $ionicLoading.show();
    DataService.logout().then(function (response) {
      $window.localStorage.clear();
      localStorage.clear();
      $ionicHistory.clearCache();
      $ionicHistory.clearHistory();
      $state.go('login');
      toastr.info("logout successful")
      $ionicLoading.hide();
      // location.reload(true);
    }, function (error) {
      console.log("error......", error.data);
      $ionicLoading.hide();
      if (error.data === null) {
        toastr.error('Please check your internet connection');
      } else if (error.status === 400) {
        toastr.error(error.data.message);
      } else if (error.status === 401) {
        $state.go('login');
        $window.localStorage.clear();
        localStorage.clear();
        $ionicHistory.clearCache();
        $ionicHistory.clearHistory();
        toastr.success("please login again")
      } else {
        toastr.error(error.data.message);
      }
    });
  };
  $scope.home = function(){
    if(localStorage.getItem('usertype') === "Customer"){
      $state.go('dashboard');
    } else if (localStorage.getItem('usertype') === "CIT Agent" || localStorage.getItem('usertype') === "CIT Teller"){
      $state.go('dashboard2');
    }
  };

  $scope.$on('IdleStart', function () {
  })
  $scope.$on('IdleWarn', function () {
  })
  $scope.$on('IdleEnd', function () {
  })
  $scope.$on('Keepalive', function () {
  })
  $scope.$on('IdleTimeout', function () {
    var alertPopup = $ionicPopup.alert({
      title: 'Session Expired!',
      template: 'Your session has expired due to inactivity. Please login again!',
      buttons: [{
        text: '<b>OK</b>',
        type: 'button-assertive'
      }]
    });
    alertPopup.then(function(res) {
      $ionicLoading.show();
      DataService.logout().then(function (response) {
        $window.localStorage.clear();
        localStorage.clear();
        $ionicHistory.clearCache();
        $ionicHistory.clearHistory();
        $state.go('login');
        $ionicLoading.hide();
      }, function (error) {
        console.log("error......", error.data);
        $ionicLoading.hide();
        if (error.data === null) {
          $window.localStorage.clear();
          localStorage.clear();
          $ionicHistory.clearCache();
          $ionicHistory.clearHistory();
          $state.go('login');
        } else if (error.status === 400) {
          toastr.error(error.data.message);
        } else if (error.status === 401) {
          $state.go('login');
          $window.localStorage.clear();
          localStorage.clear();
          $ionicHistory.clearCache();
          $ionicHistory.clearHistory();
        } else {
          $window.localStorage.clear();
          localStorage.clear();
          $ionicHistory.clearCache();
          $ionicHistory.clearHistory();
          $state.go('login');
        }
      });
    });
  });

  $rootScope.expiredToken = function () {
    var alertPopup = $ionicPopup.alert({
      title: 'Session Expired!',
      template: 'Your session has expired due to inactivity. Please login again!',
      buttons: [{
          text: '<b>OK</b>',
          type: 'button-assertive'
      }]
    });
    alertPopup.then(function(res) {
    $ionicLoading.show();
    DataService.logout().then(function (response) {
      $window.localStorage.clear();
      localStorage.clear();
      $ionicHistory.clearCache();
      $ionicHistory.clearHistory();
      $state.go('login');
      $ionicLoading.hide();
    }, function (error) {
      console.log("error......", error.data);
      $ionicLoading.hide();
      if (error.data === null) {
        $window.localStorage.clear();
      localStorage.clear();
      $ionicHistory.clearCache();
      $ionicHistory.clearHistory();
      $state.go('login');
      } else if (error.status === 400) {
        toastr.error(error.data.message);
      } else if (error.status === 401) {
        $state.go('login');
        $window.localStorage.clear();
        localStorage.clear();
        $ionicHistory.clearCache();
        $ionicHistory.clearHistory();
      } else {
        $window.localStorage.clear();
      localStorage.clear();
      $ionicHistory.clearCache();
      $ionicHistory.clearHistory();
      $state.go('login');
      }
    });
     });
  };
})

.controller('profileCtrl', function($rootScope, $scope, DataService, $filter, $ionicModal, $ionicHistory, toastr, $timeout, $ionicPopup, $ionicLoading, $state, $ionicHistory, $window) {

  $rootScope.userDetails = $window.localStorage.getItem("loggedInUser");
  console.log("user details: ", $rootScope.userDetails);
  console.log("user fullName: ", $rootScope.userDetails.fullName);

  $ionicModal.fromTemplateUrl('templates/changepassword.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.changepassword = modal;
  });
  $scope.closePasswordChange = function() {
    $scope.data.email = "";
    $scope.changepassword.hide();
  };
  $scope.passwordchange = function(){
    $scope.changepassword.show();
  };
  $scope.changePassword = function (ChangePasswordForm) {
    if ($scope.PasswordChange.newPassword !== $scope.PasswordChange.confirmPassword) {
      toastr.error("The new password does not match the confirm password!");
      return;
    }
    var formdata = new FormData();
    formdata.append("username", $window.localStorage.getItem('username'));
    formdata.append("currentPassword", $scope.data.currentpassword);
    formdata.append("newPassword", $scope.data.newpassword);

    $ionicLoading.show();
    DataService.changePassword(formdata).then(function (response) {
      console.log("password change......", response);
      toastr.success("password changed successfully")
      $ionicLoading.hide();
      $scope.changepassword.hide();
    }, function (error) {
      console.log("error......", error.data);
      $ionicLoading.hide();
      if (error.data === null) {
        toastr.error('Please check your internet connection');
      } else if (error.status === 400) {
        toastr.error(error.data.message);
      }else if (error.status === 401) {
        $state.go('login');
        $window.localStorage.clear();
        localStorage.clear();
        $ionicHistory.clearCache();
        $ionicHistory.clearHistory();
        toastr.success("please login again")
      }else {
        toastr.error(error.data.message);
      }
    });
  };
})


.controller('loginCtrl', function($ionicSideMenuDelegate, $ionicViewService, $scope, DataService, $filter, $ionicModal, $ionicHistory, toastr, $timeout, $ionicPopup, $ionicLoading, $state, $ionicHistory, $window) {
  $ionicSideMenuDelegate.canDragContent(false);        

  $ionicModal.fromTemplateUrl('templates/changepassword.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.changepassword = modal;
  });

  $scope.closePasswordChange = function() {
    $scope.data.email = "";
    $scope.changepassword.hide();
  };

  $scope.doLogin = function (LoginForm) {
    if (!LoginForm.$valid) {
      return;
    }

    $ionicLoading.show();
    var formdata = new FormData();
    formdata.append("grant_type", 'password');
    formdata.append("username", $scope.data.username);
    formdata.append("password", $scope.data.password);
    localStorage.setItem('username', $scope.data.username)
    DataService.login(formdata).then(function (response) {
      console.log("Logging in......", response.data);
      console.log("formdata", formdata);
      $ionicLoading.hide();
      var expires_in = (new Date().getTime() / 1000) + response.data.expires_in;
      console.log("Expiry Time:", $filter('date')((expires_in * 1000), 'yyyy-MM-dd HH:mm:ss'));
      localStorage.setItem('access_token', response.data.access_token)
      console.log("access token:", response.data.access_token)
      localStorage.setItem('expiryTime', (expires_in * 1000))
      $scope.data.username ="";
      $scope.data.password ="";
      $ionicViewService.nextViewOptions({
        disableAnimate: true,
        disableBack: true
      });
      $state.go('otp');
    }, function (error) {

      $ionicLoading.hide();
      if (error.data === null) {
        toastr.warning('Please check your internet connection')
      }else if (error.status === 410) {
        toastr.info('please change your passoword before you proceed')
        $scope.changepassword.show();
      }else {
        toastr.error(error.data.message)
      }
    });
  };

  $scope.forgotpass = function() {
    $scope.data.username ="";
    $scope.data.password ="";
    $scope.forgotpassword.show();
  };

  $scope.changePassword = function (ChangePasswordForm) {
    if (!ChangePasswordForm.$valid) {
      return;
    }
    var formdata = new FormData();
    formdata.append("username", $window.localStorage.getItem('username'));
    formdata.append("currentPassword", $scope.data.currentpassword);
    formdata.append("newPassword", $scope.data.newpassword);

    $ionicLoading.show();
    DataService.changePassword(formdata).then(function (response) {
      console.log("password change......", response);
      toastr.success("password changed successfully")
      $ionicLoading.hide();
      $scope.changepassword.hide();
    }, function (error) {
      console.log("error......", error.data);
      $ionicLoading.hide();
      if (error.data === null) {
        toastr.error('Please check your internet connection');
      } else if (error.status === 400) {
        toastr.error(error.data.message);
      } else {
        toastr.error(error.data.message);
      }
    });
  };

})
            
.controller('otpCtrl', function ($ionicSideMenuDelegate, $ionicViewService, $window, $scope, $rootScope, DataService, $filter, $window, toastr, $ionicLoading, $state) {
  $ionicSideMenuDelegate.canDragContent(false);  
  $scope.sendOTP = function () {
    $ionicLoading.show();
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
        $state.go('dashboard');
        location.reload(true);

      } else if ($rootScope.userType === "CIT Teller"){
        $scope.data.otp = "";

        localStorage.setItem('loggedIn', "true");
        $rootScope.show = 0;
        $rootScope.teller = true;
        localStorage.setItem('teller', $rootScope.teller);
        $rootScope.customer = false;
        localStorage.setItem('customer', $rootScope.customer);
        $ionicViewService.nextViewOptions({
          disableAnimate: true,
          disableBack: true
        });
        $state.go('dashboard2');
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
    }
  })
  };

  $scope.closeOtp = function() {
    $scope.data.otp = "";
    $state.go('login')
  };
})

.controller('DashboardCtrl', function($ionicHistory, $ionicPopup, $ionicViewService, $window, $ionicModal, ionicDatePicker, ionicTimePicker, $scope, $state, $http, toastr, $ionicPopover, $ionicLoading, DataService, $rootScope) {
  $rootScope.customer = localStorage.getItem("customer");
  $rootScope.teller = localStorage.getItem("teller"); 
  $scope.CashCollection = {};
  $scope.CollectionEntry = {};
  $scope.CashCollectionEntries = [];
  $scope.EnteredCurrencyCodes = [];
  $scope.CashCollection.prefCollectionTime = {}

  $ionicModal.fromTemplateUrl('templates/cashentry.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.cashentry = modal;
  });
  $scope.refresh = function(){
    $ionicLoading.show();
    location.reload();
    $ionicLoading.hide();
  };

  $scope.add_cash  = function(){
    if (!$scope.CashCollection.CustomerOutlet) {
      toastr.warning('Please select an Outlet first!');
    } else {
      $scope.cashentry.show();
    }
  };

  $ionicModal.fromTemplateUrl('templates/view-entries.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.viewentry = modal;
  });

  $scope.closeviewentry = function() {
    $scope.viewentry.hide();
  };
  $scope.view_entries  = function(){
   if (!$scope.CashCollectionEntries.length) {
    toastr.warning('Please add cash collection entry!');
  } else {
    $scope.viewentry.show();
  }
};

$ionicPopover.fromTemplateUrl('templates/popover.html', {
  scope: $scope
}).then(function(popover) {
  $scope.popover = popover;
});
$scope.openPopover = function($event) {
  console.log("popover")
  $scope.popover.show($event);
};
$scope.faq = function() {
  $scope.popover.hide();
  $state.go('vslaDash')
};
$scope.profile = function() {
  $scope.popover.hide();
  $state.go('')
};
$scope.logout = function() {
  $ionicLoading.show();
  DataService.logout().then(function (response) {
    setTimeout(function () {
      $ionicHistory.clearCache();
      $state.go('login');
    }, 1000)
    $ionicLoading.hide();
  }); 
};



$scope.CustomerOutletChange = function () {
  console.log($scope.CashCollection.CustomerOutlet.outletId)
  $scope.loadOutletAccounts($scope.CashCollection.CustomerOutlet.outletId);
  $scope.CashCollectionEntries = [];
};

$scope.currencyChange = function () {
  $scope.OutletCurrencyAccounts = [];
  angular.forEach($scope.OutletAccounts, function (value, key) {
    var currencyCode = value.currency ? value.currency.currencyCode : '';
    if (currencyCode === $scope.CollectionEntry.Currency.currencyCode) {
      console.log('OutletCurrencyAccount:', value);
      $scope.OutletCurrencyAccounts.push(value);
    }
  });
};

$scope.fetchCurrencies = function () {
  var currencies = [];
  angular.forEach($scope.Currencies, function (value, key) {
    if ($scope.EnteredCurrencyCodes.indexOf(value.currencyCode) === -1) {
      currencies.push(value);
    } else if ($scope.CollectionEntry.hasOwnProperty('entryId')) {
      if ($scope.CollectionEntry.Currency === value) {
        currencies.push(value);
      }
    }
  });
  return currencies;
};

$scope.addCollectionEntry = function () {
  if (!$scope.CollectionEntry.amount || !$scope.CollectionEntry.OutletAccount) {
    toastr.warning('Fill in all the required fields!');
    return;
  }

  if (!$scope.CollectionEntry.hasOwnProperty('entryId')) {
    $scope.CollectionEntry.entryId = $scope.CashCollectionEntries.length + 1;
    $scope.CashCollectionEntries.push($scope.CollectionEntry);
    $scope.EnteredCurrencyCodes.push($scope.CollectionEntry.Currency.currencyCode);
  }
  $scope.closeAndclear(true);
  $scope.cashentry.hide();
  $scope.closeAndclear(true);
  $scope.view_entries();
  delete $scope.OrigCollectionEntry;
  $scope.CollectionEntry = {};
};

$scope.editCollectionEntry = function (index) {
  $scope.CollectionEntryIndex = index;
  $scope.CollectionEntry = $scope.CashCollectionEntries[$scope.CollectionEntryIndex];
  $scope.OrigCollectionEntry = angular.copy($scope.CollectionEntry);
  $scope.closeviewentry();
  $scope.currencyChange();
  $scope.add_cash();
};
$scope.removeCollectionEntry = function (index) {
  $scope.CashCollectionEntries.splice(index, 1);
  $scope.EnteredCurrencyCodes.splice(index, 1);
};
$scope.closeAndclear = function (recordSaved) {
  if (!recordSaved && $scope.OrigCollectionEntry) {
    $scope.CashCollectionEntries.push($scope.OrigCollectionEntry);
    $scope.CashCollectionEntries.splice($scope.CollectionEntryIndex, 1);
  }
  delete $scope.OrigCollectionEntry;
  $scope.CollectionEntry = {};
  $scope.cashentry.hide();
};
$scope.loadCustomerOutlets = function () {
  $ionicLoading.show();
  // setTimeout(function () {
  DataService.getCustomerOutlets(null, true).then(function (response) {
    console.log("Customer Outlets Data:", response.data.data);
    $scope.CustomerOutlets = response.data.data;
    $scope.loadCurrencies();
    $ionicLoading.hide();
  }, function (error) {
    $ionicLoading.hide();
    if (error.status === -1) {
      toastr.warning('Network Connectivity Issue Detected');
    } else if (error.status === 401) {
      $rootScope.expiredToken();
      // $state.go('login');
      // $window.localStorage.clear();
      // localStorage.clear();
      // $ionicHistory.clearCache();
      // $ionicHistory.clearHistory();
      // toastr.success("please login again")
    } else if (error.status === 403) {
      toastr.error(error.data.message);
      $window.location = '#/Error';
    } 
    // else {
    //   toastr.error("Unknown error has occured: " + error.data.message);
    // }
  });
  // $ionicLoading.hide(); 
  //   var alertPopup = $ionicPopup.alert({
  //     title: 'Internet Disconnected',
  //     template: 'Check your internet connection',
  //     buttons: [
  //       {
  //         text: '<b>Retry</b>',
  //         type: 'button-positive'
  //       }]
  //   });
  //   alertPopup.then(function(res) {
  //      $scope.loadCustomerOutlets();
  //   });  
  // }, 30000) 
};

$scope.loadOutletAccounts = function (outletId) {
  $ionicLoading.show();
  DataService.getOutletAccountsByUser(outletId).then(function (response) {
    console.log("Customer Accounts Data:", response.data);
    $scope.OutletAccounts = response.data.data;
    $ionicLoading.hide();
  }, function (error) {
    console.log("Error", error);
    $ionicLoading.hide();
    if (error.status === -1) {
      toastr.warning('Network Connectivity Issue Detected');
    } else if (error.status === 401) {
      $rootScope.expiredToken();
      // $state.go('login');
      // $window.localStorage.clear();
      // localStorage.clear();
      // $ionicHistory.clearCache();
      // $ionicHistory.clearHistory();
      // toastr.success("please login again")
    } else if (error.status === 403) {
      toastr.error(error.data.message);
      $window.location = '#/Error';
    } else {
      toastr.error("Unknown error has occured: " + error.data.message);
    }
  });
};

$scope.loadCurrencies = function () {
  DataService.getCurrencies().then(function (response) {
    console.log("Resp:", response.data);
    $scope.Currencies = response.data.data.content;
    // $rootScope.setPaginationParams(response.data.data);
    $ionicLoading.hide();
  }, function (error) {
    console.log("Error", error);
    $ionicLoading.hide();
    if (error.status === -1) {
      toastr.warning('Network Connectivity Issue Detected');
    } else if (error.status === 401) {
       $rootScope.expiredToken();
      // $state.go('login');
      // $window.localStorage.clear();
      // localStorage.clear();
      // $ionicHistory.clearCache();
      // $ionicHistory.clearHistory();
      // toastr.success("please login again")
    } else if (error.status === 403) {
      toastr.error(error.data.message);
      $window.location = '#/Error';
    } else {
      toastr.error("Unknown error has occured: " + error.data.message);
    }
  });
};

$scope.submitCollectionRequest = function (CashCollectionForm) {
 

  if ($scope.CashCollectionEntries.length < 1) {
    toastr.info('You must add atleast one Cash Collection Entry!');
    return;
  }

  var CashCollectionRequest = {};
  CashCollectionRequest.outletId = $scope.CashCollection.CustomerOutlet.outletId;
  CashCollectionRequest.accounts = [];
  CashCollectionRequest.prefCollectionTime = $scope.CashCollection.prefCollectionTime.date;
  CashCollectionRequest.description = "Cash Collection Request successfully initiated";

  angular.forEach($scope.CashCollectionEntries, function (value, key) {
    var entry = {};
    entry.accountNumber = value.OutletAccount.accountNumber;
    entry.amount = value.amount;
    CashCollectionRequest.accounts.push(entry);
  });
  console.log("CashCollectionRequest:", angular.toJson(CashCollectionRequest));
  $ionicLoading.show();
  DataService.submitCollectionRequest(CashCollectionRequest).then(function (response) {
    console.log("CashCollectionRequest:", response.data.data);
    $ionicLoading.hide();
    toastr.success("Cash Collection Request successfully submitted.");
    $scope.closeviewentry();
    $state.go('MyRequests')
    // location.reload(true);
    
  }, function (error) {
    console.log("Error", error);
    $ionicLoading.hide();
    if (error.status === -1) {
      toastr.warning('Network Connectivity Issue Detected');
    } else if (error.status === 401) {
      // $rootScope.expiredToken();
      $state.go('login');
      $window.localStorage.clear();
      localStorage.clear();
      $ionicHistory.clearCache();
      $ionicHistory.clearHistory();
      toastr.success("please login again")
    } else if (error.status === 403) {
      toastr.error(error.data.message);
      $window.location = '#/Error';
    } else {
      var errors = "";
      if (error.data.data) {
        errors = " [";
        angular.forEach(error.data.data, function (value, key) {
          errors = errors + value + ",";
        });
        errors = errors + "]";
      }
      toastr.error("Unknown error has occured: " + error.data.message + errors);
    }
  });
};

// VIEW ENTRIES MODAL
  $ionicModal.fromTemplateUrl('templates/counted-cash-entry.html', {
  scope: $scope
  }).then(function(modal) {
  $scope.countedcashentry = modal;
  });
  $scope.closeccentry = function() {
    $scope.countedcashentry.hide();
  };
  $scope.viewccentry  = function(){
   $scope.countedcashentry.show();

 }

   //SHOW TRANSACTION
   $ionicModal.fromTemplateUrl('templates/view_transaction.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.viewtransaction = modal;
  });
  $scope.close_viewtransaction = function() {
    $scope.viewtransaction.hide();
  };
  $scope.view_viewtransaction  = function(){
   $scope.viewtransaction.show();
  };

  $scope.transaction = function(CollectionRequest){
    $scope.view_viewtransaction();
  }

   //INPUT COUNTED CASH
   $ionicModal.fromTemplateUrl('templates/inputcountedcash.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.inputcountedcash = modal;
  });
  $scope.close_inputcountedcash = function() {
    $scope.inputcountedcash.hide();
  };
  $scope.view_inputcountedcash  = function(){
   $scope.inputcountedcash.show();
  };

  $scope.inputcash = function(CollectionTransaction){

    $scope.CollectionTransaction = CollectionTransaction;
    $ionicLoading.show();
    DataService.getCurrency($scope.CollectionTransaction.currencyCode.currencyCode).then(function (response) {
      console.log("Get Currency Response:", response.data.data);
      $scope.CollectionTransaction.Currency = response.data.data;
      $ionicLoading.hide();
      $scope.view_inputcountedcash();
    }, function (error) {
      console.log("Error", error);
      $ionicLoading.hide();
      if (error.status === -1) {
        toastr.warning('Network Connectivity Issue Detected');
      } else if (error.status === 401) {
        // var invalidToken = error.data ? error.data.error : "";
        // if (invalidToken === "invalid_token") {
           $rootScope.expiredToken();
        // } else {
        //   toastr.error('error', 'Error', error.data === "" ? "Unknown error has occured" : error.data.message);
        // }
      //   $state.go('login');
      // $window.localStorage.clear();
      // localStorage.clear();
      // $ionicHistory.clearCache();
      // $ionicHistory.clearHistory();
      // toastr.success("please login again")
      } else if (error.status === 403) {
        toastr.error('error', 'Error', error.data.message);
        $window.location = '#/Error';
      } else {
        toastr.error('error', 'Error', error.data === "" ? "Unknown error has occured" : error.data.message);
      }
    });
  };
 

  $scope.getInputTotals = function (CurrencyDenominationList, returnType) {
    if (!CurrencyDenominationList) {
      return 0;
    }
    var units = 0;
    var amount = 0.0;
    angular.forEach(CurrencyDenominationList, function (value, key) {
      if (value.hasOwnProperty('units')) {
        units = units + parseInt(value.units);
        amount = amount + (value.denomination * parseInt(value.units));
      } else if (value.hasOwnProperty('value')) {
        units = units + (value.value / value.denomination);
        amount = amount + value.value;
      }
    });
    return returnType === 'units' ? units : amount;
  };

  $scope.submitTally = function(){
    $scope.TalliedInput = {};
    console.log("CollectionTransaction", $scope.CollectionTransaction);
    var coinage = [];
    angular.forEach($scope.CollectionTransaction.Currency.cmsCurrencyDenominationList, function (value, key) {
      var denominationInput = {};
      denominationInput.trxId = $scope.CollectionTransaction.trxId;
      denominationInput.denomination = value.denomination;
      if (value.hasOwnProperty('units')) {
        denominationInput.units = parseInt(value.units);
        denominationInput.totalValue = parseInt(value.units) * value.denomination;
      } else if (value.hasOwnProperty('value')) {
        denominationInput.units = (value.value / value.denomination);
        denominationInput.totalValue = value.value;
      } else {
        denominationInput.units = 0;
        denominationInput.totalValue = 0;
      }
      coinage.push(denominationInput);
    });
    $scope.TalliedInput.denominationsCount = coinage;
    console.log("TalliedInput", angular.toJson($scope.TalliedInput));

    $ionicLoading.show();
    DataService.inputTally($scope.TalliedInput).then(function (response) {
      console.log("TalliedInput Response:", response.data.data);
      $ionicLoading.hide();
      $scope.CollectionTransaction.submitted = true;
      if (response.data.code !== 200) {
        toastr.info(response.data.message);
      } else {
        toastr.success("Cash Input successfully submitted.");
        location.reload(true);
      }
    }, function (error) {
      console.log("Error", error);
      $ionicLoading.hide();
      if (error.status === -1) {
        toastr.warning('Network Connectivity Issue Detected');
      } else if (error.status === 401) {
        // var invalidToken = error.data ? error.data.error : "";
        // if (invalidToken === "invalid_token") {
           $rootScope.expiredToken();
        // } else {
        //   toastr.error('error', 'Error', error.data === "" ? "Unknown error has occured" : error.data.message);
        // }
      //   $state.go('login');
      // $window.localStorage.clear();
      // localStorage.clear();
      // $ionicHistory.clearCache();
      // $ionicHistory.clearHistory();
      // toastr.success("please login again")
      } else if (error.status === 403) {
        toastr.error(error.data.message);
        $window.location = '#/Error';
      } else {
        toastr.error(error.data === "" ? "Unknown error has occured" : error.data.message);
      }
    });
  }


$scope.RequestFilter = {};
$scope.ShowRequestView = false;
$scope.CollectionRequestForms = {};
$scope.requestStages = {"Initiated": 1, "Forwarded": 2, "Crew Scheduled": 3, "Crew Confirmed": 4, "Tallied": 5, "Posted": 6};
$scope.CurrentTab = 1;
                $scope.resetFilter = function () {
                  $scope.RequestFilter = {};
                  var startDate = new Date();
                  startDate.setDate(1);
                  $scope.RequestFilter.dateFrom = startDate;
                  $scope.RequestFilter.dateTo = new Date();
                  $scope.listCollectionRequests();
                    //$scope.loadCITAgents();
                  }

                  $scope.listCollectionRequests = function (outputFormat) {
                    $ionicLoading.show();
                    DataService.getPendingCollectionRequests(null, "Crew Confirmed", $scope.RequestFilter, outputFormat).then(function (response) {
                      $ionicLoading.hide();
                      console.log("Collection Requests Data:", response.data.data);
                      $scope.CollectionRequests = response.data.data.content;


                    }, function (error) {
      console.log("Error", error);
      $ionicLoading.hide();
      if (error.status === -1) {
        toastr.warning('Network Connectivity Issue Detected');
      } else if (error.status === 401) {
       $rootScope.expiredToken();
      // $state.go('login');
      // $window.localStorage.clear();
      // localStorage.clear();
      // $ionicHistory.clearCache();
      // $ionicHistory.clearHistory();
      // toastr.success("please login again")
    } else if (error.status === 403) {
      toastr.error(error.data.message);
      $window.location = '#/Error';
    } else {
      toastr.error("Unknown error has occured: " + error.data.message);
    }
  });
                  };

                  $scope.viewCollectionRequest = function (requestId) {
                   $ionicLoading.show();
                   $scope.collectionrequestid = requestId;
                   DataService.getCollectionRequestDetails(requestId).then(function (response) {
                    console.log("Collection Request Data:", response.data.data);
                    $scope.CollectionRequest = response.data.data;
                    $ionicLoading.hide();
                    $scope.viewccentry();
    }, function (error) {
      console.log("Error", error);
      $ionicLoading.hide();
      if (error.status === -1) {
        toastr.warning('Network Connectivity Issue Detected');
      } else if (error.status === 401) {
        // var invalidToken = error.data ? error.data.error : "";
        // if (invalidToken === "invalid_token") {
            $rootScope.expiredToken();
        // } else {
        //   toastr.error(error.data === "" ? "Unknown error has occured" : error.data.message);
        // }
      //   $state.go('login');
      // $window.localStorage.clear();
      // localStorage.clear();
      // $ionicHistory.clearCache();
      // $ionicHistory.clearHistory();
      // toastr.success("please login again")
      } else if (error.status === 403) {
        toastr.error('error', 'Error', error.data.message);
        $window.location = '#/Error';
      } else {
        toastr.error( error.data === "" ? "Unknown error has occured" : error.data.message);
      }
    });
  };
    $scope.loadCustomerOutlets();

})


.controller('Dashboard2Ctrl', function($ionicHistory, $rootScope, $location, $ionicModal, $window, ionicDatePicker, ionicTimePicker, $scope, $state, $http, toastr, $ionicPopover, $ionicLoading, DataService) {
$scope.refresh = function(){
    $ionicLoading.show();
    location.reload();
    $ionicLoading.hide();
  };
  // POPOVER
  $ionicPopover.fromTemplateUrl('templates/popover.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });
  $scope.openPopover = function($event) {
    $scope.popover.show($event);
  };
  $scope.faq = function() {
    $scope.popover.hide();
    $state.go('vslaDash')
  };
  $scope.profile = function() {
    $scope.popover.hide();
    $state.go('')
  };
  $scope.logout = function() {
    $scope.popover.hide();
    $state.go('landingpage');
    setTimeout(function () {
      $ionicHistory.clearCache();
    }, 1000) 
  }

  // VIEW ENTRIES MODAL
  $ionicModal.fromTemplateUrl('templates/counted-cash-entry.html', {
  scope: $scope
  }).then(function(modal) {
  $scope.countedcashentry = modal;
  });
  $scope.closeccentry = function() {
    $scope.countedcashentry.hide();
  };
  $scope.viewccentry  = function(){
   $scope.countedcashentry.show();

 }

   //SHOW TRANSACTION
   $ionicModal.fromTemplateUrl('templates/view_transaction.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.viewtransaction = modal;
  });
  $scope.close_viewtransaction = function() {
    $scope.viewtransaction.hide();
  };
  $scope.view_viewtransaction  = function(){
   $scope.viewtransaction.show();
  };

  $scope.transaction = function(CollectionRequest){
    $scope.view_viewtransaction();
  }

   //INPUT COUNTED CASH
   $ionicModal.fromTemplateUrl('templates/inputcountedcash.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.inputcountedcash = modal;
  });
  $scope.close_inputcountedcash = function() {
    $scope.inputcountedcash.hide();
  };
  $scope.view_inputcountedcash  = function(){
   $scope.inputcountedcash.show();
  };

  $scope.inputcash = function(CollectionTransaction){

    $scope.CollectionTransaction = CollectionTransaction;
    $ionicLoading.show();
    DataService.getCurrency($scope.CollectionTransaction.currencyCode.currencyCode).then(function (response) {
      console.log("Get Currency Response:", response.data.data);
      $scope.CollectionTransaction.Currency = response.data.data;
      $ionicLoading.hide();
      $scope.view_inputcountedcash();
    }, function (error) {
      console.log("Error", error);
      $ionicLoading.hide();
      if (error.status === -1) {
        toastr.warning('Network Connectivity Issue Detected');
      } else if (error.status === 401) {
        // var invalidToken = error.data ? error.data.error : "";
        // if (invalidToken === "invalid_token") {
           $rootScope.expiredToken();
        // } else {
        //   toastr.error('error', 'Error', error.data === "" ? "Unknown error has occured" : error.data.message);
        // }
      //   $state.go('login');
      // $window.localStorage.clear();
      // localStorage.clear();
      // $ionicHistory.clearCache();
      // $ionicHistory.clearHistory();
      // toastr.success("please login again")
      } else if (error.status === 403) {
        toastr.error('error', 'Error', error.data.message);
        $window.location = '#/Error';
      } else {
        toastr.error('error', 'Error', error.data === "" ? "Unknown error has occured" : error.data.message);
      }
    });
  };


  $scope.getInputTotals = function (CurrencyDenominationList, returnType) {
    if (!CurrencyDenominationList) {
      return 0;
    }
    var units = 0;
    var amount = 0.0;
    angular.forEach(CurrencyDenominationList, function (value, key) {
      if (value.hasOwnProperty('units')) {
        units = units + parseInt(value.units);
        amount = amount + (value.denomination * parseInt(value.units));
      } else if (value.hasOwnProperty('value')) {
        units = units + (value.value / value.denomination);
        amount = amount + value.value;
      }
    });
    return returnType === 'units' ? units : amount;
  };

  $scope.submitTally = function(){
    $scope.TalliedInput = {};
    console.log("CollectionTransaction", $scope.CollectionTransaction);
    var coinage = [];
    angular.forEach($scope.CollectionTransaction.Currency.cmsCurrencyDenominationList, function (value, key) {
      var denominationInput = {};
      denominationInput.trxId = $scope.CollectionTransaction.trxId;
      denominationInput.denomination = value.denomination;
      if (value.hasOwnProperty('units')) {
        denominationInput.units = parseInt(value.units);
        denominationInput.totalValue = parseInt(value.units) * value.denomination;
      } else if (value.hasOwnProperty('value')) {
        denominationInput.units = (value.value / value.denomination);
        denominationInput.totalValue = value.value;
      } else {
        denominationInput.units = 0;
        denominationInput.totalValue = 0;
      }
      coinage.push(denominationInput);
    });
    $scope.TalliedInput.denominationsCount = coinage;
    console.log("TalliedInput", angular.toJson($scope.TalliedInput));

    $ionicLoading.show();
    DataService.inputTally($scope.TalliedInput).then(function (response) {
      console.log("TalliedInput Response:", response.data.data);
      $ionicLoading.hide();
      $scope.CollectionTransaction.submitted = true;
      if (response.data.code !== 200) {
        toastr.info(response.data.message);
      } else {
        toastr.success("Cash Input successfully submitted.");
        location.reload(true);
      }
    }, function (error) {
      console.log("Error", error);
      $ionicLoading.hide();
      if (error.status === -1) {
        toastr.warning('Network Connectivity Issue Detected');
      } else if (error.status === 401) {
        // var invalidToken = error.data ? error.data.error : "";
        // if (invalidToken === "invalid_token") {
           $rootScope.expiredToken();
        // } else {
        //   toastr.error('error', 'Error', error.data === "" ? "Unknown error has occured" : error.data.message);
        // }
      //   $state.go('login');
      // $window.localStorage.clear();
      // localStorage.clear();
      // $ionicHistory.clearCache();
      // $ionicHistory.clearHistory();
      // toastr.success("please login again")
      } else if (error.status === 403) {
        toastr.error(error.data.message);
        $window.location = '#/Error';
      } else {
        toastr.error(error.data === "" ? "Unknown error has occured" : error.data.message);
      }
    });
  }


  $scope.RequestFilter = {};
  $scope.ShowRequestView = false;
  $scope.CollectionRequestForms = {};
  $scope.requestStages = {"Initiated": 1, "Forwarded": 2, "Crew Scheduled": 3, "Crew Confirmed": 4, "Tallied": 5, "Posted": 6};
  $scope.CurrentTab = 1;
  $scope.resetFilter = function () {
    $scope.RequestFilter = {};
    var startDate = new Date();
    startDate.setDate(1);
    $scope.RequestFilter.dateFrom = startDate;
    $scope.RequestFilter.dateTo = new Date();
    $scope.listCollectionRequests();
                    //$scope.loadCITAgents();
                  }

    $scope.listCollectionRequests = function (outputFormat) {
      $ionicLoading.show();
      DataService.getPendingCollectionRequests(null, "Crew Confirmed", $scope.RequestFilter, outputFormat).then(function (response) {
      $ionicLoading.hide();
      console.log("Collection Requests Data:", response.data.data);
      $scope.CollectionRequests = response.data.data.content;
    }, function (error) {
      console.log("Error", error);
      $ionicLoading.hide();
      if (error.status === -1) {
        toastr.warning('Network Connectivity Issue Detected');
      } else if (error.status === 401) {
       $rootScope.expiredToken();
      // $state.go('login');
      // $window.localStorage.clear();
      // localStorage.clear();
      // $ionicHistory.clearCache();
      // $ionicHistory.clearHistory();
      // toastr.success("please login again")
    } else if (error.status === 403) {
      toastr.error(error.data.message);
      $window.location = '#/Error';
    } else {
      toastr.error("Unknown error has occured: " + error.data.message);
    }
  });
  };

  $scope.viewCollectionRequest = function (requestId) {
   $ionicLoading.show();
   $scope.collectionrequestid = requestId;
   DataService.getCollectionRequestDetails(requestId).then(function (response) {
    console.log("Collection Request Data:", response.data.data);
    $scope.CollectionRequest = response.data.data;
    $ionicLoading.hide();
    $scope.viewccentry();
  }, function (error) {
    console.log("Error", error);
    $ionicLoading.hide();
    if (error.status === -1) {
      toastr.warning('Network Connectivity Issue Detected');
    } else if (error.status === 401) {
      // var invalidToken = error.data ? error.data.error : "";
      // if (invalidToken === "invalid_token") {
            $rootScope.expiredToken();
      //   } else {
      //     toastr.error(error.data === "" ? "Unknown error has occured" : error.data.message);
      //   }
      // $state.go('login');
      // $window.localStorage.clear();
      // localStorage.clear();
      // $ionicHistory.clearCache();
      // $ionicHistory.clearHistory();
      // toastr.success("please login again")
      } else if (error.status === 403) {
        toastr.error('error', 'Error', error.data.message);
        $window.location = '#/Error';
      } else {
        toastr.error( error.data === "" ? "Unknown error has occured" : error.data.message);
      }
    });
  };
  $scope.resetFilter();
})

.controller('ContedCashCtrl', function(ionicDatePicker, ionicTimePicker, $scope, $state, $http, toastr, $ionicPopover, $ionicLoading, DataService) {

})


.controller('RequestReportCtrl', function($location, $ionicModal, $window, ionicDatePicker, ionicTimePicker, $scope, $state, $http, toastr, $ionicPopover, $ionicLoading, DataService) {
       // VIEW ENTRIES MODAL
    $ionicModal.fromTemplateUrl('templates/request-report-view.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.collectionrequests = modal;
    });

  // Triggered in the login modal to close it
  $scope.closemyrequests = function() {
    $scope.collectionrequests.hide();
  };
  $scope.viewmyrequests  = function(){
   $scope.collectionrequests.show();

 }

  if ($location.$$path === '/PendingRequests') {
    $scope.PageParams = {title: "Pending Collection Requests", breadCrumb: "Pending Requests", requestStatus: "Pending"};
  } else if ($location.$$path === '/CompletedRequest') {
    $scope.PageParams = {title: "Completed Collection Requests", breadCrumb: "Completed Requests", requestStatus: "Completed"};
  } else if ($location.$$path === '/CancelledRequests') {
    $scope.PageParams = {title: "Cancelled Collection Requests", breadCrumb: "Cancelled Requests", requestStatus: "Cancelled"};
  } else if ($location.$$path === '/OfflineRequests') {
    $scope.PageParams = {title: "Offline Collection Requests", breadCrumb: "Offline Requests", requestStatus: "Offline"};
  } else if ($location.$$path === '/AmendedRequests') {
    $scope.PageParams = {title: "Amended Collection Requests", breadCrumb: "Amended Requests", requestStatus: "Amended"};
  } else {
    $scope.PageParams = {title: "Detailed Collection Requests", breadCrumb: "Detailed Requests", requestStatus: null};
  }


  $scope.listCollectionRequests = function (outputFormat) {
    console.log("Request Status:", $scope.PageParams.requestStatus)
    $ionicLoading.show();
    DataService.getRequestReports($scope.PageParams.requestStatus, $scope.RequestFilter, outputFormat).then(function (response) {
      $ionicLoading.hide();
      // if (outputFormat) {
      //   $rootScope.exportReport(response.data, outputFormat, 'Collection Requests');
      // } else {
        console.log("Collection Requests Data:", response.data.data);
        $scope.CollectionRequests = response.data.data.content;
        console.log("requests: ", $scope.CollectionRequests)
        // $rootScope.setPaginationParams(response.data.data);
        // $scope.switchTab('Main');
      // }
    }, function (error) {
      console.log("Error", error);
       $ionicLoading.hide();
      if (error.status === -1) {
        toastr.warning('Network Connectivity Issue Detected');
      } else if (error.status === 401) {
         $rootScope.expiredToken();
      //   $state.go('login');
      // $window.localStorage.clear();
      // localStorage.clear();
      // $ionicHistory.clearCache();
      // $ionicHistory.clearHistory();
      // toastr.success("please login again")
      } else if (error.status === 403) {
        toastr.error(error.data.message);
        $window.location = '#/Error';
      } else {
        toastr.error(error.data === "" ? "Unknown error has occured" : error.data.message);
      }
    });
  };

  $scope.viewCollectionRequest = function (requestId) {
    $ionicLoading.show();
    DataService.getCollectionRequestDetails(requestId, $scope.RequestFilter).then(function (response) {
      console.log("Collection Request Data:", response.data.data);
      $scope.CollectionRequest = response.data.data;
      $ionicLoading.hide();
      $scope.viewmyrequests();
    }, function (error) {
      console.log("Error", error);
      $ionicLoading.hide();
      if (error.status === -1) {
        toastr.warning('Network Connectivity Issue Detected');
      } else if (error.status === 401) {
        // var invalidToken = error.data ? error.data.error : "";
        // if (invalidToken === "invalid_token") {
           $rootScope.expiredToken();
        // } else {
        //   $rootScope.notify('error', 'Error', error.data === "" ? "Unknown error has occured" : error.data.message);
        // }
      //   $state.go('login');
      // $window.localStorage.clear();
      // localStorage.clear();
      // $ionicHistory.clearCache();
      // $ionicHistory.clearHistory();
      // toastr.success("please login again")
      } else if (error.status === 403) {
        toastr.error(error.data.message);
        $window.location = '#/Error';
      } else {
        toastr.error(error.data === "" ? "Unknown error has occured" : error.data.message);
      }
    });
  };

$scope.listCollectionRequests();

})


.controller('TransactionReportCtrl', function($location, $ionicModal, $window, ionicDatePicker, ionicTimePicker, $scope, $state, $http, toastr, $ionicPopover, $ionicLoading, DataService) {
       // VIEW COLLECTION TRANSACTION MODAL
    $ionicModal.fromTemplateUrl('templates/transaction-report-view.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.collectiontransaction = modal;
    });

  // Triggered in the login modal to close it
  $scope.closecollectiontransaction = function() {
    $scope.collectiontransaction.hide();
  };
  $scope.viewcollectiontransaction  = function(){
   $scope.collectiontransaction.show();
 }


 if ($location.$$path === '/PendingTransactions') {
  $scope.PageParams = {title: "Pending Transactions", breadCrumb: "Pending Transactions", trxStatus: "Pending"};
} else if ($location.$$path === '/SuccesfulRequest') {
  $scope.PageParams = {title: "Completed Transactions", breadCrumb: "Successful Transactions", trxStatus: "Successful"};
} else if ($location.$$path === '/CancelledTransactions') {
  $scope.PageParams = {title: "Cancelled Transactions", breadCrumb: "Cancelled Transactions", trxStatus: "Cancelled"};
} else if ($location.$$path === '/OfflineTransactions') {
  $scope.PageParams = {title: "Offline Transactions", breadCrumb: "Offline Transactions", trxStatus: "Offline"};
} else {
  $scope.PageParams = {title: "Detailed Transactions", breadCrumb: "Detailed Transactions", trxStatus: null};
}


$scope.listTransactions = function (outputFormat) {
  $ionicLoading.show();
  DataService.getTransactionReports($scope.PageParams.trxStatus, $scope.TransactionFilter, outputFormat).then(function (response) {
    $ionicLoading.hide();
      console.log("Transactions Report Data:", response.data.data);
      $scope.Transactions = response.data.data.content;
  }, function (error) {
    console.log("Error", error);
    $ionicLoading.hide();
    if (error.status === -1) {
      toastr.warning('Network Connectivity Issue Detected');
    } else if (error.status === 401) {
       $rootScope.expiredToken();
      // $state.go('login');
      // $window.localStorage.clear();
      // localStorage.clear();
      // $ionicHistory.clearCache();
      // $ionicHistory.clearHistory();
      // toastr.success("please login again")
    } else if (error.status === 403) {
      toastr.error(error.data.message);
      $window.location = '#/Error';
    } else {
      toastr.error(error.data === "" ? "Unknown error has occured" : error.data.message);
    }
  });
};

$scope.viewTransaction = function (Transaction) {
  $scope.viewcollectiontransaction();
  $scope.Transaction = Transaction;
  console.log("Transaction Details", Transaction)
};



     // VIEW ENTRIES MODAL
     $ionicModal.fromTemplateUrl('templates/amend-transaction.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.ShowAmendDlg = modal;
    });

  // Triggered in the login modal to close it
  $scope.closeamendtransaction = function() {
    $scope.ShowAmendDlg.hide();
  };
  $scope.viewamendtransaction  = function(){
   $scope.ShowAmendDlg.show();

 }

$scope.amendTrxAmount = function (CollectionTransaction, saveRecord) {
  if (!saveRecord) {
    $scope.CollectionTransaction = CollectionTransaction;
    $scope.viewamendtransaction();
  } else {
    if ($scope.CollectionTransaction.trxValue < 1) {
      toastr.info('Please enter amount!');
      return;
    }
    $scope.closeamendtransaction();
    $ionicLoading.show();
    DataService.amendTrxAmount($scope.CollectionTransaction).then(function (response) {
      console.log("Amend Amount Response:", response.data.data);
      $ionicLoading.hide();
      toastr.success("Transaction amount successfully updated.");
    }, function (error) {
      console.log("Error", error);
      $ionicLoading.hide();
      // $scope.viewCollectionRequest($scope.CollectionRequest.requestId);
      if (error.status === -1) {
        toastr.info('Network Connectivity Issue Detected');
      } else if (error.status === 401) {
        // var invalidToken = error.data ? error.data.error : "";
        // if (invalidToken === "invalid_token") {
           $rootScope.expiredToken();
        // } else {
        //   $rootScope.notify('error', 'Error', error.data === "" ? "Unknown error has occured" : error.data.message);
        // }

      // $state.go('login');
      // $window.localStorage.clear();
      // localStorage.clear();
      // $ionicHistory.clearCache();
      // $ionicHistory.clearHistory();
      // toastr.success("please login again")
      } else if (error.status === 403) {
        toastr.error(error.data.message);
        $window.location = '#/Error';
      } else {
        toastr.error(error.data === "" ? "Unknown error has occured" : error.data.message);
      }
    });
  }
};
$scope.listTransactions();

})

.controller('myrequestsCtrl', function($location, $ionicModal, $window, ionicDatePicker, ionicTimePicker, $scope, $state, $http, toastr, $ionicPopover, $ionicLoading, DataService) {
  $scope.home = function(){
    if(localStorage.getItem('usertype') === "Customer"){
      $state.go('dashboard');
    } else if (localStorage.getItem('usertype') === "CIT Agent" || localStorage.getItem('usertype') === "CIT Teller"){
      $state.go('dashboard2');
    }
  }

  $scope.RequestFilter = {};
  $scope.ShowRequestView = false;
  $scope.CollectionRequestForms = {};
  $scope.requestStages = {"Initiated": 1, "Forwarded": 2, "Crew Scheduled": 3, "Crew Confirmed": 4, "Tallied": 5, "Posted": 6};
  $scope.CurrentTab = 1;

  if ($location.$$path === '/OfflineRequests') {
    $scope.PageParams = {title: "Offline Cash Collections", breadCrumb: "Offline Requests", requestStage: null, processRequests: false, requestType: "Offline"};
  } else if ($location.$$path === '/ForwardRequests') {
    $scope.PageParams = {title: "Forward Requests to CIT Agent", breadCrumb: "Forward to CIT", requestStage: "Initiated", processRequests: true};
  } else if ($location.$$path === '/ScheduleCrew') {
    $scope.PageParams = {title: "CIT Crew Scheduling", breadCrumb: "Crew Scheduling", requestStage: "Forwarded", processRequests: true};
  } else if ($location.$$path === '/ConfirmCrewSchedule') {
    $scope.PageParams = {title: "Confirm Crew Scheduling", breadCrumb: "Confirm Crew Scheduling", requestStage: "Crew Scheduled", processRequests: true};
  } else if ($location.$$path === '/InputTally') {
    $scope.PageParams = {title: "Input Counted Cash", breadCrumb: "Counted Cash Entry", requestStage: "Crew Confirmed", processRequests: true};
  } else if ($location.$$path === '/MyRequests') {
    $scope.PageParams = {title: "My Cash Collection Requests", breadCrumb: "My Requests", requestStage: null, processRequests: false};
  } else {
    $scope.PageParams = {title: "Cash Collection Requests", breadCrumb: "All Requests", requestStage: null, processRequests: false};
  }

  $scope.resetFilter = function () {
    $scope.RequestFilter = {};
    var startDate = new Date();
    startDate.setDate(1);
    $scope.RequestFilter.dateFrom = startDate;
    $scope.RequestFilter.dateTo = new Date();
    $scope.listCollectionRequests();
  }




  // POPOVER
  $ionicPopover.fromTemplateUrl('templates/popover.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });
  $scope.openPopover = function($event) {
    $scope.popover.show($event);
  };
  $scope.faq = function() {
    $scope.popover.hide();
    $state.go('vslaDash')
  };
  $scope.profile = function() {
    $scope.popover.hide();
    $state.go('')
  };
  $scope.logout = function() {
    $scope.popover.hide();
    $state.go('landingpage');
    setTimeout(function () {
      $ionicHistory.clearCache();
    }, 1000) 
  }


     // VIEW ENTRIES MODAL
     $ionicModal.fromTemplateUrl('templates/view-customer-request.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.myrequests = modal;
    });

  // Triggered in the login modal to close it
  $scope.closemyrequests = function() {
    $scope.myrequests.hide();
  };
  $scope.viewmyrequests  = function(){
   $scope.myrequests.show();

 }

 $scope.listCollectionRequests = function (outputFormat) {
  console.log("requestStage: ", $scope.PageParams.title)
  $ionicLoading.show();
  DataService.getCollectionRequests(null, $scope.PageParams.requestStage, $scope.RequestFilter, outputFormat).then(function (response) {
    $ionicLoading.hide();
    console.log("Collection Requests Data:", response.data.data);
    $scope.CollectionRequests = response.data.data.content;
    }, function (error) {
      console.log("Error", error);
      $ionicLoading.hide();
      if (error.status === -1) {
        toastr.warning('Network Connectivity Issue Detected');
      } else if (error.status === 401) {
       $rootScope.expiredToken();
      // $state.go('login');
      // $window.localStorage.clear();
      // localStorage.clear();
      // $ionicHistory.clearCache();
      // $ionicHistory.clearHistory();
      // toastr.success("please login again")
    } else if (error.status === 403) {
      toastr.error(error.data.message);
      $window.location = '#/Error';
    } else {
      toastr.error("Unknown error has occured: " + error.data.message);
    }
  });
};

$scope.viewCollectionRequest = function (requestId) {
 $ionicLoading.show();
 $scope.collectionrequestid = requestId;
 DataService.getCollectionRequestDetails(requestId).then(function (response) {
  console.log("Collection Request Data:", response.data.data);
  $scope.CollectionRequest = response.data.data;
  $ionicLoading.hide();
  $scope.viewmyrequests();
      $scope.requestStage = $scope.requestStages[$scope.CollectionRequest.requestStage];
      console.log("requestStageNo:" + $scope.requestStage, " requestStage:" + $scope.CollectionRequest.requestStage);
      $scope.requestStage = $scope.requestStage === undefined ? 1 : $scope.requestStage;
      // $scope.switchTab('View');
      // $scope.navigateTab(1);
      // $window.scrollTo(0, 0);
    }, function (error) {
      console.log("Error", error);
      $ionicLoading.hide();
      if (error.status === -1) {
        toastr.warning('Network Connectivity Issue Detected');
      } else if (error.status === 401) {
        // var invalidToken = error.data ? error.data.error : "";
        // if (invalidToken === "invalid_token") {
            $rootScope.expiredToken();
        // } else {
        //   toastr.error(error.data === "" ? "Unknown error has occured" : error.data.message);
        // }
      //   $state.go('login');
      // $window.localStorage.clear();
      // localStorage.clear();
      // $ionicHistory.clearCache();
      // $ionicHistory.clearHistory();
      // toastr.success("please login again")
      } else if (error.status === 403) {
        toastr.error('error', 'Error', error.data.message);
        $window.location = '#/Error';
      } else {
        toastr.error( error.data === "" ? "Unknown error has occured" : error.data.message);
      }
    });
};


//CANCEL REQUEST MODAL
$ionicModal.fromTemplateUrl('templates/cancel-request-dlg.html', {
  scope: $scope
}).then(function(modal) {
  $scope.cancelrequest = modal;
});

  // Triggered in the cancel request modal to close it
  $scope.closecancelrequests = function() {
    $scope.cancelrequest.hide();
  };
  $scope.viewcancelrequests  = function(){
   $scope.cancelrequest.show();
 }


 $ionicModal.fromTemplateUrl('templates/show-transaction.html', {
  scope: $scope
}).then(function(modal) {
  $scope.transaction = modal;
});

  // Triggered in the cancel request modal to close it
  $scope.closetransaction = function() {
    $scope.transaction.hide();
  };
  $scope.viewtransaction  = function(){
   $scope.transaction.show();
 }


// CONFIRM TRANSACTION
  $ionicModal.fromTemplateUrl('templates/confirm-transaction.html', {
  scope: $scope
}).then(function(modal) {
  $scope.confirmtransaction = modal;
});

  // Triggered in the cancel request modal to close it
  $scope.closeconfirmtransaction = function() {
    $scope.confirmtransaction.hide();
  };
  $scope.viewconfirmtransaction  = function(){
   $scope.confirmtransaction.show();
 }

//MY REQUEST TRANSACTION
  $ionicModal.fromTemplateUrl('templates/myrequesttransaction.html', {
  scope: $scope
}).then(function(modal) {
  $scope.myrequesttransaction = modal;
});

  // Triggered in the cancel request modal to close it
  $scope.closemyrequesttransaction = function() {
    $scope.myrequesttransaction.hide();
  };
  $scope.viewmyrequesttransaction  = function(){
   $scope.myrequesttransaction.show();
 }




$scope.processRequest = function (postData, object) {
 //  switch ($scope.requestStage) {
  if (postData) {
  $scope.CollectionTransaction = object;
  $scope.ShowConfirmDlg = false;
  $scope.CollectionTransaction.notes = $scope.CollectionTransaction.notes === undefined ? "" : $scope.CollectionTransaction.notes;
  $scope.CollectionTransaction.confirmed = true;
  console.log("CollectionTransaction", angular.toJson($scope.CollectionTransaction));

  $ionicLoading.show();
  DataService.confirmCollectionTrx($scope.CollectionTransaction, $scope.collectionrequestid).then(function (response) {
    console.log("Confirm Collection Trx Response:", response.data.data);
    $ionicLoading.hide();
    $scope.CollectionTransaction.confirmed = true;
    if (response.data.code !== 200) {
      toastr.info(response.data.message);
    } else {
      $state.go('dashboard')
      toastr.success("Cash Collection Transaction successfully confirmed.");
      $scope.closeconfirmtransaction();
      $scope.closetransaction();
      $scope.listCollectionRequests();
    }
  }, function (error) {
    console.log("Error", error);
    $ionicLoading.hide();
    if (error.status === -1) {
      toastr.warning('warning', 'Warning', 'Network Connectivity Issue Detected');
    } else if (error.status === 401) {
      // var invalidToken = error.data ? error.data.error : "";
      // if(invalidToken === "invalid_token") {
         $rootScope.expiredToken();
      // } else {
      //   toastr.error(error.data === "" ? "Unknown error has occured" : error.data.message);
      // }  
      // $state.go('login');
      // $window.localStorage.clear();
      // localStorage.clear();
      // $ionicHistory.clearCache();
      // $ionicHistory.clearHistory();
      // toastr.success("please login again")
    } else if (error.status === 403) {
      $rootScope.notify('error', 'Error', error.data.message);
      $window.location = '#/Error';
    } else {
       toastr.error(error.data === "" ? "Unknown error has occured" : error.data.message);
    }
  });
// }
}else {
  $scope.viewtransaction();
}
}

$scope.showTrxConfirm = function(CollectionTransaction){
  $scope.CollectionTransaction = CollectionTransaction;
  $scope.viewconfirmtransaction();
};

$scope.cancelRequest = function (postData) {
  if (!postData) {
    $scope.viewcancelrequests();
  } else {
    if (!$scope.CollectionRequest.reason) {
      toastr.warning('Please specify a reason for request cancellation!');
      return;
    }
    $scope.closecancelrequests();
    $ionicLoading.show();
    DataService.cancelRequest($scope.CollectionRequest).then(function (response) {
      console.log("Cancel Request Response:", response.data.message);
      $ionicLoading.hide();
      toastr.success(response.data.message);
      $scope.closemyrequests();
      $scope.listCollectionRequests();
    }, function (error) {
      console.log("Error", error);
      toastr.error
      if (error.status === -1) {
        toastr.warning('Network Connectivity Issue Detected');
      } else if (error.status === 401) {
        // var invalidToken = error.data ? error.data.error : "";
        // if (invalidToken === "invalid_token") {
           $rootScope.expiredToken();
        // } else {
        //   toastr.error(error.data === "" ? "Unknown error has occured" : error.data.message);
        // }
      //   $state.go('login');
      // $window.localStorage.clear();
      // localStorage.clear();
      // $ionicHistory.clearCache();
      // $ionicHistory.clearHistory();
      // toastr.success("please login again")
      } else if (error.status === 403) {
       toastr.error('error', 'Error', error.data.message);
        $window.location = '#/Error';
      } else {
        toastr.error(error.data === "" ? "Unknown error has occured" : error.data.message);
      }
    });
  }
};
$scope.resetFilter();
})




