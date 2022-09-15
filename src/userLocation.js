import PubSub from "pubsub-js";
import storage from './storage';

function getUserLocation() {
  if (navigator.geolocation) {
    PubSub.publish("lookup-started");
    navigator.geolocation.getCurrentPosition(
      // if you get it successfully,
      (locationData) => {
        const coordinates = [
          locationData.coords.latitude,
          locationData.coords.longitude,
        ];
        storage.add(coordinates)
        PubSub.publish("location-data-acquired", coordinates);
      }
    );
  }
}
// On window load, get user location
PubSub.subscribe('no-data-found', getUserLocation);
window.addEventListener("load", storage.startStorage)
