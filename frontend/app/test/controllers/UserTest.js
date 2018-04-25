'use strict';
 
describe('Modulo app.cars', function () {
 
    beforeEach(function () {
        module('app.cars');
    });
 
    describe('Cars controller', function () {
 
        var $scope, CarsService;
 
        beforeEach(function () {
            module(function ($provide) {
            	// inyectamos del mock
                $provide.value('MockedCarsService', {'getAll': function () {
                        return [];
                    }});
            });
        });
 
        beforeEach(inject(function ($rootScope) {
            $scope = $rootScope.$new();
        }));
 
        it('debe exponer la lista de coches', inject(function ($controller, MockedCarsService) {
            $controller('CarsController', {'$scope': $scope, 'CarsService': MockedCarsService});
            expect($controller).toBeDefined();
            expect(CarsService);
            expect($scope.cars.length).toBe(MockedCarsService.getAll().length);
        }));
    });
 
});
