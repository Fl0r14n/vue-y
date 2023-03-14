import type { ComponentData, NavNodeData } from '@/api'
import { useCmsComponentStore } from '@/cms'

const fetchIds = (value: NavNodeData, ids: string[]) => {
  value.entries?.forEach(v => v.itemId && ids.push(v.itemId))
  value.children?.map(v => fetchIds(v, ids))
}

const changeEntry = (parent: NavNodeData, cms: ComponentData) => {
  const found = parent.entries?.find(v => v.itemId === cms.uid)
  if (found) {
    Object.assign(found, cms)
  } else {
    parent.children?.forEach(child => changeEntry(child, cms))
  }
}

export const navNode = async (value?: NavNodeData) => {
  if (value) {
    const { search } = useCmsComponentStore()
    const result = JSON.parse(JSON.stringify(value)) //clone
    const componentIds: string[] = []
    fetchIds(result, componentIds)
    const components = await search(componentIds)
    components?.forEach(component => changeEntry(result, component))
    return result
  }
}
