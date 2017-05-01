angular
    .module('EmailApp')
    .controller('EmailCtrl', EmailCtrl)
    .directive('generalInfo', generalInfo)
    .directive('received', received)
    .directive('cannotAccept', cannotAccept)
    .directive('idRequired', idRequired)
    .directive('cannotAcceptReasons', cannotAcceptReasons);

function EmailCtrl($scope, $http, $filter) {
    // Todo: read this from input file
    $scope.brands = [
        {
            text: 'mFortune',
            value: 'mFortune'
        },
        {
            text: 'PocketWin',
            value: 'PocketWin'
        },
        {
            text: 'Mr Spin',
            value: 'Mr Spin'
        },
    ];

    $scope.email = {
        playerName: 'Bob',
        acceptAllId: false,
        workingDays: true,
        brand: {},
        received: {
            dob:        { selected: false, text: 'your date of birth' },
            add:        { selected: false, text: 'your address' },
            paypal:     { selected: false, text: 'the PayPal account holder' },
            card:       { selected: false, text: 'the card ending', aditionalInfo: function() { return $scope.email.received.cardNumber } },
            cardNumber: '', // start as string so the placeholder is shown
            pop:        { selected: false, text: 'the mobile phone bill dated',           aditionalInfo: function() { return $filter('date')($scope.email.received.date, "dd/MM/yyyy"); } },
            thirdParty: { selected: false, text: 'the 3rd party mobile phone bill dated', aditionalInfo: function() { return $filter('date')($scope.email.received.date, "dd/MM/yyyy"); } },
            nameChange: { selected: false, text: 'your name change' },
            addChange:  { selected: false, text: 'your change of address' },
            ppTrans:    { selected: false, text: 'the PayPal transaction' },
            payment:    { selected: false, text: 'the payment of', aditionalInfo: function() { return '£' + $scope.email.received.paymentValue + ' for the mobile phone bill' } },
            paymentValue: '',
            pp3pDob:    { selected: false, text: "the 3rd party PayPal holder's date of birth" },
            cc3pDob:    { selected: false, text: "the 3rd party card holder's date of birth" },
            pop3pDob:   { selected: false, text: "the 3rd party contract holder's date of birth" },
            thirdPartyCard: { selected: false, text: 'the 3rd party card ending', aditionalInfo: function() { return $scope.email.received.thirdPartyCardNumber } },
            thirdPartyCardNumber: '', // start as string so the placeholder is shown
            pp3rdPartyAdd:  { selected: false, text: "the 3rd party PayPal holder's address" },
            cc3rdPartyAdd:  { selected: false, text: "the 3rd party card holder's address" },
            pop3rdPartyAdd: { selected: false, text: "the 3rd party contract holder's address" },
            date: '',
        },
        cannotAccept: {
            dob:        { selected: false, text: 'your date of birth' },
            add:        { selected: false, text: 'your address' },
            paypal:     { selected: false, text: 'the PayPal account holder' },
            card:       { selected: false, text: 'the card ending', aditionalInfo: function() { return $scope.email.cannotAccept.cardNumber } },
            cardNumber: '', // start as string so the placeholder is shown
            pop:        { selected: false, text: 'the mobile phone bill dated',           aditionalInfo: function() { return $filter('date')($scope.email.cannotAccept.date, "dd/MM/yyyy"); } },
            thirdParty: { selected: false, text: 'the 3rd party mobile phone bill dated', aditionalInfo: function() { return $filter('date')($scope.email.cannotAccept.date, "dd/MM/yyyy"); } },
            nameChange: { selected: false, text: 'your name change' },
            addChange:  { selected: false, text: 'your change of address' },
            ppTrans:    { selected: false, text: 'the PayPal transaction' },
            payment:    { selected: false, text: 'the payment of', aditionalInfo: function() { return '£' + $scope.email.cannotAccept.paymentValue + ' for the mobile phone bill' } },
            paymentValue: '',
            pp3pDob:    { selected: false, text: "the 3rd party PayPal holder's date of birth" },
            cc3pDob:    { selected: false, text: "the 3rd party card holder's date of birth" },
            pop3pDob:   { selected: false, text: "the 3rd party contract holder's date of birth" },
            thirdPartyCard: { selected: false, text: 'the 3rd party card ending', aditionalInfo: function() { return $scope.email.cannotAccept.thirdPartyCardNumber } },
            thirdPartyCardNumber: '', // start as string so the placeholder is shown
            pp3rdPartyAdd:  { selected: false, text: "the 3rd party PayPal holder's address" },
            cc3rdPartyAdd:  { selected: false, text: "the 3rd party card holder's address" },
            pop3rdPartyAdd: { selected: false, text: "the 3rd party contract holder's address" },
            date: '',
        },
        idRequired: {
            dob:        { selected: false, text: 'Proof of your date of birth. For example: passport, driving license, birth certificate or NHS medical card. All photographic identification must be valid and within the expiry date, and please ensure that we can clearly see the entire document.' },
            add:        { selected: false, text: 'Proof of your address. For example: bank statement, home utility bill, council or government letter. We must be able to clearly see who the document is from, your name and address and the issue date within the last 3 months.' },
            paypal:     { selected: false, text: "Proof of the PayPal account to verify the account holder. For this please provide a screenshot of the settings page once logged into the PayPal account, clearly showing the PayPal account holder's full name and the PayPal logo." },
            card:       { selected: false, text: 'Proof of the card ending', aditionalInfo: function() { return ' ' + $scope.email.idRequired.cardNumber + ' which has been used to deposit on your account. We require to see is the first 6 and last 4 digits on the front of the card along with the card holder’s name and the expiry date. Please block out the middle 6 digits of the long 16-digit card number for security.' } },
            cardNumber: '', // start as string so the placeholder is shown
            pop:        { selected: false, text: 'Confirmation to show your phone bill for number ending',          aditionalInfo: function() { return $filter('date')($scope.email.idRequired.date, "dd/MM/yyyy"); } },
            thirdParty: { selected: false, text: 'Confirmation to show the 3rd party phone bill for number ending', aditionalInfo: function() { return $filter('date')($scope.email.idRequired.date, "dd/MM/yyyy"); } },
            nameChange: { selected: false, text: 'Evidence to support your name change. For example: a marriage certificate, a deed poll document to show the name change, or in the instance whereby divorce, dissolution or annulment took place we would need to see a copy of a decree absolute or final order.' },
            addChange:  { selected: false, text: 'Proof of your new address. For example: bank statement, home utility bill, council or government letter. We must be able to clearly see who the document is from, your name and address and the issue date within the last 3 months.' },
            ppTrans:    { selected: false, text: "Proof of a PayPal deposit as a statement or online screenshot showing a transaction to the casino and the PayPal account holder's name to enable us to verify a payment to your account." },
            payment:    { selected: false, text: 'Proof of the payment', aditionalInfo: 
                function() {
                    var prefix = '';
                    if ($scope.email.cannotAccept.paymentValue !== '') {
                        prefix = ' for £' + $scope.email.cannotAccept.paymentValue;
                    }
                    return prefix + ' to your network provider in the form of a bank statement or online screenshot. Please be aware an acceptable screenshot would be of an online bank account summary page. We must be able to clearly see the date of payment, the amount paid, the recipient’s details and that the payment has cleared and is not in a pending status (we advise to make sure we can see the payment debiting the balance).';
                }
            },
            paymentValue: '',
            pp3pDob:    { selected: false, text: 'Proof of date of birth for the 3rd party PayPal holder. For example: passport, driving license, birth certificate or NHS medical card. All photographic identification must be valid and within the expiry date, and please ensure that we can clearly see the entire document.' },
            cc3pDob:    { selected: false, text: 'Proof of date of birth for the 3rd party card holder. For example: passport, driving license, birth certificate or NHS medical card. All photographic identification must be valid and within the expiry date, and please ensure that we can clearly see the entire document.' },
            pop3pDob:   { selected: false, text: 'Proof of date of birth for the 3rd party contract holder. For example: passport, driving license, birth certificate or NHS medical card. All photographic identification must be valid and within the expiry date, and please ensure that we can clearly see the entire document.' },
            thirdPartyCard: { selected: false, text: 'Proof of the 3rd party card ending', aditionalInfo: function() { return ' ' + $scope.email.idRequired.thirdPartyCardNumber + ' which has been used to deposit on your account. We require to see is the first 6 and last 4 digits on the front of the card along with the card holder’s name and the expiry date. Please block out the middle 6 digits of the long 16-digit card number for security.' } },
            thirdPartyCardNumber: '', // start as string so the placeholder is shown
            pp3rdPartyAdd:  { selected: false, text: 'Proof of your address for the 3rd party PayPal holder. For example: bank statement, home utility bill, council or government letter. We must be able to clearly see who the document is from, your name and address and the issue date within the last 3 months.' },
            cc3rdPartyAdd:  { selected: false, text: 'Proof of your address for the 3rd party card holder. For example: bank statement, home utility bill, council or government letter. We must be able to clearly see who the document is from, your name and address and the issue date within the last 3 months.' },
            pop3rdPartyAdd: { selected: false, text: 'Proof of your address for the 3rd party address holder. For example: bank statement, home utility bill, council or government letter. We must be able to clearly see who the document is from, your name and address and the issue date within the last 3 months.' },
            date: '',
        },
    };

    $scope.email.brand = $scope.brands[0];

    $scope.setBrand = function (brand) {
        $scope.email.brand = brand;
    };

    $scope.generateOutput = function () {
        var receivedData     = getItems($scope.email.received);
        var cannotAcceptData = getItems($scope.email.cannotAccept);
        var idRequiredData   = getItems($scope.email.idRequired);
        var outputData = {
            playerName: $scope.email.playerName,
            receivedCount: receivedData.length,
            receivedInfo: joinItems(receivedData),
            cannotAcceptCount: cannotAcceptData.length,
            cannotAcceptInfo: joinItems(cannotAcceptData),
            cannotAcceptReasons: ['aaa', 'bbbb', 'cccc'], // TODO
            idRequiredCount: idRequiredData.length,
            idRequiredItems: idRequiredData,
        };
        console.log("outputData:", outputData);
        var template = $.templates('#outputTemplate');
        var output = template.render(outputData);
        $scope.output = output;
    };

    var getItems = function (received) {
        var result = [];
        var selected = 0;
        for (key in received) {
            if (received[key] != null &&
                received[key].hasOwnProperty('selected') &&
                received[key].hasOwnProperty('text')) {
                // .selected should be boolean
                if (received[key].selected) {
                    selected++;
                    var textToAdd = received[key].text; // .text should be string
                    if (received[key].hasOwnProperty('aditionalInfo')) {
                        console.log('found object with aditionalInfo. textToAdd was: ' + textToAdd);
                        textToAdd += ' ' + received[key]['aditionalInfo'](); // aditionalInfo should be a function
                        console.log('textToAdd now is: ' + textToAdd);
                    }
                    result.push(textToAdd); 
                }
            }
        }
        return result;
    };

    var joinItems = function (items) {
        var resultLength = items.length;
        var resultText = '';
        if (resultLength > 0) {
            var last = items.pop();
            if (resultLength == 1) {
                resultText = last;
            } else {
                resultText = items.join(", ") + ' and ' + last;
            }
        }
        return resultText;
    };
};

function generalInfo() {
    return {
        restrict: 'E',
        templateUrl: 'templates/general-info.html',
        controller: 'EmailCtrl'
    }
};

function received() {
    return {
        restrict: 'E',
        templateUrl: 'templates/received.html',
        controller: 'EmailCtrl'
    }
};

function cannotAccept() {
    return {
        restrict: 'E',
        templateUrl: 'templates/cannot-accept.html',
        controller: 'EmailCtrl'
    }
};

function idRequired() {
    return {
        restrict: 'E',
        templateUrl: 'templates/id-required.html',
        controller: 'EmailCtrl'
    }
};

function cannotAcceptReasons() {
    return {
        restrict: 'E',
        templateUrl: 'templates/cannot-accept-reasons.html',
        controller: 'EmailCtrl'
    }
};