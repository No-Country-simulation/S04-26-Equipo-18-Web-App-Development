import { useRef, useState } from 'react'
import type { Document } from '@/shared/types'
import { AlertCircle, CheckCircle2, CreditCard, FileCheck, FileText, Home, Upload, X } from 'lucide-react'

const documentTypes = [
  { type: 'id-front', label: 'Documento de identidad (frente)', icon: CreditCard, required: true },
  { type: 'id-back', label: 'Documento de identidad (dorso)', icon: CreditCard, required: true },
  { type: 'proof-of-address', label: 'Comprobante de domicilio', icon: Home, required: true },
  { type: 'tax-document', label: 'Constancia fiscal', icon: FileCheck, required: false },
] as const

interface StepDocumentsProps {
  documents: Document[]
  onAddDocument: (document: Document) => void
  onRemoveDocument: (documentId: string) => void
  onNext: () => void
  onBack: () => void
}

export const StepDocuments = ({ documents, onAddDocument, onRemoveDocument, onNext, onBack }: StepDocumentsProps) => {
  const [dragOver, setDragOver] = useState<string | null>(null)
  const [activeType, setActiveType] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const getDocumentByType = (type: string) => documents.find((document) => document.type === type)

  const handleFileSelect = (type: string, file: File) => {
    const newDocument: Document = {
      id: `${type}-${Date.now()}`,
      type: type as Document['type'],
      name: file.name,
      url: URL.createObjectURL(file),
      uploadedAt: new Date(),
      status: 'pending',
    }

    onAddDocument(newDocument)
  }

  const handleDrop = (type: string, event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragOver(null)
    const file = event.dataTransfer.files[0]

    if (file && (file.type.startsWith('image/') || file.type === 'application/pdf')) {
      handleFileSelect(type, file)
    }
  }

  const handleInputChange = (type: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleFileSelect(type, file)
    }
  }

  const requiredDocuments = documentTypes.filter((item) => item.required)
  const uploadedRequiredDocuments = requiredDocuments.filter((item) => getDocumentByType(item.type))
  const canProceed = uploadedRequiredDocuments.length === requiredDocuments.length

  return (
    <div className="space-y-6">
      <div className="mb-8 text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <FileText className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl font-semibold text-foreground">Carga de documentos</h2>
        <p className="mt-2 text-muted-foreground">Subí la documentación requerida para revisión del equipo operativo.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {documentTypes.map(({ type, label, icon: Icon, required }) => {
          const document = getDocumentByType(type)
          const isDragOver = dragOver === type

          return (
            <div
              key={type}
              className={`relative rounded-xl border-2 border-dashed transition-all duration-200 ${
                document
                  ? document.status === 'rejected'
                    ? 'border-destructive bg-destructive/5'
                    : document.status === 'approved'
                    ? 'border-success bg-success/5'
                    : 'border-primary bg-primary/5'
                  : isDragOver
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50 hover:bg-muted/50'
              }`}
              onDragOver={(event) => {
                event.preventDefault()
                setDragOver(type)
              }}
              onDragLeave={() => setDragOver(null)}
              onDrop={(event) => handleDrop(type, event)}
            >
              {document ? (
                <div className="p-5">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">{label}</span>
                      {required && <span className="text-xs text-destructive">*</span>}
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemoveDocument(document.id)}
                      className="rounded-full p-1 transition-colors hover:bg-muted"
                    >
                      <X className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </div>

                  <div className="flex items-center gap-3 rounded-lg bg-background p-3">
                    <FileText className="h-8 w-8 text-primary" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">{document.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Cargado el {new Date(document.uploadedAt).toLocaleDateString('es-AR')}
                      </p>
                    </div>
                    {document.status === 'approved' && <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />}
                    {document.status === 'rejected' && <AlertCircle className="h-5 w-5 shrink-0 text-destructive" />}
                  </div>

                  {document.status === 'rejected' && document.rejectionReason && (
                    <p className="mt-2 text-sm text-destructive">{document.rejectionReason}</p>
                  )}
                </div>
              ) : (
                <label className="block cursor-pointer p-6">
                  <input
                    ref={activeType === type ? fileInputRef : null}
                    type="file"
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={(event) => handleInputChange(type, event)}
                    onClick={() => setActiveType(type)}
                  />
                  <div className="text-center">
                    <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                      <Icon className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <p className="mb-1 text-sm font-medium text-foreground">
                      {label}
                      {required && <span className="ml-1 text-destructive">*</span>}
                    </p>
                    <p className="mb-3 text-xs text-muted-foreground">Arrastrá un archivo o hacé click para subirlo</p>
                    <div className="inline-flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                      <Upload className="h-4 w-4" />
                      Elegir archivo
                    </div>
                  </div>
                </label>
              )}
            </div>
          )
        })}
      </div>

      <div className="rounded-lg bg-muted/50 p-4">
        <p className="text-sm text-muted-foreground">
          <strong>Formatos aceptados:</strong> JPG, PNG y PDF, hasta 10 MB por archivo.
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Los campos marcados con <span className="text-destructive">*</span> son obligatorios.
        </p>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 rounded-lg border border-border px-6 py-3 font-medium text-foreground transition-colors hover:bg-muted"
        >
          Volver
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!canProceed}
          className={`flex-1 rounded-lg px-6 py-3 font-medium transition-colors ${
            canProceed ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-muted text-muted-foreground cursor-not-allowed'
          }`}
        >
          Continuar al contrato
        </button>
      </div>
    </div>
  )
}

export default StepDocuments