"use client";

import useTranslate from "@/utils/UseTranslate";
import { useRouter } from "next/navigation";
import React from "react";

export default function TermsClient() {
    const router = useRouter();
    const t = useTranslate();
    const isRtl = router.locale === "ar";

    return (
        <div className="container pt-5 mb-24">
            <div className="container mx-auto px-4">
                <h1 className={`font-bold text-3xl mb-0`}>
                    {t.termsandConditionsUse}
                </h1>
                <div className="grid grid-cols-1 gap-3 mt-3">
                    <div className="col-span-1">
                        <div className="mb-4">
                            <h6 className="text-lg font-medium flex items-center">
                                <i className="" /> Last Updated
                            </h6>
                            <p className="text-gray-600">20 Dec, 2023</p>
                        </div>
                    </div>

                    <div className="col-span-1">
                        <div>
                            <h4 className={`mt-4 text-xl font-semibold`}>
                                {t.terms}
                            </h4>
                            <p className={`mt-4 text-gray-700`}>
                                {t.byAccessing}
                            </p>
                            <h4 className={`mt-4 text-xl font-semibold`}>
                                {t.useLicense}
                            </h4>
                            <p className={`mt-4 text-gray-700`}>
                                {t.perMission}
                            </p>
                            <ul className={`text-sm text-gray-600 mt-4 list-disc list-inside`}>
                                <li className={`${isRtl ? "text-left" : ""}`}>{t.modifyMaterials}</li>
                                <li className={`${isRtl ? "text-left" : ""}`}>{t.commericialPurpose}</li>
                                <li className={`${isRtl ? "text-left" : ""}`}>{t.attemptToDecompile}</li>
                                <li className={`${isRtl ? "text-left" : ""}`}>{t.removeAnyCopyright}</li>
                                <li className={`${isRtl ? "text-left" : ""}`}>{t.transferTheMaterial}</li>
                            </ul>
                            <p className={`mt-4 text-gray-700`}>
                                {t.licenseAutomaticallyTerminate}
                            </p>
                        </div>
                    </div>

                    <div className={`mb-0`}>
                        <h4 className={`text-xl font-semibold`}>
                            {t.disclamer}
                        </h4>
                        <p className={`mt-4 text-gray-700`}>
                            {t.materialOnCarPrices}
                        </p>
                    </div>

                    <div className="mb-0">
                        <h4 className={`text-xl font-semibold`}>
                            {t.constraints}
                        </h4>
                        <p className={`mt-4 text-gray-700`}>
                            {t.constraintsSub}
                        </p>
                    </div>

                    <div className="mb-0">
                        <h4 className={`text-xl font-semibold`}>
                            {t.amendments}
                        </h4>
                        <p className={`mt-4 text-gray-700`}>
                            {t.materialIncoprate}
                        </p>
                    </div>

                    <div className="mb-0">
                        <h4 className={`text-xl font-semibold`}>
                            {t.links}
                        </h4>
                        <p className={`mt-4 text-gray-700`}>
                            {t.usersRisk}
                        </p>
                    </div>

                    <div className="mb-0">
                        <h4 className={`text-xl font-semibold`}>
                            {t.siteTermsOfUse}
                        </h4>
                        <p className={`mt-4 text-gray-700`}>
                            {t.siteTermsOfUseSub}
                        </p>
                    </div>

                    <div className="mb-0">
                        <h4 className={`text-xl font-semibold`}>
                            {t.governingLaw}
                        </h4>
                        <p className={`mt-4 text-gray-700`}>
                            {t.caseIdentifying}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
