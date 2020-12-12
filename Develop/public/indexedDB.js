//nothing to pack so nothing to require
// running indexed db
const indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB ||

let db;

//budget is the name of our cache
//opens budget
const request = indexedDB.open("budget", 1);


// this is the schema
request.onupgradeneeded = ({ target }) => {
  let db = target.result;
  db.createObjectStore("pending", { autoIncrement: true });
};

request.onsuccess = ({ target }) => {
  db = target.result;


// check if app is online before it actually reads the info form the db
if (navigator.onLine) {
  checkDatabase();
}
};

request.onerror = function(e) {
  console.log("Something went wrong " + e.target.errorCode);
};

function saveRecord(record) {
  const transaction = db.transaction(["pending"], "readwrite");
  const store = transaction.objectStore("pending");
}

function checkDatabase() {
  // getting the reference to the db
  const transaction = db.transaction(["pending"], "readwrite");
  const store = transaction.objectStore("pending");
  const getAll = store.getAll();

  getAll.onsuccess = function() {
    // posts if you have something bulk
    if (getAll.result.length > 0) {
      fetch("/api/transaction/bulk", {
        method: "POST",
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        return response.json();
      })
      .then(() => {
        // delete records if successful
        const transaction = db.transaction(["pending"], "readwrite");
        const store = transaction.objectStore("pending");
        store.clear();
      });
    }
  };
}




}

// listening for app to come back online
window.addEventListener("online", checkDatabase);






  // working on this 
  function saveRecord(data) {
    console.log(data);




    // create budget db + bulk (pending) collection

    // install -> create bulk (pending) collection

    // activate ->

    // saveRecord -> save to indexedDB

    // listen to when we are back online and send records
  };
