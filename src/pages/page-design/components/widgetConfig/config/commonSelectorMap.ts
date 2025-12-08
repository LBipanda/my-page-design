import WidgetBaseSelector from '../components/commonSelector/WidgetBaseSelector';
/**
 * 公共选择器类型
 */
export enum CommonSelectorType {
  /** 标题 */
  WidgetBaseSelector,
}
export const CommonSelectorMap: Map<CommonSelectorType, any> = new Map();
CommonSelectorMap.set(CommonSelectorType.WidgetBaseSelector, WidgetBaseSelector);
