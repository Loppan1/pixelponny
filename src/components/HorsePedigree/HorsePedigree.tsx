import { useEffect, useState } from "react";
import { Horse } from "../../types/types";
import SectionTitle from "../SectionTitle/SectionTitle";
import { findHorsesById } from "../../utility/findHorseById";
import PedigreeCell from "./PedigreeCell";

type HorsePedigreeProps = {
  horse: Horse;
};

type Ancestor = Horse | { name: string } | null;
type AncestorMap = {
  s: Ancestor;
  d: Ancestor;
  ss: Ancestor;
  sd: Ancestor;
  ds: Ancestor;
  dd: Ancestor;
};

const isHorse = (h: Ancestor): h is Horse => {
  return h !== null && typeof h === "object" && "id" in h;
};

const getDisplayAncestor = (
  parent: Ancestor,
  refKey: "sireRef" | "damRef",
  nameKey: "sire" | "dam"
): Ancestor => {
  if (!isHorse(parent)) return null;

  const ref = parent[refKey];
  const name = parent[nameKey];
  if (!ref) return null;

  if (ref === name) return { name: ref };

  return {
    name: name ?? "Unknown",
    id: ref,
  };
};

const HorsePedigree: React.FC<HorsePedigreeProps> = ({ horse }) => {
  const [ancestors, setAncestors] = useState<AncestorMap | null>(null);

  useEffect(() => {
    const loadAncestors = async () => {
      const get = async (
        ref: string | undefined,
        name: string | undefined
      ): Promise<Ancestor> => {
        if (!ref) return null;
        if (ref === name) return { name: ref };
        const results = await findHorsesById(ref);
        return results[0] || { name: ref };
      };

      const s = await get(horse.sireRef, horse.sire);
      const d = await get(horse.damRef, horse.dam);

      const ss = isHorse(s) ? await get(s.sireRef, s.sire) : null;
      const sd = isHorse(s) ? await get(s.damRef, s.dam) : null;
      const ds = isHorse(d) ? await get(d.sireRef, d.sire) : null;
      const dd = isHorse(d) ? await get(d.damRef, d.dam) : null;

      setAncestors({ s, d, ss, sd, ds, dd });
    };

    loadAncestors();
  }, [horse]);

  const getAncestorProps = (ancestor: Ancestor) => {
    if (!ancestor) return { name: "Unknown" };
    if ("name" in ancestor && !("id" in ancestor))
      return { name: ancestor.name };
    return {
      name: ancestor.name ?? "Unknown",
      id: ancestor.id,
      color: ancestor.color,
      breed: ancestor.breed,
    };
  };

  if (!ancestors) return <div>Loading pedigree...</div>;

  const sss = getDisplayAncestor(ancestors.ss, "sireRef", "sire");
  const ssd = getDisplayAncestor(ancestors.ss, "damRef", "dam");
  const sds = getDisplayAncestor(ancestors.sd, "sireRef", "sire");
  const sdd = getDisplayAncestor(ancestors.sd, "damRef", "dam");

  const dss = getDisplayAncestor(ancestors.ds, "sireRef", "sire");
  const dsd = getDisplayAncestor(ancestors.ds, "damRef", "dam");
  const dds = getDisplayAncestor(ancestors.dd, "sireRef", "sire");
  const ddd = getDisplayAncestor(ancestors.dd, "damRef", "dam");

  return (
    <div className="horse-pedigree">
      <SectionTitle title="Pedigree" />
      <div className="section-wrapper horse-pedigree__pedigree">
        <PedigreeCell {...getAncestorProps(ancestors.s)} gen={1} />
        <PedigreeCell {...getAncestorProps(ancestors.ss)} gen={2} />
        <PedigreeCell {...getAncestorProps(sss)} gen={3} />
        <PedigreeCell {...getAncestorProps(ssd)} gen={3} />
        <PedigreeCell {...getAncestorProps(ancestors.sd)} gen={2} />
        <PedigreeCell {...getAncestorProps(sds)} gen={3} />
        <PedigreeCell {...getAncestorProps(sdd)} gen={3} />
        <PedigreeCell {...getAncestorProps(ancestors.d)} gen={1} />
        <PedigreeCell {...getAncestorProps(ancestors.ds)} gen={2} />
        <PedigreeCell {...getAncestorProps(dss)} gen={3} />
        <PedigreeCell {...getAncestorProps(dsd)} gen={3} />
        <PedigreeCell {...getAncestorProps(ancestors.dd)} gen={2} />
        <PedigreeCell {...getAncestorProps(dds)} gen={3} />
        <PedigreeCell {...getAncestorProps(ddd)} gen={3} />
      </div>
    </div>
  );
};

export default HorsePedigree;
