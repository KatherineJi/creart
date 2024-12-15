import { cdnBase } from '../config/index';
import trueTemplates from './true_tempalate';
const imgPrefix = cdnBase;

const allTemplates = [
  {
    _id: "tid_001",
    name: "写实照片风",
    description: "这是写实照片风的描述",
    // preview_imgs: [],
    tags: [
      "REALISM",
      "PHOTO"
    ],
    allow_products: ["贴纸"],
    param_list: [
      {
        default: "ComfyUI_00343_.png",
        description: "单人头像或半身像，不可多人",
        key: "avatar",
        name: "单人像",
        options: [],
        required: true,
        type: "image",
      },
      {
        default: "全侧面",
        description: "身体面向角度",
        key: "angle",
        name: "角度",
        options: [{ key: "全侧面", value: "profile:1.5" }, { key: "正面", value: "looking ahead" }],
        required: true,
        type: "select",
      },
      {
        default: "浅金色",
        description: "发色",
        key: "hair_color",
        name: "发色",
        options: [{ key: "浅粉色", value: "with pastel pink hair" }, { key: "浅金色", value: "with pastel golden hair" }],
        required: true,
        type: "select",
      }
    ],
    preview_imgs: [
      'https://creart-1300279601.cos.ap-shanghai.myqcloud.com/creation-templates/preview_imgs/ComfyUI_00741_.png'
    ],
  },
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
