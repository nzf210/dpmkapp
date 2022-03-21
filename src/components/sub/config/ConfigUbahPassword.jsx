import Passtableview from "./sub/Passtableview";
import Filterkampung from "../filter/Filterkampung";


const ConfigUbahPassword = () => {

    return (
        <div className="bg-red-200">
            <div className="h-20"></div>
            <Filterkampung></Filterkampung>
            <Passtableview></Passtableview>
        </div>
    )
}

export default ConfigUbahPassword