import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import FeaturedImage from "../utils/FeaturedImage";

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
