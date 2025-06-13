"use client"
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

// Define status values
type Status = 'pending' | 'confirmed' | 'paid' | 'shipped' | 'delivered';

interface Encomienda {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: Status;
}

export const TableEncomiendas: React.FC = () => {
  const [rowData, setRowData] = useState<Encomienda>({
    id: 1,
    name: 'Damilare Anjorin',
    email: 'damilareanjorin1@gmail.com',
    phone: '+2348106420637',
    status: 'pending',
  });

  const [isOpen, setIsOpen] = useState(false);
  const [tempData, setTempData] = useState<Encomienda>(rowData);

  const statusOptions: { value: Status; label: string }[] = [
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'paid', label: 'Paid' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
  ];

  const statusStyles: Record<Status, string> = {
    pending: 'bg-gray-200 text-gray-800',
    confirmed: 'bg-blue-200 text-blue-800',
    paid: 'bg-green-200 text-green-800',
    shipped: 'bg-yellow-200 text-yellow-800',
    delivered: 'bg-purple-200 text-purple-800',
  };

  const handleTempChange = (field: keyof Encomienda, value: string) => {
    setTempData((prev) => ({
      ...prev,
      [field]: field === 'status' ? (value as Status) : value,
    }));
  };

  const saveChanges = () => {
    setRowData(tempData);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (open) setTempData(rowData);
        setIsOpen(open);
      }}
    >
      <div className="overflow-x-auto bg-white shadow-dashboard rounded-lg">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-blue-500">ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-blue-500">Fullname</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-blue-500">Email</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-blue-500">Phone</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-blue-500">Status</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-6 py-4 text-sm text-gray-800">#{rowData.id}</td>
              <td className="px-6 py-4 text-sm text-blue-900">{rowData.name}</td>
              <td className="px-6 py-4 text-sm text-blue-900">{rowData.email}</td>
              <td className="px-6 py-4 text-sm text-blue-900">{rowData.phone}</td>
              <td className="px-6 py-4">
                <span
                  className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${statusStyles[rowData.status]}`}
                >
                  {rowData.status.charAt(0).toUpperCase() + rowData.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <DialogTrigger asChild>
                  <Button variant="outline">Show Details</Button>
                </DialogTrigger>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Encomienda #{rowData.id}</DialogTitle>
          <DialogDescription>Modify the fields below and save changes.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <div>
            <label className="text-sm font-medium">Name</label>
            <Input
              value={tempData.name}
              onChange={(e) => handleTempChange('name', e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <Input
              type="email"
              value={tempData.email}
              onChange={(e) => handleTempChange('email', e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Phone</label>
            <Input
              value={tempData.phone}
              onChange={(e) => handleTempChange('phone', e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Status</label>
            <Select
              value={tempData.status}
              onValueChange={(value) => handleTempChange('status', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status Options</SelectLabel>
                  {statusOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={saveChanges}>Save</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
