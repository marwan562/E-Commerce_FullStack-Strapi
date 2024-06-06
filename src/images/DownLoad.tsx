import React from 'react';
import axios from 'axios';

const products = [
  { id: 1, thumbnail: "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png" },
  { id: 2, thumbnail: "https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/thumbnail.png" },
  { id: 3, thumbnail: "https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/thumbnail.png" },
  { id: 4, thumbnail: "https://cdn.dummyjson.com/products/images/beauty/Red%20Lipstick/thumbnail.png" },
  { id: 5, thumbnail: "https://cdn.dummyjson.com/products/images/beauty/Red%20Nail%20Polish/thumbnail.png" },
  { id: 6, thumbnail: "https://cdn.dummyjson.com/products/images/fragrances/Calvin%20Klein%20CK%20One/thumbnail.png" },
  { id: 7, thumbnail: "https://cdn.dummyjson.com/products/images/fragrances/Chanel%20Coco%20Noir%20Eau%20De/thumbnail.png" },
  { id: 8, thumbnail: "https://cdn.dummyjson.com/products/images/fragrances/Dior%20J'adore/thumbnail.png" },
  { id: 9, thumbnail: "https://cdn.dummyjson.com/products/images/fragrances/Dolce%20Shine%20Eau%20de/thumbnail.png" },
  { id: 10, thumbnail: "https://cdn.dummyjson.com/products/images/fragrances/Gucci%20Bloom%20Eau%20de/thumbnail.png" },
  { id: 11, thumbnail: "https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Bed/thumbnail.png" },
  { id: 12, thumbnail: "https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Sofa/thumbnail.png" },
  { id: 13, thumbnail: "https://cdn.dummyjson.com/products/images/furniture/Bedside%20Table%20African%20Cherry/thumbnail.png" },
  { id: 14, thumbnail: "https://cdn.dummyjson.com/products/images/furniture/Knoll%20Saarinen%20Executive%20Conference%20Chair/thumbnail.png" },
  { id: 15, thumbnail: "https://cdn.dummyjson.com/products/images/furniture/Wooden%20Bathroom%20Sink%20With%20Mirror/thumbnail.png" },
  { id: 16, thumbnail: "https://cdn.dummyjson.com/products/images/groceries/Apple/thumbnail.png" },
  { id: 17, thumbnail: "https://cdn.dummyjson.com/products/images/groceries/Beef%20Steak/thumbnail.png" },
  { id: 18, thumbnail: "https://cdn.dummyjson.com/products/images/groceries/Cat%20Food/thumbnail.png" },
  { id: 19, thumbnail: "https://cdn.dummyjson.com/products/images/groceries/Chicken%20Meat/thumbnail.png" },
  { id: 20, thumbnail: "https://cdn.dummyjson.com/products/images/groceries/Cooking%20Oil/thumbnail.png" },
  { id: 21, thumbnail: "https://cdn.dummyjson.com/products/images/groceries/Cucumber/thumbnail.png" },
  { id: 22, thumbnail: "https://cdn.dummyjson.com/products/images/groceries/Dog%20Food/thumbnail.png" },
  { id: 23, thumbnail: "https://cdn.dummyjson.com/products/images/groceries/Eggs/thumbnail.png" },
  { id: 24, thumbnail: "https://cdn.dummyjson.com/products/images/groceries/Fish%20Steak/thumbnail.png" },
  { id: 25, thumbnail: "https://cdn.dummyjson.com/products/images/groceries/Green%20Bell%20Pepper/thumbnail.png" },
  { id: 26, thumbnail: "https://cdn.dummyjson.com/products/images/groceries/Green%20Chili%20Pepper/thumbnail.png" },
  { id: 27, thumbnail: "https://cdn.dummyjson.com/products/images/groceries/Honey%20Jar/thumbnail.png" },
  { id: 28, thumbnail: "https://cdn.dummyjson.com/products/images/groceries/Ice%20Cream/thumbnail.png" },
  { id: 29, thumbnail: "https://cdn.dummyjson.com/products/images/groceries/Juice/thumbnail.png" },
  { id: 30, thumbnail: "https://cdn.dummyjson.com/products/images/groceries/Kiwi/thumbnail.png" }
];

const App = () => {
    const corsProxy = "https://cors-anywhere.herokuapp.com/";
    const downloadImage = async (url, filename) => {
      try {
        const response = await axios.get(corsProxy + url, { responseType: 'blob' });
        const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = urlBlob;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
      } catch (error) {
        console.error(`Failed to download image ${filename}:`, error);
      }
    };

    const handleDownloadAll = async () => {
        const product = products[0];
        const filename = `${product.id}.png`;
        await downloadImage(product.thumbnail, filename);
      };

  return (
    <div>
      <h1>Download Thumbnails</h1>
      <button onClick={handleDownloadAll}>Download All Thumbnails</button>
    </div>
  );
};

export default App;
