/* eslint-disable */
import { precacheAndRoute } from 'workbox-precaching';

// Cache'owanie zasobów wygenerowanych przez Webpack
precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('install', function(event) {
  event.waitUntil(self.skipWaiting()); // Force the waiting service worker to become the active service worker.
});
