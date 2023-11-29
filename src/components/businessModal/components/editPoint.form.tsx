import common from '@/servers/common'
import {
  MemberType,
  Point,
  PointMap,
  StatusGlobal,
  StatusMap,
  payTypes
} from '@/types'
import { formatMoney } from '@/utils'
import { message } from 'ant-design-vue'
import { FormRender, FormRenderProps, Schema } from 'store-operations-ui'
import { defineComponent, onMounted, reactive, ref, watch } from 'vue'

const editSchema = {
  type: 'object',
  width: '66%',
  rules: {
    menuName: [{ required: true, message: '请输入权限名称' }],
    perms: [{ required: true, message: '请输入权限字符' }]
  },
  properties: {
    parentId: { colStyle: { height: 0 } },
    newParentId: {
      title: '上级菜单',
      widget: 'treeSelect',
      props: {
        treeData: [],
        fieldNames: {
          label: 'label',
          value: 'id',
          children: 'children'
        }
      },
      'ui:hidden': '!formState.value.parentId'
    },
    orderNum: {
      title: '排序',
      type: 'number',
      defaultValue: '1',
      props: {
        options: PointMap,
        precision: 0,
        min: 1
      },
      widget: 'input'
    },
    menuType: {
      title: '权限类型',
      type: 'string',
      defaultValue: Point.目录,
      props: {
        options: PointMap
      },
      widget: 'radio'
    },
    menuName: {
      title: '权限名称',
      type: 'string',
      widget: 'input',
      props: {
        placeholder: '请输入'
      }
    },
    perms: {
      title: '权限字符',
      type: 'string',
      widget: 'input',
      props: {
        placeholder: '请输入'
      },
      'ui:hidden': "formState.value.menuType == 'M'"
    },
    status: {
      title: '权限状态',
      type: 'string',
      defaultValue: StatusGlobal.启用,
      props: {
        options: StatusMap
      },
      widget: 'radio'
    }
  },
  displayType: 'row',
  maxWidth: '340px'
}

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
    const schema = ref({})

    const formRef = ref()
    onMounted(async () => {
      const res: any = await common.permTree()
      editSchema.properties.newParentId.props.treeData = res?.data || []
      schema.value = editSchema
      formRef.value.changeState({
        ...props.formState,
        newParentId: props?.formState?.parentId
      })
    })

    const addPoint = async (data: { [key: string]: any }) => {
      await common.addPerm(data)
      message.success('新增权限成功')
      props.onFinish()
    }

    const editPoint = async (data: { [key: string]: any }) => {
      await common.updatePerm(data)
      message.success('编辑权限成功')
      props.onFinish()
    }

    return () => {
      return (
        <FormRender
          schema={editSchema}
          onFinish={(value) => {
            const cloneValue = { ...value, parentId: value?.newParentId }
            if (value?.menuId) {
              editPoint(cloneValue)
            } else {
              addPoint(cloneValue)
            }
          }}
          onCancel={props.onCancel}
          ref={formRef}
        />
      )
    }
  }
})
