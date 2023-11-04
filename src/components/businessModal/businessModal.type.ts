export enum BusinessModalType {
  会员充值 = 'memeberPay',
  会员充值记录 = 'memberPayLogs',
  会员消费记录 = 'memberConsumptionRecords',
  会员退卡 = 'memberRefund',
  会员结算 = 'memberSettlement'
}

export type BusinessModalTypes =
  | BusinessModalType.会员充值
  | BusinessModalType.会员充值记录
  | BusinessModalType.会员消费记录
  | BusinessModalType.会员退卡
  | BusinessModalType.会员结算
