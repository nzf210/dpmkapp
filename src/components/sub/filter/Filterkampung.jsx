
import NamaDistrik from "../filter/NamaDistrik";
import NamaKampung from "../filter/NamaKampung";

const Filterkampung = () => {
    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 mt-1 sm:-mt-0.5 space-y-1 sm:space-y-0">
                <NamaDistrik />
                <NamaKampung />
            </div>
        </div>
    )
}

export default Filterkampung