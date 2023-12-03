import { MemberType, payTypes } from '@/types'
import { formatMoney } from '@/utils'
import { FormRender, FormRenderProps, Schema } from 'store-operations-ui'
import { defineComponent, onMounted, ref } from 'vue'
import common from '@/servers/common'
import { Button, Tree, TreeSelect, message } from 'ant-design-vue'
import role from '@/servers/role'

export default defineComponent({
  props: {
    onFinish: Function,
    onCancel: Function,
    formState: Object
  },
  // @ts-ignore
  setup: (
    props: FormRenderProps & { formState: Record<string, any>; onFinish?: any }
  ) => {
    const treeData = ref<any[]>([])
    const checkedKeys = ref<any[]>([])
    const roleInfo = ref<any>({})
    const expandKeys = ref<any>([])
    onMounted(async () => {
      const roleId = props.formState?.roleId
      if (roleId) {
        const _roleInfo = await role.roleInfo(roleId)
        roleInfo.value = (_roleInfo as any)?.data
        const rolePermTree: any = await common.rolePermTree(roleId)
        treeData.value = rolePermTree.menus
        checkedKeys.value = rolePermTree.checkedKeys
        expandKeys.value = rolePermTree.menus.map((item: any) => item.id)
      }
    })

    const onSave = async () => {
      role.updateRole({
        ...roleInfo.value,
        roleId: props.formState.roleId,
        menuIds: checkedKeys.value
      })
      message.success('权限配置成功')
      if (props.onFinish) {
        props.onFinish()
      }
    }

    return () => {
      return (
        <div class="py-[10px]">
          <Tree
            virtual
            class="pl-[150px]"
            height={500}
            checkedKeys={checkedKeys.value}
            treeData={treeData.value}
            fieldNames={{
              title: 'label',
              key: 'id',
              children: 'children'
            }}
            expandedKeys={expandKeys.value}
            onExpand={(value) => (expandKeys.value = value)}
            checkable
            onCheck={(v) => {
              checkedKeys.value = v as any[]
            }}
          ></Tree>
          <div class="flex justify-end items-center py-[5px] px-[50px]">
            <Button type="primary" onClick={onSave}>
              保存
            </Button>
          </div>
        </div>
      )
    }
  }
})
