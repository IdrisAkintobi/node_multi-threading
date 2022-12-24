export interface WorkerMem {
  Publish_Date?: string;
  Record_Count?: string;
}

export interface AppMem {
  status?: "processing" | "completed";
}

export interface EntryType {
  uid: number;
}
