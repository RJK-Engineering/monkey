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
    sync = document.URL.startsWith("https://zst-cdp.triple-it.nl/missed");
    if (v.volume == 1) v.volume = .5;
    keys = {
        c: function() { seek(-2) },
        v: function() { seek(2) },
        a: function() { seek(-5) },
        s: function() { seek(5) },
        z: function() { seek(-30) },
        x: function() { seek(30) },
        q: function() { seekToPrevFrame() },
        w: function() { seekToNextFrame() },
        m: function() { v.muted = !v.muted },
    };
    document.onkeydown = function (e) {
        keys[e.key]();
    }
    console.log("video controls enabled");

    function seek(t) {
        v.fastSeek(v.currentTime+t);
        if (sync)
                setTimeout(function(){
                        v.seekToNextFrame();
                }, 1000);
    }

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
            console.log("frame duration: " + v.frameDuration);
            if (callback) callback();
        });
    }
}
