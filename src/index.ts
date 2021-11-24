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

const subscribeToStore = <T>(
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

const unSubscribeToStore = (id: string) => delete registeredFunctions[id];

const storeSubscribeMiddleWare: IMiddleware =
  ({ compareFunction = DEFAULT_COMPARE_ALGORITHM }) =>
  ({ getState }) =>
  (next) =>
  (action) => {
    const prevValue = getState();
    const returnValue = next(action);
    const nextValue = getState();

    Object.values(registeredFunctions).forEach((func) => {
      const { callback, valueToCompare } = func;
      if (
        compareFunction(
          get(prevValue, valueToCompare),
          get(nextValue, valueToCompare)
        )
      ) {
        callback({
          prevValue,
          nextValue,
        });
      }
    });
    return returnValue;
  };

export {
  DEFAULT_COMPARE_ALGORITHM,
  storeSubscribeMiddleWare,
  unSubscribeToStore,
  subscribeToStore,
};

export type { DotNestedKeys };
