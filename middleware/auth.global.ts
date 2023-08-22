export default defineNuxtRouteMiddleware(async (to, from) => {
  if (["/auth/login", "/auth/register"].includes(to.path)) return;

  const user = await getCurrentUser();

  if (!user) {
    return navigateTo({
      path: "/auth/login",
      // query: {
      //   redirect: to.fullPath,
      // },
    });
  }
});
