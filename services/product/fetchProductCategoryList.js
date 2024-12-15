import { config } from '../../config/index';

/** 获取商品列表 */
function mockFetchProductCategoryList(pageIndex = 1, pageSize = 10) {
  const { delay } = require('../_utils/delay');
  return delay(0).then(() =>
    [
      {
        id: 'ALL',
        name: '全部',
      },
      {
        id: '贴纸',
        name: '贴纸',
      },
      {
        id: '亚克力',
        name: '亚克力',
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
