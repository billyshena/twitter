
angular.module('app.controllers.file.preview', ['pdf'])
    .controller('pdfPreviewCtrl', [
    '$scope', '$state', '$sce', 'Storage', 'data',
    function ($scope, $state, $sce, Storage, data) {

        var token = JSON.parse(Storage.get('token')).hash;
        $scope.pdfUrl = appConfig.appUrl + '/download/documents/' + data + '/' + token;
        $scope.assetsUrl = appConfig.assetsUrl;

        $scope.getTemplateUrl = function() {
            return $sce.trustAsResourceUrl(appConfig.assetsUrl + 'views/documents/viewer.html');
        }

    }]
);