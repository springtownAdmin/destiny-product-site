import React, { useEffect, useState } from 'react';
import ProductCart from './product-cart';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PAGE_URL } from '../helper/constants';
import { MainLoader } from './common';
import PleaseWait from './please-wait-animation';
import { useParams, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import useStorage from '../hooks/useStorage';
import { logger } from '../logger';

export default function ProductPage() {

  const [showLoader, setShowLoader] = useState(false);
  const [pageData, setPageData] = useState(null);
  const { variantId } = useParams();
  const navigate = useNavigate();
  const { getItem, getItems, setItem, setItems, clearAll } = useStorage();

  // 146f9c8f-291e-4318-aa07-119e65bc16e6

  // Regular expression to validate UUID
  // const isValidUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  useEffect(() => {

    const setPageDataToSite = async () => {

      try {

        setShowLoader(true);

        const getPageData = getItems({ key: 'pageData' });

        if (!getPageData) {

          const resp = await PAGE_URL.get(`/get-page-info?variant_id=${variantId}`);
          const result = resp.data.result;

          logger.info("===============================================>\n");
          logger.info("PAGE_INFO_BASED_ON_VARIANT_ID\n");
          logger.info("===============================================>\n");
          logger.info(result);
          logger.info("===============================================>\n");

          if (result.data === null) {
            navigate('/not-found'); // Redirect to "Not Found" page
            return;
          }

          setPageData(result.data);
          setItems({ key: 'pageData', data: result.data });

          const uid = uuidv4();
          setItem({ key: 'uid', data: uid });

          const resp2 = await PAGE_URL.post('/set-metrics', { page_id: result.data.page_id, type: 'visitors' });

          logger.info("===============================================>\n");
          logger.info("VISITORS_METRICS\n");
          logger.info("===============================================>\n");
          logger.info(resp2.data);
          logger.info("===============================================>\n");

          if (resp2.data.result.data === null)
            clearAll();


        } else {

          if (variantId === getPageData.variant_id)
            setPageData(getPageData);
          else
            navigate('/not-found');

        }

      } catch (e) {

        toast.error('Something went wrong!');
        console.log(e.message);
        logger.info("===============================================>\n");
        logger.info("ERROR_WHILE_FETCHING_PAGE_INFO_AND_METRICES\n");
        logger.info("===============================================>\n");
        logger.error(e.message);
        logger.info("===============================================>\n");

      } finally {

        setTimeout(() => {
          setShowLoader(false);
        }, getItem('uid') ? 0 : 500);

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

      {pageData !== null ? <div className='relative w-full'><ProductCart {...pageData} /></div> : <PleaseWait />}

      <ToastContainer />

    </MainLoader>


  );

}