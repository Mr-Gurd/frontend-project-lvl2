import _ from 'lodash';

const tree = (file1, file2) => {
  const file1Keys = _.keys(file1);
  const file2Keys = _.keys(file2);
  const sortedKeys = _.sortBy(_.union(file1Keys, file2Keys));

  return sortedKeys.map((key) => {
    if (!_.has(file1, key)) {
      return { key, status: 'only2', value: file2[key] };
    }
    if (!_.has(file2, key)) {
      return { key, status: 'only1', value: file1[key] };
    }
    if (_.isObject(file1[key]) && _.isObject(file2[key])) {
      return { key, status: 'obj', value: tree(file1[key], file2[key]) };
    }
    if (!_.isEqual(file1[key], file2[key])) {
      return {
        key, status: 'notEqual', value1: file1[key], value2: file2[key],
      };
    }

    return { key, status: 'equal', value: file1[key] };
  });
};

export default tree;
