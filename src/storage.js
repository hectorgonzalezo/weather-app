import PubSub from "pubsub-js";

// this function checks if there's storage available to implement persistence of todos.
const storage = (function () {
  function storageAvailable(type) {
    let currentStorage;

    try {
      currentStorage = window[type];
      const x = "__currentStorage_test__";
      currentStorage.setItem(x, x);
      currentStorage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        // everything except Firefox
        (e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === "QuotaExceededError" ||
          // Firefox
          e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
        // acknowledge QuotaExceededError only if there's something already stored
        currentStorage &&
        currentStorage.length !== 0
      );
    }
  }

  const getAll = function getAll() {
      return JSON.parse(localStorage.getItem('preferences'))
  };

  function startStorage() {
    if (storageAvailable("localStorage")) {
      // if there's previous data on storage, display it
      if (localStorage.length > 0) {
        const storedData = getAll()[0];
        PubSub.publish("location-data-acquired", storedData);
      } else {
      // if there's no data, look for user location
      PubSub.publish("no-data-found")
      }
    }
  }

  function add(...location) {
    const object = location;
    // convert object to string and save it in local storage
    localStorage.setItem('preferences', JSON.stringify(object));
  }

  function remove() {
    localStorage.removeItem('preferences');
  }

  function update(location) {
    add(location);
  }


  return { getAll, add, remove, update, startStorage};
})();

export default storage;
