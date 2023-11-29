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
}

const tree = new Tree([1, 2, 3, 4]);
prettyPrint(tree.root);

function getArray(length) {
  const array = [];
  for (let i = 0; i < length; i++) {
    array.push(Math.floor(Math.random() * 100));
  }
  return array;
}

function prettyPrint(node, prefix = "", isLeft = true) {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
}