//import { useState, useEffect } from "react"
import NamaDistrik from "../filter/NamaDistrik";
import NamaKampung from "../filter/NamaKampung";
const ConfigPejabatPengesahan = () => {


    return (
        <div>
            <div className="h-20"></div>
            <div className="flex mx-auto items-center justify-center space-x-2">
                <NamaDistrik />
                <NamaKampung />
            </div>
        </div >
    )
}

export default ConfigPejabatPengesahan