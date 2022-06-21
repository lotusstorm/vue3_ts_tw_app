export interface Contact {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export interface MainData {
  contactsList: Contact[];
  firstName: string;
  lastName: string;
  email: string;
}

export interface localStorageData {
  firstName: string;
  lastName: string;
  userEmail: string;
}
