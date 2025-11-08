import React, { useMemo } from 'react';
import classnames from "classnames";
import { Collapse } from 'antd';
import { BasicWidgetList } from './components/basicWidgetList';
import styles from './index.less';

/**
 * 装修页左侧组件列表
 */
const DesignModuleList: React.FC= React.memo(function DesignModuleList() {


  const items = [
    {
      key: '基础组件',
      label: '基础组件',
      children: <BasicWidgetList />,
    },
    {
      key: '营销组件',
      label: '营销组件',
      children: <p>{'营销组件'}</p>,
    }
  ];

    return (
      <div className={classnames(styles.wrap)}>
        <Collapse items={items} defaultActiveKey={['基础组件']} className={classnames(styles.collapse)} />
      </div>
    );
});
export default DesignModuleList;
