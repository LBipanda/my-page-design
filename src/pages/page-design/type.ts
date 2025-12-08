export enum DragableType {
    /** 左侧小部件 */
    small = 'small',
    /** 中间预览真实组件 */
    big = 'big',
}

export interface IDragableMinum {
  sign: string;
  type: DragableType;
}

/** 允许添加别的键值作为props传入drop容器，方便drop容器根据prop做一定的计算 */
export interface IDragable extends IDragableMinum {
  [key: string]: any;
}

export enum DragableSignModule { /** 分隔 */
  SeparatorModule = 'SeparatorModule',
  DemoModule = 'DemoModule',
}