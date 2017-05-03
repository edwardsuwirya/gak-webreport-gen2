export class ArticleGroup {
  s_articleGroupCode: string;
  s_articleGroupRealCode: string;
  s_articleGroupName: string;
  s_articleGroupDisplayName: string;
  s_articleGroupOneBill: string;
  i_articleGroupCreateID: number;
  d_articleGroupCreateDate: Date;
  i_articleGroupDeleteID: number;
  d_articleGroupDeleteDate: Date;
  i_articleGroupUpdateID: number;
  d_articleGroupUpdateDate: Date;
  s_articleGroupActive: string;

  constructor(s_articleGroupCode: string, s_articleGroupRealCode: string, s_articleGroupName: string,
              s_articleGroupDisplayName: string, s_articleGroupOneBill: string) {
    this.s_articleGroupCode = s_articleGroupCode;
    this.s_articleGroupRealCode = s_articleGroupRealCode;
    this.s_articleGroupName = s_articleGroupName;
    this.s_articleGroupDisplayName = s_articleGroupDisplayName;
    this.s_articleGroupOneBill = s_articleGroupOneBill;
  }
}

