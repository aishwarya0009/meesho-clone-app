import React, {useEffect, useState} from 'react'
import {decode, encode} from 'blurhash'

const loadImage = async src =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (...args) => reject(args);
    img.src = src;
    img.crossOrigin = "Anonymous";
  });

const getImageData = image => {
  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  const context = canvas.getContext("2d");
  context.drawImage(image, 0, 0);
  return context.getImageData(0, 0, image.width, image.height);
};

const encodeImageToBlurhash = async imageUrl => {
  const image = await loadImage(imageUrl);
  const imageData = getImageData(image);
  return encode(imageData.data, imageData.width, imageData.height, 4, 4);
};


const OptimizedImage = (props) => {

    
    
    useEffect(()=>{
        const encodesData = encodeImageToBlurhash(props.src);
        //const pixels = decode("LEHV6nWB2yk8pyo0adR*.7kCMdnj", 32, 32);
        console.log(encodesData);
        const pixels = decode(encodesData, 32, 32);
        const canvas = document.createElement("canvas");

        const ctx = canvas.getContext("2d");
        const imageData = ctx.createImageData(500, 500);
        imageData.data.set(pixels);
        ctx.putImageData(imageData, 0, 0);
        //document.body.append(canvas);
        document.getElementById("hashDiv").append(canvas)
    },[])

  return (
    <div></div>
  )
}

export default OptimizedImage