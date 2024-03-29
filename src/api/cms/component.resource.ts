import type {
  ComponentData,
  ComponentIdListData,
  ComponentIdsData,
  ComponentRequestData,
  ListAdaptedComponents,
  RequestData,
  SortableRequestData
} from '@/api/models'
import { useRestClient, useRestContext } from '@/api/rest'
import { inject } from '@/config'
import { computed } from 'vue'

export abstract class ComponentResource {
  /**
   * @deprecated
   */
  getComponents!: (
    componentIdList: ComponentIdListData,
    queryParams?: ComponentRequestData & SortableRequestData
  ) => Promise<ListAdaptedComponents>
  search!: (queryParams?: ComponentIdsData & ComponentRequestData & SortableRequestData) => Promise<ListAdaptedComponents>
  getComponent!: (componentId: string, queryParams?: ComponentRequestData & RequestData) => Promise<ComponentData>
}

const componentResource = (): ComponentResource => {
  const { sitePath } = useRestContext()
  const rest = useRestClient(computed(() => `${sitePath.value}/cms/components`))
  return {
    getComponents: (componentIdList: ComponentIdListData, queryParams?: ComponentRequestData & SortableRequestData) =>
      rest.post<ListAdaptedComponents>(componentIdList, { params: queryParams }),
    search: (queryParams?: ComponentIdsData & ComponentRequestData & SortableRequestData) =>
      rest.query<ListAdaptedComponents>({ params: queryParams }),
    getComponent: (componentId: string, queryParams?: ComponentRequestData & RequestData) =>
      rest.get<ComponentData>(componentId, { params: queryParams })
  }
}

export const useComponentResource = () => inject<ComponentResource>(ComponentResource, componentResource())
