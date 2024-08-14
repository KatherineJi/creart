import { cdnBase } from '../config/index';
const imgPrefix = cdnBase;

const allSkus = [
  {
    "sku_id": "1-1",
    "spu_id": "1",
    "price": "1.00",
    "stock": 10,
    "attributes_kv": {
      "印刷": "六色印刷",
      "纸张选择": "400G铜版纸",
      "覆膜材质": "高透亮膜"
    }
  },
  {
    "sku_id": "1-2",
    "spu_id": "1",
    "price": "1.01",
    "stock": 10,
    "attributes_kv": {
      "印刷": "六色印刷",
      "纸张选择": "400G铜版纸",
      "覆膜材质": "加硬亮膜"
    }
  },
  {
    "sku_id": "1-3",
    "spu_id": "1",
    "price": "1.02",
    "stock": 10,
    "attributes_kv": {
      "印刷": "六色印刷",
      "纸张选择": "400G铜版纸",
      "覆膜材质": "防刮哑膜"
    }
  },
  {
    "sku_id": "1-4",
    "spu_id": "1",
    "price": "0.50",
    "stock": 10,
    "attributes_kv": {
      "印刷": "四色印刷",
      "纸张选择": "400G铜版纸",
      "覆膜材质": "高透亮膜"
    }
  },
  {
    "sku_id": "1-5",
    "spu_id": "1",
    "price": "0.60",
    "stock": 10,
    "attributes_kv": {
      "印刷": "四色印刷",
      "纸张选择": "400G铜版纸",
      "覆膜材质": "加硬亮膜"
    }
  },
  {
    "sku_id": "1-6",
    "spu_id": "1",
    "price": "0.70",
    "stock": 10,
    "attributes_kv": {
      "印刷": "四色印刷",
      "纸张选择": "400G铜版纸",
      "覆膜材质": "防刮哑膜"
    }
  },
];

/**
 * @param {string} id
 * @param {number} [available] 库存, 默认1
 */
export function genSku(id, available = 1) {
  const item = allSkus[id % allSkus.length];
  return {
    ...item,
  };
}

export function getSkus(baseID = 0, length = 10) {
  return new Array(length).fill(0).map((_, idx) => genSku(idx + baseID));
}

export const skus = getSkus();
