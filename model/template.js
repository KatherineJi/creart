import { cdnBase } from '../config/index';
const imgPrefix = cdnBase;

const allTemplates = [
  {
    _id: "tid_001",
    // id: "tid_001",
    name: "写实照片风",
    description: "这是写实照片风的描述",
    preview_imgs: [],
    tags: [
      "REALISM",
      "PHOTO"
    ],
    render: '',
    allow_products: [],
    workflow: {
      params: {
        image: {
          default: '',
          position_node_id: '',
          description: '基于图片',
          type: 'image',
          required: true,
          position_input_name: '上传图片',
        },
        negative: {
          default: '',
          position_node_id: '',
          description: '反向关键词',
          type: 'string',
          required: true,
          position_input_name: '我不要',
        },
        positive: {
          default: '',
          position_node_id: '',
          description: '正向关键词',
          type: 'string',
          required: true,
          position_input_name: '我需要',
        },
      },
      prompt: {},
    }
  },
  {
    id: "tid_002",
    name: "日式动漫风",
    description: "这是日式动漫风的描述",
    preview_imgs: [],
    tags: [
      "ANIMATION",
      "JAPANESE"
    ],
    allow_products: [],
    workflow: null
  },
  {
    id: "tid_003",
    name: "古风水墨画",
    description: "这是古风水墨画的描述",
    preview_imgs: [],
    tags: [
      "INK_PAINTING",
      "ANCIENT_CHINESE"
    ],
    allow_products: [],
    workflow: null
  },
  {
    id: "tid_004",
    name: "111画",
    description: "这是111画的描述",
    preview_imgs: [],
    tags: [
      "INK_PAINTING",
      "ANCIENT_CHINESE"
    ],
    allow_products: [],
    workflow: null
  },
  {
    id: "tid_005",
    name: "222",
    description: "这是222画的描述",
    preview_imgs: [],
    tags: [
      "INK_PAINTING",
      "ANCIENT_CHINESE"
    ],
    allow_products: [],
    workflow: null
  }
];

/**
 * @param {string} id
 * @param {number} [available] 库存, 默认1
 */
export function genTemplate(id, available = 1) {
  // const specID = ['135681624', '135681628'];
  // if (specID.indexOf(id) > -1) {
  //   return allGoods.filter((good) => good.spuId === id)[0];
  // }
  const item = allTemplates[id % allTemplates.length];
  return {
    ...item,
    id: `${item._id}`,
    preview_imgs: ['https://qcloudimg.tencent-cloud.cn/raw/4a29d51b504f12b4933ce4490110b4dc.svg'],
    // available: available,
    // desc: item?.desc || defaultDesc,
    // images: item?.images || [item?.primaryImage],
  };
}
