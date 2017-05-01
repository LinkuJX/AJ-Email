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
            pop:        { selected: false, text: 'the mobile phone bill dated', aditionalInfo: function() { return $filter('date')($scope.email.received.date, "dd/MM/yyyy"); } },
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
        },
        cannotAccept: {
            dob:        { selected: false, text: 'your date of birth' },
            add:        { selected: false, text: 'your address' },
            paypal:     { selected: false, text: 'the PayPal account holder' },
            card:       { selected: false, text: 'the card ending', aditionalInfo: function() { return $scope.email.cannotAccept.cardNumber } },
            cardNumber: '', // start as string so the placeholder is shown
            pop:        { selected: false, text: 'the mobile phone bill dated', aditionalInfo: function() { return $filter('date')($scope.email.cannotAccept.date, "dd/MM/yyyy"); } },
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
        },
    };

    $scope.email.brand = $scope.brands[0];

    $scope.setBrand = function (brand) {
        $scope.email.brand = brand;
    };

    $scope.generateOutput = function () {
        var receivedData = getReceivedText($scope.email.received);
        var thingsNotAccepted = getReceivedText($scope.email.cannotAccept)
        var outputData = {
            playerName: $scope.email.playerName,
            receivedCount: receivedData.count,
            receivedInfo: receivedData.text,
            cannotAcceptCount: thingsNotAccepted.count,
            cannotAcceptStuff: thingsNotAccepted.text,
        };
        console.log("outputData:", outputData);
        var template = $.templates('#outputTemplate');
        var output = template.render(outputData);
        $scope.output = output;
    };

    var getReceivedText = function (received) {
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
        var resultText = '';
        var resultLength = result.length;
        if (resultLength > 0) {
            var last = result.pop();
            if (resultLength == 1) {
                resultText = last;
            } else {
                resultText = result.join(", ") + ' and ' + last;
            }
        }
        return {
            count: selected,
            text: resultText
        };
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