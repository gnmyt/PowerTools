import "./styles.sass";

export const TextArea = ({value, onChange, readOnly = false}) => (
    <textarea className="area" rows="10" value={value} onChange={onChange} readOnly={readOnly} />
)