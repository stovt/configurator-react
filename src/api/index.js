import axios from 'axios';
import { configUrls } from '../config';

export const fetchLocales = () => axios.get(configUrls.GetLocales).then((response) => {
  const localesArr = response.data.map((locale) => ({ ...locale, active: false }));
  if (localesArr.length > 1) {
    localesArr[1].active = true;
  } else {
    localesArr[0].active = true;
  }

  const localesObj = localesArr.reduce((acc, elem) => (
    {
      ...acc,
      [elem.localeID]: { id: elem.localeID, value: elem.localeValue, active: elem.active }
    }),
  {});
  return localesObj;
});

export const fetchConfiguratorsIds = () => axios.get(configUrls.GetConfiguratorsIds).then(
  (response) => response.data.reduce((acc, elem) => ({
    ...acc,
    [elem.id]: { ...elem }
  }),
  {})
);


export const selectConfigurator = (id, locale) => axios.get(configUrls.GetConfiguratorByID, {
  params: {
    pid: id,
    locale
  }
}).then((response) => response.data);


export const removeConfigurator = (id) => axios.get(configUrls.RemoveConfigurator, {
  params: {
    pid: id
  }
}).then(() => axios.get(configUrls.GetConfiguratorsIds)
  .then((response) => response.data.reduce((acc, elem) => ({
    ...acc,
    [elem.id]: { ...elem }
  }),
  {})));

export const uploadImage = (configuratorId, formData) => {
  if (process.env.NODE_ENV === 'production') {
    return axios.post(configUrls.UploadImage, formData, {
      params: {
        configuratorID: configuratorId
      },
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then((response) => response.data.imgUrl);
  }
  return axios.get(configUrls.UploadImage).then((response) => response.data.imgUrl);
};

export const fetchProducts = () => axios.get(configUrls.GetAllProducts)
  .then((response) => response.data);


export const getProductByID = (id, locale) => axios.get(configUrls.GetProductByID, {
  params: {
    pid: id,
    locale
  }
}).then((response) => response.data);

export const saveConfigurator = (configurator, locale) => {
  if (process.env.NODE_ENV === 'production') {
    return axios.post(configUrls.SaveConfigurator,
      `data=${encodeURIComponent(JSON.stringify(configurator.config))}`,
      {
        params: {
          locale,
          meta: JSON.stringify(configurator.meta)
        }
      }).then(
      (response) => (!!((response.data && response.data.success))), () => false
    );
  }
  return axios.get(configUrls.SaveConfigurator).then(() => true);
};

export const getPreviewUrl = (configuratorID, locale) => axios.get(configUrls.GetPreviewUrl, {
  params: {
    cid: configuratorID,
    locale,
    preview: true
  }
}).then((response) => response.data.url);
