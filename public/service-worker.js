const CACHE_NAME = "my-site-cache-v1";
const DATA_CACHE_NAME = "data-cache-v1";

var FILES_TO_CACHE = [
  "/",
  "/db.js",
  "index.js",
  ".manifest.json",
  "/styles.css",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
];

self.addEventListener("install", function (e) {
  //perform install steps

  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("opened cache");
    })
  );

  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );

  //browser activate SW once it installs
  self.skipWaiting();
});

// actual activation
self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
            console.log("Removing cache data", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});
