import "./styles.sass";

export const InfoArea = ({title, description, children}) => (
    <div className="info-area">
        <div className="title-area">
            <h1>{title}</h1>
            <div className="action-area">
                {children}
            </div>
        </div>
        <p>{description}</p>
    </div>
)