import * as lodash from 'lodash';
import { isObject, isUndefined } from 'util';

/**
 * @name isPresent
 * @description
 * Checks whether or not the given context string contains the given string or regexp.
 * @memberof Utils
 * @kind function
 * @param test The test string or regexp.
 * @param context The string to test against.
 * @param options options object
 * @param options.startIndex the index to start the regex search
 * @returns Returns whether or not the context string contains the given string or is matched by the regexp.
 */
export const isPresent = (testStr: string | RegExp, str: string = '', options = { startIndex: 0 }): boolean => {
    let indexOf = -1;

    if (testStr instanceof RegExp) {
        indexOf = str.substring(options.startIndex).search(testStr);
    } else if (typeof testStr === 'string') {
        indexOf = str.indexOf(testStr);
    }

    if (indexOf === -1) {
        return false;
    }

    return true;
};

/**
 * @name pluralize
 * @description
 * Pluralize a string
 * @memberof Utils
 * @kind function
 * @param str The string to pluralize
 * @returns The pluralized string
 */
export const pluralize = (str: string): string => {
    const last = str.slice(-2);

    if (last[1] === 'y') {
        return str.slice(0, -1) + 'ies';
    } else if (/(?:.[s|z|x]|ch|sh)$/.test(last)) {
        return str + 'es';
    }

    return str + 's';
};

/**
 * @name isEmail
 * @description
 * Tests whether string is email
 * @memberof Utils
 * @kind function
 * @param str The string to test
 * @returns Returns true if string is email, false otherwise
 */
export const isEmail = (str: string): boolean => {
    return /^[\w]+@{1}(?:(?!_)[\w])+[.]{1}(?:(?!_)[\w])+$/gi.test(str);
};

/**
 * @name unary
 * @memberof Utils
 * @kind function
 * @description
 * Used to ensure single argument is passed to a callback e.x. parseInt when passed to map won't pass the index as the radix arg
 * @param fn 
 */
export const unary = (fn: Function) => (arg: any) => fn(arg);

export const capitalize = (str: string): string => {
    if (lodash.isUndefined(str) || lodash.isEmpty(str)) {
        return '';
    }
    
    return str.charAt(0).toUpperCase() + str.substr(1);
};

/**
 * @name toCamelCase
 * @memberOf Utils
 * @kind Function
 * @param str the string to camelcase
 */
export const toCamelCase = (str: string): string => {
    if (lodash.isEmpty(str) || !lodash.isString(str)) {
        return '';
    }

    const split = str.split('_');
    const first = split.splice(0,1);

    const upperCased = split.map((str) => {
        return str.charAt(0).toUpperCase() + str.substr(1);    
    });

    return first.concat(upperCased).join('');
};

/**
 * @name copy
 * @memberOf Utils
 * @kind Function
 * @description 
 * Copies properties from any number of source objects and returns a single destination opject
 * @param options toCamelCase: boolean (will camelcase keys)
 * @param destination the object to copy to
 * @param sources the source objects to copy
 */
export const copy = (destination: any = {}, ...sources: Array<any>) => {
    if (lodash.isEmpty(sources)) {
        sources.push(destination);
    }

    sources.forEach((source: any) => {
        if (!lodash.isObject(source)) {
            return;
        }

        let keys = Object.keys(source);

        keys.forEach((key) => {
            let value = source[key];

            if (lodash.isArray(value)) {
                copy(destination[key] || (destination[key] = []), value);
                return;
            } else if (lodash.isObject(value)) {
                copy(destination[key] || (destination[key] = {}), value);
                return;
            }
    
            destination[key] = value;
        });
    });

    return destination;
};

/**
 * @name idPropsToNums
 * @memberOf Utils
 * @kind Function
 * @description 
 * Takes any id properties ('movieid', 'id') and converts their values to numbers (if the values were strings)
 * @param obj the input object
 */
export const idPropsToNums = (obj: any = {}): void => {
    if (!isObject(obj)) {
        return;
    }
    const regexId = /^.*id$/i;
    
    let tuples: Array<[string, any]> = Object.entries(obj);
    tuples.forEach((tuple) => {
        let key = tuple[0];
        let val = tuple[1];
        if (typeof val === 'string' && regexId.test(key)) {
            obj[key] = lodash.toNumber(val);
        }
    });
}

/**
 * @name formatRating
 * @memberof Utils
 * @kind function
 * @description
 * Convert rating from range [0,4] to [0, 40]
 * @param rating the rating to convert 
 */

export const formatRating = (rating: any): number => {
    if (isUndefined(rating) || isObject(rating)) {
        return null;
    } 
    let formatted = lodash.toNumber(rating);

    return formatted * 10;
}


const wildcardRegex = /^\*|\*$/g;

export function processWildcards(value: string): string {
    if (lodash.isNil(value)) {
        return null;
    }

    if (!lodash.isString(value)) {
        return value;
    }
    
    return value.replace(wildcardRegex, '%');
}