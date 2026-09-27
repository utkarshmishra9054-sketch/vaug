// TEMPORARY dev preview for case study screenshots. Delete before shipping.
import { SCREENS } from "@/components/case-studies/screens";
import { ShotCanvas } from "@/components/case-studies/screens/kit";
import { getCaseStudies } from "@/lib/content";

export default async function ShotsPreview(props: PageProps<"/shots-preview">) {
  const { slug, i } = (await props.searchParams) as { slug?: string; i?: string };
  const studies = (await getCaseStudies()).filter((s) => !slug || s.slug === slug);
  return (
    <div style={{ background: "#ddd", padding: 20, display: "flex", flexDirection: "column", gap: 20, position: "relative", zIndex: 100 }}>
      {studies.flatMap((s) =>
        (SCREENS[s.slug] ?? []).map((Screen, n) =>
          i !== undefined && Number(i) !== n ? null : (
            <div key={`${s.slug}-${n}`} style={{ width: 1280, background: s.tint, padding: 0 }}>
              <ShotCanvas>
                <Screen tint={s.tint} />
              </ShotCanvas>
            </div>
          ),
        ),
      )}
    </div>
  );
}
