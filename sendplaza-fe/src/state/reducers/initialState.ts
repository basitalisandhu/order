export const app = {
  common: {
    orders: [],
    shippers: [],
    credentials: [],
    postmenKeys: [],
    orderErrors: [],
    selectedTab: "open-orders",
    label: {
      labels: [],
      limit: 100,
      next_token: null,
    },
  },
};

export const landing = {
  loading: false,
};

export const auth = {
  userState: {},
  showChangePassword: false,
};

export const user = {
  showEditInfo: false,
  showAdminInfo: false,
  current: { user: {} },
  users: [],
  stats: [],
  note: "",
  targetedUser: {
    user: {},
    note: [],
  },
};

export const product = {
  opportunity: {
    current: {
      _id: null,
      media: [],
      docs: { extras: [], proof_of_lading: [], sgs: [], manifest: [] },
    },
    stats: {
      stats: [],
      totalViews: 0,
    },
    list: [],
    listFilter: {
      sortBy: "updated_at",
      sortScale: 1,
    },
    popular: { opportunities: [], page: 0 },
    just_for_you: { opportunities: [], page: 0 },
    recently_added: { opportunities: [], page: 0 },
    opportunitiesStats: [],
    notes: [],
    categories: [],
    popularCategories: [],
  },
  bids: {
    current: {
      status: "",
      price_per_unit: 0,
      fund_method: { docs: [] },
      opportunity: {},
    },
    list: [],
    count: 0,
    stats: {},
  },
};
