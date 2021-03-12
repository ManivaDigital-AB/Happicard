export const getChildData = (obj, key) => obj[key]

// Limited to only JSON supported types.
export const cloneDeepLimited = (obj) => JSON.parse(JSON.stringify(obj))

export const DeviceWidth = {
  minWebDeviceWidth: 768,
  maxMobileDeviceWidth: 767,
  chatMobileWidth: 768,
}

export const DeviceWidthForm = {
  minWebDeviceWidth: 768,
  maxMobileDeviceWidth: 575,
}