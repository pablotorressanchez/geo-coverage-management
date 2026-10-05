import { Label } from "./Label";
import type { FormFieldType } from "./types"

export type SelectFieldEl = Omit<FormFieldType, 'placeholder'> & {
    options: React.ReactElement[];
}


export const SelectField = ({ label, align = 'inline-form', font = 'small', spaceBetween = false, inputValue, inputName, onFieldChange = () => {}, options = [], maxWidth = 'max-w-60' }: SelectFieldEl) => {
    
    const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        const value = event.target.value;
        const displayText = event.target.options[event.target.selectedIndex].text;

        onFieldChange({ value, displayText })
    };

    return (
        <>
        <div className={`flex ${align === 'group-form' ? 'flex-col items-start': 'items-center'} justify-start w-full ${spaceBetween === false && 'gap-2'} ${maxWidth}`}>
            { label && <Label label={label} font={font} spaceBetween={ spaceBetween } />}
            <select name={inputName} defaultValue={inputValue} className={`block w-full max-w-full px-3 py-1.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 ${spaceBetween && 'mb-2.5'} ${font === 'small' ? 'text-sm' : 'text-base'} font-normal rounded-xl placeholder:text-gray-400 placeholder:italic focus:border-sky-500 focus:outline focus:outline-sky-500 sm:text-sm dark:border-gray-600 dark:text-white block w-full px-3 py-2.5 shadow-xs`}
                onChange={ handleChange }>
                {/* onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onFieldChange(
                    {
                        value: e.target.value ?? inputName,
                        displayText: e.target.options[e.target.selectedIndex].text
                    }
                )}> */}
                { options }
            </select>
        </div>
        </>
    )
}