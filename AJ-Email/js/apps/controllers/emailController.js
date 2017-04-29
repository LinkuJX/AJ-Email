angular
    .module('EmailApp')
    .controller('EmailCtrl', EmailCtrl)
    .directive('generalInfo', generalInfo)
    .directive('received', received)
    .directive('cannotAccept', cannotAccept)
    .directive('idRequired', idRequired)
    .directive('cannotAcceptReasons', cannotAcceptReasons);

function EmailCtrl($scope, $http) {
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
            card:       { selected: false, text: 'the card ending' },
            pop:        { selected: false, text: 'the mobile phone bill dated' },
            thirdParty: { selected: false, text: 'the mobile phone bill dated' },
            cardNumber: '', // start as string so the placeholder is shown
            nameChange: { selected: false, text: 'your name change' },
            addChange:  { selected: false, text: 'your change of address' },
            ppTrans:    { selected: false, text: 'the PayPal transaction' },
            payment:    { selected: false, text: 'the payment for the mobile phone bill' },
            paymentValue: '',
            pp3pDob:    { selected: false, text: "the 3rd party PayPal holder's date of birth" },
            cc3pDob:    { selected: false, text: "the 3rd party card holder's date of birth" },
            pop3pDob:   { selected: false, text: "the 3rd party contract holder's date of birth" },
            thirdPartyCard: { selected: false, text: 'the 3rd party card ending' },
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
        var outputData = {
            playerName: $scope.email.playerName,
            receivedCount: receivedData.count,
            receivedInfo: receivedData.text,
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
                    result.push(received[key].text); // .text should be string
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