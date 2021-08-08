import React, { useState, useEffect, useRef } from 'react'
// import Swiper from 'swiper'
import './style.scss'

interface swiperProps {
  imageList: []  
}

export default (props: swiperProps) => {

  const {
    imageList = [
      'https://img.js.design/assets/img/60f8ee8161957d72f586faf0.png',
      'https://img.js.design/assets/img/60f8ee8061957d72f586faef.png',
      'https://img.js.design/assets/img/60f8ee8061957d72f586faee.png'
    ]
  } = props

  const swiperRef = useRef(null)
  const paginationRef = useRef(null)

  useEffect(() => {
    console.log(swiperRef)
    if (swiperRef.current) {
      new Swiper(swiperRef.current!, {
        // slidesPerView: 'auto',
        initialSlide: 1,
        spaceBetween: 20,
        autoplay: true,
        loop: true,
        // centeredSlides:true,
        speed: 1000,
        pagination: {
          el: paginationRef.current,
          clickable: true,
          type: 'bullets'
        }
      })
    }

  })

  return (
    <div className="swiper-container" ref={swiperRef}>
      <div className="swiper-wrapper">
        {
          imageList.map((item: string, index: number) => {
            return (
              <div className="swiper-slide" key={index}>
                <img src={item} alt=""/>
              </div>
            )
          })
        }
      </div>
      <div className="swiper-pagination" ref={paginationRef}></div>
    </div>
  )
}