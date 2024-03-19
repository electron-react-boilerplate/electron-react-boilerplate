export interface ActivityPropsItem {
  tvalue: string | undefined;
  xaxis: string | undefined;
  zaxis: string | undefined;
  fvalue: string | undefined;
  action: string | undefined;
}

export interface ActivityPropsItems {
  activityItems: Array<ActivityPropsItem>;
}
