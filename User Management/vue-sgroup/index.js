class Node {
  constructor(val) {
    this.val = val
    this.next = null
  }
}

class LinkedList {
  constructor() {
    this.head = null
    this.size = 0
  }
  //push method
  add(val) {
    let node = new Node(val)
    let current
    if (this.head == null) {
      this.head = node
    } else {
      current = this.head
      while (current.next) {
        current = current.next
      }
      current.next = node
    }
    this.size++
  }
  //pop method
  remove(val) {
    let current = this.head
    let prev = null
    while (current != null) {
      if (current.val === val) {
        if (prev == null) {
          this.head = current.next
        } else {
          prev.next = current.next
        }
        this.size--
        return current.val
      }
      prev = current
      current = current.next
    }
    return -1
  }
  //inset at index
  insertAt(val, index) {
    let current = this.head
    let node = new Node(val)
    let prev = null
    let i = 0
    if (index > 0 && index > this.size) {
      return false
    }
    if (index === 0) {
      node.next = current
      this.head = node
    } else {
      while (i < index) {
        i++
        prev = current
        current = current.next
      }
      node.next = current
      prev.next = node
    }
  }
}

const linkedList = new LinkedList()
linkedList.add(1)
linkedList.add(2)

console.log(linkedList)
