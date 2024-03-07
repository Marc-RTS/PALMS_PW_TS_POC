import { Page, Locator } from '@playwright/test';
import BasePage from '../base.page';

export default class ManageRolePermissionPage extends BasePage {
  readonly manageRolePermissionPageHeader: Locator;
  readonly dropdownDomain: Locator;
  readonly dropdownPage: Locator;
  readonly dropdownAttributeType: Locator;
  readonly dropdownAttributeName: Locator;
  readonly dropdownPalmsRoles: Locator;
  readonly rowAuditGlobalAdministrator: Locator;
  readonly rowAuditRegionalAdministrator: Locator;
  readonly rowAuditSuspended: Locator;
  readonly rowAuditOfficer: Locator;
  readonly rowAuditArranger: Locator;
  readonly btnCancelChanges: Locator;
  readonly btnSaveChanges: Locator;
  readonly btnReset: Locator;

  constructor(page: Page) {
    super(page);
    this.manageRolePermissionPageHeader = this.page.getByTestId('manage-role-permissions-page-header-title');
    this.dropdownDomain = this.page.getByTestId('manage-role-permissions-domain-autocomplete');
    this.dropdownPage = this.page.getByTestId('manage-role-permissions-page-autocomplete');
    this.dropdownAttributeType = this.page.getByTestId('manage-role-permissions-attribute-type-autocomplete');
    this.dropdownAttributeName = this.page.getByTestId('manage-role-permissions-attribute-name-autocomplete');
    this.dropdownPalmsRoles = this.page.getByTestId('manage-role-permissions-roles-autocomplete');
    this.rowAuditGlobalAdministrator = this.page.getByTestId('manage-role-permissions-Audit-row-Global administrator-avatar');
    this.rowAuditRegionalAdministrator = this.page.getByTestId('manage-role-permissions-Audit-row-Regional administrator-avatar');
    this.rowAuditSuspended = this.page.getByTestId('manage-role-permissions-Audit-row-Suspended-avatar');
    this.rowAuditArranger = this.page.getByTestId('manage-role-permissions-Audit-row-Arranger-avatar');
    this.rowAuditOfficer = this.page.getByTestId('manage-role-permissions-Audit-row-Officer-avatar');
    this.btnCancelChanges = this.page.getByTestId('manage-role-permissions-cancel-changes-button');
    this.btnSaveChanges = this.page.getByTestId('manage-role-permissions-save-changes-button');
    this.btnReset = this.page.getByTestId('manage-role-permissions-reset-button');
  }

  async init(): Promise<this> {
    return this;
  }
  async getTitle() {
    return await this.manageRolePermissionPageHeader.textContent();
  }
  async filterDomain(domain: string) {
    await this.dropdownDomain.click();
    await this.page.getByRole('option', { name: `${domain}` }).click();
  }
  async filterPage(page) {
    await this.dropdownPage.click();
    await this.page.getByRole('option', { name: `${page}` }).click();
  }
  async filterAttributeType(attributeType: string) {
    await this.dropdownAttributeType.click();
    await this.page.getByRole('option', { name: `${attributeType}` }).click();
  }
  async filterAttributeName(attributeName: string) {
    await this.dropdownAttributeName.click();
    await this.page.getByRole('option', { name: `${attributeName}` }).click();
  }
  async filterPalmsRole(palmsRole: string) {
    await this.dropdownPalmsRoles.click();
    await this.page.getByRole('option', { name: `${palmsRole}` }).click();
  }
  async clickAuditRowRegionalAdministrator() {
    await this.rowAuditRegionalAdministrator.click();
  }
  async clickReset() {
    await this.btnReset.click();
  }
  async clickSaveChanges() {
    await this.btnSaveChanges.click();
  }
  async selectAuditRowPermission(role: string, permission: string) {
    await this.selectRowPermission(`Audit`, role, permission);
  }
  async isSaveChangesVisible() {
    return await this.btnSaveChanges.isVisible();
  }
  async isCancelVisible() {
    return await this.btnCancelChanges.isVisible();
  }
  async isSaveChangesDisabled() {
    return await this.btnSaveChanges.isDisabled();
  }
  async isCancelDisabled() {
    return await this.btnCancelChanges.isDisabled();
  }
  async isSaveChangesEnabled() {
    return await this.btnSaveChanges.isEnabled();
  }

  async isCancelEnabled() {
    return await this.btnCancelChanges.isEnabled();
  }
  /**
   *
   * @Params
   * attributeName: Audit
   * role : Global administrator | Regional administrator |Suspended| Arranger | Officer
   * permission: Enabled | No Access
   * **/
  async selectRowPermission(attributeName: string, role: string, permission: string) {
    await this.page.getByTestId(`manage-role-permissions-${attributeName}-row-${role}-avatar`).click();
    await this.page.getByTestId(`manage-role-permsissions-data-grid`).getByRole('listitem').locator(`div`).nth(1).click();
    await this.page
      .getByRole('menu')
      .getByRole('menuitem', { name: `${permission}` })
      .click();
  }
}
