import React, { FC } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';

import * as XLSX from 'xlsx';

import './index.less';
import { ColumnType } from 'antd/lib/table';

const acceptList =
  '.excel,.xls,.xlsx,.xlsb,.xlsm,.ods,.csv,.dbf,.dif,.sylk,.office,.spreadsheet';

interface ShuExcelToDataProps {
  columns?: ColumnType<string>;
  headRows?: number;
}

const ShuExcelToData: FC<ShuExcelToDataProps> = ({ columns, headRows = 1 }) => {
  const beforeUpload = (file: any, fileList: any[]) => {
    const rABS = true;
    const f = fileList[0];
    const reader = new FileReader();

    reader.onload = function (e: any) {
      let data = e.target.result;

      if (!rABS) data = new Uint8Array(data);

      const workbook = XLSX.read(data, {
        type: rABS ? 'binary' : 'array'
      });
      // 假设我们的数据在第一个标签
      const first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
      // XLSX自带了一个工具把导入的数据转成json
      const jsonArr = XLSX.utils.sheet_to_json(first_worksheet, {
        header: 1
      });

      console.log(jsonArr, 8888888);
      // 通过自定义的方法处理Json，比如加入state来展示
      // handleImportedJson(jsonArr.slice(1));
    };

    if (rABS) reader.readAsBinaryString(f);
    else reader.readAsArrayBuffer(f);
    return false;
  };

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
