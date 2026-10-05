import type { SelectValueModel } from "../../types/common/SelectValueModel";

export type FieldTypeChange = SelectValueModel;

export interface FormFieldType {
    label?: string;
    font?: 'small' | 'medium';
    align?: 'inline-form' | 'group-form';
    spaceBetween: boolean;
    placeholder?: string;
    inputValue?: string;
    inputName?: string;
    maxWidth?: string;
    onFieldChange?: (e: FieldTypeChange) => void;
}

export type ActionButtonType = 'new' | 'acept' | 'edit' | 'close' | 'cancel' | 'submit' | 'bordered' | 'ghost';
export interface ActionButtonEl {
    label: string;
    type: ActionButtonType;
    font?: 'extra-small' | 'small' | 'medium';
    className?: string;
    textColor?: 'amber' | 'sky' | 'indigo' | 'blue' | 'gray';
    showLabel?: boolean;
    icon?: React.ReactElement;
    style?: {
        [name:string]: any
    };
    onClick?: () => void; 
}