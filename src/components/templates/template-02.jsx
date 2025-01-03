"use client";

import React, { useCallback, useState, useEffect } from 'react';
import { ShopPayButton, Footer } from '../common';
import Payment from '../payment-integration/Payment';
import ReviewSection from '../reviews';
import { FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import useEmblaCarousel from 'embla-carousel-react'
import { RiCloseLine } from 'react-icons/ri';
import { TbExternalLink } from 'react-icons/tb';

const products = [
    {
      title: "bestsellers (sparkling & still | 24 pack)",
      image: "/images/prod-1.webp",
      reviews: "5,606",
      price: 77,
      badges: ["zero added sugar", "0-20 calories", "caffeine free", "natural flavors"],
      backgroundColor: "bg-pink-400",
    },
    {
      title: "bestsellers (sparkling & still mocktail | 18 pack)",
      image: "/images/prod-1.webp",
      reviews: "5,606",
      price: 59,
      badges: ["0 added sugar", "15-20 calories", "no alcohol"],
      backgroundColor: "bg-sky-400",
    },
    {
      title: "cherry hibiscus (sparkling mocktail | 12 pack)",
      image: "/images/prod-1.webp",
      reviews: "1,886",
      price: 44,
      backgroundColor: "bg-red-400",
    },
    {
      title: "lychee mint (sparkling mocktail | 12 pack)",
      image: "/images/prod-1.webp",
      reviews: "1,886",
      price: 44,
      backgroundColor: "bg-teal-400",
    },
]

// Testimonial data
const testimonials = [
    {
      name: "Amanda S.",
      quote: "With Moment in my life, I have totally cut out drinking during the week!",
      image: "/images/prod-1.webp",
    },
    {
      name: "Carly B.",
      quote: "Being a mom is non-stop, but Moment helps me relax without needing that weeknight wine!",
      image: "/images/prod-2.webp",
    },
    {
      name: "Carly B.",
      quote: "Being a mom is non-stop, but Moment helps me relax without needing that weeknight wine!",
      image: "/images/prod-3.webp",
    },
]

const SideBarRight = (props) => {

    const { isOpen, setIsOpen, images, selectedImage2, setSelectedImage2, activeTab } = props;
    const { setActiveTab, purchaseOption2, setPurchaseOption2 } = props;
    const { product_title, price, description, productItem, variantId } = props;

    return (
        <>
            <div className={`fixed right-0 h-full top-0 w-full md:w-[480px] bg-white z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

                {/* Header */}
                <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-white border-b">

                    <div className="flex items-center gap-2">
                        <span className="font-medium">Shop All Products</span>
                    </div>

                    <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <RiCloseLine className="w-5 h-5" />
                    </button>

                </div>

                {/* Content */}
                <div className="p-4 space-y-6 overflow-y-auto max-h-[500px] scrollbar-hide">

                    {/* Main Image */}
                    <div className="bg-[#e75d8e] scrollbar-hide rounded-lg overflow-hidden">
                        <div className="relative aspect-square">
                            <img
                                src={images[selectedImage2]}
                                alt="Product"
                                className="object-cover w-full h-full transition-opacity duration-300"
                            />
                        </div>
                    </div>

                    {/* Thumbnails */}
                    <div className="flex gap-2 scrollbar-hide overflow-x-auto pb-2">
                        {images.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImage2(index)}
                                className={`relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors
                            ${selectedImage2 === index ? 'border-[#e75d8e]' : 'border-gray-200'}`}
                            >
                                <img src={image} alt={`Product view ${index + 1}`} className="object-cover" />
                            </button>
                        ))}
                    </div>

                    {/* Product Title and Price */}
                    <div className="flex justify-between items-center">
                        <div className="space-y-1">
                            <h2 className="text-2xl font-serif font-bold">{product_title}</h2>
                            <a href="https://shop.drinkmoment.com/" target='_blank' className="font-light text-gray-600 hover:text-gray-900 inline-flex items-center gap-1">
                                View on site <TbExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                        <div className="text-xl font-bold font-serif text-nowrap">US ${price}</div>
                    </div>

                    {/* Free Shipping Banner */}
                    <div className="bg-[#ffff99] p-2 text-center text-sm font-light rounded-lg">
                        Free Shipping on all Orders !
                    </div>

                    {/* Purchase Options */}
                    <div className="space-y-4 hidden md:block">

                        <h3 className="text-sm font-medium text-gray-500">Purchase Option</h3>

                        <div className="space-y-3">
                            {/* <label className={`flex items-center justify-between border rounded-lg p-4 cursor-pointer transition-colors
                                ${purchaseOption === 'subscribe' ? 'border-[#e75d8e] bg-pink-50' : 'border-gray-200'}`}>
                                <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="purchase-option"
                                    value="subscribe"
                                    checked={purchaseOption === 'subscribe'}
                                    onChange={(e) => setPurchaseOption(e.target.value)}
                                    className="w-4 h-4 text-[#e75d8e]"
                                />
                                <span>Subscribe + Save $6</span>
                                </div>
                                <span className="font-medium">$48</span>
                            </label> */}

                            <label className={`flex items-center justify-between border rounded-lg p-4 cursor-pointer transition-colors
                                ${purchaseOption2 === 'one-time' ? 'border-[#e75d8e] bg-pink-50' : 'border-gray-200'}`}>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="purchase-option2"
                                        value="one-time"
                                        checked={true}
                                        onChange={(e) => setPurchaseOption2(e.target.value)}
                                        className="w-4 h-4 text-[#e75d8e]"
                                    />
                                    <span className='font-serif'>One-Time Purchase</span>
                                </div>
                                <span className="font-medium font-serif">${price}</span>
                            </label>

                        </div>

                    </div>

                    {/* Tabs */}
                    <div className="border-b">
                        <div className="flex gap-4">
                            <button
                                onClick={() => setActiveTab('description')}
                                className={`pb-2 text-sm font-medium transition-colors relative
                                ${activeTab === 'description' ? 'text-black' : 'text-gray-500'}`}
                            >
                                Description
                                {activeTab === 'description' && (
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black" />
                                )}
                            </button>
                            <button
                                onClick={() => setActiveTab('ingredients')}
                                className={`pb-2 text-sm font-medium transition-colors relative
                                ${activeTab === 'ingredients' ? 'text-black' : 'text-gray-500'}`}
                            >
                                Ingredients
                                {activeTab === 'ingredients' && (
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="space-y-4">
                        {activeTab === 'description' ? (<p className="text-gray-600 font-light">{description}</p>) 
                        : (<p className="text-gray-600 font-light">Ingredients information coming soon...</p>)}
                    </div>

                    <div className='fixed bottom-0 right-0 px-3 hidden md:block w-full'>
                        <ShopPayButton variantId={variantId} />
                        <Payment productId={productItem} product_title={product_title} amount={parseFloat(price).toFixed(2)} variant_id={variantId} image={images[selectedImage2]} />
                    </div>


                </div>

            </div>
        </>
    )
}

const BackDrop = ({ isOpen, setIsOpen }) => {

    return (
        <>
            {isOpen && (
                <div
                    className="absolute inset-0 bg-black/30 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    )

}

const DryJanuarySection = ({ tagline, handleOpen }) => {

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 md:py-16 ">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        {/* Text Content */}
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-[2.5rem] md:text-[3.5rem] leading-[1.1] font-serif">
            Hello world of sports and enjoy your days
          </h2>

           {/* Image */}
            <div className="w-full md:hidden md:w-1/2">
                <div className="relative">
                    <img
                        src="/images/prod-1.webp" 
                        alt="Moment drink cans with garnishes"
                        className="w-[500px] h-[500px] object-cover rounded-lg"
                    />
                </div>
            </div>
          
          <button onClick={handleOpen} className="w-full md:w-auto bg-pink-400 hover:bg-pink-500 transition-colors text-white font-medium py-4 px-8 rounded-md">
            SHOP NOW FOR DRY JAN
          </button>
          
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-black w-5 h-5" />
              ))}
            </div>
            <span className="text-sm">5,606 reviews</span>
          </div>
        </div>

        {/* Image */}
        <div className="w-full hidden md:block md:w-1/2">
          <div className="relative">
            <img
              src="/images/prod-1.webp" 
              alt="Moment drink cans with garnishes"
              className="w-[500px] h-[500px] object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );

}

const GoodbyeHangoversSection = () => {
    return (
      <section className="max-w-3xl mx-auto px-4 py-12 md:py-16">
        <div className="space-y-8 md:space-y-10">
          {/* Heading */}
          <h2 className="text-xl font-medium">
            1. GOODBYE HANGOVERS, HELLO CLARITY
          </h2>
  
          {/* Description */}
          <p className="text-lg font-light">
            Moment lets you enjoy the ritual of drinking without the morning-after regrets. Feel refreshed, clear-headed, and ready to take on the day with no headaches, grogginess, or hanxiety.
          </p>
  
          {/* CTA Section */}
          <div className="flex flex-col items-center space-y-4">
            <button className="w-full md:w-auto bg-pink-400 hover:bg-pink-500 transition-colors text-white font-medium py-4 px-12 rounded-md">
              SHOP NOW FOR DRY JAN
            </button>
            
            <p className="text-sm font-medium">
              ✨ FREE SHIPPING FOR DRY JANUARY ✨
            </p>
          </div>
        </div>
      </section>
    )
}

const WellnessGoalsSection = () => {

    return (
        <>
            <section className="max-w-3xl mx-auto px-4">
                <div className="space-y-8">

                    {/* Image Container */}
                    <div className="relative aspect-square max-w-xl md:max-w-5xl mx-auto">
                        <img
                        src="/images/prod-2.webp"
                        alt="Zero alcohol cocktail with natural ingredients"
                        className="w-full h-full object-cover rounded-lg"
                        />
                    </div> 
                
                </div>
            </section>
            <section className="max-w-3xl mx-auto px-4 py-12 md:py-16">
                <div className="space-y-8 md:space-y-10">

                    {/* Heading */}
                    <h2 className="text-xl font-medium">
                        2. SUPPORT YOUR WELLNESS GOALS
                    </h2>
            
                    {/* Description */}
                    <p className="text-lg font-light">
                        With all natural ingredients and zero added sugar, Moment aligns with your health journey, making Dry January a breeze.
                    </p>
            
                    {/* CTA Section */}
                    <div className="flex flex-col items-center space-y-4">
                        <button className="w-full md:w-auto bg-pink-400 hover:bg-pink-500 transition-colors text-white font-medium py-4 px-12 rounded-md">
                            SHOP NOW FOR DRY JAN
                        </button>
                        
                        <p className="text-sm font-medium">
                            ✨ FREE SHIPPING FOR DRY JANUARY ✨
                        </p>
                    </div>

                </div>
            </section>
        </>
    );

}

const BannerImage = () => {

    return (
        <section className="max-w-3xl mx-auto px-4">
            <div className="space-y-8">

                {/* Image Container */}
                <div className="relative aspect-square max-w-xl md:max-w-5xl mx-auto">
                    <img
                    src="/images/prod-2.webp"
                    alt="Zero alcohol cocktail with natural ingredients"
                    className="w-full h-full object-cover rounded-lg"
                    />
                </div> 
            
            </div>
        </section>
    )
}

const TestimonialCarousel = () => {

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [scrollSnaps, setScrollSnaps] = useState([])
  
    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])
    const scrollTo = useCallback((index) => emblaApi && emblaApi.scrollTo(index), [emblaApi])
  
    const onSelect = useCallback(() => {
      if (!emblaApi) return
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }, [emblaApi])
  
    useEffect(() => {
      if (!emblaApi) return
      onSelect()
      setScrollSnaps(emblaApi.scrollSnapList())
      emblaApi.on('select', onSelect)
      return () => emblaApi.off('select', onSelect)
    }, [emblaApi, onSelect])
  
    return (
        <>
            <section className="max-w-4xl mx-auto px-4 py-12 md:py-16">
                <div className="relative">
                {/* Carousel Container */}
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex">
                    {testimonials.map((testimonial, index) => (
                        <div 
                        key={index}
                        className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] px-4"
                        >
                        <div className="relative">
                            <img
                            src={testimonial.image}
                            alt={`${testimonial.name}'s testimonial`}
                            className="w-full rounded-lg"
                            />
                            
                            {/* Testimonial Box */}
                            <div className="absolute bottom-4 left-4 right-4 bg-white rounded-xl p-4 shadow-lg">
                            {/* Stars */}
                            <div className="flex mb-2">
                                {[...Array(5)].map((_, i) => (
                                <FaStar key={i} className="text-black w-4 h-4" />
                                ))}
                            </div>
                            
                            {/* Quote */}
                            <p className="text-sm md:text-base mb-2">
                                {testimonial.quote}
                            </p>
                            
                            {/* Author */}
                            <p className="text-sm font-medium">
                                -{testimonial.name}
                            </p>
                            </div>
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
        
                {/* Navigation Arrows */}
                <button
                    onClick={scrollPrev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
                    aria-label="Previous slide"
                >
                    <FaChevronLeft className="w-4 h-4" />
                </button>
                <button
                    onClick={scrollNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
                    aria-label="Next slide"
                >
                    <FaChevronRight className="w-4 h-4" />
                </button>
        
                {/* Dots */}
                <div className="flex justify-center gap-2 mt-4">
                    {scrollSnaps.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => scrollTo(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                        index === selectedIndex ? 'bg-black' : 'bg-gray-300'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                    ))}
                </div>
                </div>
            </section>
            <section className="max-w-3xl mx-auto px-4 py-12 md:py-16">
                <div className="space-y-8 md:space-y-10">
                    {/* Heading */}
                    <h2 className="text-xl font-medium">
                        3. ADAPTOGENS FOR THE WIN
                    </h2>
            
                    {/* Description */}
                    <p className="text-lg font-light">
                        Moment is formulated with adaptogens such as L-theanine, ashwagandha, and ginseng to reduce anxiety, improve focus, and increase feelings of well-being. So, when you're looking for a pick-me-up without the alcohol, reach for a can of Moment and enjoy a natural mood boost.
                    </p>
            
                    {/* CTA Section */}
                    <div className="flex flex-col items-center space-y-4">
                        <button className="w-full md:w-auto bg-pink-400 hover:bg-pink-500 transition-colors text-white font-medium py-4 px-12 rounded-md">
                            SHOP NOW FOR DRY JAN
                        </button>
                        
                        <p className="text-sm font-medium">
                            ✨ FREE SHIPPING FOR DRY JANUARY ✨
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}

const Template02 = (props) => {

    const { announcement = '', tagline = '', sub_title = '', images = null, description = '' } = props;
    const { price = '0.1', product_title = '', variantId = '', productItem = '' } = props;

    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedImage2, setSelectedImage2] = useState(0);
    const [purchaseOption, setPurchaseOption] = useState('one-time');
    const [purchaseOption2, setPurchaseOption2] = useState('one-time');
    
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(false);

    const handleOpen = () => setIsOpen(true);

    return (
        <>
            <SideBarRight variantId={variantId} productItem={productItem} product_title={product_title} description={description} price={price} isOpen={isOpen} setIsOpen={setIsOpen} images={images} selectedImage2={selectedImage2} setSelectedImage2={setSelectedImage2} activeTab={activeTab} setActiveTab={setActiveTab} purchaseOption2={purchaseOption2} setPurchaseOption2={setPurchaseOption2} />
            <div className="min-h-screen bg-white relative overflow-x-hidden scrollbar-hide">

                <BackDrop isOpen={isOpen} setIsOpen={setIsOpen} />

                {/* Announcement Banner */}
                {announcement !== '' && <div className="w-full bg-[#ffff99] uppercase p-2 text-center text-sm font-medium">
                    {announcement}
                </div>}


                <div className='bg-orange-50'>
                    <DryJanuarySection tagline={tagline} handleOpen={handleOpen} />
                </div>

                <GoodbyeHangoversSection handleOpen={handleOpen} />
                <WellnessGoalsSection handleOpen={handleOpen} />
                <TestimonialCarousel handleOpen={handleOpen} />
                <BannerImage handleOpen={handleOpen} />

                {/* Purchase Options */}
                <div className='fixed z-50 md:hidden bottom-0 bg-white md:bg-transparent p-2 left-0 md:p-0 w-full'>
        
                    <div className="space-y-4 mb-3">
                        <h3 className="text-sm font-medium text-gray-500">Purchase Option</h3>
                        <div className="space-y-3">
                            {/* <label className={`flex items-center justify-between border rounded-lg p-4 cursor-pointer transition-colors
                            ${purchaseOption === 'subscribe' ? 'border-[#e75d8e] bg-pink-50' : 'border-gray-200'}`}>
                            <div className="flex items-center space-x-2">
                                <input
                                type="radio"
                                name="purchase-option"
                                value="subscribe"
                                checked={purchaseOption === 'subscribe'}
                                onChange={(e) => setPurchaseOption(e.target.value)}
                                className="w-4 h-4 text-[#e75d8e] border-gray-300 focus:ring-[#e75d8e]"
                                />
                                <span>Subscribe - Save $6</span>
                            </div>
                            <span className="font-medium">$48</span>
                            </label> */}

                            <label className={`flex items-center justify-between border rounded-lg p-4 cursor-pointer transition-colors
                                ${purchaseOption === 'one-time' ? 'border-[#e75d8e] bg-pink-50' : 'border-gray-200'}`}>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="purchase-option"
                                        value="one-time"
                                        checked={purchaseOption === 'one-time'}
                                        onChange={(e) => setPurchaseOption(e.target.value)}
                                        className="w-4 h-4 text-[#e75d8e] border-gray-300 focus:ring-[#e75d8e]"
                                    />
                                    <span className='font-serif'>One-Time Purchase</span>
                                </div>
                                <span className="font-medium font-serif">${price}</span>
                            </label>
                        </div>
                    </div>
                
                    {/* Add to Cart Button */}
                    {/* <button onClick={handleCart} className="w-full py-3 px-4 bg-pink-500 text-white rounded-lg font-medium 
                        hover:bg-pink-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Add to cart
                    </button> */}

                    {variantId !== '' && <ShopPayButton variantId={variantId} />}

                    {(productItem !== '' && product_title !== '' && variantId !== '') &&
                        <Payment productId={productItem} product_title={product_title} amount={parseFloat(price).toFixed(2)} variant_id={variantId} />
                    }

                </div>

                <main className="container mx-auto px-4 py-8">

                    {/* Product Header */}
                    {(tagline !== '' || sub_title !== '') && <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold mb-2 font-serif">{tagline}</h1>
                        <p className="text-gray-600 font-light">
                            {sub_title}
                        </p>
                    </div>}

                    {/* Product Section */}
                    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">

                        {/* Product Images */}
                        <div className="space-y-4">
                            <div className="bg-[#e75d8e] rounded-lg overflow-hidden scrollbar-hide">
                                <div className="relative aspect-square">
                                    {images !== null && <img
                                        src={images[selectedImage]}
                                        alt="Botanical Soda Variety Pack"
                                        className="object-cover w-full h-full transition-opacity duration-300 ease-in-out"
                                    />}
                                </div>
                            </div>

                            {/* Thumbnail Images */}
                            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 w-[330px] md:w-auto">
                                {images !== null && images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`relative w-24 h-24 flex-shrink-0 rounded-lg scrollbar-hide overflow-hidden border-2 transition-colors duration-200 
                                            ${selectedImage === index ? 'border-[#e75d8e]' : 'border-gray-200'}`}
                                        aria-label={`View product image ${index + 1}`}
                                    >
                                        <img src={image} alt={`Product view ${index + 1}`} className="object-cover" />
                                    </button>
                                ))}
                            </div>

                        </div>

                        {/* Product Details */}
                        <div className="space-y-6">

                            {(product_title !== '' || price !== '') && <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-serif font-bold">{product_title}</h2>
                                <div className="text-xl font-serif font-bold text-nowrap">US ${price}</div>
                            </div>}

                            <p className="font-light text-justify">{description}</p>

                            <div className='fixed md:static bottom-0 bg-white md:bg-transparent p-2 left-0 md:p-0 w-full'>

                                {/* Purchase Options */}
                                <div className="space-y-4 mb-3">
                                    <h3 className="text-sm font-medium text-gray-500">Purchase Option</h3>
                                    <div className="space-y-3">
                                        {/* <label className={`flex items-center justify-between border rounded-lg p-4 cursor-pointer transition-colors
                                        ${purchaseOption === 'subscribe' ? 'border-[#e75d8e] bg-pink-50' : 'border-gray-200'}`}>
                                        <div className="flex items-center space-x-2">
                                            <input
                                            type="radio"
                                            name="purchase-option"
                                            value="subscribe"
                                            checked={purchaseOption === 'subscribe'}
                                            onChange={(e) => setPurchaseOption(e.target.value)}
                                            className="w-4 h-4 text-[#e75d8e] border-gray-300 focus:ring-[#e75d8e]"
                                            />
                                            <span>Subscribe - Save $6</span>
                                        </div>
                                        <span className="font-medium">$48</span>
                                        </label> */}

                                        <label className={`flex items-center justify-between border rounded-md p-[0.6em] cursor-pointer transition-colors
                                            ${purchaseOption === 'one-time' ? 'border-[#e75d8e] bg-pink-50' : 'border-gray-200'}`}>
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    type="radio"
                                                    name="purchase-option"
                                                    value="one-time"
                                                    checked={purchaseOption === 'one-time'}
                                                    onChange={(e) => setPurchaseOption(e.target.value)}
                                                    className="w-4 h-4 text-[#e75d8e] border-gray-300 focus:ring-[#e75d8e]"
                                                />
                                                <span className='font-serif'>One-Time Purchase</span>
                                            </div>
                                            <span className="font-medium font-serif">${parseFloat(price).toFixed(2)}</span>
                                        </label>

                                    </div>
                                </div>

                                {/* Add to Cart Button */}
                                {/* <button onClick={handleCart} className="w-full py-3 px-4 bg-pink-500 text-white rounded-lg font-medium 
                                    hover:bg-pink-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Add to cart
                                </button> */}

                                <div className='flex justify-center items-center gap-2 md:block w-full'>
                                    <ShopPayButton variantId={variantId} />
                                    <Payment productId={productItem} product_title={product_title} amount={parseFloat(price).toFixed(2)} variant_id={variantId} image={images[selectedImage]} />
                                </div>

                            </div>

                        </div>

                    </div>

                    <section className="py-12 md:py-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {products.map((product, index) => (
                            <div key={index} className="group">
                                {/* Product Card */}
                                <div className={`relative rounded-2xl transition-transform duration-300 group-hover:scale-[1.02]`}>
                                
                                {/* Product Image */}
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-auto object-contain mt-12 mb-6 rounded-md"
                                />
                                
                                {/* Product Info */}
                                <div className="space-y-2">
                                    <h3 className="text-lg font-medium">
                                    {product.title}
                                    </h3>
                                    
                                    {/* Rating */}
                                    <div className="flex items-center gap-2">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} className="w-4 h-4 " />
                                        ))}
                                    </div>
                                    <span className="text-sm font-light">
                                        {product.reviews} reviews
                                    </span>
                                    </div>
                                    
                                    {/* Price */}
                                    <p className="text-lg font-medium">
                                    US${product.price}
                                    </p>
                                </div>
                                </div>
                            </div>
                            ))}
                        </div>
                    </section>

                </main>

                <ReviewSection />

                <Footer />
            </div>
        </>

    );

}

export default Template02