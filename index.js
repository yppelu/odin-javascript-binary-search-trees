class Node {
  constructor(data = null) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  static buildTree(array, start, end) {
    if (start > end) return null;

    const middleIndex = Math.floor((start + end) / 2);
    const node = new Node(array[middleIndex]);
    node.left = this.buildTree(array, start, middleIndex - 1);
    node.right = this.buildTree(array, middleIndex + 1, end);

    return node;
  }

  constructor(array) {
    const preparedArray = (array)
      ? Array.from(new Set(array)).sort((a, b) => a - b)
      : [];
    this.root = Tree.buildTree(preparedArray, 0, preparedArray.length - 1);
  }

  insert(value) {
    if (!this.root || value === undefined) return null;

    let cursor = this.root;
    while (cursor.data !== value) {
      if (cursor.data > value) {
        if (cursor.left) cursor = cursor.left;
        else cursor.left = new Node(value);
      } else {
        if (cursor.right) cursor = cursor.right;
        else cursor.right = new Node(value);
      }
    }
    return cursor;
  }

  delete(value, root = this.root) {
    if (value === undefined) return null;
    if (!root) return root;

    if (root.data > value) {
      root.left = this.delete(value, root.left);
      return root;
    }
    if (root.data < value) {
      root.right = this.delete(value, root.right);
      return root;
    }

    if (!root.left || !root.right) {
      let tmp = root.left ?? root.right;
      root = null;
      return tmp;
    } else {
      let cursor = root;
      let successor = root.right;
      while (successor.left) {
        cursor = successor;
        successor = successor.left;
      }

      if (cursor !== root) {
        cursor.left = successor.right;
      } else {
        cursor.right = successor.right;
      }

      root.data = successor.data;

      successor = null;
      return root;
    }
  }

  find(value) {
    if (!this.root || value === undefined) return null;

    let cursor = this.root;
    while (cursor && cursor.data !== value) {
      cursor = (cursor.data > value) ? cursor.left : cursor.right;
    }
    return cursor;
  }

  levelOrder(callback) {
    if (!this.root) return [];

    const queue = [this.root];
    const result = [];
    while (queue.length > 0) {
      const current = queue.shift();
      if (callback) callback(current);
      result.push(current.data);

      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right)
    }
    return result;
  }

  inOrder(callback, root = this.root) {
    if (!root) return [];

    const result = [];

    result.push(...this.inOrder(callback, root.left));
    if (callback) callback(root);
    result.push(root.data);
    result.push(...this.inOrder(callback, root.right));

    return result;
  }

  preOrder(callback, root = this.root) {
    if (!root) return [];

    const result = [];
    if (callback) callback(root);
    result.push(root.data);
    result.push(...this.preOrder(callback, root.left));
    result.push(...this.preOrder(callback, root.right));

    return result;
  }

  postOrder(callback, root = this.root) {
    if (!root) return [];

    const result = [];
    result.push(...this.postOrder(callback, root.left));
    result.push(...this.postOrder(callback, root.right));
    if (callback) callback(root);
    result.push(root.data);

    return result;
  }

  height(node) {
    if (!node) return -1;
    return Math.max(1 + this.height(node.left), 1 + this.height(node.right));
  }

  depth(node) {
    if (!node) return -1;

    let cursor = this.root;
    let counter = 0;
    while (cursor !== node) {
      cursor = (cursor.data > node.data) ? cursor.left : cursor.right;
      counter++;
    }
    return counter;
  }

  isBalanced() {
    if (!this.root) return true;

    const result = (function check(node) {
      if (!node) return 0;

      const leftHeight = check(node.left);
      if (leftHeight === -1) return -1;
      const rightHeight = check(node.right);
      if (rightHeight === -1) return -1;
      if (Math.abs(leftHeight - rightHeight) > 1) return -1;

      return Math.max(leftHeight, rightHeight) + 1;
    })(this.root);

    return (result === -1) ? false : true;
  }

  rebalance() {
    const array = this.inOrder();
    return this.root = Tree.buildTree(array, 0, array.length - 1);
  }
}

const tree = new Tree(getArray(5));

console.log(tree.isBalanced());
console.log(tree.levelOrder());
console.log(tree.preOrder());
console.log(tree.postOrder());
console.log(tree.inOrder());

for (let i = 0; i < 3; i++) {
  tree.insert(Math.floor(Math.random() * 100) + 100);
}
console.log(tree.isBalanced());
console.log(tree.rebalance());
console.log(tree.isBalanced());

console.log(tree.levelOrder());
console.log(tree.preOrder());
console.log(tree.postOrder());
console.log(tree.inOrder());

function getArray(length) {
  const array = [];
  for (let i = 0; i < length; i++) {
    array.push(Math.floor(Math.random() * 100));
  }
  return array;
}