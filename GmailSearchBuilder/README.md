# GmailSearchBuilder

A builder service for Gmail search queries.
It provides a fluent API (chaining methods) for building a search query for mail threads in Gmail. The result is a string which can be used in `GmailApp`'s `search` methods. It also has a short-cut - call `search` directly on the builder itself.

Usage examples:
```javascript
// Search for threads with label 'a' or label 'b' assigned
var query = GmailSearchBuilder.newQuery().label('a').or().label('b').build();
// query = 'label:a OR label:b'
var threads = GmailApp.search(query);
```
```javascript
// Search for threads older than 30 days, larger than 1MB
var threads = GmailSearchBuilder.newQuery().olderThan(30,DateType.DAY).larger(1,SizeType.MB).search();
// query = 'older_than:30d larger:1048576'
```
