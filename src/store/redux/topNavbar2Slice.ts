import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SelectValueModel } from "../../types/common/SelectValueModel";
import { commonService } from "../../services/commonService";

export interface TopNavbarItem extends SelectValueModel { };
export interface SelectedTopNavbarItem extends TopNavbarItem {
    path: string;
};

export interface TopNavbar2Item {
    topNavbarItems: TopNavbarItem[];
    label?: string;
    id?: string;
}

export type InsertTopNavbar2Item = TopNavbar2Item & {
    i: number;
}
export type LoadTopNavbar2Items = Omit<TopNavbar2Item, 'topNavbarItems'> & TopNavbarItem & {
    i: number;
};

export interface TopNavbar2ItemsState {
    topNavbar2Items: TopNavbar2Item[];
    selectedItem?: SelectedTopNavbarItem;
}

const initialNavbar2State: TopNavbar2ItemsState = {
    topNavbar2Items: []
};

export const loadTopNavbarSubItems = createAsyncThunk(
    'topNavbar2/fetch',
    async (loadItems: LoadTopNavbar2Items) => {
        return await fetchTopNavbar2Items(loadItems);
    }
)


export const topNavbar2Slice = createSlice({
    name: 'topNavbar2',
    initialState: initialNavbar2State,
    reducers: {
        setSelectedTopNavbarItem: (state, { payload }: PayloadAction<SelectedTopNavbarItem>) => {
            state.selectedItem = payload;
        },
        setTopNavbar2Items: (state, { payload }: PayloadAction<TopNavbar2Item[]>) => {
            state.topNavbar2Items = payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(loadTopNavbarSubItems.pending, (_) => {
                // console.log('Load TopNavbarItems')
            })
            .addCase(loadTopNavbarSubItems.fulfilled, (state, { payload: { i, ...rest } }) => {
                if (rest.topNavbarItems.length) {
                    // state.topNavbar2Items.splice(i, 0, rest);
                    state.topNavbar2Items[i + 1] = rest;
                }
                else
                    state.topNavbar2Items = state.topNavbar2Items.slice(0, i);
            })
            .addCase(loadTopNavbarSubItems.rejected, (_) => {
                // console.log('No TopnavbarItems')
        })
    },
});

const fetchTopNavbar2Items = ({ i, id, value }: LoadTopNavbar2Items): Promise<InsertTopNavbar2Item> => {
    return new Promise(async (resolve, reject) => {
        if (id === 'branch') {
            const { items: topNavbarItems } = await commonService.getSlsCoverages(value);
            const insertItem: InsertTopNavbar2Item = {
                i, id: 'feature', label: 'Cobertura', topNavbarItems
            };

            resolve(insertItem);
        }
        reject({} as InsertTopNavbar2Item);
    });
}

export const { setTopNavbar2Items, setSelectedTopNavbarItem } = topNavbar2Slice.actions;

export default topNavbar2Slice.reducer;