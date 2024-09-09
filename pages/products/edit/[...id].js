// import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AddProduct from '../../../components/addProducts'

export default function EditProductPage() {
  const [productInfo, setProductInfo] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
    fetch('/api/products?id=' + id)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setProductInfo(data);
      })
      .catch(error => {
        console.error('Error fetching product info:', error);
      });
  }, [id]);
  return (
    <>
      <h1>Edit product</h1>
      {productInfo && (
        <AddProduct  {...productInfo} />
      )}
    </>
  );
}