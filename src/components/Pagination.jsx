import React from 'react';

export default function Pagination({ postsPerPage, totalPosts, paginateFront, paginateBack, currentPage, selectChanged }) {

    return (
        <div className='py-2 w-full  flex'>
            <div className='flex-auto'></div>
            <div className='w-[450px] h-6'>
                <div className='flex '>
                    <div className='my-auto mr-2 flex text-center items-center'>
                        <select onChange={(e) => selectChanged(e)} name="reg_sel" id="reg_sel" className='pl-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500'>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value={totalPosts}>All</option>
                        </select>
                    </div>
                    <span onClick={() => { paginateBack(); }}

                        className='relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
                    >
                        <span>Back</span>
                    </span>
                    <p className='text-sm text-gray-700 pl-2 my-auto'>
                        Halaman
                        {/* <span className='font-medium'>{currentPage * postsPerPage - 10}</span> */}
                        <span className='font-medium px-2'>{currentPage}</span>
                        Dari
                        <span className='font-medium px-2'> {Math.ceil(totalPosts / postsPerPage)} </span>
                        Tot Data
                        <span className='font-medium px-2'> {totalPosts} </span>
                        {/* results */}
                    </p>
                    <span onClick={() => { paginateFront(); }}

                        className='relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
                    >
                        <span>Next</span>
                    </span>
                </div>
            </div>
        </div>
    );
}