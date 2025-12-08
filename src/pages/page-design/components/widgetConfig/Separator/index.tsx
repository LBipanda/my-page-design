import React, { useEffect, useState } from 'react';
import { Form, InputNumber, Slider, Input } from 'antd';
import InputSlider from '../components/InputSlider';
import { useFormValidation } from '../../../hooks/useFormValidation'; // 引入自定义hook
import { IConfig } from './type'
import { IFormConfigProps } from '../type'
import { CommonSelectorType } from '../config/commonSelectorMap';

import './index.less';

const initConfigData: IConfig = {
  style: {
    height: 50,
    marginBottom: 0,
  },
  hasError: false,
  errors: null
};

export const SeparatorConfigConstructor = (
  // baseConfig
): IConfig => {
  return {
    // ...baseConfig,
    ...initConfigData,
  };
};

export const SeparatorConfig: React.FC<IFormConfigProps> = React.memo(({
  config,
  onChange,
  onValidateError,
  render,
}) => {
  const [form] = Form.useForm();
  const { handleValuesChange } = useFormValidation({
    form,
    config,
    onChange,
    onValidateError
  });

  useEffect(() => {
  if (config) {
    form.setFieldsValue(config);
  }
}, [config, form]);

  return (
    <div className="wrap">
      <div style={{ fontSize: 16, fontWeight: 500, margin: '16px 0' }}>辅助分隔</div>
      <div style={{ color: '#666', marginBottom: 16 }}>
        组件之间的距离默认为0像素，增大组件间距离可使用空白占位，该组件是透明的，仅占据高度
      </div>

      <Form form={form}
        initialValues={config}
        onValuesChange={handleValuesChange}>
        {render && render([CommonSelectorType.WidgetBaseSelector])}
        <Form.Item label="空白高度" name={['style', 'height']}>
          <InputSlider options={{ max: 200 }} />
        </Form.Item>
      </Form>

    </div>
  );
});