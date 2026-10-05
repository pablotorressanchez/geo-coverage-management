// import type React from "react";
import type { FormFieldType } from "./types";
import { Label } from "./Label";
export interface InputFieldEl extends FormFieldType {
    type?: 'text' | 'hidden';
    disabled?: boolean;
} 

export const InputField = ({ type = 'text', disabled = false, label, align = 'inline-form', font = 'small', spaceBetween = false, placeholder, inputValue, inputName, onFieldChange = () => {} }: InputFieldEl) => {
    return (
        <>
        <div className={`flex ${align === 'group-form' ? 'flex-col items-start': 'items-center'} justify-start w-full ${spaceBetween === false && 'gap-2'}`}>
            { label && (<Label label={label} font={font} spaceBetween={ spaceBetween } />)}
            <input type={type} name={inputName} defaultValue={inputValue} className={`bg-gray-50 dark:bg-gray-700 border border-gray-200 ${spaceBetween && 'mb-2.5'} ${font === 'small' ? 'text-sm' : 'text-base'} font-normal rounded-lg placeholder:text-gray-400 placeholder:italic focus:border-sky-500 focus:outline focus:outline-sky-500 sm:text-sm dark:border-gray-600 dark:text-white block w-full px-3 py-2.5 shadow-xs`} placeholder={placeholder ?? label}
                onChange={({ target: { name, value }}) => 
                    onFieldChange(
                        {
                            value: name,
                            displayText: value
                        }
                    )
                }
                disabled={disabled}>
            </input>
        </div>
        </>
    )
}