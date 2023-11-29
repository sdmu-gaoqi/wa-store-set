import { TableRender } from 'store-operations-ui'
import { defineComponent, onMounted, ref, toRaw } from 'vue'
import common from '@/servers/common'
import { useRequest } from 'vue-hooks-plus'
import { MenuItem } from 'store-request/dist/type/system'
import { Button, Popconfirm, message } from 'ant-design-vue'
import BusinessModal from '@/components/businessModal/businessModal'
import { BusinessModalType } from '@/components/businessModal/businessModal.type'
import { Point, PointMap } from '@/types'

function buildTree(data: any, parentId: any) {
  let tree = []

  for (let i = 0; i < data.length; i++) {
    if (data[i].parentId === parentId) {
      let node: any = {
        ...data[i],
        parentId: data[i].parentId,
        menuId: data[i].menuId,
        key: data[i].menuId
      }

      let children = buildTree(data, data[i].menuId)
      if (children.length > 0) {
        node.children = children
      } else delete node.children
      tree.push(node)
    }
  }

  return tree
}

const Perm = defineComponent({
  setup: () => {
    const data = ref<MenuItem[]>([])
    const open = ref(false)
    const { run, loading } = useRequest(common.permList, {
      onSuccess: (res) => {
        const result = buildTree(res.data, 0)
        data.value = result
      }
    })
    const formState = ref<{ [key: string]: any }>({})

    const handleSlot = {
      status: ({ index, record }: any) => {
        return (
          <div class={`${record.status == 1 && 'text-red-500'}`}>
            {record.status == '0' ? '启用' : '禁用'}
          </div>
        )
      },
      options: ({ index, record }: any) => {
        return (
          <div class="flex justify-center items-center">
            {record.menuType === Point.目录 && (
              <div
                class="table-btn"
                onClick={() => {
                  open.value = true
                  formState.value = {
                    parentId: record.menuId
                  }
                }}
              >
                新增
              </div>
            )}
            <div
              class="table-btn"
              onClick={() => {
                open.value = true
                formState.value = record
              }}
            >
              编辑
            </div>
            <Popconfirm
              title="是否确认删除"
              onConfirm={async () => {
                await common.deletePerm(record.menuId)
                message.success('删除成功')
                run({})
              }}
            >
              <div class="table-btn-danger">删除</div>
            </Popconfirm>
          </div>
        )
      },
      type: ({ index, record }: any) => {
        const type = PointMap.find((item) => item.value == record.menuType)
        return <div>{type?.label}</div>
      }
    }

    return () => {
      return (
        <div class="bg-white px-[10px]">
          <div class="flex justify-end items-center py-[10px]">
            <Button type="primary" onClick={() => (open.value = true)}>
              新增权限
            </Button>
          </div>
          <a-table
            loading={loading.value}
            columns={[
              {
                title: '菜单名称',
                dataIndex: 'menuName'
              },
              {
                title: '菜单类型',
                dataIndex: 'menuName',
                slots: {
                  customRender: 'type'
                }
              },
              {
                title: '权限标识',
                dataIndex: 'perms'
              },
              {
                title: '状态',
                dataIndex: 'status',
                slots: {
                  customRender: 'status'
                }
              },
              {
                title: '创建时间',
                dataIndex: 'createTime'
              },
              {
                title: '更新时间',
                dataIndex: 'updateTime'
              },
              {
                title: '操作',
                dataIndex: 'options',
                slots: {
                  customRender: 'options'
                }
              }
            ]}
            dataSource={data.value}
            v-slots={handleSlot}
          ></a-table>
          <BusinessModal
            type={BusinessModalType.编辑权限点}
            open={open}
            onCancel={() => {
              open.value = false
              formState.value = {}
            }}
            onFinish={() => {
              run({})
              open.value = false
              formState.value = {}
            }}
            formState={formState.value}
          />
        </div>
      )
    }
  }
})

export default Perm
