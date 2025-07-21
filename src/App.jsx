import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(start + 5)
  const totalItems = apiData.length;
  const singlePageItems = 5;
  const totalPages = Math.ceil(totalItems / singlePageItems)
  console.log(totalPages)

  const buttonClickHandler = (index) => {
    setCurrentPage(index + 1)
    setStart(index * singlePageItems)
    setEnd((index + 1) * singlePageItems);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch('https://dummyjson.com/products')
        const jsonData = await data.json()
        setApiData(jsonData.products); // we only need products 

      } catch (err) {
        console.error(err)
      }

    }
    fetchData();
  }, [])
  
  return (
    <>
      <div className='main-container'>
        <div className='pagination'>
          {
            Array.from({ length: totalPages }, (_, index) => (
              <div onClick={() => buttonClickHandler(index)} >
                <button className={currentPage==(index+1)?'active':''}>{index + 1}</button>
              </div>
            ))
          }
        </div>
        <div className='product-container'>{
          apiData.slice(start, end).map((data) => (
            <div key={data.id} className='product-card'>
              <p>{data.title}</p>
              <img src={data.thumbnail} />
            </div>
          ))
        }
        </div>
      </div>
    </>
  )
}

export default App
