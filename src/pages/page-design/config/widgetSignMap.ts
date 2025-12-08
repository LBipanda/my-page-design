/**
 * 本文件数据定义 控制：
 * 1. 预览区域对 组件sign 的转换定义
 * 2. 编辑区域对 组件sign 的转换定义
 *
 * 不控制：
 * 1. 左侧widge列表 的转换定义（在`src\pages\dashboard\pageDesign\edit\components\designModuleList\index.tsx`中 DraggableBox 组件的 sign 字段进行关联、定义）
 */
import { moduleNameMap } from './widgetNameSignMap';
import { DragableSignModule } from '../type';

// 配置区域组件
import { SeparatorConfigConstructor, SeparatorConfig } from '../components/widgetConfig/Separator';

// 预览区域组件
import { Separator } from '../components/widgetPreview/Separator';


/** 1. 预览组件 */
const previewMap: Map<DragableSignModule, React.FC<any>> = new Map();
previewMap.set(DragableSignModule.SeparatorModule, Separator);


/** 2. 数据编辑组件 */
const  
//  configPanelMap: Map<DragableSignModule,{ component: React.FC<ConfigPanelProps>; name: string }
  configPanelMap: Map<DragableSignModule,{ component: React.FC<any>; name: string }
> = new Map();
configPanelMap.set(DragableSignModule.SeparatorModule, {
  component: SeparatorConfig,
  name: moduleNameMap(DragableSignModule.SeparatorModule),
});

/** 3. 初始数据构造器 */
const configConstructorMap: Map<
  DragableSignModule,
  // (baseConfig: DesignModule.ModuleBaseConfig) => DesignModule.moduleConfig
  any
> = new Map();
configConstructorMap.set(DragableSignModule.SeparatorModule, SeparatorConfigConstructor);

export {
  configPanelMap as designModuleSignToConfigMap,
  previewMap as designModuleSignToPreviewMap,
  configConstructorMap as designModuleSignToConfigConstructorMap,
};
