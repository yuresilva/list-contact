import { forwardRef, ForwardRefRenderFunction } from 'react';
import { FieldError } from 'react-hook-form';
import clsx from 'clsx';
interface Props extends React.HTMLProps<HTMLInputElement> {
    isValid?: boolean;
    label?: string;
    error?: FieldError;
    required?: boolean;
    maxWidth?: string;
    inputRow?: boolean;
}

function handleMaxWith({ maxWidth }: { maxWidth?: string | undefined }) {
    if (maxWidth) {
        return `max-w-${maxWidth}`
    } else {
        return ""
    }
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, Props> = ({ inputRow, placeholder = "Pesquisar", isValid, label, error, required = false, maxWidth, ...rest }: Props, ref) => {

    return (
        <div className={clsx("flex gap-2", {
            "flex-col": !inputRow,
            "flex-col md:flex-row justify-between w-full": inputRow,
        })}>
            {label &&
                <label
                    htmlFor={label}
                    className={`font-medium text-md  ${required ? "after:content-['*'] after:ml-0.5 after:text-red-500" : ''}
        ${isValid !== undefined && !isValid ? 'focus:outline-red-500 text-red-500' : ''}
        `}
                >
                    {label}
                </label>
            }
            <div className={clsx("flex flex-col gap-2 w-full", {
                "max-w-[240px]": !maxWidth,
                "max-w-[100%]": maxWidth === "full",
                "max-w-[160px]": maxWidth === "160px",
            })}>
                <input
                    type={rest.type}
                    id={label}
                    placeholder={placeholder}
                    className={
                        clsx(`focus:outline-secondary1 border-none ease-in-out duration-400 outline-none focus:ring-2 focus:ring-primary bg-white drop-shadow transition-all px-2 py-2 rounded-md ${handleMaxWith({ maxWidth })}`, {
                            "cursor-not-allowed": rest.disabled,
                            "focus:ring-red-500": isValid !== undefined && !isValid,
                        })}
                    ref={ref}
                    {...rest}
                />
                {
                    !!error && (
                        <span className="text-error font-mserrat text-xs inline-flex flex-wrap">{error.message}</span>
                    )
                }
            </div>
        </div>
    )
}

export const Input = forwardRef(InputBase);
