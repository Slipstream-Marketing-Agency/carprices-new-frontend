import MainLayout from '@/src/layout/MainLayout'
import useTranslate from '@/src/utils/useTranslate';
import { useRouter } from 'next/router';
import React from 'react'

export default function terms() {
    const router = useRouter();
    const t = useTranslate();
    let isRtl = router.locale === 'ar';
    return (
        <MainLayout>
            <div className="return-and-exchange-pages pt-5 mb-100">
                <div className="container">
                <h1 className={`fw-bolder ${isRtl && 'text-end'}`}>{t.termsandConditionsUse}</h1>
                    <div className="row">
                        <div className="col-lg-12 ">
                            {!isRtl && (
                                <div className="update-date mb-3">
                                    <h6>
                                        <i className="bi bi-caret-right-fill" /> Last Updated
                                    </h6>
                                    <p>20 Dec, 2023</p>
                                </div>
                            )}
                            {isRtl && (
                                <div className="update-date mb-3 d-flex justify-content-end">
                                    <h6>
                                        <i className="bi bi-caret-right-fill" /> آخر تحديث
                                    </h6>
                                    <p>20 ديسمبر 2023</p>
                                </div>
                            )}
                        </div>
                        <div className="col-lg-12 mb-4">
                            <div>
                                <h4 className={`mt-5 ${isRtl && 'text-end'}`}>{t.terms}</h4>
                                <p className={`paragraph ${isRtl && 'text-end'}`}>{t.byAccessing}</p>
                                <br />
                                <h4 className={isRtl && 'text-end'}>{t.useLicense}</h4>
                                <p className={`paragraph ${isRtl && 'text-end'}`}>{t.perMission}</p>
                                <ul className={isRtl && 'text-end'}>
                                    <li className={isRtl && 'text-left'}>{t.modifyMaterials}</li>
                                    <li className={isRtl && 'text-left'}>{t.commericialPurpose}</li>
                                    <li className={isRtl && 'text-left'}>{t.attemptToDecompile}</li>
                                    <li className={isRtl && 'text-left'}>{t.removeAnyCopyright}</li>
                                    <li className={isRtl && 'text-left'}>{t.transferTheMaterial}</li>
                                </ul>
                                <p className={`paragraph ${isRtl && 'text-end'}`}>{t.licenseAutomaticallyTerminate}</p>
                            </div>
                        </div>
                        <div className={`mb-4 ${isRtl && 'text-end'}`}>
                            <h4 className={` ${isRtl && 'text-end'}`}>{t.disclamer}</h4>
                            <p className={`paragraph ${isRtl && 'text-end'}`}>{t.materialOnCarPrices}</p>
                        </div>
                        <div className='mb-4'>
                            <h4 className={` ${isRtl && 'text-end'}`}>{t.constraints}</h4 >
                            <p className={`paragraph ${isRtl && 'text-end'}`}>{t.constraintsSub}</p>
                        </div>
                        <div className='mb-4'>
                            <h4 className={`${isRtl && 'text-end'}`}>{t.amendments}</h4>
                            <p className={`paragraph ${isRtl && 'text-end'}`}>{t.materialIncoprate}</p>
                        </div>
                        <div className='mb-4'>
                            <h4 className={`${isRtl && 'text-end'}`}> {t.links}</h4>
                            <p className={`paragraph ${isRtl && 'text-end'}`}>{t.usersRisk}</p>
                        </div>
                        <div className='mb-4'>
                            <h4 className={`${isRtl && 'text-end'}`}>{t.siteTermsOfUse}</h4>
                            <p className={`paragraph ${isRtl && 'text-end'}`}>{t.siteTermsOfUseSub}</p>
                        </div>
                        <div className='mb-4'>
                            <h4 className={`${isRtl && 'text-end'}`}>{t.governingLaw}</h4>
                            <p className={`paragraph ${isRtl && 'text-end'}`}>{t.caseIdentifying}</p>
                        </div>

                    </div>
                </div>
            </div>
        </MainLayout>
    )
}
