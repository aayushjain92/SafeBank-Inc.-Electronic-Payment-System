import { createAction, union } from '@ngrx/store';

export const logout = createAction('[Auth] Logout');
export const logoutConfirmation = createAction('[Auth] Logout Confirmation');
export const logoutConfirmationDismiss = createAction(
  '[Auth] Logout Confirmation Dismiss'
);

const all = union({ logout, logoutConfirmation, logoutConfirmationDismiss });
export type LogoutActionsUnion = typeof all;