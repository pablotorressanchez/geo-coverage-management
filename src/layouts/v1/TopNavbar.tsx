import { useEffect, useMemo, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../store/redux/hooks";
import { loadSidebarSubItems } from "../../store/redux/sidebarSubSlice";
import { commonService } from "../../services/commonService";
import type { SelectValueModel } from "../../types/common/SelectValueModel";
import { uuidv4 } from "../../utils/extraFunc";
import { SelectField } from "../../components/forms/SelectField";
import { loadTopNavbarSubItems, setSelectedTopNavbarItem } from "../../store/redux/topNavbar2Slice";

export const TopNavbar = () => {
    const [groups, setGroups] = useState<SelectValueModel[]>([]);
    
    const dispatch = useAppDispatch();

    const { topNavbar2Items } = useAppSelector(({ topNavbar2 }) => topNavbar2);
    
    useEffect(() => {
        const getGroups = async () => {
            const { statusCode, items } = await commonService.getGroups();
            if (statusCode === 'OK')
                setGroups(_ => [...items])
        }
        getGroups();
    }, []);
    
    const groupList = useMemo(() => {
        return groups.map(({ value, displayText }) => (<option key={uuidv4()} value={ value }>{ displayText }</option>))
    }, [groups])
    
    return (
        <>
            <nav className="fixed top-0 z-50 w-full bg-white dark:bg-gray-700">
                <div className="flex justify-between w-full h-16 dark:bg-gray-700">
                    <div className="flex items-center justify-center gap-2">
                        {
                            groupList?.length > 0 &&
                            <SelectField label="Grupos: " options={groupList} spaceBetween={false} inputName="groupId"
                                onFieldChange={({ value }) => {
                                dispatch(loadSidebarSubItems({ by: 'company', resource: value}))
                            }} />
                        }
                        {
                            topNavbar2Items.filter(Boolean)
                                .map(({ id, label, topNavbarItems }, i) => {
                                const options = topNavbarItems.map(({ value, displayText }) => (<option key={uuidv4()} value={value}>{displayText}</option>));
                                return options.length > 0 && (
                                    <SelectField key={uuidv4()} label={label ?? ''} options={options} spaceBetween={false} inputName="groupId"
                                        onFieldChange={({ value, displayText }) => {
                                            dispatch(setSelectedTopNavbarItem({ path: id ?? '', value, displayText }))
                                            dispatch(loadTopNavbarSubItems({ i: i + 1, id, label, value, displayText }));
                                        }} />
                                )
                            })
                        }
                    </div>
                </div>
            </nav>
        </>
    )
}