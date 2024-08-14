import { cdnBase } from '../config/index';
const imgPrefix = cdnBase;

const allProducts = [
  {
    attributes: [],
    description: '要高清，选六色，合并发货',
    name: '六色高清小卡（400G）',
    preview_imgs: [],
    product_type: '小卡',
    spu_id: '1',
    desc: ['https://qcloudimg.tencent-cloud.cn/raw/4a29d51b504f12b4933ce4490110b4dc.svg', 'https://qcloudimg.tencent-cloud.cn/raw/4a29d51b504f12b4933ce4490110b4dc.svg'],
  },
];

/**
 * @param {string} id
 * @param {number} [available] 库存, 默认1
 */
export function genProduct(id, available = 1) {
  const item = allProducts[id % allProducts.length];
  return {
    ...item,
    preview_imgs: ['https://qcloudimg.tencent-cloud.cn/raw/4a29d51b504f12b4933ce4490110b4dc.svg'],
  };
}
