import { DragableSignModule } from '../../../type';
import { IBaseWidgetConfig } from '../type'

export interface IStyle {
    /** 空白模板 - 高度 */
    height: number;
    marginBottom?: number;
}

// export interface IConfig
//     extends DesignBasicConfig.ModuleBaseConfig,
//     DesignBasicConfig.ConfigWithValidation {
export interface IConfig extends IBaseWidgetConfig {
    style: IStyle;
}

export interface IView {
    moduleSign: DragableSignModule.SeparatorModule;
    moduleConfig: IConfig;
    moduleData: any;
    extModuleData: any;
}
