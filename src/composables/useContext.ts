import { provide, inject, reactive } from "vue";
import type { ComputedRef } from "vue";

/** Generate a unique symbol */
const STORE_KEY = Symbol("store provider key");

type Key = string | symbol;
type Value = string | object | number;

interface SetterData {
  key: Key;
  value: Value;
}

export type Context =
  | [ComputedRef<{ [key: Key]: any }>, (data: Required<SetterData>) => void]
  | undefined;

export function useReactiveProvider(initialObject: object = {}) {
  const providedValue: { [key: Key]: any } = reactive(initialObject);

  const setProvidedValue = ({ key, value }: Required<SetterData>) => {
    providedValue[key] = value;
  };

  provide(STORE_KEY, <Context>[providedValue, setProvidedValue]);
}

export function useReactiveContext() {
  const providedValueContext: Context = inject(STORE_KEY);

  if (!providedValueContext) {
    throw new Error("useContext requires useReactiveProvider in parent");
  }

  return providedValueContext;
}
