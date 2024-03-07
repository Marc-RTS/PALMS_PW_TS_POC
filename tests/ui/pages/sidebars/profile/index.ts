import { Page, Locator } from '@playwright/test';
import BasePage from '../../base.page';

export default class ProfileSideBar extends BasePage {
  readonly name: Locator;
  readonly position: Locator;
  readonly mobileNumber: Locator;
  readonly personnelNumber: Locator;
  readonly personId: Locator;
  readonly qantasFrequentFlyer: Locator;
  readonly virginFrequentFlyer: Locator;
  readonly leaderName: Locator;
  readonly leaderPersonnelNumber: Locator;
  readonly leaderRole: Locator;
  readonly leaderRoleId: Locator;
  readonly orgUnitName: Locator;
  readonly orgUnitId: Locator;
  readonly personnelArea: Locator;
  readonly personnelAreaId: Locator;
  readonly employer: Locator;
  readonly employerId: Locator;
  readonly costCode: Locator;
  readonly employment: Locator;

  constructor(page: Page) {
    super(page);
    this.name = this.page.getByTestId('search-sidebar-name');
    this.position = this.page.getByTestId('search-sidebar-position');
    this.mobileNumber = this.page.getByTestId('search-sidebar-personal-mobile-value');
    this.personnelNumber = this.page.getByTestId('search-sidebar-personnel-number-value');
    this.personId = this.page.getByTestId('search-sidebar-person-id-value');
    this.qantasFrequentFlyer = this.page.getByTestId('search-sidebar-qantas-frequent-flyer-value');
    this.virginFrequentFlyer = this.page.getByTestId('search-sidebar-virgin-frequent-flyer-value');
    this.leaderRoleId = this.page.getByTestId('search-sidebar-leader-role-value');
    this.leaderName = this.page.getByTestId('search-sidebar-leader-name-label');
    this.leaderPersonnelNumber = this.page.getByTestId('search-sidebar-leader-name-value');
    this.leaderRole = this.page.getByTestId('search-sidebar-leader-role-label');
    this.orgUnitName = this.page.getByTestId('search-sidebar-org-unit-subtitle');
    this.orgUnitId = this.page.getByTestId('search-sidebar-org-unit-value');
    this.personnelArea = this.page.getByTestId('search-sidebar-personnel-area-subtitle');
    this.personnelAreaId = this.page.getByTestId('search-sidebar-personnel-area-value');
    this.employer = this.page.getByTestId('search-sidebar-employer-subtitle');
    this.employerId = this.page.getByTestId('search-sidebar-employer-value');
    this.costCode = this.page.getByTestId('search-sidebar-cost-code-subtitle');
    this.employment = this.page.getByTestId('search-sidebar-employment-value');
  }

  async init(): Promise<this> {
    return this;
  }

  async getName() {
    return await this.name.textContent();
  }
  async getPosition() {
    return await this.position.textContent();
  }
  async getMobileNumber() {
    return await this.mobileNumber.textContent();
  }
  async getPersonnelNumber() {
    return await this.personnelNumber.textContent();
  }
  async getPersonId() {
    return await this.personId.textContent();
  }
  async getQantasFrequentFlyer() {
    return await this.qantasFrequentFlyer.textContent();
  }
  async getVirginFrequentFlyer() {
    return await this.virginFrequentFlyer.textContent();
  }
  async getLeaderRoleId() {
    return await this.leaderRoleId.textContent();
  }
  async getLeaderName() {
    return await this.leaderName.textContent();
  }
  async getLeaderPersonnelNumber() {
    return await this.leaderPersonnelNumber.textContent();
  }
  async getLeaderRole() {
    return await this.leaderRole.textContent();
  }
  async getOrgUnitName() {
    return await this.orgUnitName.textContent();
  }
  async getOrgUnitId() {
    return await this.orgUnitId.textContent();
  }
  async getPersonnelArea() {
    return await this.personnelArea.textContent();
  }
  async getPersonnelAreaId() {
    return await this.personnelAreaId.textContent();
  }
  async getEmployer() {
    return await this.employer.textContent();
  }
  async getEmployerId() {
    return await this.employerId.textContent();
  }
  async getCostCode() {
    return await this.costCode.textContent();
  }
  async getEmployment() {
    return await this.employment.textContent();
  }
}
