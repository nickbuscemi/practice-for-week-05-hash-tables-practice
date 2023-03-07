const sha256 = require('js-sha256');

class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {

  constructor(numBuckets = 4) {
    this.count = 0;
    this.capacity = numBuckets;
    this.data = new Array(this.capacity).fill(null);
    
  }

  hash(key) {
    // Your code here
    let hex = sha256(key).slice(0, 8);
    return parseInt(hex, 16);
  }

  hashMod(key) {
    // Your code here
    return this.hash(key) % this.capacity;
  }

  insertNoCollisions(key, value) {
    // Your code here
    let hash = this.hash(key);
    let index = this.hashMod(key);
    let pair = new KeyValuePair(key, value);
    if (this.data[index] === null) {
      this.data[index] = pair;
      this.count++;
    }
    else {
      throw new Error('hash collision or same key/value pair already exists!');
    }

  }

  insertWithHashCollisions(key, value) {
    // Your code here
    let hash = this.hash(key);
    let index = this.hashMod(key);
    let pair = new KeyValuePair(key, value);
    if (this.data[index] === null) {
      this.data[index] = pair;
      this.count++;
    } else {
      let current = this.data[index];
      while (current.next !== null) {
        if (current.key === key) {
          throw new Error('hash collision or same key/value pair already exists!');
        }
        current = current.next;
      }
      current.next = pair;
      this.count++;
    } 
  }

  insert(key, value) {
    return this.insertWithHashCollisions(key, value);
  }

}


module.exports = HashTable;