import { useState, useCallback } from 'react';
import { designModuleSignToConfigConstructorMap } from '@/pages/page-design/config/widgetSignMap';

interface IWidget {
  key: string;
  type: string;
  [key: string]: any; // 允许其他属性
}

interface IPageData {
  currentWidgetIndex: number;
  pageConfig: any;
  widgetList: IWidget[];
}

const initData: IPageData = {
  currentWidgetIndex: -1,
  pageConfig: {
    pageName: '',
    sharePageTitle: '',
    sharePageDesc: '',
    hasError: false,
    errors: null
  },
  widgetList: [],
}

export default function usePageDesign() {
  const [pageData, setPageState] = useState<IPageData>(initData);

  // 初始化装修页面
  const initPageData = useCallback((id?: string) => {
    if (!id) {
      setPageState(initData)
    }
  }, []);

  // 拖拽控件
  const hoverWidget = useCallback((widget: IWidget) => {
    let tempWidget = {
      ...widget,
    }
    // 组件的数据结构配置构造器
    const constructor = designModuleSignToConfigConstructorMap.get(widget.sign);
    tempWidget.formConfig = constructor();

    setPageState(state => {
      const widgetList = [...state.widgetList, tempWidget]
      return {
        ...state,
        widgetList
      }
    })
  }, [pageData])

  // 放置控件
  const dropWidget = useCallback(() => {
    const tempWidgetList = [...pageData.widgetList]
    let currentWidgetIndex = pageData.currentWidgetIndex;
    tempWidgetList.forEach((item, index) => {
      if (item.draft) {
        item.draft = undefined;
        currentWidgetIndex = index;
      }
    })
    setPageState(state => {
      return {
        ...state,
        widgetList: tempWidgetList,
        currentWidgetIndex
      }
    })
  }, [pageData])

  const clickWidget = useCallback((index: number) => {
    setPageState(state => {
      return {
        ...state,
        currentWidgetIndex: index
      }
    })
  }, [pageData])

  const removeWidget = useCallback((index: number) => {
    setPageState(state => {
      const widgetList = [...state.widgetList]
      widgetList.splice(index, 1)
      return {
        ...state,
        widgetList,
        currentWidgetIndex: -1
      }
    })
  }, [pageData])


  // 页面配置
  const updatePageConfig = useCallback((config: any) => {
    setPageState(state => {
      return {
        ...state,
        pageConfig: { ...state.pageConfig, ...config }
      }
    })
  }, [pageData])

  // 页面配置错误
  const updatePageConfigError = useCallback((hasError: boolean, errors: any) => {
    setPageState(state => {
      return {
        ...state,
        pageConfig: { ...state.pageConfig, hasError, errors }
      }
    })
  }, [pageData])

  // 组件配置
  const updateWidgetConfig = useCallback((config: any) => {
    setPageState(state => {
      return {
        ...state,
        widgetList: state.widgetList.map((item, index) => {
          if (pageData.currentWidgetIndex === index) {
            return { ...item, formConfig: config }
          }
          return item
        })
      }
    })
  }, [pageData])

  // 组件配置错误
  const updateWidgetConfigError = useCallback((hasError: boolean, errors: any) => {
    setPageState(state => {
      return {
        ...state,
        widgetList: state.widgetList.map((item, index) => {
          if (pageData.currentWidgetIndex === index) {
            return { ...item, formConfig: { ...item.formConfig, hasError, errors }}
          }
          return item
        })
      }
    })
  }, [pageData])
  return {
    pageData,
    initPageData,
    hoverWidget,
    dropWidget,
    clickWidget,
    removeWidget,
    updatePageConfig,
    updatePageConfigError,
    updateWidgetConfig,
    updateWidgetConfigError,
  }
}