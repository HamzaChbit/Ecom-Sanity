'use client'

import { useUser } from '@clerk/nextjs';
import { getOrdersByEmail } from '@/sanity/order-util';
import { useState, useEffect } from 'react';

export default function Order() {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const fetchedOrders = await getOrdersByEmail(user?.emailAddresses[0]?.emailAddress, page);
      setOrders((prevOrders) => [...prevOrders, ...fetchedOrders]);
      setLoading(false);
    };

    if (user) {
      fetchOrders();
    }
  }, [user, page]);

  const loadMoreOrders = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className='max-w-3xl mx-auto mt-20'>
      <h1 className="text-3xl text-center font-semibold text-[#5B20B6] mb-6">Your Orders Page</h1>

      <table className="w-full border-collapse">
        <thead>
          <tr className="text-[#5B20B6] border-b border-gray-200">
            <th className="py-2 px-4">Product</th>
            <th className="py-2 px-4">Quantity</th>
            <th className="py-2 px-4">Paid</th>
            <th className="py-2 px-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="hover:bg-gray-50 text-center border-b border-gray-300 text-[#5B20B6]">
              <td className="py-2 px-4 flex items-center">
                {order.name}
              </td>
              <td className="py-2 px-4">{order.qty}</td>
              <td className="py-2 px-4">${order.price * order.qty}</td>
              <td className="py-2 px-4">
                {order.paid ? (
                  <span className="text-green-500">Paid</span>
                ) : (
                  <span className="text-red-500">Unpaid</span>
                )}
              </td>
              <td className="py-2 px-4">
                {order.delivered ? (
                  <span className="text-green-500">Delivered</span>
                ) : (
                  <span className="text-red-500">In transit</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {
  orders.length > 10 && (
    loading ? (
      <p>Loading...</p>
    ) : (
      <div className='flex justify-center my-2'>
        <button onClick={loadMoreOrders} className='border-2 px-4 py-2 rounded-lg'>Load More</button>
      </div>
    )
  )
}

    </div>
  );
}
