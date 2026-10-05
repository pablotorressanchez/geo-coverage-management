import { FaBuilding, FaLayerGroup, FaPenToSquare, FaStore, FaTrash } from "react-icons/fa6";
import { Edit, Layers, Store, TrashX } from "@boxicons/react";
import { companyService } from "./companyService";
import type { SidebarItem } from "../types/sidebar/SidebarItem";
import type { SidebarSubItemEvents, SidebarSubItemOptions } from "../types/sidebar/SidebarSubItem";

export const sidebarService = {
    getSidebarIcon: (icon: string):React.ComponentType<any> => {
        switch (icon) {
            case 'LayerGroup': return FaLayerGroup;
            default: return FaBuilding;
        }
    },
    getSidebarItems: () => {
        const navItems: SidebarItem[] = [
            {
                id: "group",
                position: 0,
                selected: false,
                display: true,
                value: "group",
                displayText: "Grupos",
                icon: 'LayerGroup'
            },
            {
                id: "company",
                position: 1,
                selected: false,
                display: false,
                value: "group",
                displayText: "Empresas",
                icon: 'Building'
            },
        ];

        return navItems;
    },
    getSidebarSubItems: (url: string) => {
        return companyService.getCompaniesByGroups(url);
    },
    getSidebarSubItemOptions: (v: string = ''): SidebarSubItemOptions[] => {
        const opts: [string, React.ComponentType<any>, SidebarSubItemEvents][] = [
            ['Editar', v !== 'v1'? FaPenToSquare: Edit, 'edit_company'],
            ['Eliminar', v !== 'v1'? FaTrash: TrashX, 'del_company'],
            ['Sucursales', v !== 'v1'? FaStore: Store, 'branchs_company'],
            ['Ver Coverturas', v !== 'v1'? FaLayerGroup: Layers, 'see_coverages_company']
        ];
        
        return opts.map(([displayText, icon, event]) => ({
            icon,
            value: '',
            displayText,
            event
            })
        );
    }

}