enum AccountRole {
  GUEST,
  VENDOR,
  OPERATION,
  RESTAURANT,
  EMPLOYEE,
  DRIVER,
  ADMIN,
}
interface UserModel {
  uid?: string;
  // User Serial Number
  photoURL?: string;
  displayName?: string;
  email?: string;
  phoneNumber?: string;
  emailVerified?: boolean;
  creationTime?: string;
  lastSignInTime?: string;
  banned?: boolean;
  // Extras
  fcms?: string[];
  role?: AccountRole;
  profiles?: Profile[] | any;
}
interface Profile {
  thumbnail?: string;
  title?: string;
  role?: AccountRole;
  passcode?: string;
}
interface GeoPoint {
  latitude?: number;
  longitude?: number;
}
interface location {
  address?: string;
  geoPoint?: GeoPoint;
}
interface Branch {
  thumbnail?: string;
  userUid?: string;

  displayName?: string;
  password?: string;
  phoneNumber?: string;
  passcode?: string;
  email?: string;
  location?: location;
}
export { UserModel, AccountRole, Profile, Branch };
