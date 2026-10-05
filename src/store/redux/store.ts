import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from './sidebarSlice';
import sidebarSubReducer from './sidebarSubSlice';
import topNavbarReducer from './topNavbarSlice';
import topNavbar2Reducer from './topNavbar2Slice';

export const store = configureStore({
    reducer: {
        sidebarItem: sidebarReducer,
        sidebarSubItem: sidebarSubReducer,
        topNavbar: topNavbarReducer,
        topNavbar2: topNavbar2Reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;