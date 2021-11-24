type DotPrefix<T extends string> = T extends "" ? "" : `.${T}`;

export type DotNestedKeys<T> = (
  T extends object
    ? {
        [K in Exclude<keyof T, symbol>]: `${K}${DotPrefix<
          DotNestedKeys<T[K]>
        >}`;
      }[Exclude<keyof T, symbol>]
    : ""
) extends infer D
  ? Extract<D, string>
  : never;

export type IMiddleware = ({
  compareFunction,
}: {
  compareFunction: (a: any, b: any) => boolean;
}) => ({
  getState,
}: {
  getState: () => any;
}) => (next: any) => (action: { type: string }) => any;

export interface ICallBack {
  (arg0: { prevValue: unknown; nextValue: unknown }): void;
}

export type IRegisteredFunctions = Record<
  string,
  { callback: ICallBack; valueToCompare: string }
>;
