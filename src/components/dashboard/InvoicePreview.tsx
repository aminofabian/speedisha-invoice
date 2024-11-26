import React from 'react';
import { Card } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';

interface InvoicePreviewProps {
  invoiceData: {
    invoiceNumber: string;
    date: string;
    dueDate: string;
    billTo: {
      name: string;
      address: string;
      email: string;
    };
    items: Array<{
      id: string;
      [key: string]: any;
    }>;
    notes: string;
  };
  fields: Array<{
    id: string;
    name: string;
    label: string;
    type: string;
    enabled: boolean;
  }>;
}

export function InvoicePreview({ invoiceData, fields }: InvoicePreviewProps) {
  const enabledFields = fields.filter(f => f.enabled);
  const calculateTotal = () => {
    return invoiceData.items.reduce((sum, item) => sum + (item.amount || 0), 0);
  };

  return (
    <Card className="p-8 bg-white shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">INVOICE</h1>
          <div className="mt-2 text-sm text-gray-600">
            <p>Invoice Number: {invoiceData.invoiceNumber || 'Not specified'}</p>
            <p>Date: {new Date(invoiceData.date).toLocaleDateString()}</p>
            {invoiceData.dueDate && (
              <p>Due Date: {new Date(invoiceData.dueDate).toLocaleDateString()}</p>
            )}
          </div>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-gray-900">Your Company Name</div>
          <div className="text-sm text-gray-600 mt-1">
            <p>123 Business Street</p>
            <p>City, State 12345</p>
            <p>contact@yourcompany.com</p>
          </div>
        </div>
      </div>

      {/* Bill To Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Bill To</h2>
        <div className="text-sm text-gray-600">
          <p className="font-medium">{invoiceData.billTo.name || 'Not specified'}</p>
          <p style={{ whiteSpace: 'pre-line' }}>{invoiceData.billTo.address || 'No address provided'}</p>
          <p>{invoiceData.billTo.email || 'No email provided'}</p>
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-8">
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                {enabledFields.map(field => (
                  <th key={field.id} className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                    {field.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {invoiceData.items.map((item, index) => (
                <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  {enabledFields.map(field => (
                    <td key={field.id} className="px-4 py-3 text-sm text-gray-900">
                      {field.type === 'number' ? (
                        field.name === 'amount' ? 
                          formatCurrency(item[field.name] || 0) :
                          Number(item[field.name] || 0).toLocaleString()
                      ) : (
                        item[field.name] || ''
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-8">
        <div className="w-64">
          <div className="flex justify-between py-2">
            <span className="font-medium text-gray-600">Subtotal:</span>
            <span className="text-gray-900">{formatCurrency(calculateTotal())}</span>
          </div>
          <div className="flex justify-between py-2 border-t border-gray-200">
            <span className="font-medium text-gray-600">Total:</span>
            <span className="text-xl font-bold text-gray-900">{formatCurrency(calculateTotal())}</span>
          </div>
        </div>
      </div>

      {/* Notes */}
      {invoiceData.notes && (
        <div className="border-t pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Notes</h2>
          <p className="text-sm text-gray-600" style={{ whiteSpace: 'pre-line' }}>
            {invoiceData.notes}
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="border-t mt-8 pt-8 text-center text-sm text-gray-600">
        <p>Thank you for your business!</p>
        <p className="mt-1">Please make all checks payable to Your Company Name</p>
      </div>
    </Card>
  );
}
