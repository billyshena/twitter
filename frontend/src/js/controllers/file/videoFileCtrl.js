angular.module('app.controllers.file.video', []).controller('videoFileCtrl', [
    '$scope', '$sce', '$modalInstance', 'Storage', 'file',
    function ($scope, $sce, $modalInstance, Storage, file) {

        $scope.file = file;


        var token = JSON.parse(Storage.get('token')).hash;

        $scope.data = {
            url: appConfig.appUrl + '/download/documents/' + file.id + '/' + token
        };

        //$scope.file.url = 'http://localhost:1337/download/134/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJob21ld29ya3MiOltdLCJzdWJqZWN0cyI6W10sImNvbW1lbnRzIjpbXSwibWVzc2FnZXNGcm9tIjpbXSwibWVzc2FnZXNUbyI6W10sImZvbGRlcnMiOlt7Im5hbWUiOiJ0ZXN0IiwicGVybWlzc2lvbiI6InB1YmxpYyIsImlkIjozNCwiY3JlYXRlZEF0IjoiMjAxNC0wNi0yMVQxNjozODoxMi4wMDBaIiwidXBkYXRlZEF0IjoiMjAxNC0wNi0yMVQxNjozODoxMi4wMDBaIiwib3duZXIiOjEsInBhcmVudCI6LTF9XSwiaGFuZElucyI6W10sImFic2VuY2VzIjpbXSwidGVhbXMiOltdLCJoYXNUZWFtcyI6W10sImV2ZW50cyI6W10sIm5vdGlmaWNhdGlvbnMiOltdLCJ0aHJlYWRzIjpbXSwiY291cnNlcyI6W10sImZpcnN0TmFtZSI6Ikd1aWxsYXVtZSIsImxhc3ROYW1lIjoiTm9taW7DqSIsImVtYWlsIjoiZ25vbWluZUBlZHVjbG91ZC5pbSIsInBvc3RhbEFkZHJlc3MiOm51bGwsInBob25lIjpudWxsLCJmYWNlYm9vayI6Imh0dHA6Ly9mYWNlYm9vay5jb20iLCJ0d2l0dGVyIjoiaHR0cDovL3R3aXR0ZXIuY29tIiwiYXZhdGFyIjpudWxsLCJ0b3RhbFNwYWNlIjoyMDAwMDAsInVzZWRTcGFjZSI6bnVsbCwidHlwZSI6OTYsImlkIjoxLCJjcmVhdGVkQXQiOiIyMDE0LTA2LTE4VDA4OjA1OjEwLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDE0LTA2LTIzVDE4OjAwOjE2LjAwMFoiLCJpYXQiOjE0MDM1NDY0MTZ9.Gq3AgvL7vpo3eiqYB9e3D7ZpF_RqULnEP24ihR-VfQg';

        $scope.trustSrc = function(src) {
            console.log(src);

            return $sce.trustAsResourceUrl(src);
        }



        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }
])