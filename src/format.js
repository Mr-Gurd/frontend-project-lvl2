// import _ from 'lodash';

const prefix = {
  onlySecond: '  + ',
  onlyFirst: '  - ',
  equal: '    ',
};

const format = (tree) => {
  const result = tree.map((line) => {
    switch (line.status) {
      case 'onlySecond':
        return `${prefix[line.status]}${line.key}: ${line.value}`;
      case 'onlyFirst':
        return `${prefix[line.status]}${line.key}: ${line.value}`;
      case 'equal':
        return `${prefix[line.status]}${line.key}: ${line.value}`;
      case 'notEqual':
        return `${prefix.onlySecond}${line.key}: ${line.value1}\n${prefix.onlyFirst}${line.key}: ${line.value2}`;
      default:
        return 'error';
    }
  })
    .join('\n');
  return `{\n${result}\n}`;
};

export default format;
