import { Users, Clock, CheckCircle2, AlertTriangle } from "lucide-react";
import { useContractorsData } from "@/shared/hooks/useContractorsData";
import { contractorStatusConfig } from "@/shared/config/contractorStatusConfig";

export function StatsCards() {
    const { contractors, isLoading } = useContractorsData();

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-card border border-border rounded-xl p-5">
                    <p className="text-sm text-muted-foreground">Loading stats...</p>
                </div>
            </div>
        )
    }

    const stats = [
        {
            label: "Total Contractors",
            value: contractors.length,
            icon: Users,
            color: contractorStatusConfig["invited"].color,
        },
        {
            label: "In Progress",
            value: contractors.filter((c) => c.status === "in-progress").length,
            icon: Clock,
            color: contractorStatusConfig["in-progress"].color,
        },
        {
            label: "Pending Verification",
            value: contractors.filter((c) => c.status === "pending-verification").length,
            icon: AlertTriangle,
            color: contractorStatusConfig["pending-verification"].color,
        },
        {
            label: "Approved",
            value: contractors.filter((c) => c.status === "approved").length,
            icon: CheckCircle2,
            color: contractorStatusConfig["approved"].color,
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                    <div
                        key={stat.label}
                        className="bg-card border border-border rounded-xl p-5"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm text-muted-foreground">{stat.label}</span>
                            <div className={`p-2 rounded-lg ${stat.color}`}>
                                <Icon className="w-4 h-4" />
                            </div>
                        </div>
                        <p className="text-3xl font-semibold text-foreground">{stat.value}</p>
                    </div>
                );
            })}
        </div>
    );
}
export default StatsCards;