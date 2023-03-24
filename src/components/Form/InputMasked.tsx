import InputMask, { Props as InputMaskProps } from "react-input-mask";
import { forwardRef, ForwardRefRenderFunction } from 'react';
import { FieldError, Controller, Control, FieldValues } from 'react-hook-form';
import clsx from "clsx";

interface Props extends InputMaskProps {
  isValid?: boolean;
  label?: string;
  error?: FieldError;
  required?: boolean;
  inputRow?: boolean;
  maxWidth?: string;
  control: Control<FieldValues>;
  fieldName: string;
  mask: string;
}

function handleMaxWith({ maxWidth }: { maxWidth?: string | undefined }) {
  if (maxWidth) {
    return `max-w-${maxWidth}`
  } else {
    return ""
  }
}

const InputMaskedBase: ForwardRefRenderFunction<HTMLInputElement, Props> =
  ({ inputRow, maxWidth, placeholder = "Pesquisar", isValid, label, required, error, ...rest }: Props, ref) => {
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
        <div className="flex flex-col gap-2 max-w-[240px] w-full">
          <Controller
            name={rest.name!}
            control={rest.control}
            render={({ field: { onBlur, name, ...field }, fieldState }) => (
              <>
                <InputMask
                  type={rest.type}
                  placeholder={placeholder}
                  className={
                    clsx(`focus:outline-secondary1 border-none ease-in-out duration-400 outline-none focus:ring-2 focus:ring-primary bg-white drop-shadow transition-all px-2 py-2 rounded-md ${handleMaxWith({ maxWidth })}`, {
                      "cursor-not-allowed": rest.disabled,
                      "focus:ring-red-500": isValid !== undefined && !isValid,
                    })}
                  onBlur={onBlur}
                  name={name}
                  inputRef={ref}
                  {...field}
                  onChange={field.onChange}
                  value={field.value}
                  mask={rest.mask}
                />
                {
                  !!fieldState.error &&
                  (
                    <span className="text-error font-mserrat text-xs">{fieldState.error.message}</span>
                  )
                }
              </>
            )}
          />

        </div>
      </div>
    )
  }
export const InputMasked = forwardRef(InputMaskedBase);
