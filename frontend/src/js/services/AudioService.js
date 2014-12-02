angular.module('app.services.audio',['mediaPlayer']).factory('AudioService', function () {

    var player;
    var playlist = [];

    return {
        setPlayer: function (p) {
            player = p;
        },
        play: function (link, mimetype) {
            playlist = [
                {
                    src: link,
                    type: mimetype
                }
            ];
            player.load(playlist, true);
            //player.play(playlist, true);
        },
        next: function (autoplay) {
            player.next(autoplay);
        },
        addToPlaylist: function (link, mimetype) {
            playlist.push({
                src: link,
                type: mimetype
            });
            player.load(playlist, true);
        }
    };
});