
import React, { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { DragableType } from '@/pages/page-design/type';
import { DeleteOutlined } from '@ant-design/icons';
import { XYCoord, useDrag, useDrop } from 'react-dnd';
import { useModel } from "@umijs/max";
import { nanoId } from '@/utils/nanoid';
import { dndOrderJudge } from '@/utils/dndOrder'

import { IDragable } from '@/pages/page-design/type'
import {
  designModuleSignToConfigMap,
  designModuleSignToPreviewMap,
} from '../../config/widgetSignMap';

import lshmLucencyHead from '@/assets/pageDesign/lucencyHead@2x.png';
import dropDraftBackground from "@/assets/pageDesign/dropDraftBackground.png";
import classnames from "classnames";

import styles from "./index.less";

/** 获取一个预览模块的元素ID，在预览面板中会有一个专门的div渲染这种id */
export const genPreviewModuleElementID = (module: any): string => {
  /* 添加前缀是为了阻止key被意外滥用后造成页面id重复 */
  /* 这里需要用key而不是id，因为插入新的模块时id为空 */
  return `page-design-m-${module.key}`;
};

interface Props {
  className?: string;
}

const DraftModule: React.FC = React.memo(function DraftModule() {
  return (
    <div
      style={{
        position: 'relative',
        fontSize: 0,
      }}
    >
      <div
        style={{
          color: '#0052d9',
          fontSize: '12px',
          lineHeight: '16px',
          position: 'absolute',
          top: '50%',
          width: '100%',
          marginTop: '-8px',
          textAlign: 'center',
        }}
      >
        组件放置区域
      </div>
      <img style={{ width: '100%' }} src={dropDraftBackground} alt="" />
    </div>
  );
});

/** 整个预览面板 */
export const DesignCenterPreview: React.FC<Props> = React.memo(
  function DesignCenterPreview({ className }) {
    const dropNode = useRef<HTMLDivElement>(null);
    const { pageData, hoverWidget, dropWidget, clickWidget, removeWidget } = useModel("pageDesign");

    useEffect(() => {
      console.log('useEffect:pageData------', pageData)
    }, [pageData])

    // const onCustomDrop = (val, ...rest) => {
  //   console.log('onCustomDrop-------', val, ...rest)
  // }

  const [, drop] = useDrop<IDragable>({
    accept: [DragableType.small, DragableType.big],
    drop(item) {
      if (item.draft === true) {
        // console.log('useDrop:drop item------', item)
        dropWidget();
        item.type = DragableType.small;
        item.draft = false;
        item.index = -1;
      }
    },
    hover(item, monitor) {
      const clientOffset = monitor.getClientOffset();
      const node = dropNode.current;
      // if (clientOffset && node) {
      //   const nodeRect = node.getBoundingClientRect();

      //   // 上下滚动的阈值可以慢慢调整
      //   if (
      //     clientOffset.y - nodeRect.top > nodeRect.height * 0.6 &&
      //     node.scrollTop <= node.scrollHeight
      //   ) {
      //     node.scrollTop += 1;
      //   } else if (clientOffset.y - nodeRect.top < nodeRect.height * 0.3 && node.scrollTop > 0) {
      //     node.scrollTop -= 1;
      //   }
      // }

      if (item.type === DragableType.big) {
        return;
      }

      hoverWidget({
        key: nanoId(),
        ...item,
        draft: true,
      })
      // console.log('useDrop:hover item------', item, node)
      item.type = DragableType.big;
      // 插入到最后
      item.index = pageData?.widgetList.length;

      /** 标记是草稿 */
      item.draft = true;
    },
  });

  useEffect(() => {
    drop(dropNode);
  }, [drop]);

    return (
      <div
        ref={dropNode}
        className={classnames(className, styles.wrap)}
      >
        <div className={styles["preview-wrap"]}>
          <div
            className={classnames(styles["preview-phone-head-wrap"])}
            style={{
              position: "absolute",
              zIndex: 999,
              width: "100%",
              pointerEvents: "none",
              height: "80px",
            }}
          >
            <img
              className={styles["preview-phone-head"]}
              style={{ position: "absolute", zIndex: 2, left: 0, bottom: 0 }}
              src={lshmLucencyHead}
            />
          </div>
          <div style={{
            height: 81,
            opacity: 0
          }}></div>
          
          {pageData?.widgetList.map((item, index) => (
            <ModuleWrap
              key={`${item.key}-${index}`}
              onClickItem={() => { clickWidget(index); }}
              onRemoveItem={() => { removeWidget(index); }}
              // onOrderItem={reOrderHandle}
              data={{ ...item }}
              isActive={pageData.currentWidgetIndex === index}
              dataIndex={index}
            />
          ))}

          {/** iphone大小指示器 */}
          <div className={styles["phone-indicator"]}>
            <div className={styles["phone-indicator-label"]}>
              iPhone15手机高度
            </div>
            <div className={styles["phone-indicator-line"]} />
          </div>
        </div>
        <div style={{ height: "30px" }} />
      </div>
    );
  }
);


/** 单个预览组件 */
const ModuleWrap: React.FC<any> = React.memo(
  ({ onClickItem, data, dataIndex, onOrderItem, onRemoveItem, isActive }) => {

    /** 点击预览组件 */
    const clickHandle = useCallback(
      (evt: React.MouseEvent) => {
        evt.stopPropagation();
        onClickItem(dataIndex);
      },
      [dataIndex, onClickItem],
    );

    // 点击删除组件
    const removeHandle = useCallback(() => {
      onRemoveItem(dataIndex);
    }, [dataIndex, onRemoveItem]);

    /** data sign 对应的 id */
    const Component: React.FC<any> = useMemo(() => {
      // console.log('ModuleWrap:Component data--------', data)
      const { sign } = data;
      if (data.draft) {
        return DraftModule;
      }
      // console.log('ModuleWrap:Component moduleSign--------', sign, designModuleSignToPreviewMap.get(sign))
      return (
        designModuleSignToPreviewMap.get(sign) ||
        (() => <>{`错误：未知组件类型 ${sign}`}</>)
      );
    }, [data]);
    
    /** 可拖拽div dom node */
    const ref = useRef<HTMLDivElement>(null);

    /** 组件本身可拖拽 */
    const [{ isDragging }, drag] = useDrag<IDragable, void, { isDragging: boolean }>({
      type: DragableType.big,
      item: {
        type: DragableType.big,
        sign: data.sign,
        index: dataIndex,
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    /** 组件本身也可以被“投放”, 用以计算挤压效果（排序） */
    const [, drop] = useDrop<IDragable, void, void>({
      /** 接受左侧小组件以及预览框处的大组件 */
      accept: [DragableType.small, DragableType.big],
    
      /** 有可拖拽目标覆盖时 */
      hover(item, monitor) {
        if (!ref.current) {
          return;
        }
        /** 如果是左侧的小组件 如果是左侧组件栏拖进来的，那就赋值为-1   */
        if (item.type === DragableType.small) {
          item.index = -1;
        }

        /** 自己的Node */
        const hoverNode = ref.current;
        /** 自己的Index */
        const hoverIndex = dataIndex;
        // dndOrderJudge(hoverNode, hoverIndex, item, monitor, (dragIndex, hoverIndex) => {
        //   onOrderItem(dragIndex, hoverIndex, data);
        // });
      },
    });

        /** 拖拽时 实体组件 变为透明 */
    const opacity = useMemo(() => (!data.draft && isDragging ? 0 : 1), [data.draft, isDragging]);

    useEffect(() => {
      drag(drop(ref));
    }, [drag, drop]);

    return (
      <div
        onClick={clickHandle}
        ref={ref}
        style={{ opacity }}
        className={classnames(
          styles['item-wrap'],
          isActive && styles['item-wrap-active'],
          // isFixed && styles['fixed-module'],
        )}
      >
        <div className={styles['item-content']} id={genPreviewModuleElementID(data)}>
          <Component moduleConfig={data} />
        </div>
        <div className={classnames(styles['module-name-tips'])}>
          {designModuleSignToConfigMap.get(data.sign)?.name || '未知module'}
        </div>
        <div className={classnames(styles['delete-aciton'])} onClick={removeHandle}>
          <DeleteOutlined />
        </div>
      </div>
    );
  },
);