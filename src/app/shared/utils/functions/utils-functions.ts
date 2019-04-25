import { HttpParams, HttpResponse } from '@angular/common/http';
import { Page, Option } from '../../models';
import { ROUTES_CONSTANTS } from '../../constants';

export class UtilsFunctions {
  /**
   * Resuelve un path de propiedades de un objeto a partir del string de ese path
   * @param path Path de propiedades en formato texto
   * @param obj Objeto para el cual se quiere resolver el path
   * @param separator Separador de las propiedades incluidas en el path, por defecto '.'
   */
  static resolvePath(path: string, obj: any, separator: string = '.') {
    const properties = path.split(separator);
    return properties.reduce((prev, curr) => prev && prev[curr], obj);
  }

  static buildQueryParams(source: Object): HttpParams {
    let target: HttpParams = new HttpParams();
    Object.keys(source).forEach((key: string) => {
      const value: string | number | boolean | Date = source[key];
      if (
        typeof value !== 'undefined' &&
        value !== null &&
        value !== 'null' &&
        value !== 'undefined'
      ) {
        target = target.append(key, value.toString());
      }
    });
    return target;
  }

  static getObject(values, key, value) {
    for (let i = 0; i < values.length; i++) {
      if (values[i][key] === value) {
        return values[i];
      }
    }
    return;
  }

  /**
   * Quita los acentos y convierte a minúscula el texto pasado por parámetro
   * @param text Texto a normalizar
   */
  static normalizeString(text: string): string {
    return text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  /**
   * Formatea un timestamp para las llamadas a la API
   * @param date fecha a normalizar
   */
  static formatTimestampAPI(date: Date | string): string {
    let year;
    let month;
    let day;
    let hour;
    let minutes;
    let seconds;
    if (date instanceof Date) {
      year = date.getFullYear();
      month =
        date.getMonth().toString().length > 1
          ? date.getMonth() + 1
          : `0${date.getMonth() + 1}`;
      day =
        date.getDate().toString().length > 1
          ? date.getDate()
          : `0${date.getDate()}`;
      hour =
        date.getHours().toString().length > 1
          ? date.getHours()
          : `0${date.getHours()}`;
      minutes =
        date.getMinutes().toString().length > 1
          ? date.getMinutes()
          : `0${date.getMinutes()}`;
      seconds =
        date.getSeconds().toString().length > 1
          ? date.getSeconds()
          : `0${date.getSeconds()}`;
    } else {
      const stringArray = date.split('/');
      day = stringArray[0];
      month = stringArray[1];
      year = stringArray[2];
      hour = '00';
      minutes = '00';
      seconds = '00';
    }
    return `${year}-${month}-${day}T${hour}:${minutes}:${seconds}`;
  }

  /**
   * Formatea la fecha para las llamadas a la API
   * @param date fecha a normalizar, en caso de ser string debe tener el formato dd/mm/yyyy
   */
  static formatDateStringDate(date: Date | string): string {
    let day;
    let month;
    let year;
    if (date instanceof Date) {
      month =
        date.getMonth().toString().length > 1
          ? date.getMonth() + 1
          : `0${date.getMonth() + 1}`;
      day =
        date.getDate().toString().length > 1
          ? date.getDate()
          : `0${date.getDate()}`;
      year = date.getFullYear();
    } else {
      const stringArray = date.split('/');
      day = stringArray[0];
      month = stringArray[1];
      year = stringArray[2];
    }
    return `${year}-${month}-${day}`;
  }

  static daysInMonth(month: number, year: number) {
    return new Date(year, month + 1, 0).getDate();
  }

  static sortArrayByKey(key: string) {
    return (a, b) => {
      if (a[key] < b[key]) {
        return -1;
      }
      if (a[key] > b[key]) {
        return 1;
      }
      return 0;
    };
  }

  static getPage(page: string): Page {
    let pageObject: Page;
    Object.keys(ROUTES_CONSTANTS).forEach(element => {
      const route = ROUTES_CONSTANTS[element];
      Object.keys(route).forEach(el => {
        const locatedPage = route[el];
        if (locatedPage.path && page === locatedPage.path) {
          pageObject = locatedPage;
        }
      });
    });
    return pageObject;
  }

  static formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day =
      date.getDate().toString().length > 1
        ? date.getDate()
        : `0${date.getDate()}`;
    const month =
      (date.getMonth() + 1).toString().length > 1
        ? date.getMonth() + 1
        : `0${date.getMonth() + 1}`;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  static arrayToObject(array: any[], keyField: string) {
    return array.reduce((obj, item) => {
      obj[item[keyField]] = item;
      return obj;
    }, {});
  }

  static enumToArray(enumme): Option[] {
    const stringIsNumber = value => isNaN(Number(value)) === false;
    return Object.keys(enumme)
      .filter(stringIsNumber)
      .map(key => ({ id: +key, value: enumme[key] }));
  }

  static downloadFile(res: HttpResponse<Blob>) {
    const blob = new Blob([res.body], { type: res.body.type });
    let filename = 'descarga.xls';
    if (res.headers.get('Content-Disposition')) {
      filename = res.headers.get('Content-Disposition').split('filename=')[1];
    }
    if (typeof navigator !== 'undefined' && navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveBlob(res.body, filename);
    } else {
      const isSafari =
        navigator.vendor &&
        navigator.vendor.indexOf('Apple') > -1 &&
        navigator.userAgent &&
        !navigator.userAgent.match('CriOS');
      const a = window.document.createElement('a');
      if (!isSafari) {
        a.target = '_blank';
      }
      a.href = window.URL.createObjectURL(res.body);
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }

  static copyDeep(oldCopy: any): any {
    const newCopy = JSON.parse(JSON.stringify(oldCopy));
    return newCopy;
  }

  /**
   * Return a numeric random id.
   * @param baseText Add a custom text before the radom code.
   */
  static getRandomId(baseText = ''): string {
    return (
      baseText +
      Math.random()
        .toString(36)
        .slice(2)
    );
  }

  /**
   * Trigger a onchange event on the element.
   * @param element Element where fire the change event.
   */
  static triggerChangeEvent(element: Element): void {
    if ('createEvent' in document) {
      const evt = document.createEvent('HTMLEvents');
      evt.initEvent('change', false, true);
      element.dispatchEvent(evt);
    } else {
      (<any>element).fireEvent('onchange');
    }
  }

  /**
   * Generate a autocalculated code of 8 character for a string.
   * @param str String to convert
   * @returns 8 characters code.
   */
  static checksum(str: string): string {
    let chk = 0x12345678;
    const len = str.length;
    for (let i = 0; i < len; i++) {
      chk += str.charCodeAt(i) * (i + 1);
    }
    // tslint:disable-next-line:no-bitwise
    return (chk & 0xffffffff).toString(16);
  }
  /**
   * Conversor for transform from NodeListOf to Array.
   * @param nodeList Object to convert, normally obtined from "document.querySelectorAll('')";
   */
  static convertNodeListToArray(nodeList: NodeListOf<Element>): Element[] {
    return Array.prototype.slice.call(nodeList);
  }

  /**
   * Devuelve el nombre completo previa comprobacion de si el segundo apellido es null
   */
  static getFullName(
    name: string,
    firstSurname: string,
    secondSurname: string
  ) {
    const surname2 = secondSurname ? secondSurname : '';
    const fullName = `${name} ${firstSurname} ${surname2}`;
    return fullName;
  }

  static getMaxPropertyObjectArray(array: any[], key: string) {
    return array.reduce((prev, current) => {
      return prev[key] > current[key] ? prev : current;
    });
  }

  static getMinPropertyObjectArray(array: any[], key: string) {
    return array.reduce((prev, current) => {
      return prev[key] < current[key] ? prev : current;
    });
  }

  static getPercentageComparation(numerator: number, denominator: number) {
    if (denominator === 0) {
      return null;
    }
    const result = Math.round((numerator / denominator) * 100);
    return result;
  }

  static sumAll(values: number[]) {
    return values.reduce((a, b) => a + b, 0);
  }

  static getMonth(date: Date) {
    return (date.getMonth() + 1).toString().length > 1
      ? JSON.stringify(date.getMonth() + 1)
      : `0${date.getMonth() + 1}`;
  }

  static getYear(date: Date) {
    return date
      .getFullYear()
      .toString()
      .substr(2, 4);
  }
}
