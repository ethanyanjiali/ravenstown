export const type = (syncAction) => {
  if (typeof syncAction === 'function') {
    return syncAction().type;
  }
  return syncAction.type;
};

export const makeAction = (actionType, payload) => ({
  type: actionType,
  payload,
});

export const createResourceActions = resource => ({
  FETCH_START: `${resource}/FETCH_START`,
  FETCH_SUCCESS: `${resource}/FETCH_SUCCESS`,
  FETCH_ERROR: `${resource}/FETCH_ERROR`,
  FETCH_ALL_START: `${resource}/FETCH_ALL_START`,
  FETCH_ALL_SUCCESS: `${resource}/FETCH_ALL_SUCCESS`,
  FETCH_ALL_ERROR: `${resource}/FETCH_ALL_ERROR`,
  FETCH_PARTIAL_START: `${resource}/FETCH_PARTIAL_START`,
  FETCH_PARTIAL_SUCCESS: `${resource}/FETCH_PARTIAL_SUCCESS`,
  FETCH_PARTIAL_ERROR: `${resource}/FETCH_PARTIAL_ERROR`,
  CREATE_START: `${resource}/CREATE_START`,
  CREATE_SUCCESS: `${resource}/CREATE_SUCCESS`,
  CREATE_ERROR: `${resource}/CREATE_ERROR`,
  UPDATE_START: `${resource}/UPDATE_START`,
  UPDATE_SUCCESS: `${resource}/UPDATE_SUCCESS`,
  UPDATE_ERROR: `${resource}/UPDATE_ERROR`,
  ASYNC_CREATE: `${resource}/ASYNC_CREATE`,
  ASYNC_UPDATE: `${resource}/ASYNC_UPDATE`,
  ASYNC_FETCH_ALL: `${resource}/ASYNC_FETCH_ALL`,
  ASYNC_FETCH_SINGLE: `${resource}/ASYNC_FETCH_SINGLE`,
});

export const createResourceReducer = resource => ({
  isFetching: (state = false, action) => {
    switch (action.type) {
      case `${resource}/FETCH_START`:
        return true;
      case `${resource}/FETCH_SUCCESS`:
        return false;
      case `${resource}/FETCH_ERROR`:
        return false;
      default:
        return state;
    }
  },
  isFetchingAll: (state = false, action) => {
    switch (action.type) {
      case `${resource}/FETCH_ALL_START`:
        return true;
      case `${resource}/FETCH_ALL_SUCCESS`:
        return false;
      case `${resource}/FETCH_ALL_ERROR`:
        return false;
      default:
        return state;
    }
  },
  isFetchingPartial: (state = false, action) => {
    switch (action.type) {
      case `${resource}/FETCH_PARTIAL_START`:
        return true;
      case `${resource}/FETCH_PARTIAL_SUCCESS`:
        return false;
      case `${resource}/FETCH_PARTIAL_ERROR`:
        return false;
      default:
        return state;
    }
  },
  isCreating: (state = false, action) => {
    switch (action.type) {
      case `${resource}/CREATE_START`:
        return true;
      case `${resource}/CREATE_SUCCESS`:
        return false;
      case `${resource}/CREATE_ERROR`:
        return false;
      default:
        return state;
    }
  },
  isUpdating: (state = false, action) => {
    switch (action.type) {
      case `${resource}/UPDATE_START`:
        return true;
      case `${resource}/UPDATE_SUCCESS`:
        return false;
      case `${resource}/UPDATE_ERROR`:
        return false;
      default:
        return state;
    }
  },
  isDeleting: (state = false, action) => {
    switch (action.type) {
      case `${resource}/DELETE_START`:
        return true;
      case `${resource}/DELETE_SUCCESS`:
        return false;
      case `${resource}/DELETE_ERROR`:
        return false;
      default:
        return state;
    }
  },
  fetchError: (state = null, action) => {
    const { error } = action.payload || {};
    switch (action.type) {
      case `${resource}/FETCH_START`:
      case `${resource}/FETCH_ALL_START`:
      case `${resource}/FETCH_PARTIAL_START`:
      case 'common/CLEAR_ALL_ERRORS':
      case `${resource}/FETCH_SUCCESS`:
      case `${resource}/FETCH_ALL_SUCCESS`:
      case `${resource}/FETCH_PARTIAL_SUCCESS`:
        return null;
      case `${resource}/FETCH_ERROR`:
      case `${resource}/FETCH_ALL_ERROR`:
      case `${resource}/FETCH_PARTIAL_ERROR`:
        return error;
      default:
        return state;
    }
  },
  createError: (state = null, action) => {
    const { error } = action.payload || {};
    switch (action.type) {
      case `${resource}/CREATE_START`:
      case `${resource}/CREATE_ALL_START`:
      case 'common/CLEAR_ALL_ERRORS':
      case `${resource}/CREATE_SUCCESS`:
      case `${resource}/CREATE_ALL_SUCCESS`:
        return null;
      case `${resource}/CREATE_ERROR`:
      case `${resource}/CREATE_ALL_ERROR`:
        return error;
      default:
        return state;
    }
  },
  updateError: (state = null, action) => {
    const { error } = action.payload || {};
    switch (action.type) {
      case `${resource}/UPDATE_START`:
      case 'common/CLEAR_ALL_ERRORS':
      case `${resource}/UPDATE_SUCCESS`:
        return null;
      case `${resource}/UPDATE_ERROR`:
        return error;
      default:
        return state;
    }
  },
  deleteError: (state = null, action) => {
    const { error } = action.payload || {};
    switch (action.type) {
      case `${resource}/DELETE_START`:
      case 'common/CLEAR_ALL_ERRORS':
      case `${resource}/DELETE_SUCCESS`:
        return null;
      case `${resource}/DELETE_ERROR`:
        return error;
      default:
        return state;
    }
  },
  normalized: (state = {}, action) => {
    const { data } = action.payload || {};
    if (!data) {
      return state;
    }
    switch (action.type) {
      case `${resource}/FETCH_ALL_START`:
        return {};
      case `${resource}/FETCH_ALL_SUCCESS`:
        return data.reduce((result, record) => {
          result[record.id] = record;
          return result;
        }, {});
      case `${resource}/FETCH_PARTIAL_SUCCESS`: {
        const partial = data.reduce((result, record) => {
          result[record.id] = record;
          return result;
        }, {});
        return { ...state, ...partial };
      }
      case `${resource}/FETCH_SUCCESS`:
      case `${resource}/CREATE_SUCCESS`:
      case `${resource}/UPDATE_SUCCESS`:
        return { ...state, [data.id]: data };
      case `${resource}/DELETE_SUCCESS`: {
        const newState = { ...state };
        delete newState[data.id];
        return newState;
      }
      default:
        return state;
    }
  },
});
