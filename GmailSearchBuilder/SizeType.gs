function SizeType_(name, factor) {
  
  var name_ = name;
  var factor_ = factor;
  
  this.getName = function() {
    return name_;
  }
  
  this.toBytes = function(size) {
    return size * factor_;
  }
  
}

/**
 * Enumeration of size types
 */
var SizeType = Object.freeze({
  /** Bytes */
  B : new SizeType_('B', 1),
  /** Kilobytes (1,000) */
  K : new SizeType_('K', 1000),
  /** Kilobytes (2^10) */
  KB : new SizeType_('KB', 1024),
  /** Megabytes (1,000,000) */
  M : new SizeType_('M', 1000000),
  /** Megabytes (2^20) */
  MB : new SizeType_('MB', 1048576),
  /** Gigabytes (1,000,000,000) */
  G : new SizeType_('G', 1000000000),
  /** Gigabytes (2^30) */
  GB : new SizeType_('GB', 1073741824),
  /** 
   * Get all the values in the "enum" 
   * @return {SizeType[]}
   */
  values : function() {
    var props = Object.getOwnPropertyNames(SizeType);
    var values = [];
    for (var i = 0; i < props.length; i++) {
      if (props[i] !== 'values' && props[i] !== 'getByName') {
        values.push(SizeType[props[i]]);
      }
    }
    return values;
  },
  /** 
   * Get a SizeType by its name
   * @param {string} name
   * @return {SizeType} The matching SizeType object, or null if there is no match
   */
  getByName : function(name) { 
    var vals = SizeType.values();
    for (var i = 0; i < vals.length; i++) {
      if (vals[i].getName() === name) {
        return vals[i];
      }
    }
    return null;
  }
});
