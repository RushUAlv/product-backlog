import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UiStoreActionsType = {
  onDrawerChange: () => void;
};
type UiStoreType = {
  isDrawerOpen: boolean;
  actions: UiStoreActionsType;
};

const initialState = {
  isDrawerOpen: true,
};

export const useUiStore = create<UiStoreType>()(
  persist(
    (set) => ({
      ...initialState,
      actions: {
        onDrawerChange: () =>
          set((state) => {
            return { isDrawerOpen: !state.isDrawerOpen };
          }),
      },
    }),
    {
      name: 'ui-storage',
      partialize: (state) => Object.fromEntries(Object.entries(state).filter(([key]) => !['actions'].includes(key))),
    }
  )
);

export const useUiActions = () => useUiStore((state) => state.actions);
