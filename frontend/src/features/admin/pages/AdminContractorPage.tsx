import { useParams } from "react-router-dom";
import AdminHeader from "../components/AdminHeader"
import ContractorDetail from "../components/ContractorDetail"
import { contractors } from "@/app/store";
import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const AdminContractorPage = () => {

    const params = useParams();
    const contractorId = params.id;

    useEffect(() => {
        if (!contractorId) {
            enqueueSnackbar("Contractor ID is missing from the URL.", { variant: "error" });
        }
    }, [contractorId]);

    if (!contractorId) {
        return (
            <section>
                <AdminHeader title="Contractor Details" subtitle="View and manage contractor information" />
                <div className="p-6 space-y-6">
                    <p className="text-sm text-muted-foreground">Contractor ID is missing from the URL.</p>
                    <Link
                        to="/admin"
                        className="inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    >
                        Back to dashboard
                    </Link>
                </div>
            </section>
        )
    }

    const contractor = contractors.find((c) => c.id === contractorId);

    return (
        <section>
            <AdminHeader title="Contractor Details" subtitle="View and manage contractor information" />
            <div className="p-6 space-y-6">

                {!contractor && <p className="text-sm text-muted-foreground">Contractor not found.</p>}
                {contractor && <ContractorDetail contractor={contractor} />}
            </div>
        </section>
    )
}

export default AdminContractorPage