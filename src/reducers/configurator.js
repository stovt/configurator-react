import { combineReducers } from 'redux';


export const getActiveConfiguratorID = state => state.configurators.active.config.configuratorID;
export const getActiveConfigurator = state => (
  getActiveConfiguratorID(state) ? state.configurators.active : null
);
export const getDownloadAvailableFlag = state => (
  state.configurators.active.config.global.isDownloadAvailable
);
export const getWishlistAvailableFlag = state => (
  state.configurators.active.config.global.isWishlistAvailable
);
export const getConfiguratorOnlineFlag = state => state.configurators.active.config.global.isOnline;
export const getConfiguratorTitle = state => state.configurators.active.config.global.title;

export const getFolders = state => state.configurators.active.config.baseConfigs;
export const getFolderByUniqueID = (folders, id) => folders.find(f => f.uniqueID === id);
export const getFolderProductByID = (folder, id) => folder.productIDs.find(p => p.productID === id);
export const getFoldersProducts = (state) => {
  let products = [];
  let productIDs = [];
  state.configurators.active.config.baseConfigs.forEach((config) => {
    config.productIDs.forEach((product) => {
      if (productIDs.indexOf(product.productID) === -1) {
        productIDs = [...productIDs, product.productID];
        products = [...products, product];
      }
    });
  });
  return products;
};
export const getFolderProductIDs = (state, folder) => folder.productIDs.map(p => p.productID);
export const getAccessories = state => state.configurators.active.config.accessories;
export const getAccessoryProductByID = (acc, id) => acc.find(p => p.productID === id);
export const getAccessoryProductIDs = state => (
  state.configurators.active.config.accessories.map(p => p.productID)
);
export const getVariationByID = (variations, variationID) => (
  variations.find(v => v.variationID === variationID)
);
export const getAllProductIDs = (state) => {
  let productIDs = [];
  state.configurators.active.config.baseConfigs.forEach((config) => {
    productIDs = [...productIDs, ...config.productIDs.map(p => p.productID)];
  });
  productIDs = [
    ...productIDs,
    ...state.configurators.active.config.accessories.map(p => p.productID)
  ];

  return productIDs;
};
export const getAllProducts = (state) => {
  let products = [];
  let productIDs = [];
  state.configurators.active.config.baseConfigs.forEach((config) => {
    config.productIDs.forEach((product) => {
      if (productIDs.indexOf(product.productID) === -1) {
        productIDs = [...productIDs, product.productID];
        products = [...products, product];
      }
    });
  });

  return [...products, ...state.configurators.active.config.accessories];
};

export const getFixedOrderProducts = (state) => {
  let baseConfigProducts = [];
  state.configurators.active.config.baseConfigs.forEach((config) => {
    config.productIDs.forEach((product) => {
      const baseConfigProduct = {
        productID: product.productID,
        productName: product.productName,
        realImage: product.realImage,
        order: product.order,
        baseConfigID: config.uniqueID
      };
      baseConfigProducts = [...baseConfigProducts, baseConfigProduct];
    });
  });

  let accessoryProducts = [];
  state.configurators.active.config.accessories.forEach((product) => {
    const accessoryProduct = {
      productID: product.productID,
      productName: product.productName,
      realImage: product.realImage,
      order: product.order,
      accessory: true
    };
    accessoryProducts = [...accessoryProducts, accessoryProduct];
  });

  let allProducts = [...baseConfigProducts, ...accessoryProducts];

  const compareNumeric = (a, b) => {
    if ((a.order + 1) > (b.order + 1)) return 1;
    if ((a.order + 1) < (b.order + 1)) return -1;
    return 0;
  };
  allProducts.sort(compareNumeric);

  let order = 1;
  allProducts = allProducts.map((product) => {
    const p = {
      ...product,
      order
    };
    order += 1;
    return p;
  });

  return {
    allProducts,
    nextOrder: order
  };
};

export const getOrderProducts = (state) => {
  let baseConfigProducts = [];
  state.configurators.active.config.baseConfigs.forEach((config) => {
    config.productIDs.forEach((product) => {
      const baseConfigProduct = {
        productID: product.productID,
        productName: product.productName,
        realImage: product.realImage,
        order: product.order,
        baseConfigID: config.uniqueID
      };
      baseConfigProducts = [...baseConfigProducts, baseConfigProduct];
    });
  });

  let accessoryProducts = [];
  state.configurators.active.config.accessories.forEach((product) => {
    const accessoryProduct = {
      productID: product.productID,
      productName: product.productName,
      realImage: product.realImage,
      order: product.order,
      accessory: true
    };
    accessoryProducts = [...accessoryProducts, accessoryProduct];
  });

  const allProducts = [...baseConfigProducts, ...accessoryProducts];

  const compareNumeric = (a, b) => {
    if ((a.order + 1) > (b.order + 1)) return 1;
    if ((a.order + 1) < (b.order + 1)) return -1;
    return 0;
  };
  allProducts.sort(compareNumeric);

  return allProducts;
};

const globalAttributes = (state = {
  isDownloadAvailable: true,
  isWishlistAvailable: true,
  title: null,
  isOnline: true
}, action) => {
  switch (action.type) {
    case 'CREATE_CONFIGURATOR':
      return {
        isDownloadAvailable: true,
        isWishlistAvailable: true,
        title: null,
        isOnline: true
      };
    case 'SELECT_CONFIGURATOR_SUCCESS':
      return action.configurator.config.global;
    case 'TOGGLE_CONFIGURATOR_DOWNLOAD_FLAG':
      return {
        ...state,
        isDownloadAvailable: !state.isDownloadAvailable
      };
    case 'TOGGLE_CONFIGURATOR_WISHLIST_FLAG':
      return {
        ...state,
        isWishlistAvailable: !state.isWishlistAvailable
      };
    case 'TOGGLE_CONFIGURATOR_ONLINE_FLAG':
      return {
        ...state,
        isOnline: !state.isOnline
      };
    case 'CHANGE_CONFIGURATOR_TITLE':
      return {
        ...state,
        title: action.text
      };
    default:
      return state;
  }
};

const configuratorID = (state = null, action) => {
  switch (action.type) {
    case 'CREATE_CONFIGURATOR':
      return action.id;
    case 'SELECT_CONFIGURATOR_SUCCESS':
      return action.configurator.config.configuratorID;
    default:
      return state;
  }
};

const baseConfigs = (state = [], action) => {
  switch (action.type) {
    case 'CREATE_CONFIGURATOR':
      return [];
    case 'SELECT_CONFIGURATOR_SUCCESS':
      return action.configurator.config.baseConfigs;
    case 'CHANGE_BASE_CONFIG_ID':
      return [
        ...state.slice(0, state.indexOf(action.folder)),
        { ...action.folder, baseConfigID: action.text },
        ...state.slice(state.indexOf(action.folder) + 1)
      ];
    case 'CHANGE_BASE_CONFIG_TITLE':
      return [
        ...state.slice(0, state.indexOf(action.folder)),
        { ...action.folder, baseConfigTitle: action.text },
        ...state.slice(state.indexOf(action.folder) + 1)
      ];
    case 'CHANGE_BASE_CONFIG_SUBTITLE':
      return [
        ...state.slice(0, state.indexOf(action.folder)),
        { ...action.folder, baseConfigSubtitle: action.text },
        ...state.slice(state.indexOf(action.folder) + 1)
      ];
    case 'CHANGE_BASE_CONFIG_DESCRIPTION':
      return [
        ...state.slice(0, state.indexOf(action.folder)),
        { ...action.folder, baseConfigDescription: action.text },
        ...state.slice(state.indexOf(action.folder) + 1)
      ];
    case 'REMOVE_BASE_CONFIG':
      return [
        ...state.slice(0, state.indexOf(action.folder)),
        ...state.slice(state.indexOf(action.folder) + 1)
      ];
    case 'ADD_BASE_CONFIG':
      return [...state, action.config];
    case 'UPLOAD_BASE_CONFIG_IMAGE':
      return [
        ...state.slice(0, state.indexOf(action.folder)),
        { ...action.folder, baseConfigImage: action.image },
        ...state.slice(state.indexOf(action.folder) + 1)
      ];
    case 'UPLOAD_BASE_CONFIG_PRODUCT_IMAGE':
      return [
        ...state.slice(0, state.indexOf(action.folder)),
        {
          ...action.folder,
          productIDs: [
            ...action.folder.productIDs.slice(0, action.folder.productIDs.indexOf(action.product)),
            { ...action.product, realImage: action.image },
            ...action.folder.productIDs.slice(action.folder.productIDs.indexOf(action.product) + 1)
          ]
        },
        ...state.slice(state.indexOf(action.folder) + 1)
      ];
    case 'ADD_BASE_CONFIG_PRODUCT':
      return [
        ...state.slice(0, state.indexOf(action.folder)),
        {
          ...action.folder,
          productIDs: [
            ...action.folder.productIDs,
            action.product
          ]
        },
        ...state.slice(state.indexOf(action.folder) + 1)
      ];
    case 'REMOVE_BASE_CONFIG_PRODUCT':
      return [
        ...state.slice(0, state.indexOf(action.folder)),
        {
          ...action.folder,
          productIDs: [
            ...action.folder.productIDs.slice(0, action.folder.productIDs.indexOf(action.product)),
            ...action.folder.productIDs.slice(action.folder.productIDs.indexOf(action.product) + 1)
          ]
        },
        ...state.slice(state.indexOf(action.folder) + 1)
      ];
    case 'CHANGE_BASE_CONFIG_PRODUCT_TITLE':
      return [
        ...state.slice(0, state.indexOf(action.folder)),
        {
          ...action.folder,
          productIDs: [
            ...action.folder.productIDs.slice(0, action.folder.productIDs.indexOf(action.product)),
            { ...action.product, productName: action.text },
            ...action.folder.productIDs.slice(action.folder.productIDs.indexOf(action.product) + 1)
          ]
        },
        ...state.slice(state.indexOf(action.folder) + 1)
      ];
    case 'CHANGE_BASE_CONFIG_PRODUCT_SHORT_TITLE':
      return [
        ...state.slice(0, state.indexOf(action.folder)),
        {
          ...action.folder,
          productIDs: [
            ...action.folder.productIDs.slice(0, action.folder.productIDs.indexOf(action.product)),
            { ...action.product, productShortName: action.text },
            ...action.folder.productIDs.slice(action.folder.productIDs.indexOf(action.product) + 1)
          ]
        },
        ...state.slice(state.indexOf(action.folder) + 1)
      ];
    case 'CHANGE_BASE_CONFIG_PRODUCT_DESCRIPTION':
      return [
        ...state.slice(0, state.indexOf(action.folder)),
        {
          ...action.folder,
          productIDs: [
            ...action.folder.productIDs.slice(0, action.folder.productIDs.indexOf(action.product)),
            { ...action.product, description: action.text },
            ...action.folder.productIDs.slice(action.folder.productIDs.indexOf(action.product) + 1)
          ]
        },
        ...state.slice(state.indexOf(action.folder) + 1)
      ];
    case 'SELECT_BASE_CONFIG_REUSABLE_PRODUCT':
      return [
        ...state.slice(0, state.indexOf(action.folder)),
        {
          ...action.folder,
          productIDs: [
            ...action.folder.productIDs.slice(0, action.folder.productIDs.indexOf(action.product)),
            { ...action.product, reusePartsFromProductID: action.id },
            ...action.folder.productIDs.slice(action.folder.productIDs.indexOf(action.product) + 1)
          ]
        },
        ...state.slice(state.indexOf(action.folder) + 1)
      ];
    case 'REFRESH_BASE_CONFIG_PRODUCT':
      return [
        ...state.slice(0, state.indexOf(action.folder)),
        {
          ...action.folder,
          productIDs: [
            ...action.folder.productIDs.slice(
              0, action.folder.productIDs.indexOf(action.oldProduct)
            ),
            {
              ...action.product,
              productShortName: action.oldProduct.productShortName,
              realImage: action.oldProduct.realImage,
              variations: action.product.variations.map((variation) => {
                const oldProductVariation = action.oldProduct.variations.find(
                  v => v.variationID === variation.variationID
                );
                if (oldProductVariation) {
                  return {
                    ...variation,
                    realImage: oldProductVariation.realImage,
                    swatchImage: oldProductVariation.swatchImage,
                    thumbnailImage: oldProductVariation.thumbnailImage,
                    imageVariations: oldProductVariation.imageVariations
                  };
                }
                return variation;
              }),
              order: action.oldProduct.order
            },
            ...action.folder.productIDs.slice(
              action.folder.productIDs.indexOf(action.oldProduct) + 1
            )
          ]
        },
        ...state.slice(state.indexOf(action.folder) + 1)
      ];
    case 'TOGGLE_BASE_CONFIG_VARIATION_ENABLE':
      return [
        ...state.slice(0, state.indexOf(action.folder)),
        {
          ...action.folder,
          productIDs: [
            ...action.folder.productIDs.slice(0, action.folder.productIDs.indexOf(action.product)),
            {
              ...action.product,
              variations: [
                ...action.product.variations.slice(
                  0, action.product.variations.indexOf(action.variation)
                ),
                { ...action.variation, enabled: !action.variation.enabled },
                ...action.product.variations.slice(
                  action.product.variations.indexOf(action.variation) + 1
                )
              ]
            },
            ...action.folder.productIDs.slice(action.folder.productIDs.indexOf(action.product) + 1)
          ]
        },
        ...state.slice(state.indexOf(action.folder) + 1)
      ];
    case 'TOGGLE_BASE_CONFIG_VARIATION_DEFAULT':
      return [
        ...state.slice(0, state.indexOf(action.folder)),
        {
          ...action.folder,
          productIDs: [
            ...action.folder.productIDs.slice(0, action.folder.productIDs.indexOf(action.product)),
            {
              ...action.product,
              variations: action.product.variations.map((v) => {
                if (!action.variation.isDefaultVariation
                  && v.variationID === action.variation.variationID
                ) {
                  return { ...v, isDefaultVariation: !action.variation.isDefaultVariation };
                }
                return { ...v, isDefaultVariation: false };
              })
            },
            ...action.folder.productIDs.slice(action.folder.productIDs.indexOf(action.product) + 1)
          ]
        },
        ...state.slice(state.indexOf(action.folder) + 1)
      ];
    case 'TOGGLE_ACCESSORY_PRESELECTED':
      return [
        ...state.slice(0, state.indexOf(action.folder)),
        (action.folder.accessoryIDs.indexOf(action.accessoryID) !== -1
          ? {
            ...action.folder,
            accessoryIDs: [
              ...action.folder.accessoryIDs.slice(
                0, action.folder.accessoryIDs.indexOf(action.accessoryID)
              ),
              ...action.folder.accessoryIDs.slice(
                action.folder.accessoryIDs.indexOf(action.accessoryID) + 1
              )
            ]
          }
          : {
            ...action.folder,
            accessoryIDs: [
              ...action.folder.accessoryIDs,
              action.accessoryID
            ]
          }
        ),
        ...state.slice(state.indexOf(action.folder) + 1)
      ];
    case 'TOGGLE_ACCESSORY_REQUIRE':
      return [
        ...state.slice(0, state.indexOf(action.folder)),
        (action.folder.requiredBaseConfigProductIDs.indexOf(action.accessoryID) !== -1
          ? {
            ...action.folder,
            requiredBaseConfigProductIDs: [
              ...action.folder.requiredBaseConfigProductIDs.slice(
                0, action.folder.requiredBaseConfigProductIDs.indexOf(action.accessoryID)
              ),
              ...action.folder.requiredBaseConfigProductIDs.slice(
                action.folder.requiredBaseConfigProductIDs.indexOf(action.accessoryID) + 1
              )
            ]
          }
          : {
            ...action.folder,
            requiredBaseConfigProductIDs: [
              ...action.folder.requiredBaseConfigProductIDs,
              action.accessoryID
            ]
          }
        ),
        ...state.slice(state.indexOf(action.folder) + 1)
      ];
    case 'UPLOAD_BASE_CONFIG_PRODUCT_VARIATION_REAL_IMAGE':
      return [
        ...state.slice(0, state.indexOf(action.folder)),
        {
          ...action.folder,
          productIDs: [
            ...action.folder.productIDs.slice(0, action.folder.productIDs.indexOf(action.product)),
            {
              ...action.product,
              variations: [
                ...action.product.variations.slice(
                  0, action.product.variations.indexOf(action.variation)
                ),
                { ...action.variation, realImage: action.image },
                ...action.product.variations.slice(
                  action.product.variations.indexOf(action.variation) + 1
                )
              ]
            },
            ...action.folder.productIDs.slice(action.folder.productIDs.indexOf(action.product) + 1)
          ]
        },
        ...state.slice(state.indexOf(action.folder) + 1)
      ];
    case 'UPLOAD_BASE_CONFIG_PRODUCT_VARIATION_SWATCH_IMAGE':
      return [
        ...state.slice(0, state.indexOf(action.folder)),
        {
          ...action.folder,
          productIDs: [
            ...action.folder.productIDs.slice(0, action.folder.productIDs.indexOf(action.product)),
            {
              ...action.product,
              variations: [
                ...action.product.variations.slice(
                  0, action.product.variations.indexOf(action.variation)
                ),
                { ...action.variation, swatchImage: action.image },
                ...action.product.variations.slice(
                  action.product.variations.indexOf(action.variation) + 1
                )
              ]
            },
            ...action.folder.productIDs.slice(action.folder.productIDs.indexOf(action.product) + 1)
          ]
        },
        ...state.slice(state.indexOf(action.folder) + 1)
      ];
    case 'UPLOAD_BASE_CONFIG_PRODUCT_VARIATION_THUMB_IMAGE':
      return [
        ...state.slice(0, state.indexOf(action.folder)),
        {
          ...action.folder,
          productIDs: [
            ...action.folder.productIDs.slice(0, action.folder.productIDs.indexOf(action.product)),
            {
              ...action.product,
              variations: [
                ...action.product.variations.slice(
                  0, action.product.variations.indexOf(action.variation)
                ),
                { ...action.variation, thumbnailImage: action.image },
                ...action.product.variations.slice(
                  action.product.variations.indexOf(action.variation) + 1
                )
              ]
            },
            ...action.folder.productIDs.slice(action.folder.productIDs.indexOf(action.product) + 1)
          ]
        },
        ...state.slice(state.indexOf(action.folder) + 1)
      ];
    case 'ADD_BASE_CONFIG_IMAGE_VARIATION': {
      if (action.variation.imageVariations) {
        const imageVariationIDs = action.variation.imageVariations.map(v => v.productID);
        if (imageVariationIDs.indexOf(action.id) !== -1) {
          return state;
        }
      }

      return [
        ...state.slice(0, state.indexOf(action.folder)),
        {
          ...action.folder,
          productIDs: [
            ...action.folder.productIDs.slice(0, action.folder.productIDs.indexOf(action.product)),
            {
              ...action.product,
              variations: [
                ...action.product.variations.slice(
                  0, action.product.variations.indexOf(action.variation)
                ),
                (action.variation.imageVariations
                  ? {
                    ...action.variation,
                    imageVariations: [
                      ...action.variation.imageVariations,
                      {
                        productID: action.id,
                        realImage: false,
                        productName: action.name
                      }
                    ]
                  }
                  : {
                    ...action.product.variation,
                    imageVariations: [
                      {
                        productID: action.id,
                        realImage: false,
                        productName: action.name
                      }
                    ]
                  }
                ),
                ...action.product.variations.slice(
                  action.product.variations.indexOf(action.variation) + 1
                )
              ]
            },
            ...action.folder.productIDs.slice(action.folder.productIDs.indexOf(action.product) + 1)
          ]
        },
        ...state.slice(state.indexOf(action.folder) + 1)
      ];
    }
    case 'REMOVE_BASE_CONFIG_IMAGE_VARIATION':
      return [
        ...state.slice(0, state.indexOf(action.folder)),
        {
          ...action.folder,
          productIDs: [
            ...action.folder.productIDs.slice(0, action.folder.productIDs.indexOf(action.product)),
            {
              ...action.product,
              variations: [
                ...action.product.variations.slice(
                  0, action.product.variations.indexOf(action.variation)
                ),
                {
                  ...action.variation,
                  imageVariations: [
                    ...action.variation.imageVariations.slice(
                      0, action.variation.imageVariations.indexOf(action.imageVariation)
                    ),
                    ...action.variation.imageVariations.slice(
                      action.variation.imageVariations.indexOf(action.imageVariation) + 1
                    )
                  ]
                },
                ...action.product.variations.slice(
                  action.product.variations.indexOf(action.variation) + 1
                )
              ]
            },
            ...action.folder.productIDs.slice(action.folder.productIDs.indexOf(action.product) + 1)
          ]
        },
        ...state.slice(state.indexOf(action.folder) + 1)
      ];
    case 'UPLOAD_BASE_CONFIG_IMAGE_VARIATION': {
      return [
        ...state.slice(0, state.indexOf(action.folder)),
        {
          ...action.folder,
          productIDs: [
            ...action.folder.productIDs.slice(0, action.folder.productIDs.indexOf(action.product)),
            {
              ...action.product,
              variations: [
                ...action.product.variations.slice(
                  0, action.product.variations.indexOf(action.variation)
                ),
                {
                  ...action.variation,
                  imageVariations: [
                    ...action.variation.imageVariations.slice(
                      0, action.variation.imageVariations.indexOf(action.imageVariation)
                    ),
                    { ...action.imageVariation, realImage: action.image },
                    ...action.variation.imageVariations.slice(
                      action.variation.imageVariations.indexOf(action.imageVariation) + 1
                    )
                  ]
                },
                ...action.product.variations.slice(
                  action.product.variations.indexOf(action.variation) + 1
                )
              ]
            },
            ...action.folder.productIDs.slice(action.folder.productIDs.indexOf(action.product) + 1)
          ]
        },
        ...state.slice(state.indexOf(action.folder) + 1)
      ];
    }
    case 'SET_BASE_CONFIG_PRODUCT_ORDER': {
      const folder = getFolderByUniqueID(state, action.baseConfigID);
      const product = getFolderProductByID(folder, action.productID);
      return [
        ...state.slice(0, state.indexOf(folder)),
        {
          ...folder,
          productIDs: [
            ...folder.productIDs.slice(0, folder.productIDs.indexOf(product)),
            { ...product, order: action.order },
            ...folder.productIDs.slice(folder.productIDs.indexOf(product) + 1)
          ]
        },
        ...state.slice(state.indexOf(folder) + 1)
      ];
    }
    default:
      return state;
  }
};

const accessories = (state = [], action) => {
  switch (action.type) {
    case 'CREATE_CONFIGURATOR':
      return [];
    case 'SELECT_CONFIGURATOR_SUCCESS':
      return action.configurator.config.accessories;
    case 'ADD_ACCESSORY_PRODUCT':
      return [
        ...state,
        action.product
      ];
    case 'UPLOAD_ACCESSORY_PRODUCT_IMAGE':
      return [
        ...state.slice(0, state.indexOf(action.product)),
        { ...action.product, realImage: action.image },
        ...state.slice(state.indexOf(action.product) + 1)
      ];
    case 'REMOVE_ACCESSORY_PRODUCT':
      return [
        ...state.slice(0, state.indexOf(action.product)),
        ...state.slice(state.indexOf(action.product) + 1)
      ];
    case 'CHANGE_ACCESSORY_PRODUCT_TITLE':
      return [
        ...state.slice(0, state.indexOf(action.product)),
        { ...action.product, productName: action.text },
        ...state.slice(state.indexOf(action.product) + 1)
      ];
    case 'CHANGE_ACCESSORY_PRODUCT_SHORT_TITLE':
      return [
        ...state.slice(0, state.indexOf(action.product)),
        { ...action.product, productShortName: action.text },
        ...state.slice(state.indexOf(action.product) + 1)
      ];
    case 'CHANGE_ACCESSORY_PRODUCT_DESCRIPTION':
      return [
        ...state.slice(0, state.indexOf(action.product)),
        { ...action.product, description: action.text },
        ...state.slice(state.indexOf(action.product) + 1)
      ];
    case 'REFRESH_ACCESSORY_PRODUCT':
      return [
        ...state.slice(0, state.indexOf(action.oldProduct)),
        {
          ...action.product,
          productShortName: action.oldProduct.productShortName,
          realImage: action.oldProduct.realImage,
          variations: action.product.variations.map((variation) => {
            const oldProductVariation = action.oldProduct.variations.find(
              v => v.variationID === variation.variationID
            );
            if (oldProductVariation) {
              return {
                ...variation,
                realImage: oldProductVariation.realImage,
                swatchImage: oldProductVariation.swatchImage,
                thumbnailImage: oldProductVariation.thumbnailImage,
                imageVariations: oldProductVariation.imageVariations
              };
            }
            return variation;
          }),
          isExternalAccessory: action.oldProduct.isExternalAccessory,
          requiredAccessoryID: action.oldProduct.requiredAccessoryID,
          order: action.oldProduct.order
        },
        ...state.slice(state.indexOf(action.oldProduct) + 1)
      ];
    case 'SELECT_ACCESSORY_REQUIRED':
      return [
        ...state.slice(0, state.indexOf(action.product)),
        { ...action.product, requiredAccessoryID: action.id },
        ...state.slice(state.indexOf(action.product) + 1)
      ];
    case 'SELECT_ACCESSORY_REUSABLE_PRODUCT':
      return [
        ...state.slice(0, state.indexOf(action.product)),
        { ...action.product, reusePartsFromProductID: action.id },
        ...state.slice(state.indexOf(action.product) + 1)
      ];
    case 'TOGGLE_ACCESSORY_VARIATION_ENABLE':
      return [
        ...state.slice(0, state.indexOf(action.product)),
        {
          ...action.product,
          variations: [
            ...action.product.variations.slice(
              0, action.product.variations.indexOf(action.variation)
            ),
            { ...action.variation, enabled: !action.variation.enabled },
            ...action.product.variations.slice(
              action.product.variations.indexOf(action.variation) + 1
            )
          ]
        },
        ...state.slice(state.indexOf(action.product) + 1)
      ];
    case 'TOGGLE_ACCESSORY_EXTERNAL':
      return [
        ...state.slice(0, state.indexOf(action.product)),
        { ...action.product, isExternalAccessory: !action.product.isExternalAccessory },
        ...state.slice(state.indexOf(action.product) + 1)
      ];
    case 'TOGGLE_ACCESSORY_VARIATION_DEFAULT':
      return [
        ...state.slice(0, state.indexOf(action.product)),
        {
          ...action.product,
          variations: action.product.variations.map((v) => {
            if (!action.variation.isDefaultVariation
              && v.variationID === action.variation.variationID
            ) {
              return { ...v, isDefaultVariation: !action.variation.isDefaultVariation };
            }
            return { ...v, isDefaultVariation: false };
          })
        },
        ...state.slice(state.indexOf(action.product) + 1)
      ];
    case 'UPLOAD_ACCESSORY_PRODUCT_VARIATION_REAL_IMAGE':
      return [
        ...state.slice(0, state.indexOf(action.product)),
        {
          ...action.product,
          variations: [
            ...action.product.variations.slice(
              0, action.product.variations.indexOf(action.variation)
            ),
            { ...action.variation, realImage: action.image },
            ...action.product.variations.slice(
              action.product.variations.indexOf(action.variation) + 1
            )
          ]
        },
        ...state.slice(state.indexOf(action.product) + 1)
      ];
    case 'UPLOAD_ACCESSORY_PRODUCT_VARIATION_SWATCH_IMAGE':
      return [
        ...state.slice(0, state.indexOf(action.product)),
        {
          ...action.product,
          variations: [
            ...action.product.variations.slice(
              0, action.product.variations.indexOf(action.variation)
            ),
            { ...action.variation, swatchImage: action.image },
            ...action.product.variations.slice(
              action.product.variations.indexOf(action.variation) + 1
            )
          ]
        },
        ...state.slice(state.indexOf(action.product) + 1)
      ];
    case 'UPLOAD_ACCESSORY_PRODUCT_VARIATION_THUMB_IMAGE':
      return [
        ...state.slice(0, state.indexOf(action.product)),
        {
          ...action.product,
          variations: [
            ...action.product.variations.slice(
              0, action.product.variations.indexOf(action.variation)
            ),
            { ...action.variation, thumbnailImage: action.image },
            ...action.product.variations.slice(

              action.product.variations.indexOf(action.variation) + 1
            )
          ]
        },
        ...state.slice(state.indexOf(action.product) + 1)
      ];
    case 'ADD_ACCESSORY_IMAGE_VARIATION': {
      if (action.variation.imageVariations) {
        const imageVariationIDs = action.variation.imageVariations.map(v => v.productID);
        if (imageVariationIDs.indexOf(action.id) !== -1) {
          return state;
        }
      }

      return [
        ...state.slice(0, state.indexOf(action.product)),
        {
          ...action.product,
          variations: [
            ...action.product.variations.slice(
              0, action.product.variations.indexOf(action.variation)
            ),
            (action.variation.imageVariations
              ? {
                ...action.variation,
                imageVariations: [
                  ...action.variation.imageVariations,
                  {
                    productID: action.id,
                    realImage: false,
                    productName: action.name
                  }
                ]
              }
              : {
                ...action.product.variation,
                imageVariations: [
                  {
                    productID: action.id,
                    realImage: false,
                    productName: action.name
                  }
                ]
              }
            ),
            ...action.product.variations.slice(
              action.product.variations.indexOf(action.variation) + 1
            )
          ]
        },
        ...state.slice(state.indexOf(action.product) + 1)
      ];
    }
    case 'REMOVE_ACCESSORY_IMAGE_VARIATION':
      return [
        ...state.slice(0, state.indexOf(action.product)),
        {
          ...action.product,
          variations: [
            ...action.product.variations.slice(
              0, action.product.variations.indexOf(action.variation)
            ),
            {
              ...action.variation,
              imageVariations: [
                ...action.variation.imageVariations.slice(
                  0, action.variation.imageVariations.indexOf(action.imageVariation)
                ),
                ...action.variation.imageVariations.slice(
                  action.variation.imageVariations.indexOf(action.imageVariation) + 1
                )
              ]
            },
            ...action.product.variations.slice(
              action.product.variations.indexOf(action.variation) + 1
            )
          ]
        },
        ...state.slice(state.indexOf(action.product) + 1)
      ];
    case 'UPLOAD_ACCESSORY_IMAGE_VARIATION':
      return [
        ...state.slice(0, state.indexOf(action.product)),
        {
          ...action.product,
          variations: [
            ...action.product.variations.slice(
              0, action.product.variations.indexOf(action.variation)
            ),
            {
              ...action.variation,
              imageVariations: [
                ...action.variation.imageVariations.slice(
                  0, action.variation.imageVariations.indexOf(action.imageVariation)
                ),
                { ...action.imageVariation, realImage: action.image },
                ...action.variation.imageVariations.slice(
                  action.variation.imageVariations.indexOf(action.imageVariation) + 1
                )
              ]
            },
            ...action.product.variations.slice(
              action.product.variations.indexOf(action.variation) + 1
            )
          ]
        },
        ...state.slice(state.indexOf(action.product) + 1)
      ];
    case 'UP_ACCESSORY_PRODUCT': {
      const prevProduct = state[state.indexOf(action.product) - 1];
      if (prevProduct) {
        return [
          ...state.slice(0, state.indexOf(action.product) - 1),
          action.product,
          prevProduct,
          ...state.slice(state.indexOf(action.product) + 1)
        ];
      }
      return state;
    }
    case 'DOWN_ACCESSORY_PRODUCT': {
      const nextProduct = state[state.indexOf(action.product) + 1];
      if (nextProduct) {
        return [
          ...state.slice(0, state.indexOf(action.product)),
          nextProduct,
          action.product,
          ...state.slice(state.indexOf(action.product) + 2)
        ];
      }
      return state;
    }
    case 'SET_ACCESSORY_PRODUCT_ORDER': {
      const product = getAccessoryProductByID(state, action.productID);
      return [
        ...state.slice(0, state.indexOf(product)),
        { ...product, order: action.order },
        ...state.slice(state.indexOf(product) + 1)
      ];
    }
    default:
      return state;
  }
};

export default combineReducers({
  global: globalAttributes,
  configuratorID,
  baseConfigs,
  accessories
});
