import { Form, Input, Radio } from 'antd';
import React, { useEffect } from 'react';
import { IFormConfigProps } from '../widgetConfig/type'
import { useFormValidation } from '../../hooks/useFormValidation'; // 引入自定义hook

import styles from './pageConfig.less';


const PageConfig: React.FC<IFormConfigProps> = React.memo(function PageConfig({
    config,
    onChange,
    onValidateError
}) {
    const [form] = Form.useForm();

    const { validateForm, handleValuesChange } = useFormValidation({
        form,
        config,
        onChange,
        onValidateError
    });

    // 如果某些特殊情况下需要手动触发验证，可以通过useEffect等方式调用
    // useEffect(() => {
    //   validateForm();
    // }, [someDependency]);

    return (
        <div>
            <Form
                form={form}
                layout="vertical"
                initialValues={config}
                onValuesChange={handleValuesChange}
            >
                <Form.Item
                    label="页面名称"
                    name="pageName"
                    rules={[
                        {
                            required: true,
                            message: '必须填写页面名称'
                        },
                        {
                            validator: (_, value) => {
                                if (value.length > 15) return Promise.reject('最多输入15个字');
                                return Promise.resolve();
                            }
                        }
                    ]}
                    help="最多输入15个字，作为全局唯一名称"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="页面标题"
                    name="sharePageTitle"
                    rules={[
                        {
                            required: true,
                            message: '必须填写页面标题'
                        },
                        {
                            validator: (_, value) => {
                                if (value.length > 15) return Promise.reject('最多输入15个字');
                                return Promise.resolve();
                            }
                        }
                    ]}
                    help="最多输入15个字，作为页面名称和分享标题"
                >
                    <Input />
                </Form.Item>


                <Form.Item
                    label="页面说明"
                    name="sharePageDesc"
                    rules={[
                        {
                            validator: (_, value) => {
                                if (value && value.length > 15) {
                                    return Promise.reject('最多输入15个字');
                                }
                                return Promise.resolve();
                            }
                        }
                    ]}
                    help="最多输入15个字，作为页面备注说明方便识别页面"
                >
                    <Input />
                </Form.Item>
            </Form>
        </div>
    );
});

export default PageConfig;