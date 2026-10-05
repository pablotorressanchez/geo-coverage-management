import { useAppSelector } from "../../store/redux/hooks";
import { MapWidgetLayer } from "../maps/MapWidgetLayer";
import { TopNavbar } from "./TopNavbar";

export const MainContent = () => {
    const { collapsed } = useAppSelector(({ sidebarItem }) => sidebarItem);
    
    return (
        <>
            <div className={`fixed z-40 px-7.5 right-0 ${!collapsed ? 'left-64' : 'left-16'} top-0 bottom-0 border-t  border-t-gray-200 dark:border-t-gray-700 transition-all transition-discrete duration-700 delay-700 flex flex-col bg-gray-50 dark:bg-gray-700`} style={{ zIndex: 80 }}>
                <TopNavbar />
                <div className="flex w-full h-full mt-16 mb-7.5 bg-gray-800">
                    <MapWidgetLayer/>
                </div>
            </div>    
        </>
    )
}