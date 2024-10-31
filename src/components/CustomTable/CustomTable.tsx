import cx from "clsx";
import {
  Loader,
  Pagination,
  Table,
  Box,
  LoadingOverlay,
  Flex,
  Text,
} from "@mantine/core";
import React, { ReactNode } from "react";
import classes from "./CustomTable.module.css";
import CustomCheckBox from "../CustomCheckbox";
import EmptyState from "../EmptyState";
import colors from "../config/colors";

export type Column<T> = {
  Header: string;
  accessor: keyof T;
  render?: (data: T[keyof T], row: T) => ReactNode;
};

export type Data = {
  [key: string]: string | number | Date | boolean;
};

export type CustomTableProps<T extends Data> = {
  columns: Column<T>[];
  data: T[];
  loading: boolean;
  total: number;
  currentPage: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setCurrentPage: any;
  itemsPerPage: number;
  selection?: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setSelection?: any;
};

const CustomTable = <T extends Data>({
  columns,
  data,
  loading,
  total,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  selection,
  setSelection,
}: CustomTableProps<T>) => {
  // const [selection, setSelection] = useState<number[]>([])
  // in case we add an input for it, we declare the setState

  // useEffect(() => {
  //   dispatch(
  //     ReqFetchData(endpoint, dataKey, currentPage, itemsPerPage),
  //   )
  // }, [dispatch, endpoint, currentPage, itemsPerPage])
  // this is in case we add an input for the nu,ber of rows to show
  // const handleItemsPerPageChange = (items: number) => {
  //   dispatch(SetOffset(items))
  // }

  const toggleRow = (id: string) =>
    setSelection((current: string[]) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  const toggleAll = () =>
    setSelection((current: string[]) =>
      current.length === data.length ? [] : data.map((_, i) => i)
    ); // i need to fix this because I am not using the item id in the table selection, i use the index

  const renderContent = (column: Column<T>, cellData: T[keyof T], row: T) => {
    if (column.render) {
      return column.render(cellData, row);
    }
    return cellData as React.ReactNode;
  };

  const handlePageChange = (value: number) => {
    console.log("handlePageChange", value);
    setCurrentPage(value);
  };

  // const startIdx = (currentPage - 1) * itemsPerPage
  // const endIdx = startIdx+ itemsPerPage
  // const currentData = data.slice(startIdx, endIdx)

  const rows = data?.map((row) => {
    const selected = selection?.includes(String(row.id));
    return (
      <Table.Tr
        key={String(row.id)}
        className={cx(classes.rowBg, {
          [classes.selectedRow]: selected,
        })}
        // onClick={() => toggleRow(String(row.id))}
      >
        {columns.map((column, idx) => {
          if (idx > 0) {
            return (
              <Table.Td py="sm" key={String(column.accessor)}>
                {/* <Container fluid className="flex items-center"> */}
                <Text className="p100 text-left" c={colors.neutral_N700}>
                  {renderContent(column, row[column.accessor], row)}
                </Text>
                {/* </Container> */}
              </Table.Td>
            );
          }
          return (
            <Table.Td
              key={String(column.accessor)}
              px="lg"
              // className="flex items-center gap-2 self-center"
            >
              <CustomCheckBox
                label={
                  <p className="text-lg	">{String(row[column.accessor])}</p>
                }
                size="md"
                radius="xs"
                fw={400}
                checked={selected}
                onChange={() => toggleRow(String(row.id))}
                classNames={{
                  label: "outline: solid red 1px",
                }}
              />
            </Table.Td>
          );
        })}
      </Table.Tr>
    );
  });

  return (
    <Flex align="flex-end" direction="column" gap="md" w="100%">
      <Box pos="relative" w="100%">
        <LoadingOverlay
          visible={loading}
          loaderProps={{
            children: <Loader />,
          }}
        />
        <Table
          withTableBorder
          borderColor={colors.neutral_N300}
          highlightOnHoverColor={colors.blue_b50}
          withRowBorders={false}
          highlightOnHover
          w="100%"
        >
          <Table.Thead>
            <Table.Tr>
              {columns.map((column, i) => {
                if (i > 0) {
                  return (
                    <Table.Th key={String(column.accessor)}>
                      <Text size="xs" fw={600}>
                        {column.Header.toUpperCase()}
                      </Text>
                    </Table.Th>
                  );
                }
                return (
                  <Table.Th
                    key={String(column.accessor)}
                    p="lg"
                    className="header"
                  >
                    <CustomCheckBox
                      onChange={toggleAll}
                      size="xs"
                      radius="xs"
                      fw={600}
                      label={column.Header.toUpperCase()}
                      checked={selection?.length === data?.length}
                      indeterminate={
                        selection &&
                        selection?.length > 0 &&
                        selection?.length !== data.length
                      }
                    />
                  </Table.Th>
                );
              })}
            </Table.Tr>
          </Table.Thead>

          {data?.length > 0 ? (
            <Table.Tbody>{rows}</Table.Tbody>
          ) : (
            <EmptyState state="No data found" />
          )}
        </Table>
      </Box>
      <Pagination
        color="#EBF6FF"
        autoContrast
        total={Math.ceil(total / itemsPerPage)}
        value={currentPage}
        onChange={(value) => handlePageChange(value)}
        mt="sm"
      />
      {/* <Select
        // onChange={handleItemsPerPageChange}
        mt='sm'
    /> */}
    </Flex>
  );
};

export default CustomTable;
