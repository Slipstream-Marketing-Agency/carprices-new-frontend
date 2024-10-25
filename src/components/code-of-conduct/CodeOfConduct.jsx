"use client"
import React from 'react'
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import useTranslate from '@/utils/UseTranslate';

export default function CodeOfConduct() {

    const router = useRouter();
    const t = useTranslate();
    let isRtl = router.locale === "ar";
    return (
        <div className="container mt-6">
            <div >
                <h1 className={`text-4xl font-bold mb-6 ${isRtl ? "text-right" : "text-left"}`}>
                    {t.codeOfConduct}
                </h1>
                <div >
                    <div className={`${isRtl && "lg:col-start-2"}`}>
                        {!isRtl && (
                            <p >
                                We want all visitors to our websites to have a safe,
                                interesting and friendly experience. Accordingly, all users of
                                our sites and any contributions they make to the sites must
                                comply with this Code of Conduct. Your use of our websites
                                means that you accept and agree to abide by this Code of
                                Conduct, which supplements and forms part of the Website Terms
                                (which you can access by clicking on the link at the bottom of
                                our websites). We may need to revise the Code of Conduct from
                                time to time by amending this page. Please review this page
                                regularly to ensure you are aware of any changes we make as
                                they are legally binding on you. If you reasonably believe
                                that any contribution to our websites made by another user
                                contravenes this Code of Conduct and/or any of the Website
                                Terms, please notify us on our email:{" "}
                                <a href="mailto:complaints@carprices.ae" className="text-blue-600 underline">
                                    complaints@carprices.ae
                                </a>
                                . Within this Code of Conduct, "contribution" means any
                                material posted or uploaded to our websites by a member of the
                                public, including without limitation any text, photographs,
                                graphics, video or audio material.
                            </p>
                        )}
                        {isRtl && (
                            <p className="text-lg leading-relaxed text-gray-700 text-right">
                                نريد أن يكون لدى جميع زوار مواقعنا تجربة آمنة ومثيرة وودية.
                                وبناءً على ذلك ، يجب أن يلتزم جميع مستخدمي مواقعنا وأي إسهامات
                                يقدمونها على المواقع بهذا الشيفرة السلوكية. استخدامك لمواقعنا
                                يعني أنك تقبل وتوافق على الامتثال لهذا الشيفرة السلوكية ، التي
                                تكمل وتشكل جزءًا من شروط الموقع (التي يمكنك الوصول إليها
                                بالنقر على الرابط في أسفل مواقعنا). قد نحتاج إلى مراجعة شيفرة
                                السلوك من وقت لآخر من خلال تعديل هذه الصفحة. يرجى مراجعة هذه
                                الصفحة بانتظام لضمان أنك على علم بأي تغييرات نقوم بها لأنها
                                ملزمة قانونيًا عليك. إذا كنت تعتقد بموضوعية أن أي إسهام في
                                مواقعنا قام به مستخدم آخر ينتهك هذه الشيفرة السلوكية و/أو أي
                                من شروط الموقع ، يرجى إعلامنا عبر البريد الإلكتروني:{" "}
                                <a href="mailto:complaints@carprices.ae" className="text-blue-600 underline">
                                    complaints@carprices.ae
                                </a>
                                . في هذه الشيفرة السلوكية ، "الإسهام" يعني أي مواد تم نشرها أو
                                تحميلها على مواقعنا من قبل أحد أفراد الجمهور ، بما في ذلك على
                                سبيل المثال لا الحصر أي نصوص أو صور أو رسوم متحركة أو مواد
                                فيديو أو صوت.
                            </p>
                        )}
                        <h2 className={`text-2xl font-semibold mt-10 mb-4 ${isRtl ? "text-right" : "text-left"}`}>
                            {t.yourContributions}
                        </h2>
                        <ul className={`${isRtl ? "text-right" : "text-left"} space-y-2 text-sm list-disc`}>
                            <li>{t.notInfringeAnyone}</li>
                            <li>{t.notContainUnsuitable}</li>
                            <li>{t.notPromteIllegal}</li>
                            <li>{t.notMisrepresent}</li>
                            <li>{t.notBeAnyLanguage}</li>
                            <li>{t.notAnyFlooding}</li>
                            <li>{t.notDiscloseAnyPersonal}</li>
                        </ul>

                        <h2 className={`text-2xl font-semibold mt-10 mb-4 ${isRtl ? "text-right" : "text-left"}`}>
                            {t.breachOfCode}
                        </h2>
                        <p className={`text-lg leading-relaxed ${isRtl ? "text-right" : "text-left"} `}>
                            {t.soleDecision}
                        </p>

                        <ol className={`${isRtl ? "text-right" : "text-left"} list-decimal space-y-2 mt-4 text-sm`}>
                            <li>{t.issuingWarning}</li>
                            <li>{t.immediateTemporary}</li>
                            <li>{t.legalProceedings}</li>
                            <li>{t.disclosure}</li>
                        </ol>

                        <p className={`text-lg leading-relaxed mt-8 ${isRtl ? "text-right" : "text-left"} text-gray-700`}>
                            {t.weExclude}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
