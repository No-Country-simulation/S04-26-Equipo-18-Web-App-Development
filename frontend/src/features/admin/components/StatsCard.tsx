import { contractors } from "@/app/store";
import { Users, Clock, CheckCircle2, AlertTriangle } from "lucide-react";

export function StatsCards() {

    const stats = [
        {
            label: "Total Contractors",
            value: contractors.length,
            icon: Users,
            color: "bg-primary/10 text-primary",
        },
        {
            label: "In Progress",
            value: contractors.filter((c) => c.status === "in-progress").length,
            icon: Clock,
            color: "bg-warning/10 text-warning-foreground",
        },
        {
            label: "Pending Verification",
            value: contractors.filter((c) => c.status === "pending-verification").length,
            icon: AlertTriangle,
            color: "bg-warning/10 text-warning-foreground",
        },
        {
            label: "Approved",
            value: contractors.filter((c) => c.status === "approved").length,
            icon: CheckCircle2,
            color: "bg-accent/10 text-accent",
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