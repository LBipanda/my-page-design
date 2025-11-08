import dropDraftBackground from "@/assets/pageDesign/dropDraftBackground.png";
import classnames from "classnames";
import React, { useRef, useEffect } from "react";
import lshmLucencyHead from '@/assets/pageDesign/lucencyHead@2x.png';
import { dragableType } from '@/pages/page-design/type';
import { XYCoord, useDrag, useDrop } from 'react-dnd';
import { useModel } from "@umijs/max";

import styles from "./index.less";

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
    const { pageData } = useModel("pageDesign");

    // const onCustomDrop = (val, ...rest) => {
  //   console.log('onCustomDrop-------', val, ...rest)
  // }

  const [, drop] = useDrop({
    accept: [dragableType.small, dragableType.big],
    drop(item) {
      if (item.draft === true) {
        console.log('useDrop:drop item------', item)
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
      console.log('useDrop:hover item------', item, node)
      item.type = dragableType.big;
      // 插入到最后
      // item.index = state.moduleConfig.length;
      item.index = pageData.widgetList.length;

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
