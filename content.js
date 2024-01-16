/*
    Repo: https://github.com/prslv/YouTube-AD-skipper-blocker
    License: MIT
*/
(function () {
    'use strict';

    const elementsToRemove = [
        // Add additional elements representing ads here
        '#companion',
        '.ytd-statement-banner-renderer',
        '.ytd-player-legacy-desktop-watch-ads-renderer',
        '.ytd-brand-video-singleton-renderer',
        '#masthead-ad',
        'ytd-ad-slot-renderer',
    ];

    function removeElements() {
        // Loop through each element
        elementsToRemove.forEach(selector => {
            const element = document.querySelector(selector);

            // If an ad element is found, remove it
            if (element) {
                element.remove();
                // console.log('%c Ad element removed! ', 'background: #222; color: #bada55', element);
            }
            
            const adSlot = document.querySelector('ytd-ad-slot-renderer');
            if (adSlot) {
                /* 
                    Here we attempt to remove the elements that hold the sponsored ads on the home page. Those elements have a set width
                    and height, and if not removed, we get empty blocks at random spots. Navigate to the Notes in the repository for a visual example.
                */
                const closestRichItemRenderer = adSlot.closest('.ytd-rich-grid-row');
                
                if (closestRichItemRenderer) {
                    closestRichItemRenderer.remove();
                    // console.log('%c REMOVED PARENT OF ELEMENT -> ', 'background: #222, color: #bada55', closestRichItemRenderer);
                }
            }
        });
    }

    function playerAds() {
        const skipad = document.querySelector('.ytp-ad-skip-button-modern.ytp-button');
        const playVid = document.querySelector('.ytp-play-button');
        const adOverlay = document.querySelector('.ytp-ad-player-overlay');
        const intrinsicAdOverlay = document.querySelector('.ytp-ad-action-interstitial'); // this is the overlay of the 'last man standing' ad, on which the skip button click doesn't work (for me).
        const videoPlayer = document.querySelector('.video-stream.html5-main-video');

        if (skipad || intrinsicAdOverlay) {
            // if the skip button is available, call skipAd() function.
            skipAd(skipad, videoPlayer);

            // Check if the video is paused
            if (playVid && videoPlayer.paused) {
                // If it's paused, unpause after 100ms
                setTimeout(() => {
                    videoPlayer.play();
                    // console.log('%c VIDEO IS PAUSED, RESUMING PLAYBACK! ', 'background: #222; color: #bada55');
                }, 100);
            }
        }

        if (adOverlay && !skipad) {
            // Video ad detected, and is unskippable
            // Mute the ad and set the speed to 16x (maximum for youtube's player)
            
            // console.log('%c 🚨 Unskippable ad detected, muting and speeding it up!', 'background: #222; color: #bada55');

            muteAndSpeedUp(videoPlayer, 16, adOverlay);
        }

        // if you prefer, use a function
        function muteAndSpeedUp(player, speed, overlay) {
            player.mute = true;
            player.style.opacity = 0;
            player.playbackRate = speed;

            const adOverlayObserver = new MutationObserver(() => {
                // Set the opacity to 1 (show the video) and disconnect the observer
                player.style.opacity = 1;

                adOverlayObserver.disconnect();
                // console.log('%c Ad has ended, setting opacity to 1!', 'background: #222; color: #bada55');
            });
    
            // Observe removal of the adOverlay element
            adOverlayObserver.observe(overlay.parentElement, { childList: true });
        }

        function skipAd(skipbtn, player) {
            // Check if the ad is a video with set length
            if (!isNaN(player.currentTime) && isFinite(player.currentTime) && player.currentTime > 0) {
                // Ad has a length, skip it
                player.currentTime = player.duration;
            } else {
                // Ad does not have a length, ad is static
                // console.log('%c 🚨 Skippable ad detected', 'background: #222; color: #bada55');
                skipbtn.click();
            }
        }
    }

    function handleUrlChange() {
        if (window.location.pathname === '/' || window.location.pathname === '/results') {
            removeElements();
        }
        if (window.location.pathname === '/watch') {
            playerAds();
            removeElements();
        }
    }

    const observer = new MutationObserver(handleUrlChange);

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    handleUrlChange();
})();