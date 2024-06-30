/*
    Repo: https://github.com/prslv/youtube-adskipper
    Author: https://github.com/prlsv
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
    let skipAdTimeout;
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
        const skipad = document.querySelector('.ytp-skip-ad-button');
        const playVid = document.querySelector('.ytp-play-button');
        const adOverlay = document.querySelector('.ytp-ad-player-overlay');
        const intrinsicAdOverlay = document.querySelector('.ytp-ad-action-interstitial'); // this is the overlay of the 'last man standing' ad, on which the skip button click doesn't work (for me).
        const videoPlayer = document.querySelector('.video-stream.html5-main-video');
        const adCreated = document.querySelector('.ad-showing');
        if (skipad || intrinsicAdOverlay || adOverlay || adCreated) {
            // if the skip button is available, call skipAd() function.
            skipAd(skipad, videoPlayer, adOverlay);
        }


        function skipAd(skipbtn, player, overlay) {
            // Check if the ad is a video with set length
            clearTimeout(skipAdTimeout);
            const skipbtn2 = document.querySelector(".ytp-skip-ad-button");

            // player.style.opacity = 0;

            // player.mute = true;

            // //set player speed to 16x
            // player.playbackRate = 16;

            if (!isNaN(player.duration) && isFinite(player.currentTime) && player.currentTime > 0) {
                player.currentTime += 99999999;
                // console.log('SKIPPED AD');
            }
            if (skipbtn) {
                skipbtn.click();
            }
            if (skipbtn2) {
                skipbtn2.click();
            }
            const event = new KeyboardEvent("keydown", {
                key: "ArrowRight"
            });
            document.dispatchEvent(event);
            // player.style.opacity = 1;
            // Check if the video is paused
            if (player.paused) {
                // If it's paused, unpause
                player.play();
                // console.log('%c VIDEO IS PAUSED, RESUMING PLAYBACK! ', 'background: #222; color: #bada55');
            }

            const adOverlayObserver = new MutationObserver(() => {
                // Set the opacity to 1 (show the video) and disconnect the observer
                // player.style.opacity = 1;
                // Check if the video is paused
                if (player.paused) {
                    // If it's paused, unpause
                    player.play();
                    // console.log('%c VIDEO IS PAUSED, RESUMING PLAYBACK! ', 'background: #222; color: #bada55');
                }

                adOverlayObserver.disconnect();
                // console.log('%c Ad has ended, setting opacity to 1!', 'background: #222; color: #bada55');
            });

            if (overlay && overlay.parentElement instanceof Node) {
                adOverlayObserver.observe(overlay.parentElement, { childList: true });
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