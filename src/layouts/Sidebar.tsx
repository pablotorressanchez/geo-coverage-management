import { selectSidebarItem, setSidebarItems, toggleSidebar } from "../store/redux/sidebarSlice";
import { useAppDispatch, useAppSelector } from "../store/redux/hooks";
import { useEffect, useMemo, useState } from "react";
import { ItemList, ListGroup, TitleList } from "../components/sidebar/Common";
import { loadSidebarSubItems } from "../store/redux/sidebarSubSlice";
import { uuidv4 } from "../utils/extraFunc";
import { sidebarService } from "../services/sidebarService";
import { commonService } from "../services/commonService";
import { ActionButton } from "../components/modals/Modal";
import type { Company } from "../types/Company";
import type { SidebarSubItem, SidebarSubItemEvents } from "../types/sidebar/SidebarSubItem";
import type { SidebarItem } from "../types/sidebar/SidebarItem";
import { ManageBranches } from "../components/modals/ManageBranches";
import { ManageCompany } from "../components/modals/ManageCompany";
import { setTopNavbar2Items } from "../store/redux/topNavbar2Slice";
import { ManageGroup } from "../components/modals/ManageGroup";
import '../styles/Sidebar.css';
import { FaPlus, FaRegEdit } from "react-icons/fa";
import { ChevronLeft } from "@boxicons/react";

export const Sidebar = () => {
    const [selSidebarSubItem, setSelSidebarSubItem] = useState<SidebarSubItem | undefined>(undefined);
    const [selSidebarSubItemOption, setSelSidebarSubItemOption] = useState<SidebarSubItem | undefined>(undefined);
    const [_sidebarSubItems, _setSidebarSubItems] = useState<SidebarSubItem[]>([]);
    const [showManageGroup, setShowManageGroup] = useState(false);
    const [showManageCompany, setShowManageCompany] = useState(false);
    const [_, setShowManageBranches] = useState(false);
    const [sidebarOp, setSidebarOp] = useState(1);
    // const [company, setCompany] = useState<SidebarSubItem | null>(null);
    
    const dispatch = useAppDispatch();

    useEffect(() => {
        const loadGroups = () => {
            const items = sidebarService.getSidebarItems();
            dispatch(setSidebarItems(items));
        };

        loadGroups();
    }, [dispatch]);
    
    const compOptions = sidebarService.getSidebarSubItemOptions();
    
    const handleSidebarItemClick = (item: SidebarItem, _: number) => {
        dispatch(selectSidebarItem(_));
        
        if (item.id === 'group') 
            dispatch(loadSidebarSubItems({ by: item.id, resource: ''}));
        
        if (item.id === 'company' && selSidebarSubItem)
            dispatch(loadSidebarSubItems({ by: item.id, resource: selSidebarSubItem?.value}));
    };
    
    const handleSidebarSubItemClick = (item: SidebarSubItem) => {
        dispatch(selectSidebarItem(1));
        
        if (item.id.length) {
            setSelSidebarSubItem(item);
            dispatch(loadSidebarSubItems({ by: item.id, resource: item.value}));
        }
    };

    const handleCollapsedSubNavItems = (item: SidebarSubItem) => {
        _setSidebarSubItems((prev) => prev.map(sub => ({...sub, selected: sub.value === item.value ? !sub.selected: sub.selected})))
    }

    const handleSubNavItemsClick = async (event: SidebarSubItemEvents, item: SidebarSubItem) => {
        // console.log(event);
        switch (event) {
            case 'edit_company':
                setSidebarOp(2);
                setSelSidebarSubItemOption(item);
                setShowManageCompany(true);
                break;
                case 'del_company': break;
                case 'branchs_company':
                setShowManageBranches(true);
                setSelSidebarSubItemOption(item);
                break;
            case 'see_coverages_company':
                const { items: topNavbarItems } = await commonService.getSlsBranches(item.value);
                dispatch(setTopNavbar2Items([{ id: 'branch', label: 'Sucursal', topNavbarItems }]));
                break;
            default:
                handleCollapsedSubNavItems(item);
        }
    }

    const handleCompanyFormSubmit = (item: Company) => {
        console.log(item);
    }
    
    const { collapsed, selectedItem: selSidebarItem, sidebarItems } = useAppSelector(({ sidebarItem }) => sidebarItem);
    
    const { sidebarItems: sidebarSubItems, statusCode } = useAppSelector(({ sidebarSubItem }) => sidebarSubItem);

    useEffect(() => _setSidebarSubItems(sidebarSubItems), [statusCode, sidebarSubItems]);

    const sidebarList = sidebarItems.map((item, i) => {
        // @ts-ignore
        const Icon = sidebarService.getSidebarIcon(item.icon);
        return (
            <li onClick={ () => handleSidebarItemClick(item, i) }
                key={i} className={`${item.display ? 'block' : 'hidden'} sidebar-item flex items-center justify-center w-12 h-12 ${item.selected ? 'text-sky-600 hover:text-sky-700 dark:hover:text-sky-400 dark:text-sky-300 sidebar-item-active' : 'text-gray-500 dark:text-gray-300 hover:text-gray-600 dark:hover:text-white'} rounded-md hover:bg-gray-300/50 dark:hover:bg-gray-700/50`} title={item.displayText}>
                {/* @ts-ignore */}
                <Icon className="sidebar-icon" />
            </li>
            )
        }
    );

    const sidebarSubListOptions = (item: SidebarSubItem) => {
        return compOptions.map(({ displayText, icon: Icon, event }) => (
            <ItemList key={uuidv4()} className="sidebar-option" deep={1} displayText={displayText} elementStar={<Icon  className="sidebar-sub-icon" />}  onClick={ () => handleSubNavItemsClick(event, item) }/>
        ));
    }
    
    const sidebarSubList = useMemo(() => {
        if (selSidebarItem?.id === 'group')
            return _sidebarSubItems
                .map((item) => (<ItemList key={uuidv4()} displayText={item.displayText} onClick={() => handleSidebarSubItemClick(item)} />));
        
        return _sidebarSubItems
            .map((item) => (
                <li key={uuidv4()} className="sidebar-subitem">
                    <TitleList
                        parent={true}
                        displayText={item.displayText}
                        elementEnd={
                            <ChevronLeft
                                className={`size-5 ${item.selected ? 'duration-400 delay-400 -rotate-90' : ''}`}
                                onClick={() => handleSubNavItemsClick('collapsed_company', item)}
                            />
                        }
                    />
                    
                    <ListGroup
                        className="sidebar-sub-options duration-400 delay-400"
                        collapsed={item.selected}
                        children={sidebarSubListOptions(item)} />
                </li>
            ));
        
    }, [_sidebarSubItems]);
    
    return (
        <>
        <aside className={`sidebar-area fixed left-0 h-full bg-white ${collapsed ? 'toggle-sidebar': ''} dark:bg-gray-800 transition-all transition-discrete duration-700 delay-700`}
                style={{ zIndex: 90 }}>
            <div className="fixed left-0 w-16 h-full bg-white first-sidebar dark:bg-gray-800">
                <div className="flex flex-col items-center w-16 h-full">
                    <div className="flex items-center justify-between w-full h-20 border-b ps-5 sidebar-header border-b-gray-200 dark:border-b-gray-700">
                        <div className="flex items-center h-20">
                            <img src="https://flowbite.com/docs/images/logo.svg"
                                className="h-8"
                                alt="Flowbite Logo"/>
                        </div>
                    </div>
                    
                    <ul className="w-full h-full px-2 py-4 shadow-lg sidebar-body">
                        { sidebarList }
                    </ul>
                </div>
            </div>
            <div className={`second-sidebar duration-700 delay-700 fixed h-full bg-white left-16 dark:bg-gray-800`}>
                <div className="flex items-center justify-between h-20 gap-2 border-b ps-2 pe-5 sidebar-header border-b-gray-200 dark:border-b-gray-700">
                    <span className="self-center text-lg font-semibold truncate title">
                    Coverage Tools
                    </span>
                    <div className="open-sidebar" onClick={ () => dispatch(toggleSidebar()) }>
                        <div className={`burger-menu ${collapsed ? 'active': ''}`}>
                            <span className="top-bar"></span>
                            <span className="middle-bar"></span>
                            <span className="bottom-bar"></span>
                        </div>
                    </div>
                </div>
                <div className="h-full px-3 py-4 shadow-lg sub-sidebar-body">
                    {
                        selSidebarItem?.position === 0 && (
                        <TitleList
                            parent={true}
                            displayText={selSidebarItem.displayText}
                            elementEnd={
                                <ActionButton label="Nuevo" font="small" type="new"
                                    onClick={() => {
                                        setSidebarOp(1);
                                        setShowManageGroup(true);
                                    }}
                                    icon={<FaPlus className="w-3 h-3" />}
                                    />
                                }
                                />
                            
                        )
                    }
                        
                    {
                        selSidebarSubItem && selSidebarItem?.position === 1 && (
                            <TitleList
                                parent={true}
                                elementStar={
                                    <ActionButton label="Editar grupo" font="small" type="ghost" textColor="indigo" onClick={() => { }}
                                        icon={<FaRegEdit className="w-4 h-4" />}
                                        showLabel={false}
                                    />
                                }
                                displayText={selSidebarSubItem.displayText}
                                elementEnd={
                                    <ActionButton label="Agregar empresa" font="small" type="ghost" textColor="sky" onClick={() => {
                                        setSidebarOp(1);
                                        setShowManageCompany(true);
                                        }}
                                        icon={<FaPlus className="w-3 h-3" />}
                                        showLabel={false}
                                    />
                                }
                            />
                        )
                    }
                    {
                        <ListGroup collapsed={true} children={sidebarSubList} />
                    }
                </div>
            </div>
        </aside>
        {
            // showManageGroup && <DeleteItemModal display={ showManageGroup } onCloseModal={ setShowManageGroup } />
            <ManageGroup display={ showManageGroup } onCloseModal={ setShowManageGroup } />
        }
        {
            // showManageBranches && <ManageBranches item={selSidebarSubItemOption} onCloseModal={ setShowManageBranches } />
            <ManageBranches item={selSidebarSubItemOption} onCloseModal={ setShowManageBranches } />
        }
        {
            showManageCompany && <ManageCompany op={sidebarOp} item={sidebarOp === 1 ? selSidebarSubItem : selSidebarSubItemOption} onFormSubmit={ handleCompanyFormSubmit } onCloseModal={setShowManageCompany} />
        }
        </>
    );
}
