declare namespace Base {
  type BaseRes = {
    code: number;
    message: string;
    data: any;
  };
  type BaseQuery = {
    paseSize: number;
    current: number;
  };
  type BaseQueryRes = {
    code: number;
    total: number;
    data: any[];
  };
}
