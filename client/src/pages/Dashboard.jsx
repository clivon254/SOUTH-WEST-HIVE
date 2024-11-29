

import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/store'
import { useSelector } from 'react-redux'
import Error from '../components/Error'
import { Table } from 'flowbite-react'
import { GiAccordion, GiBrainDump, GiClothesline, GiFoodChain, GiPackedPlanks } from 'react-icons/gi'
import { MdArticle, MdDriveFileMove } from 'react-icons/md'
import { FaLaravel, FaPodcast, FaUsers } from 'react-icons/fa'
import Graph from '../components/graph'


export default function Dashboard() {

  const {stats,statsLoading,statsError,fetchStats} = useContext(StoreContext)

  const {currentUser} = useSelector(state => state.user)

  return (

   <>

      {!statsError && (

        <section className="section space-y-5">

          <h2 className="text-center title2">Dashboard</h2>
          
          <div className="space-y-10">

              {/* stats */}
              <div className="grid gid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-y-8 gap-x-5">
                  
                  {/* salesPreson */}
                  {currentUser.accountType === "salesperson" &&  (

                      <>
                      
                          {/* pendind orders */}
                          <div  className="p-3 space-y-3 border border-zinc-600 rounded-md dark:border-zinc-200">
                            
                            <div className="flex items-center justify-between">

                                <h1 className="font-title text-base font-semibold">TOTAL PENDING ORDERS</h1>

                                <span className=""><GiPackedPlanks/></span>

                            </div>

                            <div className="font-logo text-xl">
                                {stats?.totatPendingOrders || 0}
                            </div>

                          </div>

                          {/* merchendise */}
                          <div  className="p-3 space-y-3 border border-zinc-600 rounded-md dark:border-zinc-200">
                            
                            <div className="flex items-center justify-between">

                                <h1 className="font-title text-base font-semibold">TOTAL MERCHENDISE</h1>

                                <span className=""><GiClothesline/></span>

                            </div>

                            <div className="font-logo text-xl">
                                {stats?.totalMerchendiseSalesperson || 0}
                            </div>

                          </div>

                          {/* accessories */}
                          <div  className="p-3 space-y-3 border border-zinc-600 rounded-md dark:border-zinc-200">
                            
                            <div className="flex items-center justify-between">

                                <h1 className="font-title text-base font-semibold">TOTAL ACCESSORIES</h1>

                                <span className=""><GiAccordion/></span>

                            </div>

                            <div className="font-logo text-xl">
                                {stats?.totalAccessoriesSalesperson || 0}
                            </div>

                          </div>

                          {/* brand */}
                          <div  className="p-3 space-y-3 border border-zinc-600 rounded-md dark:border-zinc-200">
                            
                            <div className="flex items-center justify-between">

                                <h1 className="font-title text-base font-semibold">TOTAL BRANDS</h1>

                                <span className=""><GiBrainDump/></span>

                            </div>

                            <div className="font-logo text-xl">
                                {stats?.totalBrandsSalesperson || 0}
                            </div>

                          </div>

                      </>

                  )}

                  {/* caterer */}
                  {currentUser.accountType === "caterer" &&  (

                      <>
                      
                          {/* pendind orders */}
                          <div  className="p-3 space-y-3 border border-zinc-600 rounded-md dark:border-zinc-200">
                            
                            <div className="flex items-center justify-between">

                                <h1 className="font-title text-base font-semibold">TOTAL PENDING ORDERS</h1>

                                <span className=""><GiPackedPlanks/></span>

                            </div>

                            <div className="font-logo text-xl">
                                {stats?.totatPendingOrders || 0}
                            </div>

                          </div>

                          {/* food */}
                          <div  className="p-3 space-y-3 border border-zinc-600 rounded-md dark:border-zinc-200">
                            
                            <div className="flex items-center justify-between">

                                <h1 className="font-title text-base font-semibold">TOTAL FOOD ITEMS</h1>

                                <span className=""><GiFoodChain/></span>

                            </div>

                            <div className="font-logo text-xl">
                                {stats?.totalCateringCaterer || 0}
                            </div>

                          </div>

                      </>

                  )}

                  {/* writer*/}
                  {currentUser.accountType === "writer" &&  (

                      <>
                      
                          {/* post */}
                          <div  className="p-3 space-y-3 border border-zinc-600 rounded-md dark:border-zinc-200">
                            
                            <div className="flex items-center justify-between">

                                <h1 className="font-title text-base font-semibold">TOTAL ARTICLES</h1>

                                <span className=""><MdArticle/></span>

                            </div>

                            <div className="font-logo text-xl">
                                {stats?.totalPosts || 0}
                            </div>

                          </div>

                          {/* followers*/}
                          <div  className="p-3 space-y-3 border border-zinc-600 rounded-md dark:border-zinc-200">
                            
                            <div className="flex items-center justify-between">

                                <h1 className="font-title text-base font-semibold">TOTAL FOLLOWERS</h1>

                                <span className=""><FaUsers/></span>

                            </div>

                            <div className="font-logo text-xl">
                                {stats?.totalFollowers || 0}
                            </div>

                          </div>

                      </>

                  )} 

                  {/* media*/}
                  {currentUser.accountType === "media" &&  (

                      <>
                      
                          {/* film */}
                          <div  className="p-3 space-y-3 border border-zinc-600 rounded-md dark:border-zinc-200">
                            
                            <div className="flex items-center justify-between">

                                <h1 className="font-title text-base font-semibold">TOTAL FILMS</h1>

                                <span className=""><MdDriveFileMove/></span>

                            </div>

                            <div className="font-logo text-xl">
                                {stats?.totalShortfilmsAdmin || 0}
                            </div>

                          </div>

                          {/* reels*/}
                          <div  className="p-3 space-y-3 border border-zinc-600 rounded-md dark:border-zinc-200">
                            
                            <div className="flex items-center justify-between">

                                <h1 className="font-title text-base font-semibold">TOTAL REELS</h1>

                                <span className=""><FaLaravel/></span>

                            </div>

                            <div className="font-logo text-xl">
                                {stats?.totalReelsAdmin || 0}
                            </div>

                          </div>

                          {/* podcast*/}
                          <div  className="p-3 space-y-3 border border-zinc-600 rounded-md dark:border-zinc-200">
                            
                            <div className="flex items-center justify-between">

                                <h1 className="font-title text-base font-semibold">TOTAL PODCASTS</h1>

                                <span className=""><FaPodcast/></span>

                            </div>

                            <div className="font-logo text-xl">
                                {stats?.totalPodcastsAdmin || 0}
                            </div>

                          </div>

                      </>

                  )}

              </div>
              
              {/* last 5 series */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 gap-x-8">

                {currentUser.accountType === "salesperson" && (

                  <>

                      {/* last 5 Brands*/}
                      <div className="">

                          <h1 className="title3 mb-5">Last 5 Brands</h1>

                          {stats?.last5Brands?.length > 0 ? 
                            (
                              <div className="tabler">
                                
                                <Table className="">

                                  <Table.Body className="table-title">

                                    <Table.Cell>image</Table.Cell>

                                    <Table.Cell>name</Table.Cell>

                                    <Table.Cell>Date</Table.Cell>

                                  </Table.Body>

                                  {stats?.last5Brands?.map((product,index) => (

                                    <Table.Body>


                                      <Table.Cell>
                                        <img 
                                          src={product?.image}
                                          alt="" 
                                          className="h-10 w-10 object-fit" 
                                        />
                                      </Table.Cell>

                                      <Table.Cell>{product?.name}</Table.Cell>

                                      <Table.Cell>{new Date(product?.createdAt).toLocaleDateString()}</Table.Cell>

                                    </Table.Body>

                                  ))}

                                </Table>

                              </div>
                            ) 
                              :
                            (
                              <p className="">There are no brands yet!!!!</p>
                            ) 
                          }
                        
                      </div>

                      {/* last 5 Merchendise */}
                      <div className="">

                          <h1 className="title3 mb-3">Last 5 Merchendise</h1>

                          {stats?.last5MerchendiseAdmin?.length > 0 ? 
                            (
                              <div className="tabler">
                                
                                <Table className="">

                                  <Table.Body className="table-title">

                                    <Table.Cell>image</Table.Cell>

                                    <Table.Cell>name</Table.Cell>

                                    <Table.Cell>Date </Table.Cell>

                                  </Table.Body>

                                  {stats?.last5MerchendiseAdmin?.map((product,index) => (

                                    <Table.Body>


                                      <Table.Cell>
                                        <img 
                                          src={product?.images[0]}
                                          alt="" 
                                          className="h-10 w-10 object-fit" 
                                        />
                                      </Table.Cell>

                                      <Table.Cell>{product?.name}</Table.Cell>

                                      <Table.Cell>{new Date(product?.createdAt).toLocaleDateString()}</Table.Cell>

                                    </Table.Body>

                                  ))}

                                </Table>

                              </div>
                            ) 
                              :
                            (
                              <p className="">There are no merchendise yet!!!!</p>
                            ) 
                          }
                        
                      </div>

                      {/* last 5 Accessories */}
                      <div className="">

                          <h1 className="title3 mb-3">Last 5 Accessories</h1>

                          {stats?.last5AccessoriesAdmin?.length > 0 ? 
                            (
                              <div className="tabler">
                                
                                <Table className="">

                                  <Table.Body className="table-title">

                                    <Table.Cell>image</Table.Cell>

                                    <Table.Cell>name</Table.Cell>

                                    <Table.Cell>Date </Table.Cell>

                                  </Table.Body>

                                  {stats?.last5AccessoriesAdmin?.map((product,index) => (

                                    <Table.Body>


                                      <Table.Cell>
                                        <img 
                                          src={product?.images[0]}
                                          alt="" 
                                          className="h-10 w-10 object-fit" 
                                        />
                                      </Table.Cell>

                                      <Table.Cell>{product?.name}</Table.Cell>

                                      <Table.Cell>{new Date(product?.createdAt).toLocaleDateString()}</Table.Cell>

                                    </Table.Body>

                                  ))}

                                </Table>

                              </div>
                            ) 
                              :
                            (
                              <p className="">There are no accessories yet!!!!</p>
                            ) 
                          }
                        
                      </div>

                  </>

                )}

                {currentUser.accountType === "caterer" && (

                  <>

                      {/* last 5 food*/}
                      <div className="">

                          <h1 className="title3 mb-5">Last 5 Brands</h1>

                          {stats?.last5CateringCaterer?.length > 0 ? 
                            (
                              <div className="tabler">
                                
                                <Table className="">

                                  <Table.Body className="table-title">

                                    <Table.Cell>image</Table.Cell>

                                    <Table.Cell>name</Table.Cell>

                                    <Table.Cell>Date</Table.Cell>

                                  </Table.Body>

                                  {stats?.last5CateringCaterer?.map((product,index) => (

                                    <Table.Body>


                                      <Table.Cell>
                                        <img 
                                          src={product?.images[0]}
                                          alt="" 
                                          className="h-10 w-10 object-fit" 
                                        />
                                      </Table.Cell>

                                      <Table.Cell>{product?.name}</Table.Cell>

                                      <Table.Cell>{new Date(product?.createdAt).toLocaleDateString()}</Table.Cell>

                                    </Table.Body>

                                  ))}

                                </Table>

                              </div>
                            ) 
                              :
                            (
                              <p className="">There are no food yet!!!!</p>
                            ) 
                          }
                        
                      </div>
                      
                  </>

                )}

                {currentUser.accountType === "writer" && (

                  <>

                      {/* last 5 articles*/}
                      <div className="">

                          <h1 className="title3 mb-5">Last 5 Articles</h1>

                          {stats?.last5Posts?.length > 0 ? 
                            (
                              <div className="tabler">
                                
                                <Table className="">

                                  <Table.Body className="table-title">

                                    <Table.Cell>image</Table.Cell>

                                    <Table.Cell>name</Table.Cell>

                                    <Table.Cell>Date</Table.Cell>

                                  </Table.Body>

                                  {stats?.last5Posts?.map((product,index) => (

                                    <Table.Body>


                                      <Table.Cell>
                                        <img 
                                          src={product?.images[0]}
                                          alt="" 
                                          className="h-10 w-10 object-fit" 
                                        />
                                      </Table.Cell>

                                      <Table.Cell>{product?.title}</Table.Cell>

                                      <Table.Cell>{new Date(product?.createdAt).toLocaleDateString()}</Table.Cell>

                                    </Table.Body>

                                  ))}

                                </Table>

                              </div>
                            ) 
                              :
                            (
                              <p className="">There are no articles yet!!!!</p>
                            ) 
                          }
                        
                      </div>

                      {/* last 5 followers*/}
                      <div className="">

                          <h1 className="title3 mb-5">Last 5 followers</h1>

                          {stats?.last5Followers?.length > 0 ? 
                            (
                              <div className="tabler">
                                
                                <Table className="">

                                  <Table.Body className="table-title">

                                    <Table.Cell>image</Table.Cell>

                                    <Table.Cell>name</Table.Cell>

                                    <Table.Cell>Date</Table.Cell>

                                  </Table.Body>

                                  {stats?.last5Followers?.map((product,index) => (

                                    <Table.Body>


                                      <Table.Cell>
                                        <img 
                                          src={product?.image}
                                          alt="" 
                                          className="h-10 w-10 object-fit" 
                                        />
                                      </Table.Cell>

                                      <Table.Cell>{product?.name}</Table.Cell>

                                      <Table.Cell>{new Date(product?.createdAt).toLocaleDateString()}</Table.Cell>

                                    </Table.Body>

                                  ))}

                                </Table>

                              </div>
                            ) 
                              :
                            (
                              <p className="">There are no followers yet!!!!</p>
                            ) 
                          }
                        
                      </div>
                      
                      {/* veiw stats */}
                      <div className="space-y-3">

                        <h2 className="title3">veiws stats</h2>

                        <Graph dt={stats?.veiwStats}/>

                      </div>
                      
                      {/* follow stats */}
                      <div className="space-y-3">

                        <h2 className="title3">followers stats</h2>

                        <Graph dt={stats?.followerStats}/>

                      </div>
                      
                  </>

                )}

              </div>

             

          </div>

        </section>

      )}

      {statsError && (

        <Error retry={fetchStats} />

      )}

    </>  

  )

}
