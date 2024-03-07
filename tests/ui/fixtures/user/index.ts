import UserBuilder from './user-builder';

export default class User {
  generateAusRegionalUser() {
    const user = new UserBuilder().regionTags('regAUSpgIRO').build();
    return user;
  }

  generateCanRegionalUser() {
    const user = new UserBuilder().regionTags('regCANpgIRO').build();
    return user;
  }
  generateBothAusAndCanRegionalUser() {
    const user = new UserBuilder().regionTags('regCANpgIRO regAUSpgIRO').build();
    return user;
  }
  generateGlobalUser() {
    const user = new UserBuilder().regionTags('regCANpgIRO regAUSpgIRO regGLOBAL').build();
    return user;
  }
}
