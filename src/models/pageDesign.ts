import { useState, useCallback } from 'react';

const initData = {
  pageConfig: {},
  widgetconfig: [],
}

export default function usePageDesign() {
  const [pageData, setPageState] = useState(null);

  // 递增
  const initPageData = useCallback((id) => {
    if(!id) {
      setPageState(initData)
    } 
  }, []);

  return {
    pageData,
    initPageData
  }
}