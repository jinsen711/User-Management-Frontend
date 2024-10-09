/**
 * @see https://umijs.org/docs/max/access#access
 * */
export default function access(
  initialState: { getCurrentUserInfo?: User._UserInfoRes } | undefined,
) {
  const { getCurrentUserInfo } = initialState ?? {};
  return {
    canAdmin: getCurrentUserInfo && getCurrentUserInfo.user_type === true,
  };
}
