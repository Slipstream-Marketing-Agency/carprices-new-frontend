import MainLayout from "@/src/layout/MainLayout";
import { fetchMetaData } from "@/src/lib/fetchMetaData";
import useTranslate from "@/src/utils/useTranslate";
import { useRouter } from "next/router";
import React from "react";



export default function codeOfConduct({metaData}) {
  const router = useRouter();
  const t = useTranslate();
  let isRtl = router.locale === "ar";
  return (
    <MainLayout
      pageMeta={{
        title: metaData?.title ? metaData.title : "Code of Conduct - Carprices.ae",
        description: metaData?.description ? metaData.description :
          "We adhere to a strict code of conduct to ensure a positive and respectful experience for all users. Read our code of conduct to understand the guidelines and expectations we have in place.",
        type: "Car Review Website",
      }}
    >
      <div className="pt-5 mb-100">
        <div className="container">
          <h1 className={`fw-bolder ${isRtl && "text-end"}`}>
            {t.codeOfConduct}
          </h1>
          <div className="row">
            <div className="mt-4">
              {!isRtl && (
                <p className="paragraph">
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
                  <a href="mailto:complaints@carprices.ae">
                    complaints@carprices.ae
                  </a>
                  . Within this Code of Conduct, "contribution" means any
                  material posted or uploaded to our websites by a member of the
                  public, including without limitation any text, photographs,
                  graphics, video or audio material.
                </p>
              )}
              {isRtl && (
                <p className="paragraph text-end">
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
                  <a href="mailto:complaints@carprices.ae">
                    complaints@carprices.ae
                  </a>
                  . في هذه الشيفرة السلوكية ، "الإسهام" يعني أي مواد تم نشرها أو
                  تحميلها على مواقعنا من قبل أحد أفراد الجمهور ، بما في ذلك على
                  سبيل المثال لا الحصر أي نصوص أو صور أو رسوم متحركة أو مواد
                  فيديو أو صوت.
                </p>
              )}
              <h2 className={`mt-5 ${isRtl && "text-end"}`}>
                {t.yourContributions}
              </h2>
              <ul className={isRtl && "text-end list-unstyled"}>
                <li className={isRtl && "text-right"}>{t.notInfringeAnyone}</li>
                <li className={isRtl && "text-right"}>
                  {t.notContainUnsuitable}
                </li>
                <li className={isRtl && "text-right"}>{t.notPromteIllegal}</li>
                <li className={isRtl && "text-right"}>{t.notMisrepresent}</li>
                <li className={isRtl && "text-right"}>{t.notBeAnyLanguage}</li>
                <li className={isRtl && "text-right"}>{t.notAnyFlooding}</li>
                <li className={isRtl && "text-right"}>
                  {t.notDiscloseAnyPersonal}
                </li>
              </ul>

              <h2 className={`mt-5 ${isRtl && "text-end"}`}>
                {t.breachOfCode}
              </h2>
              <p className={`paragraph ${isRtl && "text-end"}`}>
                {t.soleDecision}
              </p>

              <ol className={isRtl && "text-end list-unstyled"}>
                <li className={isRtl && "text-end"}>{t.issuingWarning}</li>
                <li className={isRtl && "text-end"}>{t.immediateTemporary}</li>
                <li className={isRtl && "text-end"}>{t.legalProceedings}</li>
                <li className={isRtl && "text-end"}>{t.disclosure}</li>
              </ol>

              <p className={`paragraph ${isRtl && "text-end"}`}>
                {t.weExclude}
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps(context) {

  // Get the full path and query string from the URL (e.g., 'brands?type=1')
  const { resolvedUrl } = context;

  // Split the URL at the "?" to remove query parameters
  const pathWithQuery = resolvedUrl.split('?')[0];  // Only take the path (e.g., 'brands')

  // Extract the last part of the path
  const path = pathWithQuery.split('/').filter(Boolean).pop();
  const metaData = await fetchMetaData(path)

  return {
    props: {
      metaData,
    }
  }
}
