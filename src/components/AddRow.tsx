import { FormEvent, useState } from "react";

interface Field {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}

interface Props {
  fields: Field[];
  button: string;
  onAdd: (values: Record<string, string>) => void;
}

function AddRow({ fields, button, onAdd }: Props) {
  const empty = Object.fromEntries(fields.map((f) => [f.name, ""]));
  const [values, setValues] = useState<Record<string, string>>(empty);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!fields.every((f) => !f.required || values[f.name].trim())) return;
    onAdd(values);
    setValues(empty);
  };

  return (
    <form className="row add" onSubmit={submit}>
      {fields.map((f) => (
        <input
          key={f.name}
          type={f.type ?? "text"}
          placeholder={f.label}
          aria-label={f.label}
          value={values[f.name]}
          onChange={(e) => setValues({ ...values, [f.name]: e.target.value })}
        />
      ))}
      <button className="btn primary" type="submit">
        {button}
      </button>
    </form>
  );
}

export default AddRow;
