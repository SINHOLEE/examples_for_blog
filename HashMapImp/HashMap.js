const { LinkedList } = require("./LinkedList.js");

class HashMap {
  #size = 100;
  #bucket;

  constructor(size) {
    if (size) {
      this.#size = size;
    }
    this.#bucket = Array(this.#size).fill(null);
  }

  values() {
    return this.#flatten().map((obj) => obj.value);
  }

  forEach(callback) {
    this.entries().forEach(callback);
  }

  entries() {
    return this.#flatten().map((obj) => [obj.key, obj.value]);
  }

  keys() {
    return this.#flatten().map((obj) => obj.key);
  }

  set(key, value) {
    const index = this.#getIdxByKey(key);

    if (!this.#bucket[index]) {
      this.#bucket[index] = new LinkedList();
    }
    const linkedList = this.#bucket[index];
    linkedList.append(key, value);
  }

  size() {
    return this.#bucket
      .filter((item) => !!item)
      .reduce((total, linkedList) => total + linkedList.size(), 0);
  }

  get(key) {
    const linkedList = this.#getLinkedListByKey(key);
    if (!linkedList) return null;
    const node = linkedList.search(key);
    if (!node) return null;
    return node.getValue();
  }

  has(key) {
    return !!this.get(key);
  }

  delete(key) {
    const linkedList = this.#getLinkedListByKey(key);
    linkedList.delete(key);
  }

  #flatten() {
    return this.#bucket
      .filter((item) => item)
      .reduce((arr, linkedList) => arr.concat(linkedList.getAll()), []);
  }

  // return linkedList
  #getLinkedListByKey(key) {
    const idx = this.#getIdxByKey(key);
    const node = this.#bucket[idx];
    return node;
  }

  #getIdxByKey(key) {
    return this.#hash(key) % this.#size;
  }

  /**
   * key는 string으로만 받도록 구현
   * */
  #hash(key) {
    if (!(typeof key === "string")) throw new Error("key should be a string");
    let code = 0;
    for (let i = 0; i < key.length; i++) {
      code += key.charCodeAt(i);
    }
    return code;
  }
}

module.exports = {
  HashMap,
};
