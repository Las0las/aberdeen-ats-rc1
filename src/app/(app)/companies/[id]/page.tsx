import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getCompany } from "@/lib/companies/queries";
import { listContacts } from "@/lib/contacts/queries";
import { StateBadge } from "@/components/ui/badge";
import { EntitySidebar } from "@/components/entity/entity-sidebar";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function CompanyDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  let company: Awaited<ReturnType<typeof getCompany>>;
  try {
    company = await getCompany(supabase, id);
  } catch {
    notFound();
  }

  // Check if this company is also a client — contacts link via client_id
  // Companies table has no direct FK to contacts; contacts belong to clients.
  // We'll show a note about this relationship structure.

  const fmtCurrency = (n: number | null | undefined) =>
    n != null ? `$${n.toLocaleString()}` : "—";

  const fmtPct = (n: number | null | undefined) =>
    n != null ? `${n}%` : "—";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <Link
            href="/companies"
            className="text-xs text-gray-400 hover:text-gray-600"
          >
            ← Companies
          </Link>
          <h1 className="mt-1 text-lg font-semibold text-gray-900">
            {company.name}
          </h1>
          <p className="text-sm text-gray-500">
            {[company.type, company.industry].filter(Boolean).join(" · ") ||
              "No type/industry"}
          </p>
        </div>
        {company.status && <StateBadge state={company.status} />}
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card label="Headquarters" value={company.headquarters ?? "—"} />
        <Card
          label="Employees"
          value={
            company.employee_count != null
              ? company.employee_count.toLocaleString()
              : "—"
          }
        />
        <Card label="Revenue" value={fmtCurrency(company.annual_revenue)} />
        <Card
          label="Website"
          value={company.website ?? "—"}
          href={company.website}
        />
      </div>

      {/* Contact info */}
      <Section title="Contact Information">
        <DL label="Email" value={company.email} />
        <DL label="Phone" value={company.phone} />
        <DL
          label="LinkedIn"
          value={company.linkedin_url}
          href={company.linkedin_url}
        />
      </Section>

      {/* Billing & Rates */}
      <Section title="Billing & Rates">
        <DL label="Payment Terms" value={company.payment_terms} />
        <DL label="Default Bill Rate" value={fmtCurrency(company.default_bill_rate)} />
        <DL label="Default Markup" value={fmtPct(company.default_markup)} />
        <DL
          label="Preferred Fee %"
          value={fmtPct(company.preferred_fee_percentage)}
        />
      </Section>

      {/* Marketplace */}
      <Section title="Marketplace">
        <DL
          label="Marketplace Enabled"
          value={
            company.is_marketplace_enabled == null
              ? "—"
              : company.is_marketplace_enabled
                ? "Yes"
                : "No"
          }
        />
        <DL
          label="Auto-Post Jobs"
          value={
            company.auto_post_to_marketplace == null
              ? "—"
              : company.auto_post_to_marketplace
                ? "Yes"
                : "No"
          }
        />
      </Section>

      {/* Notes */}
      {company.notes && (
        <section className="rounded-lg border bg-white p-4 space-y-2">
          <h2 className="text-sm font-semibold text-gray-800">Notes</h2>
          <p className="whitespace-pre-wrap text-sm text-gray-700">
            {company.notes}
          </p>
        </section>
      )}

      {/* Metadata */}
      <Section title="Record Details">
        <DL
          label="Created"
          value={
            company.created_at
              ? new Date(company.created_at).toLocaleDateString()
              : "—"
          }
        />
        <DL
          label="Updated"
          value={
            company.updated_at
              ? new Date(company.updated_at).toLocaleDateString()
              : "—"
          }
        />
      </Section>

      {/* Activity */}
      <EntitySidebar entityType="company" entityId={id} />
    </div>
  );
}

/* ── Helper components ── */

function Card({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string | null;
}) {
  return (
    <div className="rounded-lg border bg-white p-4">
      <p className="text-xs font-medium uppercase text-gray-400">{label}</p>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 block truncate text-sm text-blue-600 hover:underline"
        >
          {value}
        </a>
      ) : (
        <p className="mt-1 truncate text-sm text-gray-800">{value}</p>
      )}
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-lg border bg-white p-4 space-y-3">
      <h2 className="text-sm font-semibold text-gray-800">{title}</h2>
      <dl className="grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
        {children}
      </dl>
    </section>
  );
}

function DL({
  label,
  value,
  href,
}: {
  label: string;
  value: string | null | undefined;
  href?: string | null;
}) {
  return (
    <div>
      <dt className="text-xs text-gray-400">{label}</dt>
      {href ? (
        <dd>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {value ?? "—"}
          </a>
        </dd>
      ) : (
        <dd className="text-gray-700">{value ?? "—"}</dd>
      )}
    </div>
  );
}
