/* eslint-disable @typescript-eslint/no-explicit-any */
import { provide, inject, reactive } from "vue";
import type { UnwrapNestedRefs, InjectionKey } from "vue";
import type { SetterDataType } from "@/types/MainDataTypes.interface";

/** Generate a unique symbol */
const STORE_KEY = Symbol() as InjectionKey<string>;

interface ProvidedValueInteface<T> {
  store: UnwrapNestedRefs<T>;
  // eslint-disable-next-line no-unused-vars
  setStore: (data: SetterDataType) => void;
}

export function useReactiveProvider<T extends object>(initialObject = <T>{}) {
  const providedValue = reactive(initialObject);

  const setProvidedValue = ({ key, value }: SetterDataType) => {
    if (providedValue) {
      (providedValue as any)[key] = value;
    }
  };

  provide<ProvidedValueInteface<T>>(STORE_KEY, {
    store: providedValue,
    setStore: setProvidedValue,
  });
}

export function useReactiveContext<T>() {
  const providedValueContext = inject<ProvidedValueInteface<T>>(STORE_KEY);

  if (!providedValueContext) {
    throw new Error("useContext requires useReactiveProvider in parent");
  }

  return providedValueContext;
}
