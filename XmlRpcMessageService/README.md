# XmlRpcMessageService

A service for simplifying the usage of [XML-RPC](http://xmlrpc.scripting.com/spec.html) services from JavaScript in Google Apps Script. To include this library in your project, add the following project key to your dependencies:
`MnNFSfwH_9vxu1ezJ2OiczhHiNulVL0Kf`

# Service Binding

A simple API can be achieved using service binding. In this option, a service object is created with binding to a server URL. The service object then has native JavaScript functions for each remote server method. Calling a remote method is simple as calling any other JavaScript function. The following is an example for calling the login method of [OpenSubtitles.org](http://www.opensubtitles.org) service:
```javascript
// Create the service binding
var url = "http://api.opensubtitles.org/xml-rpc";
var service = XmlRpcMessageService.bind(url);
// Call the service method as a native JS function
var result = service.LogIn("", "", "he", "OS Test User Agent");
var token = result.token;
```
This is done with the following assumptions:
* The server supports the `system.listMethods` method.  
  If this is not true, the array of method names can be given as the 2nd argument to the `bind` method.
* The response contains at most one `param` element (if not a `fault` response).
* Any fault response is handled as an `Error` and is thrown.

# Advanced Usage

A more advanced and flexible option is to do the method calls yourself. For this you can use methods to create method call XML from a simple JavaScript object, and parsing method response XML to a JavaScript object.
This service also provides a method for posting method calls to a URL and parse the response.
The example above can be written as:
```javascript
function login() {
  Logger.log("Logging in...");
  var methodCall = {
    methodName : "LogIn",
    params : [ "", "", "en", "OS Test User Agent" ]
  };
  var url = "http://api.opensubtitles.org/xml-rpc";
  var methodResponse;
  XmlRpcMessageService.execMethodCall(url, methodCall, function(mr) { methodResponse = mr; });
  var token = methodResponse.params[0].token;
  Logger.log('Logged in. Token: ' + token);
  return token;
}
```

# Limitations

* The supported data types are:
  * `string`
  * `double`
  * `int` (only in response)
  * `boolean`
  * `struct`
  * `array`
