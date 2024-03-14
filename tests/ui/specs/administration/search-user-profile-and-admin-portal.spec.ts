import {
  AUS_IRONORE_ADMINPORTAL_TITLE,
  HOMEPAGE_TITLE,
  MANAGE_USER_ROLES_HEADER,
  MSG_NO_PROFILES_WERE_FOUND,
  SEARCH_USER_PROFILE_HEADER,
  VIEW_USER_HISTORY_HEADER,
} from '../../support/constants';
import { test, expect } from '../baset-test';

test.describe('Search User Profile And Administrator Portal @admin', () => {
  test.beforeEach(async ({ page, loginPage, userPortalPage, fxUser, fxRbac, fxPermission, mock }) => {
    const user = fxUser.generateAusRegionalUser();
    await loginPage.openPalms(page, user);
    await mock.getUserResponses(user, fxRbac.generateAusRegionalAdminRbac(), fxPermission.generateAusRegionalAdminPermissionUser());
    expect(await userPortalPage.getTitle()).toEqual(HOMEPAGE_TITLE);
  });

  test('AC12 Verify User Can Navigate To The Manage User Roles Page And Searched User Data Is Displayed', async ({
    userPortalPage,
    fxUser,
    fxUserFind,
    mock,
    profileSidebar,
  }) => {
    const userFind = fxUserFind.generateDefaultUserFind();
    const sapPersonId = `${userFind.results[0].sapPersonId}`;
    await mock.getUserFind(userFind);

    const profilePopper = await userPortalPage.clickProfilePopperArrowDown();
    expect(await profilePopper.isNameVisiable(`${fxUser.generateAusRegionalUser().firstName} ${fxUser.generateAusRegionalUser().lastName}`)).toBeTruthy();

    const adminPortalPage = await profilePopper.clickAdministration();
    expect(await adminPortalPage.getTitle()).toEqual(AUS_IRONORE_ADMINPORTAL_TITLE);

    const searchUserProfilePage = await userPortalPage.navigateToSearchUserProfilePage();
    expect(await searchUserProfilePage.getHeader()).toEqual(SEARCH_USER_PROFILE_HEADER);

    const searchResult = await searchUserProfilePage.searchUserProfile(sapPersonId);
    const result = await searchResult.getListSearchResult(sapPersonId);
    expect(result).toContain(`${userFind.results[0].lastName.toUpperCase()}, ${userFind.results[0].firstName} (prefers ${userFind.results[0].preferredName})`);
    expect(result).toContain(`${userFind.results[0].position}`);
    expect(result).toContain(`${userFind.results[0].personnelSubArea.replace('|', ' ')}`);
    expect(result).toContain(`${userFind.results[0].sapPersonnelNumber}`);
    expect(result).toContain(`${sapPersonId}`);

    const manageUserRoles = await searchResult.navigateToManageUserRolePage(`${sapPersonId}`);
    expect(await manageUserRoles.getHeader()).toContain(MANAGE_USER_ROLES_HEADER);
    expect(await adminPortalPage.isRegionSelectorVisible()).toBeTruthy();
    expect(await profileSidebar.getName()).toEqual(`${userFind.results[0].lastName.toUpperCase()}, ${userFind.results[0].firstName}`);
    expect(await profileSidebar.getPosition()).toContain(`${userFind.results[0].position}`);
    expect(await profileSidebar.getMobileNumber()).toContain(`${userFind.results[0].personalPhoneNumber}`);
    expect(await profileSidebar.getPersonnelNumber()).toContain(`${userFind.results[0].sapPersonnelNumber}`);
    expect(await profileSidebar.getPersonId()).toContain(`${userFind.results[0].sapPersonId}`);
    expect(await profileSidebar.getLeaderRoleId()).toContain(`${userFind.results[0].leaderRoleId}`);
    expect(await profileSidebar.getOrgUnitName()).toContain(`${userFind.results[0].organisationalUnit}`);
    expect(await profileSidebar.getOrgUnitId()).toContain(`${userFind.results[0].organisationalUnitId}`);
    expect(await profileSidebar.getPersonnelArea()).toContain(`${userFind.results[0].personnelArea}`);
    expect(await profileSidebar.getPersonnelAreaId()).toContain(`${userFind.results[0].personnelAreaId}`);
    expect(await profileSidebar.getEmployer()).toContain(`${userFind.results[0].employer}`);
    expect(await profileSidebar.getEmployerId()).toContain(`${userFind.results[0].employerId}`);
    expect(await profileSidebar.getCostCode()).toContain(`${userFind.results[0].costCentre}`);
  });
  test('AC34 Verify User Can Navigate To The View User History And Searched User Data Is Displayed', async ({ userPortalPage, fxUser, fxUserFind, mock }) => {
    const userFind = fxUserFind.generateDefaultUserFind();
    const sapPersonId = `${userFind.results[0].sapPersonId}`;
    await mock.getUserFind(userFind);
    const profilePopper = await userPortalPage.clickProfilePopperArrowDown();
    // expect(await profilePopper.getName()).toEqual(`${fxUser.generateAusRegionalUser().firstName} ${fxUser.generateAusRegionalUser().lastName}`);
    expect(await profilePopper.isNameVisiable(`${fxUser.generateAusRegionalUser().firstName} ${fxUser.generateAusRegionalUser().lastName}`)).toBeTruthy();

    const adminPortalPage = await profilePopper.clickAdministration();
    expect(await adminPortalPage.getTitle()).toEqual(AUS_IRONORE_ADMINPORTAL_TITLE);
    const searchUserProfilePage = await userPortalPage.navigateToSearchUserProfilePage();
    expect(await searchUserProfilePage.getHeader()).toEqual(SEARCH_USER_PROFILE_HEADER);
    const searchResult = await searchUserProfilePage.searchUserProfile(sapPersonId);
    const result = await searchResult.getListSearchResult(sapPersonId);
    expect(result).toContain(`${userFind.results[0].lastName.toUpperCase()}, ${userFind.results[0].firstName} (prefers ${userFind.results[0].preferredName})`);
    expect(result).toContain(`${userFind.results[0].position}`);
    expect(result).toContain(`${userFind.results[0].personnelSubArea.replace('|', ' ')}`);
    expect(result).toContain(`${userFind.results[0].sapPersonnelNumber}`);
    expect(result).toContain(`${sapPersonId}`);
    const vireUserHistory = await searchResult.navigateToViewUserHistoryPage(`${sapPersonId}`);
    expect(await vireUserHistory.getHeader()).toContain(VIEW_USER_HISTORY_HEADER);
  });

  test('Verify User Exist In Palms Is Returned By The System', async ({ userPortalPage, fxUserFind, mock }) => {
    const userFind = fxUserFind.generateDefaultUserFind();
    const sapPersonId = `${userFind.results[0].sapPersonId}`;
    await mock.getUserFind(userFind);

    const adminPortalPage = await userPortalPage.navigateToAdminPortalPage();
    expect(await adminPortalPage.getTitle()).toEqual(AUS_IRONORE_ADMINPORTAL_TITLE);

    const searchUserProfilePage = await userPortalPage.navigateToSearchUserProfilePage();
    expect(await searchUserProfilePage.getHeader()).toEqual(SEARCH_USER_PROFILE_HEADER);

    const searchResult = await searchUserProfilePage.searchUserProfile(sapPersonId);
    expect(await searchResult.isCreateCustomerProfileButtonHidden()).toBeTruthy();
    expect(await searchResult.isPalmsOnlyCheckboxHidden()).toBeTruthy();

    const result = await searchResult.getListSearchResult(sapPersonId);
    expect(result).toContain(`${userFind.results[0].lastName.toUpperCase()}, ${userFind.results[0].firstName} (prefers ${userFind.results[0].preferredName})`);
    expect(result).toContain(`${userFind.results[0].position}`);
    expect(result).toContain(`${userFind.results[0].personnelSubArea.replace('|', ' ')}`);
    expect(result).toContain(`${userFind.results[0].sapPersonnelNumber}`);
    expect(result).toContain(`${sapPersonId}`);
  });

  test('Verify User Exist In Sap Only Wont Be Returned By The System', async ({ userPortalPage, fxUserFind, mock }) => {
    const userFind = fxUserFind.generateDefaultUserFind();
    await mock.getPredictiveSearch('[]');
    const sapPersonId = `${userFind.results[0].sapPersonId}`;

    const adminPortalPage = await userPortalPage.navigateToAdminPortalPage();
    expect(await adminPortalPage.getTitle()).toEqual(AUS_IRONORE_ADMINPORTAL_TITLE);

    const searchUserProfilePage = await userPortalPage.navigateToSearchUserProfilePage();
    expect(await searchUserProfilePage.getHeader()).toEqual(SEARCH_USER_PROFILE_HEADER);

    await mock.getUserFind(fxUserFind.generateUserFindNoProfileFound());
    await searchUserProfilePage.searchUserProfile(sapPersonId);
    expect(await searchUserProfilePage.getAlertMessageContents()).toContain(MSG_NO_PROFILES_WERE_FOUND);
  });
});
