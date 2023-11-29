export enum MemberType {
  折扣卡 = 1,
  次卡 = 2
}

export const payTypes = [
  {
    label: '支付宝',
    value: 1
  },
  {
    label: '微信',
    value: 2
  },
  {
    label: '收钱吧 ',
    value: 3
  },
  {
    label: '现金 ',
    value: 4
  }
]
export const memberTypes = [
  {
    label: '折扣卡',
    value: 1
  },
  {
    label: '次卡',
    value: 2
  }
]

export enum RoyaltyType {
  点钟 = 0,
  排钟 = 1
}

export const royaltyTypeMap = [
  {
    label: '点钟',
    value: 0
  },
  {
    label: '排钟',
    value: 1
  }
]

export const PostMap = [
  {
    label: '技师',
    value: '技师'
  },
  {
    label: '收银',
    value: '收银'
  },
  {
    label: '店长',
    value: '店长'
  }
]

export enum Point {
  目录 = 'M',
  菜单 = 'C',
  按钮 = 'F'
}

export const PointMap = [
  {
    label: '目录',
    value: Point.目录
  },
  {
    label: '菜单',
    value: Point.菜单
  },
  {
    label: '按钮',
    value: Point.按钮
  }
]

export enum StatusGlobal {
  启用 = '0',
  停用 = '1'
}

export const StatusMap = [
  {
    label: '启用',
    value: StatusGlobal.启用
  },
  {
    label: '停用',
    value: StatusGlobal.停用
  }
]
