import "./styles.sass";
import Software from "@/pages/tools/linux/InstallSoftware/software.jsx";

export const SoftwareGrid = ({currentItem, setCurrentItem}) => (
    <div className="software-grid">
        {Software.map((software) => (
            <div className={"software-item" + (currentItem === software.name ? " software-item-active" : "")}
                 onClick={() => setCurrentItem(software.name)} key={software.name}>
                <img src={software.icon} alt={software.name}/>
                <p>{software.name}</p>
            </div>
        ))}
    </div>
)