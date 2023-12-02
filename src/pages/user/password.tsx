import route from '@/route'
import user from '@/servers/user'
import { logout } from '@/utils'
import { Button, Form, Input, message } from 'ant-design-vue'
import { defineComponent, ref } from 'vue'
import { isEmpty } from 'wa-utils'

const Password = defineComponent({
  setup() {
    const formState = ref<
      Record<
        'oldPassword' | 'newPassword' | 'confirmPassword',
        string | undefined
      >
    >({
      oldPassword: undefined,
      newPassword: undefined,
      confirmPassword: undefined
    })
    const validatePass = async (_rule: any, value: string) => {
      const { newPassword, confirmPassword } = formState.value
      if (isEmpty(newPassword) || isEmpty(confirmPassword)) {
        return Promise.resolve('')
      } else if (newPassword !== confirmPassword) {
        return Promise.reject('两次输入的密码不一致')
      } else {
        return Promise.resolve('')
      }
    }
    const onFinish = async () => {
      await user.changePassword({
        oldPassword: formState.value.oldPassword || '',
        newPassword: formState.value.newPassword || ''
      })
      message.success('密码修改成功, 请重新登录')
      logout()
      route.replace('login')
    }
    return () => {
      return (
        <div class="bg-white w-[100%] h-[100%] pt-[50px]">
          <Form
            labelCol={{ span: 6 }}
            class="w-[500px] m-auto"
            onFinish={onFinish}
            model={formState.value}
            rules={{
              oldPassword: [
                { required: true, message: '请输入原密码', whitespace: true }
              ],
              newPassword: [
                { required: true, message: '请输入新密码', whitespace: true },
                {
                  // @ts-ignore
                  validator: validatePass
                }
              ],
              confirmPassword: [
                { required: true, message: '请输入新密码', whitespace: true },
                {
                  // @ts-ignore
                  validator: validatePass
                }
              ]
            }}
          >
            <Form.Item label="原密码" name="oldPassword">
              <Input.Password
                autocomplete="new-password"
                placeholder="请输入"
                onUpdate:value={(v) => {
                  formState.value = {
                    ...formState.value,
                    oldPassword: v || ''
                  }
                }}
                value={formState.value.oldPassword}
              />
            </Form.Item>
            <Form.Item label="新密码" name="newPassword">
              <Input.Password
                autocomplete="new-password"
                placeholder="请输入"
                name="newPassword"
                value={formState.value.newPassword}
                onUpdate:value={(v) => {
                  formState.value = {
                    ...formState.value,
                    newPassword: v || ''
                  }
                }}
              />
            </Form.Item>
            <Form.Item label="确认密码" name="confirmPassword">
              <Input.Password
                autocomplete="new-password"
                placeholder="请输入"
                name="confirmPassword"
                value={formState.value.confirmPassword}
                onUpdate:value={(v) => {
                  formState.value = {
                    ...formState.value,
                    confirmPassword: v || ''
                  }
                }}
              />
            </Form.Item>
            <Button type="primary" class="m-auto block" htmlType="submit">
              修改密码
            </Button>
          </Form>
        </div>
      )
    }
  }
})

export default Password
