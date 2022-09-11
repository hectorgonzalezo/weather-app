import PubSub from "pubsub-js";

function getUserLocationOnLoad() {
  function getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        // if you get it successfully,
        (locationData) => {
          ``;
          const coordinates = [
            locationData.coords.latitude,
            locationData.coords.longitude,
          ];
          PubSub.publish("location-data-acquired", coordinates);
        }
      );
    }
  }
  // On window load, get user location
  window.addEventListener("load", getUserLocation);
}
