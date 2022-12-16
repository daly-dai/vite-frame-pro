import React, { FC, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';

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
}

const ShuExcelToData: FC<ShuExcelToDataProps> = ({
  columns,
  headRows = 1,
  showTable
}) => {
  const [rABS, setRABs] = useState(true);
  const [excelData, setExcelData] = useState<any>({
    fullData: [],
    header: [],
    tableData: []
  });

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

  useUpdateEffect(() => {
    console.log(excelData);
  }, [excelData.fullData]);

  return (
    <>
      <Upload
        accept={acceptList}
        name="file"
        showUploadList={false}
        beforeUpload={beforeUpload}
      >
        <Button icon={<UploadOutlined />}>上传文件</Button>
      </Upload>
    </>
  );
};

export default ShuExcelToData;
