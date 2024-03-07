import {
  AUS_IRONORE_ADMINPORTAL_TITLE,
  CAN_IRONORE_ADMINPORTAL_TITLE,
  GLOBAL_ADMINPORTAL_TITLE,
  HOMEPAGE_TITLE,
  MANAGE_ROLE_PERMISSION_HEADER,
  PALMS_ADMINPORTAL_TITLE,
} from '../../support/constants';
import { test, expect } from '../baset-test';

test.describe('Admin Portal - Both CAN and AUS user @admin', () => {
  test.beforeEach(async ({ page, loginPage, userPortalPage, fxUser, fxRbac, fxPermission, mock }) => {
    const user = fxUser.generateBothAusAndCanRegionalUser();
    await loginPage.openPalms(page, user);
    await mock.getUserResponses(user, fxRbac.generateBothAusAndCanRegionalAdminRbac(), fxPermission.generateBothCanadaAndAusAdminPermissionUser());
    expect(await userPortalPage.getTitle()).toEqual(HOMEPAGE_TITLE);
  });

  test('access admin portal as regional administrator in multiple regions', async ({ userPortalPage }) => {
    const adminPortalPage = await userPortalPage.navigateToAdminPortalPage();
    expect(await adminPortalPage.getTitle()).toEqual(PALMS_ADMINPORTAL_TITLE);
    expect(await adminPortalPage.isRegionSelectorVisible()).toBeTruthy();

    await adminPortalPage.clickRegionSelector();
    expect(await adminPortalPage.getOptionAusIronOre()).toEqual('Australia - Iron Ore');
    expect(await adminPortalPage.getOptionCanIronOre()).toEqual('Canada - Iron Ore');
    await adminPortalPage.selectAusIronOreRegion();
    expect(await adminPortalPage.getTitle()).toEqual(AUS_IRONORE_ADMINPORTAL_TITLE);
    await adminPortalPage.switchToCanIronOreRegion();
    expect(await adminPortalPage.getTitle()).toEqual(CAN_IRONORE_ADMINPORTAL_TITLE);
  });

  test('regional administrator is able to switch to different region on selected pages', async ({ userPortalPage }) => {
    const adminPortalPage = await userPortalPage.navigateToAdminPortalPage();
    expect(await adminPortalPage.getTitle()).toEqual(PALMS_ADMINPORTAL_TITLE);
    expect(await adminPortalPage.isRegionSelectorVisible()).toBeTruthy();

    await adminPortalPage.switchToAusIronOreRegion();
    expect(await adminPortalPage.getTitle()).toEqual(AUS_IRONORE_ADMINPORTAL_TITLE);

    const manageRolePermissionsPage = await userPortalPage.navigateToManageRolePermissionsPage();
    expect(await manageRolePermissionsPage.getTitle()).toEqual(MANAGE_ROLE_PERMISSION_HEADER);

    await adminPortalPage.switchToCanIronOreRegion();
    expect(await adminPortalPage.getTitle()).toEqual(CAN_IRONORE_ADMINPORTAL_TITLE);
    expect(await manageRolePermissionsPage.getTitle()).toEqual(MANAGE_ROLE_PERMISSION_HEADER);
  });

  test('user cancels changes when switching to different region', async ({ userPortalPage, mock, saveOrCancelPopper, fxPermissionRoleFilter }) => {
    mock.getPermissionRoleFilter(fxPermissionRoleFilter.generateRegionalPermissionRoleFilter());
    const adminPortalPage = await userPortalPage.navigateToAdminPortalPage();
    expect(await adminPortalPage.getTitle()).toEqual(PALMS_ADMINPORTAL_TITLE);
    expect(await adminPortalPage.isRegionSelectorVisible()).toBeTruthy();

    await adminPortalPage.switchToAusIronOreRegion();
    expect(await adminPortalPage.getTitle()).toEqual(AUS_IRONORE_ADMINPORTAL_TITLE);

    const manageRolePermissionsPage = await userPortalPage.navigateToManageRolePermissionsPage();
    expect(await manageRolePermissionsPage.getTitle()).toEqual(MANAGE_ROLE_PERMISSION_HEADER);

    await manageRolePermissionsPage.filterPalmsRole('All');
    await manageRolePermissionsPage.selectRowPermission('Audit', 'Arranger', 'Enabled Can be used');
    await adminPortalPage.switchToCanIronOreRegion();
    await saveOrCancelPopper.clickCancel();
    expect(await manageRolePermissionsPage.getTitle()).toEqual(MANAGE_ROLE_PERMISSION_HEADER);
    expect(await adminPortalPage.getTitle()).toEqual(AUS_IRONORE_ADMINPORTAL_TITLE);
  });

  test('user clears changes when switching to different region', async ({ userPortalPage, mock, saveOrCancelPopper, fxPermissionRoleFilter }) => {
    mock.getPermissionRoleFilter(fxPermissionRoleFilter.generateRegionalPermissionRoleFilter());
    const adminPortalPage = await userPortalPage.navigateToAdminPortalPage();
    expect(await adminPortalPage.getTitle()).toEqual(PALMS_ADMINPORTAL_TITLE);
    expect(await adminPortalPage.isRegionSelectorVisible()).toBeTruthy();

    await adminPortalPage.switchToAusIronOreRegion();
    expect(await adminPortalPage.getTitle()).toEqual(AUS_IRONORE_ADMINPORTAL_TITLE);

    const manageRolePermissionsPage = await userPortalPage.navigateToManageRolePermissionsPage();
    expect(await manageRolePermissionsPage.getTitle()).toEqual(MANAGE_ROLE_PERMISSION_HEADER);

    await manageRolePermissionsPage.filterPalmsRole('All');
    await manageRolePermissionsPage.selectRowPermission('Audit', 'Arranger', 'Enabled Can be used');
    await adminPortalPage.switchToCanIronOreRegion();

    await saveOrCancelPopper.clickClearChanges();
    expect(await manageRolePermissionsPage.getTitle()).toEqual(MANAGE_ROLE_PERMISSION_HEADER);
    expect(await adminPortalPage.getTitle()).toEqual(CAN_IRONORE_ADMINPORTAL_TITLE);
  });

  test('save changes when switching to different region', async ({
    userPortalPage,
    mock,
    saveOrCancelPopper,
    fxPermissionRoleFilter,
    alertPopper,
    fxPermissionRoleCreateUpdateMultiple,
  }) => {
    mock.getPermissionRoleFilter(fxPermissionRoleFilter.generateRegionalPermissionRoleFilter());
    mock.getPermissionRoleCreateUpdateMultiple(fxPermissionRoleCreateUpdateMultiple.generatePermissionRoleCreateUpdateMultiple());
    const adminPortalPage = await userPortalPage.navigateToAdminPortalPage();
    expect(await adminPortalPage.getTitle()).toEqual(PALMS_ADMINPORTAL_TITLE);
    expect(await adminPortalPage.isRegionSelectorVisible()).toBeTruthy();

    await adminPortalPage.switchToAusIronOreRegion();
    expect(await adminPortalPage.getTitle()).toEqual(AUS_IRONORE_ADMINPORTAL_TITLE);

    const manageRolePermissionsPage = await userPortalPage.navigateToManageRolePermissionsPage();
    expect(await manageRolePermissionsPage.getTitle()).toEqual(MANAGE_ROLE_PERMISSION_HEADER);

    await manageRolePermissionsPage.filterPalmsRole('All');
    await manageRolePermissionsPage.selectRowPermission('Audit', 'Arranger', 'Enabled Can be used');
    await adminPortalPage.switchToCanIronOreRegion();

    await saveOrCancelPopper.clickSaveChanges();
    expect(await alertPopper.isSuccessIconVisible()).toBeTruthy();
    expect(await alertPopper.getSnackbarMessage()).toEqual('Permission indicators updated');
    expect(await manageRolePermissionsPage.getTitle()).toEqual(MANAGE_ROLE_PERMISSION_HEADER);
    expect(await adminPortalPage.getTitle()).toEqual(CAN_IRONORE_ADMINPORTAL_TITLE);

    await adminPortalPage.switchToAusIronOreRegion();
    expect(await adminPortalPage.getTitle()).toEqual(AUS_IRONORE_ADMINPORTAL_TITLE);
    await manageRolePermissionsPage.filterPalmsRole('All');
    await manageRolePermissionsPage.selectRowPermission('Audit', 'Arranger', 'Enabled Can be used');
    await manageRolePermissionsPage.clickSaveChanges();
  });
});

test.describe('Admin Portal - Global user @admin', () => {
  test.beforeEach(async ({ page, loginPage, userPortalPage, fxUser, fxRbac, fxPermission, mock }) => {
    const user = fxUser.generateGlobalUser();
    await loginPage.openPalms(page, user);
    await mock.getUserResponses(user, fxRbac.generateGlobalAdminRbac(), fxPermission.generateGlobalAdminPermissionUser());
    expect(await userPortalPage.getTitle()).toEqual(HOMEPAGE_TITLE);
  });

  test('global administrator is able to update role permission for global roles', async ({ userPortalPage, mock, fxPermissionRoleFilter }) => {
    mock.getPermissionRoleFilter(fxPermissionRoleFilter.generateGlobalPermissionRoleFilter());
    const adminPortalPage = await userPortalPage.navigateToAdminPortalPage();
    expect(await adminPortalPage.getTitle()).toEqual(PALMS_ADMINPORTAL_TITLE);
    expect(await adminPortalPage.isRegionSelectorVisible()).toBeTruthy();

    await adminPortalPage.clickRegionSelector();
    expect(await adminPortalPage.getOptionAusIronOre()).toEqual('Australia - Iron Ore');
    expect(await adminPortalPage.getOptionCanIronOre()).toEqual('Canada - Iron Ore');
    expect(await adminPortalPage.getOptionGlobal()).toEqual('Global');

    await adminPortalPage.selectGlobalRegion();
    expect(await adminPortalPage.getTitle()).toEqual(GLOBAL_ADMINPORTAL_TITLE);

    const manageRolePermissionsPage = await userPortalPage.navigateToManageRolePermissionsPage();
    expect(await manageRolePermissionsPage.getTitle()).toEqual(MANAGE_ROLE_PERMISSION_HEADER);

    await manageRolePermissionsPage.filterPalmsRole('All');
    await manageRolePermissionsPage.selectRowPermission('Audit', 'Global administrator', 'No Access');
    await manageRolePermissionsPage.selectRowPermission('Audit', 'Regional administrator', 'No Access');
    await manageRolePermissionsPage.selectRowPermission('Audit', 'Suspended', 'Enabled Can be used');
    expect(await manageRolePermissionsPage.isCancelVisible()).toBeTruthy();
    expect(await manageRolePermissionsPage.isSaveChangesVisible()).toBeTruthy();
  });

  test('verify global user is taken back to the user portal', async ({ userPortalPage, mock }) => {
    const adminPortalPage = await userPortalPage.navigateToAdminPortalPage();
    expect(await adminPortalPage.getTitle()).toEqual(PALMS_ADMINPORTAL_TITLE);
    expect(await adminPortalPage.isRegionSelectorVisible()).toBeTruthy();
    await userPortalPage.NavigateToCustomerPortalPage();
    expect(await userPortalPage.getTitle()).toEqual(HOMEPAGE_TITLE);
  });
});

test.describe('Admin Portal - AUS Admin user @admin', () => {
  test.beforeEach(async ({ page, loginPage, userPortalPage, fxUser, fxRbac, fxPermission, mock }) => {
    const user = fxUser.generateAusRegionalUser();
    await loginPage.openPalms(page, user);
    await mock.getUserResponses(user, fxRbac.generateAusRegionalAdminRbac(), fxPermission.generateAusRegionalAdminPermissionUser());
    expect(await userPortalPage.getTitle()).toEqual(HOMEPAGE_TITLE);
  });

  test('regional administrator can only view role permissions of regional administrator but can edit other roles', async ({
    userPortalPage,
    mock,
    fxPermissionRoleFilter,
  }) => {
    mock.getPermissionRoleFilter(fxPermissionRoleFilter.generateRegionalPermissionRoleFilter());
    const adminPortalPage = await userPortalPage.navigateToAdminPortalPage();
    expect(await adminPortalPage.getTitle()).toEqual(AUS_IRONORE_ADMINPORTAL_TITLE);

    const manageRolePermissionsPage = await userPortalPage.navigateToManageRolePermissionsPage();
    expect(await manageRolePermissionsPage.getTitle()).toEqual(MANAGE_ROLE_PERMISSION_HEADER);

    await manageRolePermissionsPage.filterPalmsRole('Regional administrator');
    mock.getPermissionRoleFilter(fxPermissionRoleFilter.generateRegionalPermissionRoleFilterPage('Audit'));
    await manageRolePermissionsPage.filterPage('Audit');

    await manageRolePermissionsPage.clickAuditRowRegionalAdministrator();
    expect(manageRolePermissionsPage.isSaveChangesDisabled()).toBeTruthy();
    expect(manageRolePermissionsPage.isCancelDisabled()).toBeTruthy();

    await manageRolePermissionsPage.clickReset();
    await manageRolePermissionsPage.filterPalmsRole('All');
    await manageRolePermissionsPage.selectRowPermission('Audit', 'Arranger', 'Enabled Can be used');
    await manageRolePermissionsPage.selectRowPermission('Audit', 'Officer', 'Enabled Can be used');
    expect(manageRolePermissionsPage.isSaveChangesEnabled()).toBeTruthy();
    expect(manageRolePermissionsPage.isSaveChangesEnabled()).toBeTruthy();
  });

  test('regional administrator is not able to access manage role page', async ({ userPortalPage, page }) => {
    const adminPortalPage = await userPortalPage.navigateToAdminPortalPage();
    expect(await adminPortalPage.getTitle()).toEqual(AUS_IRONORE_ADMINPORTAL_TITLE);
    const sideBar = await userPortalPage.clickSideBar();
    expect(await sideBar.isSideMenuManageRolesHidden()).toBeTruthy();
  });

  test('verify aus regional admin user is taken back to the user portal', async ({ userPortalPage, mock }) => {
    const adminPortalPage = await userPortalPage.navigateToAdminPortalPage();
    expect(await adminPortalPage.getTitle()).toEqual(AUS_IRONORE_ADMINPORTAL_TITLE);
    expect(await adminPortalPage.isRegionSelectorVisible()).toBeTruthy();
    await userPortalPage.NavigateToCustomerPortalPage();
    expect(await userPortalPage.getTitle()).toEqual(HOMEPAGE_TITLE);
  });
});

test.describe('Admin Portal - AUS Guest user @admin', () => {
  test.beforeEach(async ({ page, loginPage, userPortalPage, fxUser, fxRbac, fxPermission, mock }) => {
    const user = fxUser.generateAusRegionalUser();
    await loginPage.openPalms(page, user);
    await mock.getUserResponses(user, fxRbac.generateRbacNoRegionsRbac(), fxPermission.generateAusGuestPermissionUser());
    expect(await userPortalPage.getTitle()).toEqual(HOMEPAGE_TITLE);
  });
  test('verify non-admin Guest user is unable to see admin portal URL', async ({ userPortalPage }) => {
    const profilePopper = await userPortalPage.clickAvatar();
    expect(await profilePopper.isSwitchViewHidden()).toBeTruthy();
  });
});

test.describe('Admin Portal - AUS Officer user @admin', () => {
  test.beforeEach(async ({ page, loginPage, userPortalPage, fxUser, fxRbac, fxPermission, mock }) => {
    const user = fxUser.generateAusRegionalUser();
    await loginPage.openPalms(page, user);
    await mock.getUserResponses(user, fxRbac.generateRbacNoRegionsRbac(), fxPermission.generateAusOfficerPermissionUser());
    expect(await userPortalPage.getTitle()).toEqual(HOMEPAGE_TITLE);
  });
  test('verify non-admin Officer user is unable to see admin portal URL', async ({ userPortalPage }) => {
    const profilePopper = await userPortalPage.clickAvatar();
    expect(await profilePopper.isSwitchViewHidden()).toBeTruthy();
  });
});

test.describe('Admin Portal - AUS Arranger user @admin', () => {
  test.beforeEach(async ({ page, loginPage, userPortalPage, fxUser, fxRbac, fxPermission, mock }) => {
    const user = fxUser.generateAusRegionalUser();
    await loginPage.openPalms(page, user);
    await mock.getUserResponses(user, fxRbac.generateRbacNoRegionsRbac(), fxPermission.generateAusArrangerPermissionUser());
    expect(await userPortalPage.getTitle()).toEqual(HOMEPAGE_TITLE);
  });
  test('verify non-admin Arranger user is unable to see admin portal URL', async ({ userPortalPage }) => {
    const profilePopper = await userPortalPage.clickAvatar();
    expect(await profilePopper.isSwitchViewHidden()).toBeTruthy();
  });
});

test.describe('Admin Portal - AUS Requestor user @admin', () => {
  test.beforeEach(async ({ page, loginPage, userPortalPage, fxUser, fxRbac, fxPermission, mock }) => {
    const user = fxUser.generateAusRegionalUser();
    await loginPage.openPalms(page, user);
    await mock.getUserResponses(user, fxRbac.generateRbacNoRegionsRbac(), fxPermission.generateAusRequestorPermissionUser());
    expect(await userPortalPage.getTitle()).toEqual(HOMEPAGE_TITLE);
  });
  test('verify non-admin Requestor user is unable to see admin portal URL', async ({ userPortalPage }) => {
    const profilePopper = await userPortalPage.clickAvatar();
    expect(await profilePopper.isSwitchViewHidden()).toBeTruthy();
  });
});

test.describe('Admin Portal - AUS Demand Ownder user @admin', () => {
  test.beforeEach(async ({ page, loginPage, userPortalPage, fxUser, fxRbac, fxPermission, mock }) => {
    const user = fxUser.generateAusRegionalUser();
    await loginPage.openPalms(page, user);
    await mock.getUserResponses(user, fxRbac.generateRbacNoRegionsRbac(), fxPermission.generateAusDemandOwnerPermissionUser());
    expect(await userPortalPage.getTitle()).toEqual(HOMEPAGE_TITLE);
  });
  test('verify non-admin Demand Ownder user is unable to see admin portal URL', async ({ userPortalPage }) => {
    const profilePopper = await userPortalPage.clickAvatar();
    expect(await profilePopper.isSwitchViewHidden()).toBeTruthy();
  });
});
