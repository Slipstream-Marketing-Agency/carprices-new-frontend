import MainLayout from '@/src/layout/MainLayout'
import useTranslate from '@/src/utils/useTranslate';
import { useRouter } from 'next/router';
import React from 'react'

export default function privacy() {
    const router = useRouter();
    const t = useTranslate();
    let isRtl = router.locale === 'ar';
    return (
        <MainLayout>

            <div className="container pt-5 mb-100">
                <h1 className={`fw-bolder ${isRtl && 'text-end'}`}>{t.privacyPolicy}</h1>
                <div className="row">
                    <div className="col-lg-12 ">
                        {!isRtl && <div className="update-date mb-30">
                            <div>  <i className="bi bi-caret-right-fill" /> Last Updated  <span> --20 Dec, 2023</span></div>
                        </div>}
                        {isRtl && <div className="update-date mb-30 text-end">
                            <div>  <i className="bi bi-caret-right-fill" /> آخر تحديث  <span> --20 ديسمبر، 2023</span></div>
                        </div>}

                    </div>
                    <div className="col-lg-12 mb-4">
                        <div >
                            <p className={`paragraph mt-3 ${isRtl && 'text-end'}`}>
                                {t.privacySubPara}
                            </p>
                            <h4 className={`mt-5 ${isRtl && 'text-end'}`}>{t.privacyPoint1}</h4>
                            <p className={`paragraph ${isRtl && 'text-end'}`}>
                                {t.privacyPoint1Sub}
                            </p>
                            <br />
                            <h4 className={`${isRtl && 'text-end'}`}>{t.privacyPoint2}</h4>
                            <p className={`paragraph ${isRtl && 'text-end'}`}>{t.privacyPoint2Sub}</p>
                        </div>
                    </div>
                    <div className={`mb-4 `}>
                        <h4 className={`${isRtl && 'text-end'}`}>{t.privacyPersonalInformationHeading}</h4>
                        <p className={`paragraph ${isRtl && 'text-end'}`}>{t.privacyPersonalInformationSub}</p>
                    </div>
                    <div className='mb-4'>
                        <h4 className={`${isRtl && 'text-end'}`}>{t.privacyInformationCollectedHeading}</h4>
                        <p className='paragraph'>{t.privacyInformationCollectedSub1}
                            <br />
                            {t.privacyInformationCollectedSub2}
                            <br />
                            {t.privacyInformationCollectedSub3}
                            <br />
                            {t.privacyInformationCollectedSub4}
                            <br />
                            {t.privacyInformationCollectedSub5}
                            <br /></p>
                    </div>

                    <div>



                        <h4 className={`mb-4 ${isRtl && 'text-end'}`}>{t.privacyPoint3}</h4>

                        <p className={`paragraph ${isRtl && 'text-end'}`}>
                            {t.privacyPoint3Sub}
                        </p>
                        <ul className={`${isRtl && 'text-end'} `}>
                            <li className={`${isRtl && 'text-left'} `}>
                              {t.privacyPoint3SubP1}
                            </li>
                            <li className={`${isRtl && 'text-left'} `}>{t.privacyPoint3SubP2}</li>
                            <li className={`${isRtl && 'text-left'} `}>{t.privacyPoint3SubP3}</li>
                            <li className={`${isRtl && 'text-left'} `}>
                                {t.privacyPoint3SubP4}
                            </li>
                            <li className={`${isRtl && 'text-left'} `}>{t.privacyPoint3SubP5}</li>
                            <li className={`${isRtl && 'text-left'} `}>{t.privacyPoint3SubP6}</li>
                            <li className={`${isRtl && 'text-left'} `}>{t.privacyPoint3SubP7}</li>
                            <li className={`${isRtl && 'text-left'} `}>
                                {t.privacyPoint3SubP8}
                            </li>
                            <li>
                               {t.privacyPoint3SubP9}
                            </li>
                            <li className={`${isRtl && 'text-left'} `}>
                              {t.privacyPoint3SubP10}
                            </li >
                            <li className={`${isRtl && 'text-left'} `}>{t.privacyPoint3SubP11}</li>
                            <li className={`${isRtl && 'text-left'} `}>
                                {t.privacyPoint3SubP12}
                                </li>
                            <li className={`${isRtl && 'text-left'} `}>{t.privacyPoint3SubP13}</li>
                        </ul>
                        <p className='paragraph'>
                            {t.privacyWhereCarPricesPara}</p>

                    </div>

                 { !isRtl &&  <div className='mt-4' style={{ overflowX: "auto" }}>
                        <table className='table table-striped'>
                            <thead>
                                <tr>
                                    <td>
                                        <strong>Purpose/Activity</strong>
                                    </td>
                                    <td>
                                        <strong>Type of data</strong>
                                    </td>
                                    <td>
                                        <strong>
                                            Lawful basis for processing including basis of
                                            legitimate&nbsp;interest
                                        </strong>
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>To register you as a new customer</td>
                                    <td>(a)&nbsp;Identity (b)&nbsp;Contact</td>
                                    <td>Performance of a contract with you</td>
                                </tr>
                                <tr>
                                    <td>
                                        To manage our relationship with you which will&nbsp;include: (a)
                                        Notifying you about changes to our terms or privacy&nbsp;policy (b)
                                        Asking you to leave a review or take a&nbsp;survey
                                    </td>
                                    <td>
                                        (a)&nbsp;Identity (b)&nbsp;Contact (c)&nbsp;Profile (d) Marketing
                                        and&nbsp;Communications
                                    </td>
                                    <td>
                                        (a) Performance of a contract with&nbsp;you (b) Necessary to comply
                                        with a legal&nbsp;obligation (c) Necessary for our legitimate
                                        interests (to keep our records updated and to study how customers
                                        use our&nbsp;products/services)
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        To enable you to partake in a prize draw, competition or complete a
                                        survey
                                    </td>
                                    <td>
                                        (a)&nbsp;Identity (b)&nbsp;Contact (c)&nbsp;Profile (d)&nbsp;Usage
                                        (e) Marketing and&nbsp;Communications
                                    </td>
                                    <td>
                                        (a) Performance of a contract with&nbsp;you (b) Necessary for our
                                        legitimate interests (to study how customers use our
                                        products/services, to develop them and grow our&nbsp;business)
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        To administer and protect our business and this website (including
                                        troubleshooting, data analysis, testing, system maintenance,
                                        support, reporting and hosting of&nbsp;data)
                                    </td>
                                    <td>(a)&nbsp;Identity (b)&nbsp;Contact (c)&nbsp;Technical</td>
                                    <td>
                                        (a) Necessary for our legitimate interests (for running our
                                        business, provision of administration and IT services, network
                                        security, to prevent fraud and in the context of a business
                                        reorganisation or group restructuring&nbsp;exercise) (b) Necessary
                                        to comply with a legal&nbsp;obligation
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        To deliver relevant website content and advertisements to you and
                                        measure or understand the effectiveness of the advertising we serve
                                        to&nbsp;you
                                    </td>
                                    <td>
                                        (a)&nbsp;Identity (b)&nbsp;Contact (c)&nbsp;Profile (d)&nbsp;Usage
                                        (e) Marketing and&nbsp;Communications (f)&nbsp;Technical
                                    </td>
                                    <td>
                                        Necessary for our legitimate interests (to study how customers use
                                        our products/services, to develop them, to grow our business and to
                                        inform our marketing&nbsp;strategy)
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        To use data analytics to improve our website, products/services,
                                        marketing, customer relationships and&nbsp;experiences
                                    </td>
                                    <td>(a)&nbsp;Technical (b)&nbsp;Usage</td>
                                    <td>
                                        Necessary for our legitimate interests (to define types of customers
                                        for our products and services, to keep our website updated and
                                        relevant, to develop our business and to inform our
                                        marketing&nbsp;strategy)
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        To make suggestions and recommendations to you about goods or
                                        services that may be of interest to&nbsp;you
                                    </td>
                                    <td>
                                        (a)&nbsp;Identity (b)&nbsp;Contact (c)&nbsp;Technical (d)&nbsp;Usage
                                        (e)&nbsp;Profile
                                    </td>
                                    <td>
                                        Necessary for our legitimate interests (to develop our
                                        products/services and grow our&nbsp;business)
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>}
                {isRtl && <div className='mt-4' style={{ overflowX: "auto", textAlign: "right" }}>
    <table className='table table-striped'>
        <thead>
            <tr>
                <td>
                    <strong>الغرض/النشاط</strong>
                </td>
                <td>
                    <strong>نوع البيانات</strong>
                </td>
                <td>
                    <strong>
                        الأساس القانوني لمعالجة البيانات بما في ذلك أساس المصلحة الشرعية
                    </strong>
                </td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>تسجيلك كعميل جديد</td>
                <td>(أ)&nbsp;الهوية (ب)&nbsp;الاتصال</td>
                <td>أداء عقد معك</td>
            </tr>

                           <tr>
                                    <td>
                                        إدارة علاقتنا معك والتي ستشمل: (أ) إعلامك بتغييرات في شروطنا أو سياسة
                                        الخصوصية (ب) طلب ترك تقييم أو إجراء استطلاع للرأي
                                    </td>
                                    <td>
                                        (أ)&nbsp;الهوية (ب)&nbsp;الاتصال (ج)&nbsp;الملف الشخصي (د) التسويق
                                        والاتصالات
                                    </td>
                                    <td>
                                        (أ) أداء عقد معك (ب) ضروري للامتثال لالتزام قانوني (ج) ضروري لمصلحتنا
                                        الشرعية (للحفاظ على تحديث سجلاتنا ودراسة كيفية استخدام العملاء
                                        لمنتجاتنا/خدماتنا)
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        تمكينك من المشاركة في سحب الجوائز، المسابقة، أو إكمال استطلاع الرأي
                                    </td>
                                    <td>
                                        (أ)&nbsp;الهوية (ب)&nbsp;الاتصال (ج)&nbsp;الملف الشخصي (د)&nbsp;الاستخدام
                                        (هـ) التسويق والاتصالات
                                    </td>
                                    <td>
                                        (أ) أداء عقد معك (ب) ضروري لمصلحتنا الشرعية (لدراسة كيفية استخدام
                                        العملاء لمنتجاتنا/خدماتنا، وتطويرها، ونمو أعمالنا)
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        إدارة وحماية أعمالنا وهذا الموقع (بما في ذلك استكشاف الأخطاء،
                                        تحليل البيانات، اختبار الأنظمة، الصيانة، الدعم، التقارير واستضافة
                                        البيانات)
                                    </td>
                                    <td>(أ)&nbsp;الهوية (ب)&nbsp;الاتصال (ج)&nbsp;تقنية</td>
                                    <td>
                                        (أ) ضروري لمصلحتنا الشرعية (لتشغيل أعمالنا، وتقديم خدمات
                                        الإدارة وتكنولوجيا المعلومات، وأمان الشبكة، والوقاية من الاحتيال، وفي
                                        سياق إعادة تنظيم الأعمال أو تغيير هيكل المجموعة) (ب) ضروري للامتثال
                                        لالتزام قانوني
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        تقديم محتوى وإعلانات موقع الويب ذات الصلة لك وقياس أو فهم فعالية
                                        الإعلانات التي نقدمها لك
                                    </td>
                                    <td>
                                        (أ)&nbsp;الهوية (ب)&nbsp;الاتصال (ج)&nbsp;الملف الشخصي (د)&nbsp;الاستخدام
                                        (هـ) التسويق والاتصالات (ف)&nbsp;تقنية
                                    </td>
                                    <td>
                                        ضروري لمصلحتنا الشرعية (لدراسة كيفية استخدام العملاء لمنتجاتنا/خدماتنا،
                                        وتطويرها، ونمو أعمالنا وإعلام استراتيجية التسويق الخاصة بنا)
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        استخدام تحليلات البيانات لتحسين موقعنا الإلكتروني ومنتجاتنا/خدماتنا، والتسويق،
                                        وعلاقات العملاء والتجارب
                                    </td>
                                    <td>(أ)&nbsp;تقنية (ب)&nbsp;الاستخدام</td>
                                    <td>
                                        ضروري لمصلحتنا الشرعية (لتحديد أنواع العملاء لمنتجاتنا وخدماتنا، والحفاظ
                                        على تحديث موقعنا الإلكتروني وجعله ذا صلة، وتطوير أعمالنا وإعلام
                                        استراتيجية التسويق الخاصة بنا)
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        تقديم اقتراحات وتوصيات لك بشأن السلع أو الخدمات التي قد تكون مهتمًا بها
                                    </td>
                                    <td>
                                        (أ)&nbsp;الهوية (ب)&nbsp;الاتصال (ج)&nbsp;تقنية (د)&nbsp;الاستخدام (هـ)&nbsp;الملف
                                        الشخصي
                                    </td>
                                    <td>
                                        ضروري لمصلحتنا الشرعية (لتطوير منتجاتنا/خدماتنا ونمو أعمالنا)
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>}



                    <div>

<h4 className={`mt-5 mb-4 ${isRtl && 'text-end'}`}>{t.privacySharingNDisclosingHeading}</h4>

<h5 className={isRtl && 'text-end'}>{t.privacySharingNDisclosingSub1}</h5>
<p className={`paragraph ${isRtl && 'text-end'}`}>
    {t.privacySharingNDisclosingSub2}
</p>
<br />

<h5 className={isRtl && 'text-end'}>
    {t.privacySharingNDisclosingSub3}
</h5>
<p className={`paragraph ${isRtl && 'text-end'}`}>
    {t.privacySharingNDisclosingSub32}
</p>
<br />
<h5 className={isRtl && 'text-end'}>
    {t.privacySharingNDisclosingSub004}
</h5>
<p className={`paragraph ${isRtl && 'text-end'}`}>
    {t.privacySharingNDisclosingSub4}
</p>
<br />
<h5 className={isRtl && 'text-end'}>
    {t.privacySharingNDisclosingSub5}
</h5>
<p className={`paragraph ${isRtl && 'text-end'}`}>
    {t.privacySharingNDisclosingSub6}
</p>
<br />

<h4 className={isRtl && 'text-end'}>{t.privacyPoint5WhereStore}</h4>
<p className={`paragraph ${isRtl && 'text-end'}`}>
    {t.privacyPoint5WhereStoreSub}
</p>
<br />

<h4 className={isRtl && 'text-end'}>{t.privacyPoint6LongkeepInform}</h4>
<p className={`paragraph ${isRtl && 'text-end'}`}>
    {t.privacyPoint6LongkeepInformSub}
</p>
<br />

<h4 className={isRtl && 'text-end'}>{t.privacyPoint7ChildrenUsing}</h4>
<p className={`paragraph ${isRtl && 'text-end'}`}>
    {t.privacyPoint7ChildrenUsingSub}
</p>
<p className={`paragraph ${isRtl && 'text-end'}`}>
    {t.privacyIfThereParents}
</p>
<a href="mailto:info@carprices.ae" className={isRtl && 'text-end'}>info@carprices.ae</a>{t.privacyInfoCarPrice}<br />
<br />

<h4 className={isRtl && 'text-end'}>{t.privacyPoint8Secure}</h4>
<p className={`paragraph ${isRtl && 'text-end'}`}>
    {t.privacyPoint8SecureSub}
</p>
<br />
</div>

<div>

<h4 className={isRtl && 'text-end'}>{t.privacyPoint9privacyChoiceHeading}</h4>
<p className={`paragraph ${isRtl && 'text-end'}`}>
    {t.privacyPoint9privacyChoiceSub}
</p>
<br />

<h5 className={isRtl && 'text-end'}>{t.privacyCommunication}</h5>
<p className={`paragraph ${isRtl && 'text-end'}`}>
    {t.privacyWishStop}
</p>
<br />

<div className='mt-5'>
    <h4 className={isRtl && 'text-end'}>{t.privacyChangesToPolicy}</h4>
    <p className={`paragraph ${isRtl && 'text-end'}`}>
        {t.privacyChangesToPolicySub}
    </p>
</div>
<br />

<h4 className={isRtl && 'text-end'}>{t.privacyContact}</h4>
<p className={`paragraph ${isRtl && 'text-end'}`}>
    {t.privacyContactSub1}
</p>
<p className={`paragraph ${isRtl && 'text-end'}`}>
    {t.privacyContactSub2}
</p>
<div className={`${isRtl && 'text-end'}`}>
    <strong className={isRtl && 'text-end'}>{t.privacyEmail}&nbsp;</strong>
    <strong className={isRtl && 'text-end'}>
        <a href="mailto:info@carprices.ae">info@carprices.ae</a>
    </strong>
</div>
</div>
</div>
            </div>

        </MainLayout>
    )
}
