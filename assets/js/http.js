// HTTP
// A reusable ES5 code to make ajax's async slightly easier to deal with via callback
// Supports IE10+

// Get Data
function getData(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);

  xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 400) {
      callback(JSON.parse(xhr.responseText));
    } else {
      // We reached our target server, but it returned an error
      callback(JSON.parse(xhr.responseText));
    }
  };

  xhr.onerror = function() {
    // There was a connection error of some sort
    callback(null);
  };

  xhr.send();
}

// Post Data
function postData(url, headerKey, headerValue, data, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.setRequestHeader(headerKey, headerValue);

  xhr.send(data);

  xhr.onreadystatechange = function() {

    // 4 = Response from server has been completely loaded.
    if (xhr.readyState === 4) {
      // 200 - 299 = successful
      if (xhr.status === 200 && xhr.status < 300) {
        callback(true);
      } else {
        callback(false);
      }
    }
  };

}
