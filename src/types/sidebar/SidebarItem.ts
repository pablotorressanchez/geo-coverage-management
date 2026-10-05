import type React from "react";
import type { SelectValueModel } from "../common/SelectValueModel";

export interface SidebarItem extends SelectValueModel {
    id: string;
    position: number;
    selected: boolean;
    display: boolean;
    icon?: string | React.ComponentType<any>;
}

export interface SidebarState {
    collapsed: boolean;
    sidebarItems: SidebarItem[];
    selectedItem?: SidebarItem;
}