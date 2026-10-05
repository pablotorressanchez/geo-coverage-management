import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SelectValueModel } from "../../types/common/SelectValueModel";

export interface TopNavbarItem extends SelectValueModel { };
export interface SelectedTopNavbarItem extends TopNavbarItem {
    path: string;
};

export interface TopNavbarItemsState {
    topNavbarItems: TopNavbarItem[];
    label?: string;
    // id?: string;
    selectedItem?: SelectedTopNavbarItem;
}

const initialState: TopNavbarItemsState = {
    // label: 'Sucursal',
    topNavbarItems: [],
}

export const topNavbarSlice = createSlice({
    name: 'topNavbar',
    initialState,
    reducers: {
        setTopNavbarItems: (state, { payload: { label = undefined, topNavbarItems } }: PayloadAction<Omit<TopNavbarItemsState, 'selectedItem'>>) => {
            state.label = label;
            state.topNavbarItems = topNavbarItems;
        },
        selectedTopNavbarItem: (state, { payload }: PayloadAction<SelectedTopNavbarItem>) => {
            state.selectedItem = payload;
        }
    }
});

export const { setTopNavbarItems, selectedTopNavbarItem } = topNavbarSlice.actions;

export default topNavbarSlice.reducer;