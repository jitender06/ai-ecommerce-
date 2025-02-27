import { Carousel } from "../components/Carousel/Carousel"
import CategorySection from "../components/CategorySection"
import ProductGrid from "../components/ProductGrid/ProductGrid"
import AISection from "../components/AISection"
import { carouselItems, products } from "../data/index"
export default function Home() {

  return (
    <div className="bg-white dark:bg-gray-800">
      <Carousel items={carouselItems} />
      <CategorySection/>
      <AISection/>
      <ProductGrid />
    </div>
  )
}

