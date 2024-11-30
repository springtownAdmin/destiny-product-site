import React, { useState } from 'react';
import { FaCheckCircle, FaCreditCard, FaMapMarkerAlt } from 'react-icons/fa';
import img1 from '../../public/images/prod-1.webp';
import { useNavigate, useParams } from 'react-router-dom';
import useStorage from '../hooks/useStorage';

const ThankYou = () => {

    let { confirmId } = useParams();
    const navigate = useNavigate();

    if (confirmId === undefined) {
        navigate('/not-found');
        return;
    }

    if (confirmId === null) {
        navigate('/not-found');
        return;
    }

    const { getItems } = useStorage();
    const customerinfo = getItems({ key: 'customerinfo' });

    const [emailOptIn, setEmailOptIn] = useState(false);

    // Mock order details - in a real app this would come from your order context/props
    const orderDetails = {
        orderNumber: customerinfo.confirmationNo ?? "#KRUI53VL7",
        customerName: customerinfo.name ?? "John Doe",
        email: customerinfo.email ?? "john.doe@example.com",
        shippingAddress: {
            name: customerinfo.name ?? "John Doe",
            street: customerinfo.shippingAddress?.line1 || customerinfo.shippingAddress?.addressLine?.[0],
            city: customerinfo.shippingAddress?.city ?? 'N/A',
            state: customerinfo.shippingAddress?.region || customerinfo?.shippingAddress.state,
            zip: customerinfo.shippingAddress?.postalCode || customerinfo.shippingAddress?.postal_code,
            country: customerinfo.shippingAddress?.country ?? "N/A"
        },
        billingAddress: {
            name: customerinfo.name ?? "John Doe",
            street: customerinfo.shippingAddress?.line1 || customerinfo.shippingAddress?.addressLine?.[0],
            city: customerinfo.shippingAddress?.city ?? 'N/A',
            state: customerinfo.shippingAddress?.region || customerinfo?.shippingAddress.state,
            zip: customerinfo.shippingAddress?.postalCode || customerinfo.shippingAddress?.postal_code,
            country: customerinfo.shippingAddress?.country ?? "N/A"
        },
        payment: {
            method: "Mastercard",
            last4: "6433",
            amount: 4.91
        },
        items: [
            {
                id: 1,
                name: customerinfo.product_name ?? 'N/A',
                quantity: 1,
                price: customerinfo.price,
                image: customerinfo.image ?? img1
            }
        ],
        shipping: 4.90
    };


    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">

            <div className="flex items-center space-x-4 mb-8">
                <div className="flex-shrink-0">
                    <FaCheckCircle className="w-12 h-12 text-green-500" />
                </div>
                <div>
                    <div className="text-gray-600 font-medium mb-1">Confirmation {orderDetails.orderNumber}</div>
                    <h1 className="text-3xl font-semibold text-gray-900">Thank you, {orderDetails.customerName}!</h1>
                </div>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl text-gray-900 mb-2 font-semibold">Your order is confirmed</h2>
                {/* <p className="text-gray-600 font-light mb-4">You'll receive a confirmation email with your order number shortly.</p> */}
            </div>

            {/* <div className="relative mb-8 rounded-lg overflow-hidden border border-gray-200">
                <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-md z-10">
                <h3 className="font-semibold text-gray-900 mb-1">Shipping address</h3>
                <p className="text-gray-600">{orderDetails.shippingAddress.city} {orderDetails.shippingAddress.state}</p>
                </div>
                <iframe 
                src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(
                    `${orderDetails.shippingAddress.street}, ${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.state}`
                )}`}
                className="w-full h-72 border-0"
                allowFullScreen
                loading="lazy"
                />
            </div> */}

            <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Order details</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Contact information</h3>
                        <p className="text-gray-600 font-light">{orderDetails.email}</p>
                    </div>

                    {/* <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Payment method</h3>
                        <div className="flex items-center space-x-2">
                            <FaCreditCard className="text-orange-500" />
                            <span className="text-gray-600 font-light">•••• {orderDetails.payment.last4} · ${orderDetails.payment.amount.toFixed(2)}</span>
                        </div>
                    </div> */}

                    <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Shipping address</h3>
                        <address className="text-gray-600 font-light not-italic">
                            {orderDetails.shippingAddress.name}<br />
                            {orderDetails.shippingAddress.street}<br />
                            {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} {orderDetails.shippingAddress.zip}<br />
                            {orderDetails.shippingAddress.country}
                        </address>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Billing address</h3>
                        <address className="text-gray-600 not-italic font-light">
                            {orderDetails.billingAddress.name}<br />
                            {orderDetails.billingAddress.street}<br />
                            {orderDetails.billingAddress.city}, {orderDetails.billingAddress.state} {orderDetails.billingAddress.zip}<br />
                            {orderDetails.billingAddress.country}
                        </address>
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-2">Shipping method</h3>
                    <p className="text-gray-600 font-medium">Economy</p>
                </div>

                <div>
                    {orderDetails.items.map(item => (
                        <div key={item.id} className="flex items-center space-x-4 mb-4 pb-4 border-b border-gray-200 last:border-b-0 last:mb-0 last:pb-0">
                            <div className="relative">
                                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                                <span className="absolute -top-2 -right-2 bg-gray-700 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
                                    {item.quantity}
                                </span>
                            </div>
                            <div className="flex-grow">
                                <p className="text-gray-900">{item.name}</p>
                                <p className="text-gray-600">${item.price.toFixed(2)}</p>
                            </div>
                        </div>
                    ))}

                    <div className="mt-6 space-y-2">
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span>${(orderDetails.payment.amount - orderDetails.shipping).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Shipping</span>
                            <span>${orderDetails.shipping.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-900 font-semibold text-lg pt-2 border-t border-gray-200">
                            <span>Total</span>
                            <span>USD ${orderDetails.payment.amount.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );

}

export default ThankYou