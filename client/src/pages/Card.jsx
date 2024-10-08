import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowRight, MdDeleteOutline } from "react-icons/md";
import { FiMinus, FiPlus } from "react-icons/fi";
import Headers from "../components/Headers";
import Footer from "../components/Footer";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import {
  get_card_products,
  delete_card_product,
  messageClear,
  quantity_inc,
  quantity_dec,
} from "../store/reducers/cardReducer";

const Card = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const {
    card_products,
    successMessage,
    price,
    buy_product_item,
    shipping_fee,
    outofstock_products,
  } = useSelector((state) => state.card);

  useEffect(() => {
    dispatch(get_card_products(userInfo.id));
  }, []);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      dispatch(get_card_products(userInfo.id));
    }
  }, [successMessage]);

  const redirect = () => {

      // Collect all addons from card_products
  const addons = card_products.flatMap(product =>
    product.products.flatMap(pt => pt.addons || [])
  );

    navigate("/shipping", {
      state: {
        products: card_products,
        price: price,
        shipping_fee: shipping_fee,
        items: buy_product_item,
        addons:addons
      },
    });
  };

  const inc = (quantity, stock, card_id) => {
    const temp = quantity + 1;
    if (temp <= stock) {
      dispatch(quantity_inc(card_id));
    }
  };

  const dec = (quantity, card_id) => {
    const temp = quantity - 1;
    if (temp !== 0) {
      dispatch(quantity_dec(card_id));
    }
  };

  const CartItem = ({ product }) => (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 transition-all hover:shadow-lg">
      <div className="flex items-center">
        <img
          className="w-20 h-20 object-cover rounded"
          src={product.productInfo.images[0]}
          alt={product.productInfo.name}
        />
        <div className="ml-4 flex-grow">
          <h3 className="font-semibold text-lg">{product.productInfo.name}</h3>
          <p className="text-sm text-gray-500">
            Brand: {product.productInfo.brand}
          </p>
          {product.addons && product.addons.length > 0 && (
            <div className="mt-2">
              <p className="text-sm font-medium text-gray-700">Addons:</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {product.addons.map((addon, index) => (
                  <span
                    key={index}
                    className="text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-1"
                  >
                    {addon.text}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-green-600">
            $
            {product.productInfo.price -
              Math.floor(
                (product.productInfo.price * product.productInfo.discount) / 100
              )}
          </p>
          <p className="text-sm text-gray-500 line-through">
            ${product.productInfo.price}
          </p>
          <p className="text-sm text-red-500">
            -{product.productInfo.discount}%
          </p>
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center border rounded-md">
          <button
            onClick={() => dec(product.quantity, product._id)}
            className="p-2 hover:bg-gray-100"
          >
            <FiMinus size={16} />
          </button>
          <span className="px-4 py-2 font-medium">{product.quantity}</span>
          <button
            onClick={() =>
              inc(product.quantity, product.productInfo.stock, product._id)
            }
            className="p-2 hover:bg-gray-100"
          >
            <FiPlus size={16} />
          </button>
        </div>
        <button
          onClick={() => dispatch(delete_card_product(product._id))}
          className="text-red-500 hover:text-red-700 transition-colors"
        >
          <MdDeleteOutline size={24} />
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <Headers />
      <section className='bg-[url("http://localhost:3000/images/banner/card.jpg")] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
        <div className="absolute left-0 top-0 w-full h-full bg-[#2422228a]">
          <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
            <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-white">
              <h2 className="text-3xl font-bold">Shop.my</h2>
              <div className="flex justify-center items-center gap-2 text-2xl w-full">
                <Link to="/">Home</Link>
                <span className="pt-2">
                  <MdOutlineKeyboardArrowRight />
                </span>
                <span>Cart</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-100">
        <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16">
          {card_products.length > 0 || outofstock_products.length > 0 ? (
            <div className="flex flex-wrap gap-8">
              <div className="w-[67%] md-lg:w-full">
                <div className="pr-3 md-lg:pr-0">
                  <div className="flex flex-col gap-3">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h2 className="text-lg font-semibold text-green-600">
                        In Stock Products ({card_products.length})
                      </h2>
                    </div>
                    {card_products.map((p, i) => (
                      <div
                        key={i}
                        className="bg-white p-4 rounded-lg shadow-sm"
                      >
                        <h3 className="text-lg font-semibold mb-4">
                          {p.shopName}
                        </h3>
                        {p.products.map((pt, j) => (
                          <CartItem key={j} product={pt} />
                        ))}
                      </div>
                    ))}
                    {outofstock_products.length > 0 && (
                      <div className="bg-white p-4 rounded-lg shadow-sm mt-8">
                        <h2 className="text-lg font-semibold text-red-500 mb-4">
                          Out of Stock Products ({outofstock_products.length})
                        </h2>
                        {outofstock_products.map((p, i) => (
                          <CartItem key={i} product={p} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-[30%] md-lg:w-full">
                <div className="pl-3 md-lg:pl-0 md-lg:mt-5">
                  {card_products.length > 0 && (
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-600">
                          {buy_product_item} Item(s)
                        </span>
                        <span className="font-semibold">${price}</span>
                      </div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-600">Shipping Fee</span>
                        <span className="font-semibold">${shipping_fee}</span>
                      </div>
                      <div className="flex gap-2 mb-6">
                        <input
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          type="text"
                          placeholder="Coupon Code"
                        />
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                          Apply
                        </button>
                      </div>
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-lg font-semibold">Total</span>
                        <span className="text-xl font-bold text-green-600">
                          ${price + shipping_fee}
                        </span>
                      </div>
                      <button
                        onClick={redirect}
                        className="w-full py-3 rounded-md bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors"
                      >
                        Proceed to Checkout ({buy_product_item})
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
              <Link
                className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors inline-block"
                to="/shops"
              >
                Start Shopping
              </Link>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Card;