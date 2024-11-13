import React, { useRef } from 'react';

const PleaseWait = () => {

    const ref = useRef(null);

    React.useEffect(() => {
        import("@lottiefiles/lottie-player");
    });

    return (
        <div className='flex w-full h-screen justify-center items-center'>
            <lottie-player id="firstLottie" ref={ref} autoplay loop mode="normal"
                src="https://lottie.host/795d9a8b-b2dd-4c6e-b70d-c623984dfc33/VDypvaytk9.json"
                style={{ width: "500px", height: "500px" }}
            ></lottie-player>
        </div>
    );
}

export default PleaseWait