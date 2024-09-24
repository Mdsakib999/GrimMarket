import React, { useEffect, useState } from 'react';
import { BsBank2 } from "react-icons/bs";

const ProductsUpdates = () => {

    const [upProducts, setUpProducts] = useState([]);

    useEffect(() => {
      fetch("UpProduct.json")
        .then((res) => res.json())
        .then((data) => setUpProducts(data));
    }, []);


    return (
        <div className='ml-[260px] mt-16 w-[50%] text-white bg-gray-800 px-4 py-6'>
            <p className='text-xl font-semibold pb-5 border-b-2'>Product Updates</p>

            {upProducts.map((upData, index) => (
                <div key={index} className='flex items-center justify-between pt-5 mb-3'>
                <div className='flex items-center     gap-x-5'>
                    <div className=' bg-gray-600 p-3 rounded-lg'>
                    <BsBank2 className=' text-6xl'/>
                    </div>
                    <div>
                        <p className='text-xl font-bold text-[#4af433]'>{upData.title}</p>
                        <p className='text-lg text-gray-400'>{upData.category}</p>
                    </div>
                </div>
               <div className='flex items-center gap-x-8'>
               <p className='bg-green-600 bg-opacity-10 px-3 py-1 text-green-600 rounded-md'>{upData.quantity} pcs</p>
               <p className='bg-yellow-200 bg-opacity-10 px-3 py-1 text-yellow-300 rounded-md'>{upData.date}</p>
               </div>
            </div>
            ))}

            
        </div>
    );
};

export default ProductsUpdates;