'use strict';

describe('Modulo tfm.uex', function () {

    beforeEach(function () {
        module('tfm.uex');
    });

    describe('User controller', function () {

        var $scope, UserService;

        beforeEach(function () {
            module(function ($provide) {
            	// inyectamos del mock
                $provide.value('MockedUserService', {'getUsers': function () {
                        return [];
                    }});
            });
        });

        beforeEach(inject(function ($rootScope) {
            $scope = $rootScope.$new();
        }));

        it('debe exponer la lista de usuarios', inject(function ($controller, MockedUserService) {
            $controller('MockedUserService', {'$scope': $scope, 'UserService': MockedUserService});
            expect($controller).toBeDefined();
            expect(UserService);
            expect($scope.users.length).toBe(MockedUserService.getAll().length);
        }));
    });

});
