/**
 * Extracts candle data items from the candleData.items array
 * @param {Object} candleData - The candle data object containing items array
 * @returns {Object} Object containing candleItem, parshaItem, and havdalahItem
 */
export const extractCandleItems = (candleData) => {
  if (!candleData || !candleData.items || !Array.isArray(candleData.items)) {
    return {
      candleItem: null,
      parshaItem: null,
      havdalahItem: null,
    };
  }

  let candleItem = null;
  let parshaItem = null;
  let havdalahItem = null;

  candleData.items.forEach((item) => {
    if (item.category === "candles") {
      candleItem = item;
    }
    if (item.category === "parashat") {
      parshaItem = item;
    }
    if (item.category === "havdalah") {
      havdalahItem = item;
    }
  });

  return {
    candleItem,
    parshaItem,
    havdalahItem,
  };
};
