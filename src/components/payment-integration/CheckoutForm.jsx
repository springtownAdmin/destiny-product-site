import React, { useEffect, useState } from 'react';
import { useStripe, PaymentRequestButtonElement } from '@stripe/react-stripe-js';
import { SERVER_URL, PAGE_URL } from '../../helper/constants';
import { Dialog, DialogContent } from '@mui/material';
import useStorage from '../../hooks/useStorage';
import { logger } from '../../logger'

const CheckoutForm = ({ amount = 0.01, product_title, quantity = 1, variant_id = 46075169931421 }) => {

  const stripe = useStripe();
  const [paymentRequest, setPaymentRequest] = useState(null);
  const [isPaymentRequestAvailable, setIsPaymentRequestAvailable] = useState(false);
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const { getItems, getItem, setItem } = useStorage();

  useEffect(() => {

    setPaymentRequest(null);

    if (stripe) {

      // Set up the payment request with Stripe
      const pr = stripe.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: {
          label: 'Total',
          amount: amount * 100, // Default amount in cents, update as needed
        },
        requestPayerName: true,
        requestPayerEmail: true,
        requestShipping: true,
        shippingOptions: [
          // The first shipping option in this list appears as the default
          {
            id: 'free-shipping',
            label: 'Free shipping',
            detail: 'Arrives in 5 to 7 days',
            amount: 0,
          },
        ],
      });

      // Check if Payment Request is available
      pr.canMakePayment().then((result) => {

        if (result) {

          logger.info("===============================================>\n");
          logger.info("PAYMENT_REQUEST_IN_CANMAKEPAYMENT()\n");
          logger.info("===============================================>\n");
          logger.info(result);
          logger.info("===============================================>\n");
          setIsPaymentRequestAvailable(true);
          setPaymentRequest(pr);

        }

      });

      // Handle payment method event
      pr.on('paymentmethod', async (event) => {

        try {

          // Call backend to create PaymentIntent and get clientSecret
          const { data } = await SERVER_URL.post('/create-payment-intent', {
            amount: amount,       // Amount in cents
            currency: 'usd',
            variantId: variant_id,
            productTitles: product_title,
            quantity,
          });

          logger.info("===============================================>\n");
          logger.info("CREATING_PAYMENT_INTENT\n");
          logger.info("===============================================>\n");
          logger.info(data);
          logger.info("===============================================>\n");

          // Confirm payment using clientSecret from the backend
          const { error } = await stripe.confirmCardPayment(data.clientSecret, {
            payment_method: event.paymentMethod.id,
          });

          if (error) {

            logger.info("===============================================>\n");
            logger.info("PAYMENT_FAILURE_ON_APPLE_OR_GOOGLE_PAY_BUTTON\n");
            logger.info("===============================================>\n");
            logger.error(error.message);
            logger.info("===============================================>\n");

            event.complete('fail');
            setMessage(error || 'Payment failed. Please try again.');
            setSuccess(false);
            console.error('Payment failed:', error);

          } else {

            event.complete('success');

            const getPageData = getItems({ key: 'pageData' });
            const conversions = getItem({ key: 'conversions' });

            if (getPageData.page_id && !conversions) {

              setItem({ key: 'conversions', data: true });
              const resp = await PAGE_URL.post('/set-metrics', { page_id: getPageData.page_id, type: 'conversions' });

              logger.info("=========================================================>\n");
              logger.info("CALCULATING_CONVERSIONS_ON_APPLE_OR_GOOGLE_PAY_BUTTON\n");
              logger.info("=========================================================>\n");
              logger.info(resp.data);
              logger.info("=========================================================>\n");

            }

            logger.info("=========================================================>\n");
            logger.info("PAYMENT_SUCCESSFULL_ON_APPLE_OR_GOOGLE_PAY_BUTTON\n");
            logger.info("=========================================================>\n");

            setMessage('Payment successful! Thank you for your purchase.');
            setSuccess(true);
            // Additional actions on success
            // Collect additional customer and payment details
            const customerEmail = event.payerEmail;
            const customerName = event.payerName;
            const shippingAddress = event.shippingAddress;
            const billingAddress = event.paymentMethod.billing_details.address;

            const newResp = await SERVER_URL.post('/create-shopify-order', {
              variant_id,
              quantity,
              customerEmail,
              customerName,
              shippingAddress,
              billingAddress,
              event
            });

            logger.info("=========================================================>\n");
            logger.info("CREATING_SHOPIFY_ORDER_ON_APPLE_OR_GOOGLE_PAY_BUTTON\n");
            logger.info("=========================================================>\n");
            logger.info(newResp.data);
            logger.info("=========================================================>\n");

            setOpen(true);

            setTimeout(() => {

              window.location.reload();

            }, 2000);


          }
        } catch (error) {

          console.error('Error creating PaymentIntent or confirming payment:', error);
          logger.info("=========================================================>\n");
          logger.info("ERROR_WHILE_CREATING_PAYMENTINTENT_OR_CONFIRMING_PAYMENT\n");
          logger.info("=========================================================>\n");
          logger.error(error.message);
          logger.info("=========================================================>\n");
          event.complete('fail');

        }

      });

      // Handle shipping address change event
      pr.on('shippingaddresschange', async (ev) => {

        if (ev.shippingAddress.country !== 'US') {

          logger.info("=========================================================>\n");
          logger.info("SHIPPING_DETAILS_MUST_BE_(US_BASED)_ADDRESS\n");
          logger.info("=========================================================>\n");
          ev.updateWith({ status: 'invalid_shipping_address' });

        } else {

          try {

            const reqBody = { shippingAddress: ev.shippingAddress };
            const headers = { headers: { 'Content-Type': 'application/json' } }

            // Request shipping options from the backend
            const response = await SERVER_URL.post('/calculateShipping', reqBody, headers);
            const result = response.data;

            ev.updateWith({
              status: 'success',
              shippingOptions: result.supportedShippingOptions,
            });

            logger.info("=========================================================>\n");
            logger.info("RESPONSE_OF_SHIPPING_CALCULATION\n");
            logger.info("=========================================================>\n");
            logger.info(result);
            logger.info("=========================================================>\n");

          } catch (error) {

            logger.info("=========================================================>\n");
            logger.error("ERROR_WHILE_FETCHING_SHIPPING_OPTIONS\n");
            logger.info("=========================================================>\n");
            logger.error(error.message);
            logger.info("=========================================================>\n");
            console.error('Error fetching shipping options:', error);
            ev.updateWith({ status: 'fail' });

          }

        }

      });

    }

  }, [stripe, amount]);

  const backToHome = () => {

    setOpen(false);
    window.location.reload();

  }

  return (
    <div className='w-full'>

      <Dialog open={open} fullWidth>
        <DialogContent className='flex flex-col w-full justify-center items-center'>
          <p className='text-4xl'>{success ? '🥳' : '😔'}</p>
          <h1 className='text-3xl'>{success ? 'Congratulations!' : 'Sorry!'}</h1>
          <h1 className='text-sm font-light text-center'>
            {success ? <span>Payment of <span className='text-green-600'>$ {amount}</span> was done successfully!</span> :
              <span>Payment of <span className='text-red-500'>$ {amount}</span> was unsuccessfull!</span>}
          </h1>
          <button onClick={backToHome} className='p-3 bg-black text-white rounded-md my-3 hover:opacity-70 transition-all duration-150'>Back to home</button>
        </DialogContent>
      </Dialog>

      {isPaymentRequestAvailable && paymentRequest && (
        <PaymentRequestButtonElement
          options={{ paymentRequest }}
          style={{ paymentRequestButton: { theme: 'dark', height: '44px' } }}
        />
      )}
      {/* {message && (
        <div style={{ marginTop: '20px', color: success ? 'green' : 'red' }}>
          {message}
        </div>
      )} */}
    </div>
  );

};

export default CheckoutForm;