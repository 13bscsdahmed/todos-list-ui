export interface ApiResModel<t> {
  success: boolean;
  message: string;
  data: t;
}
