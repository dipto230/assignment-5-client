"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function DataTable({ columns, data }: any) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((col: string) => (
            <TableHead key={col}>{col}</TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((row: any, i: number) => (
          <TableRow key={i}>
            {columns.map((col: string) => (
              <TableCell key={col}>{row[col]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}