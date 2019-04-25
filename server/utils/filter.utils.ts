/**
 * Filter Utils
 * Supported methods:
 * - filterByType(data: Array<any>, property: string, value: string)
 * - filterById(data: Array<any>, properties)
 * - filterFromTo(data: Array<any>, config: {key: '', from: '', to: ''}, params)
 */

import * as moment from 'moment';

export class FilterUtils {
  /**
   * Filter data by type
   * @param {Array<any>} data array with object to filter
   * @param {string} property property to check for filter
   * @param {string} value value to check for filter
   */
  static filterByType(data, property, value) {
    return data.filter(elem => {
      return elem[property] === value;
    });
  }

  static filterFromTo(data, config, params) {
    config.forEach(item => {
      if (params[item.to] && params[item.from]) {
        data = data.filter(elem => {
          if (item.filterType != null) {
            const dateTimeToCheck: any = moment(elem[item.key], item.filterType);
            return dateTimeToCheck.isBetween(
              moment(params[item.from], item.filterType),
              moment(params[item.to], item.filterType),
              null,
              []
            );
          } else if (item.key.split('.').length > 1) {
          /* if(item.isDate) {
            let dateToCheck = moment(elem[item.key], item.filterType).format(item.filterType);
            return (moment(dateToCheck).isBetween(params[item.from], params[item.to], null, []));
          } else if(item.isTime) { //TODO REFACTOR
            let timeToCheck = moment(elem[item.key], item.filterType);
            return (timeToCheck.isBetween(moment(params[item.from], item.filterType), moment(params[item.to], item.filterType), null, []));
          }  */
            return (
              this.fetchFromObject(elem, item.key) < Number(params[item.to]) &&
              this.fetchFromObject(elem, item.key) > Number(params[item.from])
            );
          } else {
            return (
              elem[item.key] < params[item.to] &&
              elem[item.key] > params[item.from]
            );
          }
        });
      }
    });
    return data;
  }

  static getPropertiesToFilter(filterKeys, params) {
    const properties = {};
    // tslint:disable-next-line:cyclomatic-complexity
    filterKeys.forEach(elem => {
      if (elem.default) {
        // TODO: If property is complex, set default value
        properties[elem.key] = params[elem.key]
          ? elem.param
            ? params[elem.param]
            : params[elem.key]
          : elem.default;
      } else {
        if (params[elem.key]) {
          properties[elem.key] = params[elem.key];
        } else if (elem.param && params[elem.param]) {
          properties[elem.key] = params[elem.param];
        } else if (
          elem.key.split('.').length > 1 &&
          elem.param &&
          params[elem.param]
        ) {
          properties[elem.key] = params[elem.param];
        }
        if (properties[elem.key] && properties[elem.key].indexOf(',') >= 0) {
          properties[elem.key] = properties[elem.key].split(',');
        }
      }
    });
    return properties;
  }

  /**
   * Filter data by properties
   * @param {Array<any>} data array with object to filter
   * @param {any} properties key value pair to filter
   * @param {any} filterKeys keys configuration
   */
  static filterById(data, properties, filterKeys) {
    if (!properties || Object.keys(properties).length === 0) {
      return data;
    }
    // tslint:disable-next-line:cyclomatic-complexity
    return data.filter(elem => {
      // tslint:disable-next-line:forin
      for (const key in properties) {
        if (typeof elem[key] === 'number' || typeof elem[key] === 'boolean') {
          elem[key] = '' + elem[key];
        }
        const keyConfig = filterKeys
          ? filterKeys.find(obj => obj.key === key)
          : undefined;
        if (keyConfig) {
          let complexData = this.fetchFromObject(elem, keyConfig.key);
          if (keyConfig.multi && keyConfig.multi.length > 0) {
            let isData = false;
            // tslint:disable-next-line:forin
            for (const complexKey in complexData) {
              if (
                typeof complexData[complexKey] === 'number' ||
                typeof complexData[complexKey] === 'boolean'
              ){
                complexData[complexKey] = '' + complexData[complexKey];
              }
              if (
                complexData[complexKey] !== undefined &&
                (complexData[complexKey].indexOf(properties[keyConfig.key]) >=
                  0 ||
                  properties[keyConfig.key].indexOf(complexData[complexKey]))
              ) {
                isData = true;
              }
            }
            if (!isData) {
              return false;
            }
          } else if (keyConfig.complex) {
            if (
              typeof complexData === 'number' ||
              typeof complexData === 'boolean'
            ){
              complexData = '' + complexData;
            }
            if (
              (!Array.isArray(properties[keyConfig.key]) &&
                (complexData === undefined ||
                  complexData.indexOf(properties[keyConfig.key]) < 0)) ||
              (Array.isArray(properties[keyConfig.key]) &&
                properties[keyConfig.key].indexOf(complexData) < 0)
            ) {
              return false;
            }
          } else if (keyConfig.match) {
            if (
              (!Array.isArray(properties[key]) &&
                (elem[key] === undefined || elem[key] !== properties[key])) ||
              (Array.isArray(properties[key]) &&
                properties[key].indexOf(elem[key]) < 0)
            ) {
              return false;
            }
          } else if (
            (!Array.isArray(properties[key]) &&
              (elem[key] === undefined ||
                elem[key].indexOf(properties[key]) < 0)) ||
            (Array.isArray(properties[key]) &&
              properties[key].indexOf(elem[key]) < 0)
          ){
            return false;
          }
        } else if (
          (!Array.isArray(properties[key]) &&
            (elem[key] === undefined ||
              elem[key].indexOf(properties[key]) < 0)) ||
          (Array.isArray(properties[key]) &&
            properties[key].indexOf(elem[key]) < 0)
        ){
          return false;
        }
      }
      return true;
    });
  }

  /**
   * Set complex keys to object
   * @param {any} obj objet to set property
   * @param {string} prop property to set
   */
  static fetchFromObject(obj, prop) {
    // property not found
    if (typeof obj === 'undefined'){
      return false;
    }

    // index of next property split
    const _index = prop.indexOf('.');

    // property split found; recursive call
    if (_index > -1) {
      // get object at property (before split), pass on remainder
      return this.fetchFromObject(
        obj[prop.substring(0, _index)],
        prop.substr(_index + 1)
      );
    }

    // no split; get property
    return obj[prop];
  }
}
