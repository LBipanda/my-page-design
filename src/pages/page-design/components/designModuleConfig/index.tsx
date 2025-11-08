import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import classnames from 'classnames';
import React, { useCallback, useMemo, useState, useEffect } from 'react';
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


  const preventBlurHandle = useCallback((evt: React.MouseEvent) => {
    evt.stopPropagation();
  }, []);

  const items = useMemo(
    () => [
      { children: TabId.Component, key: TabId.Component, label: '组件编辑' },
      { children: TabId.Page, key: TabId.Page, label: '页面设置' },
    ],
    [],
  );
    // setCurrentTabActiveId(editIndex === -1 ? TabId.Page : TabId.Component);

  const changeTabActiveId = (tab: any) => {
    setCurrentTabActiveId(tab.id);
  };



  return (
    <div className={classnames(styles.wrap)}>
      <Tabs defaultActiveKey="page" items={items} onChange={changeTabActiveId} />
    </div>
  );
});

export default DesignModuleConfig;
