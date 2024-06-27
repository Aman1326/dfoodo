const send_null_value = "";

// Storing data
const storeData = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    // Handle the error
  }
};

// Retrieving data
const retrieveData = (key) => {
  try {
    const value = localStorage.getItem(key);
    if (value !== null) {
      if (key === "card_colors") {
        // If the key is "card_colors", split the string into an array
        return value.split(",");
      }
      return value;
    }
    return null;
  } catch (error) {
    return null;
  }
};
const storeData2 = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Error storing data in local storage:", error);
  }
};
const retrieveData2 = (key) => {
  try {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
  } catch (error) {
    console.error("Error retrieving data from local storage:", error);
    return null;
  }
};

// Removing data
const removeData = (key) => {
  try {
    localStorage.clear();
  } catch (error) {
    //err
  }
};

export { storeData, retrieveData, removeData, retrieveData2, storeData2 };
