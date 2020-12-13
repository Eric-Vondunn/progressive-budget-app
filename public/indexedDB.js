//nothing to pack so nothing to require
// running indexed db
const indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

let db;

const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://evondunn:<Milk40%21%2117>@cluster0.gkaou.mongodb.net/<transactions_db>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect((err) => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

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

request.onerror = function (e) {
  console.log("Something went wrong " + e.target.errorCode);
};

//save record to db if offline
function saveRecord(record) {
  const transaction = db.transaction(["pending"], "readwrite");
  const store = transaction.objectStore("pending");
}

// back online send to mongo and clear pending index
function checkDatabase() {
  // getting the reference to the db
  const transaction = db.transaction(["pending"], "readwrite");
  const store = transaction.objectStore("pending");
  const getAll = store.getAll();

  getAll.onsuccess = function () {
    // posts if you have something bulk
    if (getAll.result.length > 0) {
      fetch("/api/transaction/bulk", {
        method: "POST",
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
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
}
