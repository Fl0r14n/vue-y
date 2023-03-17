export enum SiteChannel {
  B2B = 'B2B',
  B2C = 'B2C'
}

export enum UrlEncodingAttributes {
  STOREFRONT = 'storefront',
  LANGUAGE = 'language',
  CURRENCY = 'currency'
}

export enum UserType {
  USER = 'current',
  ANONYMOUS = 'anonymous'
}

export enum DaysOfWeek {
  SUNDAY = 'SUNDAY',
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY'
}

export enum FieldLevelMapping {
  BASIC = 'BASIC',
  DEFAULT = 'DEFAULT',
  FULL = 'FULL'
}

export enum NotificationChannel {
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  SITE_MESSAGE = 'SITE_MESSAGE'
}

export enum NotificationType {
  NOTIFICATION = 'NOTIFICATION'
}

export enum OrderStatus {
  CHECKED_VALID = 'CHECKED_VALID',
  CHECKED_INVALID = 'CHECKED_INVALID',
  PAYMENT_AUTHORIZED = 'PAYMENT_AUTHORIZED',
  PAYMENT_NOT_AUTHORIZED = 'PAYMENT_NOT_AUTHORIZED',
  PAYMENT_AMOUNT_RESERVED = 'PAYMENT_AMOUNT_RESERVED',
  PAYMENT_AMOUNT_NOT_RESERVED = 'PAYMENT_AMOUNT_NOT_RESERVED',
  PAYMENT_CAPTURED = 'PAYMENT_CAPTURED',
  PAYMENT_NOT_CAPTURED = 'PAYMENT_NOT_CAPTURED',
  FRAUD_CHECKED = 'FRAUD_CHECKED',
  ORDER_SPLIT = 'ORDER_SPLIT',
  PROCESSING_ERROR = 'PROCESSING_ERROR',
  WAIT_FRAUD_MANUAL_CHECK = 'WAIT_FRAUD_MANUAL_CHECK',
  PAYMENT_NOT_VOIDED = 'PAYMENT_NOT_VOIDED',
  TAX_NOT_VOIDED = 'TAX_NOT_VOIDED',
  TAX_NOT_COMMITTED = 'TAX_NOT_COMMITTED',
  TAX_NOT_REQUOTED = 'TAX_NOT_REQUOTED'
}

export enum PageType {
  CONTENT = 'ContentPage',
  PRODUCT = 'ProductPage',
  CATEGORY = 'CategoryPage',
  CATALOG = 'CatalogPage'
}

export enum QuoteAction {
  APPROVE = 'APPROVE',
  CANCEL = 'CANCEL',
  CHECKOUT = 'CHECKOUT',
  EDIT = 'EDIT',
  REJECT = 'REJECT',
  SUBMIT = 'SUBMIT'
}

export enum SeoRobots {
  INDEX_FOLLOW = 'INDEX_FOLLOW',
  INDEX_NOFOLLOW = 'INDEX_NOFOLLOW',
  NOINDEX_FOLLOW = 'NOINDEX_FOLLOW',
  NOINDEX_NOFOLLOW = 'NOINDEX_NOFOLLOW'
}

export enum PeriodRange {
  DAY = 'DAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
  QUARTER = 'QUARTER',
  YEAR = 'YEAR'
}

export enum ProductReferenceType {
  ACCESSORIES = 'ACCESSORIES',
  BASE_PRODUCT = 'BASE_PRODUCT',
  CONSISTS_OF = 'CONSISTS_OF',
  DIFF_ORDER_UNIT = 'DIFF_ORDERUNIT',
  FOLLOWUP = 'FOLLOWUP',
  MANDATORY = 'MANDATORY',
  SIMILAR = 'SIMILAR',
  SELECT = 'SELECT',
  SPARE_PART = 'SPAREPART',
  OTHERS = 'OTHERS',
  UP_SELLING = 'UPSELLING',
  CROSS_SELLING = 'CROSSELLING'
}

export enum ReturnRequestStatus {
  CANCELLING = 'CANCELLING'
}

export enum SearchQueryContext {
  DEFAULT = 'DEFAULT',
  SUGGESTIONS = 'SUGGESTIONS'
}

export enum Severity {
  ERROR = 'ERROR',
  WARNING = 'WARNING',
  INFO = 'INFO',
  SUCCESS = 'SUCCESS'
}

export enum StockLevelStatus {
  STOCK_OK = 'inStock',
  STOCK_LOW = 'lowStock',
  STOCK_OUT = 'outOfStock'
}

export enum CountryDestinationType {
  SHIPPING = 'SHIPPING',
  BILLING = 'BILLING'
}

export enum PromotionType {
  ALL = 'all',
  PRODUCT = 'product',
  ORDER = 'order'
}

export enum B2BPaymentType {
  CARD = 'CARD',
  ACCOUNT = 'ACCOUNT'
}

export enum CCPRenderType {
  STRING = 'STRING',
  NUMERIC = 'NUMERIC',
  CHECK_BOX = 'CHECK_BOX',
  CHECK_BOX_LIST = 'CHECK_BOX_LIST',
  RADIO_BUTTON = 'RADIO_BUTTON',
  RADIO_BUTTON_ADDITIONAL_INPUT = 'RADIO_BUTTON_ADDITIONAL_INPUT',
  DROPDOWN = 'DROPDOWN',
  DROPDOWN_ADDITIONAL_INPUT = 'DROPDOWN_ADDITIONAL_INPUT',
  READ_ONLY = 'READ_ONLY',
  NOT_IMPLEMENTED = 'NOT_IMPLEMENTED',
  SINGLE_SELECTION_IMAGE = 'SINGLE_SELECTION_IMAGE',
  MULTI_SELECTION_IMAGE = 'MULTI_SELECTION_IMAGE',
  READ_ONLY_SINGLE_SELECTION_IMAGE = 'READ_ONLY_SINGLE_SELECTION_IMAGE',
  READ_ONLY_MULTI_SELECTION_IMAGE = 'READ_ONLY_MULTI_SELECTION_IMAGE'
}

export enum CCPValidationType {
  NUMERIC = 'NUMERIC',
  NONE = 'NONE'
}

export interface RequestData {
  curr?: string
  lang?: string
  fields?: FieldLevelMapping | string

  [x: string]: any
}

export interface PageableRequestData extends RequestData {
  pageSize?: number
  currentPage?: number
}

export interface SortableRequestData extends PageableRequestData {
  sort?: string
}

export interface WithTotalRequestData extends SortableRequestData {
  needsTotal?: boolean
}

export interface QueryRequestData extends SortableRequestData {
  query?: string
  searchQueryContext?: SearchQueryContext
  q?: string
}

export interface ComponentRequestData {
  catalogCode?: string
  categoryCode?: string
  productCode?: string
}

export interface CmsPageRequestData extends RequestData {
  code?: string
  pageLabelOrId?: string
  pageType?: PageType
  cmsTicketId?: string
}

export interface PageableResponseData {
  pagination?: PaginationData
}

export interface SortableResponseData extends PageableResponseData {
  sorts?: SortData[]
}

export interface CartRequestData extends RequestData {
  oldCartId?: string
  toMergeCartGuid?: string
}

export interface Item {
  creationtime?: string | Date
  modifiedtime?: string | Date
}

export interface AbstractMediaData extends Item {
  mime?: string
  size?: number
  dataPK?: number
  location?: string
  locationHash?: string
  realFileName?: string
}

export interface MediaData extends AbstractMediaData {
  code?: string
  url?: string
  description?: string
  downloadUrl?: string
  altText?: string
  catalogId?: string
}

export interface MediaContainerData {
  desktop?: MediaData
  mobile?: MediaData
  tablet?: MediaData
  widescreen?: MediaData

  [x: string]: any
}

export interface ComponentData extends Item {
  container?: string | boolean
  properties?: object
  name?: string
  typeCode?: string
  uid?: string
  uuid?: string

  [key: string]: any
}

export interface ComponentListData {
  component?: ComponentData[]
}

export interface ContentSlotData {
  components?: ComponentListData
  properties?: object
  name?: string
  position?: string
  slotId?: string
  slotShared?: boolean
  slotStatus?: string
  slotUuid?: string
}

export interface ContentSlotListData {
  contentSlot: ContentSlotData[]
}

export interface CMSPageData {
  contentSlots?: ContentSlotListData
  defaultPage?: boolean
  properties?: object
  name?: string
  label?: string
  template?: string
  title?: string
  typeCode?: string | PageType
  description?: string
  keywords?: string
  uid?: string
  uuid?: string
  robotTag?: SeoRobots
}

export interface NavNodeEntryData extends ComponentData {
  itemId?: string
  itemSuperType?: string
  itemType?: string
}

export interface NavNodeData {
  active?: any // nav structure helper object
  title?: string
  uid?: string
  children?: NavNodeData[]
  entries?: NavNodeEntryData[]
}

export interface AbstractCatalogItemData {
  id?: string
  lastModified?: string
  name?: string | Date
  url?: string
}

export interface AbstractOrderData {
  appliedOrderPromotions?: PromotionResultData[]
  appliedProductPromotions?: PromotionResultData[]
  appliedVouchers?: VoucherData[]
  calculated?: boolean
  code?: string
  deliveryAddress?: AddressData
  deliveryCost?: PriceData
  deliveryItemsQuantity?: number
  deliveryMode?: DeliveryModeData
  deliveryOrderGroups?: DeliveryOrderEntryGroupData[]
  entries?: OrderEntryData[]
  expirationTime?: string | Date
  guid?: string
  name?: string
  net?: boolean
  orderDiscounts?: PriceData
  paymentInfo?: PaymentDetailsData
  pickupItemsQuantity?: number
  pickupOrderGroups?: PickupOrderEntryGroupData[]
  productDiscounts?: PriceData
  purchaseOrderNumber?: string
  site?: string
  store?: string
  subTotal?: PriceData
  totalDiscounts?: PriceData
  totalItems?: number
  totalPrice?: PriceData
  totalPriceWithTax?: PriceData
  totalTax?: PriceData
  user?: PrincipalData
}

export interface AddressData {
  cellphone?: string
  companyName?: string
  country?: CountryData
  defaultAddress?: boolean
  district?: string
  email?: string
  firstName?: string
  formattedAddress?: string
  id?: string
  lastName?: string
  line1?: string
  line2?: string
  phone?: string
  postalCode?: string
  region?: RegionData
  shippingAddress?: boolean
  title?: string
  titleCode?: string
  town?: string
  visibleInAddressBook?: boolean
}

export interface AddressListData {
  addresses: AddressData[]
}

export interface AddressValidationData {
  decision?: string
  errors?: ErrorListData
  suggestedAddresses?: AddressData[]
}

export interface B2BApprovalProcessData {
  code: string
  name?: string
}

export interface B2BApprovalProcessListData {
  approvalProcesses: B2BApprovalProcessData[]
}

export interface B2BCostCenterData extends B2BCostCenterShallowData {
  assignedBudgets?: BudgetShallowData[]
  unit?: B2BUnitData
}

export interface B2BCostCenterListData extends SortableResponseData {
  costCenters: B2BCostCenterData[]
}

export interface B2BCostCenterShallowData {
  active?: boolean | string
  activeFlag?: boolean
  code: string
  currency?: CurrencyData
  name?: string
  /**
   * @deprecated
   */
  originalCode?: string
}

export interface B2BOrderData extends OrderData {
  costCenter?: B2BCostCenterData
  orgCustomer?: UserData
  permissionResults?: OrderApprovalPermissionResultData[]
}

export interface B2BPaymentTypeData {
  code?: B2BPaymentType | string
  displayName?: string
}

export interface B2BPaymentTypeListData {
  paymentTypes: B2BPaymentTypeData[]
}

export interface B2BSelectionData {
  active?: boolean
  displayRoles?: string[]
  id?: string
  normalizedCode?: string
  roles?: string[]
  selected?: boolean
}

export interface B2BUnitData {
  active?: boolean
  addresses?: AddressData[]
  administrators?: UserData[]
  approvalProcess?: B2BApprovalProcessData
  approvers?: UserData[]
  costCenters?: B2BCostCenterShallowData[]
  customers?: UserData[]
  managers?: UserData[]
  name?: string
  parentOrgUnit?: B2BUnitData
  uid: string
}

export interface B2BUnitNodeData {
  active?: boolean
  children?: B2BUnitNodeData[]
  id: string
  name?: string
  parent?: string
}

export interface B2BUnitNodeListData {
  unitNodes: B2BUnitNodeData[]
}

export interface BaseOptionData {
  options?: VariantOptionData[]
  selected?: VariantOptionData
  variantType?: string
}

export interface BaseSiteData {
  channel?: SiteChannel
  defaultLanguage?: LanguageData
  defaultPreviewCatalogId?: string
  defaultPreviewCategoryCode?: string
  defaultPreviewProductCode?: string
  locale?: string
  name?: string
  stores?: BaseStoreData[]
  theme?: string
  uid: string
  urlEncodingAttributes?: UrlEncodingAttributes[] | string[]
  urlPatterns?: string[]
  requiresAuthentication?: boolean
  registrationEnabled?: boolean
}

export interface BaseSiteListData {
  baseSites: BaseSiteData[]
}

export interface BaseStoreData {
  createReturnProcessCode?: string
  currencies?: CurrencyData[]
  defaultCurrency?: CurrencyData
  defaultDeliveryOrigin?: PointOfServiceData
  defaultLanguage?: LanguageData
  deliveryCountries?: CountryData[]
  deliveryModes?: DeliveryModeListData
  expressCheckoutEnabled?: boolean
  externalTaxEnabled?: boolean
  languages?: LanguageData[]
  maxRadiusForPosSearch?: number
  name?: string
  paymentProvider?: string
  pointsOfService?: PointOfServiceData[]
  submitOrderProcessCode?: string
}

export interface BreadcrumbData {
  facetCode?: string
  facetName?: string
  facetValueCode?: string
  facetValueName?: string
  removeQuery?: SearchStateData
  truncateQuery?: SearchStateData
}

export interface BudgetData extends BudgetShallowData {
  costCenters?: B2BCostCenterData[]
  orgUnit?: B2BUnitData
}

export interface BudgetListData extends SortableResponseData {
  budgets: BudgetData[]
}

export interface BudgetShallowData {
  active?: boolean
  budget?: number
  code?: string
  currency?: CurrencyData
  endDate?: string | Date
  name?: string
  selected?: boolean
  startDate?: string | Date
}

export interface BundleStarterData {
  productCode: string
  quantity: number
  templateId: string
}

export interface BundleTemplateData {
  id: string
  name?: string
  rootBundleTemplateName?: string
}

export interface CCPAttributeData {
  conflicts?: CCPConflictData[]
  domainValues?: CCPAttributeValueData[]
  formattedValue?: string
  images?: ImageData[]
  intervalInDomain?: boolean
  key?: string
  langDepName?: string
  longText?: string
  maxlength?: number
  name?: string
  negativeAllowed?: boolean
  numberScale?: number
  required?: boolean
  retractBlocked?: boolean
  retractTriggered?: boolean
  type?: CCPRenderType
  typeLength?: number
  validationType?: CCPValidationType
  value?: string
  visible?: boolean
}

export interface CCPAttributePricingData {
  csticUiKey?: string
  priceSupplements?: CCPAttributeValuePricingData[]
  selectedValues?: string[]
}

export interface CCPAttributeRequestData {
  groupId?: string
  provideAllAttributes?: boolean
}

export interface CCPAttributeValueData {
  images?: ImageData[]
  key?: string
  langDepName?: string
  name?: string
  readonly?: boolean
  selected?: boolean
}

export interface CCPAttributeValueOverviewData {
  characteristic?: string
  characteristicId?: string
  value?: string
  valueId?: string
}

export interface CCPAttributeValuePricingData {
  attributeValueKey?: string
  obsoletePriceValue?: PriceData
  priceValue?: PriceData
}

export interface CCPConfigurationData {
  complete?: boolean
  configId?: string
  consistent?: boolean
  groups?: CCPGroupData[]
  quantity?: number
  rootProduct?: string
  totalNumberOfIssues?: number
}

export interface CCPConfigurationOverallPricingData {
  basePrice?: PriceData
  currentTotal?: PriceData
  currentTotalSavings?: PriceData
  selectedOptions?: PriceData
}

export interface CCPConfigurationOverviewData {
  groups?: CCPGroupOverviewData[]
  id: string
  numberOfConflicts?: number
  numberOfIncompleteCharacteristics?: number
  pricing?: CCPConfigurationOverallPricingData
  productCode?: string
  sourceDocumentId?: string
  totalNumberOfIssues?: number
}

export interface CCPConfigurationPricingData {
  attributes?: CCPAttributePricingData[]
  configId?: string
  priceSummary?: CCPConfigurationOverallPricingData
  pricingError?: boolean
  showDeltaPrices?: boolean
}

export interface CCPConfigurationProductVariantData {
  imageData?: ImageData
  name?: string
  price?: PriceData
  productCode?: string
}

export interface CCPConflictData {
  text?: string
}

export interface CCPGroupData {
  attributes?: CCPAttributeData[]
  complete?: boolean
  configurable?: boolean
  consistent?: boolean
  description?: string
  groupType?: string
  id: string
  name?: string
  subGroups?: []
}

export interface CCPGroupOverviewData {
  characteristicValues?: CCPAttributeValueOverviewData[]
  groupDescription?: string
  groupType?: string
  id: string
  subGroups?: []
}

export interface CCPOrderEntryData extends OrderEntryData {
  configId?: string
}

export interface CXMLData {
  dsSignature?: DsSignatureData[]
  headerOrMessageOrRequestOrResponse?: []
  payloadID?: string
  signatureVersion?: string
  timestamp?: string
  version?: string
  xmlLang?: string
}

export interface CancellationRequestEntryInputListData {
  cancellationRequestEntryInputs: RequestEntryInputData[]
}

export interface CardTypeData {
  code?: string
  name?: string
}

export interface CardTypeListData {
  cardTypes: CardTypeData[]
}

export interface CartData extends AbstractOrderData {
  description?: string
  potentialOrderPromotions?: PromotionResultData[]
  potentialProductPromotions?: PromotionResultData[]
  saveTime?: string | Date
  savedBy?: PrincipalData
  totalUnitCount?: number
  costCenter?: B2BCostCenterData
  paymentType?: B2BPaymentTypeData
}

export interface CartListData {
  carts: CartData[]
}

export interface CartModificationData {
  deliveryModeChanged?: boolean
  entry?: OrderEntryData
  quantity?: number
  quantityAdded?: number
  statusCode?: string
  statusMessage?: string
}

export interface CartModificationListData {
  cartModifications: CartModificationData[]
}

export interface CatalogData extends AbstractCatalogItemData {
  catalogVersions?: CatalogVersionData[]
}

export interface CatalogListData {
  catalogs: CatalogData[]
}

export interface CatalogVersionData extends AbstractCatalogItemData {
  categories?: CategoryHierarchyData[]
}

export interface CategoryData {
  code?: string
  image?: ImageData
  name?: string
  url?: string
}

export interface CategoryHierarchyData extends AbstractCatalogItemData {
  products?: ProductData[]
  subcategories?: CategoryHierarchyData[]
}

export interface ClassificationData {
  code?: string
  features?: FeatureData[]
  name?: string
}

export interface CommentData extends CreateCommentData {
  author?: PrincipalData
  creationDate: string | Date
  fromCustomer: boolean
}

export interface ComponentIdListData {
  idList: string[]
}

export interface ComponentIdsData {
  componentIds: string[]
}

export interface ConfigurationInfoData {
  configurationLabel?: string
  configurationValue?: string
  configuratorType?: string
  status?: string
}

export interface ConsentData {
  code?: string
  consentGivenDate?: string | Date
  consentWithdrawnDate?: string | Date
}

export interface ConsentTemplateData {
  currentConsent?: ConsentData
  exposed: boolean
  description?: string
  id: string
  name?: string
  version?: number
}

export interface ConsentTemplateListData {
  consentTemplates: ConsentTemplateData[]
}

export interface ConsignmentData {
  code?: string
  deliveryPointOfService?: PointOfServiceData
  entries?: ConsignmentEntryData[]
  shippingAddress?: AddressData
  status?: string
  statusDate?: string | Date
  statusDisplay?: string | Date
  trackingID?: string
}

export interface ConsignmentEntryData {
  orderEntry?: OrderEntryData
  quantity?: number
  shippedQuantity?: number
}

export interface CountryData {
  isocode?: string
  name?: string
}

export interface CountryListData {
  countries: CountryData[]
}

export interface CreateCommentData {
  text: string
}

export interface CurrencyData {
  active?: boolean
  isocode?: string
  name?: string
  symbol?: string
}

export interface CurrencyListData {
  currencies: CurrencyData[]
}

export interface CustomerInterestsSearchPageData extends SortablePage {
  results: ProductInterestRelationData[]
}

export interface CustomerCouponData {
  allProductsApplicable?: boolean
  couponId?: string
  description?: string
  endDate?: string | Date
  name?: string
  notificationOn?: boolean
  startDate?: string | Date
  status?: string
}

export interface CustomerCoupon2CustomerData {
  coupon?: CustomerCouponData
  customer?: UserData
}

export interface CustomerCouponNotificationData extends CustomerCoupon2CustomerData {
  status?: string
}

export interface CustomerCouponSearchPageData extends SortablePage {
  coupons?: CustomerCouponData[]
}

export interface DeliveryModeData {
  code?: string
  deliveryCost?: PriceData
  description?: string
  name?: string
}

export interface DeliveryModeListData {
  deliveryModes: DeliveryModeData[]
}

export interface DeliveryOrderEntryGroupData {
  deliveryAddress?: AddressData
  entries?: OrderEntryData[]
  quantity?: number
  totalPriceWithTax?: PriceData
}

export interface DsCanonicalizationMethodData {
  algorithm?: string
  value?: string
}

export interface DsDigestMethodData extends DsCanonicalizationMethodData {}

export interface DsKeyInfoData {
  id: string
  value?: string
}

export interface DsObjectData extends DsKeyInfoData {
  encoding?: string
  mimeType?: string
}

export interface DsReferenceData {
  dsDigestMethod?: DsDigestMethodData
  dsTransforms: DsTransformsData
  id: string
  type?: string
  uri?: string
}

export interface DsSignatureData {
  dsKeyInfo?: DsKeyInfoData
  dsObject?: DsObjectData[]
  dsSignatureValue?: DsSignatureValueData
  dsSignedInfo?: DsSignedInfoData
  xmlnsDs?: string
  xmlnsXades?: string
}

export interface DsSignatureMethodData extends DsCanonicalizationMethodData {}

export interface DsSignatureValueData extends DsKeyInfoData {}

export interface DsSignedInfoData {
  dsCanonicalizationMethod?: DsCanonicalizationMethodData
  dsReference?: DsReferenceData[]
  dsSignatureMethod?: DsSignatureMethodData
  id: string
}

export interface DsTransformData extends DsCanonicalizationMethodData {}

export interface DsTransformsData {
  dsTransform: DsTransformData[]
}

export interface FacetData {
  category?: boolean
  code?: string
  multiSelect?: boolean
  name?: string
  priority?: number
  topValues?: FacetValueData[]
  values?: FacetValueData[]
  visible?: boolean
}

export interface FacetValueData {
  code?: string
  count?: number
  name?: string
  query?: SearchStateData
  selected?: boolean
}

export interface FeatureData {
  code?: string
  comparable?: boolean
  description?: string
  featureUnit?: FeatureUnitData
  featureValues?: FeatureValueData[]
  name?: string
  range?: boolean
  type?: string
}

export interface FeatureUnitData {
  name?: string
  symbol?: string
  unitType?: string
}

export interface FeatureValueData {
  value?: string
}

export interface FutureStockData {
  date?: string | Date
  formattedDate?: string
  stock?: StockData
}

export interface GeoPointData {
  latitude?: number
  longitude?: number
}

export interface ImageData {
  altText?: string
  format?: string
  galleryIndex?: number
  imageType?: string
  url?: string
}

export interface LanguageData {
  active?: boolean
  isocode?: string
  name?: string
  nativeName?: string
}

export interface LanguageListData {
  languages: LanguageData[]
}

export interface ListAdaptedComponents extends SortablePage {
  component: ComponentData[]
}

export interface ListAdaptedPagesData extends SortablePage {
  page?: PageAdaptedData
}

export interface MemberListData {
  members: PrincipalData[]
}

export interface BasicNotificationPreferenceData {
  channel?: NotificationChannel
  enabled?: boolean
}

export interface BasicNotificationPreferenceListData {
  preferences: BasicNotificationPreferenceData[]
}

export interface NotificationPreferenceData extends BasicNotificationPreferenceData {
  value?: string
  visible?: boolean
}

export interface NotificationPreferenceListData {
  preferences: NotificationPreferenceData[]
}

export interface OpeningDayData {
  closingTime?: TimeData
  openingTime?: TimeData
}

export interface OpeningScheduleData {
  code?: string
  name?: string
  specialDayOpeningList?: SpecialOpeningDayData[]
  weekDayOpeningList?: WeekdayOpeningDayData[]
}

export interface OrderSubmitData {
  /**
   * Cart code for logged-in user, cart GUID for guest checkout
   */
  cartId: string
  /**
   * CCV security code.
   */
  securityCode?: string
  termsChecked: boolean
}

export interface OrderData extends AbstractOrderData {
  cancellable?: boolean
  consignments?: ConsignmentData[]
  created?: string | Date
  deliveryStatus?: string
  deliveryStatusDisplay?: string
  guestCustomer?: boolean
  returnable?: boolean
  status?: string
  statusDisplay?: string
  totalUnitCount?: number
  unconsignedEntries?: OrderEntryData[]
}

export interface OrderApprovalData {
  approvalDecisionRequired?: boolean
  code: string
  customerOrderApprovalRecords?: OrderApprovalRecordData[]
  merchantOrderApprovalRecords?: OrderApprovalRecordData[]
  order?: B2BOrderData
  trigger?: TriggerData
}

export interface OrderApprovalDecisionData {
  comment?: string
  decision: string // ex: APPROVE, REJECT
}

export interface OrderApprovalListData extends SortableResponseData {
  orderApprovals: OrderApprovalData[]
}

export interface OrderApprovalPermissionData {
  active?: boolean
  code: string
  currency?: CurrencyData
  orderApprovalPermissionType?: OrderApprovalPermissionTypeData
  orgUnit?: B2BUnitData
  periodRange?: PeriodRange
  selected?: boolean
  threshold?: number
}

export interface OrderApprovalPermissionListData extends SortableResponseData {
  orderApprovalPermissions: OrderApprovalPermissionData[]
}

export interface OrderApprovalPermissionResultData {
  approverName?: string
  approverNotes?: string
  permissionType?: OrderApprovalPermissionTypeData
  statusDisplay?: string
}

export interface OrderApprovalPermissionTypeData {
  code: string
  name?: string
}

export interface OrderApprovalPermissionTypeListData {
  orderApprovalPermissionTypes: OrderApprovalPermissionTypeData[]
}

export interface OrderApprovalRecordData {
  approver?: PrincipalData
  comments?: string
  permissionTypes?: OrderApprovalPermissionTypeData[]
  statusDisplay?: string
}

export interface OrderEntryData {
  basePrice?: PriceData
  cancellableQuantity?: number
  cancelledItemsPrice?: PriceData
  comments?: CommentData
  configurationInfos?: ConfigurationInfoData[]
  deliveryMode?: DeliveryModeData
  deliveryPointOfService?: PointOfServiceData
  entryNumber?: number
  product?: ProductData
  quantity?: number
  returnableQuantity?: number
  returnedItemsPrice?: PriceData
  statusSummaryList?: StatusSummaryData[]
  totalPrice?: PriceData
  updateable?: boolean
}

export interface OrderEntryListData {
  orderEntries: OrderEntryData[]
}

export interface OrderHistoryData {
  code?: string
  guid?: string
  placed?: string | Date
  status?: string
  statusDisplay?: string
  total?: PriceData
}

export interface OrderHistoryListData extends SortableResponseData {
  orders: OrderHistoryData[]
}

export interface OrderStatusUpdateElementData {
  baseSiteId?: string
  code?: string
  status?: string
}

export interface OrderStatusUpdateElementListData {
  orderStatusUpdateElements: OrderStatusUpdateElementData[]
}

export interface OrgCustomerCreationData {
  email?: string
  firstName?: string
  lastName?: string
  orgUnit?: B2BUnitData
  roles?: string[]
  titleCode?: string
}

export interface OrgCustomerModificationData extends OrgCustomerCreationData {
  active?: boolean
  password?: string
}

export interface OrgUnitUserGroupData {
  members?: PrincipalData[]
  membersCount?: number
  name?: string
  orgUnit?: B2BUnitData
  permissions?: OrderApprovalPermissionData[]
  roles?: string[]
  selected?: string
  subGroups?: UserGroupData[]
  uid?: string
}

export interface OrgUnitUserGroupListData extends SortableResponseData {
  orgUnitUserGroups: OrgUnitUserGroupData[]
}

export interface OrgUnitUserListData extends SortableResponseData {
  users: UserData[]
}

export interface AbstractUserSignUpData {
  firstName: string
  lastName: string
  titleCode: string
}

export interface OrgUserRegistrationData extends AbstractUserSignUpData {
  message?: string
  email?: string
}

// tslint:disable-next-line:no-empty-interface
export interface PageAdaptedData {}

export interface PaymentDetailsData {
  accountHolderName?: string
  billingAddress?: AddressData
  cardNumber?: string
  cardType?: CardTypeData
  defaultPayment?: boolean
  expiryMonth?: string
  expiryYear?: string
  id?: string
  issueNumber?: string
  saved?: boolean
  startMonth?: string
  startYear?: string
  subscriptionId?: string
}

export interface PaymentDetailsListData {
  payments: PaymentDetailsData[]
}

export interface PaymentModeData {
  code?: string
  description?: string
  name?: string
}

export interface PaymentModeListData {
  paymentModes: PaymentModeData[]
}

export interface PaymentRequestData {
  mappingLabels?: Map<string, string>
  parameters?: Map<string, string>
  postUrl?: string
}

export interface PickupOrderEntryGroupData {
  deliveryPointOfService?: PointOfServiceData
  distance?: number
  entries?: OrderEntryData[]
  quantity?: number
  totalPriceWithTax?: PriceData
}

export interface PointOfServiceFeatureEntryData {
  key?: string
  value?: string
}

export interface PointOfServiceFeaturesData {
  entry?: PointOfServiceFeatureEntryData[]
}

export interface PointOfServiceData {
  address?: AddressData
  description?: string
  displayName?: string
  distanceKm?: number
  features?: PointOfServiceFeaturesData
  formattedDistance?: string
  geoPoint?: GeoPointData
  mapIcon?: ImageData
  name?: string
  openingHours?: OpeningScheduleData
  storeContent?: string
  storeImages?: ImageData[]
  url?: string
}

export interface PointOfServiceListData {
  pointOfServices: PointOfServiceData[]
}

export interface PointOfServiceStockData extends PointOfServiceData {
  stockInfo?: StockData
}

export interface PriceData {
  currencyIso?: string
  formattedValue?: string
  maxQuantity?: number
  minQuantity?: number
  priceType?: string
  value?: number
}

export interface PriceRangeData {
  maxPrice?: PriceData
  minPrice?: PriceData
}

export interface PrincipalData {
  uid?: string
  name?: string
}

export interface ProductData {
  availableForPickup?: boolean
  averageRating?: number
  baseOptions?: BaseOptionData[]
  baseProduct?: string
  categories?: CategoryData[]
  classifications?: ClassificationData[]
  code?: string
  description?: string
  futureStocks?: FutureStockData[]
  images?: ImageData[]
  keywords?: string[]
  manufacturer?: string
  multidimensional?: boolean
  name?: string
  numberOfReviews?: number
  potentialPromotions?: PromotionData[]
  price?: PriceData
  priceRange?: PriceRangeData[]
  productReferences?: ProductReferenceData[]
  purchasable?: boolean
  reviews?: ReviewData[]
  stock?: StockData
  summary?: string
  url?: string
  variantMatrix?: VariantMatrixElementData[]
  variantOptions?: VariantOptionData[]
  variantType?: string
  volumePrices?: PriceData[]
  volumePricesFlag?: boolean

  configurable?: boolean
  configuratorType?: string
  firstVariantCode?: string
  firstVariantImage?: string
  tags?: string[]
}

export interface ProductExpressUpdateElementData {
  catalogId?: string
  catalogVersion?: string
  code?: string
}

export interface ProductExpressUpdateElementListData {
  productExpressUpdateElements: ProductExpressUpdateElementData[]
}

export interface ProductFutureStocksData {
  futureStocks?: FutureStockData[]
  productCode?: string
}

export interface ProductFutureStocksListData {
  productFutureStocks: ProductFutureStocksData[]
}

export interface ProductInterestRequestData {
  notificationType?: string
  productCode?: string
}

export interface ProductInterestEntryData {
  dateAdded?: string | Date
  expirationDate?: string | Date
  interestType?: string
}

export interface ProductInterestRelationData {
  product?: ProductData
  productInterestEntry: ProductInterestEntryData[]
}

export interface ProductListData {
  catalog?: string
  currentPage: number
  products: ProductData[]
  totalPageCount?: number
  totalProductCount?: number
  version?: string
}

export interface ProductReferenceData {
  description?: string
  preselected?: boolean
  quantity?: number
  referenceType?: string
  target?: ProductData
}

export interface ProductReferenceListData {
  references: ProductReferenceData[]
}

export interface ProductSearchPageData extends SortableResponseData {
  breadcrumbs?: BreadcrumbData[]
  categoryCode?: string
  currentQuery?: SearchStateData
  facets?: FacetData[]
  freeTextSearch?: string
  keywordRedirectUrl?: string
  products: ProductData[]
  spellingSuggestion?: SpellingSuggestionData
}

export interface PromotionData {
  code?: string
  couldFireMessages?: string[]
  description?: string
  enabled?: boolean
  endDate?: string | Date
  firedMessages?: string[]
  priority?: number
  productBanner?: ImageData[]
  promotionGroup?: string
  promotionType?: string
  restrictions?: PromotionRestrictionData[]
  startDate?: string | Date
  title?: string
}

export interface PromotionListData {
  promotions: PromotionData[]
}

export interface PromotionOrderEntryConsumedData {
  adjustedUnitPrice?: number
  code?: string
  orderEntryNumber?: number
  quantity?: number
}

export interface PromotionRestrictionData {
  restrictionType?: string
  description?: string
}

export interface PromotionResultData {
  consumedEntries?: PromotionOrderEntryConsumedData[]
  description?: string
  promotion?: PromotionData
}

export interface PromotionResultListData {
  promotions: PromotionResultData[]
}

export interface QuoteData {
  allowedActions?: string[]
  cartId?: string
  code: string
  comments?: CommentData[]
  creationTime: string | Date
  description?: string
  entries?: OrderEntryData[]
  expirationTime: string | Date
  name: string
  orderDiscounts?: PriceData
  previousEstimatedTotal?: PriceData
  productDiscounts?: PriceData
  quoteDiscounts?: PriceData
  state: string
  subTotalWithDiscounts?: PriceData
  threshold: number
  totalItems: number
  totalPrice?: PriceData
  totalPriceWithTax?: PriceData
  updatedTime: string | Date
  version: number
}

export interface QuoteActionData {
  action: QuoteAction
}

export interface QuoteDiscountData {
  discountRate?: number
  discountType?: string
}

export interface QuoteListData {
  pagination?: PaginationData
  quotes?: QuoteData[]
}

export interface QuoteMetadataData {
  description?: string
  expirationTime: string | Date
  name: string
}

export interface QuoteStarterData {
  cartId?: string
  quoteCode?: string
}

export interface RegionData {
  countryIso?: string
  isocode?: string
  isocodeShort?: string
  name?: string
}

export interface RegionListData {
  regions: RegionData[]
}

export interface ReplenishmentOrderData extends CartData {
  active?: boolean
  trigger?: TriggerData
  firstDate?: string | Date
  replenishmentOrderCode?: string
}

export interface ReplenishmentOrderListData extends SortableResponseData {
  replenishmentOrders: ReplenishmentOrderData[]
}

export interface ResetPasswordData {
  newPassword: string
  token: string
}

export interface RequestEntryInputData {
  orderEntryNumber: number
  quantity: number
}

export interface ReturnRequestData {
  cancellable?: boolean
  code?: string
  creationTime?: string | Date
  deliveryCost?: PriceData
  order?: OrderData
  refundDeliveryCost?: boolean
  returnEntries?: ReturnRequestEntryData[]
  returnLabelDownloadUrl?: string | URL
  rma?: string
  status?: string
  subTotal?: PriceData
  totalPrice?: PriceData
}

export interface ReturnRequestEntryData {
  expectedQuantity?: number
  orderEntry?: OrderEntryData
  refundAmount?: PriceData
}

export interface ReturnRequestEntryInputListData {
  orderCode: string
  returnRequestEntryInputs: RequestEntryInputData[]
}

export interface ReturnRequestListData extends SortableResponseData {
  returnRequests: ReturnRequestData[]
}

export interface ReturnRequestModificationData {
  status?: ReturnRequestStatus
}

export interface ReviewData {
  alias?: string
  comment?: string
  date?: string | Date
  headline?: string
  id?: string
  principal?: UserData
  rating?: number
}

export interface ReviewListData {
  reviews: ReviewData[]
}

export interface SaveCartResultData {
  savedCartData?: CartData
}

export interface ScheduleReplenishmentFormData {
  daysOfWeek?: DaysOfWeek
  nthDayOfMonth?: string
  numberOfDays?: string
  numberOfWeeks?: string
  recurrencePeriod?: string
  replenishmentStartDate?: string | Date
}

export interface SearchQueryData {
  value?: string
}

export interface SearchStateData {
  query?: SearchQueryData
  url?: string
}

export interface SiteMessageData {
  body?: string
  notificationType?: NotificationType
  sentDate?: string | Date
  subject?: string
  uid?: string
}

export interface SiteMessageSearchPageData extends SortablePage {
  messages?: SiteMessageData[]
}

export interface SortData {
  code?: string
  name?: string
  selected?: boolean
}

export interface SpecialOpeningDayData extends OpeningDayData {
  closed?: boolean
  comment?: string
  date?: string | Date
  formattedDate?: string
  name?: string
}

export interface SpellingSuggestionData {
  query?: string
  suggestion?: string
}

export interface StatusSummaryData {
  numberOfIssues?: number
  status?: Severity
}

export interface StockData {
  isValueRounded?: boolean
  stockLevel?: number
  stockLevelStatus?: StockLevelStatus
}

export interface StoreCountData {
  count?: number
  isoCode?: string
  name?: string
  storeCountDataList?: StoreCountData[]
  type?: string
}

export interface StoreCountListData {
  countriesAndRegionsStoreCount: StoreCountData[]
}

export interface StoreFinderSearchPageData extends SortableResponseData {
  boundEastLongitude?: number
  boundNorthLatitude?: number
  boundSouthLatitude?: number
  boundWestLongitude?: number
  locationText?: string
  sourceLatitude?: number
  sourceLongitude?: number
  stores?: PointOfServiceStockData[]
}

export interface StoreFinderStockSearchPageData extends StoreFinderSearchPageData {
  product?: ProductData
}

export interface SuggestionData {
  value?: string
}

export interface SuggestionListData {
  suggestions: SuggestionData[]
}

export interface TicketData {
  associatedTo?: TicketAssociatedObjectData
  availableStatusTransitions?: TicketStatusData[]
  createdAt?: string
  customerId?: string
  id: string
  modifiedAt?: string | Date
  status?: TicketStatusData
  subject?: string
  ticketCategory?: TicketCategoryData
  ticketEvents?: TicketEventData[]
}

export interface TicketAssociatedObjectData {
  code: string
  modifiedAt?: string | Date
  type: string
}

export interface TicketAssociatedObjectListData {
  ticketAssociatedObjects?: TicketAssociatedObjectData[]
}

export interface TicketCategoryData {
  id: string
  name?: string
}

export interface TicketCategoryListData {
  ticketCategories?: TicketCategoryData[]
}

export interface TicketEventData {
  addedByAgent?: boolean
  author?: string
  createdAt?: string | Date
  message: string
  toStatus?: TicketStatusData
}

export interface TicketListData extends SortableResponseData {
  tickets: TicketData[]
}

export interface TicketStarterData {
  associatedTo?: TicketAssociatedObjectData
  message: string
  subject: string
  ticketCategory: TicketCategoryData
}

export interface TicketStatusData extends TicketCategoryData {}

export interface TimeData {
  hour?: string
  minute?: string
  formattedHour?: string
}

export interface TitleData {
  code?: string
  name?: string
}

export interface TitleListData {
  titles: TitleData[]
}

export interface TriggerData {
  activationTime?: string | Date
  displayTimeTable?: string
}

export interface UserData extends PrincipalData {
  active?: boolean
  currency?: CurrencyData
  customerId?: string
  defaultAddress?: AddressData
  displayUid?: string
  email?: string
  firstName?: string
  language?: LanguageData
  lastName?: string
  roles?: string[]
  selected?: boolean
  title?: string
  titleCode?: string

  approvers?: string[]
  deactivationDate?: string | Date
  orgUnit?: B2BUnitData
}

export interface UserGroupData extends PrincipalData {
  members?: PrincipalData[]
  membersCount?: number
  subGroups?: UserGroupData[]
}

export interface UserGroupListData {
  currentPage?: number
  numberOfPages?: number
  pageSize?: number
  totalNumber?: number
  userGroups: UserGroupData[]
}

export interface UserSignUpData extends AbstractUserSignUpData {
  password: string
  uid: string
}

export interface VariantCategoryData {
  hasImage?: boolean
  name?: string
  priority?: number
}

export interface VariantMatrixElementData {
  elements?: VariantMatrixElementData[]
  isLeaf?: boolean
  parentVariantCategory?: VariantCategoryData
  variantOption?: VariantOptionData
  variantValueCategory?: VariantValueCategoryData
}

export interface VariantOptionData {
  code?: string
  priceData?: PriceData
  stock?: StockData
  url?: string
  variantOptionQualifiers?: VariantOptionQualifierData[]
}

export interface VariantOptionQualifierData {
  image?: ImageData
  name?: string
  qualifier?: string
  value?: string
}

export interface VariantValueCategoryData {
  name?: string
  sequence?: string
  superCategories?: VariantCategoryData[]
}

export interface VoucherData {
  appliedValue?: PriceData
  code?: string
  currency?: CurrencyData
  description?: string
  freeShipping?: boolean
  name?: string
  value?: number
  valueFormatted?: string
  valueString?: string
  voucherCode?: string
}

export interface VoucherListData {
  vouchers: VoucherData[]
}

export interface WeekdayOpeningDayData extends OpeningDayData {
  closed?: boolean
  weekDay?: string
}

export interface CarrierData {
  code: string
  name?: string
}

export interface ConsignmentTrackingData {
  carrierDetails?: CarrierData
  statusDisplay?: string
  targetArrivalDate?: string | Date
  trackingEvents?: ConsignmentTrackingEventData[]
  trackingID?: string
  trackingUrl?: string
}

export interface ConsignmentTrackingEventData {
  detail?: string
  eventDate?: string | String
  location?: string
  referenceCode?: string
}

export interface ConversationData {
  agent?: PrincipalData
  closeDate?: string | Date
  createDate?: string | Date
  customer?: PrincipalData
  id: string
  latestMessage?: ConversationMessageData
  status?: string
}

export interface ConversationListData {
  conversations: ConversationData[]
}

export interface ConversationMessageData {
  content?: string
  sender?: PrincipalData
  sentTime?: string | Date
}

export interface ConversationMessageListData {
  conversationId: string
  messages?: ConversationMessageData[]
}

export interface ConversationRequestData {
  status: string
}

/**
 * @Deprecated
 */
export interface PaginationData {
  totalPages?: number
  totalResults?: number
  pageSize?: number
  currentPage?: number
  sort?: string
}

export interface ErrorData {
  errorCode?: string
  exceptionMessage?: string
  language?: string
  message?: string
  position?: number
  reason?: string
  subject?: string
  subjectType?: string
  type?: string
}

export interface ErrorListData {
  errors: ErrorData[]
}

export interface Pagination {
  count?: number
  hasNext?: boolean
  hasPrevious?: boolean
  page?: number
  totalCount?: number
  totalPages?: number
}

export interface Sort {
  asc?: boolean
  code?: string
}

export interface Page {
  pagination?: Pagination
}

export interface SortablePage extends Page {
  sorts?: Sort[]
}

export interface CustomerSuggestionData {
  card?: string
  carts?: string[]
  date?: string | Date
  email?: string
  fullName?: string
}

export interface CustomerSearchPageData extends SortableResponseData {
  entries: UserData[]
}

export interface CustomerListData {
  additionalColumnsKeys?: string[]
  name?: string
  searchBoxEnabled?: boolean
  uid: string
}

export interface CustomerSearchRequestData extends SortableRequestData {
  customerListId?: string
  orderId?: string
  query?: string
}
