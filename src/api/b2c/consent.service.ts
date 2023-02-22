import type { ConsentTemplateData, ConsentTemplateListData, RequestData } from '@/api/models'
import { AuthRestClient } from '@/api/rest'

export class ConsentService extends AuthRestClient {
  getEndpoint() {
    return `${this.basePath}/users/${this.userPath}`
  }

  /**
   * A user can give consent
   * @param {{consentTemplateId?: string; consentTemplateVersion?: string}} consentOptions
   */
  addConsent(consentOptions?: {
    /**
     * Consent template ID.
     */
    consentTemplateId: string
    /**
     * Consent template version.
     */
    consentTemplateVersion: number
  }) {
    return this.postAt<ConsentTemplateData>('consents', {}, { params: consentOptions })
  }

  /**
   * If the user consent was given, the consent is withdrawn.
   * If consent was already withdrawn then returns consent already withdrawn category.
   * If there is no such consent then returns not found.
   * If the current user is an anonymous user then returns access denied category.
   * @param {string} consentCode
   */
  delConsent(consentCode: string) {
    return this.delete<void>(`consents/${consentCode}`)
  }

  /**
   * If user has not given or withdrawn consent to any of the template, no given or withdraw date is returned.
   * @param {RequestData} queryParams
   */
  getConsents(queryParams?: RequestData) {
    return this.get<ConsentTemplateListData>('consenttemplates', { params: queryParams })
  }

  /**
   * If user has not given or withdrawn consent to the template, no given or withdraw date is returned.
   * @param {string} consentTemplateId
   * @param {RequestData} queryParams
   */
  getConsent(consentTemplateId?: string, queryParams?: RequestData) {
    return this.get<ConsentTemplateData>(`consenttemplates/${consentTemplateId}`, { params: queryParams })
  }
}
