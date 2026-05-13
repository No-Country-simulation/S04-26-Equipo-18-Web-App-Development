import { useState } from "react";
import { format } from "date-fns";
import {
    User, Mail, Phone, MapPin, Calendar, FileText,
    CreditCard, Building2, Globe, CheckCircle2, XCircle,
    Clock, ArrowLeft, MessageSquare
} from "lucide-react";
import type { Contractor, Document as ContractorDocument } from "@/shared/types";
import { useNavigate } from "react-router-dom";
import { contractorStatusConfig } from "@/shared/config/contractorStatusConfig";

export function ContractorDetail({ contractor }: { contractor: Contractor }) {

    const [showRejectModal, setShowRejectModal] = useState(false);
    const [showCorrectionModal, setShowCorrectionModal] = useState(false);
    const [showDocRejectModal, setShowDocRejectModal] = useState<ContractorDocument | null>(null);
    const [notes, setNotes] = useState("");

    const navigate = useNavigate();


    const status = contractorStatusConfig[contractor.status ?? "invited"];


    const handleApprove = () => {
        // approveContractor(contractor.id);
        // navigate("/admin/contractors");
        alert("Contratista aprobado (acción de demostración)");
    };

    const handleReject = () => {
        // rejectContractor(contractor.id, notes);
        setShowRejectModal(false);
        navigate("/admin");
    };

    const handleRequestCorrections = () => {
        // requestCorrections(contractor.id, notes);
        setShowCorrectionModal(false);
        alert("Correcciones solicitadas (acción de demostración)");
    };

    const handleApproveDoc = () => {
        // Agregar argumento doc: ContractorDocument
        // approveDocument(contractor.id, doc.id);
        alert("Documento aprobado (acción de demostración)");
    };

    const handleRejectDoc = () => {
        if (showDocRejectModal) {
            // rejectDocument(contractor.id, showDocRejectModal.id, notes);
            setShowDocRejectModal(null);
            setNotes("");
            alert("Documento rechazado (acción de demostración)");
        }
    };

    const paymentMethodIcon = {
        "bank-transfer": Building2,
        wise: Globe,
        paypal: CreditCard,
    };

    return (
        <div className="space-y-6">
            {/* Back Button */}
            <button
                onClick={() => navigate("/admin")}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Volver a contratistas
            </button>

            {/* Header */}
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold text-foreground">
                            {contractor.personalData.firstName} {contractor.personalData.lastName}
                        </h2>
                        <p className="text-muted-foreground">{contractor.personalData.email}</p>
                        <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
                            {status.label}
                        </span>
                    </div>
                </div>

                {contractor.status === "pending-verification" && (
                    <div className="flex gap-3">
                        <button
                            onClick={() => setShowCorrectionModal(true)}
                            className="px-4 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition-colors"
                        >
                            Solicitar correcciones
                        </button>
                        <button
                            onClick={() => setShowRejectModal(true)}
                            className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
                        >
                            Rechazar
                        </button>
                        <button
                            onClick={handleApprove}
                            className="px-4 py-2 bg-success text-success-foreground rounded-lg hover:bg-success/90 transition-colors"
                        >
                            Aprobar
                        </button>
                    </div>
                )}
            </div>

            {/* Operator Notes */}
            {contractor.operatorNotes && (
                <div className="bg-warning/10 border border-warning/30 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                        <MessageSquare className="w-5 h-5 text-warning-foreground mt-0.5" />
                        <div>
                            <p className="font-medium text-foreground">Notas de operaciones</p>
                            <p className="text-sm text-muted-foreground mt-1">{contractor.operatorNotes}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Info Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Personal Data */}
                <div className="bg-card border border-border rounded-xl p-6">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        <User className="w-5 h-5 text-primary" />
                        Información personal
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Mail className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-foreground">{contractor.personalData.email}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-foreground">{contractor.personalData.phone || "No informado"}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-foreground">
                                {contractor.personalData.address || "No informado"}
                                {contractor.personalData.country && `, ${contractor.personalData.country}`}
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-foreground">
                                {contractor.personalData.dateOfBirth
                                    ? format(new Date(contractor.personalData.dateOfBirth), "dd/MM/yyyy")
                                    : "No informado"}
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <FileText className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-foreground">Identificación fiscal: {contractor.personalData.taxId || "No informada"}</span>
                        </div>
                    </div>
                </div>

                {/* Timeline */}
                <div className="bg-card border border-border rounded-xl p-6">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-primary" />
                        Línea de tiempo
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Invitación</span>
                            <span className="text-sm text-foreground">
                                {format(new Date(contractor.invitedAt), "dd/MM/yyyy")}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Última actualización</span>
                            <span className="text-sm text-foreground">
                                {format(new Date(contractor.lastUpdatedAt), "dd/MM/yyyy HH:mm")}
                            </span>
                        </div>
                        {contractor.contractSignedAt && (
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Contrato firmado</span>
                                <span className="text-sm text-foreground">
                                    {format(new Date(contractor.contractSignedAt), "dd/MM/yyyy")}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Documents */}
                <div className="bg-card border border-border rounded-xl p-6">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-primary" />
                        Documentos ({contractor.documents.length})
                    </h3>
                    {contractor.documents.length > 0 ? (
                        <div className="space-y-3">
                            {contractor.documents.map((doc) => (
                                <div
                                    key={doc.id}
                                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                                >
                                    <div className="flex items-center gap-3">
                                        <FileText className="w-5 h-5 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm font-medium text-foreground">{doc.name}</p>
                                            <p className="text-xs text-muted-foreground capitalize">
                                                {doc.type.replace("-", " ")}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {doc.status === "pending" && (
                                            <>
                                                <button
                                                    onClick={() => handleApproveDoc()}
                                                    className="p-1.5 rounded-lg bg-accent/10 text-success hover:bg-success-foreground/20 transition-colors"
                                                    title="Aprobar"
                                                >
                                                    <CheckCircle2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => setShowDocRejectModal(doc)}
                                                    className="p-1.5 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
                                                    title="Rechazar"
                                                >
                                                    <XCircle className="w-4 h-4" />
                                                </button>
                                            </>
                                        )}
                                        {doc.status === "approved" && (
                                            <span className="flex items-center gap-1 text-xs text-accent">
                                                <CheckCircle2 className="w-4 h-4" />
                                                Aprobado
                                            </span>
                                        )}
                                        {doc.status === "rejected" && (
                                            <span className="flex items-center gap-1 text-xs text-destructive">
                                                <XCircle className="w-4 h-4" />
                                                Rechazado
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground">Todavía no hay documentos cargados.</p>
                    )}
                </div>

                {/* Payment Method */}
                <div className="bg-card border border-border rounded-xl p-6">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-primary" />
                        Método de pago
                    </h3>
                    {contractor.paymentMethod ? (
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                                {(() => {
                                    const Icon = paymentMethodIcon[contractor.paymentMethod.type];
                                    return <Icon className="w-5 h-5 text-primary" />;
                                })()}
                                <div>
                                    <p className="text-sm font-medium text-foreground capitalize">
                                        {contractor.paymentMethod.type.replace("-", " ")}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Moneda: {contractor.paymentMethod.currency}
                                    </p>
                                </div>
                            </div>
                            {contractor.paymentMethod.bankName && (
                                <p className="text-sm text-muted-foreground">
                                    Banco: {contractor.paymentMethod.bankName}
                                </p>
                            )}
                            {contractor.paymentMethod.accountNumber && (
                                <p className="text-sm text-muted-foreground">
                                    Cuenta: {contractor.paymentMethod.accountNumber}
                                </p>
                            )}
                            {contractor.paymentMethod.email && (
                                <p className="text-sm text-muted-foreground">
                                    Email: {contractor.paymentMethod.email}
                                </p>
                            )}
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground">Todavía no hay un método de pago configurado.</p>
                    )}
                </div>
            </div>

            {/* Modals */}
            {(showRejectModal || showCorrectionModal || showDocRejectModal) && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm">
                    <div className="bg-card border border-border rounded-xl p-6 w-full max-w-md mx-4 shadow-xl">
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                            {showRejectModal && "Rechazar solicitud"}
                            {showCorrectionModal && "Solicitar correcciones"}
                            {showDocRejectModal && "Rechazar documento"}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            {showRejectModal && "Indicá el motivo del rechazo de esta solicitud."}
                            {showCorrectionModal && "Detallá las correcciones necesarias."}
                            {showDocRejectModal && `Indicá el motivo del rechazo de "${showDocRejectModal.name}".`}
                        </p>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Escribí tus observaciones..."
                            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                            rows={4}
                        />
                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={() => {
                                    setShowRejectModal(false);
                                    setShowCorrectionModal(false);
                                    setShowDocRejectModal(null);
                                    setNotes("");
                                }}
                                className="flex-1 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => {
                                    if (showRejectModal) handleReject();
                                    if (showCorrectionModal) handleRequestCorrections();
                                    if (showDocRejectModal) handleRejectDoc();
                                }}
                                disabled={!notes.trim()}
                                className={`flex-1 py-2 rounded-lg transition-colors ${notes.trim()
                                    ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    : "bg-muted text-muted-foreground cursor-not-allowed"
                                    }`}
                            >
                                {showRejectModal && "Rechazar"}
                                {showCorrectionModal && "Enviar solicitud"}
                                {showDocRejectModal && "Rechazar documento"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
export default ContractorDetail;



