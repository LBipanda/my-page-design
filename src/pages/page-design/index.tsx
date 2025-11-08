import { PageContainer } from "@ant-design/pro-components";
import { useModel } from "@umijs/max";
import React, { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { DesignCenterPreview } from "./components/designCenterPreview";
import DesignModuleConfig from "./components/designModuleConfig";
import DesignModuleList from "./components/designModuleList";
import DesignToolbar from "./components/designToolbar";

const PageDesign: React.FC = () => {
  const { pageData, initPageData } = useModel("pageDesign");

  console.log('--------------', pageData)
  useEffect(() => {
    initPageData(null)
  }, [])
  return (
    <PageContainer>
      {/* 头部工具栏：保存、预览、发布... */}
      <DesignToolbar />
      <DndProvider backend={HTML5Backend}>
        <div style={{ display: "flex" }}>
          <DesignModuleList />
          <DesignCenterPreview />
          <DesignModuleConfig />
        </div>
      </DndProvider>
    </PageContainer>
  );
};

export default PageDesign;
