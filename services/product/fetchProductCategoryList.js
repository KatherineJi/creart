import { config } from '../../config/index';

/** 获取商品列表 */
function mockFetchProductCategoryList(pageIndex = 1, pageSize = 10) {
  const { delay } = require('../_utils/delay');
  return delay().then(() =>
    [
      {
        id: 'cid-001',
        name: '纸制品',
      },
      {
        id: 'cid-002',
        name: '贴纸',
      },
      {
        id: 'cid-003',
        name: '吧唧徽章',
      },
    ]
  );
}

/** 获取商品列表 */
export function fetchProductCategoryList(pageIndex = 1, pageSize = 10) {
  // if (config.useMock) {
  return mockFetchProductCategoryList(pageIndex, pageSize);
  // }
}
