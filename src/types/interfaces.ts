export interface Person {
    id: string | number;
    jan: string | number;
    feb: string | number;
    mar: string | number;
    apr: string | number;
    may: string | number;
    jun: string | number;
    jul: string | number;
    aug: string | number;
    sep: string | number;
    oct: string | number;
    nov: string | number;
    dec: string | number;
  }
  
  export interface EmittedValue {
    id?: string | number;
    customer_id?: string | number;
    key:
      | "id"
      | "jan"
      | "feb"
      | "mar"
      | "apr"
      | "may"
      | "jun"
      | "jul"
      | "aug"
      | "sep"
      | "oct"
      | "nov"
      | "dec"
      | "customer_id"
      | "contract_id"
      | "start_year"
      | "start_month"
      | "start_day"
      | "start_subs"
      | "percent_inc"
      | "end_year"
      | "end_month"
      | "end_day"
      | "term_mths";
    val: string | number;
  }
  
  export interface Contract {
    customer_id: string | number;
    customername: string | number;
    contract_id: string | number;
    startyr: string | number;
    startmth: string | number;
    startday: string | number;
    startsubs: string | number;
    percentinc: string | number;
    endyr: string | number;
    endmth: string | number;
    endday: string | number;
    termmths: string | number;
  }