var coffeeApp = angular.module('coffeeApp', ['ngResource', 'ui.bootstrap'])

coffeeApp.factory('CoffeeShopLocator', function ($resource) {
    return $resource('http://localhost:8080/service/coffeeshop/nearest/:latitude/:longitude',
        {latitude: '@latitude', longitude: '@longitude'}, {}
    )
});

coffeeApp.controller('CoffeeShopController', function ($scope, $window, CoffeeShopLocator) {
    $scope.supportsGeo = $window.navigator;
    $scope.getNearestCoffeeShop = function (latitude, longitude) {
        $scope.nearestCoffeeShop = CoffeeShopLocator.get({latitude: latitude, longitude: longitude});
        if ($scope.nearestCoffeeShop.name == null) {
            //default coffee shop
            $scope.nearestCoffeeShop = CoffeeShopLocator.get({latitude: 51.4994678, longitude: -0.128888});
        }
    };
    $scope.getGeoLocation = function () {
        window.navigator.geolocation.getCurrentPosition(function (position) {
            $scope.getNearestCoffeeShop(position.coords.latitude, position.coords.longitude)
        }, function (error) {
            alert(error);
        });
    };
});

coffeeApp.controller('DrinksController', function ($scope, $filter) {
    //this could come from the coffee shop itself
    $scope.types = [
        {name: 'Americano', family: 'Coffee'},
        {name: 'Latte', family: 'Coffee'},
        {name: 'Cappuccino', family: 'Coffee'},
        {name: 'Tea', family: 'That Other Drink'}
    ]
    $scope.sizes = ['Small', 'Medium', 'Large']
    $scope.availableOptions = [{name: 'Soy', appliesTo:'milk'} , {name:'Skimmed', appliesTo:'milk'}, {name:'Caramel', appliesTo:'syrup'},
        {name:'Decaf', appliesTo:'caffeine'}, {name:'Whipped Cream', appliesTo:'extras'}, {name: 'vanilla', appliesTo:'syrup'},
        {name:'hazelnut', appliesTo:'syrup'}, {name:'sugar free', appliesTo:'syrup'}, {name: 'non fat', appliesTo:'milk'},
        {name:'half fat', appliesTo:'milk'}, {name: 'half and half', appliesTo:'milk'}, {name:'half caf', appliesTo:'caffeine'},
        {name:'chocolate powder', appliesTo:'extras'}, {name: 'double shot', appliesTo:'preparation'},
        {name:'wet', appliesTo:'preparation'}, {name:'dry', appliesTo:'preparation'}, {name: 'organic', appliesTo:'milk'},
        {name:'extra hot', appliesTo:'preparation'}]

    //TODO: remove
    $scope.drink = {};
    $scope.drink.selectedOptions = [];

    $scope.addOption = function() {
        if (!$scope.drink.selectedOptions) {
            $scope.drink.selectedOptions = [];
        }
        $scope.drink.selectedOptions.push($filter('lowercase')($scope.newOption));
        $scope.newOption = '';
    };

});

