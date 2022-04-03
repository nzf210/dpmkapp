import Filterkampung from "../filter/Filterkampung";
import View from './aparatKampung/View';
import React from 'react';
//import { lazy, Suspense } from 'react';


//const View = lazy(() => import('./aparatKampung/View'))

const ConfigAparatPengesahan = () => {

    return (
        <div>
            <div className="h-20"></div>
            <Filterkampung />

            <div className="container mx-auto bg-red-500">
                <div className="mt-4">
                    <View />
                </div>
            </div>

        </div >
    )
}

export default ConfigAparatPengesahan