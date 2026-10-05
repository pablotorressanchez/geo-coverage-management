import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ItemCollectionModel } from "../../types/common/ItemCollectionModel";
import type { LoadSidebarSubItems, SidebarSubItem, SidebarSubState } from "../../types/sidebar/SidebarSubItem";
import { commonService } from "../../services/commonService";
import { companyService } from "../../services/companyService";

const initialState: SidebarSubState = {
    sidebarItems: [],
    statusCode: '00',
    statusMessage: '',
    selectedItem: undefined
}

// export const loadSubNavItems = createAsyncThunk<ItemCollectionModel<Company>, string>(
export const loadSidebarSubItems = createAsyncThunk(
    'companies/fetch',
    async(resource: LoadSidebarSubItems) => {
        // console.log(resource)
        return await loadSubNavItemsBy(resource);
    }
)

export const sidebarSubSlice = createSlice({
    name: 'seconSidebar',
    initialState,
    reducers: {
        selectedSidebarSubItem: (state, action: PayloadAction<SidebarSubItem>) => {
            state.selectedItem = action.payload;
        },
        setSidebarSubItems: (state, action: PayloadAction<Array<SidebarSubItem>>) => {
            state.sidebarItems = action.payload;
        },
    },

    extraReducers(builder) {
        builder
            .addCase(loadSidebarSubItems.pending, (state) => {
                state.statusCode = '00';
            })
            .addCase(loadSidebarSubItems.fulfilled, (state, { payload }) => {
                state.statusCode = payload.statusCode;
                state.statusMessage = payload.statusMessage;
                state.sidebarItems = payload.items;
            })
            .addCase(loadSidebarSubItems.rejected, (state) => {
                state.statusCode = '00';
                state.statusMessage = 'No pudimos conectarnos con el servidor.'
        })
    },
});

const loadSubNavItemsBy = async ({ by, resource }: LoadSidebarSubItems) => {
    let navItems: SidebarSubItem[] = [];
    let collection: ItemCollectionModel<SidebarSubItem> = {
        statusCode: '00',
        statusMessage: 'No pudimos conectarnos con el servidor.',
        items: []
    }

    if (by === 'group') {
        const {statusCode, statusMessage, items } = await commonService.getGroups();

        navItems = items.map((g, _) => (
            {
                id: 'company',
                position: 1,
                selected: false,
                display: false,
                ...g
            }
        ));

        collection = {
            ...collection,
            statusCode,
            statusMessage,
            items: navItems
        }
    }
    if (by === 'company') {
        const {statusCode, statusMessage, items } = await companyService.getCompaniesByGroups(resource);

        navItems = items.map((c, _) => (
            {
                id: '',
                position: 1,
                selected: false,
                display: false,
                value: c.uniqueId,
                displayText: c.companyName,
                ...c
            }
        ));

        collection = {
            ...collection,
            statusCode,
            statusMessage,
            items: navItems
        }
    }

    return collection;
}

export const { setSidebarSubItems } = sidebarSubSlice.actions;

export default sidebarSubSlice.reducer;