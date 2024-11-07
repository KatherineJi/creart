import { cdnBase } from '../config/index';
import trueTemplates from './true_tempalate';
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
        hair_color: {
          index: 0,
          name: '发色',
          type: 'select',
          default: '浅金色',
          description: '发色',
          required: true,
          position_node_id: '134',
          position_input_name: 'text b',
          options: [
            { "key": "浅粉色", "value": "(pastel pink hair1.2)" },
            { "key": "浅金色", "value": "pastel golden hair" },
            { "key": "浅蓝色", "value": "pastel blue hair" },
            { "key": "浅紫色", "value": "pastel purple hair" }
          ]
          // {
          //   "浅粉色": "(pastel pink hair1.2)",
          //   "浅金色": "pastel golden hair",
          //   "浅蓝色": "pastel blue hair",
          //   "浅紫色": "pastel purple hair",
          // },
        },
        hand_style: {
          index: 0,
          name: '手部姿势',
          type: 'select',
          default: '比心',
          description: '手部姿势',
          required: true,
          position_node_id: '134',
          position_input_name: 'text b',
          options: [
            { key: "比心", value: "bixin" },
            { key: "比耶", value: "biye" },
            { key: "托腮", value: "tuosai" },
          ],
        },
      },
      prompt: {},
    }
  },
  {
    _id: "tid_002",
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
    _id: "tid_003",
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
    _id: "tid_004",
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
    _id: "tid_005",
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
export function genTemplate(id = 1, available = 1) {
  // const specID = ['135681624', '135681628'];
  // if (specID.indexOf(id) > -1) {
  //   return allGoods.filter((good) => good.spuId === id)[0];
  // }
  const item = allTemplates[0];
  // allTemplates[id % allTemplates.length];
  return {
    ...item,
    _id: `${item._id}`,
    preview_imgs: ['https://qcloudimg.tencent-cloud.cn/raw/4a29d51b504f12b4933ce4490110b4dc.svg'],
    // available: available,
    // desc: item?.desc || defaultDesc,
    // images: item?.images || [item?.primaryImage],
  };
}
