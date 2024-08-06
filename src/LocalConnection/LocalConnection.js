const send_null_value = "0";

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
    return send_null_value;
  } catch (error) {
    return send_null_value;
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

export { storeData, retrieveData, removeData };
