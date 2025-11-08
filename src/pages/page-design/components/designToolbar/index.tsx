import React, { useMemo, useCallback, useState } from 'react';
import { Button } from 'antd';

import styles from './index.less';

interface Props {
  decorationType?: string;
}
const DesignToolbar: React.FunctionComponent<Props> = React.memo(function DesignToolbar(props) {
  const isPointMall = window.location.href.includes('/customer/points/shop/config');

  // 获取当前页面的查询参数
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const mmBrand = urlParams.get('mmBrand');


  const [userTagPopupVisible, setUserTagPopupVisible] = useState(false);
  const [selectKeys, setSelectKeys] = useState<any>([]);


  return (
    <div className={styles['header']}>
      <div className={styles['header-label']}>
        {props.decorationType === 'PointMallHomepage' ? (
          <span>&lt; 返回积分商城</span>
        ) : (
          <span>&lt; 返回页面列表</span>
        )}
      </div>
     <div>更新时间：2025-11-11 10:11:11</div>
      <div className={styles['header-actions']}>

        <Button
          className={styles['header-action']}
          // type="weak"
          // onClick={saveHandle}
          // loading={loading.save}
        >
          存至草稿
        </Button>

        {/* <Button
          className={styles['header-action']}
          type="weak"
          onClick={() => setUserTagPopupVisible(true)}
          loading={loading.save}
        >
          预览
        </Button> */}
        <Button
          className={styles['header-action']}
          type="primary"
          // onClick={publishHandle}
          // loading={loading.save}
        >
         保存
        </Button>
      </div>
    </div>
  );
});
export default DesignToolbar;
