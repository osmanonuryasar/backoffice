(function () {
    'use strict';

    angular
        .module('app')
        .controller('OrderController', OrderController);

	OrderController.$inject = ['UserLocalService', '$rootScope'];
    function OrderController(UserLocalService, $rootScope) {
        var vm = this;

        vm.user = null;
        vm.allUsers = [];
        vm.deleteUser = deleteUser;

        initController();

        function initController() {
            loadCurrentUser();
            loadAllUsers();
        }

        function loadCurrentUser() {
            UserLocalService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                });
        }

        function loadAllUsers() {
            UserLocalService.GetAll()
                .then(function (users) {
                    vm.allUsers = users;
                });
        }

        function deleteUser(id) {
            UserLocalService.Delete(id)
            .then(function () {
                loadAllUsers();
            });
        }
    }

})();