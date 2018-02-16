import axios from 'axios';

export const fetchLocales = () =>
  axios.get(configUrls.GetLocales).then(response => {
    let localesArr =  response.data.map(locale => {
      return {...locale, 'active': false }
    });
    localesArr.length > 1 ? localesArr[1].active = true : localesArr[0].active = true;

    let localesObj = localesArr.reduce((acc, elem) => (
      { 
        ...acc, 
        [elem.localeID]: { 'id':elem.localeID, 'value':elem.localeValue, 'active': elem.active }
      }),
    {});
    return localesObj;
  });

export const fetchConfiguratorsIds = () =>
  axios.get(configUrls.GetConfiguratorsIds).then(response => {
    return response.data.reduce((acc, elem) => (
      { 
        ...acc, 
        [elem.id]: { ...elem }
      }),
    {});
  });


export const selectConfigurator = (id, locale) =>
  axios.get(configUrls.GetConfiguratorByID, {
    params: {
      pid: id,
      locale: locale
    }
  }).then((response) => {
    return response.data;
  });


export const removeConfigurator = (id) =>
  axios.get(configUrls.RemoveConfigurator, {
    params: {
      pid: id
    }
  }).then((response) => {
    return axios.get(configUrls.GetConfiguratorsIds).then(response => {
      return response.data.reduce((acc, elem) => (
        { 
          ...acc, 
          [elem.id]: { ...elem }
        }),
      {});
    });
  });