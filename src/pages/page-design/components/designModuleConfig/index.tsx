import { Tabs } from 'antd';
import { useModel } from "@umijs/max";
import classnames from 'classnames';
import React, { useCallback, useMemo, useState, useEffect } from 'react';

import PageConfig from './pageConfig'
import { designModuleSignToConfigMap, designModuleSignToPreviewMap } from '../../config/widgetSignMap';
import { CommonSelectorType, CommonSelectorMap } from '../widgetConfig/config/commonSelectorMap';
import styles from './index.less';

const EmptyComponent: React.FC = React.memo(function EmptyComponent() {
  return <>未选择任何组件</>;
});

const ErrorComponent: React.FC<any> = React.memo(function ErrorComponent({ config }) {
  const { moduleSign } = config;
  return (
    <>
      <p>{`未知moduleSign: ${moduleSign}`}</p>
      <span>请先保存当前页面,点击刷新页面后继续编辑</span>
    </>
  );
});
/** tab页id */
enum TabId {
  Component = 'component',
  Page = 'page',
}

const DesignModuleConfig: React.FC = React.memo(function DesignModuleConfig() {
  const [currentTabActiveId, setCurrentTabActiveId] = useState('page');

  const { pageData, updatePageConfigError, updatePageConfig, updateWidgetConfig, updateWidgetConfigError } = useModel("pageDesign");

  const editWidget = useMemo(() => {
    return pageData.currentWidgetIndex === -1
      ? null
      : pageData.widgetList[pageData.currentWidgetIndex]
  }, [pageData])

  // 页面配置
  const handlePageConfigChange = useCallback(
    (config: any) => {
      // console.log('handlePageConfigChange', config);
      updatePageConfig(config);
    },
    [pageData],
  );
  const handlePageConfigError = useCallback(
    (hasError: boolean, errors: any) => {
      // console.log('handlePageConfigError----------', hasError, errors);
      updatePageConfigError(hasError, errors)
    },
    [pageData],
  );

  // 组件配置
  const handleWidgetConfigChange = useCallback(
    (config: any) => {
      // console.log('handleWidgetConfigChange', config);
      updateWidgetConfig(config);
    },
    [pageData],
  );
  const handleWidgetConfigError = useCallback(
    (hasError: boolean, errors: any) => {
      // console.log('handleWidgetConfigError----------', hasError, errors);
      updateWidgetConfigError(hasError, errors)
    },
    [pageData],
  );

  const Component = useMemo(() => {
    const editWidgetConfig = editWidget?.formConfig;
    if (editWidgetConfig) {
      let mappedConfigComponent = designModuleSignToConfigMap.get(editWidget.sign);
      let mappedPreviewComponent = designModuleSignToPreviewMap.get(editWidget.sign);
      if (mappedConfigComponent?.component && mappedPreviewComponent) {
        return mappedConfigComponent?.component;
      }
      return ErrorComponent;
    }
    return EmptyComponent;
  }, [editWidget]);

  const getCommonSelectors = useCallback(
    (selectors: CommonSelectorType[] = []) => {
      const components = selectors
        .map((selector) => CommonSelectorMap.get(selector))
        .filter((i) => i);
      if (!editWidget?.formConfig || !components.length) {
        return null;
      }
      return (
        <>
          {components.map((Selector, index) => (
            <Selector
              key={index}
            />
          ))}
        </>
      );
    },
    [editWidget],
  );

  const items =  [
      {
        children: <Component
          key={pageData.currentWidgetIndex}
          config={editWidget?.formConfig}
          onChange={handleWidgetConfigChange}
          onValidateError={handleWidgetConfigError}
          render={getCommonSelectors}
        ></Component>, key: TabId.Component, label: '组件编辑'
      },
      {
        children: <PageConfig
          config={pageData.pageConfig}
          onChange={handlePageConfigChange}
          onValidateError={handlePageConfigError}
        />, key: TabId.Page, label: '页面设置'
      },
    ];

  useEffect(() => {
    setCurrentTabActiveId(pageData.currentWidgetIndex === -1 ? TabId.Page : TabId.Component);
  }, [pageData.currentWidgetIndex]);

  const changeTabActiveId = (tab: any) => {
    console.log('changeTabActiveId', tab);
    setCurrentTabActiveId(tab.id);
  };

  return (
    <div className={classnames(styles.designModuleConfigWrap)}>
      <Tabs
        defaultActiveKey="page"
        className={styles.tabsWrap}  // 添加类名
        items={items}
        activeKey={currentTabActiveId}
        renderTabBar={(tabBarProps, DefaultTabBar) => (
          <div style={{ display: 'flex', background: '#f0f0f0' }}>
            {items.map(item => (
              <div
                key={item.key}
                style={{
                  flex: 1,
                  padding: '12px',
                  textAlign: 'center',
                  background: tabBarProps.activeKey === item.key ? '#1890ff' : 'transparent',
                  color: tabBarProps.activeKey === item.key ? 'white' : 'inherit',
                  cursor: 'pointer',
                }}
                onClick={(e) => tabBarProps.onTabClick(item.key, e)}
              >
                {item.label}
              </div>
            ))}
          </div>
        )}
        onChange={changeTabActiveId} />
    </div>
  );
});

export default DesignModuleConfig;
