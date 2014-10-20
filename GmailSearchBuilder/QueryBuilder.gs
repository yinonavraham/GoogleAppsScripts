/**
 * @constructor
 */
var QueryBuilder = function() {
  
  //Not implemented: size:, older:, newer:, list:, has:<particular star>, deliverto:, circle:, has:circle, rfc822msgid:
  
  var query_ = "";
  var intermediateState_ = false;
  
  /**
   * Build the query
   * @return {string} the query string, to be used in GmailApp.search(query)
   */
  this.build = function() {
    validateNotIntermediateState_();
    return query_.trim();
  }
  
  /**
   * Search according to the query (see GmailApp.search for additional information)
   * @param {number} start (optional)
   * @param {number} max (optional)
   * @return {GmailThread[]} The matching threads
   */
  this.search = function(start, max) {
    var query = this.build();
    if (start !== undefined && max !== undefined) {
      return GmailApp.search(query, start, max);
    } else {
      return GmailApp.search(query);
    }
  }
  
  /**
   * Add words
   * @param {string} words
   * @return {QueryBuilder}
   */
  this.words = function(words) {
    if (typeof words !== 'string') {
      throw new Error("Words must be a string");
    }
    query_ += words + " ";
    intermediateState_ = false;
    return this;
  }
  
  /**
   * Add from sender
   * @param {string} sender
   * @return {QueryBuilder}
   */
  this.from = function(sender) {
    validateFrom_(sender);
    query_ += "from:" + sender + " ";
    intermediateState_ = false;
    return this;
  }
  
  /**
   * Add to recipient
   * @param {string} recipient
   * @return {QueryBuilder}
   */
  this.to = function(recipient) {
    validateTo_(recipient);
    query_ += "to:" + recipient + " ";
    intermediateState_ = false;
    return this;
  }
  
  /**
   * Add cc recipient
   * @param {string} recipient
   * @return {QueryBuilder}
   */
  this.cc = function(recipient) {
    validateTo_(recipient);
    query_ += "cc:" + recipient + " ";
    intermediateState_ = false;
    return this;
  }
  
  /**
   * Add bcc recipient
   * @param {string} recipient
   * @return {QueryBuilder}
   */
  this.bcc = function(recipient) {
    validateTo_(recipient);
    query_ += "bcc:" + recipient + " ";
    intermediateState_ = false;
    return this;
  }
  
  /**
   * Add subject words
   * @param {string} words
   * @return {QueryBuilder}
   */
  this.subject = function(words) {
    validateSubject_(words);
    query_ += "subject:" + words + " ";
    intermediateState_ = false;
    return this;
  }
  
  /**
   * Add label
   * @param {string} labelName
   * @return {QueryBuilder}
   */
  this.label = function(labelName) {
    validateLabel_(labelName);
    var normalizedLabelName = labelName.replace(/ /g,'-');
    query_ += "label:" + normalizedLabelName + " ";
    intermediateState_ = false;
    return this;
  }
  
  /**
   * Add has user labels
   * @return {QueryBuilder}
   */
  this.hasUserLabels = function() {
    query_ += "has:userlabels ";
    intermediateState_ = false;
    return this;
  } 
  
  /**
   * Add has no user labels
   * @return {QueryBuilder}
   */
  this.hasNoUserLabels = function() {
    query_ += "has:nouserlabels ";
    intermediateState_ = false;
    return this;
  } 
  
  /**
   * Add category
   * @param {string} categoryName
   * @return {QueryBuilder}
   */
  this.category = function(categoryName) {
    if (typeof categoryName !== 'string' || categoryName.length === 0) {
      throw new Error("Category must be a not empty string");
    }
    var normalizedCategoryName = categoryName.replace(/ /g,'-');
    query_ += "category:" + normalizedCategoryName + " ";
    intermediateState_ = false;
    return this;
  }
  
  /**
   * Add older than a period of time
   * @param {number} period the period of time (non-negative integer)
   * @param {DateType} type the type of the time period
   * @return {QueryBuilder}
   */
  this.olderThan = function(period, type) {
    validatePeriod_(period);
    if (typeof type === 'string') {
      type = DateType.getByLetter(type);
    }
    validateDateType_(type);
    query_ += "older_than:" + period + type.getLetter() + " ";
    intermediateState_ = false;
    return this;
  }
  
  /**
   * Add newer than a period of time
   * @param {number} period the period of time (non-negative integer)
   * @param {DateType} type the type of the time period
   * @return {QueryBuilder}
   */
  this.newerThan = function(period, type) {
    validatePeriod_(period);
    if (typeof type === 'string') {
      type = DateType.getByLetter(type);
    }
    validateDateType_(type);
    query_ += "newer_than:" + period + type.getLetter() + " ";
    intermediateState_ = false;
    return this;
  } 
  
  /**
   * Add after certain date
   * @param {Date} date
   * @return {QueryBuilder}
   */
  this.after = function(date) {
    query_ += "after:" + formatDate_(date) + " ";
    intermediateState_ = false;
    return this;
  }
  
  /**
   * Add before certain date
   * @param {Date} date
   * @return {QueryBuilder}
   */
  this.before = function(date) {
    query_ += "before:" + formatDate_(date) + " ";
    intermediateState_ = false;
    return this;
  }
  
  /**
   * Add an exclude
   * @return {QueryBuilder}
   */
  this.exclude = function() {
    query_ += "-";
    intermediateState_ = true;
    return this;
  }
  
  /**
   * Add an exact marker
   * @return {QueryBuilder}
   */
  this.exact = function() {
    query_ += "+";
    intermediateState_ = true;
    return this;
  }
  
  /**
   * Add an OR
   * @return {QueryBuilder}
   */
  this.or = function() {
    validateNotIntermediateState_();
    if (query_.length === 0) throw new Error("OR must follow a term");
    query_ += "OR ";
    intermediateState_ = true;
    return this;
  } 
  
  /**
   * Add has attachament
   * @return {QueryBuilder}
   */
  this.hasAttachment = function() {
    query_ += "has:attachment ";
    intermediateState_ = false;
    return this;
  } 
  
  /**
   * Add has file attached by name
   * @param {string} name
   * @return {QueryBuilder}
   */
  this.fileName = function(name) {
    if (typeof name !== 'string' || name.length === 0) {
      throw new Error("Filename must be a non-empty string");
    }
    query_ += "filename:" + name + " ";
    intermediateState_ = false;
    return this;
  } 
  
  /**
   * Add larger than size
   * @param {number} size
   * @param {SizeType} type (optional)
   * @return {QueryBuilder}
   */
  this.larger = function(size, type) {
    type = type === undefined ? SizeType.B : type;
    if (typeof type === 'string') {
      type = SizeType.getByName(type);
    }
    validateSize_(size);
    validateSizeType_(type);
    query_ += "larger:" + type.toBytes(size) + " ";
    intermediateState_ = false;
    return this;
  } 
  
  /**
   * Add smaller than size
   * @param {number} size
   * @param {SizeType} type (optional)
   * @return {QueryBuilder}
   */
  this.smaller = function(size, type) {
    type = type === undefined ? SizeType.B : type;
    if (typeof type === 'string') {
      type = SizeType.getByName(type);
    }
    validateSize_(size);
    validateSizeType_(type);
    query_ += "smaller:" + type.toBytes(size) + " ";
    intermediateState_ = false;
    return this;
  } 
  
  /**
   * Add a sub-query
   * @param {string|QueryBuilder} query
   * @return {QueryBuilder}
   */
  this.subQuery = function(query) {
    var sQuery;
    if (typeof query === 'string') sQuery = query;
    else if (query instanceof QueryBuilder) sQuery = query.build();
    else throw new Error("Query can be either string or another QueryBuilder");
    query_ += "(" + sQuery + ") ";
    intermediateState_ = false;
    return this;
  } 
  
  /**
   * Add in inbox
   * @return {QueryBuilder}
   */
  this.inInbox = function() {
    query_ += "in:inbox ";
    intermediateState_ = false;
    return this;
  }
  
  /**
   * Add in trash
   * @return {QueryBuilder}
   */
  this.inTrash = function() {
    query_ += "in:trash ";
    intermediateState_ = false;
    return this;
  }
  
  /**
   * Add in spam
   * @return {QueryBuilder}
   */
  this.inSpam = function() {
    query_ += "in:spam ";
    intermediateState_ = false;
    return this;
  }
  
  /**
   * Add in anywhere
   * @return {QueryBuilder}
   */
  this.inAnywhere = function() {
    query_ += "in:anywhere ";
    intermediateState_ = false;
    return this;
  }
  
  /**
   * Add is starred
   * @return {QueryBuilder}
   */
  this.isStarred = function() {
    query_ += "is:starred ";
    intermediateState_ = false;
    return this;
  }
  
  /**
   * Add is important
   * @return {QueryBuilder}
   */
  this.isImportant = function() {
    query_ += "is:important ";
    intermediateState_ = false;
    return this;
  }
  
  /**
   * Add is unread
   * @return {QueryBuilder}
   */
  this.isUnread = function() {
    query_ += "is:unread ";
    intermediateState_ = false;
    return this;
  }
  
  /**
   * Add is read
   * @return {QueryBuilder}
   */
  this.isRead = function() {
    query_ += "is:read ";
    intermediateState_ = false;
    return this;
  }
  
  /**
   * Add is chat
   * @return {QueryBuilder}
   */
  this.isChat = function() {
    query_ += "is:chat ";
    intermediateState_ = false;
    return this;
  }
  
  function validateNotIntermediateState_() {
    if (intermediateState_ !== false) {
      throw new Error("Query is in an intermediate state");
    }
  }
}

function validateFrom_(sender) {
  if (typeof sender !== 'string') {
    throw new Error("Sender must be a string");
  }
}

function validateTo_(recipient) {
  if (typeof recipient !== 'string') {
    throw new Error("Recipient must be a string");
  }
}

function validateSubject_(words) {
  if (typeof words !== 'string') {
    throw new Error("Subject words must be a string");
  }
}

function validateLabel_(labelName) {
  if (typeof labelName !== 'string') {
    throw new Error("Lable name must be a string");
  }
}

function validatePeriod_(period) {
  if (typeof period !== 'number' || !isInteger_(period) || period < 0) {
    throw new Error("Period must be a non negative integer number");
  }
}

function validateDateType_(type) {
  if (!(type instanceof DateType_)) {
    throw new Error("Type must be a valid DateType value");
  }
}

function validateSize_(size) {
  if (typeof size !== 'number' || !isInteger_(size) || size < 0) {
    throw new Error("Size must be a non negative integer number");
  }
}

function validateSizeType_(type) {
  if (!(type instanceof SizeType_)) {
    throw new Error("Type must be a valid SizeType value");
  }
}

function formatDate_(date) {
  if (!(date instanceof Date)) {
    throw new Error("date must be an instance of Date");
  }
  return Utilities.formatDate(date, Session.getScriptTimeZone(), "yyyy/MM/dd");
}

function isInteger_(v) {
  return v === parseInt(v,10);
}