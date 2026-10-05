import type { FormFieldType } from "./types";

type LabelEl = Pick<FormFieldType, 'label' | 'font' | 'spaceBetween'>;

export const Label = ({ label, font = 'small', spaceBetween = false }: LabelEl) => {
    return (
        <label className={`block ${spaceBetween && 'mb-2.5'} ${font === 'small'? 'text-sm':'text-base'} font-normal`}>{label}</label>
    )
}