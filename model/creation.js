const allCreations = [
  {
    id: "creation_001",
    template_id: 'tid_001',
    prompt_id: 'pid_001',
    task_id: 'tid_001',
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
    file_name: "6734a3b2d246a9fec5794304_3.png",
    preview_img: ['https://6372-creart-test-1g2yuv6d82b517bf-1257609973.tcb.qcloud.la/%E6%88%AA%E5%B1%8F2024-11-07%2014.28.19.png?sign=28df68b8733c66fce96e79f0803c4a78&t=1730968939', 'https://6372-creart-test-1g2yuv6d82b517bf-1257609973.tcb.qcloud.la/%E6%88%AA%E5%B1%8F2024-11-07%2014.28.10.png?sign=f875408b1073a219ac5fb156d5002a0b&t=1730968984', 'https://6372-creart-test-1g2yuv6d82b517bf-1257609973.tcb.qcloud.la/%E6%88%AA%E5%B1%8F2024-11-07%2014.22.25.png?sign=48ab5b7387bf50109ba4404eb1d7c185&t=1730968995'],
    modified_at: '2024-07-14T17:42:57.841000',
    creations_preview_img: 'https://6372-creart-test-1g2yuv6d82b517bf-1257609973.tcb.qcloud.la/test.jpg?sign=fc5d34c176d3586f3f521599575a60ce&t=1730969030',
    creation_template_name: "【正式】Mucha 穆夏风异形贴纸",
    created_by: '1',
    created_at: '2024-07-14T17:42:07.675000'
  },
  {
    id: "creation_002",
    template_id: 'tid_002',
    prompt_id: 'pid_002',
    task_id: 'tid_002',
    param_list: [{
      "key": "angle",
      "name": "角度",
      "type": "select",
      "value": "正面"
    },
    {
      "key": "hair_color",
      "name": "发色",
      "type": "select",
      "value": "浅粉色"
    }],
    file_name: '6734a3b0d246a9fec5794300_3.png',
    preview_img: ['https://6372-creart-test-1g2yuv6d82b517bf-1257609973.tcb.qcloud.la/%E6%88%AA%E5%B1%8F2024-11-07%2014.28.19.png?sign=28df68b8733c66fce96e79f0803c4a78&t=1730968939', 'https://6372-creart-test-1g2yuv6d82b517bf-1257609973.tcb.qcloud.la/%E6%88%AA%E5%B1%8F2024-11-07%2014.28.10.png?sign=f875408b1073a219ac5fb156d5002a0b&t=1730968984', 'https://6372-creart-test-1g2yuv6d82b517bf-1257609973.tcb.qcloud.la/%E6%88%AA%E5%B1%8F2024-11-07%2014.22.25.png?sign=48ab5b7387bf50109ba4404eb1d7c185&t=1730968995'],
    modified_at: '2024-07-14T17:42:57.841000',
    creations_preview_img: 'https://6372-creart-test-1g2yuv6d82b517bf-1257609973.tcb.qcloud.la/test.jpg?sign=fc5d34c176d3586f3f521599575a60ce&t=1730969030',
    creation_template_name: "【正式】Mucha 穆夏风异形贴纸",
    created_by: '1',
    created_at: '2024-07-14T17:42:07.675000'
  }
];

/**
 * @param {string} id
 * @param {number} [available] 库存, 默认1
 */
export function genCreation(id, available = 1) {
  const item = allCreations[id % allCreations.length];
  return {
    ...item,
  };
}
