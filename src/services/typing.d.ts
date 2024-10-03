declare namespace Base {
  type ResBase = {
    code?: number;
    message?: string;
    data?: any;
  };
  type TableQuery = {
    paseSize?: number;
    current?: number;
  };
  type ResTableQueryBase = {
    code: number;
    total: number;
    data: any[];
  };
}
