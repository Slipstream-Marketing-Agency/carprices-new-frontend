import Image from "next/image";

const testimonials = [
    {
        name: "John Doe",
        location: "Dubai, UAE",
        review: "I found the perfect car through Carprices Classifieds! The process was easy, and I was able to compare many options before making my decision.",
        rating: 5,
        image: "https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"
    },
    {
        name: "Sarah Al Mansoori",
        location: "Abu Dhabi, UAE",
        review: "Selling my car was super quick and hassle-free. Highly recommended if you're looking to buy or sell in the UAE!",
        rating: 4,
        image: "https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"
    },
    {
        name: "Mohammed Ali",
        location: "Sharjah, UAE",
        review: "Great platform for used cars! The listings were clear, and I found a great deal on a vehicle I love.",
        rating: 5,
        image: "https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"
    },
    {
        name: "Fatima Khalifa",
        location: "Dubai, UAE",
        review: "This was the easiest car selling experience I’ve ever had. I sold my car within a week and got a fair price.",
        rating: 4,
        image: "https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"
    },
];

const TestimonialsSection = () => {
    return (
        <section className="tw-px-4 tw-py-8 tw-bg-gray-100">
            <h2 className="tw-text-3xl tw-font-bold tw-text-center tw-mb-8">What Our Customers Say</h2>
            <div className="tw-flex tw-flex-wrap tw-gap-4 tw-justify-center">
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="tw-bg-white tw-rounded-lg tw-shadow-lg tw-p-6 tw-max-w-sm tw-mb-4">
                        <div className="tw-flex tw-items-center tw-mb-4">
                            <Image
                                src={testimonial.image}
                                alt={testimonial.name}
                                className="tw-w-16 tw-h-16 tw-rounded-full tw-object-cover tw-mr-4"
                                width='64'
                                height='64'
                            />
                            <div>
                                <h3 className="tw-font-semibold tw-text-lg">{testimonial.name}</h3>
                                <p className="tw-text-sm tw-text-gray-500">{testimonial.location}</p>
                            </div>
                        </div>
                        <p className="tw-text-gray-700 tw-mb-4">"{testimonial.review}"</p>
                        <div className="tw-flex tw-items-center">
                            {Array(testimonial.rating)
                                .fill()
                                .map((_, i) => (
                                    <svg key={i} className="tw-w-5 tw-h-5 tw-text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.004 3.086a1 1 0 00.95.69h3.241c.967 0 1.371 1.24.588 1.81l-2.622 1.896a1 1 0 00-.363 1.118l1.004 3.086c.3.921-.755 1.688-1.538 1.118l-2.622-1.896a1 1 0 00-1.176 0l-2.622 1.896c-.783.57-1.838-.197-1.538-1.118l1.004-3.086a1 1 0 00-.363-1.118L2.166 8.513c-.783-.57-.379-1.81.588-1.81h3.241a1 1 0 00.95-.69l1.004-3.086z" />
                                    </svg>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TestimonialsSection;
