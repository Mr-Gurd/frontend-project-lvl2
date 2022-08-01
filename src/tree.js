import _ from 'lodash';

const tree = (fileContent1, fileContent2) => {
  const fileKeys1 = _.keys(fileContent1);
  const fileKeys2 = _.keys(fileContent2);
  const sortedKeys = _.sortBy(_.union(fileKeys1, fileKeys2));

  return sortedKeys.map((key) => {
    if (!_.has(fileContent1, key)) {
      return { key, value: fileContent2[key], status: 'onlySecond' };
    }
    if (!_.has(fileContent2, key)) {
      return { key, value: fileContent1[key], status: 'onlyFirst' };
    }
    if (!_.isEqual(fileContent1[key], fileContent2[key])) {
      return {
        key, value1: fileContent1[key], value2: fileContent2[key], status: 'notEqual',
      };
    }
    return { key, value: fileContent1[key], status: 'equal' };
  });
};

export default tree;
