'use client'

import React, { useState } from 'react'
import { Plus, Trash2, Settings2, GripVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
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
  id?: string
  [key: string]: any
}

interface InvoiceData {
  invoiceNumber: string
  date: string
  dueDate: string
  billTo: {
    name: string
    address: string
    email: string
  }
  items: InvoiceItem[]
  notes: string
  currency: CountryData['currency']
  companyName: string
  companyLogo: string | null
  colorScheme: {
    primary: string
    secondary: string
    accent: string
  }
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
  date: new Date().toISOString().split('T')[0],
  dueDate: '',
  billTo: {
    name: '',
    address: '',
    email: ''
  },
  items: [{
    id: '1',
    name: '',
    description: '',
    quantity: 1,
    price: 0,
    amount: 0
  }],
  notes: '',
  currency: defaultCountry.currency,
  companyName: '',
  companyLogo: null,
  colorScheme: {
    primary: '#518b03',
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
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
    }
    fields.forEach(field => {
      newItem[field.name] = field.type === 'number' ? 0 : ''
    })
    newItem.quantity = 1
    newItem.price = 0
    newItem.amount = 0

    setInvoiceData(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }))
  }

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
        newItems[index].amount = Number(newItems[index].quantity || 0) * Number(newItems[index].price || 0)
      }
      
      return { ...prev, items: newItems }
    })
  }

  const calculateTotal = () => {
    return invoiceData.items.reduce((sum, item) => sum + (item.amount || 0), 0)
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
    const reader = new FileReader();
    reader.onloadend = () => {
      setInvoiceData(prev => ({
        ...prev,
        companyLogo: reader.result as string
      }));
    };
    reader.readAsDataURL(file);
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
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 gap-8">
        {/* Left Column - Form */}
        <div className="space-y-8">
          <div className="space-y-4">
            {/* Style Selector */}
            <InvoiceStyleSelector
              value={invoiceStyle}
              onChange={setInvoiceStyle}
            />

            {/* Branding Settings */}
            <InvoiceBrandingSettings
              logo={invoiceData.companyLogo}
              onLogoUpload={handleLogoUpload}
              onLogoRemove={handleLogoRemove}
              colorScheme={invoiceData.colorScheme}
              onColorChange={handleColorChange}
              companyName={invoiceData.companyName}
              onCompanyNameChange={(name) => setInvoiceData(prev => ({ ...prev, companyName: name }))}
            />

            {/* Invoice Details */}
            <div className="mb-6 flex justify-end gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Custom Field
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
                  <Button variant="outline">
                    <Settings2 className="h-4 w-4 mr-2" />
                    Customize Fields
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
            
            {/* Invoice Form */}
            <Card className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">INVOICE</h1>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <Label className="w-32">Invoice Number:</Label>
                      <Input
                        value={invoiceData.invoiceNumber}
                        onChange={(e) => setInvoiceData(prev => ({ ...prev, invoiceNumber: e.target.value }))}
                        placeholder="#INV-001"
                        className="max-w-[200px]"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Label className="w-32">Currency:</Label>
                      <select
                        value={invoiceData.currency.code}
                        onChange={(e) => {
                          const selectedCountry = countriesData.find(c => c.currency.code === e.target.value) || defaultCountry;
                          setInvoiceData(prev => ({
                            ...prev,
                            currency: selectedCountry.currency
                          }));
                        }}
                        className="flex h-9 w-full max-w-[200px] rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {countriesData.map((country) => (
                          <option key={country.currency.code} value={country.currency.code}>
                            {country.name} ({country.currency.code} - {country.currency.symbol})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-center gap-2">
                      <Label className="w-32">Date:</Label>
                      <Input
                        type="date"
                        value={invoiceData.date}
                        onChange={(e) => setInvoiceData(prev => ({ ...prev, date: e.target.value }))}
                        className="max-w-[200px]"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Label className="w-32">Due Date:</Label>
                      <Input
                        type="date"
                        value={invoiceData.dueDate}
                        onChange={(e) => setInvoiceData(prev => ({ ...prev, dueDate: e.target.value }))}
                        className="max-w-[200px]"
                      />
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <h2 className="text-xl font-semibold mb-2">{invoiceData.companyName}</h2>
                  <p className="text-sm text-gray-600">
                    123 Business Street<br />
                    City, State 12345<br />
                    contact@company.com
                  </p>
                </div>
              </div>

              {/* Bill To Section */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Bill To</h3>
                <div className="space-y-4">
                  <div>
                    <Label>Name</Label>
                    <Input
                      value={invoiceData.billTo.name}
                      onChange={(e) => updateBillTo('name', e.target.value)}
                      placeholder="Client's Name"
                    />
                  </div>
                  <div>
                    <Label>Address</Label>
                    <Input
                      value={invoiceData.billTo.address}
                      onChange={(e) => updateBillTo('address', e.target.value)}
                      placeholder="Client's Address"
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
                </div>
              </div>

              <Separator className="my-8" />

              {/* Items Table */}
              <div className="mb-8">
                <div className="grid gap-4 mb-4 font-semibold text-sm"
                     style={{ gridTemplateColumns: `${fields.filter(f => f.enabled).map(f => `${f.width}fr`).join(' ')} 1fr` }}>
                  {fields.filter(f => f.enabled).map(field => (
                    <div key={field.id} className={field.type === 'number' ? 'text-right' : ''}>
                      {field.label}
                    </div>
                  ))}
                  <div></div> {/* For delete button */}
                </div>

                {invoiceData.items.map((item, index) => (
                  <div key={item.id} className="grid gap-4 mb-4 items-center"
                       style={{ gridTemplateColumns: `${fields.filter(f => f.enabled).map(f => `${f.width}fr`).join(' ')} 1fr` }}>
                    {fields.filter(f => f.enabled).map(field => (
                      <div key={field.id}>
                        <Input
                          type={field.type}
                          value={item[field.name] || ''}
                          onChange={(e) => updateItem(index, field.name, field.type === 'number' ? Number(e.target.value) : e.target.value)}
                          className={field.type === 'number' ? 'text-right' : ''}
                          min={field.type === 'number' ? '0' : undefined}
                          step={field.type === 'number' ? '0.01' : undefined}
                          placeholder={field.label}
                        />
                      </div>
                    ))}
                    <div className="flex justify-end">
                      {invoiceData.items.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(index)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}

                <Button
                  variant="outline"
                  onClick={addItem}
                  className="mt-4"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </div>

              {/* Totals */}
              <div className="flex justify-end mb-8">
                <div className="w-72">
                  <div className="flex justify-between py-2">
                    <span className="font-semibold">Total:</span>
                    <span className="font-semibold">
                      {invoiceData.currency.symbol}{calculateTotal().toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <Label>Notes</Label>
                <Input
                  value={invoiceData.notes}
                  onChange={(e) => setInvoiceData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Additional notes or payment instructions"
                />
              </div>
            </Card>
          </div>

          {/* Right Column - Preview */}
          <div className="lg:sticky lg:top-4">
            <InvoicePreview
              invoiceData={invoiceData}
              fields={fields}
              style={invoiceStyle}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
