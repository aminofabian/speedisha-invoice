'use client'

import React, { useState } from 'react'
import { Plus, Trash2, Settings2, GripVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { InvoicePreview } from './InvoicePreview'
import { InvoiceStyleSelector, type InvoiceStyle } from './InvoiceStyleSelector'
import { InvoiceBrandingSettings } from './InvoiceBrandingSettings'
import { countriesData, defaultCountry, type CountryData } from '@/lib/countries-data'

export interface ItemField {
  id: string
  name: string
  label: string
  type: string
  required: boolean
  width: number
  enabled: boolean
}

interface InvoiceItem {
  id: string;
  description?: string;
  quantity?: number;
  price?: number;
  amount?: number;
  [key: string]: any;
}

interface InvoiceData {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  companyName: string;
  companyLogo: string | null;
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
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

const defaultFields: ItemField[] = [
  { id: 'name', name: 'name', label: 'Item Name', type: 'text', required: true, width: 3, enabled: true },
  { id: 'description', name: 'description', label: 'Description', type: 'text', required: false, width: 3, enabled: true },
  { id: 'quantity', name: 'quantity', label: 'Quantity', type: 'number', required: true, width: 2, enabled: true },
  { id: 'price', name: 'price', label: 'Price', type: 'number', required: true, width: 2, enabled: true },
  { id: 'amount', name: 'amount', label: 'Amount', type: 'number', required: true, width: 2, enabled: true },
]

const initialInvoiceData: InvoiceData = {
  invoiceNumber: '',
  date: '',
  dueDate: '',
  companyName: 'Your Company',
  companyLogo: null,
  billTo: {
    name: '',
    address: '',
    email: ''
  },
  items: [{
    id: crypto.randomUUID(),
    description: '',
    quantity: 1,
    price: 0,
    amount: 0
  }],
  notes: '',
  tax: 0,
  currency: defaultCountry.currency,
  colorScheme: {
    primary: '#164e63',
    secondary: '#3d6802',
    accent: '#7ab61d'
  }
}

export function InvoiceCreator() {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>(initialInvoiceData)
  const [selectedCountry, setSelectedCountry] = useState<CountryData>(defaultCountry)
  const [invoiceStyle, setInvoiceStyle] = useState<InvoiceStyle>('basic')
  const [fields, setFields] = useState<ItemField[]>(defaultFields)
  const [newField, setNewField] = useState<{ name: string; label: string; type: string }>({
    name: '',
    label: '',
    type: 'text'
  })
  
  const updateBillTo = (field: keyof typeof invoiceData.billTo, value: string) => {
    setInvoiceData(prev => ({
      ...prev,
      billTo: {
        ...prev.billTo,
        [field]: value
      }
    }))
  }

  const addItem = () => {
    setInvoiceData(prev => ({
      ...prev,
      items: [...prev.items, {
        id: crypto.randomUUID(),
        description: '',
        quantity: 1,
        price: 0,
        amount: 0
      }]
    }));
  };

  const removeItem = (index: number) => {
    setInvoiceData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }))
  }

  const updateItem = (index: number, fieldName: string, value: string | number) => {
    setInvoiceData(prev => {
      const newItems = [...prev.items]
      newItems[index] = {
        ...newItems[index],
        [fieldName]: value,
      }
      
      // Recalculate amount if quantity or price changes
      if (fieldName === 'quantity' || fieldName === 'price') {
        const baseAmount = Number(newItems[index].quantity || 0) * Number(newItems[index].price || 0);
        newItems[index].amount = baseAmount;
      }
      
      return { ...prev, items: newItems }
    })
  }

  const calculateTotal = () => {
    const subtotal = invoiceData.items.reduce((sum, item) => sum + (item.amount || 0), 0);
    const taxAmount = (subtotal * (invoiceData.tax || 0)) / 100;
    return subtotal + taxAmount;
  }

  const toggleField = (fieldId: string) => {
    setFields(prev => prev.map(field => 
      field.id === fieldId ? { ...field, enabled: !field.enabled } : field
    ))
  }

  const onDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(fields)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setFields(items)
  }

  const addCustomField = (fieldData: { name: string; label: string; type: string }) => {
    const newField: ItemField = {
      id: fieldData.name.toLowerCase().replace(/\s+/g, '_'),
      name: fieldData.name.toLowerCase().replace(/\s+/g, '_'),
      label: fieldData.label,
      type: fieldData.type,
      required: false,
      width: 2,
      enabled: true
    }
    setFields(prev => [...prev, newField])
  }

  const handleLogoUpload = async (file: File) => {
    const url = URL.createObjectURL(file);
    setInvoiceData(prev => ({
      ...prev,
      companyLogo: url
    }));
  };

  const handleLogoRemove = () => {
    setInvoiceData(prev => ({
      ...prev,
      companyLogo: null
    }));
  };

  const handleColorChange = (key: keyof typeof invoiceData.colorScheme, value: string) => {
    setInvoiceData(prev => ({
      ...prev,
      colorScheme: {
        ...prev.colorScheme,
        [key]: value
      }
    }));
  };

  return (
    <div className="max-w-[1600px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-6">
        {/* Form Column */}
        <div className="space-y-4">
          {/* Top Controls */}
          <div className="flex flex-wrap gap-3 items-start">
            <InvoiceStyleSelector
              value={invoiceStyle}
              onChange={setInvoiceStyle}
            />
            <div className="flex gap-2 ml-auto">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Field
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Custom Field</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="label">Field Label</Label>
                      <Input
                        id="label"
                        value={newField.label}
                        onChange={(e) => setNewField(prev => ({ ...prev, label: e.target.value, name: e.target.value.toLowerCase().replace(/\s+/g, '_') }))}
                        placeholder="e.g., SKU Number"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="type">Field Type</Label>
                      <select
                        id="type"
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        value={newField.type}
                        onChange={(e) => setNewField(prev => ({ ...prev, type: e.target.value }))}
                      >
                        <option value="text">Text</option>
                        <option value="number">Number</option>
                      </select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={() => {
                        if (newField.label) {
                          addCustomField({
                            name: newField.name || newField.label.toLowerCase().replace(/\s+/g, '_'),
                            label: newField.label,
                            type: newField.type
                          })
                          setNewField({ name: '', label: '', type: 'text' })
                        }
                      }}
                    >
                      Add Field
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Settings2 className="h-4 w-4 mr-2" />
                    Fields
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Customize Invoice Fields</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <DragDropContext onDragEnd={onDragEnd}>
                      <Droppable droppableId="fields">
                        {(provided) => (
                          <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                            {fields.map((field, index) => (
                              <Draggable key={field.id} draggableId={field.id} index={index}>
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    className="flex items-center justify-between p-2 bg-secondary rounded-md"
                                  >
                                    <div className="flex items-center gap-2">
                                      <div {...provided.dragHandleProps}>
                                        <GripVertical className="h-4 w-4" />
                                      </div>
                                      <span>{field.label}</span>
                                    </div>
                                    <Switch
                                      checked={field.enabled}
                                      onCheckedChange={() => toggleField(field.id)}
                                    />
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Main Form */}
          <Card className="p-4">
            {/* Quick Info Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              <div>
                <Label>Invoice #</Label>
                <Input
                  value={invoiceData.invoiceNumber}
                  onChange={(e) => setInvoiceData(prev => ({ ...prev, invoiceNumber: e.target.value }))}
                  placeholder="#INV-001"
                />
              </div>
              <div>
                <Label>Date</Label>
                <Input
                  type="date"
                  value={invoiceData.date}
                  onChange={(e) => setInvoiceData(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>
              <div>
                <Label>Due Date</Label>
                <Input
                  type="date"
                  value={invoiceData.dueDate}
                  onChange={(e) => setInvoiceData(prev => ({ ...prev, dueDate: e.target.value }))}
                />
              </div>
              <div>
                <Label>Tax (%)</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={invoiceData.tax || 0}
                  onChange={(e) => setInvoiceData(prev => ({ ...prev, tax: parseFloat(e.target.value) || 0 }))}
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Company Info & Branding */}
            <div className="mb-6">
              <InvoiceBrandingSettings
                logo={invoiceData.companyLogo}
                onLogoUpload={handleLogoUpload}
                onLogoRemove={handleLogoRemove}
                colorScheme={invoiceData.colorScheme}
                onColorChange={handleColorChange}
                companyName={invoiceData.companyName}
                onCompanyNameChange={(name) => setInvoiceData(prev => ({ ...prev, companyName: name }))}
              />
            </div>

            {/* Bill To Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Bill To</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>Name</Label>
                  <Input
                    value={invoiceData.billTo.name}
                    onChange={(e) => updateBillTo('name', e.target.value)}
                    placeholder="Client's Name"
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={invoiceData.billTo.email}
                    onChange={(e) => updateBillTo('email', e.target.value)}
                    placeholder="client@example.com"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label>Address</Label>
                  <textarea
                    className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                    value={invoiceData.billTo.address}
                    onChange={(e) => updateBillTo('address', e.target.value)}
                    placeholder="Client's Address"
                  />
                </div>
              </div>
            </div>

            {/* Items Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">Items</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addItem}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </div>
              
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="items">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {invoiceData.items.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-secondary/5 p-3 rounded-lg mb-3 group"
                            >
                              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                {fields.filter(f => f.enabled).map(field => (
                                  <div key={field.id}>
                                    <Label className="text-sm">{field.label}</Label>
                                    <Input
                                      type={field.type}
                                      value={item[field.name] || ''}
                                      onChange={(e) => updateItem(index, field.name, field.type === 'number' ? Number(e.target.value) : e.target.value)}
                                      className={field.type === 'number' ? 'text-right' : ''}
                                      min={field.type === 'number' ? '0' : undefined}
                                      step={field.type === 'number' ? '0.01' : undefined}
                                    />
                                  </div>
                                ))}
                                {invoiceData.items.length > 1 && (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeItem(index)}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700 hover:bg-red-50 mt-6"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>

            {/* Total */}
            <div className="flex justify-end mb-6">
              <div className="w-48">
                <div className="flex justify-between py-2 font-semibold">
                  <span>Total:</span>
                  <span>{invoiceData.currency.symbol}{calculateTotal().toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <Label>Notes</Label>
              <div className="space-y-2">
                <Textarea
                  value={invoiceData.notes}
                  onChange={(e) => setInvoiceData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Add notes here... Use *text* for bold, _text_ for italic, and \n for line break"
                  className="min-h-[100px]"
                />
                <div className="text-sm text-muted-foreground">
                  Formatting: *bold*, _italic_, \n for line break
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Preview Column */}
        <div className="lg:sticky lg:top-4 h-fit">
          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-4">Preview</h2>
            <InvoicePreview
              invoiceData={invoiceData}
              fields={fields.filter(f => f.enabled)}
              style={invoiceStyle}
            />
          </Card>
        </div>
      </div>
    </div>
  )
}
