import Filterkampung from "../filter/Filterkampung";
import { lazy, Suspense } from 'react';


//const View = lazy(() => import('./aparatKampung/View'))
import View from './aparatKampung/View';

const ConfigAparatPengesahan = () => {

    return (
        <div>
            <div className="h-20"></div>
            <Filterkampung />

            <div className="container mx-auto">
                <View />
            </div>

        </div >
    )
}

export default ConfigAparatPengesahan