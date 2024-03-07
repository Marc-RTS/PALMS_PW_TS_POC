import PermissionBuilder from './permission-builder';

export default class Permission {
  generateCanRegionalAdminPermissionUser() {
    const userPermission = new PermissionBuilder().setAssigned(['Regional administrator'], ['regCANpgIRO']).build();
    return userPermission;
  }
  generateAusRegionalAdminPermissionUser() {
    const userPermission = new PermissionBuilder().setAssigned(['Regional administrator'], ['regAUSpgIRO']).build();
    return userPermission;
  }
  generateBothCanadaAndAusAdminPermissionUser() {
    const userPermission = new PermissionBuilder().setAssigned(['Regional administrator', 'Regional administrator'], ['regCANpgIRO', 'regAUSpgIRO']).build();
    return userPermission;
  }
  generateGlobalAdminPermissionUser() {
    const userPermission = new PermissionBuilder()
      .setAssigned(['Regional administrator', 'Regional administrator', 'Global administrator'], ['regCANpgIRO', 'regAUSpgIRO', 'regGLOBAL'])
      .global(true)
      .build();

    return userPermission;
  }
  generateAusGuestPermissionUser() {
    const userPermission = new PermissionBuilder().setAssigned(['Guest'], ['regAUSpgIRO']).build();
    return userPermission;
  }
  generateAusOfficerPermissionUser() {
    const userPermission = new PermissionBuilder().setAssigned(['Officer'], ['regAUSpgIRO']).build();
    return userPermission;
  }
  generateAusArrangerPermissionUser() {
    const userPermission = new PermissionBuilder().setAssigned(['Arranger'], ['regAUSpgIRO']).build();
    return userPermission;
  }
  generateAusRequestorPermissionUser() {
    const userPermission = new PermissionBuilder().setAssigned(['Requestor'], ['regAUSpgIRO']).build();
    return userPermission;
  }
  generateAusDemandOwnerPermissionUser() {
    const userPermission = new PermissionBuilder().setAssigned(['Demand owner'], ['regAUSpgIRO']).build();
    return userPermission;
  }
  generateAusSuspendedPermissionUser() {
    const userPermission = new PermissionBuilder().setAssigned(['Suspended'], ['regAUSpgIRO']).build();
    return userPermission;
  }
}
