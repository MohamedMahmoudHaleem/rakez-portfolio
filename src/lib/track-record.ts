import trackRecord from "../../content/track-record.json";
import { pick, type Locale } from "@/config/site";
import { existingAsset } from "./assets";

export type TrackRecordItem = {
  id: string;
  name: string;
  category: string;
  text: string;
  /** Resolved image path, or undefined while the file is missing. */
  image?: string;
};

/** Products team members helped build in earlier roles, resolved for one locale. */
export function getTrackRecord(locale: Locale): TrackRecordItem[] {
  return trackRecord.items.map((item) => ({
    id: item.id,
    name: pick(locale, item.name, item.nameAr),
    category: pick(locale, item.category, item.categoryAr),
    text: pick(locale, item.text, item.textAr),
    image: existingAsset(item.image),
  }));
}
