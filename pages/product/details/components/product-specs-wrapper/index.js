/* eslint-disable no-param-reassign */
/* eslint-disable no-nested-ternary */
import Toast from 'tdesign-miniprogram/toast';

const app = getApp();

Component({
  options: {
    multipleSlots: true,
    addGlobalClass: true,
  },

  properties: {
    fromPreview: {
      type: Boolean,
      value: false,
    },
    product: {
      type: Object,
      observer(p) {
        console.log('w product')
        this.setData({
          specList: p.specList || [],
          limitBuyInfo: p.limitInfo?.[0].text || ''
        });
        if (p.specList && p.specList.length > 0) {
          this.initData();
        }
      },
    },
    src: {
      type: String,
    },
    isStock: {
      type: Boolean,
      value: true,
    },
    limitMaxCount: {
      type: Number,
      value: 999,
    },
    limitMinCount: {
      type: Number,
      value: 1,
    },
    skuList: {
      type: Array,
      value: [],
      observer(skuList) {
        console.log('w skuList')
        if (skuList && skuList.length > 0) {
          if (this.initStatus) {
            this.initData();
          }
        }
      },
    },
    outOperateStatus: {
      type: Boolean,
      value: false,
    },
    hasAuth: {
      type: Boolean,
      value: false,
    },
    count: {
      type: Number,
      value: 1,
      observer(count) {
        this.setData({
          buyNum: count,
        });
      },
    },
    selectedSkuDetail: {
      type: Object,
      // 更新携带的spec信息的
      observer(selected) {
        const selectedSku = {};
        selected.specInfo.forEach((spec) => {
          selectedSku[spec.specTitle] = spec.specValue;
          this.toChooseItem({
            currentTarget: {
              dataset: {
                id: spec.specValue,
                specid: spec.specTitle,
                hasstock: true,
              }
            }
          });
        });
        console.log('w selectedSkuDetail', selectedSku)
        // this.selectedSku = selectedSku;


      },
    },
  },

  initStatus: false,
  selectedSku: {},
  selectSpecObj: {},

  data: {
    buyNum: 1,
    isAllSelectedSku: false,

    selectSkuSellsPrice: 0,
    specImg: '',
    specList: [],

  },

  methods: {
    initData() {
      console.log('w init')
      const { skuList } = this.properties;
      const { specList } = this.properties;
      specList.forEach((item) => {
        if (item.specValueList.length > 0) {
          item.specValueList.forEach((subItem) => {
            const obj = this.checkSkuStockQuantity(subItem.specValueId, skuList);
            subItem.hasStockObj = obj;
          });
        }
      });
      const selectedSku = {};
      // let { selectedSku } = this;
      // const { specList } = this.properties;
      // selectedSku =
      //   selectedSku[specId] === id ? { ...this.selectedSku, [specId]: '' } : { ...this.selectedSku, [specId]: id };
      specList.forEach((item) => {
        selectedSku[item.specId] = '';
      });
      const isAllSelectedSku = this.isAllSelected(specList, selectedSku);
      this.setData({
        specList,
      });
      this.selectSpecObj = {};
      this.selectedSku = {};
      this.initStatus = true;

      console.log({
        specList,
        selectedSku: skuList[0],
        isAllSelectedSku: 1,
      })
    },

    checkSkuStockQuantity(specValueId, skuList) {
      let hasStock = false;
      const array = [];
      skuList.forEach((item) => {
        (item.specInfo || []).forEach((subItem) => {
          if (subItem.specValueId === specValueId && item.quantity > 0) {
            const subArray = [];
            (item.specInfo || []).forEach((specItem) => {
              subArray.push(specItem.specValueId);
            });
            array.push(subArray);
            hasStock = true;
          }
        });
      });
      return {
        hasStock,
        specsArray: array,
      };
    },

    chooseSpecValueId(specValueId, specId) {
      const { selectSpecObj } = this;
      const { skuList, specList } = this.properties;
      if (selectSpecObj[specId]) {
        selectSpecObj[specId] = [];
        this.selectSpecObj = selectSpecObj;
      } else {
        selectSpecObj[specId] = [];
      }

      const itemAllSpecArray = [];
      const itemUnSelectArray = [];
      const itemSelectArray = [];
      specList.forEach((item) => {
        if (item.specId === specId) {
          const subSpecValueItem = item.specValueList.find((subItem) => subItem.specValueId === specValueId);
          let specSelectStatus = false;
          item.specValueList.forEach((n) => {
            itemAllSpecArray.push(n.hasStockObj.specsArray);
            if (n.isSelected) {
              specSelectStatus = true;
            }
            if (n.hasStockObj.hasStock) {
              itemSelectArray.push(n.specValueId);
            } else {
              itemUnSelectArray.push(n.specValueId);
            }
          });
          if (specSelectStatus) {
            selectSpecObj[specId] = this.flatten(subSpecValueItem?.hasStockObj.specsArray.concat(itemSelectArray));
          } else {
            const subSet = function (arr1, arr2) {
              const set2 = new Set(arr2);
              const subset = [];
              arr1.forEach((val) => {
                if (!set2.has(val)) {
                  subset.push(val);
                }
              });
              return subset;
            };
            selectSpecObj[specId] = subSet(this.flatten(itemAllSpecArray), this.flatten(itemUnSelectArray));
          }
        } else {
          // 未点击规格的逻辑
          const itemSelectArray = [];
          let specSelectStatus = false;
          item.specValueList.map(
            // 找到有库存的规格数组
            (n) => {
              itemSelectArray.push(n.hasStockObj.specsArray);
              if (n.isSelected) {
                specSelectStatus = true;
              }
              n.hasStockObj.hasStock = true;
              return n;
            },
          );
          if (specSelectStatus) {
            selectSpecObj[item.specId] = this.flatten(itemSelectArray);
          } else {
            delete selectSpecObj[item.specId];
          }
        }
        this.selectSpecObj = selectSpecObj;
      });
      const combatArray = Object.values(selectSpecObj);
      if (combatArray.length > 0) {
        const showArray = combatArray.reduce((x, y) => this.getIntersection(x, y));
        const lastResult = Array.from(new Set(showArray));
        specList.forEach((item) => {
          item.specValueList.forEach((subItem) => {
            if (lastResult.includes(subItem.specValueId)) {
              subItem.hasStockObj.hasStock = true;
            } else {
              subItem.hasStockObj.hasStock = false;
            }
          });
        });
      } else {
        specList.forEach((item) => {
          if (item.specValueList.length > 0) {
            item.specValueList.forEach((subItem) => {
              const obj = this.checkSkuStockQuantity(subItem.specValueId, skuList);
              subItem.hasStockObj = obj;
            });
          }
        });
      }
      this.setData({
        specList,
      });
    },

    flatten(input) {
      const stack = [...input];
      const res = [];
      while (stack.length) {
        const next = stack.pop();
        if (Array.isArray(next)) {
          stack.push(...next);
        } else {
          res.push(next);
        }
      }
      return res.reverse();
    },

    getIntersection(array, nextArray) {
      return array.filter((item) => nextArray.includes(item));
    },

    toChooseItem(e) {
      const { isStock } = this.properties;
      if (!isStock) return;
      const { id } = e.currentTarget.dataset;
      const specId = e.currentTarget.dataset.specid;
      const hasStock = e.currentTarget.dataset.hasstock;
      if (!hasStock) {
        Toast({
          context: this,
          selector: '#t-toast',
          message: '该规格已售罄',
          icon: '',
          duration: 1000,
        });
        return;
      }

      let { selectedSku } = this;
      const { specList } = this.properties;
      selectedSku =
        selectedSku[specId] === id ? { ...this.selectedSku, [specId]: '' } : { ...this.selectedSku, [specId]: id };
      specList.forEach((item) => {
        item.specValueList.forEach((valuesItem) => {
          if (item.specId === specId) {
            valuesItem.isSelected = valuesItem.specValueId === selectedSku[specId];
          }
        });
      });
      this.chooseSpecValueId(id, specId);
      const isAllSelectedSku = this.isAllSelected(specList, selectedSku);
      if (!isAllSelectedSku) {
        this.setData({
          selectSkuSellsPrice: 0,
          selectSkuImg: '',
        });
      }
      this.setData({
        specList,
        isAllSelectedSku,
      });
      this.selectedSku = selectedSku;
      this.chooseSpecItem({
        detail: {
          specList,
          selectedSku,
          isAllSelectedSku,
        }
      });
      // this.triggerEvent('change', {
      //   specList,
      //   selectedSku,
      //   isAllSelectedSku,
      // });
    },

    // 判断是否所有的sku都已经选中
    isAllSelected(skuTree, selectedSku) {
      const selected = Object.keys(selectedSku).filter((skuKeyStr) => selectedSku[skuKeyStr] !== '');
      return skuTree.length === selected.length;
    },

    handlePopupHide() {
      this.triggerEvent('closeSpecsPopup', {
        show: false,
      });
    },

    specsConfirm() {
      const { isStock } = this.properties;
      if (!isStock) return;
      this.gotoBuy();
      // this.triggerEvent('specsConfirm');
    },

    // addCart() {
    //   const { isStock } = this.properties;
    //   if (!isStock) return;
    //   this.triggerEvent('addCart');
    // },

    // buyNow() {
    //   const { isAllSelectedSku } = this.data;
    //   const { isStock } = this.properties;
    //   if (!isStock) return;
    //   this.triggerEvent('buyNow', {
    //     isAllSelectedSku,
    //   });
    // },

    handleBuyNumChange(e) {
      const { value } = e.detail;
      this.setData({
        buyNum: value,
      });
      this.triggerEvent('updateSelectedAttrStr', {
        selectedAttrStr: this.data.selectSpecsName ? `${value}${this.data.selectSpecsName}` : '',
      });
    },


    chooseSpecItem(e) {
      const { specList } = this.properties.product;
      const { selectedSku, isAllSelectedSku, skipSelectSpec, selectItem } = e.detail;
      console.log(selectedSku, isAllSelectedSku)
      if (!isAllSelectedSku) {
        this.setData({
          selectSkuSellsPrice: 0,
        });
      }
      this.setData({
        isAllSelectedSku,
      });
      this.getSkuItem(specList, selectedSku, skipSelectSpec, selectItem);
    },

    getSkuItem(specList, selectedSku, skipSelectSpec, selectItem) {
      const { skuList, product } = this.properties;
      const primaryImage = product.preview_imgs[0];
      const selectedSkuValues = this.getSelectedSkuValues(specList, selectedSku);
      let selectedAttrStr = ` 件  `;
      selectedSkuValues.forEach((item) => {
        selectedAttrStr += `，${item.specValue}  `;
      });
      // eslint-disable-next-line array-callback-return
      const skuItem = skipSelectSpec ? selectItem : skuList.filter((item) => {
        let status = true;
        (item.specInfo || []).forEach((subItem) => {
          if (
            !selectedSku[subItem.specId] ||
            selectedSku[subItem.specId] !== subItem.specValueId
          ) {
            status = false;
          }
        });
        if (status) return item;
      })[0];
      this.selectSpecsName(selectedSkuValues.length > 0 ? selectedAttrStr : '');
      console.log(skuItem)
      if (skuItem) {
        this.setData({
          selectItem: skuItem,
          selectSkuSellsPrice: skuItem.price || 0,
        });
      } else {
        this.setData({
          selectItem: null,
          selectSkuSellsPrice: 0,
        });
      }
      this.setData({
        specImg: skuItem && skuItem.skuImage ? skuItem.skuImage : primaryImage,
      });
    },

    // 获取已选择的sku名称
    getSelectedSkuValues(skuTree, selectedSku) {
      const normalizedTree = this.normalizeSkuTree(skuTree);
      return Object.keys(selectedSku).reduce((selectedValues, skuKeyStr) => {
        const skuValues = normalizedTree[skuKeyStr];
        const skuValueId = selectedSku[skuKeyStr];
        if (skuValueId !== '') {
          const skuValue = skuValues.filter((value) => {
            return value.specValueId === skuValueId;
          })[0];
          skuValue && selectedValues.push(skuValue);
        }
        return selectedValues;
      }, []);
    },

    normalizeSkuTree(skuTree) {
      const normalizedTree = {};
      skuTree.forEach((treeItem) => {
        normalizedTree[treeItem.specId] = treeItem.specValueList;
      });
      return normalizedTree;
    },

    selectSpecsName(selectSpecsName) {
      this.setData({
        selectSpecsName: selectSpecsName || '',
      });
      this.triggerEvent('updateSelectedAttrStr', {
        selectedAttrStr: selectSpecsName ? `${this.data.buyNum}${selectSpecsName}` : '',
      });

      // if (selectSpecsName) {
      //   this.setData({
      //     selectedAttrStr: selectSpecsName,
      //   });
      // } else {
      //   this.setData({
      //     selectedAttrStr: '',
      //   });
      // }
    },

    gotoBuy(type) {
      if (!this.properties.isStock) return;

      const { isAllSelectedSku, buyNum } = this.data;
      if (!isAllSelectedSku) {
        Toast({
          context: this,
          selector: '#t-toast',
          message: '请选择规格',
          icon: '',
          duration: 1000,
        });
        return;
      }
      const query = {
        quantity: buyNum,
        storeId: '1',
        // spuId: this.data.spuId,
        productName: this.data.product.name,
        skuId:
          type === 1 ? this.data.skuList[0].skuId : this.data.selectItem.skuId,
        available: this.data.product.available,
        price: this.data.selectSkuSellsPrice,
        specInfo: this.data.product.specList?.map((item) => ({
          specTitle: item.title,
          specValue: item.specValueList.filter((v) => v.isSelected)[0].specValue
          // [0].specValue,
        })),
        primaryImage: this.data.product.primaryImage,
        spuId: this.data.product.spuId,
        thumb: this.data.product.primaryImage,
        title: this.data.product.title,
      };
      console.log('跳转', query, this.data);
      // let urlQueryStr = obj2Params({
      //   productRequestList: JSON.stringify([query]),
      //   skuId: query.skuId,
      // });
      // urlQueryStr = urlQueryStr ? `?${urlQueryStr}` : '';
      // const path = `/pages/order/product-design/index${urlQueryStr}`;
      // const path = `/pages/order/order-confirm/index`;
      app.globalData.fromProductOrderData = {
        productRequestList: query,
        skuId: query.skuId,
        product: this.data.product,
      };
      // wx.switchTab({
      //   url: '/pages/gallery/index',
      // });

      this.triggerEvent('specsConfirm');
    },
  },
});
