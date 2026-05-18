import { defineStore } from 'pinia'

const STORAGE_KEY = 'petpals-user-content-v1'

const communityDiarySeed = Object.freeze([
  {
    id: 'community_001',
    title: 'Mochi learned to spin today',
    content: 'Shared a full training diary with snack rewards and hand signals.',
    author: 'Amy',
    filterType: 'latest',
    likes: 128,
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
    createdAt: '2026-04-16T02:45:00.000Z',
    source: 'community'
  },
  {
    id: 'community_004',
    title: 'Parrot breakfast challenge',
    content: 'Tried a new toy puzzle and got ten minutes of focused solving time.',
    author: 'Mason',
    filterType: 'popular',
    likes: 390,
    createdAt: '2026-04-15T01:15:00.000Z',
    source: 'community'
  },
  {
    id: 'community_005',
    title: 'First day after adoption',
    content: 'Small wins today: finished dinner and finally slept in a soft nest bed.',
    author: 'Yuki',
    filterType: 'latest',
    likes: 210,
    createdAt: '2026-04-22T10:10:00.000Z',
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
      diaries: Array.isArray(parsedValue.diaries) ? parsedValue.diaries : [],
      uploads: Array.isArray(parsedValue.uploads) ? parsedValue.uploads : []
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
    myUploads (state) {
      return sortByCreatedAtDesc(state.uploads)
    },
    communityDiaryFeed (state) {
      const myPosts = state.diaries.map((item) => ({
        ...item,
        source: 'mine',
        author: state.profile.displayName || 'You',
        likes: item.likes || 0
      }))

      return sortByCreatedAtDesc([...communityDiarySeed, ...myPosts])
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
    addDiary ({ title, content, filterType = 'latest', draft = false }) {
      const newDiary = {
        id: `mine_diary_${Date.now()}`,
        title,
        content,
        filterType,
        likes: 0,
        draft,
        createdAt: new Date().toISOString()
      }

      this.diaries = [newDiary, ...this.diaries]
      this.persistState()
      return newDiary
    },
    removeDiary (id) {
      this.diaries = this.diaries.filter((item) => item.id !== id)
      this.persistState()
    },
    addUpload ({ imageUrl, caption = '' }) {
      const newUpload = {
        id: `mine_upload_${Date.now()}`,
        imageUrl,
        caption,
        createdAt: new Date().toISOString()
      }

      this.uploads = [newUpload, ...this.uploads]
      this.persistState()
      return newUpload
    },
    removeUpload (id) {
      this.uploads = this.uploads.filter((item) => item.id !== id)
      this.persistState()
    }
  }
})
