import { FilterUtils } from './filter.utils';
import { PaginationUtils } from './pagination.utils';

/**
 * Common Utils
 * Supported methods:
 * - filterByType(data: Array<any>, property, value)
 * - filterById(data: Array<any>, properties)
 */
export class CommonUtils {
  /**
   * Filter data by properties
   * @param {Array<any>} data array with object to filter
   * @param {any} properties key value pair to filter
   */
  static getPaginatedResponse(response, params, filterKeys) {
    response = PaginationUtils.setOrder(response, params.sort);

    // Check filters by property (code and name)
    const properties = FilterUtils.getPropertiesToFilter(filterKeys, params);

    response = FilterUtils.filterById(response, properties, filterKeys);

    // Set Pagination
    return (response = PaginationUtils.setPagination(response, params));
  }

  static getRequestParams(req) {
    return Object.assign(req.query || {}, req.params || {}, req.body || {});
  }

  static getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  /**
   * @param  {any} responses object holding the responses for the service
   * @param  {string} controller name of the controller
   * @returns string
   */
  constructor(private responses, private controller) {}
}
