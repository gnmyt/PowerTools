import "./styles.sass";

export const PowerItemGroup = ({children, name}) => (
    <div className="power-item-group">
        <p>{name}</p>
        {children}
    </div>
)