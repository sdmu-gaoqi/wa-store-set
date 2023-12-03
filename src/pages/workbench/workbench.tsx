import { defineComponent } from 'vue'
import styles from './style.module.scss'
import BaseCard from './components/baseCard/baseCard'
import Card from './components/card/card'
import EngineerCard from './components/engineerCard/engineerCard'
import { Space } from 'ant-design-vue'
import TurnoverCard from './components/turnoverCard/turnoverCard'
import Cumulative from './components/cumulative/cumulative'
import 订单 from '@/assets/创建订单.svg'
import 会员 from '@/assets/vip.svg'
import 员工 from '@/assets/客户管理.svg'
import 角色 from '@/assets/会员卡.svg'
import 设置 from '@/assets/文档管理-项目类文档.svg'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import RelTimeCard from './components/relTimeCard/relTimeCard'
import StatisticsCard from './components/statisticsCard/statisticsCard'
import employee from '@/servers/employee'
import { useRequest } from 'vue-hooks-plus'

const Workbench = defineComponent({
  // engineerList
  setup() {
    const { data: engineerList } = useRequest(employee.engineerList)
    const router = useRouter()
    const menus = [
      {
        label: '创建订单',
        icon: 订单,
        path: '/order/create',
        background: '#ca96fe'
      },
      {
        label: '创建会员',
        icon: 会员,
        path: '/member/add',
        background: '#b4c69a'
      },
      {
        label: '会员充值',
        icon: 角色,
        path: null,
        background: '#96c9cc'
      },
      {
        label: '管理员工',
        icon: 员工,
        path: '/employee/list',
        background: '#96c9cc'
      },
      {
        label: '管理项目',
        icon: 设置,
        path: '/project/list',
        background: '#c7b4a0'
      }
    ]
    return () => {
      return (
        <div class="overflow-x-auto">
          <div class={styles.body}>
            <div class={styles.left}>
              <Card title="日营业额" contentClass={styles.baseGroup} showDate>
                <BaseCard
                  id="card1"
                  title="日营业额"
                  allMoney="15500"
                  data={[2000, 1500, 1600, 9000, 8000, 9000, 8000, 9000]}
                />
                <BaseCard
                  id="card1"
                  title="扫码支付"
                  allMoney="12500"
                  data={[1000, 1000, 1000, 8000, 5000, 4000, 5000, 4000]}
                />
                <BaseCard
                  id="card1"
                  allMoney="3000"
                  title="现金消费"
                  data={[1000, 500, 500, 1000, 3000, 5000, 3000, 5000]}
                />
                <BaseCard
                  id="card1"
                  allMoney="100"
                  title="订单数量"
                  data={[100, 150, 150, 200]}
                />
              </Card>
              <Card title="技师栏目" contentClass={styles.engineerGroup}>
                <Space size={[20, 20]} wrap>
                  {(engineerList as any).value?.rows?.map((item: any) => (
                    <EngineerCard
                      nickName={item.nickName}
                      remark={item.remark}
                    />
                  ))}
                </Space>
              </Card>
              <Card title="营业额统计" showDate>
                <TurnoverCard />
              </Card>
            </div>
            <div class={styles.right}>
              <Cumulative />
              <div class="flex justify-between items-center">
                {menus.map((item) => (
                  <div
                    class="cursor-pointer hover:shadow-lg"
                    style={{
                      color: '#fff',
                      background: item.background,
                      width: 'calc(20% - 10px)',
                      padding: '10px',
                      textAlign: 'center'
                    }}
                    onClick={() => {
                      if (!item.path) {
                        router.push('/member/list')
                        return
                      }
                      router.push(item.path)
                    }}
                  >
                    <img src={item.icon} class="w-[50px]" />
                    <div>{item.label}</div>
                  </div>
                ))}
              </div>
              <Card title="实时营业额情况" showDate>
                <RelTimeCard />
              </Card>
              <Card title="各项目统计" showDate>
                <StatisticsCard />
              </Card>
            </div>
          </div>
        </div>
      )
    }
  }
})

export default Workbench
