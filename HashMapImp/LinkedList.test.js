const { LinkedList } = require('./LinkedList');

describe('LinkedList', () => {
    let linkedList;

    beforeEach(() => {
        linkedList = new LinkedList();
    });

    it('should not throw error deleting not having key',()=>{
        linkedList.delete('a')
        expect(linkedList.getAll()).toEqual([])
    })
    it('should append nodes correctly', () => {
        linkedList.append('a', 1);
        linkedList.append('b', 2);
        expect(linkedList.getAll()).toEqual([
            { key: 'a', value: 1 },
            { key: 'b', value: 2 },
        ]);
    });

    it('should search nodes correctly', () => {
        linkedList.append('a', 1);
        linkedList.append('b', 2);
        linkedList.append('c', 3);
        expect(linkedList.search('b').toObj()).toEqual({ key: 'b', value: 2 });
        expect(linkedList.search('d')).toBeNull();
    });

    it('should delete nodes correctly', () => {
        linkedList.append('a', 1);
        linkedList.append('b', 2);
        linkedList.append('c', 3);
        linkedList.delete('b');
        expect(linkedList.getAll()).toEqual([
            { key: 'a', value: 1 },
            { key: 'c', value: 3 },
        ]);
        linkedList.delete('a');
        expect(linkedList.getAll()).toEqual([{ key: 'c', value: 3 }]);
        linkedList.delete('c');
        expect(linkedList.getAll()).toEqual([]);
    });

});
