import React, { useState } from "react";
import Headers from "../components/Headers";
import Footer from "../components/Footer";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { place_order } from "../store/reducers/orderReducer";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  address: yup.string().required("Address is required"),
  phone: yup.string().required("Phone is required"),
  post: yup.string().required("Post is required"),
  province: yup.string().required("Province is required"),
  city: yup.string().required("City is required"),
  area: yup.string().required("Area is required"),
});

const Shipping = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const {
    state: { products, price, shipping_fee, items },
  } = useLocation();
  const [res, setRes] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    post: "",
    province: "",
    city: "",
    area: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const save = (data) => {
    setFormData(data);
    setRes(true);
  };

  const placeOrder = () => {
    const productsWithAddons = products.map((product) => ({
      ...product,
      products: product.products.map((pt) => ({
        ...pt,
        addons: pt.addons || [], // Ensure addons are included
      })),
    }));

    dispatch(
      place_order({
        price,
        products: productsWithAddons, // Include addons here
        shipping_fee,
        shippingInfo: formData,
        userId: userInfo.id,
        navigate,
        items,
      })
    );
  };

  return (
    <div>
      <Headers />
      <section className='bg-[url("http://localhost:3000/images/banner/order.jpg")] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
        <div className="absolute left-0 top-0 w-full h-full bg-[#2422228a]">
          <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
            <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-white">
              <h2 className="text-3xl font-bold">Shop.my</h2>
              <div className="flex justify-center items-center gap-2 text-2xl w-full">
                <Link to="/">Home</Link>
                <span className="pt-2">
                  <MdOutlineKeyboardArrowRight />
                </span>
                <span>Place Order</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#eeeeee]">
        <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90] mx-auto py-16">
          <div className="w-full flex flex-wrap">
            <div className="w-[67%] md-lg:w-full">
              <div className="flex flex-col gap-3">
                <div className="bg-white p-6 shadow-sm rounded-md">
                  {!res && (
                    <>
                      <h2 className="text-slate-600 font-bold pb-3">
                        Shipping Information
                      </h2>
                      <form onSubmit={handleSubmit(save)}>
                        <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="name">Name</label>
                            <input
                              {...register("name")}
                              type="text"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md"
                              name="name"
                              placeholder="name"
                              id="name"
                            />
                            {errors.name && (
                              <p className="text-red-500 text-xs mt-1">
                                {errors.name.message}
                              </p>
                            )}
                          </div>
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="address">Address</label>
                            <input
                              {...register("address")}
                              type="text"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md"
                              name="address"
                              placeholder="House no / building / street / area"
                              id="address"
                            />
                            {errors.address && (
                              <p className="text-red-500 text-xs mt-1">
                                {errors.address.message}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="phone">Phone</label>
                            <input
                              {...register("phone")}
                              type="text"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md"
                              name="phone"
                              placeholder="phone"
                              id="phone"
                            />
                            {errors.phone && (
                              <p className="text-red-500 text-xs mt-1">
                                {errors.phone.message}
                              </p>
                            )}
                          </div>
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="post">Post</label>
                            <input
                              {...register("post")}
                              type="text"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md"
                              name="post"
                              placeholder="post"
                              id="post"
                            />
                            {errors.post && (
                              <p className="text-red-500 text-xs mt-1">
                                {errors.post.message}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="province">Province</label>
                            <input
                              {...register("province")}
                              type="text"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md"
                              name="province"
                              placeholder="province"
                              id="province"
                            />
                            {errors.province && (
                              <p className="text-red-500 text-xs mt-1">
                                {errors.province.message}
                              </p>
                            )}
                          </div>
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="city">City</label>
                            <input
                              {...register("city")}
                              type="text"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md"
                              name="city"
                              placeholder="city"
                              id="city"
                            />
                            {errors.city && (
                              <p className="text-red-500 text-xs mt-1">
                                {errors.city.message}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="area">Area</label>
                            <input
                              {...register("area")}
                              type="text"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md"
                              name="area"
                              placeholder="area"
                              id="area"
                            />
                            {errors.area && (
                              <p className="text-red-500 text-xs mt-1">
                                {errors.area.message}
                              </p>
                            )}
                          </div>
                          <div className="flex flex-col gap-1 mt-3 w-full">
                            <button className="px-3 py-[6px] rounded-sm hover:shadow-indigo-500/20 hover:shadow-lg bg-indigo-500 text-white">
                              Save
                            </button>
                          </div>
                        </div>
                      </form>
                    </>
                  )}
                  {res && (
                    <div className="flex flex-col gap-1">
                      <h2 className="text-slate-600 font-semibold pb-2">
                        Deliver to {formData.name}
                      </h2>
                      <p>
                        <span className="bg-blue-200 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                          Home
                        </span>
                        <span className="text-slate-600 text-sm">
                          {formData.address} {formData.province} {formData.city}{" "}
                          {formData.area}
                        </span>
                        <span
                          onClick={() => setRes(false)}
                          className="text-indigo-500 cursor-pointer"
                        >
                          {" "}
                          change
                        </span>
                      </p>
                      <p className="text-slate-600 text-sm">
                        Email to sourabhshail@gmail.com
                      </p>
                    </div>
                  )}
                </div>

                {products.map((p, i) => (
                  <div
                    key={i}
                    className="flex bg-white p-4 flex-col gap-2 mb-4 rounded-lg shadow-md"
                  >
                    <div className="flex justify-start items-center">
                      <h2 className="text-md text-slate-600">{p.shopName}</h2>
                    </div>
                    {p.products.map((pt, j) => (
                      <div key={j} className="w-full flex flex-wrap">
                        <div className="flex sm:w-full gap-2 w-7/12">
                          <div className="flex gap-2 justify-start items-center">
                            <img
                              className="w-[80px] h-[80px]"
                              src={pt.productInfo.images[0]}
                              alt="product"
                            />
                            <div className="pr-4 text-slate-600">
                              <h2 className="text-md">{pt.productInfo.name}</h2>
                              <span className="text-sm">
                                Brand: {pt.productInfo.brand}
                              </span>
                              {pt.addons && pt.addons.length > 0 && (
                                <div className="mt-2">
                                  <p className="text-sm font-medium text-gray-700">
                                    Addons:
                                  </p>
                                  <div className="flex flex-wrap gap-2 mt-1">
                                    {pt.addons.map((addon, index) => (
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
                          </div>
                        </div>
                        <div className="flex justify-end w-5/12 sm:w-full sm:mt-3">
                          <div className="pl-4 sm:pl-0">
                            <h2 className="text-lg text-orange-500">
                              $
                              {pt.productInfo.price -
                                Math.floor(
                                  (pt.productInfo.price *
                                    pt.productInfo.discount) /
                                    100
                                )}
                            </h2>
                            <p className="line-through">
                              ${pt.productInfo.price}
                            </p>
                            <p>-{pt.productInfo.discount}%</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="w-[33%] md-lg:w-full">
              <div className="pl-3 md-lg:pl-0">
                <div className="bg-white font-medium p-5 text-slate-600 flex flex-col gap-3">
                  <h2 className="text-xl font-semibold">Order Summary</h2>
                  <div className="flex justify-between items-center">
                    <span>Items Total({price})</span>
                    <span>${price}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Delivery Fee</span>
                    <span>${shipping_fee}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Total Payment</span>
                    <span>${price + shipping_fee}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Total</span>
                    <span>${price + shipping_fee}</span>
                  </div>
                  <button
                    onClick={placeOrder}
                    disabled={res ? false : true}
                    className={`px-5 py-[6px] rounded-sm hover:shadow-orange-500/20 hover:shadow-lg ${
                      res ? "bg-orange-500" : "bg-orange-300"
                    } text-sm text-white uppercase`}
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Shipping;