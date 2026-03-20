export const CATEGORIES = ['Electronics','Clothing','Collectibles','Sneakers','Books','Tools','Other'];

export const PLATFORMS = ['eBay','Facebook Marketplace','Depop','Mercari'];

export const PLATFORM_FEES = {
  'eBay': 0.1335,
  'Facebook Marketplace': 0,
  'Depop': 0.10,
  'Mercari': 0.10,
};

export function calcFee(platform, price) {
  return (PLATFORM_FEES[platform] || 0) * price;
}

export function fmtMoney(v) {
  return '$' + Math.abs(v).toFixed(2);
}

export function fmtPct(v) {
  return v.toFixed(1) + '%';
}

export function genId(prefix) {
  return `${prefix}-${Date.now().toString(36).toUpperCase()}`;
}

export function today() {
  return new Date().toISOString().slice(0, 10);
}
