export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectUser = state => state.auth.user;
export const selectIsLoading = state => state.auth.isLoading;
export const selectError = state => state.auth.error;
export const selectIsRefreshing = state => state.auth.isRefreshing;

//user
export const selectIsFetchingUser = state => state.auth.isFetchingUser;
export const selectFetchUserError = state => state.auth.fetchUserError;
export const selectIsUpdatingInfo = state => state.auth.isUpdatingInfo;
export const selectUpdateInfoError = state => state.auth.updateInfoError;
export const selectIsChangingPhoto = state => state.auth.isChangingPhoto;
export const selectChangePhotoError = state => state.auth.changePhotoError;