import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Layout from "@/components/layout/Layout";
import Ad728x90 from "@/components/ads/Ad728x90";
import Ad970x250 from "@/components/ads/Ad970x250";
import { useMediaQuery } from "react-responsive";
import Ad300x600 from "@/components/ads/Ad300x600";
import FeaturedImage from "@/components/common/FeaturedImage";
import moment from "moment";
import Link from "next/link";
import ViewAllButton from "./ViewAllButton";

export default function Webstories(props) {

    const [webStories, setWebStories] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    return (
        <>
            <section className="my-2">
                <div className="card_wrapper">
                    <h2>Web Stories</h2>
                    <div className="row">
                        <ul className="storyList marginBottom20">
                            {props.props.webstories &&
                                props.props.webstories.map((item, index) => (
                                    <li key={index}>
                                        <div className="webstoryCard">
                                            <Link
                                                href={`/web-stories/${item.slug}`}
                                                target="_blank"
                                                title={item?.title}
                                                rel="noopener"
                                            >
                                                <FeaturedImage width={250} height={250}
                                                    src={item?.slides[0].image1}
                                                    alt={item?.title}
                                                    title={item?.title}
                                                    setIsLoading={setIsLoading}
                                                />
                                                <div className="storyDetail">
                                                    <h3 className="heading ">
                                                        {item?.mainTitle}
                                                    </h3>
                                                    <div className="date">Carprices |  {moment(item.publishedAt).format("MMM DD, YYYY")}</div>
                                                </div>
                                            </Link>
                                        </div>
                                    </li>
                                ))}
                        </ul>
                    </div>
                    <ViewAllButton text={"View All Stories"} link={"/web-stories"} />
                </div>
            </section>
        </>
    )
}
