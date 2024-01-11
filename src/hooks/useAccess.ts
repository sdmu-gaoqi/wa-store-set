import { adminPerm } from '@/constant'
import { useStore } from 'vuex'
import userStore from '@/store/modules/userInfo'

const useAccess = () => {
  const store = useStore()
  const perms = store?.state?.userInfo?.perms || userStore?.state?.perms || []
  return {
    view: perms.includes('view') || perms.includes(adminPerm)
  }
}

export default useAccess
