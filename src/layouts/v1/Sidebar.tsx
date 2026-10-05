import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/redux/hooks";
import { toggleSidebar } from "../../store/redux/sidebarSlice";
import type { SidebarSubItem, SidebarSubItemEvents } from "../../types/sidebar/SidebarSubItem";
import { sidebarService } from "../../services/sidebarService";
import { uuidv4 } from "../../utils/extraFunc";
import smmalLogo from '../../assets/img/small-logo.png';
import { BiChevronLeft } from "react-icons/bi";
import { ListGroup } from "../../components/sidebar/Common";
import { setTopNavbar2Items } from "../../store/redux/topNavbar2Slice";
import { commonService } from "../../services/commonService";
import { ManageGroup } from "../../components/modals/ManageGroup";
import { ManageBranches } from "../../components/modals/ManageBranches";
import { ManageCompany } from "../../components/modals/ManageCompany";
import type { Company } from "../../types/Company";
import { Buildings } from "@boxicons/react";
import { ActionButton } from "../../components/modals/Modal";

export const Sidebar = () => {
    const [_sidebarItems, _setSidebarItems] = useState<SidebarSubItem[]>([]);
    const [selSidebarSubItemOption, setSelSidebarSubItemOption] = useState<SidebarSubItem | undefined>(undefined);
    const [showManageGroup, setShowManageGroup] = useState(false);
    const [showManageCompany, setShowManageCompany] = useState(false);
    const [showManageBranches, setShowManageBranches] = useState(false);
    const [sidebarOp, setSidebarOp] = useState(1);
    
    const dispatch = useAppDispatch();
    
    const { collapsed } = useAppSelector(({ sidebarItem }) => sidebarItem);

    const { sidebarItems: sidebarItems, statusCode } = useAppSelector(({ sidebarSubItem }) => sidebarSubItem);
        
    useEffect(() => _setSidebarItems(sidebarItems), [statusCode, sidebarItems]);
    
    const compOptions = sidebarService.getSidebarSubItemOptions('v1');

    const handleCollapsedSubNavItems = (item: SidebarSubItem) => {
        _setSidebarItems((prev) => prev.map(sub => ({...sub, selected: sub.value === item.value ? !sub.selected: sub.selected})))
    }

    const handleSidebarSubItemsClick = async (event: SidebarSubItemEvents, item: SidebarSubItem) => {
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
    
    const sidebarSubListOptions = (item: SidebarSubItem) => {
        return compOptions.map(({ displayText, icon: Icon, event }) => (
            <li className="sidebar-item" key={uuidv4()} onClick={ () => handleSidebarSubItemsClick(event, item) }>
                <Icon className="nav-icon"/>
                <span> { displayText }</span>
            </li>
        ));
    }

    const sidebarSubList = _sidebarItems.map((item, _) => {
        return (
            <li className="sidebar-item" key={uuidv4()}>
                <a className={`collapsed-nav-item ${item.selected ? 'nav-active': ''}`}>
                    <Buildings className="nav-icon"/>
                    <span> {item.displayText}
                        {/* <ActionButton type="acept" label="2" font="extra-small" style={{ fontSize: '10px' }} /> */}
                    </span>
                    <BiChevronLeft className={ `collapsed-nav ${item.selected ? 'collapsed-active': ''}` }  onClick={() => handleSidebarSubItemsClick('collapsed_company', item)}/>
                </a>
                <ul className={`nav-second-level ${item.selected ? 'nav-second-active': ''}`}>
                    {sidebarSubListOptions(item)}
                </ul>
            </li>
            )
        }
    );

    return (
        <>
            <aside className={`sidebar fixed left-0 h-full bg-white top-0 ${collapsed ? 'toggle-sidebar': ''} dark:bg-gray-800 transition-all transition-discrete duration-700 delay-700`} style={{zIndex: 90}}>
                <div className="h-full bg-white border-t dark:bg-gray-800 border-t-gray-200 dark:border-t-gray-700">
                    <div className="flex items-center justify-between h-20 gap-2 px-5 border-b sidebar-header border-b-gray-200 dark:border-b-gray-700">
                        <div className="flex items-center">
                            <img src={smmalLogo}
                                className="h-full"
                                alt="Coverage tools"/>
                        </div>
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
                    <div className="h-full py-4 shadow-lg sidebar-body">
                        <div className='flex items-center justify-between w-full px-3 pb-2'>
                            <label className="text-lg font-bold">Empresas</label>
                            <ActionButton label="Agregar" font="small" type="new" textColor="sky" onClick={() => {
                                setSidebarOp(1);
                                setShowManageCompany(true);
                                }}
                                // icon={<Plus className="size-3" />}
                            />
                        </div>
                        {
                            <ListGroup collapsed={true} children={sidebarSubList} />
                        }
                    </div>
                </div>
            </aside>
            {
                <ManageGroup display={ showManageGroup } onCloseModal={ setShowManageGroup } />
            }
            {
                showManageBranches && <ManageBranches item={ selSidebarSubItemOption } onCloseModal={ setShowManageBranches } />
            }
            {
                showManageCompany && <ManageCompany op={sidebarOp} item={ selSidebarSubItemOption } onFormSubmit={ handleCompanyFormSubmit } onCloseModal={ setShowManageCompany } />
            }
        </>
    )
}