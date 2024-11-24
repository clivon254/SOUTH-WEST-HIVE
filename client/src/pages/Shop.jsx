
import React, { useContext, useEffect, useState } from 'react'
import { MdSearch } from 'react-icons/md'
import { StoreContext } from '../context/store'
import ProductCard from '../components/ProductCard'

export default function Shop() {

  const {products} = useContext(StoreContext)

  const Products = products.filter((product) => product.Item !== "Catering")

  const [searchProduct ,setSearchProduct] = useState("")

  const [showFilter ,setShowFilter] = useState(false)

  const [filteredProducts ,setFilteredProducts] = useState([])

  const [category ,setCategory] = useState([])

  const [Item ,setItem] = useState([])

  const [sortType ,setSortType] = useState('relevant')

  console.log(Products)


  // toggleCategory
  const toggleCategory = (e) => {

    if(category.includes(e.target.value))
    {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else
    {
      setCategory(prev => [...prev,e.target.value])
    }

  }


  // toggleItem
  const toggleItem = (e) => {

    if(Item.includes(e.target.value))
    {
      setItem(prev => prev.filter(item => item !== e.target.value))
    }
    else
    {
      setItem(prev => [...prev,e.target.value])
    }

  }

  // applyfilter
  const applyFilter = () => {

    let productsCopy = Products.slice()

    if(searchProduct)
    {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(searchProduct.toLowerCase()))
    }

    if(category.length > 0)
    {
      productsCopy = productsCopy.filter(item => category.includes(item.category))
    }

    if(Item.length > 0)
    {
      productsCopy = productsCopy.filter(item => Item.includes(item.Item))
    }

    setFilteredProducts(productsCopy)

  }


  // sortProduct
  const sortProducts = () => {


    let fpCopy = filteredProducts.slice()

    switch(sortType)
    {
      case 'low-high':
        setFilteredProducts(fpCopy.sort((a,b) => (a.regularPrice - b.regularPrice)))
        break;

      case 'high-low':
        setFilteredProducts(fpCopy.sort((a,b) => (b.regularPrice - a.regularPrice)))
        break;

      default:
        applyFilter()
        break;

    }
  }


  useEffect(() => {

    setFilteredProducts(Products)

  },[Products])


  useEffect(() => {

    applyFilter()

  },[category,Item,Products])


  useEffect(() => {

    sortProducts()

  },[sortType])


  return (

    <section className="section">

      {/* searchbar */}
      <div className="text-center mb-4">

        <div className="search-bar">

          <input 
              type="text" 
              className="search-input" 
              value={searchProduct}
              onChange={(e) => setSearchProduct(e.target.value)}
              style={{
                outline:'none'
              }}
          />

          <MdSearch size={32}/>

        </div>

      </div>

      <div className="flex flex-col lg:flex-row gap-5">

        {/* fiter Products */}
        <div className="space-y-3">

          <h2 
              className="cursor-pointer title2"
              onClick={() => setShowFilter(!showFilter)}
          >
            Filters
          </h2>

          {/* Item */}
          <div className={`space-y-4 border border-zinc-500 dark:border-zinc-300 rounded-md p-3 ${showFilter ? "": "hidden lg:block"}`}>

            <h3 className="title3">Item</h3>

            <div className="flex flex-col gap-y-3">

                {/* merchendise */}
                <div className="flex items-center gap-x-2">

                  <input 
                    type="checkbox" 
                    className="w-5 h-5 rounded-md" 
                    value={`Merchendise`}
                    onChange={toggleItem}
                  />

                  <label htmlFor="" className="label">
                    Merchendise
                  </label>

                </div>

                {/* accessories */}
                <div className="flex items-center gap-x-2">

                  <input 
                    type="checkbox" 
                    className="w-5 h-5 rounded-md" 
                    value={`Accessories`}
                    onChange={toggleItem}
                  />

                  <label htmlFor="" className="label">
                    Accessories
                  </label>

                </div>

            </div>

          </div>

          {/* category */}
          <div className={`space-y-4 border border-zinc-500 dark:border-zinc-300 rounded-md p-3 ${showFilter ? "": "hidden lg:block"}`}>

            <h3 className="title3">Categories</h3>

            <div className="flex flex-col gap-y-3">
              
              {/* Hoody */}
              <div className="flex items-center gap-x-2">

                  <input 
                    type="checkbox" 
                    className="w-5 h-5 rounded-md" 
                    value={`Hoody`}
                    onChange={toggleCategory}
                  />

                  <label htmlFor="" className="label">
                    Hoody
                  </label>

              </div>

              {/* Polo */}
              <div className="flex items-center gap-x-2">

                  <input 
                    type="checkbox" 
                    className="w-5 h-5 rounded-md" 
                    value={`Polo`}
                    onChange={toggleCategory}
                  />

                  <label htmlFor="" className="label">
                    Polo
                  </label>

              </div>


              {/* magazine */}
              <div className="flex items-center gap-x-2">

                  <input 
                    type="checkbox" 
                    className="w-5 h-5 rounded-md" 
                    value={`Magazine`}
                    onChange={toggleCategory}
                  />

                  <label htmlFor="" className="label">
                    Magazine
                  </label>

              </div>

              {/* T-shirt */}
              <div className="flex items-center gap-x-2">

                  <input 
                    type="checkbox" 
                    className="w-5 h-5 rounded-md" 
                    value={`T-shirt`}
                    onChange={toggleCategory}
                  />

                  <label htmlFor="" className="label">
                    T-shirt
                  </label>

              </div>

              {/* Wrist Band*/}
              <div className="flex items-center gap-x-2">

                  <input 
                    type="checkbox" 
                    className="w-5 h-5 rounded-md" 
                    value={`Wrist Band`}
                    onChange={toggleCategory}
                  />

                  <label htmlFor="" className="label">
                    Wrist Band
                  </label>

              </div>

            </div>

          </div>

        </div>

        {/* products */}
        <div className="flex-1 space-y-5">

          {/* header */}
          <div className="flex items-center justify-between">

            <h2 className="title3">All products</h2>

            <select 
              onChnage={(e) => setSortType(e.target.value)} 
              className="input"
            >
              
              <option value="relevant">Sort by:Relevant</option>

              <option value="low-high">Sort by: Low price</option>

              <option value="high-low">Sort by: High price</option>

            </select>

          </div>

          {/* products map */}
          <div className="">

            {filteredProducts.length > 0 ? 
            (

              <div className="grid grid-cols-2 gap-y-10 gap-x-5 md:grid-cols-3  lg:grid-cols-4  xl:grid-cols-5">

                {filteredProducts?.map((product,index) => (

                  <ProductCard key={index} product={product}/>

                ))}

              </div>

           ) 
           :
           (
              <p className="text-2xl mt-10">Sorry ,no product found . . . .</p>
           )}

          </div>

        </div>

      </div>
      
    </section>
    
  )

}
