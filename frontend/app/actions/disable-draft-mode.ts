"use server";

import { draftMode } from "next/headers";

export async function disableDraftMode() {
  (await draftMode()).disable();
}
