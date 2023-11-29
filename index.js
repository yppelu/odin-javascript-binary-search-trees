class Node {
  constructor(data = null) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    const preparedArray = array ? this.prepareArray(array) : [];
    this.root = this.buildTree(preparedArray, 0, preparedArray.length - 1);
  }

  prepareArray(array) {
    const preparedArray = array.slice();
    preparedArray.sort((a, b) => a - b);
    for (let i = 1; i < preparedArray.length; i++) {
      if (preparedArray[i] === preparedArray[i - 1]) {
        preparedArray.splice(i, 1);
        i--;
      }
    }
    return preparedArray;
  }

  buildTree(array, start, end) {
    if (start > end) return null;

    const middleIndex = Math.floor((start + end) / 2);
    const node = new Node(array[middleIndex]);
    node.left = this.buildTree(array, start, middleIndex - 1);
    node.right = this.buildTree(array, middleIndex + 1, end);

    return node;
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