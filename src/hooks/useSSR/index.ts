const canUseDOM: boolean = !!(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
);

export const useSSR = () => ({
  isBrowser: canUseDOM,
  isServer: !canUseDOM,
});
