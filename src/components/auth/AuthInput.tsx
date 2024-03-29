interface AuthInputProps {
  label: string;
  value: any;
  mandatory?: boolean;
  notRenderWhen?: boolean;
  type?: "text" | "email" | "password";
  valueChanged: (newValue: any) => void;
}

export default function AuthInput(props: AuthInputProps) {
  return props.notRenderWhen ? null : (
    <div className="flex flex-col mt-4">
      <label>{props.label}</label>
      <input
        type={props.type ?? "text"}
        value={props.value}
        onChange={(e) => props.valueChanged?.(e.target.value)}
        required={props.mandatory}
        className={`
        px-4 py-3 rounded-lg bg-gray-200
        border focus:border-blue-500 focus:bg-white
        focus:outline-none
        `}
      />
    </div>
  );
}
