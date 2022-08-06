import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  return _.isString(value) ? `'${value}'` : value;
};

const plain = (diff) => {
  const iter = (tree, parent) => tree.flatMap((node) => {
    const path = [...parent, node.key].join('.');

    switch (node.status) {
      case 'only2':
        return `Property '${path}' was added with value: ${stringify(node.value)}`;
      case 'only1':
        return `Property '${path}' was removed`;
      case 'equal':
        return [];
      case 'notEqual':
        return `Property '${path}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
      case 'obj':
        return `${iter(node.value, [path]).join('\n')}`;
      default:
        throw new Error(`Type: ${node.status} is undefined`);
    }
  });

  const plainDiff = iter(diff, []);
  return [...plainDiff].join('\n');
};

export default plain;
