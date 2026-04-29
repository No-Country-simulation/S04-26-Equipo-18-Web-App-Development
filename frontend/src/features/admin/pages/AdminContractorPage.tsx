import { useParams } from "react-router-dom";
import AdminHeader from "../components/AdminHeader"
import ContractorDetail from "../components/ContractorDetail"
import { contractors } from "@/app/store";
import { enqueueSnackbar } from "notistack";

const AdminContractorPage = () => {

    const params = useParams();
    const contractorId = params.id;

    if (!contractorId) {
        enqueueSnackbar("Contractor ID is missing from the URL.", { variant: "error" });
        return (
            <div>
                <AdminHeader title="Contractor Details" subtitle="View and manage contractor information" />
                <div className="p-6 space-y-6">
                    <p className="text-sm text-muted-foreground">Contractor ID is missing from the URL.</p>
                </div>
                <button onClick={() => window.history.back()}>Go Back</button>
            </div>
        )
    }

    const contractor = contractors.find((c) => c.id === contractorId);

    return (
        <div>
            <AdminHeader title="Contractor Details" subtitle="View and manage contractor information" />
            <div className="p-6 space-y-6">

                {!contractor && <p className="text-sm text-muted-foreground">Contractor not found.</p>}
                {contractor && <ContractorDetail contractor={contractor} />}
            </div>
        </div>
    )
}

export default AdminContractorPage