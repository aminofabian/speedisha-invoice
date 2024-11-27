import React, { useRef } from 'react'
import { cn } from '@/lib/utils'
import { ItemField } from './InvoiceCreator'
import { InvoiceStyle } from './InvoiceStyleSelector'
import Image from 'next/image'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import { Document, Packer, Paragraph, Table, TableCell, TableRow, TextRun, HeadingLevel, AlignmentType, WidthType } from 'docx'
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
    const baseClasses = 'p-16 bg-white shadow-xl mx-auto w-[21cm] min-h-[29.7cm] flex flex-col rounded-lg print:shadow-none'

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
        return 'mb-16'
      case 'styled':
        return 'mb-16 py-8 bg-gray-50 rounded-lg'
      case 'uber-styled':
        return cn('mb-16 py-8 rounded-lg')
      default:
        return 'mb-16'
    }
  };

  const getTableHeaderClasses = () => {
    const baseClasses = 'px-6 py-4 text-left font-semibold tracking-wider text-sm uppercase'

    switch (style) {
      case 'basic':
        return cn(baseClasses, 'bg-gray-100 first:rounded-tl-lg last:rounded-tr-lg')
      case 'styled':
        return cn(baseClasses, 'bg-gray-50 border-b-2 border-gray-200')
      case 'uber-styled':
        return cn(baseClasses, 'border-b-2')
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
      styles: {
        default: {
          heading1: {
            run: {
              size: 32,
              bold: true,
            },
            paragraph: {
              spacing: {
                after: 300,
              },
            },
          },
          heading2: {
            run: {
              size: 36,
              bold: true,
            },
            paragraph: {
              spacing: {
                after: 300,
              },
            },
          },
        },
      },
      sections: [{
        properties: {
          page: {
            margin: {
              top: 1440, // 1 inch = 1440 twips
              right: 1440,
              bottom: 1440,
              left: 1440,
            },
          },
        },
        children: [
          // Header with company info and invoice details
          new Paragraph({
            children: [
              new TextRun({
                text: invoiceData.companyName,
                bold: true,
                size: 32,
              }),
            ],
            spacing: {
              after: 400,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "INVOICE",
                bold: true,
                size: 36,
              }),
            ],
            alignment: AlignmentType.RIGHT,
            spacing: {
              after: 400,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({ 
                text: `Invoice #: ${invoiceData.invoiceNumber}`,
                size: 24,
              }),
              new TextRun({ 
                text: `Date: ${invoiceData.date}`,
                break: 1,
                size: 24,
              }),
              new TextRun({ 
                text: `Due Date: ${invoiceData.dueDate}`,
                break: 1,
                size: 24,
              }),
            ],
            alignment: AlignmentType.RIGHT,
            spacing: {
              after: 400,
            },
          }),

          // Billing Information
          new Table({
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "From:",
                            bold: true,
                            size: 24,
                          }),
                        ],
                      }),
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: invoiceData.companyName,
                            size: 24,
                          }),
                        ],
                      }),
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "123 Business Street",
                            size: 24,
                          }),
                        ],
                      }),
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "City, State 12345",
                            size: 24,
                          }),
                        ],
                      }),
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "contact@company.com",
                            size: 24,
                          }),
                        ],
                      }),
                    ],
                    width: {
                      size: 50,
                      type: WidthType.PERCENTAGE,
                    },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "Bill To:",
                            bold: true,
                            size: 24,
                          }),
                        ],
                      }),
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: invoiceData.billTo.name,
                            size: 24,
                          }),
                        ],
                      }),
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: invoiceData.billTo.address,
                            size: 24,
                          }),
                        ],
                      }),
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: invoiceData.billTo.email,
                            size: 24,
                          }),
                        ],
                      }),
                    ],
                    width: {
                      size: 50,
                      type: WidthType.PERCENTAGE,
                    },
                  }),
                ],
              }),
            ],
            margins: {
              top: 100,
              bottom: 100,
              right: 100,
              left: 100,
            },
          }),

          // Spacer
          new Paragraph({
            spacing: {
              after: 400,
            },
          }),

          // Items Table
          new Table({
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            rows: [
              // Header row
              new TableRow({
                children: fields.map(field => 
                  new TableCell({ 
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: field.label,
                            bold: true,
                            size: 24,
                          }),
                        ],
                        alignment: field.type === 'number' || field.type === 'currency' 
                          ? AlignmentType.RIGHT 
                          : AlignmentType.LEFT,
                      }),
                    ],
                    width: {
                      size: field.name === 'description' 
                        ? 27 
                        : field.name === 'quantity' 
                        ? 15
                        : field.name === 'name'
                        ? 18
                        : 20,
                      type: WidthType.PERCENTAGE,
                    },
                    shading: {
                      fill: "F3F4F6",
                    },
                  })
                ),
              }),
              // Item rows
              ...invoiceData.items.map(item => 
                new TableRow({
                  children: fields.map(field => 
                    new TableCell({
                      children: [
                        new Paragraph({ 
                          children: [
                            new TextRun({
                              text: field.type === 'currency'
                                ? formatCurrency(typeof item[field.name] === 'number' ? item[field.name] as number : 0, invoiceData.currency.code)
                                : String(item[field.name] || ''),
                              size: 24,
                            }),
                          ],
                          alignment: field.type === 'number' || field.type === 'currency'
                            ? AlignmentType.RIGHT 
                            : AlignmentType.LEFT,
                        }),
                      ],
                      width: {
                        size: field.name === 'description' 
                          ? 27 
                          : field.name === 'quantity' 
                          ? 15
                          : field.name === 'name'
                          ? 18
                          : 20,
                        type: WidthType.PERCENTAGE,
                      },
                    })
                  ),
                })
              ),
            ],
            margins: {
              top: 100,
              bottom: 100,
              right: 100,
              left: 100,
            },
          }),

          // Spacer
          new Paragraph({
            spacing: {
              after: 400,
            },
          }),

          // Totals
          new Table({
            width: {
              size: 40,
              type: WidthType.PERCENTAGE,
            },
            alignment: AlignmentType.RIGHT,
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "Subtotal:",
                            size: 24,
                          }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: formatCurrency(calculateSubtotal(), invoiceData.currency.code),
                            size: 24,
                          }),
                        ],
                        alignment: AlignmentType.RIGHT,
                      }),
                    ],
                  }),
                ],
              }),
              ...(invoiceData.tax > 0 ? [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: `Tax (${invoiceData.tax}%):`,
                              size: 24,
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: formatCurrency(calculateTaxAmount(), invoiceData.currency.code),
                              size: 24,
                            }),
                          ],
                          alignment: AlignmentType.RIGHT,
                        }),
                      ],
                    }),
                  ],
                }),
              ] : []),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "Total:",
                            bold: true,
                            size: 24,
                          }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: formatCurrency(calculateTotal(), invoiceData.currency.code),
                            bold: true,
                            size: 24,
                          }),
                        ],
                        alignment: AlignmentType.RIGHT,
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),

          // Notes
          ...(invoiceData.notes ? [
            new Paragraph({
              children: [
                new TextRun({
                  text: "Notes:",
                  bold: true,
                  size: 24,
                }),
              ],
              spacing: {
                before: 400,
                after: 200,
              },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: invoiceData.notes,
                  size: 24,
                }),
              ],
            }),
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

  // Format currency with proper symbol and decimal places
  const formatCurrency = (value: number, symbol: string) => {
    return `${symbol}${value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
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
        padding: '3rem',
        boxSizing: 'border-box',
        minHeight: '29.7cm',
      }}>
        {/* Header Section */}
        <div className="flex-none">
          <div className={getHeaderClasses()} style={{
            ...styles.header,
            marginBottom: '4rem',
          }}>
            <div className="flex justify-between items-start gap-8">
              <div className="flex-1">
                {invoiceData.companyLogo ? (
                  <div className="w-48 h-24 relative">
                    <Image
                      src={invoiceData.companyLogo}
                      alt="Company Logo"
                      fill
                      style={{ objectFit: 'contain' }}
                      priority
                    />
                  </div>
                ) : (
                  <h1 className="text-3xl font-bold tracking-tight" style={styles.title}>
                    {invoiceData.companyName}
                  </h1>
                )}
              </div>

              <div className="text-right space-y-6">
                <h2 className="text-4xl font-bold tracking-tight" style={styles.title}>INVOICE</h2>
                <div className="space-y-3 text-base">
                  <div className="grid grid-cols-2 gap-3">
                    <span className="font-medium text-gray-600 text-right">Invoice Number:</span>
                    <span className="text-left">{invoiceData.invoiceNumber}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <span className="font-medium text-gray-600 text-right">Date:</span>
                    <span className="text-left">{invoiceData.date}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <span className="font-medium text-gray-600 text-right">Due Date:</span>
                    <span className="text-left">{invoiceData.dueDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-16 mb-16">
            {/* From Section */}
            <div className="space-y-4 p-6 bg-gray-50 rounded-lg">
              <div className="text-base font-semibold" style={style === 'uber-styled' ? { color: invoiceData.colorScheme.primary } : {}}>
                From:
              </div>
              <div>
                <div className="font-medium text-lg">{invoiceData.companyName}</div>
                <div className="text-gray-600 mt-3 leading-relaxed text-sm">
                  123 Business Street<br />
                  City, State 12345<br />
                  contact@company.com
                </div>
              </div>
            </div>

            {/* Bill To Section */}
            <div className="space-y-4 p-6 bg-gray-50 rounded-lg">
              <div className="text-base font-semibold" style={style === 'uber-styled' ? { color: invoiceData.colorScheme.primary } : {}}>
                Bill To:
              </div>
              <div>
                <div className="font-medium text-lg">{invoiceData.billTo.name}</div>
                <div className="text-gray-600 mt-3 leading-relaxed whitespace-pre-line text-sm">{invoiceData.billTo.address}</div>
                <div className="text-gray-600 mt-3 text-sm">{invoiceData.billTo.email}</div>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-16 overflow-hidden rounded-lg border border-gray-200">
            <table className="w-full table-fixed border-separate border-spacing-0">
              <colgroup>
                <col style={{ width: '18%' }} /> {/* name */}
                <col style={{ width: '27%' }} /> {/* description */}
                <col style={{ width: '20%' }} /> {/* price */}
                <col style={{ width: '15%' }} /> {/* quantity */}
                <col style={{ width: '20%' }} /> {/* amount */}
              </colgroup>
              <thead>
                <tr>
                  {fields.map((field, index) => (
                    <th
                      key={index}
                      className={getTableHeaderClasses()}
                      style={{
                        ...styles.tableHeader,
                        textAlign: field.type === 'number' || field.type === 'currency' ? 'right' : 'left',
                        paddingLeft: field.name === 'description' ? '8px' : '12px',
                        paddingRight: field.type === 'number' || field.type === 'currency' ? '12px' : '8px'
                      }}
                    >
                      {field.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-sm">
                {invoiceData.items.map((item, index) => (
                  <tr key={item.id} className={cn(
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50',
                    'transition-colors hover:bg-gray-100'
                  )}>
                    {fields.map((field, fieldIndex) => {
                      const value = item[field.name];
                      const classes = cn(
                        "py-4 align-top",
                        field.name === 'name' && "px-12",
                        field.name === 'description' && "px-8",
                        (field.type === 'number' || field.type === 'currency') && "text-right",
                        field.name === 'quantity' && "px-12",
                        field.name === 'price' && "px-12",
                        field.name === 'amount' && "px-12"
                      );

                      if (field.type === 'currency') {
                        const numValue = typeof value === 'string' ? parseFloat(value) : (value as number);
                        const formattedValue = formatCurrency(numValue || 0, '');
                        return (
                          <td key={fieldIndex} className={classes}>
                            <div className="flex justify-end items-center gap-1 font-medium">
                              <span className="text-gray-500 text-xs">{invoiceData.currency.symbol}</span>
                              {formattedValue}
                            </div>
                          </td>
                        );
                      }

                      if (field.name === 'name' || field.name === 'description') {
                        return (
                          <td key={fieldIndex} className={classes}>
                            <div className="leading-relaxed">
                              {String(value || '')}
                            </div>
                          </td>
                        );
                      }

                      return (
                        <td key={fieldIndex} className={classes}>
                          {value || ''}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total Section */}
          <div className="flex justify-end mb-16">
            <div className="w-1/3 space-y-3 p-6 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center py-2 text-sm">
                <span className="font-medium text-gray-600">Subtotal:</span>
                <span className="font-medium">{formatCurrency(calculateSubtotal(), invoiceData.currency.symbol)}</span>
              </div>
              {invoiceData.tax > 0 && (
                <div className="flex justify-between items-center py-2 text-sm">
                  <span className="font-medium text-gray-600">Tax ({invoiceData.tax}%):</span>
                  <span className="font-medium">{formatCurrency(calculateTaxAmount(), invoiceData.currency.symbol)}</span>
                </div>
              )}
              <div className="flex justify-between items-center py-3 text-lg border-t border-gray-200 mt-3">
                <span className="font-semibold">Total:</span>
                <span className="font-semibold">{formatCurrency(calculateTotal(), invoiceData.currency.symbol)}</span>
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
