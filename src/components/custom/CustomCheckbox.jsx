import cn from 'classnames';

const CustomCheckbox = ({
    checked,
    onChange,
    label,
    radio,
    ...props
}) => {
    return (
        <div className="w-full mb-4">
            <div className="flex items-center">
                <input
                    {...props}
                    type={radio ? 'radio' : 'checkbox'}
                    checked={checked}
                    onChange={onChange}
                    id={props.id}
                    name={props.id}
                    className={cn(
                        'w-[18px] h-[18px] cursor-pointer border border-gray-50/50 rounded-sm checked:bg-white checked:border-black p-5 outline-none transition duration-200 accent-black',
                        {
                            'rounded-full': radio,
                            'rounded-[4px]': !radio,
                        }
                    )}
                />
                <label
                    htmlFor={props.id}
                    className="cursor-pointer text-sm ml-3"
                >
                    {label}
                </label>
            </div>
        </div>
    );
};

export default CustomCheckbox;
