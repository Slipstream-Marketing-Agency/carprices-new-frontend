import Image from 'next/image'
import React from 'react'
import Slider from 'react-slick';

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4.5, // Set to 4.5 for the default display
    slidesToScroll: 1,
    arrows: false,
};

const WebStories = () => {

    const stories = [
        {
            imageUrl: "https://s3-alpha-sig.figma.com/img/07a5/3f7a/18d7465bae9ac7fc1b72e166a2371198?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NtjvE0gShy1D7OtTt6JmQaDmvnENOErPOxfGf5l9Ell06k6wQiRAtKSWuN7TGxzBfDGnGD-JIPKT-qRPcnMeTulrWL7GGjrBRoiaiTCd6xbkXAJsqFmsE7cMxptk7S5NbMUcow2GJP99CMDCkWmFb37bXEcDh0tryLSLsdWHuQaFigDiGxN3XJWw7WmAhVncIzTVb7K2~iG4x0utblb6FpI0k6wYRVD9yXgp5BIWnJETnOd7WU-IHC2r9P0YpyvVc8ymipoFidvrZxKUSi-V5GtAQFNXxKYR663xBnpsQBPPldP-SIo0BqzpJpG6H2h~yzJtYR66mmB0qTCQ2ge0lQ__",
            caption: "Caption for story 1",
            date: "12 April 2024",
        },
        {
            imageUrl: "https://s3-alpha-sig.figma.com/img/07a5/3f7a/18d7465bae9ac7fc1b72e166a2371198?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NtjvE0gShy1D7OtTt6JmQaDmvnENOErPOxfGf5l9Ell06k6wQiRAtKSWuN7TGxzBfDGnGD-JIPKT-qRPcnMeTulrWL7GGjrBRoiaiTCd6xbkXAJsqFmsE7cMxptk7S5NbMUcow2GJP99CMDCkWmFb37bXEcDh0tryLSLsdWHuQaFigDiGxN3XJWw7WmAhVncIzTVb7K2~iG4x0utblb6FpI0k6wYRVD9yXgp5BIWnJETnOd7WU-IHC2r9P0YpyvVc8ymipoFidvrZxKUSi-V5GtAQFNXxKYR663xBnpsQBPPldP-SIo0BqzpJpG6H2h~yzJtYR66mmB0qTCQ2ge0lQ__",
            caption: "Caption for story 2",
            date: "12 April 2024",
        },
        {
            imageUrl: "https://s3-alpha-sig.figma.com/img/07a5/3f7a/18d7465bae9ac7fc1b72e166a2371198?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NtjvE0gShy1D7OtTt6JmQaDmvnENOErPOxfGf5l9Ell06k6wQiRAtKSWuN7TGxzBfDGnGD-JIPKT-qRPcnMeTulrWL7GGjrBRoiaiTCd6xbkXAJsqFmsE7cMxptk7S5NbMUcow2GJP99CMDCkWmFb37bXEcDh0tryLSLsdWHuQaFigDiGxN3XJWw7WmAhVncIzTVb7K2~iG4x0utblb6FpI0k6wYRVD9yXgp5BIWnJETnOd7WU-IHC2r9P0YpyvVc8ymipoFidvrZxKUSi-V5GtAQFNXxKYR663xBnpsQBPPldP-SIo0BqzpJpG6H2h~yzJtYR66mmB0qTCQ2ge0lQ__",
            caption: "Caption for story 3",
            date: "12 April 2024",
        },
        {
            imageUrl: "https://s3-alpha-sig.figma.com/img/07a5/3f7a/18d7465bae9ac7fc1b72e166a2371198?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NtjvE0gShy1D7OtTt6JmQaDmvnENOErPOxfGf5l9Ell06k6wQiRAtKSWuN7TGxzBfDGnGD-JIPKT-qRPcnMeTulrWL7GGjrBRoiaiTCd6xbkXAJsqFmsE7cMxptk7S5NbMUcow2GJP99CMDCkWmFb37bXEcDh0tryLSLsdWHuQaFigDiGxN3XJWw7WmAhVncIzTVb7K2~iG4x0utblb6FpI0k6wYRVD9yXgp5BIWnJETnOd7WU-IHC2r9P0YpyvVc8ymipoFidvrZxKUSi-V5GtAQFNXxKYR663xBnpsQBPPldP-SIo0BqzpJpG6H2h~yzJtYR66mmB0qTCQ2ge0lQ__",
            caption: "Caption for story 4",
            date: "12 April 2024",
        },
        {
            imageUrl: "https://s3-alpha-sig.figma.com/img/07a5/3f7a/18d7465bae9ac7fc1b72e166a2371198?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NtjvE0gShy1D7OtTt6JmQaDmvnENOErPOxfGf5l9Ell06k6wQiRAtKSWuN7TGxzBfDGnGD-JIPKT-qRPcnMeTulrWL7GGjrBRoiaiTCd6xbkXAJsqFmsE7cMxptk7S5NbMUcow2GJP99CMDCkWmFb37bXEcDh0tryLSLsdWHuQaFigDiGxN3XJWw7WmAhVncIzTVb7K2~iG4x0utblb6FpI0k6wYRVD9yXgp5BIWnJETnOd7WU-IHC2r9P0YpyvVc8ymipoFidvrZxKUSi-V5GtAQFNXxKYR663xBnpsQBPPldP-SIo0BqzpJpG6H2h~yzJtYR66mmB0qTCQ2ge0lQ__",
            caption: "Caption for story 5",
            date: "12 April 2024",
        },
        {
            imageUrl: "https://s3-alpha-sig.figma.com/img/07a5/3f7a/18d7465bae9ac7fc1b72e166a2371198?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NtjvE0gShy1D7OtTt6JmQaDmvnENOErPOxfGf5l9Ell06k6wQiRAtKSWuN7TGxzBfDGnGD-JIPKT-qRPcnMeTulrWL7GGjrBRoiaiTCd6xbkXAJsqFmsE7cMxptk7S5NbMUcow2GJP99CMDCkWmFb37bXEcDh0tryLSLsdWHuQaFigDiGxN3XJWw7WmAhVncIzTVb7K2~iG4x0utblb6FpI0k6wYRVD9yXgp5BIWnJETnOd7WU-IHC2r9P0YpyvVc8ymipoFidvrZxKUSi-V5GtAQFNXxKYR663xBnpsQBPPldP-SIo0BqzpJpG6H2h~yzJtYR66mmB0qTCQ2ge0lQ__",
            caption: "Caption for story 6",
            date: "12 April 2024",
        },
        {
            imageUrl: "https://s3-alpha-sig.figma.com/img/07a5/3f7a/18d7465bae9ac7fc1b72e166a2371198?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NtjvE0gShy1D7OtTt6JmQaDmvnENOErPOxfGf5l9Ell06k6wQiRAtKSWuN7TGxzBfDGnGD-JIPKT-qRPcnMeTulrWL7GGjrBRoiaiTCd6xbkXAJsqFmsE7cMxptk7S5NbMUcow2GJP99CMDCkWmFb37bXEcDh0tryLSLsdWHuQaFigDiGxN3XJWw7WmAhVncIzTVb7K2~iG4x0utblb6FpI0k6wYRVD9yXgp5BIWnJETnOd7WU-IHC2r9P0YpyvVc8ymipoFidvrZxKUSi-V5GtAQFNXxKYR663xBnpsQBPPldP-SIo0BqzpJpG6H2h~yzJtYR66mmB0qTCQ2ge0lQ__",
            caption: "Caption for story 7",
            date: "12 April 2024",
        },
    ]

    return (
        <div className='tw-relative tw-flex tw-justify-between container'>
            <div className="tw-overflow-x-auto tw-space-x-4 tw-my-4 custom-scrollbar tw-flex lg:tw-hidden">
                {stories.map((story, index) => {
                    return (
                        <div key={index} className="tw-flex-shrink-0 tw-relative tw-w-64 tw-h-96 tw-rounded-2xl">
                            <Image
                                width="0"
                                height="0"
                                sizes="100vw"
                                src={story.imageUrl}
                                alt={story.caption}
                                className="tw-object-cover tw-w-full tw-h-96 tw-rounded-2xl"
                            />
                            <div className="tw-m-2 tw-absolute tw-bottom-4 tw-left-0 tw-right-0 tw-py-3 tw-pl-4 tw-bg-opacity-50 tw-bg-black tw-rounded-2xl tw-text-white">
                                <h6 className="tw-text-white !tw-text-xl tw-mb-0">{story.caption}</h6>
                                <p className="tw-text-sm tw-font-light">Created on: {story.date}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="container tw-hidden lg:tw-block">
                <Slider {...settings}>
                    {stories.map((story, index) => (
                        <div key={index} className='tw-px-2'>
                            <div className="tw-flex-shrink-0 tw-relative tw-w-full tw-h-[30rem] tw-rounded-2xl">
                                <Image
                                    width="0"
                                    height="0"
                                    sizes="100vw"
                                    src={story.imageUrl}
                                    alt={story.caption}
                                    className="tw-object-cover tw-w-full tw-h-[30rem] tw-rounded-2xl"
                                />
                                <div className="tw-m-2 tw-absolute tw-bottom-4 tw-left-0 tw-right-0 tw-py-3 tw-pl-4 tw-bg-opacity-50 tw-bg-black tw-rounded-2xl tw-text-white">
                                    <h6 className="tw-text-white !tw-text-xl tw-mb-0">{story.caption}</h6>
                                    <p className="tw-text-sm tw-font-light">Created on: {story.date}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    )
}

export default WebStories