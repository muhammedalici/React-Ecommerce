importScripts("/precache-manifest.060b23f86bf56b439c67eb1eb5df8289.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

let currentCacheNames = Object.assign({ precacheTemp: workbox.core.cacheNames.precache + "-temp" }, workbox.core.cacheNames);

currentCacheNames.fonts = "googlefonts";
workbox.routing.registerRoute(
    /https:\/\/fonts.(?:googleapis|gstatic).com\/(.*)/,
    workbox.strategies.cacheFirst({
        cacheName: currentCacheNames.fonts,
        plugins: [new workbox.expiration.Plugin({ maxEntries: 30 })]
    }),
    "GET"
);

// clean up old SW caches
self.addEventListener("activate", function(event) {
event.waitUntil(
    caches.keys().then(function(cacheNames) {
    let validCacheSet = new Set(Object.values(currentCacheNames));
    return Promise.all(
        cacheNames
        .filter(function(cacheName) {
            return !validCacheSet.has(cacheName);
        })
        .map(function(cacheName) {
            console.log("deleting cache", cacheName);
            return caches.delete(cacheName);
        })
    );
    })
);
});
