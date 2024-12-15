import { config, cdnBase } from '../../config/index';

/** 获取首页数据 */
function mockFetchHome() {
  const { delay } = require('../_utils/delay');
  const { swiperImageList, secondSwiperImageList } = require('../../model/swiper');
  return delay(0).then(() => {
    return {
      swiper: swiperImageList,
      secondSwiper: secondSwiperImageList,
      tabList: [
        {
          text: '2D',
          key: 0,
        },
        {
          text: '3D',
          key: 1,
        },
      ],
    };
  });
}

/** 获取首页数据 */
export function fetchHome() {
  // if (config.useMock) {
  return mockFetchHome();
  // }
  return new Promise((resolve) => {
    resolve('real api');
  });
}
