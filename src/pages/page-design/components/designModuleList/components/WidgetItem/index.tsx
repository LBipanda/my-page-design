import React from 'react';
import { useDrag, ConnectDragSource } from 'react-dnd';
import { DragableType } from '@/pages/page-design/type';
import { IWidgetItem } from '../../type'

import styles from './index.less';

const WidgetItem = (props: IWidgetItem) => {
    const { icon, label } = props;
    const [{ isDragging }, drag] = useDrag({
        type: DragableType.small,
        item: {
            ...props
        },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(), // 监听拖拽状态
        }),
    });

    return (
        <div className={styles['content-box']} ref={drag as unknown as React.Ref<HTMLDivElement>}>
            <div className={styles['content-icon']} style={{ backgroundImage: `url(${icon})` }} />
            <div className={styles['content-label']}>{label}</div>
        </div>
    )
}

export default WidgetItem;