import React, { useState } from 'react';
import Table from '../../Table';

const ApbkRealisasi = () => {

  const [kolom, setKolom] = useState([]);
  const [data, setData] = useState([]);

  const title = 'Upload Data APBK ... ';
  const option = {

  }

  return (
    <div>
      <div className='pt-32'>
        <div className='mx-auto'>
          <div className='container mx-auto'>
            <div className='relative container -z-40 mx-auto'>
              <div className='absolute min-w-full mx-auto'>
                <Table title={title} option={option} data={data} kolom={kolom} setKolom={setKolom} setData={setData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApbkRealisasi