import { ErrorMessage } from "formik";

const CustomInput = ({
  field,
  form: { touched, errors },
  label,
  required,
  placeholder,
  ...props
}) => {
  const isInvalid = !!touched[field.name] && !!errors[field.name];

  return (
    <div className="w-full">
      <h5 className="text-sm pb-1.5 capitalize">
        {label}
        {required && <span className="text-red-700">*</span>}
      </h5>
      <input
        {...field}
        {...props}
        placeholder={placeholder}
        invalid={isInvalid ? "true" : "false"}
        className="w-full custom-input focus:outline-none invalid:border-red-700"
      />
      <ErrorMessage
        name={field.name}
        component="div"
        className="text-red-700 text-sm mt-1 font-normal"
      />
    </div>
  );
};

export default CustomInput;
