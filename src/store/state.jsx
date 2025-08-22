import React, { createContext, useContext, useMemo, useReducer } from 'react';

const VALID = ['all', 'red', 'blue'];
const norm = (v) => (v ?? 'all').toString().toLowerCase();
const coerce = (v) => (VALID.includes(norm(v)) ? norm(v) : 'all');

const initialState = {
  scores: { red: 1200, blue: 1170 },
  users: [],
  activity: {},
  filter: 'all',
  selectedUserId: null,
  connection: { status: 'connecting', lastHeartbeat: null }
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FILTER': {
      const f = coerce(action.filter);
      return { ...state, filter: f };
    }
    case 'SET_SELECTED_USER':
      return { ...state, selectedUserId: action.userId };
    case 'RESET_ACTIVITIES': {
      const next = { ...state.activity };
      delete next[action.userId];
      return { ...state, activity: next };
    }
    case 'REALTIME_TICK': {
      return {
        ...state,
        scores: action.payload?.scores ?? state.scores,
        users: action.payload?.users ?? state.users,
        activity: action.payload?.activity
          ? { ...state.activity, ...action.payload.activity }
          : state.activity,
        // merge instead of replace
        connection: action.payload?.connection
          ? { ...state.connection, ...action.payload.connection }
          : state.connection
      };
    }
    default:
      return state;
  }
}

const StoreCtx = createContext(null);

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
};

export const useStore = () => {
  const ctx = useContext(StoreCtx);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
};
