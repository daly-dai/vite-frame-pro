import React, { FC, useMemo, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Popover, Upload, Table, Drawer } from 'antd';

import * as XLSX from 'xlsx';

import './index.less';
import { useUpdateEffect } from 'ahooks';
import produce from 'immer';
import { ShuExcelToDataProps } from '../types/ShuExcelToData';
import useTableHook from './hook/useTableHook';
import { EditableProTable } from '@ant-design/pro-components';

const acceptList =
  '.excel,.xls,.xlsx,.xlsb,.xlsm,.ods,.csv,.dbf,.dif,.sylk,.office,.spreadsheet';

const ShuExcelToData: FC<ShuExcelToDataProps> = ({
  columns,
  headRows = 1,
  showPopover = true,
  showDrawer,
  tableProps,
  trigger
}) => {
  const [rABS, setRABs] = useState(true);
  const [popoverVisible, setPopoverVisible] = useState(false);

  const optionColumn: any = {
    title: '操作',
    valueType: 'option',
    width: 200,
    fixed: 'right',
    render: (
      text: any,
      record: { id: string | number },
      _: any,
      action: { startEditable: (arg0: any) => void }
    ) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <a
        key="delete"
        onClick={() => {
          deleteTableData(record.id);
        }}
      >
        删除
      </a>
    ]
  };

  const {
    excelData,
    setExcelData,
    setTableData,
    editableKeys,
    setEditableRowKeys,
    deleteTableData,
    editTableData
  } = useTableHook({
    headRows,
    columns,
    optionColumn,
    showPopover,
    showDrawer
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

  const handleClickChange = (open: boolean) => {
    setPopoverVisible(open);
  };

  const showPopContent = useMemo(() => {
    if (showDrawer) return false;

    return showPopover;
  }, [showDrawer, showPopover]);

  // 展示弹框
  useUpdateEffect(() => {
    setPopoverVisible(true);
  }, [excelData.tableData]);

  const TablePopover = () => {
    return (
      <div className="popoverTable">
        <EditableProTable<any>
          {...tableProps}
          rowKey="id"
          headerTitle="可编辑表格"
          maxLength={5}
          scroll={{ x: 'max-content' }}
          recordCreatorProps={{
            position: 'top',
            record: () => ({ id: (Math.random() * 1000000).toFixed(0) })
          }}
          loading={false}
          columns={excelData.tableColumns}
          value={excelData.tableData}
          onChange={setTableData}
          editable={{
            type: 'multiple',
            editableKeys,
            onSave: async (rowKey, data, row) => {
              if (data === row) return;

              editTableData(rowKey as string, data);
            },
            onChange: setEditableRowKeys
          }}
        />
      </div>
    );
  };

  return (
    <div className="excel">
      <Upload
        accept={acceptList}
        name="file"
        showUploadList={false}
        beforeUpload={beforeUpload}
      >
        {trigger ? (
          trigger
        ) : (
          <Button icon={<UploadOutlined />}>上传文件</Button>
        )}
      </Upload>

      {showDrawer ? (
        <Drawer
          placement="right"
          onClose={() => handleClickChange(false)}
          open={popoverVisible}
          size="large"
        >
          <TablePopover></TablePopover>
        </Drawer>
      ) : (
        ''
      )}

      {showPopContent ? (
        <Popover
          content={TablePopover}
          trigger="click"
          open={popoverVisible}
          onOpenChange={handleClickChange}
          overlayClassName="excelTable"
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default ShuExcelToData;
