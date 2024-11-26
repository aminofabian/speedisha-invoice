import React from 'react'
import { cn } from '@/lib/utils'
import { ItemField } from './InvoiceCreator'
import { InvoiceStyle } from './InvoiceStyleSelector'
import Image from 'next/image'
import { formatCurrency } from '@/lib/utils'

interface InvoicePreviewProps {
  invoiceData: {
    invoiceNumber: string
    date: string
    dueDate: string
    billTo: {
      name: string
      address: string
      email: string
    }
    items: Array<{
      id?: string
      [key: string]: any
    }>
    notes: string
    currency: {
      code: string
      symbol: string
    }
    companyName: string
    companyLogo: string | null
    colorScheme: {
      primary: string
      secondary: string
      accent: string
    }
  }
  fields: ItemField[]
  style: InvoiceStyle
}

export function InvoicePreview({ invoiceData, fields, style }: InvoicePreviewProps) {
  const getStyleClasses = () => {
    const baseClasses = 'p-8 bg-white rounded-lg shadow-lg'

    switch (style) {
      case 'basic':
        return cn(baseClasses, 'border')
      case 'styled':
        return cn(baseClasses, 'border-2')
      case 'uber-styled':
        return cn(baseClasses, 'border-0')
      default:
        return baseClasses
    }
  };

  const getHeaderClasses = () => {
    switch (style) {
      case 'basic':
        return 'mb-8'
      case 'styled':
        return 'mb-8 p-4 bg-gray-50 rounded-lg'
      case 'uber-styled':
        return cn('mb-8 p-6 rounded-lg')
      default:
        return 'mb-8'
    }
  };

  const getTableHeaderClasses = () => {
    const baseClasses = 'px-4 py-2 text-left font-medium'

    switch (style) {
      case 'basic':
        return cn(baseClasses, 'bg-gray-100')
      case 'styled':
        return cn(baseClasses, 'bg-gray-50')
      case 'uber-styled':
        return cn(baseClasses)
      default:
        return baseClasses
    }
  };

  const getStyles = () => {
    const { primary, secondary, accent } = invoiceData.colorScheme

    switch (style) {
      case 'basic':
        return {
          container: {},
          border: {},
          header: {},
          title: {},
          tableHeader: {},
          billTo: {},
          total: {},
          notes: {}
        }
      case 'styled':
        return {
          container: {
            borderColor: primary
          },
          border: {},
          header: {
            background: `${secondary}0a`
          },
          title: { color: primary },
          tableHeader: {
            background: `${secondary}15`,
            color: primary
          },
          billTo: {
            background: `${accent}0a`
          },
          total: {
            background: `${secondary}0a`,
            color: primary
          },
          notes: {
            background: `${accent}05`
          }
        }
      case 'uber-styled':
        return {
          container: {
            background: `linear-gradient(to bottom right, ${primary}1a, ${secondary}1a)`
          },
          border: {},
          header: {
            background: `linear-gradient(to right, ${primary}0d, ${secondary}0d)`,
            borderBottom: `2px solid ${accent}30`
          },
          title: { 
            color: primary,
            textShadow: `1px 1px 2px ${secondary}20`
          },
          tableHeader: {
            background: `linear-gradient(to right, ${primary}15, ${secondary}15)`,
            color: primary,
            borderBottom: `2px solid ${accent}30`
          },
          billTo: {
            background: `linear-gradient(to right, ${secondary}0a, ${accent}0a)`,
            borderLeft: `3px solid ${primary}40`
          },
          total: {
            background: `linear-gradient(to right, transparent, ${primary}20, ${secondary}20)`,
            color: primary
          },
          notes: {
            background: `linear-gradient(to right, ${accent}05, ${secondary}05)`,
            borderLeft: `2px solid ${primary}30`
          }
        }
      default:
        return {}
    }
  };

  const styles = getStyles()

  const calculateTotal = () => {
    return invoiceData.items.reduce((sum, item) => sum + (item.amount || 0), 0);
  };

  return (
    <div className={getStyleClasses()} style={styles.container}>
      {/* Header */}
      <div className={getHeaderClasses()} style={styles.header}>
        <div className="flex justify-between items-start">
          <div>
            {invoiceData.companyLogo && (
              <div className="relative w-32 h-32 mb-4">
                <Image
                  src={invoiceData.companyLogo}
                  alt="Company logo"
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <h1 className="text-2xl font-bold" style={styles.title}>
              {invoiceData.companyName || 'Your Company Name'}
            </h1>
            <p className="text-gray-600 mt-1">
              123 Business Street<br />
              City, State 12345<br />
              contact@company.com
            </p>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-semibold mb-2" style={styles.title}>
              INVOICE
            </h2>
            <p className="text-gray-600">
              Invoice #: {invoiceData.invoiceNumber}<br />
              Date: {invoiceData.date}<br />
              Due Date: {invoiceData.dueDate}
            </p>
          </div>
        </div>
      </div>

      {/* Bill To Section */}
      <div className="mb-8 p-4 rounded-lg" style={styles.billTo}>
        <div className="text-sm font-medium" style={style === 'uber-styled' ? { color: invoiceData.colorScheme.primary } : {}}>
          Bill To:
        </div>
        <div className="mt-2">
          <div className="font-semibold">{invoiceData.billTo.name}</div>
          <div className="mt-1 text-gray-600 whitespace-pre-line">
            {invoiceData.billTo.address}
          </div>
          <div className="mt-1 text-gray-600">{invoiceData.billTo.email}</div>
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-8">
        <table className="w-full">
          <thead>
            <tr>
              {fields.map((field) => (
                <th key={field.id} className={getTableHeaderClasses()} style={styles.tableHeader}>
                  {field.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {invoiceData.items.map((item, index) => (
              <tr
                key={item.id || index}
                className={cn(
                  'text-sm hover:bg-gray-50',
                  style === 'uber-styled' && 'transition-colors'
                )}
                style={style === 'uber-styled' ? { 
                  ':hover': {
                    background: `linear-gradient(to right, ${invoiceData.colorScheme.secondary}0a, ${invoiceData.colorScheme.accent}0a)`
                  }
                } as React.CSSProperties : {}}
              >
                {fields.map((field) => (
                  <td key={field.id} className="px-4 py-3">
                    {field.type === 'number'
                      ? formatCurrency(Number(item[field.name]) || 0, invoiceData.currency.code)
                      : item[field.name]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total */}
      <div className="text-right p-4 rounded-lg" style={styles.total}>
        <div className="text-2xl font-bold">
          Total: {formatCurrency(calculateTotal(), invoiceData.currency.code)}
        </div>
      </div>

      {/* Notes */}
      {invoiceData.notes && (
        <div className={cn(
          'mt-8 text-sm text-gray-600',
          'p-4 rounded'
        )} style={styles.notes}>
          <div className="font-medium text-gray-900 mb-1">Notes:</div>
          {invoiceData.notes}
        </div>
      )}
    </div>
  );
}
