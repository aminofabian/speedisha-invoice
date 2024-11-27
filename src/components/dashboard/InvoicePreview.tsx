import React, { useRef } from 'react'
import { cn } from '@/lib/utils'
import { ItemField } from './InvoiceCreator'
import { InvoiceStyle } from './InvoiceStyleSelector'
import Image from 'next/image'
import { formatCurrency } from '@/lib/utils'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import { Document, Packer, Paragraph, Table, TableCell, TableRow, TextRun, HeadingLevel, AlignmentType } from 'docx'
import { Button } from '@/components/ui/button'
import { Download, FileType } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface InvoiceItem {
  id: string;
  description?: string;
  quantity?: number;
  price?: number;
  amount?: number;
  [key: string]: string | number | undefined;
}

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
    items: InvoiceItem[];
    notes: string;
    tax: number;
    currency: {
      code: string;
      symbol: string;
    };
    companyName: string;
    companyLogo: string | null;
    colorScheme: {
      primary: string;
      secondary: string;
      accent: string;
    };
  };
  fields: ItemField[];
  style: InvoiceStyle;
}

export function InvoicePreview({ invoiceData, fields, style }: InvoicePreviewProps) {
  const invoiceRef = useRef<HTMLDivElement>(null);

  const getStyleClasses = () => {
    // A4 dimensions in pixels at 96 DPI: 794 x 1123
    const baseClasses = 'p-16 bg-white shadow-lg mx-auto w-[21cm] min-h-[29.7cm] flex flex-col'

    switch (style) {
      case 'basic':
      case 'styled':
      case 'uber-styled':
        return cn(baseClasses)
      default:
        return baseClasses
    }
  };

  const getHeaderClasses = () => {
    switch (style) {
      case 'basic':
        return 'mb-20'
      case 'styled':
        return 'mb-20 py-8 bg-gray-50'
      case 'uber-styled':
        return cn('mb-20 py-8')
      default:
        return 'mb-20'
    }
  };

  const getTableHeaderClasses = () => {
    const baseClasses = 'px-8 py-5 text-left font-semibold tracking-wider'

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
          container: {
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          },
          header: {
            borderColor: '#e5e7eb'
          },
          title: {
            color: '#111827'
          },
          tableHeader: {
            borderColor: '#e5e7eb'
          },
          billTo: {
            padding: '1.5rem',
            background: '#f9fafb'
          },
          total: {
            padding: '1.5rem',
            background: '#f9fafb'
          },
          notes: {
            padding: '1.5rem',
            background: '#f9fafb',
            marginTop: '2rem'
          }
        }
      case 'styled':
        return {
          container: {
            borderColor: primary,
            boxShadow: `0 4px 6px -1px ${primary}15, 0 2px 4px -1px ${primary}10`
          },
          header: {
            background: `${secondary}0a`
          },
          title: { 
            color: primary,
            fontWeight: 600
          },
          tableHeader: {
            background: `${secondary}15`,
            color: primary
          },
          billTo: {
            padding: '1.5rem',
            background: `${accent}0a`,
            border: `1px solid ${accent}20`
          },
          total: {
            padding: '1.5rem',
            background: `${secondary}0a`,
            color: primary,
            border: `1px solid ${secondary}20`
          },
          notes: {
            padding: '1.5rem',
            background: `${accent}05`,
            border: `1px solid ${accent}15`,
            marginTop: '2rem'
          }
        }
      case 'uber-styled':
        return {
          container: {
            background: `linear-gradient(145deg, ${primary}05, ${secondary}05)`,
            boxShadow: `0 10px 25px -5px ${primary}15, 0 8px 10px -6px ${secondary}15`
          },
          header: {
            background: `linear-gradient(to right, ${primary}08, ${secondary}08)`,
            borderBottom: `2px solid ${accent}20`
          },
          title: { 
            color: primary,
            fontWeight: 700,
            textShadow: `1px 1px 2px ${secondary}20`
          },
          tableHeader: {
            background: `linear-gradient(to right, ${primary}10, ${secondary}10)`,
            color: primary,
            borderBottom: `2px solid ${accent}20`
          },
          billTo: {
            padding: '1.5rem',
            background: `linear-gradient(145deg, ${secondary}08, ${accent}08)`,
            borderLeft: `3px solid ${primary}30`,
            boxShadow: `0 4px 6px -1px ${secondary}10`
          },
          total: {
            padding: '1.5rem',
            background: `linear-gradient(145deg, ${primary}10, ${secondary}10)`,
            color: primary,
            boxShadow: `0 4px 6px -1px ${primary}10`
          },
          notes: {
            padding: '1.5rem',
            background: `linear-gradient(145deg, ${accent}05, ${secondary}05)`,
            borderLeft: `2px solid ${primary}20`,
            marginTop: '2rem',
            boxShadow: `0 4px 6px -1px ${accent}10`
          }
        }
      default:
        return {}
    }
  };

  const styles = getStyles()

  const calculateSubtotal = () => {
    return invoiceData.items.reduce((sum, item) => {
      const amount = typeof item.amount === 'number' ? item.amount : 0;
      return sum + amount;
    }, 0);
  };

  const calculateTaxAmount = () => {
    const subtotal = calculateSubtotal();
    return (subtotal * (invoiceData.tax || 0)) / 100;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTaxAmount();
  };

  const downloadAsPDF = async () => {
    if (!invoiceRef.current) return;

    // Set specific dimensions for better quality
    const scale = 2; // Increase for better quality
    const a4Width = 2480; // A4 width at 300 DPI
    const a4Height = 3508; // A4 height at 300 DPI

    const canvas = await html2canvas(invoiceRef.current, {
      scale: scale,
      useCORS: true,
      logging: false,
      width: invoiceRef.current.offsetWidth,
      height: invoiceRef.current.offsetHeight,
      windowWidth: invoiceRef.current.offsetWidth,
      windowHeight: invoiceRef.current.offsetHeight,
      x: 0,
      y: 0,
      scrollX: 0,
      scrollY: 0,
      backgroundColor: '#ffffff'
    });

    const imgData = canvas.toDataURL('image/png', 1.0);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Calculate scaling to maintain aspect ratio
    const aspectRatio = canvas.height / canvas.width;
    let imgWidth = pdfWidth;
    let imgHeight = pdfWidth * aspectRatio;

    // If height exceeds page height, scale down based on height
    if (imgHeight > pdfHeight) {
      imgHeight = pdfHeight;
      imgWidth = imgHeight / aspectRatio;
    }

    // Center horizontally
    const xOffset = (pdfWidth - imgWidth) / 2;

    pdf.addImage(imgData, 'PNG', xOffset, 0, imgWidth, imgHeight);

    // Add additional pages if content exceeds one page
    if (imgHeight > pdfHeight) {
      const totalPages = Math.ceil(imgHeight / pdfHeight);
      for (let page = 1; page < totalPages; page++) {
        pdf.addPage();
        pdf.addImage(
          imgData,
          'PNG',
          xOffset,
          -pdfHeight * page,
          imgWidth,
          imgHeight
        );
      }
    }

    pdf.save(`invoice-${invoiceData.invoiceNumber || 'draft'}.pdf`);
  };

  const downloadAsDoc = async () => {
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            text: invoiceData.companyName,
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            text: "INVOICE",
            heading: HeadingLevel.HEADING_2,
            alignment: AlignmentType.RIGHT,
          }),
          new Paragraph({
            children: [
              new TextRun({ text: `Invoice #: ${invoiceData.invoiceNumber}` }),
              new TextRun({ text: `Date: ${invoiceData.date}`, break: 1 }),
              new TextRun({ text: `Due Date: ${invoiceData.dueDate}`, break: 1 }),
            ],
            alignment: AlignmentType.RIGHT,
          }),
          new Paragraph({ text: "Bill To:", spacing: { before: 400 } }),
          new Paragraph({
            children: [
              new TextRun({ text: invoiceData.billTo.name, bold: true }),
              new TextRun({ text: invoiceData.billTo.address, break: 1 }),
              new TextRun({ text: invoiceData.billTo.email, break: 1 }),
            ],
          }),
          new Table({
            rows: [
              new TableRow({
                children: fields.map(field => 
                  new TableCell({ 
                    children: [new Paragraph({ text: field.label, alignment: AlignmentType.LEFT })],
                  })
                ),
              }),
              ...invoiceData.items.map(item => 
                new TableRow({
                  children: fields.map(field => 
                    new TableCell({
                      children: [new Paragraph({ 
                        text: field.type === 'number' 
                          ? formatCurrency(typeof item[field.name] === 'number' ? item[field.name] as number : 0, invoiceData.currency.code)
                          : String(item[field.name] || ''),
                        alignment: field.type === 'number' ? AlignmentType.RIGHT : AlignmentType.LEFT,
                      })],
                    })
                  ),
                })
              ),
            ],
          }),
          new Paragraph({
            text: `Total: ${formatCurrency(calculateTotal(), invoiceData.currency.code)}`,
            alignment: AlignmentType.RIGHT,
            spacing: { before: 400 },
          }),
          ...(invoiceData.notes ? [
            new Paragraph({
              text: "Notes:",
              spacing: { before: 400 },
            }),
            new Paragraph({ text: invoiceData.notes }),
          ] : []),
        ],
      }],
    });

    const blob = await Packer.toBlob(doc);
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `invoice-${invoiceData.invoiceNumber || 'draft'}.docx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const formatText = (text: string) => {
    // Replace line breaks
    let formattedText = text.replace(/\\n/g, '\n');
    
    // Replace bold text (*text*)
    formattedText = formattedText.replace(/\*(.*?)\*/g, '<strong>$1</strong>');
    
    // Replace italic text (_text_)
    formattedText = formattedText.replace(/_(.*?)_/g, '<em>$1</em>');
    
    return formattedText;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={downloadAsPDF}>
              <FileType className="h-4 w-4 mr-2" />
              Download as PDF
            </DropdownMenuItem>
            <DropdownMenuItem onClick={downloadAsDoc}>
              <FileType className="h-4 w-4 mr-2" />
              Download as DOC
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div ref={invoiceRef} className={getStyleClasses()} style={{
        ...styles.container,
        margin: '0 auto',
        padding: '4rem',
        boxSizing: 'border-box',
        minHeight: '29.7cm',
      }}>
        {/* Header Section */}
        <div className="flex-none">
          <div className={getHeaderClasses()} style={{
            ...styles.header,
            marginBottom: '5rem',
          }}>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                {invoiceData.companyLogo ? (
                  <div className="w-64 h-32 relative">
                    <Image
                      src={invoiceData.companyLogo}
                      alt="Company Logo"
                      fill
                      style={{ objectFit: 'contain' }}
                      priority
                    />
                  </div>
                ) : (
                  <h1 className="text-3xl font-bold" style={styles.title}>
                    {invoiceData.companyName}
                  </h1>
                )}
              </div>

              <div className="text-right space-y-8">
                <h2 className="text-4xl font-bold tracking-wide" style={styles.title}>INVOICE</h2>
                <div className="space-y-4 text-lg">
                  <div>
                    <span className="font-medium">Invoice Number: </span>
                    <span className="ml-2">{invoiceData.invoiceNumber}</span>
                  </div>
                  <div>
                    <span className="font-medium">Date: </span>
                    <span className="ml-2">{invoiceData.date}</span>
                  </div>
                  <div>
                    <span className="font-medium">Due Date: </span>
                    <span className="ml-2">{invoiceData.dueDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-20 mb-20">
            {/* From Section */}
            <div className="space-y-3">
              <div className="text-lg font-semibold mb-6" style={style === 'uber-styled' ? { color: invoiceData.colorScheme.primary } : {}}>
                From:
              </div>
              <div className="text-lg">
                <div className="font-medium">{invoiceData.companyName}</div>
                <div className="text-gray-600 mt-4 leading-relaxed">
                  123 Business Street<br />
                  City, State 12345<br />
                  contact@company.com
                </div>
              </div>
            </div>

            {/* Bill To Section */}
            <div className="space-y-3">
              <div className="text-lg font-semibold mb-6" style={style === 'uber-styled' ? { color: invoiceData.colorScheme.primary } : {}}>
                Bill To:
              </div>
              <div className="text-lg">
                <div className="font-medium">{invoiceData.billTo.name}</div>
                <div className="text-gray-600 mt-4 leading-relaxed whitespace-pre-line">{invoiceData.billTo.address}</div>
                <div className="text-gray-600 mt-4">{invoiceData.billTo.email}</div>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-20">
            <table className="w-full">
              <thead>
                <tr>
                  {fields.map((field, index) => (
                    <th
                      key={index}
                      className={getTableHeaderClasses()}
                      style={{
                        ...styles.tableHeader,
                        padding: '1.25rem 2rem',
                      }}
                    >
                      {field.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-lg">
                {invoiceData.items.map((item, index) => (
                  <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    {fields.map((field, fieldIndex) => (
                      <td
                        key={fieldIndex}
                        className="px-8 py-6"
                      >
                        {field.type === 'currency' ? (
                          formatCurrency(item[field.name] as number, invoiceData.currency.code)
                        ) : field.type === 'number' ? (
                          item[field.name]?.toString()
                        ) : (
                          item[field.name]
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total Section */}
          <div className="flex justify-end mb-20">
            <div className="w-1/3 space-y-4">
              <div className="flex justify-between text-lg py-2">
                <span className="font-medium">Subtotal:</span>
                <span>{formatCurrency(calculateSubtotal(), invoiceData.currency.code)}</span>
              </div>
              <div className="flex justify-between text-lg py-2">
                <span className="font-medium">Tax ({invoiceData.tax || 0}%):</span>
                <span>{formatCurrency(calculateTaxAmount(), invoiceData.currency.code)}</span>
              </div>
              <div className="h-px bg-gray-200 my-6"></div>
              <div className="flex justify-between text-2xl font-bold py-2">
                <span>Total:</span>
                <span>{formatCurrency(calculateTotal(), invoiceData.currency.code)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="flex-none mt-auto">
          {/* Notes */}
          {invoiceData.notes && (
            <div className="mt-8" style={styles.notes}>
              <h3 className="text-lg font-semibold mb-4">Notes:</h3>
              <div 
                className="text-gray-600 whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: formatText(invoiceData.notes) }}
              />
            </div>
          )}

          {/* Footer */}
          <div className="text-center text-sm text-gray-500">
            Thank you for your business!
          </div>
        </div>
      </div>
    </div>
  );
}
