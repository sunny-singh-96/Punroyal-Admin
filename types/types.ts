export type LoginErrors = {
  email?: string;
  username?: string;
  identifier?: string;
  password?: string;
  name?: string;
  phone?: string;
};

export type InfluencerRegisterErrors = {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  username?: string;
};

export type CategoryError = {
  title?: string;
  image?: string;
};

export type BannerError = {
  title?: string;
  banner?: string;
  image?: string;
};

export type OccasionsError = {
  cat_id?: string;
};
