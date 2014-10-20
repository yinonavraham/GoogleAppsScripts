function DateType_(letter) {
  
  var letter_ = letter;
  
  this.getLetter = function() {
    return letter_;
  }
  
}

/**
 * Enumeration of time period types
 */
var DateType = Object.freeze({
  /** Day */
  DAY : new DateType_('d'),
  /** Month */
  MONTH : new DateType_('m'),
  /** Year */
  YEAR : new DateType_('y'),
  /** 
   * Get all the values in the "enum" 
   * @return {DateType[]}
   */
  values : function() {
    var props = Object.getOwnPropertyNames(DateType);
    var values = [];
    for (var i = 0; i < props.length; i++) {
      if (props[i] !== 'values' && props[i] !== 'getByLetter') {
        values.push(DateType[props[i]]);
      }
    }
    return values;
  },
  /** 
   * Get a DataType by its letter
   * @param {string} letter
   * @return {DateType} The matching DateType object, or null if there is no match
   */
  getByLetter : function(letter) { 
    var vals = DateType.values();
    for (var i = 0; i < vals.length; i++) {
      if (vals[i].getLetter() === letter) {
        return vals[i];
      }
    }
    return null;
  }
});