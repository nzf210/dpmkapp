
import NamaDistrik from "../filter/NamaDistrik";
import NamaKampung from "../filter/NamaKampung";
import Test from "./Test";

const Filterkampung = () => {
    return (
        <div>
            <div className="flex flex-col sm:flex sm:flex-row mt-1 sm:-mt-0.5 space-y-1 sm:space-y-0 mx-auto">
                <div className="hidden xl:block  text-transparent">.......................................................</div>
                <div className="hidden md:block  text-transparent">.......................................................</div>
                <NamaDistrik />
                <NamaKampung />
                <div className="hidden xl:block text-transparent">........................................................</div>
                <div className="hidden md:block  text-transparent">.......................................................</div>
            </div>
            <div>

            </div>
        </div>
    )
}

export default Filterkampung