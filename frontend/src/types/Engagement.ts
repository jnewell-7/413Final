export interface Entertainer {
  entertainerID: number;
  entStageName: string;
  entSSN: string;
  entStreetAddress: string;
  entCity: string;
  entState: string;
  entZipCode: string;
  entPhoneNumber: string;
  entWebPage: string;
  entEMailAddress: string;
  dateEntered: string;

  /* new booking stats ----------------------------- */
  timesBooked?: number; // how many engagements
  lastBooked?: string; // last StartDate, ISO‑format
}
