import React from 'react';
import classnames from 'classnames';
import { useDrag, ConnectDragSource  } from 'react-dnd';
import { dragableType } from '@/pages/page-design/type';
import xx from '@/assets/pageDesign/moduleIcon/imageAds.svg';

import styles from './index.less';

export const BasicWidgetList: React.FC = React.memo(function WidgetList() {
  const [{ isDragging }, drag] = useDrag({
    type: dragableType.small,
    item: { 
      id: 'unique-id', // 拖拽时传递的数据
      index: 0, // 如果有列表索引的话
      name: '111' // 其他需要传递的数据
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(), // 监听拖拽状态
    }),
  });

  return (
    <div className={classnames(styles.wrap)}>
      <div className={styles['content-box']} ref={drag as unknown as React.Ref<HTMLDivElement>}>
        <div className={styles['content-icon']} style={{ backgroundImage: `url(${xx})` }} />
        <div className={styles['content-label']}>{'111'}</div>
      </div>
      <div className={styles['content-box']}>
        <div className={styles['content-icon']} style={{ backgroundImage: `url(${xx})` }} />
        <div className={styles['content-label']}>{'22'}</div>
      </div>
      <div className={styles['content-box']}>
        <div className={styles['content-icon']} style={{ backgroundImage: `url(${xx})` }} />
        <div className={styles['content-label']}>{'33'}</div>
      </div>
      <div className={styles['content-box']}>
        <div className={styles['content-icon']} style={{ backgroundImage: `url(${xx})` }} />
        <div className={styles['content-label']}>{'444'}</div>
      </div>
    </div>
  );
});
