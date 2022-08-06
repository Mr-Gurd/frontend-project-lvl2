// import lain from './plain.js';
import stylish from './stylish.js';
// import json from './json.js';

export default (data, format, replacer) => {
  switch (format) {
    case 'stylish':
      return stylish(data, replacer);
    // case 'plain':
    //   return makePlain(data);
    // case 'json':
    //   return makeJson(data, null, replacer);
    default:
      throw new Error(`Invalid file format type: '.${format}'! Try supported file formats.`);
  }
};
