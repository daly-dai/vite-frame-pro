import { ColumnType, TableProps } from 'antd/lib/table';

export interface ShuExcelToDataProps {
  columns?: ColumnType<string>;
  headRows?: number;
  showPopover?: boolean;
  showDrawer?: boolean;
  tableProps?: TableProps<any>;
  triggerContent?: React.ReactNode;
  trigger?: React.ReactNode;
}

export interface excelDataType {
  fullData: string[];
  tableColumns: any;
  tableData: any;
}

export interface UseTableHook {
  headRows: number;
  columns: any;
  optionColumn: any;
  showPopover?: boolean;
  showDrawer?: boolean;
}
