import { render } from '@testing-library/react';
export interface IBaseWidgetConfig {
    hasError: boolean;
    errors?: any;
}

// 定义 Props 类型
export interface IFormConfigProps {
    config: any;
    onChange: (values: any) => void;
    onValidateError: (hasError: boolean, values: any) => void;
    render?: (props: any) => React.ReactNode; // 渲染函数
}