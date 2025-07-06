import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  // Debug logging (remove in production)
  console.log("ProductItem props:", { id, image, name, price });

  // Validation checks
  if (!id || !name || !price) {
    console.warn("ProductItem missing required props:", { id, image, name, price });
    return null;
  }

  // Handle image safely
  const imageSource = Array.isArray(image) ? image[0] : image;
  
  return (
    <Link 
      className="text-gray-700 cursor-pointer block" 
      to={`/product/${id}`}
    >
      <div className="overflow-hidden rounded-lg bg-gray-100">
        <img
          className="hover:scale-110 transition ease-in-out duration-300 w-full h-48 object-cover"
          src={imageSource}
          alt={name}
          onError={(e) => {
            console.error("Image failed to load:", imageSource);
            e.target.src = "/placeholder-image.jpg"; // Fallback image
          }}
          onLoad={() => console.log("Image loaded successfully:", imageSource)}
        />
      </div>
      
      <div className="pt-3">
        <p className="pb-1 text-sm font-medium truncate" title={name}>
          {name}
        </p>
        <p className="text-sm font-semibold text-gray-900">
          {currency}{price}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;