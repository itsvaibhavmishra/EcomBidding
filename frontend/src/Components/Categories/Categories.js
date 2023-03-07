import React from 'react';
import { Link } from 'react-router-dom';
import './Categories.css';

function Categories() {
  // if fetching Categories from backend
  // const [categories, setCategories] = useState();
  // useEffect(() => {
  //     const fetchCategories = async() => {
  //         try{
  //             const {data} = await axios.get(`/api/products/categories`);
  //             setCategories(data)
  //         }
  //         catch(err){
  //             toast.error(getError(err));
  //         }
  //     }
  //     fetchCategories();
  // }, [])

  return (
    <div className="mt-4">
      <div style={{ '--count': 5 }} className="overflow-auto">
        <ul className="u__l">
          <li style={{ '--index': 1 }} className="l__i">
            <div
              href="/"
              target="_blank"
              rel="noreferrer noopener"
              className="__a"
            >
              <span className="__span">
                <i className="__i pt-1 -mx-1 fas fa-filter"></i>Filter
              </span>
            </div>
          </li>
          <li style={{ '--index': 2 }} className="l__i">
            <Link
              to={`/search?category=Clothings`}
              rel="noreferrer noopener"
              className="__a"
            >
              <span className="__span">
                <i className="__i"></i>Clotings
              </span>
            </Link>
          </li>
          <li style={{ '--index': 3 }} className="l__i">
            <Link
              to={`/search?category=Shoes`}
              rel="noreferrer noopener"
              className="__a"
            >
              <span className="__span">
                <i className="__i"></i>Shoes
              </span>
            </Link>
          </li>
          <li style={{ '--index': 4 }} className="l__i">
            <Link
              to={`/search?category=Electronics`}
              rel="noreferrer noopener"
              className="__a"
            >
              <span className="__span">
                <i className="__i"></i>Electronics
              </span>
            </Link>
          </li>
          <li style={{ '--index': 5 }} className="l__i">
            <Link
              to={`/search?category=all`}
              rel="noreferrer noopener"
              className="__a"
            >
              <span className="__span whitespace-nowrap">
                <i className="__i"></i>Show All
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Categories;
