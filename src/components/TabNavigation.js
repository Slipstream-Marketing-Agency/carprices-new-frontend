import { useRouter } from 'next/router';
import React from 'react';
import useTranslate from '../utils/useTranslate';

const TabNavigation = ({ activeTab, onTabChange,tab1,tab2 }) => {
  const router = useRouter();
  const t = useTranslate();
  let isRtl = router.locale === 'ar';

    // to remove url update when tab clicked
    const handleTabChange = (selectedTab) => {
        // Use the Next.js router to update the URL
        router.push(`/?tab=${selectedTab}`, undefined, { shallow: true });
      };


    return (
      <ul className="nav nav-tabs">
       
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === 'tab1' ? 'active' : ''}`}
            onClick={() => onTabChange('tab1')}
          >
           { t.trending}
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === 'tab2' ? 'active' : ''}`}
            onClick={() => onTabChange('tab2')} 
          >
            {t.recent}
          </a>
        </li>
      </ul>
    );
  };
  
  export default TabNavigation;