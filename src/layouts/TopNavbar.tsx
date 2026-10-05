import { useAppDispatch, useAppSelector } from "../store/redux/hooks";
import { uuidv4 } from "../utils/extraFunc";
import { SelectField } from "../components/forms/SelectField";
import { loadTopNavbarSubItems, setSelectedTopNavbarItem } from "../store/redux/topNavbar2Slice";

export const TopNavbar = () => {

    const dispatch = useAppDispatch();
    
    const { topNavbar2Items } = useAppSelector(({ topNavbar2 }) => topNavbar2);
    
    return (
        <nav className="fixed top-0 z-50 w-full bg-white dark:bg-gray-700">
            <div className="flex justify-between w-full h-16 dark:bg-gray-700">
                <div className="flex items-center justify-center">
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
    );
}