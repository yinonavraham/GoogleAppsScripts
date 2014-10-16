/**
 * Wrap an existing cache as an enhanced cache
 * @param {Cache} cache the cache to wrap
 * @return {EnhancedCache} the enhanced cache
 */
function wrap(cache) {
  return new EnhancedCache(cache);
}
