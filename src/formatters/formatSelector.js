import plain from './plain.js';
import stylish from './stylish.js';
import json from './json.js';

export default (data, format, replacer) => {
  switch (format) {
    case 'stylish':
      return stylish(data, replacer);
    case 'plain':
      return plain(data);
    case 'json':
      return json(data, null, replacer);
    default:
      throw new Error(`Format: '.${format}' not supported!`);
  }
};
