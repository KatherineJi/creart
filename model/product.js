import { cdnBase } from '../config/index';
const imgPrefix = cdnBase;

const allProducts = [
  {
    attributes: [
      { name: "尺寸", values: ["5**5cm", "8*8cm"] }
    ],
    created_at: "2024-12-09T19:23:32.305000",
    created_by: "20241125Wz2Ukv",
    desc_imgs: [
      'https://qcloudimg.tencent-cloud.cn/raw/4a29d51b504f12b4933ce4490110b4dc.svg'
    ],
    description: "异形贴纸，尺寸为 A4，排版为 5*4（5cm 长宽）或 4*4（8cm 长宽）",
    is_saleable: true,
    modified_at: "2024-12-09T20:11:04.285000",
    modified_by: "20241125Wz2Ukv",
    name: "异形半切贴纸",
    preview_imgs: [
      'https://creart-1300279601.cos.ap-shanghai.myqcloud.com/products/preview_imgs/1_%E8%B4%B4%E7%BA%B8_20241202210711.png'
    ],
    product_type: "贴纸",
    skus: [
      {
        attributes_kv: { 尺寸: "5*5cm", 覆膜: "亮膜" },
        created_at: "2024-12-09T20:01:54.334000",
        created_by: "20241125Wz2Ukv",
        id: "1733772448992",
        is_saleable: true,
        modified_at: "2024-12-09T20:11:04.285000",
        modified_by: "20241125Wz2Ukv",
        price: 100,
        sku_id: "1-1733772448992",
        sku_name: "异形半切贴纸-5*5cm",
        spu_id: "1",
        stock: 1,
      },
      {
        attributes_kv: { 尺寸: "8*8cm", 覆膜: "亮膜" },
        created_at: "2024-12-09T20:01:54.334000",
        created_by: "20241125Wz2Ukv",
        id: "1733772448993",
        is_saleable: true,
        modified_at: "2024-12-09T20:11:04.285000",
        modified_by: "20241125Wz2Ukv",
        price: 150,
        sku_id: "1-1733772448993",
        sku_name: "异形半切贴纸-8*8cm",
        spu_id: "1",
        stock: 1,
      },
      {
        attributes_kv: { 尺寸: "8*8cm", 覆膜: "哑膜" },
        created_at: "2024-12-09T20:01:54.334000",
        created_by: "20241125Wz2Ukv",
        id: "1733772448994",
        is_saleable: true,
        modified_at: "2024-12-09T20:11:04.285000",
        modified_by: "20241125Wz2Ukv",
        price: 200,
        sku_id: "1-1733772448994",
        sku_name: "异形半切贴纸-8*8cm",
        spu_id: "1",
        stock: 1,
      }
    ],
    spu_id: "1",
    _id: "675743b4f3f1dcaf812692be",
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
