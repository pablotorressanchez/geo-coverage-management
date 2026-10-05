import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SidebarItem, SidebarState } from "../../types/sidebar/SidebarItem";

const initialState: SidebarState = {
    collapsed: false,
    sidebarItems: [],
    selectedItem: undefined
}

export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.collapsed = !state.collapsed;
        },
        setSidebarItems: (state, action: PayloadAction<Array<SidebarItem>>) => {
            state.sidebarItems = action.payload;
        },
        selectSidebarItem: (state, action: PayloadAction<number>) => {
            const index = action.payload;
            state.selectedItem = state.sidebarItems[index];

                state.sidebarItems.forEach((item, i) => {
                    item.selected = i === index;
                    item.display = true;
                });

        }
    }
});

export const { toggleSidebar, setSidebarItems, selectSidebarItem } = sidebarSlice.actions;

export default sidebarSlice.reducer;

