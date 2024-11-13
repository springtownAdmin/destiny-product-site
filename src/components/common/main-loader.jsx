import React from 'react'
import { Oval } from 'react-loader-spinner'

const MainLoader = ({ show = false, children }) => {


    return (
        <>
            {show ? 
                <div className='h-screen overflow-hidden flex justify-center items-center w-full'>
                    <Oval visible={true} height="60" width="60" color="#000000" secondaryColor='lightgray' ariaLabel="oval-loading" />
                </div>
            :  children
            }
        </>
    )
  return (
    <div>MainLoader</div>
  )
}

export default MainLoader