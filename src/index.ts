import get from "lodash.get";
import { v4 as uuidv4 } from "uuid";
import { lodashIsEqual } from "./compare/lodashIsEqual";
import type {
  DotNestedKeys,
  ICallBack,
  IMiddleware,
  IRegisteredFunctions,
} from "./types";

const registeredFunctions: IRegisteredFunctions = {};

const DEFAULT_COMPARE_ALGORITHM = lodashIsEqual;

const subScribeToStore = <T>(
  valueToCompare: DotNestedKeys<T>,
  callback: ICallBack
) => {
  const key = uuidv4();

  registeredFunctions[key] = {
    callback,
    valueToCompare,
  };

  return key;
};

const unSubScribeFromStore = (id: string) => delete registeredFunctions[id];

const storeSubScribeMiddleWare: IMiddleware =
  (args) =>
  ({ getState }) =>
  (next) =>
  (action) => {
    const { compareFunction = DEFAULT_COMPARE_ALGORITHM } = args ?? {};

    const prevValue = getState();
    const returnValue = next(action);
    const nextValue = getState();

    Object.values(registeredFunctions).forEach((func) => {
      const { callback, valueToCompare } = func;

      const prevValueToCompare = get(prevValue, valueToCompare);
      const nextValueToCompare = get(nextValue, valueToCompare);

      if (
        !compareFunction(
          prevValueToCompare,
          nextValueToCompare
        )
      ) {
        callback({
          prevValue: prevValueToCompare,
          nextValue: nextValueToCompare,
        });
      }
    });
    return returnValue;
  };

export {
  DEFAULT_COMPARE_ALGORITHM,
  storeSubScribeMiddleWare,
  unSubScribeFromStore,
  subScribeToStore,
};

export type { DotNestedKeys };
