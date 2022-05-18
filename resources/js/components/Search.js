import React ,{ useRef ,useState ,useEffect} from 'react';
import { useParams ,NavLink } from 'react-router-dom';
import axios from 'axios';

function Search() {
  const params = useParams()
  const id = params.id
  const [songinfo, setSonginfo] = useState("");
  const [allProduct, setAllProduct] = useState([]);
  
  useEffect(() => {
    setSonginfo(id);
    const data = new FormData() 
    data.append('search', id)
    axios.post("/api/product-search", data)
      .then((response) => {
        setAllProduct(response.data.allData)
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return (
    <div className="container">
    <div className="row justify-content-center">
        <div className="col-md-8">
            <div className="card">
                <div className="card-header"><b>Search page</b></div>
                <div className="card-body">
                    <p>This is search component . Searching now: <b>{songinfo}</b></p>
                </div>
            </div>

<section style={{backgroundColor: '#eee'}}>
  <div className="container py-5">
    <div className="row">
    {
       allProduct.length > 0 ? (
        allProduct.map((singledata) => (
      <div className="col-md-12 col-lg-4 mb-4 mb-lg-0" style={{paddingBottom:'5px'}}>
        <div className="card text-black">
          <img src={"/"+singledata.product_image} 
          className="card-img-top" alt="iPhone" />
          <div className="card-body">
            <div className="text-center mt-1">
              <h4 className="card-title">{singledata.product_name}</h4>
              <h6 className="text-primary mb-1 pb-3">Product price : ৳ {singledata.product_price}</h6>
            </div>
            
            <div className="d-flex flex-row">
              <button type="button" className="btn btn-primary btn-block flex-fill me-1" data-mdb-ripple-color="dark">
                View product
              </button>
              
            </div>
          </div>
        </div>
      </div>
  ))
  ) : (
      <h6 className="text-danger text-center">No Data Found </h6>
  )
}

    </div>
  </div>
</section>




        </div>
    </div>
    <br/><br/><br/><br/>
    </div>
  )
}

export default Search