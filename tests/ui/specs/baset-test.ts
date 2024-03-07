import { test as base, Page } from '@playwright/test';
import Mock from '../support/mock';

import {
  AdministratorPortalPage,
  UserPortalPage,
  LoginPage,
  HomePage,
  ManageRolesPage,
  ManageRolePermissionPage,
  ManageUserRolesPage,
  ManageReferenceDataPage,
  OficerWorkspacePage,
  QueueManagementPage,
  SearchCustomerProfilePage,
  SearchUserProfilePage,
  TapLandingPage,
  ViewUserHistoryPage,
} from '../pages';
import User from '../fixtures/user';
import Rbac from '../fixtures/rbac';
import UserFind from '../fixtures/user-find';
import Permission from '../fixtures/permission';
import PermissionRoleFilter from '../fixtures/permission-role-filter';
import PermissionRoleCreateUpdateMultiple from '../fixtures/permission-role-createupdatemultiple';
import AlertPopper from '../pages/poppers/alert';
import SaveOrCancelChangesPopper from '../pages/poppers/save-or-clear-changes';
import ProfileSideBar from '../pages/sidebars/profile';
import OfficerWorkspacePage from '../pages/officer-workspace';

type palmsFixtures = {
  mock: Mock;
  // pages fixtures
  homePage: HomePage;
  loginPage: LoginPage;
  userPortalPage: UserPortalPage;
  administratorPortalPage: AdministratorPortalPage;
  manageRolesPage: ManageRolesPage;
  manageUserRolesPage: ManageUserRolesPage;
  manageReferenceDataPage: ManageReferenceDataPage;
  manageRolePermissionsPage: ManageRolePermissionPage;
  oficerWorkspacePage: OficerWorkspacePage;
  queueManagementPage: QueueManagementPage;
  searchUserProfilePage: SearchUserProfilePage;
  searchCustomerProfilePage: SearchCustomerProfilePage;
  tapLandingPage: TapLandingPage;
  viewUserHistory: ViewUserHistoryPage;

  // popper fixtures
  saveOrCancelPopper: SaveOrCancelChangesPopper;
  alertPopper: AlertPopper;

  // sidebar fixtures
  profileSidebar: ProfileSideBar;

  // data fixtures
  fxUser: User;
  fxUserFind: UserFind;
  fxRbac: Rbac;
  fxPermission: Permission;
  fxPermissionRoleFilter: PermissionRoleFilter;
  fxPermissionRoleCreateUpdateMultiple: PermissionRoleCreateUpdateMultiple;
};

export const test = base.extend<palmsFixtures>({
  mock: async ({ page }, use) => {
    const mock = new Mock(page);
    await use(mock);
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  userPortalPage: async ({ page }, use) => {
    const userPortalPage = new UserPortalPage(page);
    await use(userPortalPage);
  },
  administratorPortalPage: async ({ page }, use) => {
    const administratorPortalPage = new AdministratorPortalPage(page);
    await use(administratorPortalPage);
  },
  manageRolesPage: async ({ page }, use) => {
    const manageRolesPage = new ManageRolesPage(page);
    await use(manageRolesPage);
  },
  manageUserRolesPage: async ({ page }, use) => {
    const manageUserRolesPage = new ManageUserRolesPage(page);
    await use(manageUserRolesPage);
  },
  manageReferenceDataPage: async ({ page }, use) => {
    const manageReferenceDataPage = new ManageReferenceDataPage(page);
    await use(manageReferenceDataPage);
  },
  manageRolePermissionsPage: async ({ page }, use) => {
    const manageRolePermissionsPage = new ManageRolePermissionPage(page);
    await use(manageRolePermissionsPage);
  },
  oficerWorkspacePage: async ({ page }, use) => {
    const oficerWorkspacePage = new OfficerWorkspacePage(page);
    await use(oficerWorkspacePage);
  },
  queueManagementPage: async ({ page }, use) => {
    const queueManagementPage = new QueueManagementPage(page);
    await use(queueManagementPage);
  },
  searchUserProfilePage: async ({ page }, use) => {
    const searchUserProfilePage = new SearchUserProfilePage(page);
    await use(searchUserProfilePage);
  },
  searchCustomerProfilePage: async ({ page }, use) => {
    const searchCustomerProfilePage = new SearchCustomerProfilePage(page);
    await use(searchCustomerProfilePage);
  },
  tapLandingPage: async ({ page }, use) => {
    const tapLandingPage = new TapLandingPage(page);
    await use(tapLandingPage);
  },
  viewUserHistory: async ({ page }, use) => {
    const viewUserHistory = new ViewUserHistoryPage(page);
    await use(viewUserHistory);
  },

  // popper fixtures
  saveOrCancelPopper: async ({ page }, use) => {
    const saveOrCancelPopper = new SaveOrCancelChangesPopper(page);
    await use(saveOrCancelPopper);
  },
  alertPopper: async ({ page }, use) => {
    const alertPopper = new AlertPopper(page);
    await use(alertPopper);
  },

  //sidebar fixtures
  profileSidebar: async ({ page }, use) => {
    const profileSidebar = new ProfileSideBar(page);
    await use(profileSidebar);
  },

  //data fixtures
  fxUser: async ({}, use) => {
    const userFixture = new User();
    await use(userFixture);
  },
  fxUserFind: async ({}, use) => {
    const fxUserFind = new UserFind();
    await use(fxUserFind);
  },
  fxRbac: async ({}, use) => {
    const rbacFixture = new Rbac();
    await use(rbacFixture);
  },
  fxPermission: async ({}, use) => {
    const permissionFixture = new Permission();
    await use(permissionFixture);
  },
  fxPermissionRoleFilter: async ({}, use) => {
    const fxPermissionRoleFilter = new PermissionRoleFilter();
    await use(fxPermissionRoleFilter);
  },
  fxPermissionRoleCreateUpdateMultiple: async ({}, use) => {
    const fxPermissionRoleCreateUpdateMultiple = new PermissionRoleCreateUpdateMultiple();
    await use(fxPermissionRoleCreateUpdateMultiple);
  },
});

export { expect } from '@playwright/test';
