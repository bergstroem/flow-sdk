(function(root, undefined) {

  "use strict";


/* flow-sdk main */

// Base function.
var flowSdk = function() {
  var httpRequest;
  var baseUrl = 'http://today.emilsjolander.me';

  // Add functionality here.
  var performRequest = function(method, url, data, success, error) {
    success = success || function() {};
    error = error || function() {};


    if (window.XMLHttpRequest) {
      httpRequest = new window.XMLHttpRequest();
    } else if (window.ActiveXObject) {
      try {
        httpRequest = new window.ActiveXObject("Msxml2.XMLHTTP");
      }
      catch (e) {
        try {
          httpRequest = new window.ActiveXObject("Microsoft.XMLHTTP");
        }
        catch (e) {}
      }
    }

    if (!httpRequest) {
      error('Giving up :( Cannot create an XMLHTTP instance');
    }
    httpRequest.onreadystatechange = function() {
      if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200) {
          success(httpRequest.responseText);
        } else {
          error('There was a problem with the request.');
        }
      }
    };
    httpRequest.open(method, url);
    httpRequest.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    httpRequest.send(JSON.stringify(data));
  };

  var log = function(endpoint, data, success, error) {
    var url = baseUrl + endpoint;
    performRequest('POST', url, data, success, error);
  };

  var enter = function(view) {
    log('/enter', {
      view: view
    });
  };

  var navigate = function(action, view) {
    log('/navigate', {
      action: action,
      view: view
    });
  };

  return {
    navigate: navigate,
    enter: enter
  };
};


// Version.
flowSdk.VERSION = '0.0.1';


// Export to the root, which is probably `window`.
root.flowSdk = flowSdk;


}(this));
