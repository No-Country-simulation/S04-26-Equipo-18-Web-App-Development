import { useState } from "react";
import {
  Eye, MoreHorizontal, XCircle,
  User, ChevronDown, Filter
} from "lucide-react";
import type { Contractor, ContractorStatus } from "@/shared/types";
import { Link } from "react-router-dom";
import { useContractorsData } from "@/shared/hooks/useContractorsData";
import { contractorStatusConfig } from "@/shared/config/contractorStatusConfig";

const statusFilters: ContractorStatus[] = [
  "in-progress",
  "pending-verification",
  "corrections-needed",
  "approved",
  "rejected",
];

export function ContractorTable() {
  const [statusFilter, setStatusFilter] = useState<ContractorStatus | "all">("all");
  const [showFilters, setShowFilters] = useState(false);
  const { contractors, isLoading } = useContractorsData();

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-xl p-6">
        <p className="text-sm text-muted-foreground">Loading contractors...</p>
      </div>
    )
  }

  const filteredContractors = contractors.filter((c) =>
    statusFilter === "all" ? true : c.status === statusFilter
  );

  const getProgress = (contractor: Contractor) => {
    const totalSteps = 5;
    const completed = contractor.completedSteps.length;
    return Math.round((completed / totalSteps) * 100);
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      {/* Filters */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border hover:bg-muted transition-colors text-sm"
          >
            <Filter className="w-4 h-4" />
            Filter
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </button>

          {statusFilter !== "all" && (
            <button
              onClick={() => setStatusFilter("all")}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm"
            >
              {contractorStatusConfig[statusFilter].label}
              <XCircle className="w-3 h-3" />
            </button>
          )}
        </div>

        <p className="text-sm text-muted-foreground">
          {filteredContractors.length} contractor{filteredContractors.length !== 1 ? "s" : ""}
        </p>
      </div>

      {showFilters && (
        <div className="p-4 border-b border-border bg-muted/30">
          <p className="text-sm font-medium text-foreground mb-3">Filter by status</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${statusFilter === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-background border border-border hover:bg-muted"
                }`}
            >
              All
            </button>
            {statusFilters.map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${statusFilter === status
                  ? "bg-primary text-primary-foreground"
                  : "bg-background border border-border hover:bg-muted"
                  }`}
              >
                {contractorStatusConfig[status].label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">Contractor</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">Country</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">Progress</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">Last Updated</th>
              <th className="text-right px-6 py-3 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredContractors.map((contractor) => {
              const status = contractorStatusConfig[contractor.status];
              const StatusIcon = status.icon;
              const progress = getProgress(contractor);

              return (
                <tr key={contractor.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {contractor.personalData.firstName} {contractor.personalData.lastName}
                        </p>
                        <p className="text-sm text-muted-foreground">{contractor.personalData.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-foreground">{contractor.personalData.country || "—"}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.color}`}>
                      <StatusIcon className="w-3 h-3" />
                      {status.label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-32">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-muted-foreground">{progress}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-muted-foreground">
                      {new Date(contractor.lastUpdatedAt).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/admin/contractor/${contractor.id}`}
                        className="p-2 rounded-lg hover:bg-muted transition-colors"
                      >
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      </Link>
                      <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                        <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filteredContractors.length === 0 && (
        <div className="p-12 text-center">
          <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-medium text-foreground mb-1">No contractors found</h3>
          <p className="text-sm text-muted-foreground">
            {statusFilter === "all"
              ? "No contractors have been invited yet."
              : `No contractors with status "${contractorStatusConfig[statusFilter].label}".`}
          </p>
        </div>
      )}
    </div>
  );
}
