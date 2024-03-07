import RbacBuilder from './rbac-builder';

export default class Rbac {
  generateAusRegionalAdminRbac() {
    const rbac = new RbacBuilder().regionTags(['regAUSpgIRO']).build();
    return rbac;
  }

  enerateCanRegionalAdminRbac() {
    const rbac = new RbacBuilder().regionTags(['regCANpgIRO']).build();
    return rbac;
  }

  generateBothAusAndCanRegionalAdminRbac() {
    const rbac = new RbacBuilder().regionTags(['regCANpgIRO', 'regAUSpgIRO']).build();
    return rbac;
  }

  generateGlobalAdminRbac() {
    const rbac = new RbacBuilder().regionTags(['regAUSpgIRO', 'regCANpgIRO', 'regGLOBAL']).build();
    return rbac;
  }
  generateRbacNoRegionsRbac() {
    const rbac = new RbacBuilder().regionTags([]).build();
    return rbac;
  }
}
