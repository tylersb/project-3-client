import Product from './Product'

export default function Section({ section, currentProduct }) {
  return (
    <div>
      <h3>{section.sectionName}</h3>
      {section.products.length > 0 ? (
        <div>
          {section.products.map((product, i) => {
            return <Product key={product.name + i} product={product} />
          })}
          {currentProduct}
        </div>
      ) : (
        currentProduct
      )}
    </div>
  )
}
