

import React, { useContext, useEffect ,useState} from 'react'
import { StoreContext } from '../context/store'
import axios from 'axios'
import Loading from '../components/Loading'
import Error from '../components/Error'

export default function Orders() {
  
    const {url,token} = useContext(StoreContext)

    const [orders, setOrders] = useState([])

    const [ordersLoading, setOrdersLoading] = useState(false)

    const [ordersError, setOrdersError] = useState(false)

    // fetch orders
    const fetchOrders = async () => {

        setOrdersLoading(true)

        setOrdersError(false)

        try
        {
            const res = await axios.get(url + "/api/order/get-userOrders",{headers:{token}})

            if(res.data.success)
            {
                setOrders(res.data.orders)

                setOrdersLoading(false)

            }
        }
        catch(error)
        {
            console.log(error.message)

            setOrdersError(true)

            setOrdersLoading(false)
        }
    }

    useEffect(() => {
        
        fetchOrders()

    },[])

    console.log(orders)

 return (
    <>

        {!ordersError && !ordersLoading &&(

            <section className="section space-y-5">

                <h2 className="title2">My Orders</h2>
              
               <div className="">

                {orders.map((order,index) => (

                    <div key={index} className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr_1fr] lg:grid-cols-[2fr_1fr_1fr_1fr] gap-3 items-start border-2  border-zinc-700 dark:border-zinc-300 text-xs p-5 rounded-md">
                        
                        <div className="">
                            
                            {/* order items */}
                            <div className="">
                                {order?.items.map((item,index) => {

                                    if(index === order.items.length -1)
                                    {
                                        return (

                                            <div className="py-0.5 flex gap-x-3">

                                                <img 
                                                    src={item?.images[0]}
                                                    alt="" 
                                                    className="w-8 h-8" 
                                                />

                                                {item.name} X {item.quantity} {item.size && (<span className=""> size: {item.size} </span>)}
                                            </div>

                                        )
                                    }
                                    else
                                    {
                                        return (

                                            <div className="py-0.5 flex gap-x-3">

                                                <img 
                                                    src={item?.images[0]}
                                                    alt="" 
                                                    className="w-8 h-8" 
                                                />

                                                {item.name} X {item.quantity} {item.size && (<span className=""> size:{item.size}</span>)} ,
                                            </div>

                                        )
                                    }
                                })}
                            </div>
                            
                            {/* name */}
                            <p className="mt-3 font-medium">
                                {order.address.firstName + " " + order.address.lastName}
                            </p>
                            
                            {/* address */}
                            <div className="">

                                <p className="">{order.address.address}</p>

                                <p className="">{order.address.City}</p>
                                
                            </div>
                            
                            {/* phone */}
                            <p className="">
                                {order.address.phone}
                            </p>

                        </div>

                        <div className="">

                            <p className="text-sm">Items:{order.items.length}</p>

                            <p className="mt-3">Method : {order.paymentmethod}</p>

                            <p className="">Payment : {order.payment ? "Done" : "Pending"}</p>
                            
                            <p className="">Date : {new Date(order.createdAt).toLocaleString()}</p>
                        </div>
                        
                        {/* amount */}
                        <p className="">
                            {(order?.amount).toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
                        </p>
                        
                        {/* status */}
                        <div className="border border-zinc-700 dark:border-zinc-300 p-2 rounded-xl flex items-center gap-x-3">
              
                            <div className="w-4 h-4 bg-primaryLight/50 dark:bg-rose-700 rounded-full grid place-content-center ">

                                <span className="block w-2 h-2 bg-primaryLight dark:bg-rose-300 rounded-full animate-ping"/>

                            </div>

                             <span className="">{order.status}</span>

                        </div>

                    </div>

                ))}

               </div>

            </section>

        )}

        {!ordersError && ordersLoading && (

            <div className="grid place-content-center">
                
                <div className="mt-20">

                 <Loading />

                 </div>

            </div>
        )}

        {ordersError && (

            <Error retry={fetchOrders}/>

        )}

    </>

  )

}
