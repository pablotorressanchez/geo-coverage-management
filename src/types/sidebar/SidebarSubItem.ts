import type { StatusModel } from "../common/StatusModel";
import type { Company } from "../Company";
import type { Group } from "../Group";
import type { SidebarItem, SidebarState } from "./SidebarItem";

type ExtraPropertiesItem = Group | Company;

export type ExtraPropertiesType<Type extends ExtraPropertiesItem = ExtraPropertiesItem> = {
    [Property in keyof Type]?: Type[Property]
}

type Events = 'edit' | 'del' | 'branchs' | 'see_coverages' | 'collapsed';

export type SidebarSubItemEvents = `${Events}_company`;

export type SidebarSubItemOptions = Pick<SidebarItem , 'value' | 'displayText'> & {
    icon: React.ComponentType<any>;
    event: SidebarSubItemEvents;
}

export type SidebarSubItem = SidebarItem & ExtraPropertiesType;

export type SelectedSubItem = SidebarSubItem & {
    event: SidebarSubItemEvents;
};

export type SidebarSubState = Omit<SidebarState, 'collapsed'> & StatusModel;

export interface LoadSidebarSubItems {
    by: string;
    resource: string;
}