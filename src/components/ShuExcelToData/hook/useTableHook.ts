import {
  UseTableHook,
  excelDataType
} from '@/components/ShuExcelToData/type/ShuExcelToData';
import { uuid } from '@/utils/tool';
import { useUpdateEffect } from 'ahooks';
import produce from 'immer';
import { findIndex, remove } from 'lodash-es';
import React, { useState } from 'react';

const useTableHook = ({
  headRows,
  columns,
  optionColumn,
  showPopover,
  showDrawer
}: UseTableHook) => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);

  const [excelData, setExcelData] = useState<excelDataType>({
    fullData: [],
    tableColumns: [],
    tableData: []
  });

  // 设置表头相关数据
  const setColumns = () => {
    let localColumns: any = [];

    if (columns) {
      localColumns = columns;
    }

    if (!columns) {
      localColumns = ((excelData.fullData[0] as any) || []).map(
        (item: string, index: number) => {
          return {
            title: item,
            dataIndex: 'title' + index
          };
        }
      );
    }

    localColumns.push(optionColumn);

    setExcelData(
      produce((draft: any) => {
        draft.tableColumns = localColumns;
      })
    );
  };

  // 设置表格相关数据
  const setAutoTable = () => {
    const columns = excelData.tableColumns;

    const tableData = (excelData.fullData.slice(headRows) || []).map(
      (rowItem: any) => {
        const rowData: any = {};

        rowData['id'] = uuid() as string;

        // tableDataKeyMap.set(rowData['id'], index);
        (rowItem || []).forEach((element: string, index: number) => {
          if (!columns[index]) return;

          const key = columns[index].dataIndex;

          rowData[key] = element;
        });

        return rowData;
      }
    );

    console.log(tableData, 'tableData');

    setExcelData(
      produce((draft: excelDataType) => {
        draft.tableData = tableData;
      })
    );
  };

  // 设置表格数据
  const setTableData = (data: any) => {
    setExcelData(
      produce((draft) => {
        draft.tableData = data;
      })
    );
  };

  // 删除表格数据
  const deleteTableData = (key: string | number) => {
    setExcelData(
      produce((draft) => {
        draft.tableData = draft.tableData.filter(
          (item: { id: string | number }) => item.id !== key
        );
      })
    );
  };

  const editTableData = (id: string, data: any) => {
    const tableIndex = findIndex(excelData.tableData, { id });

    if (tableIndex === null || tableIndex === undefined) return;

    setExcelData(
      produce((draft) => {
        draft.tableData[tableIndex] = data;
      })
    );

    setEditableRowKeys(
      produce((draft) => {
        remove(draft, (item: string | number) => item === id);
      })
    );
  };

  useUpdateEffect(() => {
    if (!excelData.fullData?.length) return;

    if (!showPopover && !showDrawer) return;

    setColumns();
  }, [excelData.fullData]);

  useUpdateEffect(() => {
    setAutoTable();
  }, [excelData.tableColumns]);

  return {
    excelData,
    setExcelData,
    setTableData,
    editableKeys,
    setEditableRowKeys,
    deleteTableData,
    editTableData
  };
};

export default useTableHook;
