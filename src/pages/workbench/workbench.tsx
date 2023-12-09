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
import work1 from '@/assets/work1.png'
import work2 from '@/assets/work2.png'
import work3 from '@/assets/work3.png'
import work4 from '@/assets/work4.png'
import right1 from '@/assets/right1.png'
import right2 from '@/assets/right2.png'
import right3 from '@/assets/right3.png'
import right4 from '@/assets/right4.png'

const turnoverMap = [
  {
    bg: 'linear-gradient(137deg, #F0ECFF 0%, #F9F3FF 100%)',
    icon: work1,
    title: '日营业额（元）',
    key: 'work1'
  },
  {
    bg: 'linear-gradient(137deg, #D9E2FF 0%, #F9F3FF 100%)',
    icon: work2,
    title: '扫码支付',
    key: 'work2'
  },
  {
    bg: 'linear-gradient(137deg, #ECFFF7 0%, #F9F3FF 100%)',
    icon: work3,
    title: '现金消费',
    key: 'work3'
  },
  {
    bg: 'linear-gradient(137deg, #FFF4EC 0%, #F9F3FF 100%)',
    icon: work4,
    title: '订单销量',
    key: 'work4'
  }
]

const menuMap = [
  {
    icon: right1,
    title: '创建会员',
    path: '/member/add',
    bg: '#FCECE9'
  },
  {
    icon: right2,
    title: '会员充值',
    path: '/member/list',
    bg: '#FDF6DA'
  },
  {
    icon: right3,
    title: '创建订单',
    path: '/order/create',
    bg: '#E1EEFD',
    state: {
      create: true
    }
  },
  {
    icon: right4,
    title: '管理员工',
    path: '/employee/list',
    bg: '#EAF6ED'
  }
]

const Workbench = defineComponent({
  // engineerList
  setup() {
    const { data: engineerList } = useRequest(employee.engineerList)
    const router = useRouter()
    return () => {
      return (
        <div class="overflow-y-hidden">
          <div class={styles.body}>
            <div class={styles.left}>
              <Card title="日营业额" contentClass={styles.baseGroup} showDate>
                {turnoverMap.map((item) => (
                  <BaseCard
                    id={item.key}
                    key={item.key}
                    title={item.title}
                    allMoney="15500"
                    icon={item.icon}
                    bg={item.bg}
                  />
                ))}
              </Card>
              <Card title="数据统计" showDate class={styles.chartCard}>
                <StatisticsCard />
              </Card>
            </div>
            <div class={styles.right}>
              <div class="flex justify-between items-center flex-wrap">
                {menuMap.map((item) => (
                  <div
                    class={`cursor-pointer hover:shadow-lg ${styles.menuItem}`}
                    style={{
                      color: '#fff',
                      background: item.bg,
                      padding: '10px',
                      textAlign: 'center'
                    }}
                    onClick={() => {
                      if (!item.path) {
                        router.push('/member/list')
                        return
                      }
                      router.push({
                        path: item.path
                      })
                      if (item.state) {
                        ;(window as any).routerState = item.state
                      }
                    }}
                  >
                    <img src={item.icon} class="w-[50px]" />
                    <div class="text-[#414141]">{item.title}</div>
                  </div>
                ))}
              </div>
              <Card
                title="技师栏目"
                contentClass={styles.engineerGroup}
                class={styles.enCard}
              >
                {(engineerList as any).value?.rows?.map((item: any) => (
                  <EngineerCard nickName={item.nickName} remark={item.remark} />
                ))}
              </Card>
            </div>
          </div>
        </div>
      )
    }
  }
})

export default Workbench
