// TODO: change these to your own values
// NOTE: rootNotionSpaceId is optional; set it to undefined if you don't want to
// use it.
export const rootNotionPageId = '905cae7ca4614c9da7f37936af40acf4'
export const rootNotionSpaceId = '5e944bd2-0eea-4c93-bb08-201a3b4a035e'

// NOTE: having this enabled can be pretty expensive as it re-generates preview
// images each time a page is built. In a production setting, we recommend that
// you cache the preview image results in a key-value database.
export const previewImagesEnabled = true

// Whether to use the official public Notion API or the unofficial private API.
// Note that the official API doesn't expose formatting options for many blocks
// and is currently not as well-supported.
// If you want to use the official API, you must provide a NOTION_TOKEN env var.
export const useOfficialNotionAPI =
  false ||
  (process.env.USE_OFFICIAL_NOTION_API === 'true' && process.env.NOTION_TOKEN)

export const isDev =
  process.env.NODE_ENV === 'development' || !process.env.NODE_ENV

export const port = process.env.PORT || 3000
export const rootDomain = isDev ? `localhost:${port}` : null
