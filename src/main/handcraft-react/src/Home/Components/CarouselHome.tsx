import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import React, { useEffect, useState } from "react";
const CarouselHome = () => {
  const [images,setImages] = useState<string[]>([])
  const [httpError,setHttpError] = useState("")


  useEffect(()=>{
    const fetchHomeElements = async() =>{
      const url = "http://localhost:8080/api/homepages/1"
      const request = await fetch(url);
      if(!request.ok){
        throw new Error("Something went wrong!")
      }
      const requestJson = await request.json();
      setImages(requestJson.carouselImages)
    }
    fetchHomeElements().catch((e:any)=>setHttpError(e.message))
  },[])

if(httpError){
  return <p>{httpError}</p>
}


  return (
    <div className="carousel-main">
    <Carousel showThumbs={false} width={"100%"}  showStatus={false} autoFocus={true} autoPlay={true} infiniteLoop={true} >
      {images.map((image:string,index:number)=>(
      <div key={index}>  
        <img src={image} />
      </div>
      ))}
   
    </Carousel>
    <div className="my-5"></div>

    </div>
  );
};

export default CarouselHome;
