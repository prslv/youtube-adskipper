# YouTube AD skipper/blocker Extension

## How to install

  ### Download and unzip the files:

  ![image (7)](https://github.com/prslv/YouTube-AdSkipper/assets/104658946/440395bb-8e60-418c-97cf-c9e9a2c4321a)

### Load the extension:

  > For Chrome: type 'chrome://extensions/' in the search bar
  
  > Enable 'Developer mode':

  ![image (5)](https://github.com/prslv/YouTube-AdSkipper/assets/104658946/42825f06-ea58-4c21-8df6-bc5565d8da32)

  > Click on 'Load unpacked':

  ![image (6)](https://github.com/prslv/YouTube-AdSkipper/assets/104658946/d6963a8e-2767-4292-80af-dbd82b1488f7)

  > Select the folder you just unzipped and open youtube

  > Done.

  > Same process on Edge, except you navigate to "edge://extensions/".

## Current issues

  > Slight (ms) delay before it skips video ads;

  > Unskippable ads can only to be sped up;

  > Line: 84 'player.mute = true' failed for unskippable ads, resulting in a short annoying sound (still better than a whole ad);

  > The last man standing ad (read below).

## Note

  → Coming to the Chrome Web Store soon!

  → This extension does NOT slow down youtube, like others (e.g. AdBlock) do.
  
  → Currently only tested on
  
    Chrome, Version 120.0.6099.217
    Edge, Version 120.0.2210.133

  Both tested in Incognito mode, not logged into an account and with rejected cookies, which resulted in more ads than usual (literally every video). It succesfully skipped all video player ads and removed every single ad element on each page reload/video change.  Except the 'Last man standing' ad, which appeared in different page refreshes and remained unskippable. Read more about the 'Last one standing' ad at the bottom of this file.

  Also, please note, that I am still new to JS, so please revise the script before using it. And if you figure out a possible improvement/fix, feel free to contribute to the repository by submitting a pull request or opening an issue. Your feedback and contributions are highly appreciated!

  There is a slight delay before the script skips/hides the ads.
  
## Video Page

  ### Player:
  
  → Skips the skippable ads;
  
  → Mutes and sets the Playback speed of unskippable ads to the maximum (16x);

  Update (17 Jan): The first day of using it my self the muting of the unskippable ad worked fine, next day (surprise) it just stopped working.

  → When an unskippable ad is detected, it sets the opacity of the player to 0;

  Example of the ad it removes (not how it looks when it's removed, I purposely removed the ad details):
  ![](https://github.com/prslv/YouTube-AD-skipper-blocker/assets/104658946/9bab61a3-0103-4713-8ac1-49272e0f68e8)

  ### Suggested videos:
  
  → Removes ads/sponsored elements from the suggested videos next to the player:
  
  ![](https://github.com/prslv/YouTube-AD-skipper-blocker/assets/104658946/fdadead6-be71-4a5d-a380-c232d3f4a557)


## Home page

  → Removes ad banners and sponsored videos/ads:
  
![](https://github.com/prslv/YouTube-AD-skipper-blocker/assets/104658946/2775996e-8afa-40dc-93d2-f68abf299b7f)

### Inconsistency:

The video ads are nested inside two divs. We select the parent div that holds all children and remove it, but it's inconsistent and doesn't always remove it. The inconsistent result is 'Example 1'. The second (correct) example shows what happens when the script correctly finds the parent div, and once removed, all videos to the right of the ad get shifted to the left and the empty spot is left on the right side of the page:

![image (8)](https://github.com/prslv/YouTube-AdSkipper/assets/104658946/d10131dc-9d6c-4741-9df4-b9713fad265c)

## Search page

  → Removes sponsored videos/ads from the search results;
  
  ![](https://github.com/prslv/YouTube-AD-skipper-blocker/assets/104658946/bd9c2184-c657-43d1-ba28-08764f1a469f)

# LAST MAN STANDING

  ### The only video ad it was unable to skip (for me), is this one. It appears after an unskippable ad once in a blue moon.
  
  While testing the extension, It appeared that depending on which 'seed' you land on, you might get this kind of ad after an unskippable ad once every 10-15 ads, or not get it at all.
  
  And by 'seed' I mean, 1 page refresh = different seed. It's weird how I get either unskippable ads every 5 videos, or only skippable ads for like 30 videos, but that might just be me.

  Once this ad appeared, the 'skipAd()' function would constantly execute until the ad is skipped by itself, or by the user. So the button is recognized, but for some reason it's not triggering the '.click()' on the button element. 

  I also noticed that right clicking with my mouse anywhere on this ad wouldn't work as well.

  The ad:
  
![](https://github.com/prslv/YouTube-AD-skipper-blocker/assets/104658946/036cea1d-6622-4d34-b2a3-281703645d83)

I probably skipped through 500-600 ads today. 🤡 Enjoy the extension.
