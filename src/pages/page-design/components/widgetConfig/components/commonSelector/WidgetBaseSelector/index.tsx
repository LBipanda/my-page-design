import { Button, Form, Input, message } from 'antd';
import copy from 'copy-to-clipboard';
import produce from 'immer';
import React, { useCallback, useEffect, useState } from 'react';
import InputSlider from '../../InputSlider';

// import styles from './index.less';
import classNames from 'classnames';

const CopyableText = ({ value }: any) => {

    const copyUrl = (url: string) => {
        copy(url);
        message.success('复制成功');
    };
    return <>{
        value ?
            <>
                <span>{value}</span>
                <Button
                    onClick={() => copyUrl(value)}
                    htmlType="button"
                    type="link"
                    style={{ marginLeft: '5px' }}
                >
                    复制
                </Button>
            </> : <div>保存后生成ID</div>
    }</>
}

const WidgetBaseSelector: React.FC = React.memo(function WidgetBaseSelector() {
    return (
        <>
            <div style={{ marginTop: '-6px' }} />
            <div >组件基本信息</div>
            <Form.Item label="组件ID" name="widgetId">
                <CopyableText />
            </Form.Item>
            <Form.Item
                label="组件名称"
                name="widgetName"
                rules={[
                    {
                        required: true,
                        message: '标题内容不能为空'
                    },
                    {
                        validator: (_, value) => {
                            if (value && value.length > 10) {
                                return Promise.reject('最大长度为10');
                            }
                            return Promise.resolve();
                        }
                    }
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item 
                label="组件下边距"
                name={['style', 'marginBottom']}
                rules={[
                    {
                        validator: (_, value) => {
                            if (value < 0) {
                                return Promise.reject('高度不能为负');
                            }
                            return Promise.resolve();
                        }
                    }
                ]}
            >
                <InputSlider />
            </Form.Item>
        </>
    );
});

export default WidgetBaseSelector;
