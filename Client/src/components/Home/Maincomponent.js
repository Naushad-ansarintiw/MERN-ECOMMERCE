import React, { useEffect, useContext } from 'react'
import Baneer from './Banner.js'
import './home.css'
import Slide from './slide.js'
// import { getProduct } from '../redux/actions/action.js'
// import { useDispatch,useSelector } from 'react-redux'
import noteContext from '../../context/ProductData/noteContext.js'


const Maincomponent = () => {


  // Using redux but didnot work 

  // const {product} = useSelector(state => state.getproductsdata);
  // console.log(product);

  // const dispatch = useDispatch();

  // useEffect(()=>{
  //   dispatch(getProduct());
  // },[dispatch]);

  // Now using context api
  const context = useContext(noteContext);
  const { products,getNotes } = context;

  useEffect(() => {
     getNotes();
    //  console.log(products)
    // eslint-disable-next-line
  }, []);

  return (
    <div className='home_section'>
      <div className="banner_part">
        <Baneer />
      </div>
      <div className="slide_part">
        <div className="left_slide">
          <Slide title="Deal of the Day" products={products} />
        </div>
        <div className="right_slide">
          <h4>Festival latest launches</h4>
          <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/Jupiter/Launches/T3/DesktopGateway_CategoryCard2x_758X608_T3._SY608_CB639883570_.jpg" alt="images" />
          <a href="/">See More</a>
        </div>
      </div>

      <Slide title="Today's Deal" products={products} />
      <div className="center_img">
        <img src="https://m.media-amazon.com/images/G/31/AMS/IN/970X250-_desktop_banner.jpg" alt="images" />
      </div>
      <Slide title="Best Seller" products={products} />
      <Slide title="Upto 80% off" products={products} />
    </div>
  )
}

export default Maincomponent
