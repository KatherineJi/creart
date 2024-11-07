import { cdnBase } from '../config/index';
const imgPrefix = cdnBase;

const allTasks = [
  {
    id: "taskid_001",
    template_id: 'tid_001',
    prompt_id: 'pid_001',
    params: {
      negative: '抽象',
      positive: '漫画',
      hair_color: '浅粉色'
    },
    modified_at: '2024-07-14T17:42:57.841000',
    creations_preview_img: 'https://qcloudimg.tencent-cloud.cn/raw/4a29d51b504f12b4933ce4490110b4dc.svg',
    creation_template_tags: ['油画风'],
    created_by: '1',
    created_at: '2024-07-14T17:42:07.675000',
    status: 0,
  },
  {
    id: "taskid_002",
    template_id: 'tid_002',
    params: {
      negative: '抽象',
      positive: '漫画'
    },
    creations_preview_img: 'https://qcloudimg.tencent-cloud.cn/raw/4a29d51b504f12b4933ce4490110b4dc.svg',
    status: 1,
  },
  {
    id: "taskid_003",
    template_id: 'tid_003',
    params: {
      negative: '抽象',
      positive: '漫画'
    },
    creations_preview_img: 'https://qcloudimg.tencent-cloud.cn/raw/4a29d51b504f12b4933ce4490110b4dc.svg',
    status: 2,
  },
];

/**
 * @param {string} id
 * @param {number} [available] 库存, 默认1
 */
export function genTask(id, available = 1) {
  const item = allTasks[id % allTasks.length];
  return {
    ...item,
  };
}
