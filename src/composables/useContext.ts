import { provide, inject, reactive } from "vue";
import type { UnwrapNestedRefs, InjectionKey } from "vue";

/** Generate a unique symbol */
const STORE_KEY = Symbol() as InjectionKey<string>;

interface ProvidedValueInteface<T> {
  context: [UnwrapNestedRefs<T>, ({ key, value }: Required<{ key: string; value: any }>) => void];
}

export function useReactiveProvider<T extends object>(initialObject = <T>{}) {
  const providedValue = reactive(initialObject);

  const setProvidedValue = ({ key, value }: Required<{ key: string; value: any }>) => {
    if (providedValue) {
      (providedValue as any)[key] = value;
    }
  };

  provide<ProvidedValueInteface<T>["context"]>(STORE_KEY, [providedValue, setProvidedValue]);
}

export function useReactiveContext<T>() {
  const providedValueContext = inject<ProvidedValueInteface<T>["context"]>(STORE_KEY);

  if (!providedValueContext) {
    throw new Error("useContext requires useReactiveProvider in parent");
  }

  return providedValueContext;
}
