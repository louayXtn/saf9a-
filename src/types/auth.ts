export interface UpdateProfileBody {
  first_name: string;
  last_name: string;
  country: string;
}

export interface ChangePasswordBody {
  oldPassword: string;
  newPassword: string;
}