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

       this.logout = function () {
        return $http.post(urlBase + 'oauth/logout',{}, 
        {
           headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }
        });
    };
    
    this.changePassword = function (formdata) {
        return $http.post(urlBase + 'users/password', formdata,
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
    this.forgotPassword = function (formdata) {
        console.log("email", formdata);
        console.log("access_token:", localStorage.getItem('access_token'));
        return $http.post(urlBase + 'users/forgot-password', formdata, 
        {
            headers: { 'Authorization': 'Basic '+basic_auth_enc, 'Content-Type': undefined }
        });
    };

    // INITIATING CASH COLLECTION ENDPOINTS
    this.getCustomerOutlets = function (customerId, loggedInUser) {
        if(loggedInUser) {
            return $http.get(urlBase + 'principal-customer/outlets/for-user', 
            {
                headers: { 'Authorization': 'Bearer '+localStorage.getItem('access_token') }
            });
        } else if(customerId) {
            return $http.get(urlBase + 'principal-customer/outlets/customer-outlets/'+customerId, 
            {
                headers: { 'Authorization': 'Bearer '+localStorage.getItem('access_token') }
            });
        } else {
            return $http.get(urlBase + 'principal-customer/outlets', 
            {
                headers: { 'Authorization': 'Bearer '+localStorage.getItem('access_token') }
            });
        }
    };
     this.getOutletAccountsByUser = function (outletId) {
        return $http.get(urlBase + 'principal-customer/user-accounts/'+outletId, 
        {
            headers: { 'Authorization': 'Bearer '+localStorage.getItem('access_token') }
        });
    };
     this.getCurrencies = function () {        
        return $http.get(urlBase + 'currency/all_currencies', 
        {
            headers: { 'Authorization': 'Bearer '+localStorage.getItem('access_token') }
        });
    };
    this.submitCollectionRequest = function (CashCollectionRequest) {  
        return $http.post(urlBase + 'cash-collection', CashCollectionRequest, 
        {
            headers: { 'Authorization': 'Bearer '+localStorage.getItem('access_token') }
        });
    };
       this.getCollectionRequests = function (customerId, requestStage, filter, outputFormat) {
        // var collection_filter = filter.dateFrom ? "from="+$filter('date')(filter.dateFrom, 'yyyy/MM/dd')+"&" : ""; 
        // collection_filter = filter.dateTo ? collection_filter+"to="+$filter('date')(filter.dateTo, 'yyyy/MM/dd')+"&" : collection_filter;
        // collection_filter = filter.keyword ? collection_filter+"needle="+filter.keyword+"&" : collection_filter;
        var collection_filter = (filter.requestStatus && filter.requestStatus !== 'All') ? collection_filter+"requestStatus="+filter.requestStatus+"&" : collection_filter;
        if(requestStage) {
            collection_filter = collection_filter+"requestStage="+requestStage+"&";
        } else {
            collection_filter = (filter.requestStage && filter.requestStage !== 'All') ? collection_filter+"requestStage="+filter.requestStage+"&" : collection_filter;
        }
        
        var export_report = outputFormat ? ''+outputFormat : '';
        if(customerId) {
            return $http.get(urlBase + 'cash-collection/customer-requests/'+customerId+'?sort=requestTime,desc', 
            {
                headers: { 'Authorization': 'Bearer '+localStorage.getItem('access_token') }
            });
        } else {
            return $http.get(urlBase + 'cash-collection/report'+export_report+'?sort=requestTime,desc&'+collection_filter, 
            {
                headers: { 'Authorization': 'Bearer '+localStorage.getItem('access_token') }
            });
        }
    };
    this.getPendingCollectionRequests = function (customerId, requestStage, filter, outputFormat) {
        // var collection_filter = filter.dateFrom ? "from="+$filter('date')(filter.dateFrom, 'yyyy/MM/dd')+"&" : ""; 
        // collection_filter = filter.dateTo ? collection_filter+"to="+$filter('date')(filter.dateTo, 'yyyy/MM/dd')+"&" : collection_filter;
        // collection_filter = filter.keyword ? collection_filter+"needle="+filter.keyword+"&" : collection_filter;
        var collection_filter = (filter.requestStatus && filter.requestStatus !== 'All') ? collection_filter+"requestStatus="+filter.requestStatus+"&" : collection_filter;
        if(requestStage) {
            collection_filter = collection_filter+"requestStage="+requestStage+"&";
        } 
        
        var export_report = outputFormat ? ''+outputFormat : '';
        if(customerId) {
            return $http.get(urlBase + 'cash-collection/customer-requests/'+customerId+'?requestStatus=Pending&sort=requestTime,desc', 
            {
                 headers: { 'Authorization': 'Bearer '+localStorage.getItem('access_token') }
            });
        } else {
            return $http.get(urlBase + 'cash-collection/report'+export_report+'?requestStatus=Pending&sort=requestTime,desc&requestStage='+requestStage, 
            {
                 headers: { 'Authorization': 'Bearer '+localStorage.getItem('access_token') }
            });
        }
    };
    this.getCollectionRequestDetails = function (requestId) {
        return $http.get(urlBase + 'cash-collection/'+requestId, 
        {
            headers: { 'Authorization': 'Bearer '+localStorage.getItem('access_token') }
        });
    };
    this.getCurrency = function (currencyCode) {        
        return $http.get(urlBase + 'currency/get_currency/'+currencyCode, 
        {
            headers: { 'Authorization': 'Bearer '+localStorage.getItem('access_token') }
        });
    };
    this.inputTally = function (TalliedInput) {   
        return $http.post(urlBase + 'cash-collection/transactions/denominations', TalliedInput, 
        {
            headers: { 'Authorization': 'Bearer '+localStorage.getItem('access_token') }
        });
    };
     this.getRequestReports = function (requestStatus, filter, outputFormat ) {
        var collection_filter;
        switch(requestStatus) {
            case 'Pending':
               collection_filter = "requestStatus=Pending&";
                break;
            case 'Completed':
                collection_filter = "requestStatus=Completed&";
                break;
            case 'Cancelled':
                collection_filter = "requestStatus=Cancelled&";
                break;
            case 'Amended':
               
                break;
            case 'Offline':
               collection_filter = "requestStatus=Completed&requestType=Offline&";
                break;                   
            default:
                collection_filter = (filter.requestStatus && filter.requestStatus !== 'All') ? collection_filter+"requestStatus="+filter.requestStatus+"&" : collection_filter;
                break;             
        }
        
         // var export_report = outputFormat ? ''+outputFormat : '';
        return $http.get(urlBase + 'cash-collection/report?sort=requestTime,desc&'+collection_filter, 
        {
             headers: { 'Authorization': 'Bearer '+localStorage.getItem('access_token') }
        });
    };

        this.getCollectionRequestDetails = function (requestId) {
        return $http.get(urlBase + 'cash-collection/'+requestId, 
        {
            headers: { 'Authorization': 'Bearer '+localStorage.getItem('access_token') }
        });
    };
    this.getTransactionReports = function (trxStatus, filter, outputFormat) {
        var transaction_filter;
        switch(trxStatus) {
            case 'Pending':
                transaction_filter = "status=Pending&";
                break;
            case 'Successful':
                transaction_filter = "status=Completed&";
                break;
            case 'Cancelled':
                transaction_filter = "status=Cancelled&";
                break;   
            case 'Offline':
                transaction_filter = "status=Offline&";
                break;              
            default:
                transaction_filter = (filter.trxStatus && filter.trxStatus !== 'All') ? transaction_filter+"status="+filter.trxStatus+"&" : transaction_filter;  
                break;             
        }
        
        var export_report = outputFormat ? ''+outputFormat : '';
        return $http.get(urlBase + 'cash-collection/transactions'+export_report+'?sort=timeInitiated,desc&'+transaction_filter, 
        {
            headers: { 'Authorization': 'Bearer '+localStorage.getItem('access_token') }
        });
    };
     this.getTransactionRequestDetails = function (trxId) {
        return $http.get(urlBase + 'cash-collection/'+trxId, 
        {
            headers: { 'Authorization': 'Bearer '+localStorage.getItem('access_token') }
        });
    };
     this.cancelRequest = function (CollectionRequest) {   
        return $http.put(urlBase + 'cash-collection/'+CollectionRequest.requestId+'/cancel-request?reasons='+CollectionRequest.reason, {}, 
        {
             headers: { 'Authorization': 'Bearer '+localStorage.getItem('access_token') }
        });
    };
     this.confirmCollectionTrx = function (CollectionTransaction, requestId) {   
        return $http.put(urlBase + 'cash-collection/'+requestId+'/confirm?notes='+CollectionTransaction.notes, {}, 
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
     this.amendTrxAmount = function (CollectionTransaction) {   
        var transaction = {};
        transaction.accountNumber = CollectionTransaction.accountNumber;
        transaction.currencyCode = CollectionTransaction.currencyCode.currencyCode;
        transaction.trxValue = CollectionTransaction.trxValue;
        return $http.put(urlBase + 'cash-collection/transactions/'+CollectionTransaction.trxId, transaction, 
        {
            headers: { 'Authorization': 'Bearer '+localStorage.getItem('access_token') }
        });
    };
}])
