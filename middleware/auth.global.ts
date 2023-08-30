export default defineNuxtRouteMiddleware(async (to, from) => {
  if (["/auth/signin", "/auth/signup"].includes(to.path)) return;

  const user = await getCurrentUser();

  if (!user) {
    return navigateTo({
      path: "/auth/signup",
      // query: {
      //   redirect: to.fullPath,
      // },
    });
  }
});
