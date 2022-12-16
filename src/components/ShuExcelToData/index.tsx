import React, { FC, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Popover, Upload } from 'antd';

import * as XLSX from 'xlsx';

import './index.less';
import { ColumnType } from 'antd/lib/table';
import { useUpdateEffect } from 'ahooks';
import produce from 'immer';

const acceptList =
  '.excel,.xls,.xlsx,.xlsb,.xlsm,.ods,.csv,.dbf,.dif,.sylk,.office,.spreadsheet';

interface ShuExcelToDataProps {
  columns?: ColumnType<string>;
  headRows?: number;
  showTable: boolean;
  triggerContent: React.ReactNode;
}

interface excelDataType {
  fullData: string[];
  tableColumns: any;
  tableData: any;
}

const ShuExcelToData: FC<ShuExcelToDataProps> = ({
  columns,
  headRows = 1,
  showTable
}) => {
  const [rABS, setRABs] = useState(true);
  const [excelData, setExcelData] = useState<excelDataType>({
    fullData: [],
    tableColumns: [],
    tableData: []
  });
  const [popoverVisible, setPopoverVisible] = useState(false);

  const beforeUpload = (file: any, fileList: any[]) => {
    const f = fileList[0];
    const reader = new FileReader();

    reader.onload = function (e: any) {
      let data = e.target.result;

      if (!rABS) data = new Uint8Array(data);

      const workbook = XLSX.read(data, {
        type: rABS ? 'binary' : 'array'
      });

      // 默认取第一个标签
      const first_worksheet = workbook.Sheets[workbook.SheetNames[0]];

      // 将数据转化为json
      const jsonArr = XLSX.utils.sheet_to_json(first_worksheet, {
        header: headRows
      });

      setExcelData(
        produce((draft: any) => {
          draft.fullData = jsonArr;
        })
      );
    };

    if (rABS) reader.readAsBinaryString(f);
    else reader.readAsArrayBuffer(f);
    return false;
  };

  const setAutoTable = () => {
    const columns = ((excelData.fullData[0] as any) || []).map(
      (item: string, index: number) => {
        return {
          title: item,
          dataIndex: 'title' + index
        };
      }
    );

    const tableData = (excelData.fullData.slice(headRows - 1) || []).map(
      (rowItem: any) => {
        const rowData: any = {};

        (rowItem || []).forEach((element: string, index: number) => {
          if (!columns[index]) return;

          const key = columns[index].dataIndex;

          rowData[key] = element;
        });

        return rowData;
      }
    );

    setExcelData(
      produce((draft: excelDataType) => {
        draft.tableColumns = columns;
        draft.tableData = tableData;
      })
    );
  };

  useUpdateEffect(() => {
    if (!showTable) return;

    if (!columns) {
      setAutoTable();
      return;
    }

    // 目前仅支持一行表头
    if (columns) {
      setExcelData(
        produce((draft: any) => {
          draft.tableColumns = columns;
        })
      );
    }
  }, [excelData.fullData]);

  const handleClickChange = (open: boolean) => {
    setPopoverVisible(open);
  };

  const tablePopover = () => {
    // const;
    return <></>;
  };

  return (
    <div className="excel">
      <Upload
        accept={acceptList}
        name="file"
        showUploadList={false}
        beforeUpload={beforeUpload}
      >
        <Button icon={<UploadOutlined />}>上传文件</Button>
      </Upload>
      <Popover
        content={tablePopover}
        trigger="click"
        open={popoverVisible}
        onOpenChange={handleClickChange}
        overlayClassName="selectIconContent"
        placement="right"
      />
    </div>
  );
};

export default ShuExcelToData;
