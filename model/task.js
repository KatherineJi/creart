import { cdnBase } from '../config/index';
const imgPrefix = cdnBase;

const allTasks = [
  {
    id: "taskid_001",
    template_id: 'tid_001',
    prompt_id: 'pid_001',
    param_list: [{
      "key": "angle",
      "name": "角度",
      "type": "select",
      "value": "侧面"
    },
    {
      "key": "avatar",
      "name": "单人像",
      "type": "image",
      "value": "h1rlhensdl.jpg"
    },
    {
      "key": "hair_color",
      "name": "发色",
      "type": "select",
      "value": "浅金色"
    }],
    preview_img: ['https://6372-creart-test-1g2yuv6d82b517bf-1257609973.tcb.qcloud.la/%E6%88%AA%E5%B1%8F2024-11-07%2014.28.19.png?sign=28df68b8733c66fce96e79f0803c4a78&t=1730968939', 'https://6372-creart-test-1g2yuv6d82b517bf-1257609973.tcb.qcloud.la/%E6%88%AA%E5%B1%8F2024-11-07%2014.28.10.png?sign=f875408b1073a219ac5fb156d5002a0b&t=1730968984', 'https://6372-creart-test-1g2yuv6d82b517bf-1257609973.tcb.qcloud.la/%E6%88%AA%E5%B1%8F2024-11-07%2014.22.25.png?sign=48ab5b7387bf50109ba4404eb1d7c185&t=1730968995'],
    modified_at: '2024-07-14T17:42:57.841000',
    creations_preview_img: 'https://6372-creart-test-1g2yuv6d82b517bf-1257609973.tcb.qcloud.la/test.jpg?sign=fc5d34c176d3586f3f521599575a60ce&t=1730969030',
    creation_template_tags: ['油画风'],
    created_by: '1',
    created_at: '2024-07-14T17:42:07.675000',
    status: 0,
  },
  {
    id: "taskid_002",
    template_id: 'tid_002',
    param_list: [{
      "key": "angle",
      "name": "角度",
      "type": "select",
      "value": "侧面"
    },
    {
      "key": "avatar",
      "name": "单人像",
      "type": "image",
      "value": "h1rlhensdl.jpg"
    },
    {
      "key": "hair_color",
      "name": "发色",
      "type": "select",
      "value": "浅金色"
    }],
    creations_preview_img: 'https://6372-creart-test-1g2yuv6d82b517bf-1257609973.tcb.qcloud.la/test.jpg?sign=fc5d34c176d3586f3f521599575a60ce&t=1730969030',
    status: 1,
  },
  {
    id: "taskid_003",
    template_id: 'tid_003',
    params: [{
      "key": "angle",
      "name": "角度",
      "type": "select",
      "value": "侧面"
    },
    {
      "key": "avatar",
      "name": "单人像",
      "type": "image",
      "value": "h1rlhensdl.jpg"
    },
    {
      "key": "hair_color",
      "name": "发色",
      "type": "select",
      "value": "浅金色"
    }],
    creations_preview_img: 'https://6372-creart-test-1g2yuv6d82b517bf-1257609973.tcb.qcloud.la/test.jpg?sign=fc5d34c176d3586f3f521599575a60ce&t=1730969030',
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
