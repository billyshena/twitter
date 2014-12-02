
    angular.module('app.services.mimetype',[])
        .factory('MimeType',
            [function() {

                return {
                    folderIcon: function (folder) {
                        if(folder.name.toLowerCase() == 'musique' || folder.name.toLowerCase() == 'musiques') {
                            return 'sprite-music';
                        }
                        else if(folder.name.toLowerCase() == 'video' || folder.name.toLowerCase() == 'videos' || folder.name.toLowerCase() == 'vidéo' || folder.name.toLowerCase() == 'vidéos') {
                            return 'sprite-videos';
                        }
                        else if(folder.name.toLowerCase() == 'image' || folder.name.toLowerCase() == 'images' || folder.name.toLowerCase() == 'photo' || folder.name.toLowerCase() == 'photos') {
                            return 'sprite-pictures';
                        }
                        else {
                            return 'sprite-folder';
                        }
                    },

                    fileIcon: function (file) {
                        if (file.mimeType.indexOf("odp") != -1 || file.name.indexOf(".odp") != -1) {
                            return 'sprite-diapo';
                        }
                        else if (file.mimeType.indexOf("image") != -1) {
                            return 'sprite-image';
                        }
                        else if (file.mimeType.indexOf("audio") != -1) {
                            return 'sprite-audio';
                        }
                        else if (file.mimeType.indexOf("video") != -1 || file.mimeType.indexOf("application/ogg") != -1) {
                            return 'sprite-video';
                        }
                        else if (file.mimeType.indexOf("html") != -1 || file.mimeType.indexOf("webviewhtml") != -1) {
                            return 'sprite-www';
                        }
                        else if (file.mimeType.indexOf("text") != -1) {
                            return 'sprite-brut';
                        }
                        else if (file.mimeType.indexOf("msword") != -1 || file.mimeType.indexOf("vnd.ms-office") != -1) {
                            return 'sprite-word';
                        }
                        else if (file.mimeType.indexOf("zip") != -1 || file.mimeType.indexOf("x-gzip") != -1) {
                            return 'sprite-zip';
                        }
                        else if (file.mimeType.indexOf("spreadsheet") != -1 || file.mimeType.indexOf("ods") != -1 || file.mimeType.indexOf("vnd.ms-excel") != -1) {
                            return 'sprite-tableur';
                        }
                        else if (file.mimeType.indexOf("octet-stream") != -1) {
                            return 'sprite-executable';
                        }
                        else if (file.mimeType.indexOf("pdf") != -1) {
                            return 'sprite-word';
                        }
                        else {
                            return 'sprite-brut';
                        }
                    }
                }
            }]
        );