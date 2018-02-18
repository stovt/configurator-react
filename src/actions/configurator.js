export const toggleDownloadAvailableFlag = () => ({
  type: 'TOGGLE_CONFIGURATOR_DOWNLOAD_FLAG'
});

export const toggleWishlistAvailableFlag = () => ({
  type: 'TOGGLE_CONFIGURATOR_WISHLIST_FLAG'
});

export const toggleConfiguratorOnlineFlag = () => ({
  type: 'TOGGLE_CONFIGURATOR_ONLINE_FLAG'
});

export const changeConfiguratorTitle = (text) => ({
  type: 'CHANGE_CONFIGURATOR_TITLE',
  text
});