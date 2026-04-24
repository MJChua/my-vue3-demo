import { defineStore } from 'pinia'

const STORAGE_KEY = 'petpals-user-content-v2'

const communityDiarySeed = Object.freeze([
  {
    id: 'community_001',
    title: 'Mochi learned to spin today',
    content: 'Shared a full training diary with snack rewards and hand signals.',
    author: 'Amy',
    filterType: 'latest',
    likes: 128,
    imageUrl: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=80&fm=webp',
    createdAt: '2026-04-20T08:30:00.000Z',
    source: 'community'
  },
  {
    id: 'community_002',
    title: 'Rainy day cat window diary',
    content: 'Our cat stayed by the window for two hours watching rain and birds.',
    author: 'Leo',
    filterType: 'popular',
    likes: 462,
    imageUrl: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1200&q=80&fm=webp',
    createdAt: '2026-04-18T06:00:00.000Z',
    source: 'community'
  },
  {
    id: 'community_003',
    title: 'Bunny-safe room setup notes',
    content: 'Cable sleeves, washable floor mats, and low-noise fans made a huge difference.',
    author: 'Nina',
    filterType: 'following',
    likes: 275,
    imageUrl: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=1200&q=80&fm=webp',
    createdAt: '2026-04-16T02:45:00.000Z',
    source: 'community'
  }
])

function createDefaultState () {
  return {
    profile: {
      displayName: 'Pet Lover',
      avatarUrl: ''
    },
    diaries: [],
    uploads: []
  }
}

function normalizeDiary (item) {
  return {
    id: item.id || `mine_diary_${Date.now()}`,
    title: item.title || '',
    content: item.content || '',
    filterType: item.filterType || 'latest',
    likes: Number(item.likes || 0),
    imageUrl: item.imageUrl || '',
    draft: Boolean(item.draft),
    createdAt: item.createdAt || new Date().toISOString()
  }
}

function normalizeUpload (item) {
  return {
    id: item.id || `mine_upload_${Date.now()}`,
    imageUrl: item.imageUrl || '',
    caption: item.caption || '',
    likes: Number(item.likes || 0),
    views: Number(item.views || 0),
    category: item.category || 'dog',
    diaryId: item.diaryId || null,
    createdAt: item.createdAt || new Date().toISOString()
  }
}

function parseStoredState (rawValue) {
  if (!rawValue) return createDefaultState()

  try {
    const parsedValue = JSON.parse(rawValue)
    const defaultState = createDefaultState()

    return {
      profile: {
        ...defaultState.profile,
        ...(parsedValue.profile || {})
      },
      diaries: Array.isArray(parsedValue.diaries) ? parsedValue.diaries.map(normalizeDiary) : [],
      uploads: Array.isArray(parsedValue.uploads) ? parsedValue.uploads.map(normalizeUpload) : []
    }
  } catch (error) {
    console.warn('Failed to parse user content state:', error)
    return createDefaultState()
  }
}

function loadInitialState () {
  if (typeof window === 'undefined') return createDefaultState()

  const rawValue = localStorage.getItem(STORAGE_KEY)
  return parseStoredState(rawValue)
}

function sortByCreatedAtDesc (list) {
  return [...list].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })
}

export const useUserContentStore = defineStore('userContent', {
  state: () => loadInitialState(),
  getters: {
    myDiaries (state) {
      return sortByCreatedAtDesc(state.diaries)
    },
    myPublishedDiaries (state) {
      return sortByCreatedAtDesc(state.diaries.filter((item) => !item.draft))
    },
    myUploads (state) {
      return sortByCreatedAtDesc(state.uploads)
    },
    communityDiaryFeed (state) {
      const myPosts = state.diaries
        .filter((item) => !item.draft)
        .map((item) => ({
          ...item,
          source: 'mine',
          author: state.profile.displayName || 'You'
        }))

      return sortByCreatedAtDesc([...communityDiarySeed, ...myPosts])
    },
    wallUploads (state) {
      return sortByCreatedAtDesc(state.uploads)
    }
  },
  actions: {
    persistState () {
      if (typeof window === 'undefined') return

      const payload = JSON.stringify({
        profile: this.profile,
        diaries: this.diaries,
        uploads: this.uploads
      })
      localStorage.setItem(STORAGE_KEY, payload)
    },
    setDisplayName (displayName) {
      this.profile.displayName = displayName
      this.persistState()
    },
    setAvatar (avatarUrl) {
      this.profile.avatarUrl = avatarUrl
      this.persistState()
    },
    addDiary ({ title, content, filterType = 'latest', draft = false, imageUrl = '' }) {
      const diaryId = `mine_diary_${Date.now()}`
      const newDiary = normalizeDiary({
        id: diaryId,
        title,
        content,
        filterType,
        likes: 0,
        imageUrl,
        draft
      })

      this.diaries = [newDiary, ...this.diaries]

      if (!draft && imageUrl) {
        this.addUpload({
          imageUrl,
          caption: title,
          category: 'dog',
          diaryId,
          isPetConfirmed: true,
          likes: 0,
          views: 0
        })
      } else {
        this.persistState()
      }

      return newDiary
    },
    removeDiary (id) {
      this.diaries = this.diaries.filter((item) => item.id !== id)
      this.uploads = this.uploads.filter((item) => item.diaryId !== id)
      this.persistState()
    },
    addUpload ({
      imageUrl,
      caption = '',
      category = 'dog',
      diaryId = null,
      isPetConfirmed = false,
      likes = 0,
      views = 0
    }) {
      if (!isPetConfirmed) {
        throw new Error('Only pet images are allowed.')
      }

      const newUpload = normalizeUpload({
        id: `mine_upload_${Date.now()}`,
        imageUrl,
        caption,
        likes,
        views,
        category,
        diaryId
      })

      this.uploads = [newUpload, ...this.uploads]
      this.persistState()
      return newUpload
    },
    removeUpload (id) {
      this.uploads = this.uploads.filter((item) => item.id !== id)
      this.persistState()
    },
    increaseUploadLike (id) {
      this.uploads = this.uploads.map((item) => {
        if (item.id !== id) return item
        return {
          ...item,
          likes: item.likes + 1
        }
      })
      this.persistState()
    }
  }
})
