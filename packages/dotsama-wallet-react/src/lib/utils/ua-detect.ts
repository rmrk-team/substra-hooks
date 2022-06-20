const isWindow =
  typeof window !== 'undefined' &&
  window.document &&
  // @ts-ignore
  window.document.createElement &&
  window.navigator;
export const isFirefox = isWindow
  ? window.navigator.userAgent.toLowerCase().indexOf('firefox') > -1
  : false;

export const isMobile = isWindow
  ? /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      window.navigator.userAgent,
    )
  : false;
export const isAndroid = isWindow ? /Android/i.test(window.navigator.userAgent) : false;
export const isIOs = isWindow ? /iPhone|iPad|iPod/i.test(window.navigator.userAgent) : false;
export const isNovaWallet = isWindow ? /NovaWallet/i.test(window.navigator.userAgent) : false;
