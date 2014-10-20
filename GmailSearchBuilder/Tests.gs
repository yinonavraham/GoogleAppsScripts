function testAll() {
  testWords();
  testLabel();
  testHasUserLabels();
  testHasNoUserLabels();
  testOlderThan();
  testNewerThan();
  testBefore();
  testAfter();
  testOr();
  testExclude();
  testExact();
  testFrom();
  testTo();
  testCc();
  testBcc();
  testSubject();
  testCategory();
  testHasAttachment();
  testFilename();
  testLarger();
  testSmaller();
  testSubQuery();
  testIn();
  testIs();
  testComplexQuery();
  testSearch();
}

function testWords() {
  Logger.log("--- testWords ---");
  var query;
  
  query = newQuery().words("One").build();
  Logger.log("query=%s", query);
  assertEquals(query, "One");
  
  query = newQuery().words("One Two").build();
  Logger.log("query=%s", query);
  assertEquals(query, "One Two");
  
  Logger.log("Fail to set words: number");
  assertThrows("Words must be a string", function() {
    newQuery().words(1);
  });
  
  Logger.log("Fail to set words: boolean");
  assertThrows("Words must be a string", function() {
    newQuery().words(true);
  });
  
  Logger.log("Fail to set words: null");
  assertThrows("Words must be a string", function() {
    newQuery().words(null);
  });
  
  Logger.log("Fail to set words: undefined");
  assertThrows("Words must be a string", function() {
    newQuery().words();
  });
}

function testSubject() {
  Logger.log("--- testSubject ---");
  var query;
  
  query = newQuery().subject("One").build();
  Logger.log("query=%s", query);
  assertEquals(query, "subject:One");
  
  query = newQuery().subject('"One Two"').build();
  Logger.log("query=%s", query);
  assertEquals(query, 'subject:"One Two"');
  
  Logger.log("Fail to set subject: number");
  assertThrows("Subject words must be a string", function() {
    newQuery().subject(1);
  });
  
  Logger.log("Fail to set subject: boolean");
  assertThrows("Subject words must be a string", function() {
    newQuery().subject(true);
  });
  
  Logger.log("Fail to set subject: null");
  assertThrows("Subject words must be a string", function() {
    newQuery().subject(null);
  });
  
  Logger.log("Fail to set subject: undefined");
  assertThrows("Subject words must be a string", function() {
    newQuery().subject();
  });
}

function testLabel() {
  Logger.log("--- testLabel ---");
  var query;
  
  query = newQuery().label("My Label").build();
  Logger.log("query=%s", query);
  assertEquals(query, "label:My-Label");
  
  Logger.log("Fail to set label: number");
  assertThrows("Lable name must be a string", function() {
    newQuery().label(1);
  });
  
  Logger.log("Fail to set label: no arguments");
  assertThrows("Lable name must be a string", function() {
    newQuery().label();
  });
  
  Logger.log("Fail to set label: null");
  assertThrows("Lable name must be a string", function() {
    newQuery().label(null);
  });
  
  Logger.log("Fail to set label: boolean");
  assertThrows("Lable name must be a string", function() {
    newQuery().label(true);
  });
}

function testHasUserLabels() {
  Logger.log("--- testHasUserLabels ---");
  var query;
  
  query = newQuery().hasUserLabels().build();
  Logger.log("query=%s", query);
  assertEquals(query, "has:userlabels");
}

function testHasNoUserLabels() {
  Logger.log("--- testHasNoUserLabels ---");
  var query;
  
  query = newQuery().hasNoUserLabels().build();
  Logger.log("query=%s", query);
  assertEquals(query, "has:nouserlabels");
}

function testCategory() {
  Logger.log("--- testCategory ---");
  var query;
  
  query = newQuery().category("My Category").build();
  Logger.log("query=%s", query);
  assertEquals(query, "category:My-Category");
  
  Logger.log("Fail to set category: number");
  assertThrows("Category must be a not empty string", function() {
    newQuery().category(1);
  });
  
  Logger.log("Fail to set category: boolean");
  assertThrows("Category must be a not empty string", function() {
    newQuery().category(true);
  });
  
  Logger.log("Fail to set category: null");
  assertThrows("Category must be a not empty string", function() {
    newQuery().category(null);
  });
  
  Logger.log("Fail to set category: undefined");
  assertThrows("Category must be a not empty string", function() {
    newQuery().category();
  });
}

function testOlderThan() {
  Logger.log("--- testOlderThan ---");
  var query;
  
  query = newQuery().olderThan(1,DateType.DAY).build();
  Logger.log("query=%s", query);
  assertEquals(query, "older_than:1d");
  
  query = newQuery().olderThan(0,DateType.MONTH).build();
  Logger.log("query=%s", query);
  assertEquals(query, "older_than:0m");
  
  query = newQuery().olderThan(60,DateType.YEAR).build();
  Logger.log("query=%s", query);
  assertEquals(query, "older_than:60y");
  
  query = newQuery().olderThan(1,'d').build();
  Logger.log("query=%s", query);
  assertEquals(query, "older_than:1d");
  
  query = newQuery().olderThan(0,'m').build();
  Logger.log("query=%s", query);
  assertEquals(query, "older_than:0m");
  
  query = newQuery().olderThan(60,'y').build();
  Logger.log("query=%s", query);
  assertEquals(query, "older_than:60y");
  
  Logger.log("Fail to set older_than: period=string");
  assertThrows("Period must be a non negative integer number", function() {
    newQuery().olderThan('1',DateType.DAY);
  });
  
  Logger.log("Fail to set older_than: period=null");
  assertThrows("Period must be a non negative integer number", function() {
    newQuery().olderThan(null,DateType.DAY);
  });
  
  Logger.log("Fail to set older_than: period=undefined");
  assertThrows("Period must be a non negative integer number", function() {
    newQuery().olderThan(undefined,DateType.DAY);
  });
  
  Logger.log("Fail to set older_than: period=negative");
  assertThrows("Period must be a non negative integer number", function() {
    newQuery().olderThan(-1,DateType.DAY);
  });
  
  Logger.log("Fail to set older_than: period=float");
  assertThrows("Period must be a non negative integer number", function() {
    newQuery().olderThan(1.1,DateType.DAY);
  });
  
  Logger.log("Fail to set older_than: type=string");
  assertThrows("Type must be a valid DateType value", function() {
    newQuery().olderThan(1,'blabla');
  });
  
  Logger.log("Fail to set older_than: type=number");
  assertThrows("Type must be a valid DateType value", function() {
    newQuery().olderThan(1,1);
  });
  
  Logger.log("Fail to set older_than: type=null");
  assertThrows("Type must be a valid DateType value", function() {
    newQuery().olderThan(1,null);
  });
  
  Logger.log("Fail to set older_than: type=undefined");
  assertThrows("Type must be a valid DateType value", function() {
    newQuery().olderThan(1);
  });
  
  Logger.log("Fail to set older_than: type=boolean");
  assertThrows("Type must be a valid DateType value", function() {
    newQuery().olderThan(1,true);
  });
}

function testNewerThan() {
  Logger.log("--- testNewerThan ---");
  var query;
  
  query = newQuery().newerThan(1,DateType.DAY).build();
  Logger.log("query=%s", query);
  assertEquals(query, "newer_than:1d");
  
  query = newQuery().newerThan(0,DateType.MONTH).build();
  Logger.log("query=%s", query);
  assertEquals(query, "newer_than:0m");
  
  query = newQuery().newerThan(60,DateType.YEAR).build();
  Logger.log("query=%s", query);
  assertEquals(query, "newer_than:60y");
  
  query = newQuery().newerThan(1,'d').build();
  Logger.log("query=%s", query);
  assertEquals(query, "newer_than:1d");
  
  query = newQuery().newerThan(0,'m').build();
  Logger.log("query=%s", query);
  assertEquals(query, "newer_than:0m");
  
  query = newQuery().newerThan(60,'y').build();
  Logger.log("query=%s", query);
  assertEquals(query, "newer_than:60y");
  
  Logger.log("Fail to set newer_than: period=string");
  assertThrows("Period must be a non negative integer number", function() {
    newQuery().newerThan('1',DateType.DAY);
  });
  
  Logger.log("Fail to set newer_than: period=null");
  assertThrows("Period must be a non negative integer number", function() {
    newQuery().newerThan(null,DateType.DAY);
  });
  
  Logger.log("Fail to set newer_than: period=undefined");
  assertThrows("Period must be a non negative integer number", function() {
    newQuery().newerThan(undefined,DateType.DAY);
  });
  
  Logger.log("Fail to set newer_than: period=negative");
  assertThrows("Period must be a non negative integer number", function() {
    newQuery().newerThan(-1,DateType.DAY);
  });
  
  Logger.log("Fail to set newer_than: period=float");
  assertThrows("Period must be a non negative integer number", function() {
    newQuery().newerThan(1.1,DateType.DAY);
  });
  
  Logger.log("Fail to set newer_than: type=string");
  assertThrows("Type must be a valid DateType value", function() {
    newQuery().newerThan(1,'blabla');
  });
  
  Logger.log("Fail to set newer_than: type=number");
  assertThrows("Type must be a valid DateType value", function() {
    newQuery().newerThan(1,1);
  });
  
  Logger.log("Fail to set newer_than: type=null");
  assertThrows("Type must be a valid DateType value", function() {
    newQuery().newerThan(1,null);
  });
  
  Logger.log("Fail to set newer_than: type=undefined");
  assertThrows("Type must be a valid DateType value", function() {
    newQuery().newerThan(1);
  });
  
  Logger.log("Fail to set newer_than: type=boolean");
  assertThrows("Type must be a valid DateType value", function() {
    newQuery().newerThan(1,true);
  });
}

function testBefore() {
  Logger.log("--- testBefore ---");
  var query;
  
  query = newQuery().before(new Date(2012,7,9)).build(); // 7->Aug - Month: 0..11
  Logger.log("query=%s", query);
  assertEquals(query, "before:2012/08/09");
  
  Logger.log("Fail to build query with before: string");
  assertThrows("date must be an instance of Date", function() {
    newQuery().before('bla');
  });
  
  Logger.log("Fail to build query with before: null");
  assertThrows("date must be an instance of Date", function() {
    newQuery().before(null);
  });
  
  Logger.log("Fail to build query with before: number");
  assertThrows("date must be an instance of Date", function() {
    newQuery().before(7);
  });
  
  Logger.log("Fail to build query with before: boolean");
  assertThrows("date must be an instance of Date", function() {
    newQuery().before(true);
  });
  
  Logger.log("Fail to build query with before: undefined");
  assertThrows("date must be an instance of Date", function() {
    newQuery().before();
  });
}

function testAfter() {
  Logger.log("--- testAfter ---");
  var query;
  
  query = newQuery().after(new Date(2012,7,9)).build(); // 7->Aug - Month: 0..11
  Logger.log("query=%s", query);
  assertEquals(query, "after:2012/08/09");
  
  Logger.log("Fail to build query with after: string");
  assertThrows("date must be an instance of Date", function() {
    newQuery().after('bla');
  });
  
  Logger.log("Fail to build query with after: null");
  assertThrows("date must be an instance of Date", function() {
    newQuery().after(null);
  });
  
  Logger.log("Fail to build query with after: number");
  assertThrows("date must be an instance of Date", function() {
    newQuery().after(7);
  });
  
  Logger.log("Fail to build query with after: boolean");
  assertThrows("date must be an instance of Date", function() {
    newQuery().after(true);
  });
  
  Logger.log("Fail to build query with after: undefined");
  assertThrows("date must be an instance of Date", function() {
    newQuery().after();
  });
}

function testOr() {
  Logger.log("--- testOr ---");
  var query;
  
  query = newQuery().label("label1").or().label("label2").build();
  Logger.log("query=%s", query);
  assertEquals(query, "label:label1 OR label:label2");
  
  Logger.log("Fail to add OR after OR");
  assertThrows("Query is in an intermediate state", function() {
    newQuery().label("label1").or().or();
  });
  
  Logger.log("Fail to start query with OR");
  assertThrows("OR must follow a term", function() {
    newQuery().or();
  });
  
  Logger.log("Fail to build query ending with OR");
  assertThrows("Query is in an intermediate state", function() {
    newQuery().label("label1").or().build();
  });
}

function testExclude() {
  Logger.log("--- testExclude ---");
  var query;
  
  query = newQuery().label("label1").exclude().label("label2").build();
  Logger.log("query=%s", query);
  assertEquals(query, "label:label1 -label:label2");
  
  Logger.log("Fail to build query ending with exclude");
  assertThrows("Query is in an intermediate state", function() {
    newQuery().label("label1").exclude().build();
  });
}

function testExact() {
  Logger.log("--- testExact ---");
  var query;
  
  query = newQuery().label("label1").exact().label("label2").build();
  Logger.log("query=%s", query);
  assertEquals(query, "label:label1 +label:label2");
  
  Logger.log("Fail to build query ending with exact");
  assertThrows("Query is in an intermediate state", function() {
    newQuery().label("label1").exact().build();
  });
}

function testFrom() {
  Logger.log("--- testFrom ---");
  var query;
  
  query = newQuery().from("john@foo.com").build();
  Logger.log("query=%s", query);
  assertEquals(query, "from:john@foo.com");
  
  Logger.log("Fail to build query with from: null");
  assertThrows("Sender must be a string", function() {
    newQuery().from(null);
  });
  
  Logger.log("Fail to build query with from: number");
  assertThrows("Sender must be a string", function() {
    newQuery().from(7);
  });
  
  Logger.log("Fail to build query with from: boolean");
  assertThrows("Sender must be a string", function() {
    newQuery().from(true);
  });
  
  Logger.log("Fail to build query with from: undefined");
  assertThrows("Sender must be a string", function() {
    newQuery().from();
  });
}

function testTo() {
  Logger.log("--- testTo ---");
  var query;
  
  query = newQuery().to("john@foo.com").build();
  Logger.log("query=%s", query);
  assertEquals(query, "to:john@foo.com");
  
  Logger.log("Fail to build query with to: null");
  assertThrows("Recipient must be a string", function() {
    newQuery().to(null);
  });
  
  Logger.log("Fail to build query with to: number");
  assertThrows("Recipient must be a string", function() {
    newQuery().to(3.14);
  });
  
  Logger.log("Fail to build query with to: boolean");
  assertThrows("Recipient must be a string", function() {
    newQuery().to(false);
  });
  
  Logger.log("Fail to build query with to: undefined");
  assertThrows("Recipient must be a string", function() {
    newQuery().to();
  });
}

function testCc() {
  Logger.log("--- testCc ---");
  var query;
  
  query = newQuery().cc("john@foo.com").build();
  Logger.log("query=%s", query);
  assertEquals(query, "cc:john@foo.com");
  
  Logger.log("Fail to build query with cc: null");
  assertThrows("Recipient must be a string", function() {
    newQuery().cc(null);
  });
  
  Logger.log("Fail to build query with cc: number");
  assertThrows("Recipient must be a string", function() {
    newQuery().cc(6.18);
  });
  
  Logger.log("Fail to build query with cc: boolean");
  assertThrows("Recipient must be a string", function() {
    newQuery().cc(true);
  });
  
  Logger.log("Fail to build query with cc: undefined");
  assertThrows("Recipient must be a string", function() {
    newQuery().cc();
  });
}

function testBcc() {
  Logger.log("--- testBcc ---");
  var query;
  
  query = newQuery().bcc("john@foo.com").build();
  Logger.log("query=%s", query);
  assertEquals(query, "bcc:john@foo.com");
  
  Logger.log("Fail to build query with bcc: null");
  assertThrows("Recipient must be a string", function() {
    newQuery().bcc(null);
  });
  
  Logger.log("Fail to build query with bcc: number");
  assertThrows("Recipient must be a string", function() {
    newQuery().bcc(10);
  });
  
  Logger.log("Fail to build query with bcc: boolean");
  assertThrows("Recipient must be a string", function() {
    newQuery().bcc(false);
  });
  
  Logger.log("Fail to build query with bcc: undefined");
  assertThrows("Recipient must be a string", function() {
    newQuery().bcc();
  });
}

function testHasAttachment() {
  Logger.log("--- testHasAttachment ---");
  var query;
  
  query = newQuery().hasAttachment().build();
  Logger.log("query=%s", query);
  assertEquals(query, "has:attachment");
}

function testFilename() {
  Logger.log("--- testFilename ---");
  var query;
  
  query = newQuery().fileName("file.ext").build();
  Logger.log("query=%s", query);
  assertEquals(query, "filename:file.ext");
  
  Logger.log("Fail to set filename: number");
  assertThrows("Filename must be a non-empty string", function() {
    newQuery().fileName(1);
  });
  
  Logger.log("Fail to set filename: boolean");
  assertThrows("Filename must be a non-empty string", function() {
    newQuery().fileName(true);
  });
  
  Logger.log("Fail to set filename: null");
  assertThrows("Filename must be a non-empty string", function() {
    newQuery().fileName(null);
  });
  
  Logger.log("Fail to set filename: undefined");
  assertThrows("Filename must be a non-empty string", function() {
    newQuery().fileName();
  });
}

function testLarger() {
  Logger.log("--- testLarger ---");
  var query;
  
  query = newQuery().larger(2,SizeType.B).build();
  Logger.log("query=%s", query);
  assertEquals(query, "larger:2");
  
  query = newQuery().larger(2).build();
  Logger.log("query=%s", query);
  assertEquals(query, "larger:2");
  
  query = newQuery().larger(2,'B').build();
  Logger.log("query=%s", query);
  assertEquals(query, "larger:2");
  
  query = newQuery().larger(2,SizeType.K).build();
  Logger.log("query=%s", query);
  assertEquals(query, "larger:2000");
  
  query = newQuery().larger(2,'K').build();
  Logger.log("query=%s", query);
  assertEquals(query, "larger:2000");
  
  query = newQuery().larger(2,SizeType.KB).build();
  Logger.log("query=%s", query);
  assertEquals(query, "larger:2048");
  
  query = newQuery().larger(2,'KB').build();
  Logger.log("query=%s", query);
  assertEquals(query, "larger:2048");
  
  query = newQuery().larger(2,SizeType.M).build();
  Logger.log("query=%s", query);
  assertEquals(query, "larger:2000000");
  
  query = newQuery().larger(2,'M').build();
  Logger.log("query=%s", query);
  assertEquals(query, "larger:2000000");
  
  query = newQuery().larger(2,SizeType.MB).build();
  Logger.log("query=%s", query);
  assertEquals(query, "larger:" + 2*1024*1024);
  
  query = newQuery().larger(2,'MB').build();
  Logger.log("query=%s", query);
  assertEquals(query, "larger:" + 2*1024*1024);
  
  query = newQuery().larger(2,SizeType.G).build();
  Logger.log("query=%s", query);
  assertEquals(query, "larger:2000000000");
  
  query = newQuery().larger(2,'G').build();
  Logger.log("query=%s", query);
  assertEquals(query, "larger:2000000000");
  
  query = newQuery().larger(2,SizeType.GB).build();
  Logger.log("query=%s", query);
  assertEquals(query, "larger:" + 2*1024*1024*1024);
  
  query = newQuery().larger(2,'GB').build();
  Logger.log("query=%s", query);
  assertEquals(query, "larger:" + 2*1024*1024*1024);
  
  Logger.log("Fail to set larger: size=string");
  assertThrows("Size must be a non negative integer number", function() {
    newQuery().larger('1',SizeType.B);
  });
  
  Logger.log("Fail to set larger: size=float");
  assertThrows("Size must be a non negative integer number", function() {
    newQuery().larger(3.14,SizeType.B);
  });
  
  Logger.log("Fail to set larger: size=negative");
  assertThrows("Size must be a non negative integer number", function() {
    newQuery().larger(-1,SizeType.B);
  });
  
  Logger.log("Fail to set larger: size=null");
  assertThrows("Size must be a non negative integer number", function() {
    newQuery().larger(null,SizeType.B);
  });
  
  Logger.log("Fail to set larger: size=undefined");
  assertThrows("Size must be a non negative integer number", function() {
    newQuery().larger(undefined,SizeType.B);
  });
  
  Logger.log("Fail to set larger: size=boolean");
  assertThrows("Size must be a non negative integer number", function() {
    newQuery().larger(true,SizeType.B);
  });
  
  Logger.log("Fail to set larger: type=string");
  assertThrows("Type must be a valid SizeType value", function() {
    newQuery().larger(1,'blabla');
  });
  
  Logger.log("Fail to set larger: type=number");
  assertThrows("Type must be a valid SizeType value", function() {
    newQuery().larger(1,7);
  });
  
  Logger.log("Fail to set larger: type=boolean");
  assertThrows("Type must be a valid SizeType value", function() {
    newQuery().larger(1,false);
  });
  
  Logger.log("Fail to set larger: type=null");
  assertThrows("Type must be a valid SizeType value", function() {
    newQuery().larger(1,null);
  });
}

function testSmaller() {
  Logger.log("--- testSmaller ---");
  var query;
  
  query = newQuery().smaller(2,SizeType.B).build();
  Logger.log("query=%s", query);
  assertEquals(query, "smaller:2");
  
  query = newQuery().smaller(2).build();
  Logger.log("query=%s", query);
  assertEquals(query, "smaller:2");
  
  query = newQuery().smaller(2,'B').build();
  Logger.log("query=%s", query);
  assertEquals(query, "smaller:2");
  
  query = newQuery().smaller(2,SizeType.K).build();
  Logger.log("query=%s", query);
  assertEquals(query, "smaller:2000");
  
  query = newQuery().smaller(2,'K').build();
  Logger.log("query=%s", query);
  assertEquals(query, "smaller:2000");
  
  query = newQuery().smaller(2,SizeType.KB).build();
  Logger.log("query=%s", query);
  assertEquals(query, "smaller:2048");
  
  query = newQuery().smaller(2,'KB').build();
  Logger.log("query=%s", query);
  assertEquals(query, "smaller:2048");
  
  query = newQuery().smaller(2,SizeType.M).build();
  Logger.log("query=%s", query);
  assertEquals(query, "smaller:2000000");
  
  query = newQuery().smaller(2,'M').build();
  Logger.log("query=%s", query);
  assertEquals(query, "smaller:2000000");
  
  query = newQuery().smaller(2,SizeType.MB).build();
  Logger.log("query=%s", query);
  assertEquals(query, "smaller:" + 2*1024*1024);
  
  query = newQuery().smaller(2,'MB').build();
  Logger.log("query=%s", query);
  assertEquals(query, "smaller:" + 2*1024*1024);
  
  query = newQuery().smaller(2,SizeType.G).build();
  Logger.log("query=%s", query);
  assertEquals(query, "smaller:2000000000");
  
  query = newQuery().smaller(2,'G').build();
  Logger.log("query=%s", query);
  assertEquals(query, "smaller:2000000000");
  
  query = newQuery().smaller(2,SizeType.GB).build();
  Logger.log("query=%s", query);
  assertEquals(query, "smaller:" + 2*1024*1024*1024);
  
  query = newQuery().smaller(2,'GB').build();
  Logger.log("query=%s", query);
  assertEquals(query, "smaller:" + 2*1024*1024*1024);
  
  Logger.log("Fail to set smaller: size=string");
  assertThrows("Size must be a non negative integer number", function() {
    newQuery().smaller('1',SizeType.B);
  });
  
  Logger.log("Fail to set smaller: size=float");
  assertThrows("Size must be a non negative integer number", function() {
    newQuery().smaller(3.14,SizeType.B);
  });
  
  Logger.log("Fail to set smaller: size=negative");
  assertThrows("Size must be a non negative integer number", function() {
    newQuery().smaller(-1,SizeType.B);
  });
  
  Logger.log("Fail to set smaller: size=null");
  assertThrows("Size must be a non negative integer number", function() {
    newQuery().smaller(null,SizeType.B);
  });
  
  Logger.log("Fail to set smaller: size=undefined");
  assertThrows("Size must be a non negative integer number", function() {
    newQuery().smaller(undefined,SizeType.B);
  });
  
  Logger.log("Fail to set smaller: size=boolean");
  assertThrows("Size must be a non negative integer number", function() {
    newQuery().smaller(true,SizeType.B);
  });
  
  Logger.log("Fail to set smaller: type=string");
  assertThrows("Type must be a valid SizeType value", function() {
    newQuery().smaller(1,'blabla');
  });
  
  Logger.log("Fail to set smaller: type=number");
  assertThrows("Type must be a valid SizeType value", function() {
    newQuery().smaller(1,7);
  });
  
  Logger.log("Fail to set smaller: type=boolean");
  assertThrows("Type must be a valid SizeType value", function() {
    newQuery().smaller(1,false);
  });
  
  Logger.log("Fail to set smaller: type=null");
  assertThrows("Type must be a valid SizeType value", function() {
    newQuery().smaller(1,null);
  });
}

function testIn() {
  Logger.log("--- testIn ---");
  var query;
  
  query = newQuery().inInbox().build();
  Logger.log("query=%s", query);
  assertEquals(query, "in:inbox");
  
  query = newQuery().inTrash().build();
  Logger.log("query=%s", query);
  assertEquals(query, "in:trash");
  
  query = newQuery().inSpam().build();
  Logger.log("query=%s", query);
  assertEquals(query, "in:spam");
  
  query = newQuery().inAnywhere().build();
  Logger.log("query=%s", query);
  assertEquals(query, "in:anywhere");
}

function testIs() {
  Logger.log("--- testIs ---");
  var query;
  
  query = newQuery().isStarred().build();
  Logger.log("query=%s", query);
  assertEquals(query, "is:starred");
  
  query = newQuery().isImportant().build();
  Logger.log("query=%s", query);
  assertEquals(query, "is:important");
  
  query = newQuery().isUnread().build();
  Logger.log("query=%s", query);
  assertEquals(query, "is:unread");
  
  query = newQuery().isRead().build();
  Logger.log("query=%s", query);
  assertEquals(query, "is:read");
  
  query = newQuery().isChat().build();
  Logger.log("query=%s", query);
  assertEquals(query, "is:chat");
}

function testSubQuery() {
  Logger.log("--- testSubQuery ---");
  var query;
  
  query = newQuery().words("bla").subQuery("foo").build();
  Logger.log("query=%s", query);
  assertEquals(query, "bla (foo)");
  
  query = newQuery().words("bla").subQuery("foo").words("bar").build();
  Logger.log("query=%s", query);
  assertEquals(query, "bla (foo) bar");
  
  query = newQuery().subQuery("foo").words("bar").build();
  Logger.log("query=%s", query);
  assertEquals(query, "(foo) bar");
  
  query = newQuery().words("bla").subQuery(newQuery().label("a").or().label("b")).words("bar").build();
  Logger.log("query=%s", query);
  assertEquals(query, "bla (label:a OR label:b) bar");
}

function testComplexQuery() {
  Logger.log("--- testComplexQuery ---");
  var query = newQuery()
                 .words('bla foo')
                 .exclude().subject('bar')
                 .exact().subQuery(newQuery().label('a').or().inInbox())
                 .isStarred()
                 .olderThan(7,DateType.DAY)
                 .build();
  Logger.log("query=%s", query);
  assertEquals(query, "bla foo -subject:bar +(label:a OR in:inbox) is:starred older_than:7d");
}

function testSearch() {
  Logger.log("--- testSearch ---");
  var origGmailApp = GmailApp;
  try {
    Logger.log("Search empty query with start and max arguments");
    var start = 7, max = 10;
    GmailApp = {
      search : function() {
        if (arguments.length !== 3 || arguments[0] !== '' || arguments[1] !== start || arguments[2] !== max) {
          throw new Error("Unexpected arguments passed to search: arguments=" + argumentsToString(arguments));
        }
      }
    };
    newQuery().search(start, max);
    
    Logger.log("Search query=words with start and max arguments");
    var start = 7, max = 10;
    GmailApp = {
      search : function() {
        if (arguments.length !== 3 || arguments[0] !== 'words' || arguments[1] !== start || arguments[2] !== max) {
          throw new Error("Unexpected arguments passed to search: arguments=" + argumentsToString(arguments));
        }
      }
    };
    newQuery().words('words').search(start, max);
    
    Logger.log("Search empty query with no arguments");
    GmailApp = {
      search : function() {
        if (arguments.length !== 1 || arguments[0] !== '') {
          throw new Error("Unexpected arguments passed to search: arguments=" + argumentsToString(arguments));
        }
      }
    };
    newQuery().search();
    
    Logger.log("Search query=words with no arguments");
    GmailApp = {
      search : function() {
        if (arguments.length !== 1 || arguments[0] !== 'words') {
          throw new Error("Unexpected arguments passed to search: arguments=" + argumentsToString(arguments));
        }
      }
    };
    newQuery().words('words').search();
  } finally {
    GmailApp = origGmailApp;
  }
}

//###################################################################################################

function assertEquals(actual, expected, message) {
  message = message || Utilities.formatString("Value is not as expected: actual=%s, expected=%s", actual, expected);
  if (actual !== expected) {
    throw new Error(message);
  }
}

function assertThrows(expectedErrorMessage, func) {
  try {
    func();
  } catch (err) {
    if (err.message !== expectedErrorMessage) {
      throw new Error(Utilities.formatString("Error message is not as expected. actual=%s, expected=%s", err.message, expectedErrorMessage));
    }
    return;
  }
  throw new Error("An error was expected");
}

function argumentsToString(args) {
  if (""+args !== '[object Arguments]') {
    return Utilities.formatString("%s", args);
  }
  var s = "[";
  for (var i = 0; i < args.length; i++) {
    if (i > 0) s += ", ";
    s += Utilities.formatString("%s", args[i]);
  }
  s += "]";
  return s;
}