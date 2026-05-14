import { useParams } from "react-router-dom";
import AdminHeader from "../components/AdminHeader"
import ContractorDetail from "../components/ContractorDetail"
import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useContractorsData } from "@/shared/hooks/useContractorsData";

const AdminContractorPage = () => {

    const params = useParams();
    const contractorId = params.id;
    const { findById, isLoading } = useContractorsData();

    useEffect(() => {
        if (!contractorId) {
            enqueueSnackbar("Falta el ID del contratista en la URL.", { variant: "error" });
        }
    }, [contractorId]);

    if (!contractorId) {
        return (
            <section>
                <AdminHeader title="Detalle del contratista" subtitle="Consultá y gestioná la información del contratista" />
                <div className="p-6 space-y-6">
                    <p className="text-sm text-muted-foreground">Falta el ID del contratista en la URL.</p>
                    <Link
                        to="/admin"
                        className="inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    >
                        Volver al panel
                    </Link>
                </div>
            </section>
        )
    }

    if (isLoading) {
        return (
            <section>
                <AdminHeader title="Detalle del contratista" subtitle="Consultá y gestioná la información del contratista" />
                <div className="p-6 space-y-6">
                    <p className="text-sm text-muted-foreground">Cargando contratista...</p>
                </div>
            </section>
        )
    }

    const contractor = findById(contractorId);

    return (
        <section>
            <AdminHeader title="Detalle del contratista" subtitle="Consultá y gestioná la información del contratista" />
            <div className="p-6 space-y-6">

                {!contractor && <p className="text-sm text-muted-foreground">No se encontró el contratista.</p>}
                {contractor && <ContractorDetail contractor={contractor} />}
            </div>
        </section>
    )
}

export default AdminContractorPage