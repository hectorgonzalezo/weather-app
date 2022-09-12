import PubSub from "pubsub-js";

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
        PubSub.publish("location-data-acquired", coordinates);
      }
    );
  }
}
// On window load, get user location
window.addEventListener("load", getUserLocation);
