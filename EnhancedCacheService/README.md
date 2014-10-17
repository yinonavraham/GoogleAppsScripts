# EnhancedCacheService

A cache service which wraps the GAS's native Cache to provide additional features.
Among those features:

1. Support for values larger than 128KB
2. Support for different value type, in addition to string: number, boolean & object
3. Get the date an entry was last updated

Usage example:
```javascript
var cache = EnhancedCacheService.wrap(CacheService.getUserCache());

//Use the same basic API as in the native cache
cache.put('k1','Hello World!');
cache.put('k2','Beam me up, Scotty',20); //with time-to-live set to 20 seconds
var s = cache.get('k1'); //s === 'Hello World!'
cache.remove('k2');

//Use new methods for specific value types
cache.putNumber('n1',7);
var n = cache.getNumber('n1'); //n === 7
cache.putBoolean('b1',true,60); //with time-to-live set to 1 minute
var b = cache.getBoolean('b1'); //b === true
cache.putObject('o1',{ name: 'John', age: 30 });
var p = cache.getObject('o1'); //p.name === 'John' && p.age === 30
//Objects also support custom parsing and stringifying
cache.putObject('d1',new Date(),undefined,function(d) { return '' + d.getTime(); });
var d = cache.getObject('d1',function(s) { return new Date(+s); });
//Get the date an entry was last updated
var k1lu = cache.getLastUpdate('k1'); //k1lu === a Date instance
```

Blog post I wrote describing this service: [EnhancedCacheService - A Google Apps Script Library](http://orange-coding.blogspot.co.il/2014/10/enhancedcacheservice-google-apps-script.html)
