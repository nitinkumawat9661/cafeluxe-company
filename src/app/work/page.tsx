import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { InnerPageShell } from "@/components/inner-page-shell";
import { caseStudies } from "@/lib/case-studies";
import { routePageContent } from "@/lib/content";
import { createSeoMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return createSeoMetadata({
    title: routePageContent.work.title,
    description: routePageContent.work.description,
    path: "/work",
  });
}

export default function WorkPage() {
  return (
    <InnerPageShell
      eyebrow="Work"
      title="Software systems built for real operations."
      description={routePageContent.work.description}
    >
      <section className="mx-auto max-w-6xl px-5 pb-16 md:px-6">
        <div className="grid gap-4 lg:grid-cols-3">
          {caseStudies.map((study, index) => (
            <Link
              key={study.slug}
              href={`/work/${study.slug}`}
              className="group flex min-h-[31rem] flex-col overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#090806] p-6 transition duration-300 hover:-translate-y-1 hover:border-[rgba(201,155,71,.35)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[.18em] text-[var(--gold)]">{study.category}</p>
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-[.12em] text-[#776b59]">{study.status}</p>
                </div>
                <span className="text-xs font-black text-[#5f5648]">0{index + 1}</span>
              </div>

              <div className="mt-10 grid h-40 grid-cols-[.32fr_.68fr] gap-2 rounded-[1.2rem] border border-white/10 bg-black/30 p-2" aria-hidden="true">
                <div className="grid gap-2">
                  <span className="rounded-lg border border-[rgba(201,155,71,.18)] bg-[rgba(201,155,71,.055)]" />
                  <span className="rounded-lg border border-white/10 bg-white/[.025]" />
                  <span className="rounded-lg border border-white/10 bg-white/[.025]" />
                </div>
                <div className="grid grid-rows-[.62fr_.38fr] gap-2">
                  <span className="rounded-lg border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,.04),rgba(201,155,71,.04))]" />
                  <div className="grid grid-cols-3 gap-2">
                    <span className="rounded-md border border-white/10 bg-white/[.025]" />
                    <span className="rounded-md border border-[rgba(201,155,71,.15)] bg-[rgba(201,155,71,.04)]" />
                    <span className="rounded-md border border-white/10 bg-white/[.025]" />
                  </div>
                </div>
              </div>

              <h2 className="mt-7 text-3xl font-black tracking-[-0.04em] text-[#f8efd9]">{study.title}</h2>
              <p className="mt-4 text-sm leading-7 text-[#bcae94]">{study.summary}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {study.stack.slice(0, 4).map((item) => (
                  <span key={item} className="rounded-full border border-white/10 px-3 py-2 text-[10px] font-bold text-[#a99b82]">{item}</span>
                ))}
              </div>

              <div className="mt-auto flex items-center justify-between pt-8 text-xs font-black uppercase tracking-[.14em] text-[var(--gold)]">
                <span>View case study</span>
                <ArrowUpRight size={16} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/[.03] p-6">
          <p className="text-xs font-black uppercase tracking-[.18em] text-[var(--gold)]">Proof policy</p>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#d6c8ae]">
            These case studies describe product scope and engineering decisions supported by the underlying codebases. We do not publish fabricated revenue, conversion or efficiency metrics.
          </p>
        </div>
      </section>
    </InnerPageShell>
  );
}
