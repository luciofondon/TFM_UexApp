
describe('Modulo tfm.uex', function () {
 
    beforeEach(function () {
        module('tfm.uex');
    });
 
    describe('Users service', function () {
 
        var userService;
 
        beforeEach(function () {
            inject(['UserService', function (service) {
                    userService = service;
                }
            ]);
        });
 
        it('debe devolver una lista de dos usuarios', function () {
            var users = userService.getAll();
            expect(users).toBeDefined();
            expect(users.length).toBe(2);
        });
    });
});
