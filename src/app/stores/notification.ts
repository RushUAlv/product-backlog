import { AlertColor } from '@mui/material';
import { create } from 'zustand';

export type NotificationMessage = {
  key: number;
  message: string;
  text?: string;
  severity?: AlertColor;
};
type NotificationStoreActionsType = {
  addMessage: (message: Omit<NotificationMessage, 'key'>) => void;
  sliceMessage: () => void;
};
type NotificationStoreType = {
  snackPack: Array<NotificationMessage>;
  actions: NotificationStoreActionsType;
};

const initialState = {
  snackPack: [],
};

export const useNotificationStore = create<NotificationStoreType>()((set) => ({
  ...initialState,
  actions: {
    addMessage: ({ message, text, severity }: Omit<NotificationMessage, 'key'>) =>
      set((state) => {
        const newMessage: NotificationMessage = { message, text, key: new Date().getTime(), severity };
        return { snackPack: [...state.snackPack, newMessage] };
      }),
    sliceMessage: () =>
      set((state) => {
        const data = state.snackPack.slice(1);
        return { snackPack: data };
      }),
  },
}));

export const useNotificationActions = () => useNotificationStore((state) => state.actions);
