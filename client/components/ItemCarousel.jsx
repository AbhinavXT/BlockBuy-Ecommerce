import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'

const ItemCarousel = () => {
  return (
    <Carousel
      className="ml-60 h-[400px] w-[400px]"
      showThumbs={false}
      autoPlay={true}
      interval={1500}
      transitionTime={500}
      infiniteLoop={true}
      showStatus={false}
      showIndicators={false}
      stopOnHover={false}
    >
      <div>
        <img src="/assets/shirt.png" className="h-[400px] w-[50px]" />
      </div>
      <div>
        <img src="/assets/shoes.png" className="h-[400px] w-[50px]" />
      </div>
      <div>
        <img src="/assets/phone.png" className="h-[400px] w-[50px]" />
      </div>
    </Carousel>
  )
}

export default ItemCarousel
