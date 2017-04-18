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
        brand: {},
    }

    $scope.email.brand = $scope.brands[0];

    $scope.setBrand = function (brand) {
        $scope.email.brand = brand;
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