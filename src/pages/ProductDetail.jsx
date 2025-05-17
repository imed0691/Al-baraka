import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "../data/data";
import { useCart } from "../context/useCart";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const { dispatch } = useCart();
  const [review, setReview] = useState({ user: "", comment: "", rating: 5 });
  const [reviews, setReviews] = useState(product.reviews);

  useEffect(() => {
    product.views += 1;
  }, [product]);

  const handleAddToCart = () => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  const handleReviewChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (review.user && review.comment) {
      const newReviews = [...reviews, review];
      setReviews(newReviews);
      setReview({ user: "", comment: "", rating: 5 });
    }
  };

  return (
    <div className="product-detail">
      <div className="cadre-image">
        <img src={product.image} alt={product.name} className="detail-image" />
      </div>
      <h1>{product.name}</h1>
      <p>DA {product.price.toLocaleString()}</p>
      <button onClick={handleAddToCart} className="add-to-cart-btn">
        Ajouter au panier
      </button>
      <div className="stats">
        <span>Vues : {product.views}</span>
        <span>Vendus : {product.sold}</span>
      </div>
      <section className="reviews">
        <h3>Avis des clients</h3>
        {reviews.length === 0 && <p>Aucun avis pour ce produit.</p>}
        {reviews.map((review, index) => (
          <div key={index} className="review">
            <h4>
              {review.user}{" "}
              <span style={{ color: "#f5b301" }}>★{review.rating}</span>
            </h4>
            <p>{review.comment}</p>
          </div>
        ))}
        <form onSubmit={handleReviewSubmit} className="review-form">
          <input
            type="text"
            name="user"
            placeholder="Votre nom"
            value={review.user}
            onChange={handleReviewChange}
            required
          />
          <select
            name="rating"
            value={review.rating}
            onChange={handleReviewChange}
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r} ★
              </option>
            ))}
          </select>
          <textarea
            name="comment"
            placeholder="Votre commentaire"
            value={review.comment}
            onChange={handleReviewChange}
            required
          />
          <button type="submit">Envoyer l'avis</button>
        </form>
      </section>
    </div>
  );
};

export default ProductDetail;
