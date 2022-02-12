// ==UserScript==
// @name     video controls
// @version  1
// @grant    none
// include  https://*.mp4
// ==/UserScript==

v = document.getElementsByTagName("video")[0];
if (!v) {
    console.log("no video element");
} else {
    keys = {
        c: function() { v.fastSeek(v.currentTime-2) },
        v: function() { v.fastSeek(v.currentTime+2) },
        a: function() { v.fastSeek(v.currentTime-5) },
        s: function() { v.fastSeek(v.currentTime+5) },
        z: function() { v.fastSeek(v.currentTime-30) },
        x: function() { v.fastSeek(v.currentTime+30) },
        q: function() { seekToPrevFrame() },
        w: function() { seekToNextFrame() },
        // : function() { v.volume += .1 },
        m: function() { v.muted = !v.muted },
    };
    document.onkeydown = function (e) {
        keys[e.key]();
    }
    console.log("video controls enabled");

    function seekToNextFrame() {
        if (v.frameDuration)
            v.seekToNextFrame();
        else
            getFrameDuration();
    }

    function seekToPrevFrame() {
        if (v.frameDuration)
            v.fastSeek(v.currentTime - v.frameDuration);
        else
            getFrameDuration(function () {
                v.fastSeek(v.currentTime - 2 * v.frameDuration);
            });
    };

    function getFrameDuration(callback) {
        let t = v.currentTime;
        v.seekToNextFrame().then(function () {
            v.frameDuration = v.currentTime - t;
            if (callback) callback();
        });
    }
}
