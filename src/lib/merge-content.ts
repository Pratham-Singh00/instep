/*
  Utility to merge WordPress-managed content with local defaults.
  Arrays are replaced outright when the override provides at least one item.
*/
export const mergeContent = <T>(defaults: T, overrides: Partial<T> | null | undefined): T => {
  if (!overrides || typeof overrides !== "object") {
    return defaults;
  }

  const result: Record<string, unknown> = Array.isArray(defaults) ? [] : { ...defaults as Record<string, unknown> };

  for (const key of Object.keys(defaults as Record<string, unknown>)) {
    const defaultValue = (defaults as Record<string, unknown>)[key];
    const overrideValue = (overrides as Record<string, unknown>)[key];

    if (overrideValue === undefined || overrideValue === null) {
      (result as Record<string, unknown>)[key] = defaultValue;
      continue;
    }

    if (Array.isArray(defaultValue)) {
      (result as Record<string, unknown>)[key] = Array.isArray(overrideValue) && overrideValue.length > 0
        ? overrideValue
        : defaultValue;
      continue;
    }

    if (typeof defaultValue === "object" && defaultValue !== null && typeof overrideValue === "object" && !Array.isArray(overrideValue)) {
      (result as Record<string, unknown>)[key] = mergeContent(defaultValue, overrideValue as Record<string, unknown>);
      continue;
    }

    (result as Record<string, unknown>)[key] = overrideValue;
  }

  return result as T;
};
