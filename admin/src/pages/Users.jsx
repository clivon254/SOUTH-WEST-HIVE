
import React, { useContext } from 'react'
import { StoreContext } from '../context/store'
import Error from '../components/Error'

export default function Users() {

  const {users,userLoading ,userError,fetchUsers} =  useContext(StoreContext)

  return (

    <section className="section space-y-10">

      {!userError && (<h1 className="text-center title">Users</h1> )}

      {!userLoading && !userError && (

        <div className=""></div>
        
      )}

      {userLoading && !userError && (

        <div className="grid place-content-center ">

          <div className="flex items-center gap-x-2 mt-20">

            <span className="loading"/> Loading .....

          </div>

        </div>

      )}

      {userError && (

        <Error retry={fetchUsers}/>

      )}

    </section>
    
  )

}
