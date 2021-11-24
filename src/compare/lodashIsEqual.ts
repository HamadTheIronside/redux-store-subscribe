import isEqual from 'lodash.isequal';

export const lodashIsEqual = (a: any, b: any): boolean => {
    return isEqual(a, b);
}