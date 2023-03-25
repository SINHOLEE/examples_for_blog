class Node {
    #key
    #value
    #next

    constructor(key, value) {
        this.#key = key
        this.#value = value

    }

    hasNext() {
        return !!this.#next
    }

    isEqual(node) {
        return node instanceof Node && node.getKey() === this.#key
    }

    next() {
        return this.#next
    }

    setNext(node) {
        this.#next = node
    }

    toObj() {
        return {key: this.getKey(), value: this.getValue()}
    }

    getValue() {
        return this.#value
    }

    hasKey(key) {
        return this.#key === key
    }

    getKey() {
        return this.#key
    }
}

  class LinkedList {
    #root = null

    constructor() {
    }
    size(){
        return this.getAll().length
    }
    getAll() {
        const res = []
        let current = this.#root
        while (current){
            res.push(current.toObj())
            current = current.next()
        }
        return res
    }

    /**
     * key를 기준으로 찾고 없으면 null을 반환
     * */
    search(key) {
        let current = this.#root

        while (current) {
            if (current.hasKey(key)) {
                return current
            }
            current = current.next()
        }
        return null
    }

    delete(key) {
        if (!this.#root) return
        if (this.#root.hasKey(key)) {
            this.#root = this.#root.next()
            return;
        }
        let current = this.#root
        while (current.hasNext()) {
            const nextNode = current.next()
            if (nextNode.hasKey(key)) {
                current.setNext(nextNode.next())
                return;
            }
            current = nextNode
        }
    }

    append(key, value) {

        const newNode = new Node(key, value)

        if (!this.#root) {
            this.#root = newNode
            return
        }
        if(this.#root.isEqual(newNode)){
            this.#root = newNode
            return;
        }

        let current = this.#root
        while (current.hasNext() && !current.isEqual(newNode)) {
            current = current.next()
        }
            current.setNext(newNode)

    }
}

module.exports = {
    LinkedList
}