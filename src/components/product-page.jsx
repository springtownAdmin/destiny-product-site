import React, { useMemo, useEffect, useState } from 'react';
import ProductCart from './product-cart';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PAGE_URL } from '../helper/constants';
import { MainLoader } from './common';
import PleaseWait from './please-wait-animation';
import { useParams, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export default function ProductPage() {

  const [showLoader, setShowLoader] = useState(false);
  const [pageData, setPageData] = useState(null);
  const { variantId } = useParams();
  const navigate = useNavigate();
  const [hasClickedOnBuyBtn, setClickedOnBuyBtn] = useState(false);

  // 146f9c8f-291e-4318-aa07-119e65bc16e6

  // Regular expression to validate UUID
  // const isValidUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  useEffect(() => {

    const setPageDataToSite = async () => {

      try {

        setShowLoader(true);

        const resp = await PAGE_URL.get(`/get-page-info?variant_id=${variantId}`);
        const result = resp.data.result;

        if (result.data === null) {
            navigate('/not-found'); // Redirect to "Not Found" page
            return;
        }

        setPageData(result.data);

        if (typeof sessionStorage !== 'undefined') {

          const getId = sessionStorage.getItem('uid');

          if (!getId) {

            const uid = uuidv4();
            sessionStorage.setItem('uid', uid);
            sessionStorage.setItem('page_id', result.data.page_id);
            sessionStorage.setItem('variant_id', result.data.variant_id);
            // add one visitor and update the DB
            await PAGE_URL.post('/set-metrics', { page_id: result.data.page_id, type: 'visitors' });
            
          }

        }

  
      } catch (e) {
  
        toast.error('Something went wrong!');
        console.log(e.message);
  
      } finally {

        setTimeout(() => {
          setShowLoader(false);
        }, 500);

      }

    };

    // if (!isValidUUID.test(variantId)) {
    //     navigate('/not-found'); // Redirect to "Not Found" page
    //     return;
    // }

    setPageDataToSite();

  }, []);

  return (

    <MainLoader show={showLoader}>

        {pageData !== null ? <div className='relative w-full'><ProductCart { ...pageData } /></div> : <PleaseWait />}

        <ToastContainer />

    </MainLoader>


  );

}