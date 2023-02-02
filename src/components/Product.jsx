export default function Product({ product }) {
  return (
    <div>
      <h5>
        {product?.price?.length > 0 ? '($' + product?.price + ')' : ''}{' '}
        {product?.name}
      </h5>
      {/* <h5>{product?.description}</h5> */}
    </div>
  )
}
