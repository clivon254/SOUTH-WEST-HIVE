

import React, { useContext } from 'react'
import Stats from '../components/Stats'
import { StoreContext } from '../context/store'
import { Table } from 'flowbite-react'
import { Link } from 'react-router-dom'
import Error from '../components/Error'
import { useEffect } from 'react'

export default function Dashboard() {

  const {stats,statsError,fetchStats,token} = useContext(StoreContext)

  useEffect(() => {

    fetchStats()

  },[token])

  return (

    <>

      {!statsError && (
        
        <section className="section ">

          <h1 className="title text-center mb-10">Dashboard</h1>

          <div className="space-y-10">

            <Stats/>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 gap-x-8">

              {/* last 5 users */}
              <div className="">

                  <h1 className="title3 mb-3">Last 5 users</h1>

                  <div className="tabler">
                    {stats?.last5UsersAdmin?.length ? 
                    (
                      <Table className="">

                        <Table.Body className="table-title">

                          <Table.Cell>image</Table.Cell>

                          <Table.Cell>name</Table.Cell>

                          <Table.Cell>account</Table.Cell>

                          <Table.Cell>Date </Table.Cell>

                        </Table.Body>

                        {stats?.last5UsersAdmin?.map((user,index) => (

                          <Table.Body>

                            <Table.Cell>
                              <img 
                                src={user.profilePicture}
                                alt="" 
                                className="h-10 w-10 rounded-full" 
                              />
                            </Table.Cell>

                            <Table.Cell>{user.username}</Table.Cell>

                            <Table.Cell>{user.accountType}</Table.Cell>

                            <Table.Cell>{new Date(user.createdAt).toLocaleDateString()}</Table.Cell>

                          </Table.Body>

                        ))}

                      </Table>

                    ) 
                      : 
                    (
                      <p className="">There are no users yet !!!</p>
                    )}

                  </div>
                
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
                      <p className="">There are no accessories yet!!!!</p>
                    ) 
                  }
                
              </div>

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

              {/* last 5 Posts */}
              <div className="">

                  <h1 className="title3 mb-3">Last 5 Posts</h1>

                  {stats?.last5PostsAdmin?.length > 0 ? 
                    (
                      <div className="tabler">
                        
                        <Table className="">

                          <Table.Body className="table-title">

                            <Table.Cell>image</Table.Cell>

                            <Table.Cell>Title</Table.Cell>

                            <Table.Cell>Date </Table.Cell>

                          </Table.Body>

                          {stats?.last5PostsAdmin?.map((post,index) => (

                            <Table.Body>


                              <Table.Cell>
                                <img 
                                  src={post?.images[0]}
                                  alt="" 
                                  className="h-10 w-10 object-fit" 
                                />
                              </Table.Cell>

                              <Table.Cell>
                                <Link to={`/post/${post.slug}`}>
                                  {post?.title}
                                </Link>
                              </Table.Cell>

                              <Table.Cell>{new Date(post?.createdAt).toLocaleDateString()}</Table.Cell>

                            </Table.Body>

                          ))}

                        </Table>

                      </div>
                    ) 
                      :
                    (
                      <p className="">There are no posts yet!!!!</p>
                    ) 
                  }
                
              </div>

            </div>
          
          </div>

        </section>

      )}

      {statsError && (

        <Error retry={fetchStats}/>

      )}

    </>

 
  
  )

}
