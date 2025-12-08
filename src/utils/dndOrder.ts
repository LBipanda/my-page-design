import { DropTargetMonitor, XYCoord } from 'react-dnd';
import produce from 'immer';

/**
 * 计算是否触发拖拽交换逻辑
 *
 *
 * @example
 * ```typescript
 * // 通过props或者别的方式获取当前元素所处index
 * const { index: hoverIndex } = props
 *
 * const ref = useRef<HTMLDivElement>(null);
 *
 * const [, drag] = useDrag({
 *   item: {
 *     type: 'exampleType',
 *     index: hoverIndex,
 *   }
 * });
 *
 * const [, drop] = useDrop({
 *   accept: 'exampleType',
 *   hover(item, monitor) {
 *     if (!ref.current) {
 *       return;
 *     }
 *     const hoverNode = ref.current;
 *
 *     dndSwapDetect(hoverNode, hoverIndex, item, monitor, (dragIndex, hoverIndex) => {
 *       // 这两个index对应的item满足交换判定
 *     });
 *   },
 * });
 *
 * drag(drop(ref));
 * ```
 */
export function dndOrderJudge(
  /** 自己(被hover)的Node */
  hoverNode: HTMLElement,
  /** 自己(被hover)的Index */
  hoverIndex: number,
  /** 被拖动的Index*/
  dragItem: any & { index: number },
  monitor: DropTargetMonitor,
  /** 如果判定符合重排条件 */
  cb: (dragIndex: number, hoverIndex: number) => void,
) {
  /** 被拖动的Index*/
  const dragIndex = dragItem.index;
console.log('dragIndex=======', dragIndex);
  if (hoverIndex === undefined && dragIndex === undefined) {
    throw new Error('drag容器初始化必须插入index，注意example中useDrag参数示例');
  }

  // 在自己头上hover时不需要任何效果
  if (dragIndex === hoverIndex) {
    return;
  }

  // 获取相对屏幕的位置
  const hoverBoundingRect = hoverNode.getBoundingClientRect();

  // 计算自己的中心
  const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

  // Determine mouse position
  const clientOffset = monitor.getClientOffset() as XYCoord;

  // Get pixels to the top
  const hoverClientY = clientOffset.y - hoverBoundingRect.top;

  // Only perform the move when the mouse has crossed half of the items height
  // When dragging downwards, only move when the cursor is below 50%
  // When dragging upwards, only move when the cursor is above 50%

  // Dragging downwards
  // 这里相对官网有一个修改：小于 缩小为 等于 少 1
  // 因为有可能是新插入到顶部的
  // 大于判定 部分同理
  if (dragIndex === hoverIndex - 1 && hoverClientY < hoverMiddleY) {
    return;
  }

  // Dragging upwards
  if (dragIndex === hoverIndex + 1 && hoverClientY > hoverMiddleY) {
    return;
  }

  // Time to actually perform the action
  cb(dragIndex, hoverIndex);

  // Note: we're mutating the monitor item here!
  // Generally it's better to avoid mutations,
  // but it's good here for the sake of performance
  // to avoid expensive index searches.
  dragItem.index = hoverIndex;
}

/** 实现拖拽交换算法 */
export function dndOrder<T extends any = any>(
  source: T[],
  dragIndex: number,
  hoverIndex: number,
): T[] {
  return produce(source, (draft) => {
    /**
     * @todo 评估是否需要修正算法
     *
     * 目前能想到的算法有两种，一种是下边的切割，另一种是循环
     * 切割的复杂度是常数`O(5)`, 但看起来很挫而且很多中间变量(GC)
     * 循环的复杂度是`O(n)`, 但构想中写出来应该会有更好的可读性, 中间变量也比较少
     */

    const min = Math.min(dragIndex, hoverIndex);
    const max = Math.max(dragIndex, hoverIndex);

    const frontSplice = draft.slice(0, min);
    const minItem = draft[min];
    const middleSplice = draft.slice(min + 1, max);
    const maxItem = draft[max];
    const backSplice = draft.slice(max + 1);
    // 把 后边 的 往前 提
    if (dragIndex > hoverIndex) {
      return [...frontSplice, maxItem, minItem, ...middleSplice, ...backSplice];
    } else {
      return [...frontSplice, ...middleSplice, maxItem, minItem, ...backSplice];
    }
  }) as any;
}
