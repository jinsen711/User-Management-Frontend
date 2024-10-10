/**
 * @see https://umijs.org/docs/max/access#access
 * */
export default function access(initialState: { currentUserInfo?: User.UserInfo } | undefined) {
  const { currentUserInfo } = initialState ?? {};
  return {
    canAdmin: currentUserInfo && currentUserInfo.user_type === true,
  };
}
