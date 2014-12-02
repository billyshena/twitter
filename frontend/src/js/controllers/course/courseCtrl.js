/**
 * Created by bshen on 25/11/14.
 */
"use strict";

angular.module('app.controllers.course', []).controller('courseCtrl', [
    '$scope', '$sailsSocket', 'Logger', 'SubjectService', 'CourseService', 'Storage',
    function ($scope, $sailsSocket, Logger, SubjectService, CourseService, Storage) {

        console.log('courseCtrl');

        var userId = JSON.parse(Storage.get('token')).id;

        /** Initialize scope values here **/
        $scope.course = {
            name: '',
            content: '',
            subjects: [],
            password: '',
            confirmPassword: ''
        };

        /** Fetch subjects according to the autocomplete query **/
        $scope.loadSubjects = function(query) {
            return SubjectService.find({
                where: {
                    owner: userId,
                    name: {
                        contains: query
                    }
                }
            }).then(function(data){
                return data
            }, function(err){
                console.log(err);
            });
        };

        /* Create the Course object */
        $scope.create = function(course){

            if(!course.name || course.subjects.length === 0){
                return Logger.logError('Merci de renseigner les champs obligatoires!');
            }

            if((course.password !== '' || course.confirmPassword !== '') && (course.password !== course.confirmPassword)){
                return Logger.logError('Les deux mots de passes ne sont pas identiques');
            }

            // Set the course owner here from the token payload
            course.owner = userId;

            CourseService
                .create(course)
                .then(function(data){
                    Logger.logSuccess('Votre cours a bien été crée');
                },
                function(err){
                    Logger.logError('Erreur lors de la création du cours');
                });
        };

    }
]);


