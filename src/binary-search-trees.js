import Node from './binary-search-trees-node';

const Tree = (array) => {
  function buildTree() {
    let arr = [];
    for (let i = 0; i < array.length; i += 1) {
      if (!arr.includes(array[i])) {
        arr.push(array[i]);
      }
    }

    function merge(left, right) {
      const result = [];
      let leftIndex = 0;
      let rightIndex = 0;

      while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
          result.push(left[leftIndex]);
          leftIndex += 1;
        } else {
          result.push(right[rightIndex]);
          rightIndex += 1;
        }
      }

      while (leftIndex < left.length) {
        result.push(left[leftIndex]);
        leftIndex += 1;
      }

      while (rightIndex < right.length) {
        result.push(right[rightIndex]);
        rightIndex += 1;
      }

      return result;
    }

    function mergeSort(arrayToSort) {
      if (arrayToSort.length <= 1) {
        return arrayToSort;
      }

      const middle = Math.floor(arrayToSort.length / 2);

      const leftHalf = arrayToSort.slice(0, middle);
      const rightHalf = arrayToSort.slice(middle);

      const sortedLeft = mergeSort(leftHalf);
      const sortedRight = mergeSort(rightHalf);

      return merge(sortedLeft, sortedRight);
    }

    arr = mergeSort(arr);

    function balancedTree(arrayToTree, start = 0, end = arrayToTree.length - 1) {
      if (start > end) {
        return null;
      }
      const mid = Math.floor((start + end) / 2);

      const root = new Node(arrayToTree[mid]);

      root.left = (balancedTree(arrayToTree, start, mid - 1));
      root.right = (balancedTree(arrayToTree, mid + 1, end));

      return root;
    }
    return balancedTree(arr);
  }

  const root = buildTree();

  const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  };

  console.log('-----------------------------');
  prettyPrint(root);
};

const arrayTest = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
Tree(arrayTest);
