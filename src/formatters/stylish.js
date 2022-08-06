import _ from 'lodash';

const stringify = (data, depth, replacer) => {
  if (!_.isObject(data)) {
    return `${data}`;
  }

  const indentForKey = replacer.repeat(depth + 1);
  const indentForBracket = replacer.repeat(depth);
  const lines = Object.entries(data)
    .map(([key, value]) => `${indentForKey}${key}: ${stringify(value, depth + 1, replacer)}`);

  return ['{', ...lines, `${indentForBracket}}`].join('\n');
};

const prefix = {
  only2: '+',
  only1: '-',
  equal: ' ',
};

const stylish = (diff, replacer = '    ') => {
  const iter = (tree, depth) => tree.map((node) => {
    const indent = replacer.repeat(depth);
    const indentForSign = indent.slice(2);

    const makeLine = (value, mark) => `${indentForSign}${mark} ${node.key}: ${stringify(value, depth, replacer)}`;

    switch (node.status) {
      case 'only2':
        return makeLine(node.value, prefix.only2);
      case 'only1':
        return makeLine(node.value, prefix.only1);
      case 'equal':
        return makeLine(node.value, prefix.equal);
      case 'notEqual':
        return [`${makeLine(node.value1, prefix.only1)}`,
          `${makeLine(node.value2, prefix.only2)}`].join('\n');
      case 'obj':
        return `${indent}${node.key}: ${['{', ...iter(node.value, depth + 1), `${indent}}`].join('\n')}`;
      default:
        throw new Error(`Type: ${node.status} is undefined`);
    }
  });

  const stylishDiff = iter(diff, 1);
  return ['{', ...stylishDiff, '}'].join('\n');
};

export default stylish;
