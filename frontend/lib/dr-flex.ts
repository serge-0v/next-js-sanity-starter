import { stegaClean } from "next-sanity";

export const DR_FLEX_ACTION = "drFlexToggleAppointments" as const;

export function isDrFlexEnabled(): boolean {
  return process.env.NEXT_PUBLIC_DRFLEX_ENABLED === "true";
}

export function getDrFlexScriptUrl(): string | null {
  const medicalPracticeId = process.env.NEXT_PUBLIC_DRFLEX_MEDICAL_PRACTICE_ID;

  if (!medicalPracticeId) {
    return null;
  }

  const encodedMedicalPracticeId = encodeURIComponent(medicalPracticeId);
  return `https://dr-flex.de/embed.js?medicalPracticeId=${encodedMedicalPracticeId}`;
}

export function getDrFlexEmbedUrl(): string | null {
  const medicalPracticeId = process.env.NEXT_PUBLIC_DRFLEX_MEDICAL_PRACTICE_ID;

  if (!medicalPracticeId) {
    return null;
  }

  const encodedMedicalPracticeId = encodeURIComponent(medicalPracticeId);
  return `https://dr-flex.de/embed?medicalPracticeId=${encodedMedicalPracticeId}`;
}

export function hasDrFlexAction(value: unknown): boolean {
  if (!value) {
    return false;
  }

  if (Array.isArray(value)) {
    return value.some((item) => hasDrFlexAction(item));
  }

  if (typeof value === "object") {
    const record = value as Record<string, unknown>;
    const action =
      typeof record.action === "string" ? stegaClean(record.action) : record.action;

    if (action === DR_FLEX_ACTION) {
      return true;
    }

    return Object.values(record).some((item) => hasDrFlexAction(item));
  }

  return false;
}
