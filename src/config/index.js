const envConfig = process.env;
export const configUrls = {
  GetLocales: envConfig.REACT_APP_GET_LOCALES,
  GetConfiguratorsIds: envConfig.REACT_APP_GET_CONFIGURATOR_IDS,
  RemoveConfigurator: envConfig.REACT_APP_REMOVE_CONFIGURATOR,
  GetConfiguratorByID: envConfig.REACT_APP_GET_CONFIGURATOR_BY_ID,
  GetAllProducts: envConfig.REACT_APP_GET_ALL_PRODUCTS,
  GetProductByID: envConfig.REACT_APP_GET_PRODUCT_BY_ID,
  UploadImage: envConfig.REACT_APP_UPLOAD_IMAGE,
  SaveConfigurator: envConfig.REACT_APP_SAVE_CONFIGURATOR,
  GetPreviewUrl: envConfig.REACT_APP_GET_PREVIEW_URL
};
