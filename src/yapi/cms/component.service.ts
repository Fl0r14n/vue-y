import type {
  ComponentData,
  ComponentIdListData,
  ComponentIdsData,
  ComponentRequestData,
  ListAdaptedComponents,
  RequestData,
  SortableRequestData
} from '@/yapi/models'
import { RestClient } from '@/yapi/rest'

export class ComponentService extends RestClient {
  getEndpoint() {
    return `${this.basePath}/cms/components`
  }

  /**
   * @deprecated
   * Given a list of component identifiers in body, return cms component data.
   * @param {ComponentIdListData} componentIdList
   * @param {ComponentRequestData & SortableRequestData} queryParams
   */
  getComponents(componentIdList: ComponentIdListData, queryParams?: ComponentRequestData & SortableRequestData) {
    return this.post<ListAdaptedComponents>(componentIdList, { params: queryParams })
  }

  /**
   * Finds cms components by the specified IDs. When none is provided, this will retrieve all components <br/>
   * The components list will be filtered by the given catalog, product or category restrictions, as well as by the pagination information.
   * The result will be sorted in the specified order.
   * @param {{componentIds: string[]} & ComponentRequestData & SortableRequestData} queryParams
   */
  search(queryParams?: ComponentIdsData & ComponentRequestData & SortableRequestData) {
    return this.query<ListAdaptedComponents>({ params: queryParams })
  }

  /**
   * Given a component identifier, return cms component data.
   * @param {string} componentId
   * @param {ComponentRequestData & RequestData} queryParams
   */
  getComponent(componentId: string, queryParams?: ComponentRequestData & RequestData) {
    return this.get<ComponentData>(componentId, { params: queryParams })
  }
}
