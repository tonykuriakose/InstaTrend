import { useContext, useMemo } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);

  // Memoize best sellers to avoid unnecessary re-calculations
  const bestSeller = useMemo(() => {
    if (!products || products.length === 0) return [];
    return products.filter((item) => item.bestseller).slice(0, 5);
  }, [products]);

  // Loading state
  if (!products) {
    return (
      <div className="my-10">
        <div className="text-center text-3xl py-8">
          <Title text1={"BEST"} text2={"SELLERS"} />
        </div>
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600"></div>
          <p className="mt-2 text-gray-600">Loading best sellers...</p>
        </div>
      </div>
    );
  }

  // Empty state
  if (bestSeller.length === 0) {
    return (
      <div className="my-10">
        <div className="text-center text-3xl py-8">
          <Title text1={"BEST"} text2={"SELLERS"} />
          <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
            No best sellers available at the moment. Check back soon!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Discover our most popular products loved by customers worldwide.
        </p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller.map((item) => (
          <ProductItem 
            key={item._id} 
            id={item._id} 
            name={item.name} 
            image={item.image} 
            price={item.price} 
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;