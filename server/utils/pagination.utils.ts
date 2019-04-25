/**
 * Paginations Utils
 * Supported methods:
 * - setOrder(data: Array<any>, orderId: string, direction?: Direction)
 * - setPagination(data: Array<any>, params)
 */

export class PaginationUtils {
  /**
   * TODO: Enable multi sorting
   * Set order function
   * @param {Array<any>} data array with object to order
   * @param {any} sort properties to sort
   */
  static setOrder(data, sort) {
    if (!sort) {
      return data;
    } else {
      const order = sort.split(',');
      if (order.length === 2) {
        const dir = order[1];
        const orderId = order[0];
        data.sort((n1, n2) => {
          if (
            typeof n1[orderId] !== 'undefined' &&
            typeof n2[orderId] !== 'undefined'
          ) {
            if (isNaN(n1[orderId]) || isNaN(n2[orderId])) {
              if (n1[orderId].toLowerCase() > n2[orderId].toLowerCase()) {
                return 1;
              }
              if (n1[orderId].toLowerCase() < n2[orderId].toLowerCase()) {
                return -1;
              }
              return 0;
            } else {
              return n1[orderId] - n2[orderId];
            }
          } else {
            return 0;
          }
        });
        if (dir === 'desc') {
          return data.reverse();
        } else {
          return data;
        }
      } else {
        return data;
      }
    }
  }

  /**
   * Set pagination
   * @param {Array<any>} data array with object to paginate
   * @param {any} params parameters to paginate
   *
   * Pagination parameters:
   * -- last – set to true if its the last page otherwise false
   * -- first – set to true if it’s the first page otherwise false
   * -- totalElements – the total number of rows/records.
   * -- totalPages – the total number of pages which was derived from (totalElements / size)
   * -- size – the number of records per page, this was passed from the client via param size
   * -- number – the page number sent by the client, in our response the number is 0 because in our backend we are
   *    using an array of Students which is a zero-based index, so in our backend, we decrement the page number by 1
   * -- sort – the sorting parameter for the page
   * -- numberOfElements – the number of rows/records return for the page
   */
  static setPagination(data, params) {
    // Set default pagination values
    let page = params.page ? parseInt(params.page.toString(), 10) : 0;
    const size = params.size ? parseInt(params.size.toString(), 10) : 10;
    const totalElements = data.length;

    // Define pagination object
    const pagination: any = { content: [] };

    // Set pagination parameters
    pagination.totalPages = Math.ceil(totalElements / size);
    if (page >= pagination.totalPages) {page = pagination.totalPages - 1; }
    pagination.totalElements = totalElements;
    pagination.first = page === 0;
    pagination.last = page >= pagination.totalPages - 1;
    pagination.size = size;
    pagination.number = page;
    pagination.sort = params.sort || null;
    if (totalElements === 0) {
      pagination.numberOfElements = 0;
    } else {
      pagination.numberOfElements = pagination.last
        ? totalElements % size === 0
          ? size
          : totalElements % size
        : size;
    }

    // Get paginated data
    // tslint:disable-next-line:triple-equals
    if (size == 0) {
      pagination.content = data;
      pagination.size = totalElements;
    } else {
      pagination.content = data.slice(page * size, (page + 1) * size);
    }
    return pagination;
  }
}
