import defaultSettings from '@/settings'

const title = defaultSettings.title || '蒲公英网校管理'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
