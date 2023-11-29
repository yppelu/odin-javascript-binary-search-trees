class Node {
  constructor(data = null) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    const preparedArray = this.prepareArray(array);
    this.root = this.buildTree(preparedArray, 0, preparedArray.length - 1);
  }

  prepareArray(array) {
    const preparedArray = array.toSorted((a, b) => a - b);
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
}

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