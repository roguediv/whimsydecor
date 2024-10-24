"use client"
import { CloseInfoForm, StartInfoForm } from "../client/popup/InfoHandler";
import { prismaExecutionService } from "./PrismaExecutionService";

export function endClientQuery(title: string = "", desc: string = "") {
  prismaExecutionService.endQuery();
  if (title === '') {
    CloseInfoForm();
  } else if (title = "end") return null 
  else StartInfoForm({title: title, desc: desc}, true)
  return null;
}