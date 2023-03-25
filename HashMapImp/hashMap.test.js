const {HashMap} = require("./HashMap.js");


describe('HashMap', () => {
    let hashMap;

    beforeEach(() => {
        hashMap = new HashMap();
    });

    it('should set a value to a key', () => {
        hashMap.set('a', 1);
        expect(hashMap.size()).toBe(1);
        expect(hashMap.get('a')).toBe(1);
    });
    it('should merge to set as same key', () => {
        hashMap.set('a', 1);
        hashMap.set('a', 2);
        expect(hashMap.size()).toBe(1);
        expect(hashMap.get('a')).toBe(2);
    });

    it('should delete a value by key', () => {
        hashMap.set('a', 1);
        hashMap.set('b', 2);
        hashMap.delete('a');
        expect(hashMap.size()).toBe(1);
        expect(hashMap.has('a')).toBe(false);
        expect(hashMap.get('b')).toBe(2);
    });

    it('should return the number of key-value pairs', () => {
        expect(hashMap.size()).toBe(0);
        hashMap.set('a', 1);
        hashMap.set('b', 2);
        expect(hashMap.size()).toBe(2);
    });

    it('should return an array of values', () => {
        hashMap.set('a', 1);
        hashMap.set('b', 2);
        expect(hashMap.values()).toEqual([1, 2]);
    });

    it('should return an array of keys', () => {
        hashMap.set('a', 1);
        hashMap.set('b', 2);
        expect(hashMap.keys()).toEqual(['a', 'b']);
    });

    it('should return the value by key', () => {
        hashMap.set('a', 1);
        expect(hashMap.get('a')).toBe(1);
        expect(hashMap.get('b')).toBeNull();
    });

    it('should return true if a key exists', () => {
        hashMap.set('a', 1);
        expect(hashMap.has('a')).toBe(true);
        expect(hashMap.has('b')).toBe(false);
    });

    it('should call a callback function on each key-value pair', () => {
        hashMap.set('a', 1);
        hashMap.set('b', 2);
        let result = 0;
        hashMap.forEach(([key, value]) => {
            result += value;
        });
        expect(result).toBe(3);
    });
});
