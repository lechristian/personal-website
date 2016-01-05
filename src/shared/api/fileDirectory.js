/* ==========================================================================
 * ./src/shared/api/fileDirectory.js
 *
 * A dumb and simple file directory checker (So...much...hacks...)
 * ========================================================================== */

import _ from 'lodash';

const ROOT_SYMBOL = '/';
const NOT_FILE_DIRECTORY_STRING = 'Not a file or directory';
const NOT_DIRECTORY_STRING = 'Not a directory';
const FILES_REGEX = /(home|photos|message|.*\.md$)/;

function generatePossiblePaths(directoryArray, parentPath) {
  let paths = [];

  _.forEach(directoryArray, (entry) => {
    if (_.isString(entry)) {
      paths.push(`${ parentPath }/${ entry }`);
    } else if (_.isPlainObject(entry)) {
      const key = Object.keys(entry)[0];
      const path = `${ parentPath }/${ key }`;
      paths.push(`${ path }/`);

      const childrenPaths = generatePossiblePaths(entry[key], path);
      paths = _.union(paths, childrenPaths);
    }
  });

  return paths;
}

function resolvePath(path) {
  const pathArr = path.split('/');
  const resolvedArr = [];

  for (let i = 0; i < pathArr.length; i += 1) {
    const p = pathArr[i];
    if (FILES_REGEX.test(p)) {
      if (i < pathArr.length - 1) {
        return null;
      }
      resolvedArr.push(p);
    } else if (p === '..') {
      if (!resolvedArr.pop()) {
        return null;
      }
    } else if (p !== '') {
      resolvedArr.push(p);
    }
  }

  if (resolvedArr.length === 1) {
    return `/${ resolvedArr[0] }`;
  }

  return `/${ resolvedArr.join('/') }`;
}

class FileDirectory {
  constructor(json) {
    this.json = json;
    this.paths = generatePossiblePaths(this.json[ROOT_SYMBOL], '');
  }

  canEnterDirectory(pathString) {
    const resolvedPath = resolvePath(pathString);
    if (!resolvedPath) {
      return {
        enter: false,
        path: NOT_DIRECTORY_STRING
      };
    }

    if (resolvedPath === '/') {
      return {
        enter: true,
        path: resolvedPath
      };
    }

    const possiblePaths = _.filter(this.paths, (p) => {
      if (_.includes(p, resolvedPath)) {
        const tmp = p.replace(resolvedPath, '');
        if (tmp === '/') {
          return true;
        }

        return false;
      }

      return false;
    });

    if (possiblePaths.length === 1) {
      return {
        enter: true,
        path: resolvedPath
      };
    }

    return {
      enter: false,
      path: NOT_DIRECTORY_STRING
    };
  }

  listDirectory(pathString) {
    const resolvedPath = resolvePath(pathString);
    if (!resolvedPath) {
      return {
        error: NOT_FILE_DIRECTORY_STRING
      };
    }

    const listings = _.filter(this.paths, (p) => {
      if (_.includes(p, resolvedPath)) {
        const tmp = p.replace(resolvedPath, resolvedPath === '/' ? '/' : '');
        const tmpSplit = tmp.split('/', 3);

        if (tmp === '/') {
          return false;
        } else if (tmpSplit.length === 3) {
          return tmpSplit[2] === '';
        } else {
          return true;
        }
      }

      return false;
    });

    return listings;
  }

  open(pathString) {
    const resolvedPath = resolvePath(pathString);
    if (!resolvedPath) {
      return {
        error: NOT_FILE_DIRECTORY_STRING
      };
    }

    for (let i = 0; i < this.paths.length; i += 1) {
      const p = this.paths[i];
      if (p === resolvedPath || p === `${ resolvedPath }/`) {
        return {
          error: null,
          path: resolvedPath
        };
      }
    }

    return {
      error: NOT_FILE_DIRECTORY_STRING
    };
  }
}

export default FileDirectory;
