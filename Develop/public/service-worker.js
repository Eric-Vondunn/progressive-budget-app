var CACHE_NAME = "my-site-cache-v1";
const DATA_CACHE_NAME = "data-cache-v1";

var urlsToCache = [
  "/",
  "/db.js",
  "index.js,"
  "/manifest.json",
  "/styles.css",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png"

];

self.addEventListener("install", function(event){
  //perform install steps

  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache){
      console.log("opened cache");
    })
    );
})